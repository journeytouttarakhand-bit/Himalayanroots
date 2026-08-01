import Link from "next/link";
import Image from "next/image";
import getSiteSettings from "@/lib/getSiteSettings";

export default async function Footer() {
  const settings = (await getSiteSettings()) || {};

  const logoSrc = settings.logo || "/logo.png";
  const siteName = settings.siteName || "Himalayan Roots";
  const footerAbout =
    settings.footerAboutText ||
    "Bringing authentic Himalayan products directly from Uttarakhand farmers to every home in India.";
  const copyrightText =
    settings.copyrightText ||
    `© ${new Date().getFullYear()} ${siteName}. All Rights Reserved.`;

  // Fallbacks using CMS Settings
  const footerBg = settings.footerBackground || "var(--primary-color, #0f0e47)";
  const footerText = settings.footerTextColor || "#ffffff";

  return (
    <footer
      className="pt-16 pb-8 border-t border-white/10"
      style={{
        backgroundColor: footerBg,
        color: footerText,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {logoSrc && (
              <Image
                src={logoSrc}
                alt={siteName}
                width={50}
                height={50}
                className="rounded-lg bg-white p-1 object-cover"
              />
            )}
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: footerText }}>
              {siteName}
            </h2>
          </div>
          <p className="text-sm opacity-80 leading-relaxed">
            {footerAbout}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-secondary">Quick Links</h3>
          <ul className="space-y-2.5 text-sm opacity-80">
            <li>
              <Link href="/" className="hover:opacity-100 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:opacity-100 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:opacity-100 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:opacity-100 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Details */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-secondary">Contact Us</h3>
          <ul className="space-y-2.5 text-sm opacity-80">
            {settings.contactPhone ? (
              <li>📞 Phone: {settings.contactPhone}</li>
            ) : (
              <li>📞 Phone: Not Available</li>
            )}
            {settings.contactEmail ? (
              <li>✉️ Email: {settings.contactEmail}</li>
            ) : (
              <li>✉️ Email: Not Available</li>
            )}
            {settings.address ? (
              <li>📍 Location: {settings.address}</li>
            ) : (
              <li>📍 Location: Not Available</li>
            )}
          </ul>
        </div>

        {/* Column 4: Social Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-secondary">Follow Us</h3>
          <div className="flex flex-col space-y-2 text-sm opacity-80">
            {settings.facebookUrl && (
              <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="hover:opacity-100 transition">
                Facebook
              </a>
            )}
            {settings.instagramUrl && (
              <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="hover:opacity-100 transition">
                Instagram
              </a>
            )}
            {settings.youtubeUrl && (
              <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="hover:opacity-100 transition">
                YouTube
              </a>
            )}
            {settings.whatsappNumber && (
              <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer" className="hover:opacity-100 transition">
                WhatsApp
              </a>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Copyright Bar */}
      <div className="mx-auto max-w-7xl px-6 mt-12 pt-6 border-t border-white/10 text-center text-xs opacity-70">
        {copyrightText}
      </div>
    </footer>
  );
}