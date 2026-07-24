"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

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

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  async function loadRazorpayScript() {
    return new Promise<boolean>((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setLoading(true);

    try {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        alert("Unable to load Razorpay.");
        setLoading(false);
        return;
      }

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error("Unable to create Razorpay order.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: orderData.order.amount,

        currency: orderData.order.currency,

        name: "Himalayan Roots",

        description: "Pure Taste of Uttarakhand",

        order_id: orderData.order.id,

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },

        theme: {
          color: "#15803d",
        },

        retry: {
          enabled: true,
          max_count: 3,
        },

        handler: async function (response: any) {
          try {
            const verifyResponse = await fetch(
              "/api/verify-payment",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...response,

                  customer: form,

                  items: cart,

                  totalAmount,
                }),
              }
            );

            const verifyData =
              await verifyResponse.json();

            if (!verifyData.success) {
              alert(
                verifyData.message ||
                  "Payment verification failed."
              );

              setLoading(false);

              return;
            }

            clearCart();

            router.push(
              `/payment-success?order=${verifyData.order._id}`
            );
            setLoading(false);
          } catch (error) {
            console.error(error);

            alert("Payment verification failed.");

            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.on("payment.failed", function (response: any) {
        console.error(response);

        alert(
          response.error.description ||
            "Payment Failed"
        );

        setLoading(false);
      });

      paymentObject.open();
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");

      setLoading(false);
    }
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
          Your cart is empty.
        </p>

        <div className="flex justify-center mt-10">

          <Link
            href="/products"
            className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold"
          >
            Browse Products
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
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-semibold"
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

        <OrderSummary
          cart={cart}
        />

      </div>

      {loading && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-xl px-8 py-8 text-center">

            <div className="animate-pulse text-5xl mb-4">
              💳
            </div>

            <h2 className="text-xl font-bold text-green-700">
              Processing Payment...
            </h2>

            <p className="text-gray-600 mt-2">
              Please don't close this window.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}
