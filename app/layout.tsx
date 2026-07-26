import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import getSiteSettings from "@/lib/getSiteSettings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getSiteSettings()) || {};

  const title =
    settings.metaTitle || settings.siteName || "Himalayan Roots";
  const description =
    settings.metaDescription ||
    settings.siteDescription ||
    "Pure & Organic Products from the Himalayas";
  
  // Handling keywords safely (works with either keywords or metaKeywords field)
  const keywordsSource = settings.keywords || settings.metaKeywords || "";
  const keywords = keywordsSource
    ? keywordsSource.split(",").map((item: string) => item.trim())
    : ["organic", "himalayan products", "ghee", "honey"];

  return {
    title,
    description,
    keywords,
    icons: {
      icon: settings.favicon || "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = (await getSiteSettings()) || {};

  const primaryColor = settings.primaryColor || "#166534";
  const secondaryColor = settings.secondaryColor || "#65A30D";
  const fontFamily = settings.fontFamily || "sans-serif";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Dynamic CSS Variables for CMS Colors */}
        <style>{`
          :root {
            --primary-color: ${primaryColor};
            --secondary-color: ${secondaryColor};
          }
        `}</style>
      </head>
      <body style={{ fontFamily }}>
        <CartProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}