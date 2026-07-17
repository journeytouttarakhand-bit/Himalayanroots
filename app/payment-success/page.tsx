"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-10 text-center">

        <div className="text-7xl mb-6">
          ✅
        </div>

        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Thank you for shopping with <strong>Himalayan Roots</strong>.
          <br />
          Your order has been placed successfully.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            href="/products"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Continue Shopping
          </Link>

          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-semibold transition"
          >
            Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
}