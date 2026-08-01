"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "../context/CartContext";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);

  // Coupon States
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

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

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const finalAmount = Math.max(0, totalAmount - discount);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // Coupon Handlers
  const handleCouponChange = (val: string) => {
    setCouponCode(val);
    if (couponMessage) setCouponMessage("");
  };

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponMessage("");

    try {
      const res = await fetch("/api/apply-coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ couponCode, totalAmount }),
      });

      const data = await res.json();

      if (data.success) {
        setDiscount(data.discount);
        setCouponApplied(true);
        setCouponMessage(data.message || "Coupon applied successfully!");
      } else {
        setCouponMessage(data.message || "Invalid coupon code.");
      }
    } catch (error) {
      setCouponMessage("Failed to apply coupon. Try again.");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode("");
    setCouponApplied(false);
    setCouponMessage("");
  };

  async function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
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
        alert("Unable to load Razorpay SDK.");
        setLoading(false);
        return;
      }

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalAmount,
          items: cart,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.message || "Unable to create order.");
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
        handler: async function (response: RazorpayResponse) {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                customer: form,
                items: cart,
                totalAmount,
                couponCode,
                discount,
                finalAmount,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyData.success) {
              console.error("Payment verification failed:", verifyData);
              alert(verifyData.message || "Payment verification failed.");
              setLoading(false);
              return;
            }

            clearCart();
            removeCoupon();
            router.push(`/payment-success?order=${verifyData.order._id}`);
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification failed.");
          } finally {
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
      paymentObject.open();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Something went wrong.");
      setLoading(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="text-7xl mb-6">📦</div>
        <h1 className="text-5xl font-bold text-green-900">
          No Items to Checkout
        </h1>
        <p className="text-gray-600 mt-5 text-lg">Your cart is empty.</p>
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
        <h1 className="text-5xl font-bold text-green-900">Checkout</h1>
        <Link
          href="/cart"
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-semibold"
        >
          ← Back to Cart
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* ✅ Saare coupon props render ho rahe hain */}
        <CheckoutForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          couponCode={couponCode}
          couponLoading={couponLoading}
          couponMessage={couponMessage}
          couponApplied={couponApplied}
          handleCouponChange={handleCouponChange}
          applyCoupon={applyCoupon}
          removeCoupon={removeCoupon}
        />

        <OrderSummary
          cart={cart}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          discount={discount}
          setDiscount={setDiscount}
          totalAmount={totalAmount}
        />
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl px-8 py-8 text-center">
            <div className="animate-pulse text-5xl mb-4">💳</div>
            <h2 className="text-xl font-bold text-green-700">
              Processing Payment...
            </h2>
            <p className="text-gray-600 mt-2">Please don't close this window.</p>
          </div>
        </div>
      )}
    </div>
  );
}