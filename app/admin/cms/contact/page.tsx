"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/app/components/cms/AdminHeader";

export default function CMScontactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    contactEmail: "",
    contactPhone: "",
    address: "",
    workingHours: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setFormData({
            contactEmail: data.settings.contactEmail || "",
            contactPhone: data.settings.contactPhone || "",
            address: data.settings.address || "",
            workingHours: data.settings.workingHours || "",
          });
        }
      })
      .catch((err) => console.error("Error loading settings:", err));
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
      if (data.success) {
        alert("Contact details saved successfully!");
      } else {
        alert(data.message || "Failed to save.");
      }
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
        title="Contact Information"
        description="Manage public phone numbers, support emails, and office location."
      />

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Support Email</label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Contact Phone Number</label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            value={formData.contactPhone}
            onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Physical Address</label>
          <textarea
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            rows={3}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Working Hours</label>
          <input
            type="text"
            className="mt-1 w-full rounded-xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Mon - Sat: 9:00 AM - 6:00 PM"
            value={formData.workingHours}
            onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
          />
        </div>

        <div className="pt-2 border-t">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-xl bg-green-700 px-8 py-3 font-bold text-white transition hover:bg-green-800 disabled:opacity-50 shadow-sm"
          >
            {loading ? "Saving..." : "Save Contact Info"}
          </button>
        </div>
      </form>
    </div>
  );
}