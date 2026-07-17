import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import RelatedProducts from "@/app/components/RelatedProducts";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const productReviews = reviews.filter(
    (review) => review.productSlug === slug
  );

  const averageRating =
    productReviews.length > 0
      ? (
          productReviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / productReviews.length
        ).toFixed(1)
      : "0";

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      {/* Breadcrumb */}

      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-8">

        <Link
          href="/"
          className="hover:text-green-700 font-medium"
        >
          🏠 Home
        </Link>

        <span>›</span>

        <Link
          href="/products"
          className="hover:text-green-700 font-medium"
        >
          Products
        </Link>

        <span>›</span>

        <span className="font-semibold text-green-700">
          {product.name}
        </span>

      </div>

      {/* Navigation Buttons */}

      <div className="flex gap-4 mb-10">

        <Link
          href="/"
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-semibold transition"
        >
          🏠 Home
        </Link>

        <Link
          href="/products"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          📦 All Products
        </Link>

      </div>

      {/* Product Section */}

      <div className="grid md:grid-cols-2 gap-12">

        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">

          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />

        </div>

        <div>

          <h1 className="text-5xl font-bold text-green-900">
            {product.name}
          </h1>

          <p className="text-gray-500 mt-3">
            {product.category}
          </p>

          <div className="flex items-center gap-6 mt-5">

            <span className="text-yellow-500 text-xl">
              ⭐ {product.rating}
            </span>

            <span className="text-green-700 font-semibold">
              {product.stock}
            </span>

          </div>

          <p className="text-4xl font-bold text-green-700 mt-8">
            ₹{product.price}
          </p>

          <p className="text-gray-700 leading-8 mt-8">
            {product.description}
          </p>

          <a
            href="https://wa.me/917895943324"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-10 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold transition"
          >
            Order on WhatsApp
          </a>

        </div>

      </div>

      {/* Reviews */}

      <section className="mt-24">

        <h2 className="text-4xl font-bold text-green-900 mb-4">
          Customer Reviews
        </h2>

        <div className="flex items-center gap-3 mb-10">

          <span className="text-2xl text-yellow-500">
            ⭐ {averageRating}
          </span>

          <span className="text-gray-600">
            ({productReviews.length} Reviews)
          </span>

        </div>

        {productReviews.length === 0 ? (

          <div className="bg-gray-100 rounded-xl p-8 text-center">

            <p className="text-gray-600">
              No reviews available.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {productReviews.map((review) => (

              <div
                key={review.id}
                className="bg-white rounded-2xl shadow-md border p-6"
              >

                <div className="flex justify-between items-center">

                  <h3 className="font-bold text-xl">
                    {review.name}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {review.date}
                  </span>

                </div>

                <div className="mt-2 text-yellow-500 text-lg">
                  {"⭐".repeat(review.rating)}
                </div>

                <p className="mt-4 text-gray-700 leading-7">
                  {review.comment}
                </p>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* Related Products */}

      <RelatedProducts currentSlug={slug} />

    </div>
  );
}