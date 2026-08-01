import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Address from "@/database/Address";
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

    const addresses =
      await Address.find({
        user: decoded.id,
      }).sort({
        isDefault: -1,
        createdAt: -1,
      });

    return NextResponse.json({

      success: true,

      addresses,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch addresses.",
      },
      {
        status: 500,
      }
    );

  }

}

export async function POST(
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

    const body =
      await request.json();

    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
      landmark,
      isDefault,
    } = body;

    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
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

    if (isDefault) {

      await Address.updateMany(
        {
          user: decoded.id,
        },
        {
          isDefault: false,
        }
      );

    }

    const newAddress =
      await Address.create({

        user: decoded.id,

        fullName,

        phone,

        address,

        city,

        state,

        pincode,

        landmark,

        isDefault,

      });

    return NextResponse.json({

      success: true,

      message:
        "Address added successfully.",

      address: newAddress,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to add address.",
      },
      {
        status: 500,
      }
    );

  }

}