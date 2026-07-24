"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  PackageX,
  ArrowRight,
} from "lucide-react";

type Product = {
  _id: string;
  name: string;
  image: string;
  stock?: number;
};

type Props = {
  lowStockProducts: Product[];
  outOfStockProducts: Product[];
};

export default function LowStockProducts({
  lowStockProducts,
  outOfStockProducts,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

      <div className="flex items-center justify-between px-6 py-5 border-b">

        <div>

          <h2 className="text-xl font-bold text-gray-800">
            Inventory Alerts
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Low stock & out of stock products
          </p>

        </div>

        <AlertTriangle
          size={28}
          className="text-orange-500"
        />

      </div>

      <div className="grid lg:grid-cols-2">

        {/* Low Stock */}

        <div className="border-r border-gray-200">

          <div className="flex items-center gap-2 bg-orange-50 px-6 py-4">

            <AlertTriangle
              size={18}
              className="text-orange-600"
            />

            <h3 className="font-semibold text-orange-700">
              Low Stock ({lowStockProducts.length})
            </h3>

          </div>

          <div className="divide-y divide-gray-100">

            {lowStockProducts.length === 0 ? (

              <div className="py-10 text-center">

                <PackageX
                  size={44}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-gray-500">
                  No low stock products.
                </p>

              </div>

            ) : (

              lowStockProducts.map((product) => (

                <div
                  key={product._id}
                  className="flex items-center justify-between gap-3 px-6 py-4 hover:bg-orange-50 transition-all"
                >

                  <div className="flex items-center gap-3">

                    <div className="relative h-14 w-14 overflow-hidden rounded-lg border">

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div>

                      <h4 className="font-semibold text-gray-800">
                        {product.name}
                      </h4>

                      <p className="mt-1 text-sm text-orange-600 font-medium">
                        Only {product.stock} left
                      </p>

                    </div>

                  </div>

                  <Link
                    href={`/admin/products/${product._id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
                  >
                    Update

                    <ArrowRight size={15} />

                  </Link>

                </div>

              ))

            )}

          </div>

        </div>
        {/* Out Of Stock */}

        <div>

          <div className="flex items-center gap-2 bg-red-50 px-6 py-4">

            <PackageX
              size={18}
              className="text-red-600"
            />

            <h3 className="font-semibold text-red-700">
              Out of Stock ({outOfStockProducts.length})
            </h3>

          </div>

          <div className="divide-y divide-gray-100">

            {outOfStockProducts.length === 0 ? (

              <div className="py-10 text-center">

                <PackageX
                  size={44}
                  className="mx-auto text-gray-300"
                />

                <p className="mt-3 text-gray-500">
                  No out of stock products.
                </p>

              </div>

            ) : (

              outOfStockProducts.map((product) => (

                <div
                  key={product._id}
                  className="flex items-center justify-between gap-3 px-6 py-4 hover:bg-red-50 transition-all"
                >

                  <div className="flex items-center gap-3">

                    <div className="relative h-14 w-14 overflow-hidden rounded-lg border">

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div>

                      <h4 className="font-semibold text-gray-800">
                        {product.name}
                      </h4>

                      <p className="mt-1 text-sm font-medium text-red-600">
                        Out of Stock
                      </p>

                    </div>

                  </div>

                  <Link
                    href={`/admin/products/${product._id}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
                  >
                    Restock

                    <ArrowRight size={15} />

                  </Link>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
}