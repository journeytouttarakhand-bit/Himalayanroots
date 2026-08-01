import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Category from "@/database/Category";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// ===============================
// GET Single Category
// ===============================
export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Category ID",
        },
        {
          status: 400,
        }
      );
    }

    const category = await Category.findById(id).lean();

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("GET Category Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// UPDATE Category
// ===============================
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Category ID",
        },
        {
          status: 400,
        }
      );
    }

    const body = await req.json();

    const {
      name,
      slug,
      image,
      active,
    } = body;
    // Check duplicate name (excluding current category)
    const existingName = await Category.findOne({
      _id: { $ne: id },
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

    // Check duplicate slug (excluding current category)
    const existingSlug = await Category.findOne({
      _id: { $ne: id },
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

    const category =
      await Category.findByIdAndUpdate(
        id,
        {
          name,
          slug,
          image,
          active,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Category updated successfully",
      category,
    });
  } catch (error) {
    console.error(
      "UPDATE Category Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

// ===============================
// DELETE Category
// ===============================
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Category ID",
        },
        {
          status: 400,
        }
      );
    }
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE Category Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      {
        status: 500,
      }
    );
  }
}