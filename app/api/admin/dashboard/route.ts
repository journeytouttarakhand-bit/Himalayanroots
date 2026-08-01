import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";
import Product from "@/database/Product";
import Category from "@/database/Category";
import Coupon from "@/database/Coupon";
import Review from "@/database/Review";

export async function GET() {
  try {
    await connectDB();

    // Parallel Database Queries with .lean() for plain JS objects
    const [
      totalOrdersCount,
      totalProducts,
      totalCategories,
      activeCoupons,
      totalReviews,
      orders,
      lowStockProducts,
      outOfStockProducts,
      recentOrders,
      reviews,
    ] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments(),
      Category.countDocuments(),
      Coupon.countDocuments({ active: true }),
      Review.countDocuments(),
      Order.find().sort({ createdAt: -1 }).lean(),
      Product.find({ stock: { $gt: 0, $lte: 5 } })
        .select("name stock image price")
        .sort({ stock: 1 })
        .lean(),
      Product.find({ stock: 0 })
        .select("name image price")
        .sort({ updatedAt: -1 })
        .lean(),
      Order.find().sort({ createdAt: -1 }).limit(10).lean(),
      Review.find().lean(),
    ]);

    const allOrders = orders || [];
    const totalOrders = totalOrdersCount || allOrders.length;

    // ----------------------------------
    // Total Revenue Calculation Fix
    // ----------------------------------
    // Priority: finalAmount if > 0, else totalAmount, else originalAmount
    const totalRevenue = allOrders.reduce((sum: number, order: any) => {
      const amount =
        order.finalAmount && order.finalAmount > 0
          ? order.finalAmount
          : order.totalAmount || order.originalAmount || 0;
      return sum + amount;
    }, 0);

    // ----------------------------------
    // Today's Revenue & Orders
    // ----------------------------------
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = allOrders.filter(
      (order: any) => new Date(order.createdAt) >= today
    );

    const todayRevenue = todayOrders.reduce((sum: number, order: any) => {
      const amount =
        order.finalAmount && order.finalAmount > 0
          ? order.finalAmount
          : order.totalAmount || order.originalAmount || 0;
      return sum + amount;
    }, 0);

    const todayOrdersCount = todayOrders.length;

    // ----------------------------------
    // Average Order Value
    // ----------------------------------
    const averageOrderValue =
      totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    // ----------------------------------
    // Order Status Breakdown
    // ----------------------------------
    const pendingOrders = allOrders.filter(
      (order: any) => order.orderStatus === "Pending"
    ).length;

    const deliveredOrders = allOrders.filter(
      (order: any) => order.orderStatus === "Delivered"
    ).length;

    const cancelledOrders = allOrders.filter(
      (order: any) => order.orderStatus === "Cancelled"
    ).length;

    // ----------------------------------
    // Unique Customers
    // ----------------------------------
    const customerPhoneSet = new Set(
      allOrders
        .map((order: any) => order.customer?.phone)
        .filter((phone) => phone && phone.trim() !== "")
    );

    const totalCustomers = customerPhoneSet.size;

    // ----------------------------------
    // Monthly Sales Analytics (0 = Jan, 11 = Dec)
    // ----------------------------------
    const monthlySales = Array(12)
      .fill(0)
      .map((_, index) => ({
        month: index,
        revenue: 0,
        orders: 0,
      }));

    allOrders.forEach((order: any) => {
      if (order.createdAt) {
        const monthIndex = new Date(order.createdAt).getMonth();
        const amount =
          order.finalAmount && order.finalAmount > 0
            ? order.finalAmount
            : order.totalAmount || order.originalAmount || 0;

        monthlySales[monthIndex].revenue += amount;
        monthlySales[monthIndex].orders += 1;
      }
    });

    // ----------------------------------
    // Average Rating
    // ----------------------------------
    const allReviews = reviews || [];
    const averageRating =
      allReviews.length > 0
        ? Number(
            (
              allReviews.reduce(
                (sum: number, r: any) => sum + (r.rating || 0),
                0
              ) / allReviews.length
            ).toFixed(1)
          )
        : 0;

    // ----------------------------------
    // Best Selling Products Map
    // ----------------------------------
    const productSalesMap: Record<
      string,
      { name: string; sold: number; revenue: number; image: string }
    > = {};

    allOrders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const itemName = item.name || "Unknown Product";
        const qty = item.quantity || 1;
        const price = item.price || 0;

        if (!productSalesMap[itemName]) {
          productSalesMap[itemName] = {
            name: itemName,
            sold: 0,
            revenue: 0,
            image: item.image || "/placeholder.png",
          };
        }

        productSalesMap[itemName].sold += qty;
        productSalesMap[itemName].revenue += price * qty;
      });
    });

    const topProducts = Object.values(productSalesMap)
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    // ----------------------------------
    // Response Return
    // ----------------------------------
    return NextResponse.json({
      success: true,
      overview: {
        totalRevenue,
        todayRevenue,
        averageOrderValue,
        todayOrdersCount,
        totalOrders,
        totalProducts: totalProducts || 0,
        totalCategories: totalCategories || 0,
        totalCustomers,
        pendingOrders,
        deliveredOrders,
        cancelledOrders,
        activeCoupons: activeCoupons || 0,
        totalReviews: totalReviews || 0,
        averageRating,
      },
      monthlySales,
      recentOrders: recentOrders || [],
      lowStockProducts: lowStockProducts || [],
      outOfStockProducts: outOfStockProducts || [],
      topProducts,
    });
  } catch (error: any) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to fetch dashboard data",
      },
      { status: 500 }
    );
  }
}