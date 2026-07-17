import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

export const metadata: Metadata = {
  title: "Himalayan Roots",
  description: "Pure Taste of Uttarakhand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WishlistProvider>
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}