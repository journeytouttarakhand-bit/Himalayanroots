import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .lean();

    const customerMap = new Map();

    orders.forEach((order: any) => {
      const phone =
        order.customer?.phone || "";

      if (!phone) return;

      if (!customerMap.has(phone)) {
        customerMap.set(phone, {
          id: phone,

          name:
            order.customer?.name ||
            "Unknown",

          phone,

          email:
            order.customer?.email ||
            "",

          address:
            order.customer?.address ||
            "",

          totalOrders: 1,

          totalSpent:
            order.totalAmount || 0,

          lastOrder:
            order.createdAt,

          createdAt:
            order.createdAt,
        });
      } else {
        const customer =
          customerMap.get(phone);

        customer.totalOrders += 1;

        customer.totalSpent +=
          order.totalAmount || 0;

        if (
          new Date(order.createdAt) >
          new Date(customer.lastOrder)
        ) {
          customer.lastOrder =
            order.createdAt;
        }

        customerMap.set(
          phone,
          customer
        );
      }
    });

    const customers = Array.from(
      customerMap.values()
    ).sort(
      (a: any, b: any) =>
        new Date(b.lastOrder).getTime() -
        new Date(a.lastOrder).getTime()
    );

    return NextResponse.json({
      success: true,

      totalCustomers:
        customers.length,

      customers,
    });
  } catch (error) {
    console.error(
      "Customers API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch customers",
      },
      {
        status: 500,
      }
    );
  }
}