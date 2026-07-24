"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCouponPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    code: "",

    discountType: "percentage",

    discountValue: "",

    minimumOrder: "",

    maximumDiscount: "",

    usageLimit: "",

    expiryDate: "",

    description: "",

    active: true,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (
          e.target as HTMLInputElement
        ).checked,
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

    setLoading(true);

    try {
      const res = await fetch(
        "/api/coupons",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            ...form,

            discountValue: Number(
              form.discountValue
            ),

            minimumOrder: Number(
              form.minimumOrder || 0
            ),

            maximumDiscount: Number(
              form.maximumDiscount || 0
            ),

            usageLimit: Number(
              form.usageLimit || 0
            ),
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(
          data.message ||
            "Failed to create coupon."
        );

        setLoading(false);

        return;
      }

      alert(
        "Coupon created successfully."
      );

      router.push("/admin/coupons");

    } catch (error) {

      console.error(error);

      alert("Something went wrong.");

    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-4xl p-8">

      <h1 className="mb-8 text-4xl font-bold text-green-900">
        Add Coupon
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl bg-white p-8 shadow-lg"
      >
        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">
              Coupon Code
            </label>

            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="WELCOME10"
              className="w-full rounded-lg border p-3"
              required
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Discount Type
            </label>

            <select
              name="discountType"
              value={form.discountType}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
            >

              <option value="percentage">
                Percentage (%)
              </option>

              <option value="fixed">
                Fixed Amount (₹)
              </option>

            </select>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">
              Discount Value
            </label>

            <input
              type="number"
              name="discountValue"
              value={form.discountValue}
              onChange={handleChange}
              placeholder="10"
              className="w-full rounded-lg border p-3"
              required
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Minimum Order
            </label>

            <input
              type="number"
              name="minimumOrder"
              value={form.minimumOrder}
              onChange={handleChange}
              placeholder="999"
              className="w-full rounded-lg border p-3"
            />

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">
              Maximum Discount
            </label>

            <input
              type="number"
              name="maximumDiscount"
              value={form.maximumDiscount}
              onChange={handleChange}
              placeholder="300"
              className="w-full rounded-lg border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block font-semibold">
              Usage Limit
            </label>

            <input
              type="number"
              name="usageLimit"
              value={form.usageLimit}
              onChange={handleChange}
              placeholder="100"
              className="w-full rounded-lg border p-3"
            />

          </div>

        </div>
        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-semibold">
              Expiry Date
            </label>

            <input
              type="date"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />

          </div>

          <div className="flex items-end">

            <label className="flex items-center gap-3 rounded-lg border p-4 w-full cursor-pointer">

              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
                className="h-5 w-5"
              />

              <div>

                <p className="font-semibold">
                  Active Coupon
                </p>

                <p className="text-sm text-gray-500">
                  Customers can use this coupon
                </p>

              </div>

            </label>

          </div>

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Coupon description..."
            className="w-full rounded-lg border p-3 resize-none"
          />

        </div>

        <div className="border-t pt-6">

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 py-3 font-bold text-white transition hover:bg-green-800 disabled:bg-gray-400"
          >
            {loading
              ? "Creating Coupon..."
              : "Create Coupon"}
          </button>

        </div>

      </form>

    </div>
  );
}