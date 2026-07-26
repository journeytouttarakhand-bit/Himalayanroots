import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";
import { verifyToken } from "@/lib/auth";

export async function GET(
  request: NextRequest
) {
  try {

    await connectDB();

    const token =
      request.cookies.get("token")?.value;

    if (!token) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const decoded: any =
      verifyToken(token);

    if (!decoded) {

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const orders =
      await Order.find({
        user: decoded.id,
      })
        .sort({
          createdAt: -1,
        })
        .lean();

    return NextResponse.json({

      success: true,

      orders,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch orders.",
      },
      {
        status: 500,
      }
    );

  }

}