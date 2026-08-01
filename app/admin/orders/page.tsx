"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  ShoppingBag,
  Eye,
  RefreshCw,
  Package,
  Truck,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";

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
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/orders",
        {
          cache: "no-store",
        }
      );

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

  const filteredOrders =
    useMemo(() => {
      return orders.filter((order) => {
        const keyword =
          search.toLowerCase();

        const searchMatch =
          order.customer.name
            .toLowerCase()
            .includes(keyword) ||

          order.customer.phone
            .toLowerCase()
            .includes(keyword) ||

          order._id
            .toLowerCase()
            .includes(keyword);

        const statusMatch =
          statusFilter === "All"
            ? true
            : order.orderStatus ===
              statusFilter;

        const paymentMatch =
          paymentFilter === "All"
            ? true
            : order.paymentStatus ===
              paymentFilter;

        return (
          searchMatch &&
          statusMatch &&
          paymentMatch
        );
      });
    }, [
      orders,
      search,
      statusFilter,
      paymentFilter,
    ]);

  const totalRevenue =
    filteredOrders.reduce(
      (sum, order) =>
        sum + order.totalAmount,
      0
    );

  const pendingOrders =
    filteredOrders.filter(
      (o) =>
        o.orderStatus === "Pending"
    ).length;

  const deliveredOrders =
    filteredOrders.filter(
      (o) =>
        o.orderStatus ===
        "Delivered"
    ).length;

  if (loading) {
    return (
      <div className="p-8">

        <div className="animate-pulse space-y-6">

          <div className="h-10 w-64 rounded bg-gray-200" />

          <div className="grid gap-6 md:grid-cols-4">

            {Array.from({
              length: 4,
            }).map((_, i) => (
              <div
                key={i}
                className="h-36 rounded-2xl bg-gray-200"
              />
            ))}

          </div>

          <div className="h-[500px] rounded-2xl bg-gray-200" />

        </div>

      </div>
    );
  }
    return (
    <div className="space-y-8 p-6 lg:p-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Orders Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage customer orders, payments & deliveries.
          </p>

        </div>

        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Total Orders
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {filteredOrders.length}
              </h2>

            </div>

            <div className="rounded-full bg-green-100 p-4">

              <ShoppingBag
                size={28}
                className="text-green-700"
              />

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <h2 className="mt-2 text-3xl font-bold text-green-700">
                ₹{totalRevenue.toLocaleString()}
              </h2>

            </div>

            <div className="rounded-full bg-green-100 p-4">

              <IndianRupee
                size={28}
                className="text-green-700"
              />

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                {pendingOrders}
              </h2>

            </div>

            <div className="rounded-full bg-yellow-100 p-4">

              <Package
                size={28}
                className="text-yellow-600"
              />

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-500">
                Delivered
              </p>

              <h2 className="mt-2 text-3xl font-bold text-blue-700">
                {deliveredOrders}
              </h2>

            </div>

            <div className="rounded-full bg-blue-100 p-4">

              <Truck
                size={28}
                className="text-blue-700"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-4">

          <div className="relative lg:col-span-2">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search customer, phone or order id..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Packed</option>
            <option>Shipped</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) =>
              setPaymentFilter(e.target.value)
            }
            className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
          >
            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>

        </div>

      </div>

      {/* Orders Table */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">
                        <thead className="bg-green-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Customer
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Amount
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Payment
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Order Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Date
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-t transition hover:bg-gray-50"
                >

                  <td className="px-6 py-5">

                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {order.customer.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.customer.phone}
                      </p>

                      <p className="mt-1 text-xs font-mono text-gray-400">
                        #{order._id.slice(-8)}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span className="text-lg font-bold text-green-700">
                      ₹{order.totalAmount.toLocaleString()}
                    </span>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.paymentStatus === "Refunded"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "Out for Delivery"
                          ? "bg-indigo-100 text-indigo-700"
                          : order.orderStatus === "Packed"
                          ? "bg-purple-100 text-purple-700"
                          : order.orderStatus === "Confirmed"
                          ? "bg-cyan-100 text-cyan-700"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >

                      {order.orderStatus}

                    </span>

                  </td>

                  <td className="px-6 py-5 text-center text-sm text-gray-600">

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}

                  </td>

                  <td className="px-6 py-5 text-center">

                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
                    >

                      <Eye size={16} />

                      View

                    </Link>

                  </td>

                </tr>

              ))}
                            {filteredOrders.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="px-6 py-20"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <Package
                        size={64}
                        className="text-gray-300"
                      />

                      <h3 className="mt-5 text-2xl font-bold text-gray-700">
                        No Orders Found
                      </h3>

                      <p className="mt-2 text-gray-500">
                        Try changing the search keyword or filters.
                      </p>

                    </div>

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