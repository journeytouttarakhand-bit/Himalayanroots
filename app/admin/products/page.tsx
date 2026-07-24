"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

  // Search
  const [search, setSearch] = useState("");

  // Category Filter
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  // Selected Products
  const [selectedProducts, setSelectedProducts] =
    useState<string[]>([]);

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

  // Categories
  const categories = useMemo(() => {
    const list = Array.from(
      new Set(products.map((p) => p.category))
    );

    return ["All", ...list];
  }, [products]);

  // Search + Filter
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.slug
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  function toggleProduct(id: string) {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  function toggleAll() {
    if (
      selectedProducts.length ===
      filteredProducts.length
    ) {
      setSelectedProducts([]);
      return;
    }

    setSelectedProducts(
      filteredProducts.map((p) => p._id)
    );
  }

  async function deleteProduct(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        loadProducts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }
  async function bulkDelete() {
    if (selectedProducts.length === 0) {
      alert("Please select products.");
      return;
    }

    const confirmDelete = window.confirm(
      `Delete ${selectedProducts.length} selected products?`
    );

    if (!confirmDelete) return;

    try {
      await Promise.all(
        selectedProducts.map((id) =>
          fetch(`/api/products/${id}`, {
            method: "DELETE",
          })
        )
      );

      alert("Products deleted successfully");

      setSelectedProducts([]);

      loadProducts();

    } catch (error) {

      console.error(error);

      alert("Bulk delete failed");

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

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-green-900">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Total Products : {filteredProducts.length}
          </p>

        </div>

        <div className="flex gap-3">

          {selectedProducts.length > 0 && (

            <button
              onClick={bulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg transition"
            >
              Delete Selected ({selectedProducts.length})
            </button>

          )}

          <Link
            href="/admin/products/new"
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-lg transition"
          >
            + Add Product
          </Link>

        </div>

      </div>

      {/* Search & Filter */}

      <div className="bg-white rounded-xl shadow border p-5 mb-8">

        <div className="grid gap-4 md:grid-cols-2">

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-lg p-3"
          />

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
            className="border rounded-lg p-3"
          >

            {categories.map((category) => (

              <option
                key={category}
                value={category}
              >
                {category}
              </option>

            ))}

          </select>

        </div>

      </div>

      {filteredProducts.length === 0 ? (

        <div className="bg-white rounded-xl border shadow p-10 text-center text-xl text-gray-500">
          No Products Found
        </div>

      ) : (

        <div className="overflow-x-auto rounded-xl border shadow bg-white">

          <table className="min-w-full">
          <table className="min-w-full">

            <thead className="bg-green-700 text-white">

              <tr>

                <th className="p-4 text-center">

                  <input
                    type="checkbox"
                    checked={
                      filteredProducts.length > 0 &&
                      selectedProducts.length ===
                        filteredProducts.length
                    }
                    onChange={toggleAll}
                  />

                </th>

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-center">
                  Category
                </th>

                <th className="p-4 text-center">
                  Price
                </th>

                <th className="p-4 text-center">
                  Stock
                </th>

                <th className="p-4 text-center">
                  Featured
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  <td className="text-center">

                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(
                        product._id
                      )}
                      onChange={() =>
                        toggleProduct(product._id)
                      }
                    />

                  </td>

                  <td className="p-4">

                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {product.slug}
                      </p>

                    </div>

                  </td>

                  <td className="text-center">
                    {product.category}
                  </td>

                  <td className="text-center font-semibold text-green-700">
                    ₹{product.price}
                  </td>

                  <td className="text-center">

                    {product.stock > 10 ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        {product.stock}
                      </span>

                    ) : product.stock > 0 ? (

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                        Low ({product.stock})
                      </span>

                    ) : (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                        Out of Stock
                      </span>

                    )}

                  </td>

                  <td className="text-center">

                    {product.featured ? (

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        Featured
                      </span>

                    ) : (

                      <span className="text-gray-400">
                        —
                      </span>

                    )}

                  </td>

                  <td className="text-center">

                    {product.active ? (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        Active
                      </span>

                    ) : (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                        Hidden
                      </span>

                    )}

                  </td>

                  <td>

                    <div className="flex justify-center gap-3 p-4">

                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}