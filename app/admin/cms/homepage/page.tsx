"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/app/components/cms/AdminHeader";

export default function CMSHomepage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroButtonText: "",
    heroButtonLink: "",
    heroImage: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setFormData({
            heroTitle: data.settings.heroTitle || "",
            heroSubtitle: data.settings.heroSubtitle || "",
            heroButtonText: data.settings.heroButtonText || "",
            heroButtonLink: data.settings.heroButtonLink || "",
            heroImage: data.settings.heroImage || "",
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
      if (data.success) alert("Homepage settings updated!");
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 sm:p-8 space-y-6">
      {/* 🌟 Top Header with Back Button */}
      <AdminHeader
        title="Homepage Content"
        description="Update your homepage hero banner and CTA section."
      />

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Hero Title</label>
          <input
            type="text"
            className="w-full border rounded-xl p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            value={formData.heroTitle}
            onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Hero Subtitle</label>
          <textarea
            className="w-full border rounded-xl p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            rows={3}
            value={formData.heroSubtitle}
            onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Button Text</label>
            <input
              type="text"
              className="w-full border rounded-xl p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              value={formData.heroButtonText}
              onChange={(e) => setFormData({ ...formData, heroButtonText: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Button Link</label>
            <input
              type="text"
              className="w-full border rounded-xl p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              value={formData.heroButtonLink}
              onChange={(e) => setFormData({ ...formData, heroButtonLink: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Hero Image URL</label>
          <input
            type="text"
            className="w-full border rounded-xl p-3 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            value={formData.heroImage}
            onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
          />
        </div>

        <div className="pt-2 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-green-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 disabled:opacity-50 transition shadow-sm"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}