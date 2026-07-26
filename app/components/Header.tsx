import Link from "next/link";
import Image from "next/image";

import getSiteSettings from "@/lib/getSiteSettings";
import HeaderIcons from "./HeaderIcons";

export default async function Header() {
  const settings = (await getSiteSettings()) || {};

  const logoSrc = settings.logo || "/logo.png";
  const siteName = settings.siteName || "Himalayan Roots";
  const tagline = settings.tagline || "Pure & Organic Himalayan Products";
  const phoneNumber = settings.phone || settings.contactPhone || "+91 XXXXX XXXXX";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* ================================= */}
      {/* Announcement Bar */}
      {/* ================================= */}
      {settings.announcementEnabled && (
        <div
          className="py-2 text-sm"
          style={{
            backgroundColor: settings.announcementBackground || "var(--primary-color, #166534)",
            color: settings.announcementTextColor || "#ffffff",
          }}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 md:flex-row">
            <span className="font-medium">
              {settings.announcementText || "🚚 Free Shipping on Orders Above ₹999"}
            </span>

            {settings.announcementButtonText && settings.announcementLink && (
              <Link
                href={settings.announcementLink}
                className="rounded-full border border-white/40 px-4 py-1 text-xs font-semibold transition hover:bg-white hover:text-black"
              >
                {settings.announcementButtonText}
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ================================= */}
      {/* Main Header */}
      {/* ================================= */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo & Branding (Bada & Clear Logo Setup) */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative h-14 sm:h-16 w-auto flex items-center">
            <Image
              src={logoSrc}
              alt={siteName}
              width={160}
              height={70}
              className="h-full w-auto object-contain transition-transform group-hover:scale-105"
              priority
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">
              {siteName}
            </h1>
            {tagline && (
              <p className="text-xs font-medium text-gray-500">
                {tagline}
              </p>
            )}
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex text-gray-700">
          <Link href="/" className="font-semibold transition hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="font-semibold transition hover:text-primary">
            Products
          </Link>
          <Link href="/about" className="font-semibold transition hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="font-semibold transition hover:text-primary">
            Contact
          </Link>
        </nav>

        {/* Right Side Info & Single Action Icons Component */}
        <div className="flex items-center gap-6">
          <div className="hidden text-right lg:block">
            <p className="text-xs text-gray-500 font-medium">Contact Us</p>
            <p className="font-bold text-primary text-sm">
              {phoneNumber}
            </p>
          </div>

          {/* Sirf HeaderIcons rakha hai taaki duplicate icons ki dikkat na ho */}
          <HeaderIcons />
        </div>
      </div>

      {/* ================================= */}
      {/* Mobile Navigation */}
      {/* ================================= */}
      <div className="border-t bg-white md:hidden">
        <nav className="flex items-center justify-around py-2.5 text-sm font-semibold">
          <Link href="/" className="transition hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="transition hover:text-primary">
            Products
          </Link>
          <Link href="/about" className="transition hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="transition hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}