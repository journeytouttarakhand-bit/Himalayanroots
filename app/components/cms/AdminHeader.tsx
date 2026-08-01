"use client";

import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

export default function AdminHeader({
  title,
  description,
  showBackButton = true,
}: AdminHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-100 transition active:scale-95 cursor-pointer"
            >
              ← Back
            </button>
          )}
          <h1 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
            {title}
          </h1>
        </div>

        {description && (
          <p className="text-xs sm:text-sm text-gray-500 font-medium pt-1">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}