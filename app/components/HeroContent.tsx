"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  heroImage?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  whatsappLink?: string;
};

export default function HeroContent({
  heroImage,
  heroTitle,
  heroSubtitle,
  heroButtonText,
  heroButtonLink,
  whatsappLink,
}: Props) {
  // Dynamic Fallbacks from CMS
  const displayTitle = heroTitle || "Authentic Himalayan Products";
  const displaySubtitle =
    heroSubtitle || "Directly sourced from the farmers of Uttarakhand.";
  const displayBtnText = heroButtonText || "Shop Now";
  const displayBtnLink = heroButtonLink || "/products";
  const displayImage = heroImage || "/hero-bg.jpg";

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 lg:py-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side Content */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Organic Badge */}
            <div className="inline-flex items-center gap-3 rounded-full bg-emerald-50 border border-emerald-200 px-5 py-2 w-fit shadow-sm transition-transform hover:scale-105">
              <span className="text-xl">🌿</span>
              <span className="font-semibold text-emerald-800 text-sm">
                100% Pure & Organic
              </span>
            </div>

            {/* Dynamic Heading & Subtitle */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-950 leading-tight tracking-tight">
                {displayTitle}
              </h1>

              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                {displaySubtitle}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={displayBtnLink}
                className="px-8 py-4 font-bold text-lg rounded-xl bg-emerald-800 text-white shadow-lg hover:bg-emerald-900 transition-all duration-300 active:scale-95"
              >
                <span className="flex items-center gap-2">
                  {displayBtnText} ✨
                </span>
              </Link>

              <Link
                href="/about"
                className="px-8 py-4 font-bold text-lg rounded-xl bg-amber-100 text-amber-900 shadow hover:bg-amber-200 transition-all duration-300 active:scale-95"
              >
                Learn More
              </Link>

              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-800 hover:underline px-4 py-2 flex items-center gap-2"
                >
                  💬 WhatsApp Order
                </a>
              )}
            </div>

            {/* Key Statistics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-emerald-900">500+</p>
                <p className="text-gray-500 text-sm font-medium">Happy Customers</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-emerald-900">100%</p>
                <p className="text-gray-500 text-sm font-medium">Natural Products</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-emerald-900">50+</p>
                <p className="text-gray-500 text-sm font-medium">Local Farmers</p>
              </div>
            </div>
          </div>

          {/* Right Side Image Container */}
          <div className="relative h-full animate-in fade-in duration-1000">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50">
              <Image
                src={displayImage}
                alt={displayTitle}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}