"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const res = await fetch("/api/customers", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setCustomers(data.customers);
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
        Loading Customers...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold text-green-900">
          Customers
        </h1>

        <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
          {customers.length} Customers
        </span>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow">

        <table className="w-full">

          <thead className="bg-green-50">

            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-center">Phone</th>
              <th className="p-4 text-center">Orders</th>
              <th className="p-4 text-center">Spent</th>
              <th className="p-4 text-center">Last Order</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr
                key={customer.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4">
                  <div className="font-semibold">
                    {customer.name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {customer.email || "No Email"}
                  </div>
                </td>

                <td className="text-center">
                  {customer.phone}
                </td>

                <td className="text-center font-semibold">
                  {customer.totalOrders}
                </td>

                <td className="text-center font-bold text-green-700">
                  ₹{customer.totalSpent.toLocaleString()}
                </td>

                <td className="text-center">
                  {new Date(
                    customer.lastOrder
                  ).toLocaleDateString()}
                </td>

                <td className="text-center">

                  <Link
                    href={`/admin/customers/${customer.id}`}
                    className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

            {customers.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No Customers Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}