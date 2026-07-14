export default function WhyUs() {
  const items = [
    {
      title: "Farmer Direct",
      desc: "Products sourced directly from trusted farmers of Uttarakhand."
    },
    {
      title: "100% Natural",
      desc: "No chemicals, no preservatives, only pure Himalayan goodness."
    },
    {
      title: "Premium Quality",
      desc: "Every product is carefully selected and quality checked."
    },
    {
      title: "Fast Delivery",
      desc: "Fresh Himalayan products delivered across India."
    }
  ];

  return (
    <section className="py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-green-900 mb-12">
          Why Choose Himalayan Roots?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">🌿</div>

              <h3 className="text-xl font-bold text-green-900">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-4">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}