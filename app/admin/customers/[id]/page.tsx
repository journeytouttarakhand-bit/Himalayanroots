"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Customer = {
  name: string;
  phone: string;
  email: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
};

type Order = {
  _id: string;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
};

export default function CustomerDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchCustomer();
  }, []);

  async function fetchCustomer() {
    try {
      const res = await fetch(
        `/api/customers/${id}`
      );

      const data = await res.json();

      if (data.success) {
        setCustomer(data.customer);
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
        Loading Customer...
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-10 text-center text-red-600 text-xl">
        Customer Not Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-green-900">
            Customer Details
          </h1>

          <p className="text-gray-500 mt-2">
            Complete customer profile & order history
          </p>

        </div>

        <Link
          href="/admin/customers"
          className="bg-gray-200 hover:bg-gray-300 px-5 py-3 rounded-lg"
        >
          ← Back
        </Link>

      </div>
            {/* Customer Info */}

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="rounded-xl border bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Customer Name
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {customer.name}
          </h2>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Phone
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            {customer.phone}
          </h2>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Email
          </p>

          <h2 className="mt-2 text-lg font-semibold break-all">
            {customer.email || "Not Available"}
          </h2>

        </div>

        <div className="rounded-xl border bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Address
          </p>

          <h2 className="mt-2 text-lg font-semibold">
            {customer.address || "Not Available"}
          </h2>

        </div>

      </div>

      {/* Statistics */}

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        <div className="rounded-xl bg-green-700 p-6 text-white">

          <p className="text-green-100">
            Total Orders
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {customer.totalOrders}
          </h2>

        </div>

        <div className="rounded-xl bg-blue-700 p-6 text-white">

          <p className="text-blue-100">
            Total Spending
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            ₹{customer.totalSpent.toLocaleString()}
          </h2>

        </div>

        <div className="rounded-xl bg-purple-700 p-6 text-white">

          <p className="text-purple-100">
            Last Order
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            {new Date(
              customer.lastOrder
            ).toLocaleDateString()}
          </h2>

        </div>

      </div>
            {/* Order History */}

      <div className="mt-10 rounded-xl border bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-green-900">
            Order History
          </h2>

          <p className="mt-2 text-gray-500">
            All orders placed by this customer
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-50">

              <tr>

                <th className="p-4 text-left">
                  Order ID
                </th>

                <th className="p-4 text-center">
                  Amount
                </th>

                <th className="p-4 text-center">
                  Payment
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
                  Date
                </th>

                <th className="p-4 text-center">
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

                  <td className="p-4 font-mono text-sm">
                    {order._id.slice(-8)}
                  </td>

                  <td className="text-center font-bold text-green-700">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>

                  <td className="text-center">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
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
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
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
                      href={`/admin/order/${order._id}`}
                      className="inline-block rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
                    >
                      View Order
                    </Link>

                  </td>

                </tr>

              ))}

              {orders.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="py-10 text-center text-gray-500"
                  >
                    No Orders Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>
          </div>
  );
}