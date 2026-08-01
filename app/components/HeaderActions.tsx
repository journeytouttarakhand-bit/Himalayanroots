"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart, User, LogOut } from "lucide-react";

import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

type UserType = {
  _id: string;
  name: string;
  email: string;
};

export default function HeaderActions() {

  const { cart } = useCart();

  const { wishlist } =
    useWishlist();

  const [user, setUser] =
    useState<UserType | null>(null);

  useEffect(() => {

    loadUser();

  }, []);

  async function loadUser() {

    try {

      const res =
        await fetch("/api/auth/me", {
          cache: "no-store",
        });

      const data =
        await res.json();

      if (data.success) {

        setUser(data.user);

      }

    } catch (error) {

      console.error(error);

    }

  }

  async function logout() {

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/";

  }

  return (

    <div className="flex items-center gap-5">

      <Link
        href="/wishlist"
        className="relative"
      >

        <Heart
          size={24}
          className="text-green-700"
        />

        {wishlist.length > 0 && (

          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">

            {wishlist.length}

          </span>

        )}

      </Link>

      <Link
        href="/cart"
        className="relative"
      >

        <ShoppingCart
          size={24}
          className="text-green-700"
        />

        {cart.length > 0 && (

          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">

            {cart.length}

          </span>

        )}

      </Link>

      {!user ? (

        <Link
          href="/login"
          className="flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 font-semibold text-white hover:bg-green-800"
        >

          <User size={18} />

          Login

        </Link>

      ) : (

        <div className="flex items-center gap-4">

          <Link
            href="/profile"
            className="font-semibold text-green-700"
          >

            Hi,
            {" "}
            {user.name}

          </Link>

          <Link
            href="/my-orders"
            className="font-medium"
          >

            Orders

          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      )}

    </div>

  );

}