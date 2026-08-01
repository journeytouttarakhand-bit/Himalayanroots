"use client";

import { useState } from "react";

type Props = {
  productId: string;
  onSuccess?: () => void;
};

export default function ReviewForm({
  productId,
  onSuccess,
}: Props) {
  const [rating, setRating] =
    useState(5);

  const [title, setTitle] =
    useState("");

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function submitReview(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {

      const res = await fetch(
        "/api/reviews",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            product: productId,
            rating,
            title,
            comment,
          }),
        }
      );

      const data =
        await res.json();

      if (!data.success) {

        alert(
          data.message
        );

        setLoading(false);

        return;

      }

      alert(
        "Review submitted successfully."
      );

      setRating(5);

      setTitle("");

      setComment("");

      onSuccess?.();

    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong."
      );

    }

    setLoading(false);
  }

  return (

    <form
      onSubmit={submitReview}
      className="rounded-xl border bg-white p-6 shadow"
    >

      <h2 className="mb-6 text-2xl font-bold">

        Write a Review

      </h2>

      <label className="mb-2 block font-semibold">

        Rating

      </label>

      <div className="mb-6 flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (

          <button
            key={star}
            type="button"
            onClick={() =>
              setRating(star)
            }
            className={`text-4xl transition ${
              star <= rating
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
          >

            ★

          </button>

        ))}

      </div>

      <div className="mb-6">

        <label className="mb-2 block font-semibold">

          Review Title

        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          placeholder="Amazing Product"
          className="w-full rounded-lg border p-3"
        />

      </div>

      <div className="mb-6">

        <label className="mb-2 block font-semibold">

          Your Review

        </label>

        <textarea
          rows={5}
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          placeholder="Write your experience..."
          className="w-full resize-none rounded-lg border p-3"
          required
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-700 py-3 font-bold text-white transition hover:bg-green-800 disabled:bg-gray-400"
      >

        {loading
          ? "Submitting..."
          : "Submit Review"}

      </button>

    </form>

  );

}