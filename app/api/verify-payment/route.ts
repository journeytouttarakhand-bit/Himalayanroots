import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import connectDB from "@/lib/mongodb";

import Order from "@/database/Order";
import Product from "@/database/Product";
import Coupon from "@/database/Coupon";
import { sendEmail } from "@/lib/email";

import {
  orderConfirmedTemplate,
} from "@/lib/emailTemplates";

interface OrderItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
}

interface PaymentBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  customer: CustomerInfo;
  items: OrderItem[];
  totalAmount: number;
  couponCode?: string;
  discount?: number;
  finalAmount?: number;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body: PaymentBody = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      customer,
      items,

      totalAmount,

      couponCode,
      discount,
      finalAmount,
    } = body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment data missing.",
        },
        {
          status: 400,
        }
      );
    }

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET as string
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature.",
        },
        {
          status: 400,
        }
      );
    }

    // ===============================
    // Coupon Validation
    // ===============================

    let appliedCoupon = null;

    let finalDiscount = 0;

    if (couponCode) {

      appliedCoupon = await Coupon.findOne({
        code: couponCode.toUpperCase(),
        active: true,
      });

      if (!appliedCoupon) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid coupon.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        new Date(appliedCoupon.expiryDate) <
        new Date()
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Coupon expired.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        appliedCoupon.usageLimit > 0 &&
        appliedCoupon.usedCount >=
          appliedCoupon.usageLimit
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Coupon usage limit exceeded.",
          },
          {
            status: 400,
          }
        );
      }

      if (
        totalAmount <
        appliedCoupon.minimumOrder
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Minimum order amount not reached.",
          },
          {
            status: 400,
          }
        );
      }
      if (
        appliedCoupon.discountType ===
        "percentage"
      ) {
        finalDiscount =
          (totalAmount *
            appliedCoupon.discountValue) /
          100;

        if (
          appliedCoupon.maximumDiscount > 0
        ) {
          finalDiscount = Math.min(
            finalDiscount,
            appliedCoupon.maximumDiscount
          );
        }
      } else {
        finalDiscount =
          appliedCoupon.discountValue;
      }

      finalDiscount = Math.min(
        finalDiscount,
        totalAmount
      );
    }

    const payableAmount =
      totalAmount - finalDiscount;

    // ===============================
    // Validate Product Stock
    // ===============================

    for (const item of items) {

      const product =
        await Product.findById(item.id);

      if (!product) {
        return NextResponse.json(
          {
            success: false,
            message: `${item.name} not found.`,
          },
          {
            status: 404,
          }
        );
      }

      if (
        product.stock <
        item.quantity
      ) {
        return NextResponse.json(
          {
            success: false,
            message: `${item.name} is out of stock.`,
          },
          {
            status: 400,
          }
        );
      }
    }

    // ===============================
    // Reduce Product Stock
    // ===============================

    for (const item of items) {

      const product =
        await Product.findById(item.id);

      if (!product) continue;

      product.stock = Math.max(
        0,
        product.stock - item.quantity
      );

      product.inStock =
        product.stock > 0;

      await product.save();
    }

    // ===============================
    // Update Coupon Usage
    // ===============================

    if (appliedCoupon) {

      appliedCoupon.usedCount += 1;

      await appliedCoupon.save();
    }

    // ===============================
    // Save Order
    // ===============================
    const order = await Order.create({

      customer,

      items,

      totalAmount,

      originalAmount: totalAmount,

      discount: finalDiscount,

      finalAmount: payableAmount,

      couponCode: appliedCoupon
        ? appliedCoupon.code
        : "",

      paymentId:
        razorpay_payment_id,

      orderId:
        razorpay_order_id,

      paymentStatus: "Paid",

      orderStatus: "Pending",

    });

    // =======================================
// Send Order Confirmation Email (Optional)
// =======================================

try {

  if (customer.email && process.env.RESEND_API_KEY) {

    // Only send email in production or to verified addresses
    // In development/testing, Resend only allows verified email addresses
    
    const verifiedEmail = process.env.FROM_EMAIL;
    
    // Try to send to customer, but don't fail order if it doesn't work
    try {
      await sendEmail({
        to: customer.email,
        subject: "Your Himalayan Roots Order is Confirmed 🎉",
        html: orderConfirmedTemplate({
          customerName: customer.name,
          orderId: order._id.toString(),
          amount: payableAmount,
        }),
      });
    } catch (customerEmailError: any) {
      // Log but don't block - Resend may be in test mode
      console.warn("Could not send customer email:", customerEmailError?.message);
    }

  }

} catch (emailError: any) {

  console.error(
    "Email setup error:",
    emailError?.message
  );

}

    return NextResponse.json({

      success: true,

      message:
        "Payment verified successfully.",

      order,

    });

  } catch (error: any) {

    console.error(
      "Verify Payment Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message || "Payment verification failed.",
      },
      {
        status: 500,
      }
    );

  }
}