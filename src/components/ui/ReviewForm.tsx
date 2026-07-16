"use client";

import { useState } from "react";
import { FiStar } from "react-icons/fi";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Review } from "@/types/listing";

interface ReviewFormProps {
  listingId: string;
  onReviewAdded: (review: Review) => void;
}

export function ReviewForm({ listingId, onReviewAdded }: ReviewFormProps) {
  const { isLoggedIn } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="rounded-xl border border-dashed border-foreground/20 p-4 text-center text-sm text-foreground/60">
        <Link href="/login" className="font-medium text-accent hover:underline">
          Log in
        </Link>{" "}
        to leave a review for this listing.
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a star rating.");
      return;
    }
    if (!comment.trim()) {
      setError("Please write a comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newReview = await api.post<Review>("/reviews", {
        listingId,
        rating,
        comment: comment.trim(),
      });
      onReviewAdded(newReview);
      setRating(0);
      setComment("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-foreground/10 p-4"
    >
      <p className="text-sm font-medium text-foreground">Leave a review</p>

      <div className="mt-2 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="text-xl"
          >
            <FiStar
              className={
                star <= (hoverRating || rating)
                  ? "fill-price text-price"
                  : "text-foreground/20"
              }
            />
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience staying here..."
        rows={3}
        className="mt-3 w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
      />

      {error && <p className="mt-2 text-xs text-price">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 rounded-xl bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit review"}
      </button>
    </form>
  );
}
