"use client";

import { useEffect, useState } from "react";

interface ReportData {
  totalRevenue: number;
  totalOrders: number;
  uniqueCustomers: number;
  totalProductsSold: number;
  recentOrders: any[];
  orderStatus: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
  };
  paymentStatus: {
    paid: number;
    failed: number;
    pending: number;
  };
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  topCustomers: Array<{
    name: string;
    orders: number;
    spent: number;
  }>;
}

interface DateRangeStats {
  sales: number;
  orders: number;
  customers: number;
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [todayStats, setTodayStats] = useState<DateRangeStats>({ sales: 0, orders: 0, customers: 0 });
  const [weekStats, setWeekStats] = useState<DateRangeStats>({ sales: 0, orders: 0, customers: 0 });
  const [monthStats, setMonthStats] = useState<DateRangeStats>({ sales: 0, orders: 0, customers: 0 });

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const res = await fetch("/api/admin/reports");
      const json = await res.json();

      if (json.success) {
        setData(json.data);
        calculateDateRangeStats(json.data.recentOrders);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  }

  function calculateDateRangeStats(orders: any[]) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    let todaySales = 0, todayOrders = 0, todayCustomers = new Set<string>();
    let weekSales = 0, weekOrders = 0, weekCustomers = new Set<string>();
    let monthSales = 0, monthOrders = 0, monthCustomers = new Set<string>();

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);

      if (orderDate.getTime() === today.getTime()) {
        todaySales += order.finalAmount || 0;
        todayOrders += 1;
        if (order.customer?.phone) todayCustomers.add(order.customer.phone);
      }

      if (orderDate >= weekAgo && orderDate <= today) {
        weekSales += order.finalAmount || 0;
        weekOrders += 1;
        if (order.customer?.phone) weekCustomers.add(order.customer.phone);
      }

      if (orderDate >= monthAgo && orderDate <= today) {
        monthSales += order.finalAmount || 0;
        monthOrders += 1;
        if (order.customer?.phone) monthCustomers.add(order.customer.phone);
      }
    });

    setTodayStats({ sales: todaySales, orders: todayOrders, customers: todayCustomers.size });
    setWeekStats({ sales: weekSales, orders: weekOrders, customers: weekCustomers.size });
    setMonthStats({ sales: monthSales, orders: monthOrders, customers: monthCustomers.size });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">Loading reports...</p>
      </div>
    );
  }
  return (
    <div className="p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-900">
          Reports Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Sales Reports, Orders Analytics & Business Insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Total Sales</h3>
          <p className="mt-3 text-3xl font-bold text-green-700">
            ₹{data?.totalRevenue.toLocaleString() || 0}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Total Orders</h3>
          <p className="mt-3 text-3xl font-bold text-blue-700">
            {data?.totalOrders || 0}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Customers</h3>
          <p className="mt-3 text-3xl font-bold text-purple-700">
            {data?.uniqueCustomers || 0}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-gray-500">Products Sold</h3>
          <p className="mt-3 text-3xl font-bold text-orange-700">
            {data?.totalProductsSold || 0}
          </p>
        </div>

      </div>

      <div className="mt-10 rounded-xl bg-white p-10 shadow">

        <h2 className="mb-4 text-2xl font-bold text-green-900">
          Sales Analytics
        </h2>

        <div className="flex h-80 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">

          <p className="text-gray-500">
            Sales Graph Coming in Part 2
          </p>

        </div>

      </div>

      {/* ================================= */}
      {/* Quick Report Cards */}
      {/* ================================= */}

      <div className="mt-10 grid gap-6 lg:grid-cols-3">

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-xl font-bold text-green-900">
            Today's Report
          </h3>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between">

              <span className="text-gray-600">
                Sales
              </span>

              <span className="font-bold text-green-700">
                ₹{todayStats.sales.toLocaleString()}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Orders
              </span>

              <span className="font-bold">
                {todayStats.orders}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Customers
              </span>

              <span className="font-bold">
                {todayStats.customers}
              </span>

            </div>

          </div>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-xl font-bold text-blue-900">
            This Week
          </h3>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between">

              <span className="text-gray-600">
                Sales
              </span>

              <span className="font-bold text-blue-700">
                ₹{weekStats.sales.toLocaleString()}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Orders
              </span>

              <span className="font-bold">
                {weekStats.orders}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Customers
              </span>

              <span className="font-bold">
                {weekStats.customers}
              </span>

            </div>

          </div>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h3 className="text-xl font-bold text-purple-900">
            This Month
          </h3>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between">

              <span className="text-gray-600">
                Sales
              </span>

              <span className="font-bold text-purple-700">
                ₹{monthStats.sales.toLocaleString()}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Orders
              </span>

              <span className="font-bold">
                {monthStats.orders}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-600">
                Customers
              </span>

              <span className="font-bold">
                {monthStats.customers}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* Top Selling Products */}
      {/* ================================= */}

      <div className="mt-10 rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold text-green-900">
          Top Selling Products
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b">

              <tr>

                <th className="py-3 text-left">
                  Product
                </th>

                <th className="py-3 text-center">
                  Sold
                </th>

                <th className="py-3 text-right">
                  Revenue
                </th>

              </tr>

            </thead>

            <tbody>

              {data?.topProducts && data.topProducts.length > 0 ? (
                data.topProducts.map((product, idx) => (
                  <tr key={idx} className="border-b">

                    <td className="py-4">
                      {product.name}
                    </td>

                    <td className="text-center">
                      {product.quantity}
                    </td>

                    <td className="text-right font-semibold text-green-700">
                      ₹{product.revenue.toLocaleString()}
                    </td>

                  </tr>
                ))
              ) : (
                <tr className="border-b">

                  <td className="py-4">
                    No Data
                  </td>

                  <td className="text-center">
                    -
                  </td>

                  <td className="text-right">
                    ₹0
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================= */}
      {/* Recent Orders */}
      {/* ================================= */}

      <div className="mt-10 rounded-xl bg-white p-8 shadow">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-green-900">
            Recent Orders
          </h2>

          <button
            className="rounded-lg bg-green-700 px-5 py-2 font-semibold text-white transition hover:bg-green-800"
          >
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b bg-gray-50">

              <tr>

                <th className="p-4 text-left">
                  Order ID
                </th>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-center">
                  Amount
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-right">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {data?.recentOrders && data.recentOrders.length > 0 ? (
                data.recentOrders.map((order) => (
                  <tr key={order._id} className="border-b">

                    <td className="p-4 font-mono text-sm">
                      {order._id.toString().slice(-8).toUpperCase()}
                    </td>

                    <td className="p-4">
                      {order.customer?.name || "Unknown"}
                    </td>

                    <td className="p-4 text-center font-semibold text-green-700">
                      ₹{order.finalAmount?.toLocaleString() || 0}
                    </td>

                    <td className="p-4 text-center">
                      <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "Processing"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    <td className="p-4 text-right text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>

                  <td className="p-6 text-gray-500">
                    No Orders
                  </td>

                  <td></td>

                  <td></td>

                  <td></td>

                  <td></td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================= */}
      {/* Order Status */}
      {/* ================================= */}

      <div className="mt-10 grid gap-6 lg:grid-cols-4">

        <div className="rounded-xl bg-yellow-50 p-6 shadow">

          <p className="text-gray-600">
            Pending
          </p>

          <h3 className="mt-3 text-4xl font-bold text-yellow-600">
            {data?.orderStatus.pending || 0}
          </h3>

        </div>

        <div className="rounded-xl bg-blue-50 p-6 shadow">

          <p className="text-gray-600">
            Processing
          </p>

          <h3 className="mt-3 text-4xl font-bold text-blue-600">
            {data?.orderStatus.processing || 0}
          </h3>

        </div>

        <div className="rounded-xl bg-purple-50 p-6 shadow">

          <p className="text-gray-600">
            Shipped
          </p>

          <h3 className="mt-3 text-4xl font-bold text-purple-600">
            {data?.orderStatus.shipped || 0}
          </h3>

        </div>

        <div className="rounded-xl bg-green-50 p-6 shadow">

          <p className="text-gray-600">
            Delivered
          </p>

          <h3 className="mt-3 text-4xl font-bold text-green-700">
            {data?.orderStatus.delivered || 0}
          </h3>

        </div>

      </div>

      {/* ================================= */}
      {/* Payment Status */}
      {/* ================================= */}

      <div className="mt-10 rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold text-green-900">
          Payment Summary
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-green-100 p-6">

            <p className="text-gray-600">
              Paid
            </p>

            <h3 className="mt-2 text-4xl font-bold text-green-700">
              {data?.paymentStatus.paid || 0}
            </h3>

          </div>

          <div className="rounded-xl bg-red-100 p-6">

            <p className="text-gray-600">
              Failed
            </p>

            <h3 className="mt-2 text-4xl font-bold text-red-700">
              {data?.paymentStatus.failed || 0}
            </h3>

          </div>

          <div className="rounded-xl bg-yellow-100 p-6">

            <p className="text-gray-600">
              Pending
            </p>

            <h3 className="mt-2 text-4xl font-bold text-yellow-700">
              {data?.paymentStatus.pending || 0}
            </h3>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* Customers Report */}
      {/* ================================= */}

      <div className="mt-10 rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold text-green-900">
          Top Customers
        </h2>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="border-b bg-gray-50">

              <tr>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-center">
                  Orders
                </th>

                <th className="p-4 text-right">
                  Total Spent
                </th>

              </tr>

            </thead>

            <tbody>

              {data?.topCustomers && data.topCustomers.length > 0 ? (
                data.topCustomers.map((customer, idx) => (
                  <tr key={idx} className="border-b">

                    <td className="p-4">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {customer.name}
                        </p>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {customer.orders}
                      </span>
                    </td>

                    <td className="p-4 text-right font-semibold text-green-700">
                      ₹{customer.spent.toLocaleString()}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>

                  <td className="p-6 text-gray-500">
                    No Customers
                  </td>

                  <td></td>

                  <td></td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================= */}
      {/* Date Filter */}
      {/* ================================= */}

      <div className="mt-10 rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold text-green-900">
          Report Filters
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <label className="mb-2 block font-semibold">
              From Date
            </label>

            <input
              type="date"
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              To Date
            </label>

            <input
              type="date"
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div className="flex items-end">

            <button
              className="w-full rounded-lg bg-green-700 py-3 font-bold text-white transition hover:bg-green-800"
            >
              Generate Report
            </button>

          </div>

        </div>

      </div>

      {/* ================================= */}
      {/* Export Section */}
      {/* ================================= */}

      <div className="mt-10 rounded-xl bg-white p-8 shadow">

        <h2 className="mb-6 text-2xl font-bold text-green-900">
          Export Reports
        </h2>

        <div className="flex flex-wrap gap-4">

          <button
            className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            Export CSV
          </button>

          <button
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            Export Excel
          </button>

          <button
            className="rounded-lg bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800"
          >
            Print Report
          </button>

        </div>

      </div>

    </div>
  );
}