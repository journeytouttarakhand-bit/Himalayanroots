"use client";

import Image from "next/image";
import Link from "next/link";

import { products } from "@/data/products";
import { useCart } from "@/app/context/CartContext";

type Props = {
  currentSlug: string;
};

export default function RelatedProducts({
  currentSlug,
}: Props) {
  const { addToCart } = useCart();

  const relatedProducts = products
    .filter((product) => product.slug !== currentSlug)
    .slice(0, 3);

  return (
    <section className="mt-24">
      <h2 className="text-4xl font-bold text-green-900 mb-10">
        Related Products
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <Link href={`/products/${product.slug}`}>
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-900">
                {product.name}
              </h3>

              <p className="text-gray-500 mt-2">
                {product.category}
              </p>

              <p className="text-2xl font-bold text-green-700 mt-3">
                ₹{product.price}
              </p>

              <div className="flex gap-3 mt-6">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex-1 text-center bg-gray-200 hover:bg-gray-300 py-3 rounded-xl font-semibold transition"
                >
                  View Details
                </Link>

                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      slug: product.slug,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}