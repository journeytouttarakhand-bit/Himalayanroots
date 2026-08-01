import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Coupon from "@/database/Coupon";

// ======================================
// GET SINGLE COUPON
// ======================================

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id } = await params;

    const coupon =
      await Coupon.findById(id);

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          message: "Coupon not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      coupon,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch coupon.",
      },
      {
        status: 500,
      }
    );

  }
}

// ======================================
// UPDATE COUPON
// ======================================

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body =
      await request.json();

    const coupon =
      await Coupon.findById(id);

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          message: "Coupon not found.",
        },
        {
          status: 404,
        }
      );
    }
    coupon.code = body.code.toUpperCase();

    coupon.discountType =
      body.discountType;

    coupon.discountValue = Number(
      body.discountValue
    );

    coupon.minimumOrder = Number(
      body.minimumOrder || 0
    );

    coupon.maximumDiscount = Number(
      body.maximumDiscount || 0
    );

    coupon.usageLimit = Number(
      body.usageLimit || 0
    );

    coupon.expiryDate =
      body.expiryDate;

    coupon.active =
      body.active;

    coupon.description =
      body.description;

    await coupon.save();

    return NextResponse.json({
      success: true,
      message:
        "Coupon updated successfully.",
      coupon,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update coupon.",
      },
      {
        status: 500,
      }
    );

  }
}

// ======================================
// DELETE COUPON
// ======================================

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id } = await params;

    const coupon =
      await Coupon.findById(id);

    if (!coupon) {
      return NextResponse.json(
        {
          success: false,
          message: "Coupon not found.",
        },
        {
          status: 404,
        }
      );
    }
    await Coupon.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Coupon deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete coupon.",
      },
      {
        status: 500,
      }
    );

  }
}