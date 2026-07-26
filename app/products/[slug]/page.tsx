import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ReviewForm from "@/app/components/ReviewForm";
import ReviewList from "@/app/components/ReviewList";
import RelatedProducts from "@/app/components/RelatedProducts";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type Product = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  inStock: boolean;
  image: string;
  rating: number;
  featured: boolean;
  active: boolean;
};

async function getProduct(
  slug: string
): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/all-products/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data.success) {
      return null;
    }

    return data.product;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

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

      <div className="flex gap-4 mb-10">

        <Link
          href="/"
          className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-semibold"
        >
          🏠 Home
        </Link>

        <Link
          href="/products"
          className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl font-semibold"
        >
          📦 All Products
        </Link>

      </div>

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

            {product.inStock ? (

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                ✅ {product.stock} In Stock
              </span>

            ) : (

              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">
                ❌ Out of Stock
              </span>

            )}

          </div>

          <p className="text-4xl font-bold text-green-700 mt-8">
            ₹{product.price}
          </p>

          <p className="text-gray-700 leading-8 mt-8">
            {product.description}
          </p>

          {product.inStock ? (

            <a
              href="https://wa.me/917895943324"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-semibold transition"
            >
              Order on WhatsApp
            </a>

          ) : (

            <button
              disabled
              className="inline-block mt-10 bg-gray-400 cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold"
            >
              Out of Stock
            </button>

          )}

        </div>

      </div>

{/* Reviews */}

<div className="mt-24">

  <ReviewForm
    productId={product._id}
  />

  <ReviewList
    productId={product._id}
  />

</div>
      {/* Related Products */}

      <RelatedProducts
        currentSlug={product.slug}
      />

    </div>
  );
}