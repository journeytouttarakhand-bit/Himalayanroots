"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminHeader from "@/app/components/cms/AdminHeader";

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  active: boolean;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = categories.filter((category) => {
      return (
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.slug.toLowerCase().includes(search.toLowerCase())
      );
    });

    setFilteredCategories(filtered);
  }, [search, categories]);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();

      if (data.success) {
        setCategories(data.categories);
        setFilteredCategories(data.categories);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id: string) {
    const ok = confirm("Are you sure you want to delete this category?");

    if (!ok) return;

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Category Deleted Successfully");
        fetchCategories();
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
      <div className="flex h-[60vh] justify-center items-center text-xl font-bold text-gray-600">
        Loading Categories...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-6 space-y-6">
      
      {/* 🌟 Top Header with Back Button */}
      <AdminHeader
        title="Categories Management"
        description={`Total Categories: ${filteredCategories.length}`}
      />

      {/* Action Bar */}
      <div className="flex justify-end mb-4">
        <Link
          href="/admin/categories/new"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl font-semibold transition shadow-sm flex items-center gap-2"
        >
          <span>+</span> Add Category
        </Link>
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Category by name or slug..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 bg-white"
      />

      {/* Categories Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border">
        <table className="w-full text-sm">
          <thead className="bg-green-800 text-white font-semibold">
            <tr>
              <th className="text-left p-4">Image</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Slug</th>
              <th className="text-left p-4">Status</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredCategories.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500 font-medium"
                >
                  No Categories Found
                </td>
              </tr>
            ) : (
              filteredCategories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="p-4 font-bold text-gray-900">
                    {category.name}
                  </td>

                  <td className="p-4 font-mono text-gray-500 text-xs">
                    {category.slug}
                  </td>

                  <td className="p-4">
                    {category.active ? (
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/admin/categories/edit/${category._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteCategory(category._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}