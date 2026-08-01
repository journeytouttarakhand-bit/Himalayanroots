import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/database/User";
import { verifyToken } from "@/lib/auth";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;

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

    const decoded: any = verifyToken(token);

    if (!decoded || !decoded.id) {
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

    const body = await request.json();

    const {
      name,
      phone,
      altPhone,
      gender,
      dob,
      avatar,
      address,
      locality,
      landmark,
      city,
      state,
      pincode,
    } = body;

    // Construct update payload safely
    const updateData: Record<string, any> = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (altPhone !== undefined) updateData.altPhone = altPhone;
    if (gender !== undefined) updateData.gender = gender;
    if (dob !== undefined) updateData.dob = dob;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (address !== undefined) updateData.address = address;
    if (locality !== undefined) updateData.locality = locality;
    if (landmark !== undefined) updateData.landmark = landmark;
    if (city !== undefined) updateData.city = city;
    if (state !== undefined) updateData.state = state;
    if (pincode !== undefined) updateData.pincode = pincode;

    // Use direct atomic update to prevent Mongoose document validation errors
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { $set: updateData },
      { new: true, runValidators: false }
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Profile update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to update profile.",
      },
      {
        status: 500,
      }
    );
  }
}