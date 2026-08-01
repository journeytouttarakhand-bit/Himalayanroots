import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const phone = decodeURIComponent(id);

    const orders = await Order.find({
      "customer.phone": phone,
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

    const latestOrder: any = orders[0];

    let lifetimeSpend = 0;
    let totalProductsPurchased = 0;

    orders.forEach((order: any) => {
      lifetimeSpend +=
        order.finalAmount ||
        order.totalAmount ||
        0;

      if (Array.isArray(order.items)) {
        order.items.forEach((item: any) => {
          totalProductsPurchased +=
            item.quantity || 0;
        });
      }
    });

    const averageOrderValue =
      orders.length > 0
        ? Math.round(
            lifetimeSpend / orders.length
          )
        : 0;

    const customer = {
      name:
        latestOrder.customer?.name ||
        "Unknown",

      email:
        latestOrder.customer?.email ||
        "",

      phone:
        latestOrder.customer?.phone ||
        "",

      address:
        latestOrder.customer?.address ||
        "",

      city:
        latestOrder.customer?.city ||
        "",

      state:
        latestOrder.customer?.state ||
        "",

      pincode:
        latestOrder.customer?.pincode ||
        "",

      notes:
        latestOrder.customer?.notes ||
        "",

      totalOrders: orders.length,

      lifetimeSpend,

      averageOrderValue,

      totalProductsPurchased,

      firstOrderDate:
        orders[orders.length - 1]?.createdAt,

      lastOrderDate:
        latestOrder.createdAt,
    };

    const formattedOrders = orders.map(
      (order: any) => ({
        _id: order._id.toString(),

        orderId:
          order.orderId ||
          order._id.toString(),

        paymentId:
          order.paymentId || "",

        totalAmount:
          order.totalAmount || 0,

        originalAmount:
          order.originalAmount || 0,

        discount:
          order.discount || 0,

        finalAmount:
          order.finalAmount ||
          order.totalAmount ||
          0,

        couponCode:
          order.couponCode || "",

        paymentStatus:
          order.paymentStatus ||
          "Pending",

        orderStatus:
          order.orderStatus ||
          "Pending",

        createdAt:
          order.createdAt,

        updatedAt:
          order.updatedAt,

        totalItems:
          Array.isArray(order.items)
            ? order.items.reduce(
                (
                  sum: number,
                  item: any
                ) =>
                  sum +
                  (item.quantity || 0),
                0
              )
            : 0,

        items: Array.isArray(order.items)
          ? order.items.map(
              (item: any) => ({
                id: item.id,
                slug: item.slug,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                subtotal:
                  (item.price || 0) *
                  (item.quantity || 0),
              })
            )
          : [],
      })
    );

    return NextResponse.json({
      success: true,
      customer,
      orders: formattedOrders,
    });
  } catch (error: any) {
    console.error(
      "Customer Details API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to fetch customer details.",
      },
      {
        status: 500,
      }
    );
  }
}