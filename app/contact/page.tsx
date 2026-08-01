"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch((err) => console.error("Error loading settings:", err));
  }, []);

  const email = settings.contactEmail || "support@himalayanroots.com";
  const phone = settings.contactPhone || "+91 XXXXX XXXXX";
  const address = settings.address || "Uttarakhand, India";
  const workingHours = settings.workingHours || "Mon - Sat: 9:00 AM - 6:00 PM";

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-12">
      {/* 🌟 Top Bar with Back Button */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-100 transition active:scale-95 cursor-pointer mb-6"
        >
          ← Back
        </button>

        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions about our organic Himalayan products or your order? We are here to help you!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6 bg-green-50 p-8 rounded-2xl border border-green-100">
          <h2 className="text-2xl font-bold text-green-900">Get in Touch</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <h3 className="font-semibold text-gray-900">Address</h3>
                <p className="text-gray-600 text-sm whitespace-pre-line">{address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">📞</span>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="text-gray-600 text-sm">{phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">✉️</span>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600 text-sm">{email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">⏰</span>
              <div>
                <h3 className="font-semibold text-gray-900">Working Hours</h3>
                <p className="text-gray-600 text-sm">{workingHours}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-green-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                required
                placeholder="How can we help you?"
                className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-green-600 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}