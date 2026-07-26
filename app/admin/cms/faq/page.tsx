"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/app/components/cms/AdminHeader";

interface FAQItem {
  question: string;
  answer: string;
}

export default function CMSFAQ() {
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings?.faqs) {
          setFaqs(data.settings.faqs);
        }
      });
  }, []);

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faqs }),
      });
      const data = await res.json();
      if (data.success) alert("FAQs updated!");
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
        title="FAQ Management"
        description="Add, edit, or remove frequently asked questions."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border bg-white p-6 sm:p-8 shadow-sm"
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="relative space-y-3 rounded-xl border bg-gray-50/70 p-4 transition hover:border-gray-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800">
                FAQ #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="text-xs font-bold text-red-600 hover:text-red-800 transition"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              placeholder="Question"
              className="w-full rounded-xl border bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              value={faq.question}
              onChange={(e) => updateFaq(index, "question", e.target.value)}
            />
            <textarea
              placeholder="Answer"
              className="w-full rounded-xl border bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              rows={2}
              value={faq.answer}
              onChange={(e) => updateFaq(index, "answer", e.target.value)}
            />
          </div>
        ))}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t">
          <button
            type="button"
            onClick={addFaq}
            className="rounded-xl border border-green-700 px-5 py-2.5 text-sm font-bold text-green-700 transition hover:bg-green-50"
          >
            + Add New FAQ
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-green-700 px-8 py-2.5 font-bold text-white transition hover:bg-green-800 disabled:opacity-50 shadow-sm"
          >
            {loading ? "Saving..." : "Save FAQs"}
          </button>
        </div>
      </form>
    </div>
  );
}