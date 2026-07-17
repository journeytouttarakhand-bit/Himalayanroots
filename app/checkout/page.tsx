"use client";

import { useState } from "react";
import Link from "next/link";

import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
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

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert(
      "Order details saved successfully.\n\nRazorpay payment will be integrated in the next step."
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">

        <div className="text-7xl mb-6">
          📦
        </div>

        <h1 className="text-5xl font-bold text-green-900">
          No Items to Checkout
        </h1>

        <p className="text-gray-600 mt-5 text-lg">
          Your cart is empty. Add some authentic Himalayan products first.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 px-8 py-4 rounded-xl font-semibold transition"
          >
            🏠 Home
          </Link>

          <Link
            href="/products"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold transition"
          >
            📦 Browse Products
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">

        <h1 className="text-5xl font-bold text-green-900">
          Checkout
        </h1>

        <Link
          href="/cart"
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-semibold transition"
        >
          ← Back to Cart
        </Link>

      </div>

      <div className="grid lg:grid-cols-2 gap-12">

        <CheckoutForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <OrderSummary cart={cart} />

      </div>

    </div>
  );
}