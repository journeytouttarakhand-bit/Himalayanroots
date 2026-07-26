import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";
import Product from "@/database/Product";

export async function GET() {
  try {
    await connectDB();

    // Total Orders & Revenue
    const orders = await Order.find().lean();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.finalAmount || 0), 0);

    // Unique Customers
    const uniqueCustomers = new Set(orders.map((order) => order.customer?.phone)).size;

    // Total Products Sold
    const totalProductsSold = orders.reduce((sum, order) => {
      return sum + (order.items?.reduce((itemSum: number, item: any) => itemSum + (item.quantity || 0), 0) || 0);
    }, 0);

    // Recent Orders (last 10)
    const recentOrders = orders
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10);

    // Order Status Breakdown
    const orderStatus = {
      pending: orders.filter((o) => o.orderStatus === "Pending").length,
      processing: orders.filter((o) => o.orderStatus === "Processing").length,
      shipped: orders.filter((o) => o.orderStatus === "Shipped").length,
      delivered: orders.filter((o) => o.orderStatus === "Delivered").length,
    };

    // Payment Status Breakdown
    const paymentStatus = {
      paid: orders.filter((o) => o.paymentStatus === "Paid").length,
      failed: orders.filter((o) => o.paymentStatus === "Failed").length,
      pending: orders.filter((o) => o.paymentStatus === "Pending").length,
    };

    // Top Selling Products
    const productSalesMap = new Map<string, { name: string; quantity: number; revenue: number }>();
    orders.forEach((order) => {
      order.items?.forEach((item: any) => {
        const key = item.id;
        if (productSalesMap.has(key)) {
          const existing = productSalesMap.get(key)!;
          existing.quantity += item.quantity || 0;
          existing.revenue += (item.price || 0) * (item.quantity || 0);
        } else {
          productSalesMap.set(key, {
            name: item.name || "Unknown",
            quantity: item.quantity || 0,
            revenue: (item.price || 0) * (item.quantity || 0),
          });
        }
      });
    });

    const topProducts = Array.from(productSalesMap.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Top Customers
    const customerMap = new Map<string, { name: string; orders: number; spent: number }>();
    orders.forEach((order) => {
      const phone = order.customer?.phone;
      const name = order.customer?.name || "Unknown";
      if (phone) {
        if (customerMap.has(phone)) {
          const existing = customerMap.get(phone)!;
          existing.orders += 1;
          existing.spent += order.finalAmount || 0;
        } else {
          customerMap.set(phone, {
            name,
            orders: 1,
            spent: order.finalAmount || 0,
          });
        }
      }
    });

    const topCustomers = Array.from(customerMap.values())
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        totalOrders,
        uniqueCustomers,
        totalProductsSold,
        recentOrders,
        orderStatus,
        paymentStatus,
        topProducts,
        topCustomers,
      },
    });
  } catch (error) {
    console.error("Reports API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch reports",
      },
      { status: 500 }
    );
  }
}
