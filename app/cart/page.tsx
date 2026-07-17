"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">

        <div className="text-7xl mb-6">
          🛒
        </div>

        <h1 className="text-5xl font-bold text-green-900">
          Your Cart is Empty
        </h1>

        <p className="text-gray-600 mt-5 text-lg">
          Looks like you haven't added any products yet.
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

          <Link
            href="/wishlist"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl font-semibold transition"
          >
            ❤️ Wishlist
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">

        <h1 className="text-5xl font-bold text-green-900">
          Shopping Cart
        </h1>

        <Link
          href="/products"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Continue Shopping
        </Link>

      </div>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* Cart Items */}

        <div className="lg:col-span-2 space-y-6">

          {cart.map((item) => (

            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 bg-white shadow-md rounded-2xl p-5"
            >

              <div className="relative w-full md:w-44 h-44 rounded-xl overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="flex-1">

                <h2 className="text-2xl font-bold text-green-900">
                  {item.name}
                </h2>

                <p className="text-xl text-green-700 mt-2">
                  ₹{item.price}
                </p>

                <div className="flex items-center gap-4 mt-6">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                  >
                    −
                  </button>

                  <span className="text-xl font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-6 text-red-600 font-semibold hover:underline"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Order Summary */}

        <div className="bg-green-50 rounded-2xl p-8 h-fit shadow-md">

          <h2 className="text-3xl font-bold text-green-900">
            Order Summary
          </h2>

          <div className="flex justify-between mt-8 text-xl">

            <span>Total</span>

            <span className="font-bold text-green-700">
              ₹{totalPrice}
            </span>

          </div>

          <Link
            href="/checkout"
            className="block w-full mt-10 bg-green-700 hover:bg-green-800 text-white py-4 rounded-xl font-bold text-center"
          >
            Proceed to Checkout
          </Link>

          <button
            onClick={clearCart}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold"
          >
            Clear Cart
          </button>

        </div>

      </div>

    </div>
  );
}