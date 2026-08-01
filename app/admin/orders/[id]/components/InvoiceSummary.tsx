"use client";

type Props = {
  subtotal: number;
  discount?: number;
  shipping?: number;
  finalAmount: number;
  paymentStatus: string;
  orderStatus: string;
};

export default function InvoiceSummary({
  subtotal,
  discount = 0,
  shipping = 0,
  finalAmount,
  paymentStatus,
  orderStatus,
}: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-2">

      {/* Order Summary */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-green-800">
          Order Summary
        </h2>

        <div className="space-y-5">

          <div className="flex justify-between">

            <span className="text-gray-600">
              Subtotal
            </span>

            <span className="font-semibold">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-600">
              Discount
            </span>

            <span className="font-semibold text-red-600">
              - ₹{discount.toLocaleString("en-IN")}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-600">
              Shipping
            </span>

            <span className="font-semibold text-green-700">
              {shipping === 0
                ? "FREE"
                : `₹${shipping.toLocaleString("en-IN")}`}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-600">
              GST
            </span>

            <span className="font-semibold">
              Included
            </span>

          </div>

          <hr />

          <div className="flex justify-between text-2xl font-bold">

            <span>
              Grand Total
            </span>

            <span className="text-green-700">
              ₹{finalAmount.toLocaleString("en-IN")}
            </span>

          </div>

        </div>

      </div>

      {/* Status Card */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-2xl font-bold text-green-800">
          Payment & Delivery
        </h2>

        <div className="space-y-6">

          <div className="flex items-center justify-between">

            <span className="text-gray-600">
              Payment Status
            </span>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                paymentStatus === "Paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {paymentStatus}
            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-gray-600">
              Order Status
            </span>

            <span
              className={`rounded-full px-4 py-2 text-sm font-bold ${
                orderStatus === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : orderStatus === "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : orderStatus === "Processing"
                  ? "bg-yellow-100 text-yellow-700"
                  : orderStatus === "Confirmed"
                  ? "bg-cyan-100 text-cyan-700"
                  : orderStatus === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {orderStatus}
            </span>

          </div>

          <div className="rounded-xl bg-green-50 p-5">

            <h3 className="font-bold text-green-800">
              Thank You ❤️
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Thank you for shopping with Himalayan Roots.
              We are committed to delivering authentic
              products sourced directly from the farmers
              of Uttarakhand.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}