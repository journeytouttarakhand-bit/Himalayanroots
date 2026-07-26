"use client";

import React from "react";

type CheckoutFormProps = {
  form: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    notes: string;
  };
  couponCode: string;
  couponLoading: boolean;
  couponMessage: string;
  couponApplied: boolean;
  handleCouponChange: (value: string) => void;
  applyCoupon: () => void;
  removeCoupon: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
};

export default function CheckoutForm({
  form,
  couponCode,
  couponLoading,
  couponMessage,
  couponApplied,
  handleCouponChange,
  applyCoupon,
  removeCoupon,
  handleChange,
  handleSubmit,
}: CheckoutFormProps) {
  // Prevent coupon input 'Enter' key from triggering main form submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!couponApplied && couponCode.trim() !== "" && !couponLoading) {
        applyCoupon();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100"
    >
      <h2 className="text-3xl font-bold mb-6 text-green-900">
        Billing Details
      </h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number *
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Full Address *
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="House/Flat No., Building, Street Name, Area"
            value={form.address}
            onChange={handleChange}
            rows={3}
            required
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              id="city"
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              id="state"
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
              Pincode *
            </label>
            <input
              id="pincode"
              type="text"
              name="pincode"
              placeholder="110001"
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Order Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Any specific delivery instructions..."
            value={form.notes}
            onChange={handleChange}
            rows={2}
            className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
          />
        </div>

        {/* Coupon Section */}
        <div className="rounded-2xl border border-green-200 bg-green-50/60 p-5 mt-6">
          <h3 className="mb-3 text-lg font-bold text-green-900">
            Have a Coupon?
          </h3>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={couponCode}
              onChange={(e) => handleCouponChange(e.target.value.toUpperCase())}
              onKeyDown={handleKeyDown}
              disabled={couponApplied || couponLoading}
              className="flex-1 rounded-xl border border-gray-300 bg-white p-3.5 text-base uppercase font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-green-700 disabled:bg-gray-100 disabled:text-gray-500"
            />

            {couponApplied ? (
              <button
                type="button"
                onClick={removeCoupon}
                className="rounded-xl bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove
              </button>
            ) : (
              <button
                type="button"
                onClick={applyCoupon}
                disabled={couponLoading || couponCode.trim() === ""}
                className="rounded-xl bg-green-700 px-6 py-3.5 font-semibold text-white transition hover:bg-green-800 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                {couponLoading ? "Applying..." : "Apply"}
              </button>
            )}
          </div>

          {couponMessage && (
            <div
              className={`mt-3 rounded-lg border p-3 text-sm font-medium ${
                couponApplied
                  ? "border-green-300 bg-green-100 text-green-800"
                  : "border-red-300 bg-red-100 text-red-800"
              }`}
            >
              {couponMessage}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold text-lg transition shadow-md hover:shadow-lg active:scale-[0.99]"
        >
          Place Order
        </button>
      </div>
    </form>
  );
}