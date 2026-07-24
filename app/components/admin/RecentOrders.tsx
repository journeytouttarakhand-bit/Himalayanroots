"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

type Customer = {
  name: string;
  phone: string;
  email?: string;
};

type Order = {
  _id: string;
  customer: Customer;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
};

type Props = {
  orders: Order[];
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getStatusColor(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getPaymentColor(status: string) {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Failed":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function RecentOrders({
  orders,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

      <div className="flex items-center justify-between px-6 py-5 border-b">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest customer orders
          </p>
        </div>

        <span className="text-sm font-semibold text-green-700">
          {orders.length} Orders
        </span>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr className="text-left">

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Customer
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Phone
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Amount
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Payment
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Date
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                Action
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No recent orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {order.customer.name}
                      </p>

                      {order.customer.email && (
                        <p className="text-sm text-gray-500">
                          {order.customer.email}
                        </p>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {order.customer.phone}
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-700">
                    ₹{order.totalAmount.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPaymentColor(
                        order.paymentStatus
                      )}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {formatDate(order.createdAt)}
                  </td>

                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-green-600 px-3 py-2 text-sm font-medium text-green-700 hover:bg-green-50 transition-colors"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">

        <p className="text-sm text-gray-500">
          Showing latest {orders.length} orders
        </p>

        <Link
          href="/admin/orders"
          className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          View All Orders
        </Link>

      </div>

    </div>
  );
}