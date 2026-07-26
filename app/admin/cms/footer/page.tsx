"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/app/components/cms/AdminHeader";

export default function CMSFooter() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    footerAboutText: "",
    copyrightText: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setFormData({
            footerAboutText: data.settings.footerAboutText || "",
            copyrightText: data.settings.copyrightText || "",
          });
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) alert("Footer settings saved!");
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 sm:p-8">
      {/* 🌟 Top Header with Back Button */}
      <AdminHeader
        title="Footer Content"
        description="Update footer summary text, brand description and copyright info."
      />

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Footer About Text</label>
          <textarea
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            rows={4}
            value={formData.footerAboutText}
            onChange={(e) => setFormData({ ...formData, footerAboutText: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Copyright Text</label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="© 2026 Himalayan Roots. All rights reserved."
            value={formData.copyrightText}
            onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
          />
        </div>

        <div className="pt-2 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-xl bg-green-700 px-8 py-3 font-bold text-white transition hover:bg-green-800 disabled:opacity-50 shadow-sm"
          >
            {loading ? "Saving..." : "Save Footer"}
          </button>
        </div>
      </form>
    </div>
  );
}