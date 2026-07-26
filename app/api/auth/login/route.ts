import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/database/User";

import {
  comparePassword,
  generateToken,
} from "@/lib/auth";

export async function POST(
  request: NextRequest
) {
  try {

    await connectDB();

    const body =
      await request.json();

    const {
      email,
      password,
    } = body;

    //----------------------------------
    // Validation
    //----------------------------------

    if (
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email and Password are required.",
        },
        {
          status: 400,
        }
      );
    }

    //----------------------------------
    // Find User
    //----------------------------------

    const user =
      await User.findOne({
        email:
          email.toLowerCase(),
      });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    //----------------------------------
    // Check Password
    //----------------------------------

    const matched =
      await comparePassword(
        password,
        user.password
      );

    if (!matched) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    //----------------------------------
    // Generate JWT
    //----------------------------------

    const token =
      generateToken(
        user._id.toString(),
        user.role
      );

    //----------------------------------
    // Response
    //----------------------------------

    const response =
      NextResponse.json({
        success: true,

        message:
          "Login successful.",

        user: {
          id: user._id,

          name: user.name,

          email: user.email,

          role: user.role,
        },
      });

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          60 *
          60 *
          24 *
          7,
      }
    );

    return response;

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Login failed.",
      },
      {
        status: 500,
      }
    );

  }
}