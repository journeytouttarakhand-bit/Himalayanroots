import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/database/User";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          message: "No authentication token found.",
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
          user: null,
          message: "Invalid or expired token.",
        },
        {
          status: 401,
        }
      );
    }

    // .lean() uses raw JSON for maximum performance & prevents Mongoose schema wrapping delays
    const user = await User.findById(decoded.id).select("-password").lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          user: null,
          message: "User not found.",
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
  } catch (error: any) {
    console.error("Fetch user auth/me error:", error);

    return NextResponse.json(
      {
        success: false,
        user: null,
        message: error?.message || "Failed to fetch user.",
      },
      {
        status: 500,
      }
    );
  }
}