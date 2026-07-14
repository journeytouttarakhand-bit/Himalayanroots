export default function Hero() {
  return (
    <section
      className="h-[650px] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <h1 className="text-6xl font-extrabold text-white leading-tight">
          PURE ROOTS.
          <br />
          <span className="text-green-300">
            PURE GOODNESS.
          </span>
        </h1>

        <p className="text-white text-xl mt-6 max-w-xl">
          Farm Fresh. Handpicked. Himalayan.
          <br />
          Straight from our hills to your home.
        </p>

        <button className="mt-8 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full text-lg font-semibold">
          Shop Now
        </button>
      </div>
    </section>
  );
}