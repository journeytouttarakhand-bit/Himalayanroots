"use client";

import Image from "next/image";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  image: string;
  stock: number;
};

type Props = {
  products: Product[];
};

export default function TopProducts({
  products,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

      <div className="flex items-center justify-between px-6 py-5 border-b">

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            Top Products
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Best performing products
          </p>

        </div>

        <Package
          className="text-green-600"
          size={28}
        />

      </div>

      <div className="divide-y divide-gray-100">

        {products.length === 0 ? (

          <div className="py-12 text-center">

            <Package
              size={48}
              className="mx-auto text-gray-300"
            />

            <p className="mt-4 text-gray-500">
              No products available.
            </p>

          </div>

        ) : (

          products.map((product) => (

            <div
              key={product._id}
              className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-gray-50 transition-all"
            >

              <div className="flex items-center gap-4">

                <div className="relative h-16 w-16 overflow-hidden rounded-xl border bg-gray-100">

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />

                </div>

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Stock Available
                  </p>

                </div>

              </div>

              <div className="text-right">

                <div className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                  {product.stock} Left
                </div>
                <div className="mt-3">

                  <Link
                    href={`/admin/products/${product._id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
                  >
                    Manage

                    <ArrowRight size={16} />

                  </Link>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

      <div className="border-t bg-gray-50 px-6 py-4">

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
