"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FiStar,
  FiMapPin,
  FiCheck,
  FiHome,
  FiUsers,
  FiDroplet,
} from "react-icons/fi";
import { api } from "@/lib/api";
import { Listing, Review } from "@/types/listing";
import { ListingCard } from "@/components/ui/ListingCard";
import { ReviewForm } from "@/components/ui/ReviewForm";
import { BookingModal } from "@/components/ui/BookingModal";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ListingDetailsPage() {
  const params = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Listing[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const listingData = await api.get<Listing>(`/listings/${params.id}`);
        setListing(listingData);

        const [reviewsRes, allListingsRes] = await Promise.all([
          api.get<{ items: Review[] }>(`/reviews/${params.id}`),
          api.get<{
            items: Listing[];
            total: number;
            page: number;
            totalPages: number;
          }>(`/listings?category=${listingData.category}&limit=5`),
        ]);

        setReviews(reviewsRes.items);
        setRelated(
          allListingsRes.items
            .filter((l) => l._id !== listingData._id)
            .slice(0, 4),
        );
      } catch {
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <p className="text-sm text-foreground/60">Loading listing...</p>
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Listing not found
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          This listing may have been removed or the link is incorrect.
        </p>
        <Link
          href="/explore"
          className="mt-6 inline-block text-sm font-medium text-accent hover:underline"
        >
          ← Back to Explore
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/explore"
        className="text-sm text-foreground/60 hover:text-accent"
      >
        ← Back to Explore
      </Link>

      <div className="mt-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-semibold text-foreground">
            {listing.title}
          </h1>
          <p className="mt-1 flex items-center gap-1 text-sm text-foreground/60">
            <FiMapPin /> {listing.location}
          </p>
        </div>
        <span className="flex items-center gap-1 text-sm font-medium text-foreground">
          <FiStar className="text-price" /> {listing.rating}
          <span className="text-foreground/50">
            ({listing.reviewCount} reviews)
          </span>
        </span>
      </div>

      <div className="mt-6">
        <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96">
          <Image
            src={listing.images[activeImage]}
            alt={listing.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        {listing.images.length > 1 && (
          <div className="mt-3 flex gap-3 overflow-x-auto">
            {listing.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImage(i)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                  activeImage === i ? "border-accent" : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`${listing.title} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Overview
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              {listing.fullDescription}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Key information
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="flex flex-col items-center gap-1 rounded-xl border border-foreground/10 p-4 text-center">
                <FiHome className="text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {listing.bedrooms}
                </span>
                <span className="text-xs text-foreground/50">Bedrooms</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl border border-foreground/10 p-4 text-center">
                <FiDroplet className="text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {listing.bathrooms}
                </span>
                <span className="text-xs text-foreground/50">Bathrooms</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl border border-foreground/10 p-4 text-center">
                <FiUsers className="text-accent" />
                <span className="text-sm font-medium capitalize text-foreground">
                  {listing.category}
                </span>
                <span className="text-xs text-foreground/50">Type</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-xl border border-foreground/10 p-4 text-center">
                <FiStar className="text-accent" />
                <span className="text-sm font-medium text-foreground">
                  {listing.rating}
                </span>
                <span className="text-xs text-foreground/50">Rating</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {listing.amenities.map((a) => (
                <span
                  key={a}
                  className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  <FiCheck /> {a}
                </span>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Reviews ({reviews.length})
            </h2>

            <div className="mt-4">
              <ReviewForm
                listingId={listing._id}
                onReviewAdded={(newReview) => {
                  setReviews((prev) => [newReview, ...prev]);
                  setListing((prev) =>
                    prev
                      ? {
                          ...prev,
                          reviewCount: prev.reviewCount + 1,
                          rating:
                            Math.round(
                              ((prev.rating * prev.reviewCount +
                                newReview.rating) /
                                (prev.reviewCount + 1)) *
                                10,
                            ) / 10,
                        }
                      : prev,
                  );
                }}
              />
            </div>

            {reviews.length === 0 ? (
              <p className="mt-4 text-sm text-foreground/60">
                No reviews yet for this listing. Be the first to leave one!
              </p>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="rounded-xl border border-foreground/10 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {review.userName}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-foreground/60">
                        <FiStar className="text-price" /> {review.rating}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-foreground/70">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm">
            <span className="rounded-full bg-price/15 px-3 py-1 text-sm font-semibold text-price">
              ৳{listing.price.toLocaleString()}/night
            </span>
            <p className="mt-4 text-sm text-foreground/60">
              Hosted by{" "}
              <span className="font-medium text-foreground">
                {listing.hostName}
              </span>
            </p>
            <button
              onClick={() => {
                if (!isLoggedIn) {
                  router.push("/login");
                  return;
                }
                setShowBookingModal(true);
              }}
              className="mt-6 w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              Book Now
            </button>
            <p className="mt-2 text-center text-xs text-foreground/50">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Similar stays nearby
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((l) => (
              <ListingCard key={l._id} listing={l} />
            ))}
          </div>
        </section>
      )}
      {showBookingModal && (
        <BookingModal
          listingId={listing._id}
          pricePerNight={listing.price}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}
