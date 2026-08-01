import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";
import { verifyToken } from "@/lib/auth";

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

    const { id } =
      await params;

    const order =
      await Order.findOne({
        _id: id,
        user: decoded.id,
      });

    if (!order) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Order not found.",
        },
        {
          status: 404,
        }
      );

    }

    return NextResponse.json({

      success: true,

      order,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load invoice.",
      },
      {
        status: 500,
      }
    );

  }

}