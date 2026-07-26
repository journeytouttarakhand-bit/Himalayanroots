"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";

// ==========================================
// Types
// ==========================================
type OrderItem = {
  id?: number | string;
  slug?: string;
  name: string;
  image?: string;
  price: number;
  quantity: number;
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
  finalAmount?: number;
  originalAmount?: number;
  discount?: number;
  paymentId?: string;
  orderId?: string;
  paymentStatus?: string;
  orderStatus: string;
  createdAt: string;
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const orderIdParam = params?.id as string;

  const fetchOrder = useCallback(async () => {
    if (!orderIdParam) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/orders/${orderIdParam}`);
      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setOrder(null);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  }, [orderIdParam]);

  useEffect(() => {
    if (orderIdParam) {
      fetchOrder();
    }
  }, [orderIdParam, fetchOrder]);

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
        alert("Order status updated successfully!");
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Something went wrong while updating status.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-xl font-semibold text-gray-600">
        Loading Order Details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center gap-4">
        <p className="text-xl font-semibold text-red-600">Order Not Found</p>
        <button
          onClick={() => router.back()}
          className="rounded-lg border bg-white px-5 py-2 text-sm font-semibold hover:bg-gray-50 shadow-sm"
        >
          Go Back
        </button>
      </div>
    );
  }

  const subtotal = order.originalAmount || order.totalAmount || 0;
  const finalPayable = order.finalAmount || order.totalAmount || 0;
  const discountAmount = order.discount || (subtotal > finalPayable ? subtotal - finalPayable : 0);

  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
      {/* Top Header Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900">
            Order Details
          </h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Order ID : <span className="font-bold text-gray-800">{order.orderId || order._id}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-xl border bg-white px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            ← Back
          </button>

          <button
            onClick={() => window.print()}
            className="rounded-xl bg-green-800 px-5 py-2.5 font-semibold text-white hover:bg-green-900 shadow-md transition"
          >
            🖨️ Print Invoice
          </button>
        </div>
      </div>

      {/* Customer & Order Info Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Customer Card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
            👤 Customer Information
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p><span className="font-semibold text-gray-900">Name:</span> {order.customer?.name || "N/A"}</p>
            <p><span className="font-semibold text-gray-900">Phone:</span> {order.customer?.phone || "N/A"}</p>
            {order.customer?.email && (
              <p><span className="font-semibold text-gray-900">Email:</span> {order.customer.email}</p>
            )}
            <p className="pt-2">
              <span className="font-semibold text-gray-900 block mb-1">Delivery Address:</span>
              {order.customer?.address}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}
            </p>
            {order.customer?.notes && (
              <p className="pt-2 text-xs italic text-amber-700 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                <strong>Notes:</strong> {order.customer.notes}
              </p>
            )}
          </div>
        </div>

        {/* Order Meta Info Card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
            📋 Order & Payment Details
          </h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Payment ID:</span>
              <span className="font-mono text-xs bg-gray-100 p-1 px-2 rounded">{order.paymentId || "COD / Pending"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Payment Status:</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                order.paymentStatus === "Paid" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
              }`}>
                {order.paymentStatus || "Pending"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-900">Order Status:</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                {order.orderStatus}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Date & Time:</span>
              <span>{new Date(order.createdAt).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4 overflow-hidden">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
          📦 Ordered Items
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500 border-b">
              <tr>
                <th className="p-3">Product Name</th>
                <th className="p-3 text-center">Price</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-3 font-semibold text-gray-900">
                      {item.name}
                    </td>
                    <td className="p-3 text-center">₹{item.price}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right font-bold text-gray-900">
                      ₹{item.price * item.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    No items found in this order.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Update & Summary */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Status Update Card */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
            🔄 Update Order Status
          </h2>
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Change Current Status
            </label>
            <select
              value={order.orderStatus}
              disabled={saving}
              onChange={(e) => updateStatus(e.target.value)}
              className="w-full rounded-xl border p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-700 bg-gray-50"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Dispatched">Dispatched</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            {saving && <p className="text-xs text-green-700 font-medium">Updating status...</p>}
          </div>
        </div>

        {/* Order Bill Summary */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
            💰 Payment Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-green-700 font-medium">
                <span>Discount:</span>
                <span>- ₹{discountAmount}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Shipping Fee:</span>
              <span className="text-green-700 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-3 border-t">
              <span>Total Payable Amount:</span>
              <span className="text-green-800 text-lg">₹{finalPayable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding Note */}
      <div className="rounded-2xl border bg-green-50/50 p-4 text-center text-xs text-green-800 font-medium">
        Thank you for ordering with Himalayan Roots — Sourced directly from mountain farmers of Uttarakhand.
      </div>

      {/* Print Specific CSS */}
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

          nav,
          aside,
          header,
          footer,
          button,
          select {
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

          .shadow-sm,
          .shadow-md {
            box-shadow: none !important;
          }

          .rounded-2xl {
            border-radius: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}