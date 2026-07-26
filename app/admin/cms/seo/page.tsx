"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/app/components/cms/AdminHeader";

export default function CMSSEO() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setFormData({
            metaTitle: data.settings.metaTitle || "",
            metaDescription: data.settings.metaDescription || "",
            keywords: data.settings.keywords || "",
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
      if (data.success) alert("SEO settings updated!");
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
        title="SEO Settings"
        description="Configure default meta titles, descriptions, and search engine keywords."
      />

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Meta Title</label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            value={formData.metaTitle}
            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Meta Description</label>
          <textarea
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            rows={3}
            value={formData.metaDescription}
            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Keywords (Comma Separated)</label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="organic, ghee, honey, himalayan products"
            value={formData.keywords}
            onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
          />
        </div>

        <div className="pt-2 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-xl bg-green-700 px-8 py-3 font-bold text-white transition hover:bg-green-800 disabled:opacity-50 shadow-sm"
          >
            {loading ? "Saving..." : "Save SEO Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}