import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-4 py-1.5 bg-green-100 text-green-800 text-xs font-bold rounded-full tracking-wide uppercase">
            Stories & Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 tracking-tight">
            Himalayan Roots Journal
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Discover authentic stories from the hills of Uttarakhand, health benefits of organic mountain harvests, traditional recipes, and sustainable farming practices.
          </p>
        </div>

        {/* Featured Banner / Coming Soon Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-green-800">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block bg-amber-400 text-black text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
              🚧 Work In Progress
            </span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Exciting Mountain Articles Are On Their Way!
            </h2>
            <p className="text-green-100 text-sm md:text-base leading-relaxed">
              We are curating deep-dive guides on pure Pahadi Ghee, Himalayan Shilajit, organic pulses like Gahat & Bhat, and traditional Ayurvedic wellness routines.
            </p>
            <div className="pt-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center bg-white text-green-900 font-bold px-6 py-3 rounded-xl shadow hover:bg-green-50 transition active:scale-95 text-sm"
              >
                Explore Organic Products →
              </Link>
            </div>
          </div>

          {/* Decorative Background Glow */}
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Future Categories Skeleton / Teasers */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900">
            Topics We Will Cover
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="text-3xl">🌾</div>
              <h4 className="font-bold text-lg text-green-900">Organic Farming</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                How local Uttarakhand farmers cultivate chemical-free crops using traditional techniques.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="text-3xl">🍯</div>
              <h4 className="font-bold text-lg text-green-900">Health & Wellness</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Unlocking the natural healing properties of Himalayan Shilajit, pure honey, and herbs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <div className="text-3xl">🍲</div>
              <h4 className="font-bold text-lg text-green-900">Pahadi Recipes</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Traditional recipes passed down through generations using authentic local spices and grains.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}