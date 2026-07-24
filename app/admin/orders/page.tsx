"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  _id: string;

  customer: {
    name: string;
    phone: string;
  };

  totalAmount: number;

  paymentStatus: string;

  orderStatus: string;

  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex items-center justify-between mb-8">

        <h1 className="text-4xl font-bold text-green-900">
          Orders
        </h1>

        <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
          {orders.length} Orders
        </span>

      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-50">

            <tr>

              <th className="text-left p-4">
                Customer
              </th>

              <th className="text-center p-4">
                Phone
              </th>

              <th className="text-center p-4">
                Amount
              </th>

              <th className="text-center p-4">
                Payment
              </th>

              <th className="text-center p-4">
                Status
              </th>

              <th className="text-center p-4">
                Date
              </th>

              <th className="text-center p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>
            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {order.customer.name}
                </td>

                <td className="text-center">
                  {order.customer.phone}
                </td>

                <td className="text-center font-bold text-green-700">
                  ₹{order.totalAmount}
                </td>

                <td className="text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>

                </td>

                <td className="text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "Processing"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                <td className="text-center">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="text-center">

                  <Link
                    href={`/admin/orders/${order._id}`}
                    className="inline-block bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

            {orders.length === 0 && (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No Orders Found
                </td>

              </tr>

            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}