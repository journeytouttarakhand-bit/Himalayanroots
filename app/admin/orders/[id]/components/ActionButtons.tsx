"use client";

import { useRouter } from "next/navigation";

interface Props {
  orderId: string;
}

export default function ActionButtons({
  orderId,
}: Props) {
  const router = useRouter();

  async function deleteOrder() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `/api/orders/${orderId}`,
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
  }

  return (
    <div className="flex flex-col justify-between gap-4 rounded-2xl border bg-white p-6 shadow-sm md:flex-row">

      <button
        onClick={() =>
          router.push("/admin/orders")
        }
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
          onClick={deleteOrder}
          className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          🗑 Delete Order
        </button>

      </div>

    </div>
  );
}