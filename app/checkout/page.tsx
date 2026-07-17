"use client";

import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    alert(
      "Order Placed Successfully!\n\nPayment Gateway will be added in the next step."
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-bold text-green-900 mb-12">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-2 gap-12">

        {/* Billing Details */}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8"
        >

          <h2 className="text-3xl font-bold mb-8">
            Billing Details
          </h2>

          <div className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4"
            />

            <textarea
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border rounded-xl p-4"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4"
            />

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-4"
            />

          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl text-lg font-bold"
          >
            Place Order
          </button>

        </form>

        {/* Order Summary */}

        <div className="bg-green-50 rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold mb-8">
            Order Summary
          </h2>

          <div className="space-y-5">

            {cart.map((item) => (

              <div
                key={item.id}
                className="flex justify-between border-b pb-4"
              >

                <div>

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-500">
                    Qty : {item.quantity}
                  </p>

                </div>

                <div className="font-bold text-green-700">
                  ₹{item.price * item.quantity}
                </div>

              </div>

            ))}

          </div>

          <div className="border-t mt-8 pt-6 flex justify-between text-2xl font-bold">

            <span>Total</span>

            <span className="text-green-700">
              ₹{total}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}