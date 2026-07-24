import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import getSiteSettings from "@/lib/getSiteSettings";

export default async function Footer() {
  const settings = await getSiteSettings();

  return (
    <footer className="mt-20 bg-green-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="mb-4 text-3xl font-bold">
            {settings.siteName}
          </h2>

          <p className="leading-7 text-green-100">
            {settings.footerDescription}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-xl font-semibold">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-green-300">
                Home
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-green-300">
                Products
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-green-300">
                About
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-green-300">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-xl font-semibold">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex items-start gap-3">
              <Phone size={18} className="mt-1" />
              <span>
                {settings.phone || "Not Available"}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-1" />
              <span>
                {settings.email || "Not Available"}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-1" />
              <span>
                {settings.address || "Not Available"}
              </span>
            </div>

          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-5 text-xl font-semibold">
            Follow Us
          </h3>

          <div className="flex gap-4">

            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-3 transition hover:bg-white/20"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0022 12z"/>
                </svg>
              </a>
            )}

            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-3 transition hover:bg-white/20"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zm8.75 1.5a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"/>
                </svg>
              </a>
            )}

            {settings.youtube && (
              <a
                href={settings.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 p-3 transition hover:bg-white/20"
                aria-label="YouTube"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM10 15.5v-7l6 3.5-6 3.5z"/>
                </svg>
              </a>
            )}

          </div>
        </div>

      </div>

      <div className="border-t border-green-800 py-5 text-center text-sm text-green-200">
        {settings.copyrightText}
      </div>
    </footer>
  );
}