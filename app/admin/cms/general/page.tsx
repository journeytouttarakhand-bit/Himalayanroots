"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/app/components/cms/AdminHeader";

export default function CMSGeneral() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    siteName: "Himalayan Roots",
    tagline: "",
    siteDescription: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setFormData({
            siteName: data.settings.siteName || "Himalayan Roots",
            tagline: data.settings.tagline || "",
            siteDescription: data.settings.siteDescription || "",
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
      if (data.success) alert("General settings saved!");
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
        title="General Site Settings"
        description="Configure your website title, tagline, and business overview."
      />

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Site Name</label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            value={formData.siteName}
            onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Site Tagline</label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Site Description</label>
          <textarea
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            rows={4}
            value={formData.siteDescription}
            onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
          />
        </div>

        <div className="pt-2 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-xl bg-green-700 px-8 py-3 font-bold text-white transition hover:bg-green-800 disabled:opacity-50 shadow-sm"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}