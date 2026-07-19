"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  slug: string;
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Deleted Successfully");
        loadProducts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
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
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-lg"
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

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4">
                Category
              </th>

              <th className="p-4">
                Price
              </th>

              <th className="p-4">
                Stock
              </th>

              <th className="p-4">
                Featured
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
            {products.map((product) => (

              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-semibold">
                  {product.name}
                </td>

                <td className="text-center">
                  {product.category}
                </td>

                <td className="text-center font-semibold text-green-700">
                  ₹{product.price}
                </td>

                <td className="text-center">
                  {product.stock}
                </td>

                <td className="text-center">
                  {product.featured ? (
                    <span className="text-green-600 text-xl">
                      ✅
                    </span>
                  ) : (
                    <span className="text-red-600 text-xl">
                      ❌
                    </span>
                  )}
                </td>

                <td className="text-center">

                  {product.active ? (

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>

                  ) : (

                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      Hidden
                    </span>

                  )}

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/admin/products/edit/${product._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        deleteProduct(product._id)
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}