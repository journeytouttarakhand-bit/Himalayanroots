import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/database/Product";

export async function GET() {
  try {
    await connectDB();

    const totalProducts = await Product.countDocuments();

    const activeProducts = await Product.countDocuments({
      active: true,
    });

    const inactiveProducts = await Product.countDocuments({
      active: false,
    });

    const featuredProducts = await Product.countDocuments({
      featured: true,
    });

    const outOfStockProducts = await Product.countDocuments({
      stock: 0,
    });

    const totalStock = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$stock",
          },
        },
      },
    ]);

    const recentProducts = await Product.find()
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .select(
        "name category price stock image createdAt"
      )
      .lean();
          return NextResponse.json({
      success: true,

      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts,
        featuredProducts,
        outOfStockProducts,
        totalStock:
          totalStock.length > 0
            ? totalStock[0].total
            : 0,
      },

      recentProducts,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      {
        status: 500,
      }
    );
  }
}