"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  createdAt: string;
  finalAmount: number;
  paymentStatus: string;
  orderStatus: string;
};

export default function MyOrdersPage() {

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadOrders();

  }, []);

  async function loadOrders() {

    try {

      const res =
        await fetch(
          "/api/my-orders",
          {
            cache: "no-store",
          }
        );

      const data =
        await res.json();

      if (data.success) {

        setOrders(data.orders);

      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  }

  if (loading) {

    return (

      <div className="mx-auto max-w-7xl p-10">

        Loading...

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-7xl px-6 py-12">

      <h1 className="mb-8 text-4xl font-bold text-green-900">

        My Orders

      </h1>

      {orders.length === 0 ? (

        <div className="rounded-xl bg-white p-10 text-center shadow">

          <h2 className="text-2xl font-bold">

            No Orders Yet

          </h2>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-bold text-white"
          >

            Shop Now

          </Link>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="rounded-xl border bg-white p-6 shadow"
            >

              <div className="flex flex-col justify-between gap-5 md:flex-row">

                <div>

                  <h2 className="text-xl font-bold">

                    Order #{order._id.slice(-8)}

                  </h2>

                  <p className="mt-2 text-gray-500">

                    {new Date(
                      order.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

                <div className="text-right">

                  <p className="text-2xl font-bold text-green-700">

                    ₹{order.finalAmount}

                  </p>

                  <p>

                    Payment :
                    {" "}
                    {order.paymentStatus}

                  </p>

                  <p>

                    Status :
                    {" "}
                    {order.orderStatus}

                  </p>

                </div>

              </div>

              <div className="mt-6">

                <Link
                  href={`/my-orders/${order._id}`}
                  className="rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
                >

                  View Details

                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}