const products = [
  {
    name: "Bilona Ghee",
    price: "₹1000",
    image: "/images/bilona-ghee.jpg",
  },
  {
    name: "Raw Pahadi Honey",
    price: "₹912",
    image: "/images/honey.jpg",
  },
  {
    name: "Bal Mithai",
    price: "₹524",
    image: "/images/bal-mithai.jpg",
  },
  {
    name: "Kaafal",
    price: "₹299",
    image: "/images/kaafal.jpg",
  },
  {
    name: "Linguda",
    price: "₹299",
    image: "/images/linguda.jpg",
  },
  {
    name: "Gahat Dal",
    price: "₹274",
    image: "/images/gahat-dal.jpg",
  },
];

export default function Products() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-green-900 mb-12">
          OUR PRODUCTS
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

          {products.map((product, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">

                <h3 className="font-bold text-lg">
                  {product.name}
                </h3>

                <p className="text-green-700 text-xl font-bold mt-2">
                  {product.price}
                </p>

                <button className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800">
                  Order on WhatsApp
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}