"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ImageUploader from "@/app/components/admin/ImageUploader";

type Category = {
  _id: string;
  name: string;
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    description: "",
    price: "",
    salePrice: "",
    stock: "",
    sku: "",
    weight: "",
    tags: "",
    image: "",
    rating: "5",
    featured: false,
    bestSeller: false,
    newArrival: false,
    active: true,
  });

  useEffect(() => {
    fetchCategories();
    fetchProduct();
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

  async function fetchProduct() {
    try {
      const res = await fetch(
        `/api/products/${id}`
      );

      const data = await res.json();

      if (!data.success) {
        alert("Product not found.");
        router.push("/admin/products");
        return;
      }

      const product = data.product;

      setForm({
        name: product.name || "",
        slug: product.slug || "",
        category: product.category || "",
        description: product.description || "",
        price: String(product.price || ""),
        salePrice: String(
          product.salePrice || ""
        ),
        stock: String(product.stock || ""),
        sku: product.sku || "",
        weight: String(product.weight || ""),
        tags: Array.isArray(product.tags)
          ? product.tags.join(", ")
          : "",
        image: product.image || "",
        rating: String(product.rating || 5),
        featured: product.featured || false,
        bestSeller:
          product.bestSeller || false,
        newArrival:
          product.newArrival || false,
        active:
          product.active !== false,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load product.");
    } finally {
      setPageLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value, type } =
      e.target;

    if (type === "checkbox") {
      const checked = (
        e.target as HTMLInputElement
      ).checked;

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
        `/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            salePrice: Number(
              form.salePrice || 0
            ),
            stock: Number(form.stock),
            weight: Number(
              form.weight || 0
            ),
            rating: Number(form.rating),
            tags: form.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(
          data.message ||
            "Failed to update product."
        );

        setLoading(false);
        return;
      }

      alert(
        "✅ Product Updated Successfully"
      );

      router.push("/admin/products");

    } catch (error) {

      console.error(error);

      alert("Something went wrong.");

    }

    setLoading(false);
  }

  if (pageLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="text-xl font-semibold">
          Loading Product...
        </div>

      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">

      <h1 className="mb-8 text-4xl font-bold text-green-900">
        Edit Product
      </h1>

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
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <div>

          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
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
          rows={5}
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full resize-none rounded-lg border p-3"
          required
        />

        <div className="grid gap-5 md:grid-cols-2">

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="rounded-lg border p-3"
            required
          />

          <input
            type="number"
            name="salePrice"
            placeholder="Sale Price"
            value={form.salePrice}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="rounded-lg border p-3"
            required
          />

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

        </div>
                <div className="grid gap-5 md:grid-cols-2">

          <input
            type="number"
            name="weight"
            placeholder="Weight (grams)"
            value={form.weight}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

          <input
            type="number"
            name="rating"
            placeholder="Rating"
            min="1"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

        </div>

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />

        <div className="space-y-3">

          <label className="font-semibold">
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

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Preview
            </h3>

            <img
              src={form.image}
              alt={form.name}
              className="h-60 w-60 rounded-xl border object-cover"
            />

          </div>

        )}

        <div className="grid gap-6 md:grid-cols-2">

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">

            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="h-5 w-5"
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

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4">

            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
              className="h-5 w-5"
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
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3 font-bold text-white transition hover:bg-green-800 disabled:bg-gray-400"
          >
            {loading
              ? "Updating Product..."
              : "Update Product"}
          </button>

        </div>

      </form>

    </div>
  );
}