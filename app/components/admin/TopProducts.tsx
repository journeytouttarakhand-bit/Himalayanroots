"use client";

import Image from "next/image";
import Link from "next/link";
import { Trophy, ArrowRight, TrendingUp } from "lucide-react";

type Product = {
  name?: string;
  image?: string;
  sold?: number;
  revenue?: number;
};

type Props = {
  products?: Product[];
};

export default function TopProducts({ products = [] }: Props) {
  const safeProducts = products || [];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Best Selling Products
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Highest selling products by volume & revenue
          </p>
        </div>

        <Trophy size={28} className="text-yellow-500" />
      </div>

      {/* List / Empty State */}
      <div className="divide-y divide-gray-100">
        {safeProducts.length === 0 ? (
          <div className="py-12 text-center">
            <Trophy size={48} className="mx-auto text-gray-300" />
            <p className="mt-4 text-gray-500 font-medium">
              No sales data available.
            </p>
          </div>
        ) : (
          safeProducts.map((product, index) => {
            const revenue = product.revenue ?? 0;
            const sold = product.sold ?? 0;

            return (
              <div
                key={index}
                className="flex items-center justify-between gap-4 px-6 py-4 transition-all hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border bg-gray-100">
                    <Image
                      src={product.image || "/placeholder.png"}
                      alt={product.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-1">
                      {product.name || "Unnamed Product"}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <TrendingUp size={16} className="text-green-600" />
                      Sold {sold.toLocaleString()} Units
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-700 inline-block">
                    ₹{revenue.toLocaleString()}
                  </div>

                  <p className="mt-2 text-xs text-gray-500">Total Revenue</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-6 py-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing top {safeProducts.length} items
        </p>

        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          View All Products
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}