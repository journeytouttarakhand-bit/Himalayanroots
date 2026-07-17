"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-900 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-center gap-8">
          <span>🚚 Free Shipping Above ₹999</span>
          <span>🌿 100% Natural Products</span>
          <span>🏔️ Pure Taste of Uttarakhand</span>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur shadow-md">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Himalayan Roots"
              width={130}
              height={130}
              priority
              className="h-20 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 font-semibold text-gray-700">

            <Link href="/" className="hover:text-green-700">
              Home
            </Link>

            <Link href="/about" className="hover:text-green-700">
              About
            </Link>

            <Link href="/products" className="hover:text-green-700">
              Products
            </Link>

            <Link href="/why-us" className="hover:text-green-700">
              Why Us
            </Link>

            <Link href="/farmers" className="hover:text-green-700">
              Farmers
            </Link>

            <Link href="/blog" className="hover:text-green-700">
              Blog
            </Link>

            <Link href="/contact" className="hover:text-green-700">
              Contact
            </Link>

          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-5">

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center"
            >
              <Heart
                size={28}
                className="text-red-500"
              />

              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center"
            >
              <ShoppingCart
                size={30}
                className="text-green-700"
              />

              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* WhatsApp */}
            <a
              href="https://wa.me/917895943324"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold"
            >
              Order Now
            </a>

            {/* Mobile Menu */}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>

          </div>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (

          <div className="lg:hidden bg-white border-t">

            <nav className="flex flex-col gap-5 p-6 font-semibold">

              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link href="/about" onClick={() => setMenuOpen(false)}>
                About
              </Link>

              <Link href="/products" onClick={() => setMenuOpen(false)}>
                Products
              </Link>

              <Link href="/why-us" onClick={() => setMenuOpen(false)}>
                Why Us
              </Link>

              <Link href="/farmers" onClick={() => setMenuOpen(false)}>
                Farmers
              </Link>

              <Link href="/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </Link>

              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setMenuOpen(false)}
              >
                ❤️ Wishlist ({wishlistCount})
              </Link>

              <Link
                href="/cart"
                onClick={() => setMenuOpen(false)}
              >
                🛒 Cart ({totalItems})
              </Link>

              <a
                href="https://wa.me/917895943324"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 text-white text-center py-3 rounded-full"
              >
                Order on WhatsApp
              </a>

            </nav>

          </div>

        )}

      </header>
    </>
  );
}