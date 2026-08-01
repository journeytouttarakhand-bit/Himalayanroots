"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  Users,
  Eye,
} from "lucide-react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalOrders: number;
  lifetimeSpend: number;
  totalProductsPurchased: number;
  lastOrderDate: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const res = await fetch("/api/admin/customers", {
        cache: "no-store",
      });

      const json = await res.json();

      if (json.success) {
        setCustomers(json.customers);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredCustomers = useMemo(() => {
    const keyword = search.toLowerCase();

    return customers.filter((customer) => {
      return (
        customer.name?.toLowerCase().includes(keyword) ||
        customer.phone?.toLowerCase().includes(keyword) ||
        customer.email?.toLowerCase().includes(keyword)
      );
    });
  }, [customers, search]);

  if (loading) {
    return (
      <div className="p-10">
        <div className="animate-pulse space-y-5">
          <div className="h-10 w-64 rounded bg-gray-200" />
          <div className="h-14 rounded bg-gray-200" />
          <div className="h-[500px] rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Customers
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your customers
          </p>
        </div>

        <div className="rounded-xl bg-green-100 px-5 py-3 font-semibold text-green-700">
          {filteredCustomers.length} Customers
        </div>
      </div>

      <div className="relative max-w-md">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search by name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-green-50">
              <tr>
                <th className="px-6 py-4 text-left">
                  Customer
                </th>

                <th className="px-6 py-4 text-center">
                  Orders
                </th>

                <th className="px-6 py-4 text-center">
                  Products
                </th>

                <th className="px-6 py-4 text-center">
                  Lifetime Spend
                </th>

                <th className="px-6 py-4 text-center">
                  Last Order
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.phone}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <Users
                          size={22}
                          className="text-green-700"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {customer.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {customer.email || "No Email"}
                        </p>

                        <p className="text-xs text-gray-400">
                          {customer.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-center font-semibold">
                    {customer.totalOrders}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {customer.totalProductsPurchased}
                  </td>

                  <td className="px-6 py-5 text-center font-bold text-green-700">
                    ₹{customer.lifetimeSpend.toLocaleString()}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {customer.lastOrderDate
                      ? new Date(
                          customer.lastOrderDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <Link
                      href={`/admin/customers/${encodeURIComponent(
                        customer.phone
                      )}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                    >
                      <Eye size={16} />
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center"
                  >
                    <Users
                      size={56}
                      className="mx-auto text-gray-300"
                    />

                    <h3 className="mt-4 text-xl font-semibold">
                      No Customers Found
                    </h3>

                    <p className="mt-2 text-gray-500">
                      Customer list is empty.
                    </p>
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