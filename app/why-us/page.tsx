export default function WhyUsPage() {
  return (
    <main className="min-h-screen bg-green-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-green-900 mb-6">
          Why Choose Himalayan Roots?
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          We bring authentic Himalayan products directly from the farmers
          of Uttarakhand to your home.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-3">
              100% Natural
            </h2>
            <p className="text-gray-600">
              No artificial additives or preservatives.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-3">
              Direct from Farmers
            </h2>
            <p className="text-gray-600">
              Supporting local Uttarakhand farmers.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-3">
              Authentic Himalayan Taste
            </h2>
            <p className="text-gray-600">
              Traditional products with original flavor and quality.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}