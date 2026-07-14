export default function Testimonials() {
  const reviews = [
    {
      name: "Amit Sharma",
      review:
        "Excellent quality! Bilona Ghee bilkul ghar jaisa tha. Definitely ordering again.",
    },
    {
      name: "Neha Verma",
      review:
        "Raw Honey bahut pure tha. Packing bhi bahut achhi thi.",
    },
    {
      name: "Rahul Joshi",
      review:
        "Authentic Uttarakhand products. Highly recommended.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-green-900 mb-12">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-green-50 p-6 rounded-xl shadow-md"
            >
              <div className="text-yellow-500 text-2xl">★★★★★</div>

              <p className="mt-4 text-gray-700">
                "{review.review}"
              </p>

              <h3 className="mt-6 font-bold text-green-900">
                {review.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}