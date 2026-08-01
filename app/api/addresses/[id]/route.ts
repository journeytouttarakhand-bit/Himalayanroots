import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Address from "@/database/Address";
import { verifyToken } from "@/lib/auth";

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

    const token =
      request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
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

    const body =
      await request.json();

    if (body.isDefault) {

      await Address.updateMany(
        {
          user: decoded.id,
        },
        {
          isDefault: false,
        }
      );

    }

    const address =
      await Address.findOneAndUpdate(
        {
          _id: id,
          user: decoded.id,
        },
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      address,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update address.",
      },
      {
        status: 500,
      }
    );

  }

}

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

    const token =
      request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
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

    await Address.findOneAndDelete({
      _id: id,
      user: decoded.id,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete address.",
      },
      {
        status: 500,
      }
    );

  }

}