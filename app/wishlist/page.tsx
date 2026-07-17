"use client";

import Image from "next/image";
import Link from "next/link";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-green-900">
          My Wishlist
        </h1>

        <p className="text-gray-600 mt-5 text-lg">
          Your wishlist is empty.
        </p>

        <Link
          href="/products"
          className="inline-block mt-8 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold text-green-900 mb-10">
        My Wishlist
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <div className="relative h-72">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-green-900">
                {item.name}
              </h2>

              <p className="text-2xl font-bold text-green-700 mt-3">
                ₹{item.price}
              </p>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() =>
                    addToCart({
                      id: item.id,
                      slug: item.slug,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  }
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}