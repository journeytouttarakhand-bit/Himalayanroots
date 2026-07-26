"use client";

import { motion } from "framer-motion";
import { Sprout, Sparkles, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    badge: "100% Direct",
    icon: Sprout, // Custom Sprouts/Farming Icon
    title: "Farmer Direct",
    description:
      "Directly sourced from small mountain farms in Uttarakhand, eliminating middlemen to empower local growers.",
    tagColor: "bg-amber-100 text-amber-800",
  },
  {
    badge: "Chemical Free",
    icon: Sparkles, // Pure/Clean Organic Sparkle Icon
    title: "Pure & Organic",
    description:
      "Zero added preservatives, pesticides, or artificial flavors. Pure pristine mountain ingredients as nature intended.",
    tagColor: "bg-emerald-100 text-emerald-800",
  },
  {
    badge: "Strictly Checked",
    icon: ShieldCheck, // Quality Shield Icon
    title: "Certified Quality",
    description:
      "Handpicked and lab-tested in small batches to guarantee unmatched freshness and high nutritional value.",
    tagColor: "bg-blue-100 text-blue-800",
  },
  {
    badge: "Eco-Express",
    icon: Truck, // Express Delivery Icon
    title: "Pan-India Delivery",
    description:
      "Safely packaged in eco-friendly material and delivered fresh from the hills straight to your doorstep.",
    tagColor: "bg-purple-100 text-purple-800",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden">
      {/* Decorative Subtle Background Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-primary text-xs font-bold tracking-wider uppercase">
            The Himalayan Roots Promise
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-primary tracking-tight">
            Why Choose Himalayan Roots?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            We bring the untouched purity and authentic flavors of Uttarakhand straight to your kitchen.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-2xl hover:border-secondary/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center shadow-inner">
                      <IconComponent className="w-8 h-8 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full ${feature.tagColor}`}
                    >
                      {feature.badge}
                    </span>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Decorative Indicator */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Guaranteed Pure</span>
                  <span className="ml-1">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}