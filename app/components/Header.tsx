"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  LogOut,
  Package,
  MapPin,
  ChevronDown,
} from "lucide-react";

type UserType = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
};

export default function Header() {
  const [user, setUser] = useState<UserType | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Announcement Bar */}
      <div className="bg-emerald-900 px-4 py-1.5 text-center text-xs font-medium text-white">
        🚚 Free Shipping on Orders Above ₹999
      </div>

      {/* Main Navigation Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden">
            <Image
              src="/logo.png"
              alt="Himalayan Roots Logo"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-emerald-950 block">
              Himalayan Roots
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 tracking-wider uppercase block -mt-1">
              Pure Taste of Uttarakhand
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <Link href="/" className="hover:text-emerald-700 transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-emerald-700 transition-colors">
            Products
          </Link>
          <Link href="/about" className="hover:text-emerald-700 transition-colors">
            About
          </Link>
          <Link href="/blog" className="hover:text-emerald-700 transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-emerald-700 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 w-72 focus-within:border-emerald-600 focus-within:bg-white transition-all">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent text-sm text-gray-800 focus:outline-none"
          />
          <Search size={18} className="text-gray-400" />
        </div>

        {/* Right Side Icons & Actions */}
        <div className="flex items-center gap-4">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-2 text-gray-700 hover:text-emerald-700 transition-colors relative"
            title="Wishlist"
          >
            <Heart size={22} />
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="p-2 text-gray-700 hover:text-emerald-700 transition-colors relative"
            title="Shopping Cart"
          >
            <ShoppingBag size={22} />
          </Link>

          {/* DYNAMIC USER SECTION */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-full bg-emerald-100 border border-emerald-300 px-3.5 py-1.5 text-xs font-bold text-emerald-900 hover:bg-emerald-200 transition-all cursor-pointer"
              >
                {/* Profile Avatar / First Letter Fallback */}
                <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-emerald-800 text-white text-[11px] font-bold">
                  {user.avatar ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="max-w-[100px] truncate capitalize">{user.name}</span>
                <ChevronDown size={14} className={`text-emerald-800 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl z-50 divide-y divide-gray-100">
                  {/* User Account Info */}
                  <div className="px-3 py-2.5">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">YOUR ACCOUNT</p>
                    <p className="text-sm font-bold text-gray-900 truncate mt-0.5">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>

                  {/* Clean Selected Options */}
                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      <User size={16} className="text-gray-500" />
                      My Profile
                    </Link>

                    <Link
                      href="/profile?tab=orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      <Package size={16} className="text-gray-500" />
                      My Orders
                    </Link>

                    <Link
                      href="/profile?tab=addresses"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      <MapPin size={16} className="text-gray-500" />
                      Saved Address
                    </Link>

                    <Link
                      href="/wishlist"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      <Heart size={16} className="text-gray-500" />
                      Wishlist
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full border border-emerald-700 px-3.5 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-800 hover:text-white transition-all shadow-sm"
              title="Customer Login / Register"
            >
              <User size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}