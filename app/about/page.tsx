"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.error("Failed to load settings:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10 md:py-16 px-6 space-y-8">
      {/* Back Button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-100 transition active:scale-95 cursor-pointer"
        >
          ← Back
        </button>
      </div>

      {/* Heading */}
      <div className="space-y-3 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-green-900 leading-tight">
          {settings.aboutTitle || "From the Heart of the Himalayas to Your Family"}
        </h1>
        {settings.aboutSubtitle && (
          <p className="text-xl font-medium text-green-700">
            {settings.aboutSubtitle}
          </p>
        )}
      </div>

      {/* 🌟 100% Fixed Natural Image Container (No Zoom / No Crop) */}
      {settings.aboutImage && (
        <div className="w-full flex justify-center py-4">
          <div className="max-w-md w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white">
            <img
              src={settings.aboutImage}
              alt={settings.aboutTitle || "About Us"}
              className="w-full h-auto object-contain block mx-auto"
            />
          </div>
        </div>
      )}

      {/* Story Description */}
      <div className="text-base md:text-lg leading-8 text-gray-700 whitespace-pre-line space-y-4 pt-2">
        {settings.aboutDescription ||
          "Himalayan Roots brings authentic and natural products directly from the farmers of Uttarakhand to homes across India."}
      </div>
    </div>
  );
}