import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";

import { sendEmail } from "@/lib/email";

import {
  orderShippedTemplate,
  orderDeliveredTemplate,
} from "@/lib/emailTemplates";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// ===========================
// GET SINGLE ORDER
// ===========================

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    const order = await Order.findById(id).lean();

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get Order Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch order",
      },
      {
        status: 500,
      }
    );
  }
}

// ===========================
// UPDATE ORDER STATUS
// ===========================

export async function PATCH(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    order.orderStatus = body.orderStatus;

    await order.save();

    // ==========================
    // SEND EMAIL
    // ==========================

    try {
      if (order.customer?.email) {
        if (order.orderStatus === "Shipped") {
          await sendEmail({
            to: order.customer.email,
            subject:
              "Your Himalayan Roots Order has been Shipped 📦",
            html: orderShippedTemplate({
              customerName: order.customer.name,
              orderId:
                order.orderId || order._id.toString(),
              amount:
                order.finalAmount ||
                order.totalAmount,
            }),
          });
        }

        if (order.orderStatus === "Delivered") {
          await sendEmail({
            to: order.customer.email,
            subject:
              "Your Himalayan Roots Order has been Delivered ✅",
            html: orderDeliveredTemplate({
              customerName: order.customer.name,
              orderId:
                order.orderId || order._id.toString(),
              amount:
                order.finalAmount ||
                order.totalAmount,
            }),
          });
        }
      }
    } catch (emailError) {
      console.error(
        "Status Email Error:",
        emailError
      );
    }

    const updatedOrder =
      await Order.findById(id).lean();

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error(
      "Update Order Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update order",
      },
      {
        status: 500,
      }
    );
  }
}

// ===========================
// DELETE ORDER
// ===========================

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();

    const { id } = await params;

    const order =
      await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    await Order.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message:
        "Order deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Order Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete order",
      },
      {
        status: 500,
      }
    );
  }
}