"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/app/components/admin/ImageUploader";
import AdminHeader from "@/app/components/cms/AdminHeader";

export default function NewCategoryPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    active: true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Category name is required.");
      return;
    }

    if (!form.slug.trim()) {
      alert("Category slug is required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to create category");
        setLoading(false);
        return;
      }

      alert("✅ Category Added Successfully");
      router.push("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-6 space-y-6">
      {/* 🌟 Top Header with Back Button */}
      <AdminHeader
        title="Add Category"
        description="Create a new product category for your store."
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 space-y-6 border"
      >
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="slug"
          placeholder="Category Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <div className="space-y-3">
          <label className="font-semibold text-gray-700">Category Image</label>

          <ImageUploader
            value={form.image}
            onChange={(url) =>
              setForm((prev) => ({
                ...prev,
                image: url,
              }))
            }
          />
        </div>

        {form.image && (
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Image Preview</h3>

            <img
              src={form.image}
              alt="Category"
              className="w-52 h-52 rounded-xl border object-cover"
            />
          </div>
        )}

        <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
            className="h-5 w-5"
          />

          <div>
            <p className="font-semibold">Active Category</p>
            <p className="text-sm text-gray-500">
              Visible in website category list
            </p>
          </div>
        </label>

        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold transition"
          >
            {loading ? "Saving Category..." : "Save Category"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            className="flex-1 border-2 border-gray-300 hover:bg-gray-100 py-3 rounded-lg font-bold transition text-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}