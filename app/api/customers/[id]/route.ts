import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    const orders = await Order.find({
      "customer.phone": id,
    })
      .sort({
        createdAt: -1,
      })
      .lean();

    if (!orders.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        {
          status: 404,
        }
      );
    }

    const customer = {
      name:
        orders[0].customer?.name ||
        "Unknown",

      phone:
        orders[0].customer?.phone ||
        "",

      email:
        orders[0].customer?.email ||
        "",

      address:
        orders[0].customer?.address ||
        "",

      totalOrders:
        orders.length,

      totalSpent:
        orders.reduce(
          (sum: number, order: any) =>
            sum + (order.totalAmount || 0),
          0
        ),

      lastOrder:
        orders[0].createdAt,
    };

    return NextResponse.json({
      success: true,
      customer,
      orders,
    });

  } catch (error) {

    console.error(
      "Customer Details Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch customer",
      },
      {
        status: 500,
      }
    );
  }
}