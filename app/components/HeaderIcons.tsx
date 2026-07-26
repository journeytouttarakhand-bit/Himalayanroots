"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function HeaderIcons() {
  const { cart } = useCart();

  const { wishlist } = useWishlist();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  return (
    <div className="flex items-center gap-5">

      {/* Wishlist */}

      <Link
        href="/wishlist"
        className="relative transition hover:text-green-700"
      >
        <Heart
          size={26}
          className="text-green-700"
        />

        {wishlistCount > 0 && (

          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
            {wishlistCount}
          </span>

        )}
      </Link>

      {/* Cart */}

      <Link
        href="/cart"
        className="relative transition hover:text-green-700"
      >
        <ShoppingCart
          size={26}
          className="text-green-700"
        />

        {cartCount > 0 && (

          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-700 text-[10px] font-bold text-white">
            {cartCount}
          </span>

        )}
      </Link>

    </div>
  );
}