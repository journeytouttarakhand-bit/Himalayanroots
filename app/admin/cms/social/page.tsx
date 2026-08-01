"use client";

import { useEffect, useState } from "react";
import CMSHeader from "@/app/components/cms/CMSHeader";
import AdminHeader from "@/app/components/cms/AdminHeader";

export default function CMSSocial() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    facebookUrl: "",
    instagramUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setFormData({
            facebookUrl: data.settings.facebookUrl || "",
            instagramUrl: data.settings.instagramUrl || "",
            twitterUrl: data.settings.twitterUrl || "",
            youtubeUrl: data.settings.youtubeUrl || "",
            whatsappNumber: data.settings.whatsappNumber || "",
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
      if (data.success) alert("Social links updated!");
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-8 space-y-6">
      <CMSHeader
        title="Social Media Links"
        description="Configure your website's social media and chat channel links."
      />
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Facebook URL</label>
          <input
            type="url"
            className="w-full border rounded p-2 mt-1"
            value={formData.facebookUrl}
            onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Instagram URL</label>
          <input
            type="url"
            className="w-full border rounded p-2 mt-1"
            value={formData.instagramUrl}
            onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">X / Twitter URL</label>
          <input
            type="url"
            className="w-full border rounded p-2 mt-1"
            value={formData.twitterUrl}
            onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">YouTube Channel URL</label>
          <input
            type="url"
            className="w-full border rounded p-2 mt-1"
            value={formData.youtubeUrl}
            onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">WhatsApp Support Number (with Country Code)</label>
          <input
            type="text"
            className="w-full border rounded p-2 mt-1"
            placeholder="919876543210"
            value={formData.whatsappNumber}
            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-700 text-white px-6 py-2 rounded font-medium hover:bg-green-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Social Links"}
        </button>
      </form>
    </div>
  );
}