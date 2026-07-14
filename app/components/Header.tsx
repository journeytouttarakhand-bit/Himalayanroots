import Link from "next/link";
export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-900 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto flex justify-center gap-8">
          <span>🚚 Free Shipping on Orders Above ₹999</span>
          <span>🌿 100% Natural</span>
          <span>🏔️ Pure Taste of Uttarakhand</span>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Himalayan Roots"
              className="h-32 w-auto"
            />

                   </div>

          {/* Menu */}
          <nav className="hidden md:flex gap-8 font-semibold text-gray-700">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/products">Products</Link>
            <Link href="/why-us">Why Us</Link>
            <Link href="/farmers">Farmer Stories</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          {/* WhatsApp */}
          <a
            href="https://wa.me/917895943324"
            target="_blank"
            className="bg-green-700 text-white px-5 py-3 rounded-full font-semibold hover:bg-green-800"
          >
            WhatsApp
          </a>

        </div>
      </header>
    </>
  );
}