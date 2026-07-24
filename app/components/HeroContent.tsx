"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  heroImage: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonLink: string;
  whatsappLink: string;
};

export default function HeroContent({
  heroImage,
  heroTitle,
  heroSubtitle,
  heroButtonText,
  heroButtonLink,
  whatsappLink,
}: Props) {
  return (
    <section
      className="relative flex h-[90vh] items-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay */}

      <div className="absolute inset-0 bg-black/55"></div>

      {/* Content */}

      <div className="relative mx-auto w-full max-w-7xl px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="max-w-2xl"
        >
          <span className="rounded-full bg-green-700 px-4 py-2 text-white">
            🌿 Pure • Natural • Organic
          </span>

          <h1 className="mt-8 text-6xl font-bold leading-tight text-white">
            {heroTitle}
          </h1>

          <p className="mt-6 text-xl leading-8 text-white">
            {heroSubtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <Link
              href={heroButtonLink}
              className="rounded-full bg-green-700 px-8 py-4 font-bold text-white transition hover:bg-green-800"
            >
              {heroButtonText}
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-8 py-4 font-bold text-white transition hover:bg-white hover:text-black"
            >
              Order on WhatsApp
            </a>

          </div>

          <div className="mt-14 grid grid-cols-3 gap-8 text-white">

            <div>
              <h2 className="text-4xl font-bold">
                500+
              </h2>

              <p>
                Happy Customers
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                100%
              </h2>

              <p>
                Natural Products
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold">
                50+
              </h2>

              <p>
                Local Farmers
              </p>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}