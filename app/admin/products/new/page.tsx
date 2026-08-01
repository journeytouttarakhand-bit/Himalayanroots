"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "../../../components/admin/ImageUploader";
import AdminHeader from "@/app/components/cms/AdminHeader";

type Category = {
  _id: string;
  name: string;
};

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    price: "",
    salePrice: "",
    stock: "",
    image: "",
    rating: "5",
    weight: "",
    sku: "",
    tags: "",
    featured: false,
    bestSeller: false,
    newArrival: false,
    trending: false,
    onSale: false,
    active: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();

      if (data.success) {
        setCategories(data.categories.filter((item: any) => item.active));
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
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

    if (!form.image) {
      alert("Please upload product image.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/all-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          salePrice: Number(form.salePrice || 0),
          stock: Number(form.stock),
          rating: Number(form.rating),
          tags: form.tags
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to add product");
        setLoading(false);
        return;
      }

      alert("✅ Product Added Successfully");
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      
      {/* 🌟 Naya Admin Header Back Button ke sath */}
      <AdminHeader 
        title="Add New Product" 
        description="Fill in the details below to list a new product in your store." 
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-8 shadow-lg"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="text"
          name="slug"
          placeholder="Product Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <div>
          <label className="mb-2 block font-semibold">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full resize-none rounded-lg border p-3"
          required
        />

        <div className="grid gap-5 md:grid-cols-2">
          <input
            type="number"
            name="price"
            placeholder="Regular Price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="number"
            name="salePrice"
            placeholder="Sale Price"
            value={form.salePrice}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating (Max 5)"
            value={form.rating}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            min="1"
            max="5"
            step="0.1"
          />

          <input
            type="text"
            name="weight"
            placeholder="Weight (e.g. 500g)"
            value={form.weight}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <input
          type="text"
          name="sku"
          placeholder="SKU (Optional)"
          value={form.sku}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <div className="space-y-3">
          <label className="font-semibold text-gray-700">Product Image</label>
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
            <h3 className="text-lg font-semibold">Uploaded Image</h3>
            <img
              src={form.image}
              alt="Product"
              className="h-56 w-56 rounded-xl border object-cover"
            />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <div>
              <p className="font-semibold">Featured Product</p>
              <p className="text-sm text-gray-500">Show on Homepage</p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              name="bestSeller"
              checked={form.bestSeller}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <div>
              <p className="font-semibold">Best Seller</p>
              <p className="text-sm text-gray-500">Mark as Best Seller</p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              name="newArrival"
              checked={form.newArrival}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <div>
              <p className="font-semibold">New Arrival</p>
              <p className="text-sm text-gray-500">Highlight as New</p>
            </div>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <div>
              <p className="font-semibold">Active Product</p>
              <p className="text-sm text-gray-500">Visible to Customers</p>
            </div>
          </label>
        </div>

        <div className="border-t pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3 font-bold text-white transition hover:bg-green-800 disabled:bg-gray-400"
          >
            {loading ? "Saving Product..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}