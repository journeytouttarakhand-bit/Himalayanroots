"use client";

import { useEffect, useState } from "react";

type Review = {
  _id: string;

  rating: number;

  title: string;

  comment: string;

  verifiedPurchase: boolean;

  createdAt: string;

  user: {
    name: string;
  };
};

type Props = {
  productId: string;
};

export default function ReviewList({
  productId,
}: Props) {

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [averageRating, setAverageRating] =
    useState(0);

  const [totalReviews, setTotalReviews] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadReviews();

  }, [productId]);

  async function loadReviews() {

    try {

      const res =
        await fetch(
          `/api/reviews?product=${productId}`,
          {
            cache: "no-store",
          }
        );

      const data =
        await res.json();

      if (data.success) {

        setReviews(
          data.reviews
        );

        setAverageRating(
          data.averageRating
        );

        setTotalReviews(
          data.totalReviews
        );

      }

    } catch (error) {

      console.error(error);

    }

    setLoading(false);

  }

  if (loading) {

    return (

      <div className="rounded-xl bg-white p-6 shadow">

        Loading Reviews...

      </div>

    );

  }

  return (

    <div className="mt-12">

      <div className="mb-8 rounded-xl bg-white p-6 shadow">

        <h2 className="text-3xl font-bold">

          Customer Reviews

        </h2>

        <div className="mt-4 flex items-center gap-4">

          <span className="text-5xl font-bold text-yellow-500">

            {averageRating.toFixed(1)}

          </span>

          <div>

            <p className="text-xl">

              ⭐⭐⭐⭐⭐

            </p>

            <p className="text-gray-500">

              {totalReviews} Reviews

            </p>

          </div>

        </div>

      </div>
            {reviews.length === 0 ? (

        <div className="rounded-xl bg-white p-8 text-center shadow">

          <h3 className="text-xl font-semibold text-gray-700">

            No Reviews Yet

          </h3>

          <p className="mt-2 text-gray-500">

            Be the first customer to review this product.

          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {reviews.map((review) => (

            <div
              key={review._id}
              className="rounded-xl border bg-white p-6 shadow"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="text-lg font-bold">

                    {review.user.name}

                  </h3>

                  <div className="mt-2 flex items-center gap-3">

                    <span className="text-yellow-500">

                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}

                    </span>

                    {review.verifiedPurchase && (

                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                        ✓ Verified Purchase

                      </span>

                    )}

                  </div>

                </div>

                <span className="text-sm text-gray-500">

                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}

                </span>

              </div>

              {review.title && (

                <h4 className="mt-5 text-lg font-semibold">

                  {review.title}

                </h4>

              )}

              <p className="mt-3 whitespace-pre-line text-gray-700">

                {review.comment}

              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}