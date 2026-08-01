"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import AdminHeader from "@/app/components/cms/AdminHeader";

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
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Selected Products
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

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
    const list = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...list];
  }, [products]);

  // Search + Filter
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.slug.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  function toggleProduct(id: string) {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function toggleAll() {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
      return;
    }

    setSelectedProducts(filteredProducts.map((p) => p._id));
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
      <div className="flex h-[60vh] items-center justify-center text-xl font-bold text-gray-600">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6">
      
      {/* Top Header with Back Button */}
      <AdminHeader
        title="Products Management"
        description={`Total Products Listed: ${filteredProducts.length}`}
      />

      {/* Action Buttons Bar */}
      <div className="flex justify-end gap-3">
        {selectedProducts.length > 0 && (
          <button
            onClick={bulkDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition shadow-sm"
          >
            Delete Selected ({selectedProducts.length})
          </button>
        )}

        <Link
          href="/admin/products/new"
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-semibold transition shadow-sm flex items-center gap-2"
        >
          <span>+</span> Add Product
        </Link>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search product by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 bg-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border shadow-sm p-10 text-center text-lg text-gray-500">
          No Products Found
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border shadow-sm bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-green-800 text-white font-semibold">
              <tr>
                <th className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={
                      filteredProducts.length > 0 &&
                      selectedProducts.length === filteredProducts.length
                    }
                    onChange={toggleAll}
                    className="h-4 w-4 rounded accent-green-600"
                  />
                </th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4 text-center">Category</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-50/80 transition"
                >
                  <td className="text-center p-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => toggleProduct(product._id)}
                      className="h-4 w-4 rounded accent-green-600"
                    />
                  </td>

                  <td className="p-4">
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-mono">
                        {product.slug}
                      </p>
                    </div>
                  </td>

                  <td className="text-center p-4 font-medium text-gray-700">
                    {product.category}
                  </td>

                  <td className="text-center p-4 font-bold text-green-700">
                    ₹{product.price}
                  </td>

                  <td className="text-center p-4">
                    {product.stock > 10 ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                        {product.stock}
                      </span>
                    ) : product.stock > 0 ? (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">
                        Low ({product.stock})
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
                        Out of Stock
                      </span>
                    )}
                  </td>

                  <td className="text-center p-4">
                    {product.featured ? (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800">
                        Featured
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>

                  <td className="text-center p-4">
                    {product.active ? (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-800">
                        Hidden
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/products/edit/${product._id}`}
                        className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
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