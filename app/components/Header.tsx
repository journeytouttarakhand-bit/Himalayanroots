"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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

            <Link href="/" className="hover:text-green-700 transition">
              Home
            </Link>

            <Link href="/about" className="hover:text-green-700 transition">
              About
            </Link>

            <Link href="/products" className="hover:text-green-700 transition">
              Products
            </Link>

            <Link href="/why-us" className="hover:text-green-700 transition">
              Why Us
            </Link>

            <Link href="/farmers" className="hover:text-green-700 transition">
              Farmers
            </Link>

            <Link href="/blog" className="hover:text-green-700 transition">
              Blog
            </Link>

            <Link href="/contact" className="hover:text-green-700 transition">
              Contact
            </Link>

          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            <a
              href="https://wa.me/917895943324"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              Order Now
            </a>

            {/* Mobile Menu Button */}
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

            <nav className="flex flex-col p-6 gap-5 font-semibold">

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
                Farmer Stories
              </Link>

              <Link href="/blog" onClick={() => setMenuOpen(false)}>
                Blog
              </Link>

              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
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