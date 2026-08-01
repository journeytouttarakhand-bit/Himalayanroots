import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/database/Product";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    await connectDB();

    const { slug } = await params;

    const product = await Product.findOne({
      slug,
      active: true,
    }).lean();

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      product,
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