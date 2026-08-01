"use client";

import Link from "next/link";
import {
  Plus,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Add Product",
    description: "Create a new product",
    href: "/admin/products/new",
    icon: Plus,
    color:
      "bg-green-100 text-green-700 border-green-200 hover:bg-green-200",
  },
  {
    title: "Manage Products",
    description: "View & edit products",
    href: "/admin/products",
    icon: Package,
    color:
      "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200",
  },
  {
    title: "Categories",
    description: "Manage categories",
    href: "/admin/categories",
    icon: FolderTree,
    color:
      "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200",
  },
  {
    title: "Orders",
    description: "Track customer orders",
    href: "/admin/orders",
    icon: ShoppingBag,
    color:
      "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200",
  },
  {
    title: "Customers",
    description: "Customer overview",
    href: "/admin/customers",
    icon: Users,
    color:
      "bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b px-6 py-5">

        <h2 className="text-xl font-bold text-gray-800">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Frequently used admin shortcuts
        </p>

      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className={`group rounded-xl border p-5 transition-all duration-300 ${action.color}`}
            >

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80">

                  <Icon size={24} />

                </div>

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {action.title}
              </h3>

              <p className="mt-2 text-sm opacity-80">
                {action.description}
              </p>

            </Link>
          );
        })}
      </div>

      <div className="border-t bg-gray-50 px-6 py-4">

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <div>

            <h4 className="font-semibold text-gray-800">
              Admin Panel
            </h4>

            <p className="text-sm text-gray-500">
              Use these shortcuts to quickly manage your store.
            </p>

          </div>

          <Link
            href="/admin/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Dashboard Home
          </Link>

        </div>

      </div>

    </div>
  );
}