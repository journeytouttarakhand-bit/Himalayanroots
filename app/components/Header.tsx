import Link from "next/link";
import Image from "next/image";

import getSiteSettings from "@/lib/getSiteSettings";

export default async function Header() {

  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-white shadow">

      {/* ================================= */}
      {/* Announcement Bar */}
      {/* ================================= */}

      {settings.announcementEnabled && (

        <div
          className="py-2 text-sm"
          style={{
            backgroundColor:
              settings.announcementBackground || "#166534",

            color:
              settings.announcementTextColor || "#ffffff",
          }}
        >

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 md:flex-row">

            <span className="font-medium">

              {settings.announcementText ||

                "🚚 Free Shipping on Orders Above ₹999"}

            </span>

            {settings.announcementButtonText &&
              settings.announcementLink && (

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

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="flex items-center gap-4"
        >

          {settings.logo ? (

            <Image
              src={settings.logo}
              alt={settings.siteName}
              width={60}
              height={60}
              className="rounded-full object-cover"
              priority
            />

          ) : (

            <Image
              src="/logo.png"
              alt="Himalayan Roots"
              width={60}
              height={60}
              className="rounded-full object-cover"
              priority
            />

          )}

          <div>

            <h1 className="text-2xl font-bold text-green-800">
              {settings.siteName}
            </h1>

            <p className="text-sm text-gray-500">
              {settings.tagline}
            </p>

          </div>

        </Link>
                <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="font-medium transition hover:text-green-700"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="font-medium transition hover:text-green-700"
          >
            Products
          </Link>

          <Link
            href="/about"
            className="font-medium transition hover:text-green-700"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="font-medium transition hover:text-green-700"
          >
            Contact
          </Link>

        </nav>

        <div className="hidden text-right lg:block">

          <p className="text-sm text-gray-500">
            Contact Us
          </p>

          <p className="font-semibold text-green-700">
            {settings.phone || "+91 XXXXX XXXXX"}
          </p>

        </div>

      </div>

      {/* ================================= */}
      {/* Mobile Navigation */}
      {/* ================================= */}

      <div className="border-t bg-white md:hidden">

        <nav className="flex items-center justify-around py-3 text-sm font-medium">

          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="transition hover:text-green-700"
          >
            Products
          </Link>

          <Link
            href="/about"
            className="transition hover:text-green-700"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-green-700"
          >
            Contact
          </Link>

        </nav>

      </div>
          </header>
  );
}