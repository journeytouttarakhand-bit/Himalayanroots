"use client";

import { useRouter } from "next/navigation";
import Products from "../components/Products";

export default function ProductsPage() {
  const router = useRouter();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* 🌟 Top Header with Back Button */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-100 transition active:scale-95 cursor-pointer"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          Products
        </h1>
      </div>

      <Products />
    </main>
  );
}