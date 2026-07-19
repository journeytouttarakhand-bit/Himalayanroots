"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "../../../../components/admin/ImageUploader";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type Category = {
  _id: string;
  name: string;
};

export default function EditProduct({
  params,
}: Props) {
  const router = useRouter();

  const [id, setId] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    rating: "5",
    featured: false,
    active: true,
  });

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

  useEffect(() => {
    async function loadProduct() {
      const { id } = await params;

      setId(id);

      try {
        const res = await fetch(`/api/products/${id}`);

        const data = await res.json();

        if (!data.success) {
          alert("Product not found");

          router.push("/admin/products");

          return;
        }

        const product = data.product;

        setForm({
          name: product.name,
          slug: product.slug,
          category: product.category,
          description: product.description,
          price: product.price.toString(),
          stock: product.stock.toString(),
          image: product.image,
          rating: product.rating.toString(),
          featured: product.featured,
          active: product.active,
        });
      } catch (error) {
        console.error(error);

        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();

    loadProduct();

  }, [params, router]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
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

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          rating: Number(form.rating),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to update product");

        setSaving(false);

        return;
      }

      alert("✅ Product Updated Successfully");

      router.push("/admin/products");
    } catch (error) {
      console.error(error);

      alert("Something went wrong.");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-2xl font-bold">
          Loading Product...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold text-green-900 mb-8">
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 space-y-6"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

        <div>

          <label className="block mb-2 font-semibold">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
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

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          className="w-full border rounded-lg p-3"
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

        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={form.rating}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          min="1"
          max="5"
          step="0.1"
        />

        <div className="space-y-3">

          <label className="font-semibold text-gray-700">
            Product Image
          </label>

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

            <h3 className="font-semibold text-lg">
              Current Image
            </h3>

            <img
              src={form.image}
              alt={form.name}
              className="w-56 h-56 object-cover rounded-xl border"
            />

          </div>

        )}

        <div className="grid md:grid-cols-2 gap-6">

          <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
            />

            <div>

              <p className="font-semibold">
                Featured Product
              </p>

              <p className="text-sm text-gray-500">
                Show on homepage
              </p>

            </div>

          </label>

          <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer">

            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
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
                <div className="border-t pt-6">

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold transition"
          >
            {saving
              ? "Updating Product..."
              : "Update Product"}
          </button>

        </div>

      </form>

    </div>
  );
}