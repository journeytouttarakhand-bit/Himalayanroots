"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

import Image from "next/image";

import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  IndianRupee,
  Package,
  Calendar,
} from "lucide-react";

type OrderItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
};

type Order = {
  _id: string;
  orderId: string;
  paymentId: string;
  totalAmount: number;
  originalAmount: number;
  discount: number;
  finalAmount: number;
  couponCode: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  totalItems: number;
  items: OrderItem[];
};

type Customer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;

  totalOrders: number;

  lifetimeSpend: number;

  averageOrderValue: number;

  totalProductsPurchased: number;

  firstOrderDate: string;

  lastOrderDate: string;
};

export default function CustomerDetailsPage() {

  const params = useParams();

  const id = decodeURIComponent(
    params.id as string
  );

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCustomer();
  }, []);

  async function loadCustomer() {

    try {

      const res = await fetch(
        `/api/admin/customers/${encodeURIComponent(
          id
        )}`,
        {
          cache: "no-store",
        }
      );

      const json = await res.json();

      if (json.success) {

        setCustomer(json.customer);

        setOrders(json.orders);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="p-8">

        <div className="animate-pulse space-y-6">

          <div className="h-10 w-72 rounded bg-gray-200" />

          <div className="grid gap-6 lg:grid-cols-4">

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

  if (!customer) {

    return (

      <div className="flex h-[60vh] items-center justify-center">

        <div className="rounded-xl border border-red-200 bg-red-50 p-8">

          <h2 className="text-2xl font-bold text-red-700">
            Customer Not Found
          </h2>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-8 p-6 lg:p-8">

      <div className="flex items-center justify-between">

        <div>

          <Link
            href="/admin/customers"
            className="mb-5 inline-flex items-center gap-2 text-green-700 hover:text-green-800"
          >

            <ArrowLeft size={18} />

            Back to Customers

          </Link>

          <h1 className="text-3xl font-bold text-gray-800">

            Customer Details

          </h1>

          <p className="mt-2 text-gray-500">

            Complete profile & order history

          </p>

        </div>

      </div>
            <div className="grid gap-6 lg:grid-cols-3">

        {/* Customer Profile */}

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">

              <User
                size={36}
                className="text-green-700"
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-gray-800">
                {customer.name}
              </h2>

              <p className="mt-1 text-gray-500">
                Loyal Customer
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-5">

            <div className="flex items-center gap-3">

              <Phone
                size={18}
                className="text-green-600"
              />

              <span>{customer.phone}</span>

            </div>

            <div className="flex items-center gap-3">

              <Mail
                size={18}
                className="text-green-600"
              />

              <span>

                {customer.email || "No Email"}

              </span>

            </div>

            <div className="flex items-start gap-3">

              <MapPin
                size={18}
                className="mt-1 text-green-600"
              />

              <div>

                <p>{customer.address}</p>

                <p>

                  {customer.city},{" "}
                  {customer.state}

                </p>

                <p>{customer.pincode}</p>

              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">

          <div className="rounded-2xl bg-green-600 p-6 text-white">

            <div className="flex items-center justify-between">

              <ShoppingBag size={32} />

              <span className="text-sm">
                Orders
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-bold">

              {customer.totalOrders}

            </h2>

            <p className="mt-2 text-green-100">

              Total Orders Placed

            </p>

          </div>

          <div className="rounded-2xl bg-blue-600 p-6 text-white">

            <div className="flex items-center justify-between">

              <IndianRupee size={32} />

              <span className="text-sm">
                Spend
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-bold">

              ₹
              {customer.lifetimeSpend.toLocaleString()}

            </h2>

            <p className="mt-2 text-blue-100">

              Lifetime Spending

            </p>

          </div>

          <div className="rounded-2xl bg-purple-600 p-6 text-white">

            <div className="flex items-center justify-between">

              <Package size={32} />

              <span className="text-sm">
                Products
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-bold">

              {customer.totalProductsPurchased}

            </h2>

            <p className="mt-2 text-purple-100">

              Products Purchased

            </p>

          </div>

          <div className="rounded-2xl bg-orange-500 p-6 text-white">

            <div className="flex items-center justify-between">

              <IndianRupee size={32} />

              <span className="text-sm">
                Average
              </span>

            </div>

            <h2 className="mt-5 text-4xl font-bold">

              ₹
              {customer.averageOrderValue.toLocaleString()}

            </h2>

            <p className="mt-2 text-orange-100">

              Average Order Value

            </p>

          </div>

        </div>

      </div>

      {/* Dates */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Calendar className="text-green-600" />

            <h3 className="text-lg font-semibold">

              First Order

            </h3>

          </div>

          <p className="mt-5 text-xl font-bold text-gray-800">

            {new Date(
              customer.firstOrderDate
            ).toLocaleDateString()}

          </p>

        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Calendar className="text-green-600" />

            <h3 className="text-lg font-semibold">

              Last Order

            </h3>

          </div>

          <p className="mt-5 text-xl font-bold text-gray-800">

            {new Date(
              customer.lastOrderDate
            ).toLocaleDateString()}

          </p>

        </div>

      </div>
            {/* Order History */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-gray-800">
            Order History
          </h2>

          <p className="mt-1 text-gray-500">
            {orders.length} Orders Found
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-green-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Order
                </th>

                <th className="px-6 py-4 text-left">
                  Products
                </th>

                <th className="px-6 py-4 text-center">
                  Amount
                </th>

                <th className="px-6 py-4 text-center">
                  Payment
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 align-top"
                >

                  <td className="px-6 py-5">

                    <div className="font-semibold">
                      #{order.orderId.slice(-8)}
                    </div>

                    <div className="mt-1 text-xs text-gray-500">
                      {order.totalItems} Items
                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <div className="space-y-4">

                      {order.items.map((item) => (

                        <div
                          key={`${order._id}-${item.id}`}
                          className="flex items-center gap-3"
                        >

                          <div className="relative h-14 w-14 overflow-hidden rounded-lg border">

                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />

                          </div>

                          <div>

                            <p className="font-semibold text-gray-800">

                              {item.name}

                            </p>

                            <p className="text-sm text-gray-500">

                              ₹{item.price.toLocaleString()} × {item.quantity}

                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <div className="font-bold text-green-700">

                      ₹{order.finalAmount.toLocaleString()}

                    </div>

                    {order.discount > 0 && (

                      <div className="text-xs text-gray-500">

                        Saved ₹
                        {order.discount.toLocaleString()}

                      </div>

                    )}

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        order.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : order.paymentStatus === "Refunded"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {order.paymentStatus}

                    </span>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "Packed"
                          ? "bg-purple-100 text-purple-700"
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

                </tr>

              ))}

              {orders.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-gray-500"
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