"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    featured: false,
    active: true,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    const formData = new FormData();

    formData.append("file", file);

    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setPreview(data.imageUrl);

        setForm((prev) => ({
          ...prev,
          image: data.imageUrl,
        }));

        alert("✅ Image Uploaded Successfully");
      } else {
        alert("Image Upload Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Upload Error");
    }

    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload product image first.");
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
          stock: Number(form.stock),
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Product Added Successfully");

        router.push("/admin/products");
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold text-green-900 mb-8">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white shadow-lg rounded-xl p-8"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-32"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <div>

          <label className="font-semibold block mb-2">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="w-full border p-3 rounded-lg"
          />

        </div>

        {uploading && (
          <p className="text-blue-600 font-bold">
            Uploading Image...
          </p>
        )}

        {preview && (
          <div>

            <Image
              src={preview}
              alt="Preview"
              width={250}
              height={250}
              className="rounded-xl border mt-3"
            />

          </div>
        )}

        <div className="flex gap-8">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />

            Featured

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />

            Active

          </label>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-bold"
        >
          {loading ? "Saving Product..." : "Save Product"}
        </button>

      </form>

    </div>
  );
}