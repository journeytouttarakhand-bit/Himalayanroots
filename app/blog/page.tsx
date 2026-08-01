<<<<<<< HEAD
import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full text-sm">
            🌿 Himalayan Roots Blog
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 leading-tight">
            Stories & Insights
            <br />
            Himalayan Roots Journal
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Discover authentic stories from the hills of Uttarakhand, health
            benefits of organic mountain harvests, traditional recipes, and
            sustainable farming practices.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 p-8 md:p-12 text-white shadow-xl border border-green-800">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="inline-block rounded-md bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-black">
              🚧 Work In Progress
            </span>

            <h2 className="text-3xl md:text-4xl font-bold">
              Exciting Mountain Articles Are On Their Way!
            </h2>

            <p className="text-green-100 leading-relaxed">
              We are curating deep-dive guides on Pure Pahadi Ghee, Himalayan
              Shilajit, Organic Pulses like Gahat & Bhat, traditional Ayurvedic
              wellness, mountain farming practices and much more.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-green-900 shadow transition hover:bg-green-100"
            >
              Explore Organic Products →
            </Link>
          </div>

          <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>
        </div>

        {/* Future Topics */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-green-900 text-center">
            Topics We Will Cover
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🌾</div>

              <h4 className="mb-3 text-xl font-bold text-green-900">
                Organic Farming
              </h4>

              <p className="text-gray-600">
                Learn how local Uttarakhand farmers cultivate chemical-free
                crops using traditional Himalayan farming methods.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🍯</div>

              <h4 className="mb-3 text-xl font-bold text-green-900">
                Health & Wellness
              </h4>

              <p className="text-gray-600">
                Discover the natural benefits of Himalayan Shilajit, Raw Honey,
                Herbs and other authentic mountain superfoods.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🍲</div>

              <h4 className="mb-3 text-xl font-bold text-green-900">
                Traditional Recipes
              </h4>

              <p className="text-gray-600">
                Explore authentic Pahadi recipes prepared using organic grains,
                spices and ingredients from the Himalayas.
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="rounded-3xl border border-dashed border-green-300 bg-green-50 p-10 text-center">
          <h3 className="text-3xl font-bold text-green-900">
            🚀 Blog Launching Soon
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-600">
            We are preparing valuable articles, health tips, recipes, farmer
            stories, and detailed product knowledge to help you experience the
            true essence of Uttarakhand.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="rounded-xl bg-green-900 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
=======
import Link from "next/link";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <span className="inline-block bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full text-sm">
            🌿 Himalayan Roots Blog
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-green-900 leading-tight">
            Stories & Insights
            <br />
            Himalayan Roots Journal
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Discover authentic stories from the hills of Uttarakhand, health
            benefits of organic mountain harvests, traditional recipes, and
            sustainable farming practices.
          </p>
        </div>

        {/* Featured Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 p-8 md:p-12 text-white shadow-xl border border-green-800">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="inline-block rounded-md bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-black">
              🚧 Work In Progress
            </span>

            <h2 className="text-3xl md:text-4xl font-bold">
              Exciting Mountain Articles Are On Their Way!
            </h2>

            <p className="text-green-100 leading-relaxed">
              We are curating deep-dive guides on Pure Pahadi Ghee, Himalayan
              Shilajit, Organic Pulses like Gahat & Bhat, traditional Ayurvedic
              wellness, mountain farming practices and much more.
            </p>

            <Link
              href="/products"
              className="inline-flex items-center rounded-xl bg-white px-6 py-3 font-bold text-green-900 shadow transition hover:bg-green-100"
            >
              Explore Organic Products →
            </Link>
          </div>

          <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"></div>
        </div>

        {/* Future Topics */}
        <div className="space-y-8">
          <h3 className="text-3xl font-bold text-green-900 text-center">
            Topics We Will Cover
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🌾</div>

              <h4 className="mb-3 text-xl font-bold text-green-900">
                Organic Farming
              </h4>

              <p className="text-gray-600">
                Learn how local Uttarakhand farmers cultivate chemical-free
                crops using traditional Himalayan farming methods.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🍯</div>

              <h4 className="mb-3 text-xl font-bold text-green-900">
                Health & Wellness
              </h4>

              <p className="text-gray-600">
                Discover the natural benefits of Himalayan Shilajit, Raw Honey,
                Herbs and other authentic mountain superfoods.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-lg">
              <div className="mb-4 text-4xl">🍲</div>

              <h4 className="mb-3 text-xl font-bold text-green-900">
                Traditional Recipes
              </h4>

              <p className="text-gray-600">
                Explore authentic Pahadi recipes prepared using organic grains,
                spices and ingredients from the Himalayas.
              </p>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="rounded-3xl border border-dashed border-green-300 bg-green-50 p-10 text-center">
          <h3 className="text-3xl font-bold text-green-900">
            🚀 Blog Launching Soon
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-gray-600">
            We are preparing valuable articles, health tips, recipes, farmer
            stories, and detailed product knowledge to help you experience the
            true essence of Uttarakhand.
          </p>

          <div className="mt-8">
            <Link
              href="/"
              className="rounded-xl bg-green-900 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
>>>>>>> dynamic-products
