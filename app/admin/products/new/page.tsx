"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "../../../components/admin/ImageUploader";

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  type Category = {
  _id: string;
  name: string;
};

const [categories, setCategories] = useState<Category[]>([]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
  
  useEffect(() => {
  fetchCategories();
}, []);

async function fetchCategories() {
  try {
    const res = await fetch("/api/categories");

    const data = await res.json();

    if (data.success) {
      setCategories(
        data.categories.filter(
          (item: any) => item.active
        )
      );
    }
  } catch (error) {
    console.error(error);
  }
}
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

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!form.image) {
      alert("Please upload product image.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "/api/all-products",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(
          data.message ||
            "Failed to add product"
        );

        setLoading(false);

        return;
      }

      alert(
        "✅ Product Added Successfully"
      );

      router.push("/admin/products");
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold text-green-900 mb-8">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <div>

  <label className="block mb-2 font-semibold">
    Category
  </label>

  <select
    name="category"
    value={form.category}
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        category: e.target.value,
      }))
    }
    className="w-full border p-3 rounded-lg"
    required
  >

    <option value="">
      Select Category
    </option>

    {categories.map((category) => (

      <option
        key={category._id}
        value={category.name}
      >
        {category.name}
      </option>

    ))}

  </select>

</div>

        <input
          type="text"
          name="slug"
          placeholder="Product Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full border rounded-lg p-3 resize-none"
          required
        />

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

        </div>

        <div className="space-y-3">

          <label className="font-semibold text-gray-700">
            Product Images
          </label>

          <ImageUploader
            multiple
            value={form.image}
            onChange={(url) =>
              setForm((prev) => ({
                ...prev,
                image: url,
              }))
            }
          />

        </div>
        <div className="grid md:grid-cols-2 gap-6">

          <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <div>

              <p className="font-semibold">
                Featured Product
              </p>

              <p className="text-sm text-gray-500">
                Show this product on homepage
              </p>

            </div>

          </label>

          <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="w-5 h-5"
            />

            <div>

              <p className="font-semibold">
                Active Product
              </p>

              <p className="text-sm text-gray-500">
                Visible to customers
              </p>

            </div>

          </label>

        </div>

        {form.image && (

          <div className="space-y-3">

            <h3 className="font-semibold text-lg">
              Uploaded Image
            </h3>

            <img
              src={form.image}
              alt="Product"
              className="w-56 h-56 object-cover rounded-xl border"
            />

          </div>

        )}
        <div className="border-t pt-6">

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold transition"
          >
            {loading
              ? "Saving Product..."
              : "Save Product"}
          </button>

        </div>

      </form>

    </div>
  );
}