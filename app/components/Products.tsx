"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import Toast from "./Toast";

import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

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

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(urlSearch);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // URL Query parameter change hone par search state update sync
  useEffect(() => {
    if (urlSearch) {
      setSearch(urlSearch);
    }
  }, [urlSearch]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/all-products", {
          cache: "no-store",
        });

        const data = await res.json();

        if (data.success) {
          setProducts(
            data.products.filter((item: Product) => item.active)
          );
        }
      } catch (error) {
        console.error("Products Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(products.map((item) => item.category)),
    ];
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  function handleAddToCart(product: Product) {
    addToCart({
      id: product._id,
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

  function handleWishlist(product: Product) {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      setToastMessage(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product._id,
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
      <Toast message={toastMessage} show={showToast} />

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center text-green-900 mb-4">
          Our Products
        </h2>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Authentic Himalayan products sourced directly from Uttarakhand
          farmers.
        </p>

        <SearchBar search={search} setSearch={setSearch} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">Loading Products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-red-600 text-xl mt-10">
            No products found.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
              >
                {/* Wishlist */}
                <button
                  onClick={() => handleWishlist(product)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg z-20 cursor-pointer"
                >
                  <Heart
                    size={24}
                    className={
                      isInWishlist(product._id)
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
                      className={`object-cover transition ${
                        !product.inStock ? "opacity-50 grayscale" : ""
                      }`}
                    />

                    {product.featured && (
                      <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ⭐ Featured
                      </span>
                    )}

                    {!product.inStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <span className="bg-red-600 text-white px-5 py-2 rounded-full font-bold text-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-900">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 mt-2">{product.category}</p>

                  <p className="text-2xl font-bold text-green-700 mt-3">
                    ₹{product.price}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-yellow-500 font-semibold">
                      ⭐ {product.rating}
                    </span>

                    {product.inStock ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {product.stock} Available
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 text-center bg-gray-200 hover:bg-gray-300 py-3 rounded-xl font-semibold transition"
                    >
                      View Details
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`flex-1 py-3 rounded-xl font-semibold text-white transition ${
                        product.inStock
                          ? "bg-green-700 hover:bg-green-800 cursor-pointer"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
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

export default function Products() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 bg-green-50">
          <p className="text-xl text-gray-600">Loading Products...</p>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}