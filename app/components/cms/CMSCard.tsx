"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface CMSCardProps {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
  color: string;
}

export default function CMSCard({
  title,
  description,
  href,
  icon,
  color,
}: CMSCardProps) {
  return (
    <Link href={href}>

      <div
        className={`group cursor-pointer rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${color}`}
      >

        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition group-hover:scale-110">
          {icon}
        </div>

        <h2 className="text-xl font-bold text-gray-800">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {description}
        </p>

        <div className="mt-6 flex items-center font-semibold text-green-700">
          Manage
          <span className="ml-2 transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>

      </div>

    </Link>
  );
}