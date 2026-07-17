"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import Toast from "./Toast";

import { products } from "@/data/products";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function Products() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function handleAddToCart(product: (typeof products)[0]) {
    addToCart({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setToastMessage(`${product.name} added to cart`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  function handleWishlist(product: (typeof products)[0]) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);

      setToastMessage(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
      });

      setToastMessage(`${product.name} added to wishlist`);
    }

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  return (
    <section className="py-20 bg-green-50">

      <Toast
        message={toastMessage}
        show={showToast}
      />

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center text-green-900 mb-4">
          Our Products
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Authentic Himalayan products sourced directly from Uttarakhand
          farmers.
        </p>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center text-red-600 text-xl mt-10">
            No products found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
              >

                {/* Wishlist Button */}

                <button
                  onClick={() => handleWishlist(product)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-20"
                >

                  <Heart
                    size={24}
                    className={
                      isInWishlist(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-500"
                    }
                  />

                </button>

                <Link href={`/products/${product.slug}`}>

                  <div className="relative h-72">

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

                  <div className="flex justify-between mt-3">

                    <span className="text-yellow-500">
                      ⭐ {product.rating}
                    </span>

                    <span className="text-green-700">
                      {product.stock}
                    </span>

                  </div>

                  <div className="mt-6 flex gap-3">

                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 text-center bg-gray-200 hover:bg-gray-300 py-3 rounded-xl font-semibold"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold"
                    >
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>

    </section>
  );
}