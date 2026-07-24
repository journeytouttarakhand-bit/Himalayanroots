import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";


import getSiteSettings from "@/lib/getSiteSettings";

export async function generateMetadata(): Promise<Metadata> {

  const settings = await getSiteSettings();

  return {
    title: settings.metaTitle || settings.siteName,

    description: settings.metaDescription,

    keywords: settings.metaKeywords
      ?.split(",")
      .map((item: string) => item.trim()),

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

  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
  style={{
    fontFamily: settings.fontFamily,
  }}
>
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