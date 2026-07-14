import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl font-bold">Himalayan Roots</h2>

          <p className="mt-5 text-gray-300">
            Bringing authentic Himalayan products directly from Uttarakhand
            farmers to every home in India.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>

          <div className="flex flex-col gap-2">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Categories</h3>

          <p>Bilona Ghee</p>
          <p>Raw Honey</p>
          <p>Pahadi Dal</p>
          <p>Organic Spices</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>

          <p>📞 +91 7895943324</p>
          <p>📧 info@himalayanroots.in</p>
          <p>📍 Uttarakhand, India</p>
        </div>

      </div>

      <div className="border-t border-green-800 text-center py-5">
        © 2026 Himalayan Roots. All Rights Reserved.
      </div>
    </footer>
  );
}