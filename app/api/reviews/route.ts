import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Review from "@/database/Review";
import Order from "@/database/Order";

import { verifyToken } from "@/lib/auth";

// =======================================
// GET REVIEWS
// =======================================

export async function GET(
  request: NextRequest
) {
  try {

    await connectDB();

    const productId =
      request.nextUrl.searchParams.get(
        "product"
      );

    if (!productId) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Product id required.",
        },
        {
          status: 400,
        }
      );

    }

    const reviews =
      await Review.find({

        product: productId,

        approved: true,

      })
        .populate(
          "user",
          "name"
        )
        .sort({
          createdAt: -1,
        });

    const totalReviews =
      reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : reviews.reduce(
            (sum, review) =>
              sum + review.rating,
            0
          ) / totalReviews;

    return NextResponse.json({

      success: true,

      reviews,

      totalReviews,

      averageRating,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load reviews.",
      },
      {
        status: 500,
      }
    );

  }

}

// =======================================
// ADD REVIEW
// =======================================

export async function POST(
  request: NextRequest
) {
  try {

    await connectDB();

    const token =
      request.cookies.get("token")
        ?.value;

    if (!token) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Please login.",
        },
        {
          status: 401,
        }
      );

    }

    const decoded: any =
      verifyToken(token);

    if (!decoded) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );

    }

    const body =
      await request.json();

    const {
      product,
      rating,
      title,
      comment,
    } = body;

    if (
      !product ||
      !rating ||
      !comment
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );

    }

    // ===================================
    // Duplicate Review Check
    // ===================================

    const alreadyReviewed =
      await Review.findOne({

        user: decoded.id,

        product,

      });

    if (alreadyReviewed) {

      return NextResponse.json(
        {
          success: false,
          message:
            "You already reviewed this product.",
        },
        {
          status: 400,
        }
      );

    }

    // ===================================
    // Verified Purchase Check
    // ===================================

    const purchased =
      await Order.findOne({

        user: decoded.id,

        "items.id": product,

      });

    const review =
      await Review.create({

        user: decoded.id,

        product,

        rating,

        title,

        comment,

        verifiedPurchase:
          !!purchased,

      });

    return NextResponse.json({

      success: true,

      message:
        "Review added successfully.",

      review,

    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to add review.",
      },
      {
        status: 500,
      }
    );

  }

}