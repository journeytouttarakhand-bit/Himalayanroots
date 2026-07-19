"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
        category.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        category.slug
          .toLowerCase()
          .includes(search.toLowerCase())
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
    const ok = confirm(
      "Are you sure you want to delete this category?"
    );

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
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <h1 className="text-4xl font-bold text-green-900">
          Categories
        </h1>

        <Link
          href="/admin/categories/new"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold"
        >
          + Add Category
        </Link>

      </div>

      <input
        type="text"
        placeholder="Search Category..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full border rounded-lg p-3 mb-6"
      />
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border">

        <table className="w-full">

          <thead className="bg-green-700 text-white">

            <tr>

              <th className="text-left p-4">
                Image
              </th>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Slug
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-center p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCategories.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No Categories Found
                </td>

              </tr>

            ) : (

              filteredCategories.map((category) => (

                <tr
                  key={category._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">

                    {category.image ? (

                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />

                    ) : (

                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                        No Image
                      </div>

                    )}

                  </td>

                  <td className="p-4 font-semibold">
                    {category.name}
                  </td>

                  <td className="p-4">
                    {category.slug}
                  </td>

                  <td className="p-4">

                    {category.active ? (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Active
                      </span>

                    ) : (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Inactive
                      </span>

                    )}

                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/admin/categories/edit/${category._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteCategory(category._id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
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

      <div className="mt-8 text-gray-500 text-sm">

        Total Categories :
        <span className="font-bold text-green-700 ml-2">
          {filteredCategories.length}
        </span>

      </div>
    </div>
  );
}