import { NextRequest, NextResponse } from "next/server";

import User from "@/database/User";
import connectDB from "@/lib/mongodb";
import { verifyToken } from "@/lib/auth";

export async function GET(
  request: NextRequest
) {
  try {

    await connectDB();

    const token =
      request.cookies.get("token")
        ?.value;

    if (!token) {

      return NextResponse.json(
        {
          success: false,
          user: null,
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
          user: null,
        },
        {
          status: 401,
        }
      );

    }

    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          user: null,
        },
        {
          status: 404,
        }
      );

    }

    return NextResponse.json({

      success: true,

      user,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch user.",
      },
      {
        status: 500,
      }
    );

  }
}