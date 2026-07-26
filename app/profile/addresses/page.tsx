"use client";

import { useEffect, useState } from "react";

type Address = {
  _id: string;
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
  isDefault: boolean;
};

export default function AddressesPage() {

  const [addresses, setAddresses] =
    useState<Address[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      isDefault: false,
    });

  useEffect(() => {

    loadAddresses();

  }, []);

  async function loadAddresses() {

    try {

      const res =
        await fetch("/api/addresses", {
          cache: "no-store",
        });

      const data =
        await res.json();

      if (data.success) {

        setAddresses(
          data.addresses
        );

      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) {

    const {
      name,
      value,
      type,
    } = e.target;

    if (type === "checkbox") {

      setForm({
        ...form,
        [name]:
          (
            e.target as HTMLInputElement
          ).checked,
      });

      return;

    }

    setForm({
      ...form,
      [name]: value,
    });

  }

  async function deleteAddress(id: string) {

  const confirmDelete =
    window.confirm(
      "Delete this address?"
    );

  if (!confirmDelete) return;

  try {

    const res =
      await fetch(
        `/api/addresses/${id}`,
        {
          method: "DELETE",
        }
      );

    const data =
      await res.json();

    if (!data.success) {

      alert(data.message);

      return;

    }

    loadAddresses();

  } catch (error) {

    console.error(error);

  }

}

async function setDefault(id: string) {

  try {

    const address =
      addresses.find(
        (a) => a._id === id
      );

    if (!address) return;

    const res =
      await fetch(
        `/api/addresses/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            ...address,

            isDefault: true,

          }),
        }
      );

    const data =
      await res.json();

    if (!data.success) {

      alert(data.message);

      return;

    }

    loadAddresses();

  } catch (error) {

    console.error(error);

  }

}

  async function handleSubmit(
    e: React.FormEvent
  ) {

    try {

      const res =
        await fetch("/api/addresses", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            form
          ),

        });

      const data =
        await res.json();

      if (!data.success) {

        alert(data.message);

        return;

      }

      alert(
        "Address Added."
      );

      setForm({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        isDefault: false,
      });

      loadAddresses();

    } catch (error) {

      console.error(error);

    }

  }

  return (

    <div className="mx-auto max-w-6xl px-6 py-10">

      <h1 className="mb-8 text-4xl font-bold text-green-900">

        My Addresses

      </h1>

      <div className="grid gap-10 lg:grid-cols-2">

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-6 shadow"
        >

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            rows={3}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            name="landmark"
            placeholder="Landmark"
            value={form.landmark}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="isDefault"
              checked={
                form.isDefault
              }
              onChange={
                handleChange
              }
            />

            Default Address

          </label>

          <button
            className="w-full rounded-xl bg-green-700 py-3 font-bold text-white hover:bg-green-800"
          >
            Save Address
          </button>

        </form>

        <div>

          {loading ? (

            <p>Loading...</p>

          ) : addresses.length === 0 ? (

            <div className="rounded-xl border bg-white p-10 text-center">

              No Address Found

            </div>

          ) : (

            <div className="space-y-5">

              {addresses.map(
                (item) => (

                  <div
                    key={item._id}
                    className="rounded-xl border bg-white p-5 shadow"
                  >

                    <div className="flex items-center justify-between">

                      <h2 className="text-xl font-bold">

                        {item.fullName}

                      </h2>

                      {item.isDefault && (

                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                          Default

                        </span>

                      )}

                    </div>

                    <p className="mt-2">

                      {item.phone}

                    </p>

                    <p className="mt-2">

                      {item.address}

                    </p>

                    <p>

                      {item.city},{" "}
                      {item.state}

                    </p>

                    <p>

                      {item.pincode}

                    </p>

                    {item.landmark && (

                      <p>

                        Landmark:{" "}
                        {item.landmark}

                      </p>

                    )}
                    <div className="mt-5 flex gap-3">

  {!item.isDefault && (

    <button
      onClick={() =>
        setDefault(item._id)
      }
      className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
    >
      Set Default
    </button>

  )}

  <button
    onClick={() =>
      deleteAddress(item._id)
    }
    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
  >
    Delete
  </button>

</div>

                  </div>

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}