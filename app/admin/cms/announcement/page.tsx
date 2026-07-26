"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/app/components/cms/AdminHeader";

export default function CMSAnnouncement() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    announcementEnabled: true,
    announcementText: "",
    announcementButtonText: "",
    announcementLink: "",
    announcementBackground: "#166534",
    announcementTextColor: "#ffffff",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setFormData({
            announcementEnabled: data.settings.announcementEnabled ?? true,
            announcementText: data.settings.announcementText || "",
            announcementButtonText: data.settings.announcementButtonText || "",
            announcementLink: data.settings.announcementLink || "",
            announcementBackground: data.settings.announcementBackground || "#166534",
            announcementTextColor: data.settings.announcementTextColor || "#ffffff",
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
      if (data.success) alert("Announcement bar saved!");
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
        title="Announcement Bar"
        description="Enable and customize top notification bar across your store."
      />

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 border">
          <input
            type="checkbox"
            id="enabled"
            checked={formData.announcementEnabled}
            onChange={(e) => setFormData({ ...formData, announcementEnabled: e.target.checked })}
            className="h-5 w-5 rounded border-gray-300 text-green-700 focus:ring-green-700 cursor-pointer"
          />
          <label htmlFor="enabled" className="text-sm font-semibold text-gray-800 cursor-pointer">
            Show Announcement Bar
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Announcement Text</label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="🚚 Free Shipping on Orders Above ₹999"
            value={formData.announcementText}
            onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Button Text (Optional)</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              value={formData.announcementButtonText}
              onChange={(e) => setFormData({ ...formData, announcementButtonText: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Button Link</label>
            <input
              type="text"
              className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              value={formData.announcementLink}
              onChange={(e) => setFormData({ ...formData, announcementLink: e.target.value })}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Background Color</label>
            <input
              type="color"
              className="mt-1 h-12 w-full cursor-pointer rounded-xl border p-1"
              value={formData.announcementBackground}
              onChange={(e) => setFormData({ ...formData, announcementBackground: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Text Color</label>
            <input
              type="color"
              className="mt-1 h-12 w-full cursor-pointer rounded-xl border p-1"
              value={formData.announcementTextColor}
              onChange={(e) => setFormData({ ...formData, announcementTextColor: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-2 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-xl bg-green-700 px-8 py-3 font-bold text-white transition hover:bg-green-800 disabled:opacity-50 shadow-sm"
          >
            {loading ? "Saving..." : "Save Announcement Bar"}
          </button>
        </div>
      </form>
    </div>
  );
}