"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  featured: boolean;
  active: boolean;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const res = await fetch("/api/all-products");
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-green-900">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="bg-green-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Product
        </Link>

      </div>

      {products.length === 0 ? (

        <div className="text-center text-gray-600 text-xl">
          No Products Found
        </div>

      ) : (

        <table className="w-full border shadow rounded-xl overflow-hidden">

          <thead className="bg-green-700 text-white">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr key={product._id} className="border-b">

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="text-center">
                  {product.category}
                </td>

                <td className="text-center">
                  ₹{product.price}
                </td>

                <td className="text-center">
                  {product.stock}
                </td>

                <td className="text-center">
                  {product.featured ? "✅" : "❌"}
                </td>

                <td className="text-center">
                  {product.active ? "Active" : "Hidden"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}