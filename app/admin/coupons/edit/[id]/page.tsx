"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditCouponPage({
  params,
}: Props) {
  const router = useRouter();

  const [couponId, setCouponId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
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

  useEffect(() => {
    async function init() {
      const { id } = await params;

      setCouponId(id);

      loadCoupon(id);
    }

    init();
  }, [params]);

  async function loadCoupon(id: string) {
    try {
      const res = await fetch(
        `/api/coupons/${id}`
      );

      const data = await res.json();

      if (!data.success) {
        alert("Coupon not found.");

        router.push(
          "/admin/coupons"
        );

        return;
      }

      const coupon = data.coupon;

      setForm({
        code: coupon.code,

        discountType:
          coupon.discountType,

        discountValue:
          coupon.discountValue.toString(),

        minimumOrder:
          coupon.minimumOrder.toString(),

        maximumDiscount:
          coupon.maximumDiscount.toString(),

        usageLimit:
          coupon.usageLimit.toString(),

        expiryDate:
          coupon.expiryDate
            .split("T")[0],

        description:
          coupon.description || "",

        active:
          coupon.active,
      });

    } catch (error) {

      console.error(error);

      alert(
        "Failed to load coupon."
      );

    } finally {

      setLoading(false);

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

      setForm((prev) => ({
        ...prev,
        [name]:
          (
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

  if (loading) {
    return (
      <div className="p-10 text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-8">

      <h1 className="mb-8 text-4xl font-bold text-green-900">
        Edit Coupon
      </h1>

      <form className="space-y-6 rounded-xl bg-white p-8 shadow-lg">
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

            <label className="flex w-full cursor-pointer items-center gap-3 rounded-lg border p-4">

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
            className="w-full resize-none rounded-lg border p-3"
            placeholder="Coupon description..."
          />

        </div>

        <div className="border-t pt-6">

          <button
            type="button"
            onClick={async () => {
              setSaving(true);

              try {

                const res = await fetch(
                  `/api/coupons/${couponId}`,
                  {
                    method: "PUT",

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

                const data =
                  await res.json();

                if (!data.success) {

                  alert(
                    data.message ||
                      "Failed to update coupon."
                  );

                  setSaving(false);

                  return;
                }

                alert(
                  "Coupon updated successfully."
                );

                router.push(
                  "/admin/coupons"
                );

              } catch (error) {

                console.error(error);

                alert(
                  "Something went wrong."
                );

              }

              setSaving(false);
            }}
            disabled={saving}
            className="w-full rounded-lg bg-green-700 py-3 font-bold text-white transition hover:bg-green-800 disabled:bg-gray-400"
          >
            {saving
              ? "Updating Coupon..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}