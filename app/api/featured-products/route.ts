import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/database/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({
      active: true,
      featured: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}