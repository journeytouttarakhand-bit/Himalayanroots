import Link from "next/link";
import getSiteSettings from "@/lib/getSiteSettings";

import HeroContent from "./components/HeroContent";
import Features from "./components/Features";
import Products from "./components/Products";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import BlogSection from "./components/BlogSection";
import WhatsAppButton from "./components/WhatsAppButton";

import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  HeartHandshake,
  Flame,          // For Honey
  Cookie,         // For Pure Ghee
  Wheat,          // For Pulses & Grains
  FlameKindling, // For Spices
  Trees           // For Organic Grains
} from "lucide-react";

export default async function Home() {
  const settings = (await getSiteSettings()) || {};

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* 1. Dynamic Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-950 via-emerald-900 to-green-900 text-white">
        <HeroContent
          heroImage={settings.heroImage || "/hero-banner.jpg"}
          heroTitle={
            settings.heroTitle ||
            "Pure & Authentic Organic Delights From Uttarakhand"
          }
          heroSubtitle={
            settings.heroSubtitle ||
            "Directly sourced from mountain farmers of the Himalayas. 100% Natural, Unprocessed, and Chemical-Free."
          }
          heroButtonText={settings.heroButtonText || "Explore Products"}
          heroButtonLink={settings.heroButtonLink || "/products"}
          whatsappLink={
            settings.whatsappNumber
              ? `https://wa.me/${settings.whatsappNumber}`
              : ""
          }
        />
      </section>

      {/* 2. Quick Highlight Banner / Trust Bar */}
      <div className="bg-emerald-800 text-emerald-100 py-3.5 border-y border-emerald-700/50 text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-4 font-medium">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Pure Himalayan Sourced</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>FSSAI Certified Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-300" />
            <span>Direct Farmer Support</span>
          </div>
        </div>
      </div>

      {/* 3. Dynamic "Why Choose Us" Features Grid */}
      <Features />

      {/* 4. Category Quick Nav Banner */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Explore Categories
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                Shop By Mountain Harvest
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800 hover:text-emerald-900 transition"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Organic Honey", icon: Flame, href: "/products?category=honey" },
              { name: "Pure Ghee", icon: Cookie, href: "/products?category=ghee" },
              { name: "Himalayan Pulses", icon: Wheat, href: "/products?category=pulses" },
              { name: "Hill Spices", icon: FlameKindling, href: "/products?category=spices" },
              { name: "Organic Grains", icon: Trees, href: "/products?category=grains" },
            ].map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={idx}
                  href={cat.href}
                  className="group flex flex-col items-center p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-emerald-50/60 hover:border-emerald-200 transition text-center space-y-3"
                >
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6 text-emerald-800 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-emerald-900">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Featured Products Section */}
      <section className="py-16">
        <Products />
      </section>

      {/* 6. Brand Story / About Us Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <About />
      </section>

      {/* 🌟 7. Himalayan Journal / Blog Section */}
      <BlogSection />

      {/* 8. Social Proof & Customer Reviews */}
      <section className="py-16 bg-slate-50">
        <Testimonials />
      </section>

      {/* Floating Instant Order WhatsApp CTA */}
      <WhatsAppButton />
    </main>
  );
}