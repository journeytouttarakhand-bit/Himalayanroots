"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative h-[90vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/images/hero/hero-bg.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >

          <span className="bg-green-700 text-white px-4 py-2 rounded-full">
            🌿 Pure • Natural • Organic
          </span>

          <h1 className="text-6xl font-bold text-white mt-8 leading-tight">
            Taste the
            <span className="text-green-400"> Real Himalayas </span>
            at Your Home
          </h1>

          <p className="text-white text-xl mt-6 leading-8">
            Authentic products directly sourced from the farmers
            of Uttarakhand. No Chemicals. No Preservatives.
            Only Pure Himalayan Goodness.
          </p>

          <div className="flex gap-5 mt-10 flex-wrap">

            <Link
              href="/products"
              className="bg-green-700 hover:bg-green-800 px-8 py-4 rounded-full text-white font-bold transition"
            >
              Shop Now
            </Link>

            <a
              href="https://wa.me/917895943324"
              target="_blank"
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-bold transition"
            >
              Order on WhatsApp
            </a>

          </div>

          <div className="grid grid-cols-3 gap-8 mt-14 text-white">

            <div>
              <h2 className="text-4xl font-bold">500+</h2>
              <p>Happy Customers</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">100%</h2>
              <p>Natural Products</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">50+</h2>
              <p>Local Farmers</p>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}