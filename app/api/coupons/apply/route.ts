import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Coupon from "@/database/Coupon";

export async function POST(
  request: NextRequest
) {
  try {

    await connectDB();

    const body =
      await request.json();

    const {
      code,
      amount,
    } = body;

    if (!code) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Coupon code is required.",
        },
        {
          status: 400,
        }
      );
    }

    const coupon =
      await Coupon.findOne({

        code: code.toUpperCase(),

        active: true,

      });

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid coupon code.",
        },
        {
          status: 404,
        }
      );
    }

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

    if (
      amount <
      coupon.minimumOrder
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            `Minimum order should be ₹${coupon.minimumOrder}.`,
        },
        {
          status: 400,
        }
      );
    }

    let discount = 0;
    if (
      coupon.discountType ===
      "percentage"
    ) {

      discount =
        (amount *
          coupon.discountValue) /
        100;

      if (
        coupon.maximumDiscount > 0
      ) {
        discount = Math.min(
          discount,
          coupon.maximumDiscount
        );
      }

    } else {

      discount =
        coupon.discountValue;

    }

    discount = Math.min(
      discount,
      amount
    );

    const finalAmount =
      amount - discount;

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
          "Failed to apply coupon.",
      },
      {
        status: 500,
      }
    );

  }

}