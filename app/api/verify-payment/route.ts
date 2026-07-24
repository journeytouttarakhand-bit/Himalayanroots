import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";
import Product from "@/database/Product";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      customer,
      items,
      totalAmount,
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

      if (product.stock < item.quantity) {
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

      product.stock =
        Math.max(
          0,
          product.stock - item.quantity
        );

      product.inStock =
        product.stock > 0;

      await product.save();

    }

    // ===============================
    // Save Order
    // ===============================

    console.log("CUSTOMER =>", customer);
    console.log("ITEMS =>", items);
    const order = await Order.create({

      customer,

      items,

      totalAmount,

      paymentId:
        razorpay_payment_id,

      orderId:
        razorpay_order_id,

      paymentStatus: "Paid",

      orderStatus: "Pending",

    });

    return NextResponse.json({

      success: true,

      message:
        "Payment verified successfully.",

      order,

    });
      } catch (error) {

    console.error(
      "Verify Payment Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Payment verification failed.",
      },
      {
        status: 500,
      }
    );

  }
}