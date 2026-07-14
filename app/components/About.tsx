export default function About() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <img
            src="/images/about.jpg"
            alt="About Himalayan Roots"
            className="rounded-xl shadow-lg"
          />
        </div>

        <div>

          <h2 className="text-4xl font-bold text-green-900">
            About Himalayan Roots
          </h2>

          <p className="mt-6 text-gray-700 leading-8">
            Himalayan Roots is dedicated to bringing the authentic taste of
            Uttarakhand directly from local farmers to your home.
          </p>

          <p className="mt-4 text-gray-700 leading-8">
            We believe in purity, sustainability and supporting local
            communities by delivering natural products without chemicals or
            preservatives.
          </p>

          <button className="mt-8 bg-green-700 text-white px-8 py-3 rounded-lg">
            Read More
          </button>

        </div>

      </div>
    </section>
  );
}