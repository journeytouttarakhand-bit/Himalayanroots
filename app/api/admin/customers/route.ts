import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/database/Order";

export async function GET() {
  try {
    await connectDB();

    const customers = await Order.aggregate([
      {
        $match: {
          "customer.phone": {
            $exists: true,
            $ne: "",
          },
        },
      },

      {
        $group: {
          _id: "$customer.phone",

          name: {
            $first: {
              $ifNull: [
                "$customer.name",
                "Unknown",
              ],
            },
          },

          email: {
            $first: {
              $ifNull: [
                "$customer.email",
                "",
              ],
            },
          },

          phone: {
            $first: "$customer.phone",
          },

          address: {
            $first: {
              $ifNull: [
                "$customer.address",
                "",
              ],
            },
          },

          city: {
            $first: {
              $ifNull: [
                "$customer.city",
                "",
              ],
            },
          },

          state: {
            $first: {
              $ifNull: [
                "$customer.state",
                "",
              ],
            },
          },

          pincode: {
            $first: {
              $ifNull: [
                "$customer.pincode",
                "",
              ],
            },
          },

          totalOrders: {
            $sum: 1,
          },

          lifetimeSpend: {
            $sum: {
              $ifNull: [
                "$finalAmount",
                "$totalAmount",
              ],
            },
          },

          totalProductsPurchased: {
            $sum: {
              $reduce: {
                input: {
                  $ifNull: [
                    "$items",
                    [],
                  ],
                },
                initialValue: 0,
                in: {
                  $add: [
                    "$$value",
                    {
                      $ifNull: [
                        "$$this.quantity",
                        1,
                      ],
                    },
                  ],
                },
              },
            },
          },

          lastOrderDate: {
            $max: "$createdAt",
          },

          orders: {
            $push: {
              _id: "$_id",

              orderId: {
                $ifNull: [
                  "$orderId",
                  "",
                ],
              },

              paymentId: {
                $ifNull: [
                  "$paymentId",
                  "",
                ],
              },

              totalAmount: {
                $ifNull: [
                  "$totalAmount",
                  0,
                ],
              },

              finalAmount: {
                $ifNull: [
                  "$finalAmount",
                  "$totalAmount",
                ],
              },

              orderStatus: {
                $ifNull: [
                  "$orderStatus",
                  "Pending",
                ],
              },

              paymentStatus: {
                $ifNull: [
                  "$paymentStatus",
                  "Pending",
                ],
              },

              createdAt: "$createdAt",
            },
          },
        },
      },

      {
        $sort: {
          lifetimeSpend: -1,
        },
      },

      {
        $project: {
          _id: 0,

          id: "$phone",

          name: 1,
          email: 1,
          phone: 1,

          address: 1,
          city: 1,
          state: 1,
          pincode: 1,

          totalOrders: 1,
          lifetimeSpend: 1,
          totalProductsPurchased: 1,
          lastOrderDate: 1,

          orders: 1,
        },
      },
    ]);

    return NextResponse.json(
      {
        success: true,
        totalCustomers: customers.length,
        customers,
      },
      {
        headers: {
          "Cache-Control":
            "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error(
      "Customers API Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to fetch customers.",
        customers: [],
      },
      {
        status: 500,
      }
    );
  }
}