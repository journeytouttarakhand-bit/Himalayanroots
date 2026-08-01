"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Coupon = {
  _id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumOrder: number;
  maximumDiscount: number;
  usageLimit: number;
  usedCount: number;
  expiryDate: string;
  active: boolean;
  description: string;
};

export default function CouponsPage() {
  const [coupons, setCoupons] =
    useState<Coupon[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadCoupons();
  }, []);

  async function loadCoupons() {
    try {
      const res = await fetch(
        "/api/coupons",
        {
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (data.success) {
        setCoupons(data.coupons);
      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }

  async function deleteCoupon(
    id: string
  ) {

    const confirmDelete =
      window.confirm(
        "Delete this coupon?"
      );

    if (!confirmDelete) return;

    try {

      const res = await fetch(
        `/api/coupons/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {

        alert(
          "Coupon deleted successfully."
        );

        loadCoupons();

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert(
        "Failed to delete coupon."
      );

    }
  }

  const filteredCoupons =
    useMemo(() => {

      return coupons.filter(
        (coupon) =>
          coupon.code
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          coupon.description
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    }, [coupons, search]);

  if (loading) {
    return (
      <div className="p-10 text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-green-900">
            Coupons
          </h1>

          <p className="mt-2 text-gray-500">
            Total Coupons :
            {" "}
            {filteredCoupons.length}
          </p>

        </div>

        <Link
          href="/admin/coupons/new"
          className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
        >
          + Add Coupon
        </Link>

      </div>

      <div className="mb-8 rounded-xl border bg-white p-5 shadow">

        <input
          type="text"
          placeholder="Search coupon..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full rounded-lg border p-3"
        />

      </div>
      {filteredCoupons.length === 0 ? (

        <div className="rounded-xl border bg-white p-10 text-center text-xl text-gray-500 shadow">
          No Coupons Found
        </div>

      ) : (

        <div className="overflow-x-auto rounded-xl border bg-white shadow">

          <table className="min-w-full">

            <thead className="bg-green-700 text-white">

              <tr>

                <th className="p-4 text-left">
                  Coupon
                </th>

                <th className="p-4 text-center">
                  Discount
                </th>

                <th className="p-4 text-center">
                  Min Order
                </th>

                <th className="p-4 text-center">
                  Usage
                </th>

                <th className="p-4 text-center">
                  Expiry
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCoupons.map((coupon) => {

                const expired =
                  new Date(coupon.expiryDate) <
                  new Date();

                return (

                  <tr
                    key={coupon._id}
                    className="border-b transition hover:bg-gray-50"
                  >

                    <td className="p-4">

                      <div>

                        <h3 className="font-bold text-gray-800">
                          {coupon.code}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {coupon.description ||
                            "No description"}
                        </p>

                      </div>

                    </td>

                    <td className="text-center">

                      {coupon.discountType ===
                      "percentage" ? (

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                          {coupon.discountValue}% OFF
                        </span>

                      ) : (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                          ₹{coupon.discountValue} OFF
                        </span>

                      )}

                    </td>

                    <td className="text-center font-medium">
                      ₹{coupon.minimumOrder}
                    </td>

                    <td className="text-center">

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                        {coupon.usedCount} /
                        {" "}
                        {coupon.usageLimit}
                      </span>

                    </td>

                    <td className="text-center">
                      {new Date(
                        coupon.expiryDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="text-center">

                      {!coupon.active ? (

                        <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                          Disabled
                        </span>

                      ) : expired ? (

                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                          Expired
                        </span>

                      ) : (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                          Active
                        </span>

                      )}

                    </td>

                    <td>

                      <div className="flex justify-center gap-3 p-4">
                      <Link
                        href={`/admin/coupons/edit/${coupon._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteCoupon(coupon._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}