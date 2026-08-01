import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Coupon from "@/database/Coupon";

// ======================================
// VALIDATE COUPON
// ======================================

export async function POST(
  request: NextRequest
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const {
      code,
      orderAmount,
    } = body;

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message: "Coupon code is required.",
        },
        {
          status: 400,
        }
      );
    }

    const coupon =
      await Coupon.findOne({
        code: code.toUpperCase(),
      });

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid coupon code.",
        },
        {
          status: 404,
        }
      );
    }

    //----------------------------------
    // Active Check
    //----------------------------------

    if (!coupon.active) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This coupon is inactive.",
        },
        {
          status: 400,
        }
      );
    }

    //----------------------------------
    // Expiry Check
    //----------------------------------

    if (
      new Date(coupon.expiryDate) <
      new Date()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Coupon has expired.",
        },
        {
          status: 400,
        }
      );
    }

    //----------------------------------
    // Usage Limit Check
    //----------------------------------

    if (
      coupon.usageLimit > 0 &&
      coupon.usedCount >=
        coupon.usageLimit
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Coupon usage limit reached.",
        },
        {
          status: 400,
        }
      );
    }
    //----------------------------------
    // Minimum Order Check
    //----------------------------------

    if (
      Number(orderAmount) <
      coupon.minimumOrder
    ) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum order should be ₹${coupon.minimumOrder}.`,
        },
        {
          status: 400,
        }
      );
    }

    //----------------------------------
    // Calculate Discount
    //----------------------------------

    let discount = 0;

    if (
      coupon.discountType ===
      "percentage"
    ) {
      discount =
        (Number(orderAmount) *
          coupon.discountValue) /
        100;

      if (
        coupon.maximumDiscount > 0 &&
        discount >
          coupon.maximumDiscount
      ) {
        discount =
          coupon.maximumDiscount;
      }

    } else {

      discount =
        coupon.discountValue;

    }

    if (
      discount >
      Number(orderAmount)
    ) {
      discount =
        Number(orderAmount);
    }

    const finalAmount =
      Number(orderAmount) -
      discount;

    return NextResponse.json({
      success: true,

      message:
        "Coupon applied successfully.",

      coupon: {
        code: coupon.code,

        discountType:
          coupon.discountType,

        discountValue:
          coupon.discountValue,
      },

      discount,

      finalAmount,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to validate coupon.",
      },
      {
        status: 500,
      }
    );

  }
}