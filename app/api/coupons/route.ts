import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Coupon from "@/database/Coupon";

// ======================================
// GET ALL COUPONS
// ======================================

export async function GET() {
  try {
    await connectDB();

    const coupons = await Coupon.find()
      .sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      coupons,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch coupons",
      },
      {
        status: 500,
      }
    );

  }
}

// ======================================
// CREATE COUPON
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
      discountType,
      discountValue,
      minimumOrder,
      maximumDiscount,
      usageLimit,
      expiryDate,
      active,
      description,
    } = body;

    if (
      !code ||
      !discountType ||
      !discountValue ||
      !expiryDate
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const exists =
      await Coupon.findOne({
        code:
          code.toUpperCase(),
      });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Coupon already exists.",
        },
        {
          status: 400,
        }
      );
    }
    const coupon = await Coupon.create({
      code: code.toUpperCase(),

      discountType,

      discountValue: Number(
        discountValue
      ),

      minimumOrder: Number(
        minimumOrder || 0
      ),

      maximumDiscount: Number(
        maximumDiscount || 0
      ),

      usageLimit: Number(
        usageLimit || 0
      ),

      expiryDate,

      active,

      description,

      usedCount: 0,
    });

    return NextResponse.json({
      success: true,

      message:
        "Coupon created successfully.",

      coupon,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create coupon.",
      },
      {
        status: 500,
      }
    );

  }
}