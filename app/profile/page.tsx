"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
};

export default function ProfilePage() {

  const [loading, setLoading] =
    useState(true);

  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {

    loadUser();

  }, []);

  async function loadUser() {

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

        setUser(data.user);

      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  }

  if (loading) {

    return (

      <div className="mx-auto max-w-6xl p-10">

        Loading...

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-6xl px-6 py-12">

      <h1 className="mb-8 text-4xl font-bold text-green-900">

        My Profile

      </h1>

      <div className="rounded-2xl bg-white p-8 shadow-lg">

        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-700 text-4xl font-bold text-white">

          {user?.name?.charAt(0)}

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <p className="mt-2 text-xl font-semibold">

              {user?.name}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Email
            </p>

            <p className="mt-2 text-xl font-semibold">

              {user?.email}

            </p>

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Phone
            </p>

            <p className="mt-2 text-xl font-semibold">

              {user?.phone || "-"}

            </p>

          </div>

        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">

  <Link
    href="/profile/edit"
    className="rounded-xl bg-green-700 px-6 py-4 text-center font-bold text-white hover:bg-green-800"
  >
    ✏️ Edit Profile
  </Link>

  <Link
    href="/my-orders"
    className="rounded-xl bg-blue-700 px-6 py-4 text-center font-bold text-white hover:bg-blue-800"
  >
    📦 My Orders
  </Link>

  <Link
    href="/profile/addresses"
    className="rounded-xl bg-orange-600 px-6 py-4 text-center font-bold text-white hover:bg-orange-700"
  >
    📍 Manage Addresses
  </Link>

  <Link
    href="/profile/change-password"
    className="rounded-xl bg-red-600 px-6 py-4 text-center font-bold text-white hover:bg-red-700"
  >
    🔒 Change Password
  </Link>

</div>

      </div>

    </div>

  );

}