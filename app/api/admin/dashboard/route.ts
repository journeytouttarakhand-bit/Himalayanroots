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

    const [

      totalOrders,

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

      Coupon.countDocuments({
        active: true,
      }),

      Review.countDocuments(),

      Order.find(),

      Product.find({
        stock: {
          $gt: 0,
          $lte: 5,
        },
      })
        .select(
          "name stock image price"
        )
        .sort({
          stock: 1,
        }),

      Product.find({
        stock: 0,
      })
        .select(
          "name image price"
        )
        .sort({
          updatedAt: -1,
        }),

      Order.find()
        .sort({
          createdAt: -1,
        })
        .limit(10),

      Review.find(),

    ]);

    //----------------------------------
    // Revenue
    //----------------------------------

    const totalRevenue =
      orders.reduce(
        (
          sum: number,
          order: any
        ) =>
          sum +
          (order.finalAmount ||
            order.totalAmount),

        0
      );

    //----------------------------------
    // Today's Revenue
    //----------------------------------

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    const todayOrders =
      orders.filter(
        (order: any) =>
          new Date(
            order.createdAt
          ) >= today
      );

    const todayRevenue =
      todayOrders.reduce(
        (
          sum: number,
          order: any
        ) =>
          sum +
          (order.finalAmount ||
            order.totalAmount),

        0
      );

    const todayOrdersCount =
      todayOrders.length;

    //----------------------------------
    // Average Order Value
    //----------------------------------

    const averageOrderValue =
      totalOrders > 0
        ? Math.round(
            totalRevenue /
              totalOrders
          )
        : 0;
            //----------------------------------
    // Order Status
    //----------------------------------

    const pendingOrders =
      orders.filter(
        (order: any) =>
          order.orderStatus ===
          "Pending"
      ).length;

    const deliveredOrders =
      orders.filter(
        (order: any) =>
          order.orderStatus ===
          "Delivered"
      ).length;

    const cancelledOrders =
      orders.filter(
        (order: any) =>
          order.orderStatus ===
          "Cancelled"
      ).length;

    //----------------------------------
    // Unique Customers
    //----------------------------------

    const customers =
      new Set(
        orders.map(
          (order: any) =>
            order.customer?.phone
        )
      );

    const totalCustomers =
      customers.size;

    //----------------------------------
    // Monthly Sales
    //----------------------------------

    const monthlySales =
      Array(12)
        .fill(0)
        .map((_, index) => ({
          month: index,
          revenue: 0,
          orders: 0,
        }));

    orders.forEach(
      (order: any) => {

        const month =
          new Date(
            order.createdAt
          ).getMonth();

        monthlySales[
          month
        ].revenue +=
          order.finalAmount ||
          order.totalAmount;

        monthlySales[
          month
        ].orders += 1;

      }
    );

    //----------------------------------
    // Average Rating
    //----------------------------------

    const averageRating =
      reviews.length > 0
        ? Number(
            (
              reviews.reduce(
                (
                  sum: number,
                  review: any
                ) =>
                  sum +
                  review.rating,

                0
              ) /
              reviews.length
            ).toFixed(1)
          )
        : 0;

    //----------------------------------
    // Best Selling Products
    //----------------------------------

    const productSales:
      Record<
        string,
        {
          name: string;
          sold: number;
          revenue: number;
          image: string;
        }
      > = {};

    orders.forEach(
      (order: any) => {

        order.items.forEach(
          (item: any) => {

            if (
              !productSales[
                item.name
              ]
            ) {

              productSales[
                item.name
              ] = {

                name: item.name,

                sold: 0,

                revenue: 0,

                image:
                  item.image,

              };

            }

            productSales[
              item.name
            ].sold +=
              item.quantity;

            productSales[
              item.name
            ].revenue +=
              item.price *
              item.quantity;

          }
        );

      }
    );

    const topProducts =
      Object.values(
        productSales
      )
        .sort(
          (
            a,
            b
          ) =>
            b.sold -
            a.sold
        )
        .slice(0, 10);
            //----------------------------------
    // Response
    //----------------------------------

    return NextResponse.json({

      success: true,

      overview: {

        totalRevenue,

        todayRevenue,

        averageOrderValue,

        todayOrdersCount,

        totalOrders,

        totalProducts,

        totalCategories,

        totalCustomers,

        pendingOrders,

        deliveredOrders,

        cancelledOrders,

        activeCoupons,

        totalReviews,

        averageRating,

      },

      monthlySales,

      recentOrders,

      lowStockProducts,

      outOfStockProducts,

      topProducts,

    });

  } catch (error) {

    console.error(
      "Dashboard Error:",
      error
    );

    return NextResponse.json(

      {

        success: false,

        message:
          "Dashboard fetch failed",

      },

      {

        status: 500,

      }

    );

  }

}