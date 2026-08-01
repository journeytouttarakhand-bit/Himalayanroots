import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import User from "@/database/User";

import {
  hashPassword,
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
      name,
      email,
      phone,
      password,
    } = body;

    //----------------------------------
    // Validation
    //----------------------------------

    if (
      !name ||
      !email ||
      !password
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

    //----------------------------------
    // Email Exists
    //----------------------------------

    const existingUser =
      await User.findOne({
        email:
          email.toLowerCase(),
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Email already registered.",
        },
        {
          status: 400,
        }
      );
    }

    //----------------------------------
    // Hash Password
    //----------------------------------

    const hashedPassword =
      await hashPassword(
        password
      );

    //----------------------------------
    // Create User
    //----------------------------------

    const user =
      await User.create({
        name,

        email:
          email.toLowerCase(),

        phone,

        password:
          hashedPassword,

        role:
          "customer",
      });

    //----------------------------------
    // JWT
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
          "Account created successfully.",

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

        maxAge:
          60 *
          60 *
          24 *
          7,

        path: "/",
      }
    );

    return response;

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create account.",
      },
      {
        status: 500,
      }
    );

  }
}