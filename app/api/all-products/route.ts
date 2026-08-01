import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/lib/mongodb";
import Product from "@/database/Product";

// ===============================
// GET - All Products
// ===============================
export async function GET() {
  try {
    await connectDB();

    console.log(
      "Connected Database:",
      mongoose.connection.name
    );

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error: any) {
    console.error("GET Products Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// POST - Add Product
// ===============================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    console.log(
      "Connected Database:",
      mongoose.connection.name
    );

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
        {
          status: 400,
        }
      );
    }

    const product = await Product.create({
      name: body.name,
      slug: body.slug,
      description: body.description,
      price: Number(body.price),
      category: body.category,
      image: body.image,
      stock: Number(body.stock),

      rating: Number(body.rating ?? 5),

      featured: body.featured ?? false,

      active: body.active ?? true,

      inStock: Number(body.stock) > 0,
    });

    return NextResponse.json({
      success: true,
      message: "Product Added Successfully",
      product,
    });
  } catch (error: any) {
    console.error("POST Product Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
        errors: error.errors,
      },
      {
        status: 500,
      }
    );
  }
}