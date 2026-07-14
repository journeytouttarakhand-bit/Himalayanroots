import Header from "../components/Header";

export default function ProductsPage() {
  const products = [
    { name: "Bilona Ghee", price: "₹1000" },
    { name: "Raw Pahadi Honey", price: "₹912" },
    { name: "Bal Mithai", price: "₹524" },
    { name: "Gahat Dal", price: "₹274" },
    { name: "Kaafal", price: "₹299" },
    { name: "Linguda", price: "₹299" },
  ];

  return (
    <>
      <Header />

      <section className="max-w-7xl mx-auto py-20 px-6">
        <h1 className="text-5xl font-bold text-green-900 text-center mb-12">
          Our Products
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-56 bg-gray-200 flex items-center justify-center">
                Product Image
              </div>

              <div className="p-5">
                <h2 className="text-2xl font-bold">{product.name}</h2>

                <p className="text-green-700 font-bold text-xl mt-2">
                  {product.price}
                </p>

                <a
                  href="https://wa.me/917895943324"
                  target="_blank"
                  className="mt-5 inline-block bg-green-700 text-white px-5 py-3 rounded-lg"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}