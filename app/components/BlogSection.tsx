"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BlogSection() {
  const router = useRouter();

  const blogs = [
    {
      id: 1,
      title: "Pure Pahadi A2 Ghee: Health Benefits & Traditional Bilona Method",
      excerpt:
        "Learn how authentic Vedic Bilona method preserves essential nutrients in A2 Badri Cow Ghee.",
      tag: "Health & Wellness",
      emoji: "🧈",
    },
    {
      id: 2,
      title: "Superfoods of Uttarakhand: Gahat, Bhat & Madua Grains",
      excerpt:
        "Discover the high-protein, organic pulses and millet directly grown by Himalayan farmers.",
      tag: "Organic Farming",
      emoji: "🌾",
    },
    {
      id: 3,
      title: "Original Himalayan Shilajit: How to Identify Purity at Home",
      excerpt:
        "Simple natural tests to verify the authenticity of pure mountain resin before consuming.",
      tag: "Product Guide",
      emoji: "🏔️",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-green-800 bg-green-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              From Our Journal
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-900 mt-3">
              Himalayan Stories & Articles
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-green-800 font-bold hover:text-green-900 transition text-sm group cursor-pointer"
          >
            View All Articles
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => router.push("/blog")}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{blog.emoji}</span>
                  <span className="text-xs font-semibold text-green-800 bg-green-50 px-2.5 py-1 rounded-md">
                    {blog.tag}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-green-800 transition">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="pt-2">
                <span className="text-sm font-bold text-green-700 group-hover:text-green-900 transition inline-flex items-center gap-1">
                  Read Story <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}