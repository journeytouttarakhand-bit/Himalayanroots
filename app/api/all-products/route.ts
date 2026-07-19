import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/database/Product";

// ===============================
// GET - All Active Products
// ===============================
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({
      active: true,
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET Products Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

// ===============================
// POST - Add Product
// ===============================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    // Check duplicate slug
    const exists = await Product.findOne({
      slug: body.slug,
    });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug already exists",
        },
        { status: 400 }
      );
    }

    const product = await Product.create(body);

    return NextResponse.json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error) {
    console.error("POST Product Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add product",
      },
      { status: 500 }
    );
  }
}