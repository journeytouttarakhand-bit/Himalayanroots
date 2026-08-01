"use client";

interface Props {
  orderStatus: string;
  saving: boolean;
  onStatusChange: (status: string) => void;
}

export default function StatusSection({
  orderStatus,
  saving,
  onStatusChange,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-green-800">
        Order Status
      </h2>

      <select
        value={orderStatus}
        disabled={saving}
        onChange={(e) =>
          onStatusChange(e.target.value)
        }
        className="w-full rounded-xl border-2 border-green-600 bg-white px-4 py-3 text-lg font-medium outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-100"
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

      <div className="mt-8 rounded-xl border bg-gray-50 p-5">

        <p className="text-sm text-gray-500">
          Current Status
        </p>

        <div className="mt-3">

          <span
            className={`inline-flex rounded-full px-5 py-2 text-sm font-semibold ${
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

      </div>

      <div className="mt-6 rounded-xl bg-blue-50 p-4">

        <p className="text-sm text-blue-700">

          {saving
            ? "Updating order status..."
            : "Changing the order status will immediately update the database and automatically send email notifications when applicable."}

        </p>

      </div>

    </div>
  );
}