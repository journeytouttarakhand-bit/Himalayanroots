"use client";

interface Props {
  orderId: string;
  paymentId: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

export default function OrderInfoCard({
  orderId,
  paymentId,
  paymentStatus,
  orderStatus,
  createdAt,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-green-800">
        Order Information
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between border-b pb-3">

          <span className="text-gray-500">
            Order ID
          </span>

          <span className="font-semibold break-all">
            {orderId}
          </span>

        </div>

        <div className="flex justify-between border-b pb-3">

          <span className="text-gray-500">
            Payment ID
          </span>

          <span className="font-semibold break-all">
            {paymentId || "-"}
          </span>

        </div>

        <div className="flex justify-between border-b pb-3">

          <span className="text-gray-500">
            Payment Status
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {paymentStatus}
          </span>

        </div>

        <div className="flex justify-between border-b pb-3">

          <span className="text-gray-500">
            Order Status
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              orderStatus === "Delivered"
                ? "bg-green-100 text-green-700"
                : orderStatus === "Shipped"
                ? "bg-blue-100 text-blue-700"
                : orderStatus === "Processing"
                ? "bg-purple-100 text-purple-700"
                : orderStatus === "Confirmed"
                ? "bg-indigo-100 text-indigo-700"
                : orderStatus === "Cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {orderStatus}
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-gray-500">
            Order Date
          </span>

          <span className="font-semibold">
            {new Date(createdAt).toLocaleString()}
          </span>

        </div>

      </div>

    </div>
  );
}