import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/database/Category";
// ===============================
// GET - All Categories
// ===============================
export async function GET() {
  try {
    await connectDB();

    const categories = await Category.find()
      .sort({ name: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("GET Categories Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// POST - Add Category
// ===============================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, slug, image, active } = body;

    if (!name || !slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and Slug are required",
        },
        {
          status: 400,
        }
      );
    }

    // Duplicate Name
    const existingName = await Category.findOne({
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    });

    if (existingName) {
      return NextResponse.json(
        {
          success: false,
          message: "Category name already exists",
        },
        {
          status: 400,
        }
      );
    }

    // Duplicate Slug
    const existingSlug = await Category.findOne({
      slug,
    });

    if (existingSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Category slug already exists",
        },
        {
          status: 400,
        }
      );
    }
    const category = await Category.create({
      name,
      slug,
      image,
      active,
    });

    return NextResponse.json({
      success: true,
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    console.error("POST Category Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add category",
      },
      {
        status: 500,
      }
    );
  }
}