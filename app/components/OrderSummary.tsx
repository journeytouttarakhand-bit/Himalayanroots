"use client";

import Link from "next/link";
import { CartItem } from "../context/CartContext";

type OrderSummaryProps = {
  cart: CartItem[];
};

export default function OrderSummary({
  cart,
}: OrderSummaryProps) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 99;

  const grandTotal = subtotal + shipping;

  return (
    <div className="bg-green-50 rounded-2xl shadow-lg p-8 h-fit sticky top-24">

      <h2 className="text-3xl font-bold text-green-900 mb-8">
        Order Summary
      </h2>

      {cart.length === 0 ? (
        <div className="text-center">

          <p className="text-gray-600 mb-6">
            Your cart is empty.
          </p>

          <Link
            href="/products"
            className="inline-block bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            Browse Products
          </Link>

        </div>
      ) : (
        <>
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

                  <p className="text-gray-500 text-sm">
                    Qty : {item.quantity}
                  </p>

                </div>

                <div className="font-bold text-green-700">
                  ₹{item.price * item.quantity}
                </div>

              </div>

            ))}

          </div>

          <div className="border-t mt-8 pt-6 space-y-4">

            <div className="flex justify-between">

              <span>Subtotal</span>

              <span>₹{subtotal}</span>

            </div>

            <div className="flex justify-between">

              <span>Shipping</span>

              <span>
                {shipping === 0 ? (
                  <span className="text-green-700 font-semibold">
                    FREE
                  </span>
                ) : (
                  <>₹{shipping}</>
                )}
              </span>

            </div>

            <div className="flex justify-between text-2xl font-bold border-t pt-4">

              <span>Grand Total</span>

              <span className="text-green-700">
                ₹{grandTotal}
              </span>

            </div>

            {subtotal < 999 && subtotal > 0 && (

              <p className="text-sm text-orange-600 mt-4">

                Add products worth ₹{999 - subtotal} more to get
                <strong> FREE Shipping.</strong>

              </p>

            )}

          </div>
        </>
      )}

    </div>
  );
}