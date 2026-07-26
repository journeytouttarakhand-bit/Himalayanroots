"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto py-12 md:py-20 px-6 space-y-6">
      
      {/* 🌟 Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-100 transition active:scale-95 cursor-pointer"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-green-900">
        About Himalayan Roots
      </h1>

      <p className="text-lg leading-8 text-gray-700">
        Himalayan Roots brings authentic and natural products directly
        from the farmers of Uttarakhand to homes across India.
      </p>
    </div>
  );
}