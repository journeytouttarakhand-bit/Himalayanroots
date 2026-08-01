"use client";

import { useMemo } from "react";
import Link from "next/link";

import {
  Search,
  Bell,
  Globe,
  Menu,
} from "lucide-react";

type AdminTopbarProps = {
  onMenuClick?: () => void;
};

export default function AdminTopbar({
  onMenuClick,
}: AdminTopbarProps) {

  const today = useMemo(() => {

    return new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-white">

      <div className="flex items-center justify-between gap-5 px-6 py-4">

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg border p-2 transition hover:bg-gray-100 lg:hidden"
          >

            <Menu size={22} />

          </button>

          <div>

            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>

            <p className="text-sm text-gray-500">
              {today}
            </p>

          </div>

        </div>

        <div className="hidden w-full max-w-md lg:block">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products, orders..."
              className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition focus:border-green-600"
            />

          </div>

        </div>

        <div className="flex items-center gap-3">
                      <Link
            href="/"
            target="_blank"
            className="rounded-xl border p-3 transition hover:bg-green-50"
            title="View Website"
          >

            <Globe
              size={20}
              className="text-green-700"
            />

          </Link>

          <button
            type="button"
            className="relative rounded-xl border p-3 transition hover:bg-gray-100"
          >

            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

          </button>

          <div className="flex items-center gap-3 rounded-xl border px-4 py-2">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-700 text-lg font-bold text-white">

              A

            </div>

            <div className="hidden text-left md:block">

              <h3 className="font-semibold text-gray-800">
                Admin
              </h3>

              <p className="text-sm text-gray-500">
                Himalayan Roots
              </p>

            </div>

          </div>

        </div>

      </div>
          </header>
  );
}