import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Order from "@/database/Order";
import Product from "@/database/Product";
import Category from "@/database/Category";

export async function GET() {
  try {
    await connectDB();

    const [
      totalOrders,
      totalProducts,
      totalCategories,
      orders,
      lowStockProducts,
      outOfStockProducts,
      recentOrders,
    ] = await Promise.all([
      Order.countDocuments(),

      Product.countDocuments(),

      Category.countDocuments(),

      Order.find(),

      Product.find({
        stock: { $gt: 0, $lte: 5 },
      })
        .select("name stock image")
        .sort({ stock: 1 }),

      Product.find({
        stock: 0,
      })
        .select("name image")
        .sort({ updatedAt: -1 }),

      Order.find()
        .sort({ createdAt: -1 })
        .limit(10),
    ]);

    //-----------------------------------
    // Revenue
    //-----------------------------------

    const totalRevenue = orders.reduce(
      (sum: number, order: any) => sum + order.totalAmount,
      0
    );

    //-----------------------------------
    // Order Status
    //-----------------------------------

    const pendingOrders = orders.filter(
      (o: any) => o.orderStatus === "Pending"
    ).length;

    const deliveredOrders = orders.filter(
      (o: any) => o.orderStatus === "Delivered"
    ).length;

    const cancelledOrders = orders.filter(
      (o: any) => o.orderStatus === "Cancelled"
    ).length;

    //-----------------------------------
    // Unique Customers
    //-----------------------------------

    const customers = new Set(
      orders.map((o: any) => o.customer.phone)
    );

    const totalCustomers = customers.size;

    //-----------------------------------
    // Monthly Sales
    //-----------------------------------

    const monthlySales = Array(12)
      .fill(0)
      .map((_, i) => ({
        month: i,
        revenue: 0,
        orders: 0,
      }));

    orders.forEach((order: any) => {
      const month = new Date(order.createdAt).getMonth();

      monthlySales[month].revenue += order.totalAmount;
      monthlySales[month].orders += 1;
    });

    //-----------------------------------

    return NextResponse.json({
      success: true,

      overview: {
        totalRevenue,
        totalOrders,
        totalProducts,
        totalCategories,
        totalCustomers,

        pendingOrders,
        deliveredOrders,
        cancelledOrders,
      },

      monthlySales,

      recentOrders,

      lowStockProducts,

      outOfStockProducts,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Dashboard fetch failed",
      },
      {
        status: 500,
      }
    );
  }
}