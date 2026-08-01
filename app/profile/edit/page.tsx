"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] =
    useState({
      name: "",
      phone: "",
    });

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    try {

      const res =
        await fetch(
          "/api/auth/me",
          {
            cache: "no-store",
          }
        );

      const data =
        await res.json();

      if (data.success) {

        setForm({
          name:
            data.user.name || "",

          phone:
            data.user.phone || "",
        });

      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });

  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setSaving(true);

    try {

      const res =
        await fetch(
          "/api/profile",
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              form
            ),
          }
        );

      const data =
        await res.json();

      if (!data.success) {

        alert(data.message);

        setSaving(false);

        return;

      }

      alert(
        "Profile Updated Successfully."
      );

      router.push("/profile");

      router.refresh();

    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong."
      );

    }

    setSaving(false);

  }

  if (loading) {

    return (

      <div className="mx-auto max-w-5xl p-10">

        Loading...

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-3xl px-6 py-12">

      <h1 className="mb-8 text-4xl font-bold text-green-900">

        Edit Profile

      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-8 shadow-lg"
      >

        <div>

          <label className="mb-2 block font-semibold">

            Full Name

          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
            required
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">

            Phone Number

          </label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-xl border p-4"
          />

        </div>

        <div className="flex gap-4">

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-green-700 px-8 py-4 font-bold text-white hover:bg-green-800 disabled:bg-gray-400"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={() =>
              router.push("/profile")
            }
            className="rounded-xl bg-gray-200 px-8 py-4 font-bold"
          >
            Cancel
          </button>

        </div>

      </form>

    </div>

  );

}