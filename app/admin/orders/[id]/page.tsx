"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type OrderItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type Customer = {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
};

type Order = {
  _id: string;

  customer: Customer;

  items: OrderItem[];

  totalAmount: number;

  paymentId: string;

  orderId: string;

  paymentStatus: string;

  orderStatus: string;

  createdAt: string;
};

export default function OrderDetailsPage() {
  const params = useParams();

  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      const res = await fetch(`/api/orders/${params.id}`);

      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(status: string) {
    if (!order) return;

    setSaving(true);

    try {
      const res = await fetch(`/api/orders/${order._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus: status,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-xl font-semibold">
        Loading Order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-xl font-semibold text-red-600">
        Order Not Found
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-8">

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-green-900">
            Order Details
          </h1>

          <p className="mt-2 text-gray-500">
            Order ID : {order._id}
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => router.back()}
            className="rounded-lg border px-5 py-2 font-semibold hover:bg-gray-100"
          >
            Back
          </button>

          <button
            onClick={() => window.print()}
            className="rounded-lg bg-green-700 px-5 py-2 font-semibold text-white hover:bg-green-800"
          >
            Print Invoice
          </button>

        </div>

      </div>
      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold text-green-800">
            Customer Details
          </h2>

          <div className="space-y-4">

            <div>
              <p className="text-sm text-gray-500">
                Customer Name
              </p>

              <p className="font-semibold text-lg">
                {order.customer.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Phone Number
              </p>

              <p className="font-semibold">
                {order.customer.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-semibold">
                {order.customer.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Address
              </p>

              <p className="font-semibold">
                {order.customer.address}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">

              <div>
                <p className="text-sm text-gray-500">
                  City
                </p>

                <p className="font-semibold">
                  {order.customer.city}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  State
                </p>

                <p className="font-semibold">
                  {order.customer.state}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Pincode
                </p>

                <p className="font-semibold">
                  {order.customer.pincode}
                </p>
              </div>

            </div>

            {order.customer.notes && (

              <div>

                <p className="text-sm text-gray-500">
                  Customer Notes
                </p>

                <p className="rounded-lg bg-gray-50 p-3">
                  {order.customer.notes}
                </p>

              </div>

            )}

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold text-green-800">
            Order Information
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">
                Order ID
              </span>

              <span className="font-semibold">
                {order.orderId || order._id}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">
                Payment ID
              </span>

              <span className="font-semibold">
                {order.paymentId || "-"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">

              <span className="text-gray-500">
                Payment Status
              </span>

              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  order.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.paymentStatus}
              </span>

            </div>

            <div className="flex justify-between border-b pb-3">

              <span className="text-gray-500">
                Order Status
              </span>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {order.orderStatus}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Order Date
              </span>

              <span className="font-semibold">
                {new Date(
                  order.createdAt
                ).toLocaleString()}
              </span>

            </div>

          </div>

        </div>

      </div>
      <div className="rounded-2xl border bg-white shadow-sm">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-green-800">
            Ordered Products
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-green-700 text-white">

              <tr>

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-center">
                  Price
                </th>

                <th className="p-4 text-center">
                  Qty
                </th>

                <th className="p-4 text-center">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              {order.items.map((item, index) => (

                <tr
                  key={item.id}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }
                >

                  <td className="border-b p-4">

                    <div className="flex items-center gap-4">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl border object-cover"
                      />

                      <div>

                        <p className="font-semibold text-lg">
                          {item.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {item.slug}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="border-b text-center font-medium">

                    ₹{item.price.toLocaleString("en-IN")}

                  </td>

                  <td className="border-b text-center">

                    {item.quantity}

                  </td>

                  <td className="border-b text-center font-bold text-green-700">

                    ₹{(
                      item.price * item.quantity
                    ).toLocaleString("en-IN")}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold text-green-800">
            Order Status
          </h2>

          <select
            defaultValue={order.orderStatus}
            disabled={saving}
            onChange={(e) =>
              updateStatus(e.target.value)
            }
            className="w-full rounded-lg border-2 border-green-600 px-4 py-3 outline-none"
          >

            <option value="Pending">
              Pending
            </option>

            <option value="Confirmed">
              Confirmed
            </option>

            <option value="Processing">
              Processing
            </option>

            <option value="Shipped">
              Shipped
            </option>

            <option value="Delivered">
              Delivered
            </option>

            <option value="Cancelled">
              Cancelled
            </option>

          </select>

          <p className="mt-4 text-sm text-gray-500">
            {saving
              ? "Updating order status..."
              : "Select a new order status from the dropdown."}
          </p>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-2xl font-bold text-green-800">
            Order Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>
                Subtotal
              </span>

              <span>
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Shipping
              </span>

              <span className="font-semibold text-green-700">
                FREE
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                GST
              </span>

              <span>
                Included
              </span>

            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-green-700">

              <span>
                Grand Total
              </span>

              <span>
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </span>

            </div>

          </div>

        </div>

      </div>
      <div className="rounded-2xl border bg-green-50 p-8">

        <div className="flex flex-col items-center text-center">

          <img
            src="https://res.cloudinary.com/ss75t6eb/image/upload/v1784422328/HR-Photoroom_dfzxnk.png"
            alt="Himalayan Roots"
            className="mb-5 h-20 w-20"
            crossOrigin="anonymous"
          />

          <h2 className="text-3xl font-bold text-green-800">
            Thank You For Shopping ❤️
          </h2>

          <p className="mt-3 text-gray-700">
            We sincerely appreciate your trust in Himalayan Roots.
          </p>

          <p className="mt-2 text-gray-600">
            We hope you enjoy the authentic taste of Uttarakhand.
          </p>

          <div className="mt-8 space-y-2 text-gray-700">

            <p>
              🌐 www.himalayanroots.in
            </p>

            <p>
              📧 support@himalayanroots.in
            </p>

            <p>
              📞 +91 7895943324
            </p>

            <p>
              📍 Mussoorie, Uttarakhand, India
            </p>

          </div>

        </div>

      </div>

      <div className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row">

        <button
          onClick={() => router.push("/admin/orders")}
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100"
        >
          ← Back to Orders
        </button>

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => window.print()}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            🖨️ Print Invoice
          </button>

          <button
            onClick={async () => {

              const confirmDelete = window.confirm(
                "Are you sure you want to delete this order?"
              );

              if (!confirmDelete) return;

              try {

                const res = await fetch(
                  `/api/orders/${order._id}`,
                  {
                    method: "DELETE",
                  }
                );

                const data = await res.json();

                if (data.success) {

                  alert("Order deleted successfully.");

                  router.push("/admin/orders");

                } else {

                  alert(
                    data.message ||
                      "Failed to delete order."
                  );

                }

              } catch (error) {

                console.error(error);

                alert("Something went wrong.");

              }

            }}
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            🗑 Delete Order
          </button>

        </div>

      </div>

      <style jsx global>{`
        @media print {

          @page {
            size: A4;
            margin: 12mm;
          }

          html,
          body {
            background: #ffffff !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }

          .print\\:hidden,
          nav,
          aside,
          header,
          footer,
          button {
            display: none !important;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            page-break-inside: avoid;
          }

          th,
          td {
            border: 1px solid #d1d5db;
            padding: 10px;
          }

          img {
            max-width: 100% !important;
            display: block !important;
            page-break-inside: avoid;
          }

          .bg-green-700,
          .bg-gradient-to-r {
            background: #166534 !important;
            color: #ffffff !important;
          }

          .text-green-700,
          .text-green-800 {
            color: #166534 !important;
          }

          .shadow-sm,
          .shadow-md,
          .shadow-lg,
          .shadow-xl {
            box-shadow: none !important;
          }

          .rounded-lg,
          .rounded-xl,
          .rounded-2xl {
            border-radius: 8px !important;
          }

          a {
            color: inherit !important;
            text-decoration: none !important;
          }

        }
      `}</style>

    </div>
  );
}