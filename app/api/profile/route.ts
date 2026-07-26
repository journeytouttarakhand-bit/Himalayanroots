import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/database/User";
import { verifyToken } from "@/lib/auth";

export async function PUT(
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

    const body =
      await request.json();

    const {
      name,
      phone,
    } = body;

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message:
            "User not found.",
        },
        {
          status: 404,
        }
      );

    }

    user.name = name;
    user.phone = phone;

    await user.save();

    return NextResponse.json({

      success: true,

      message:
        "Profile updated successfully.",

      user,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update profile.",
      },
      {
        status: 500,
      }
    );

  }

}