"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiStar, FiMapPin, FiHeart } from "react-icons/fi";
import { Listing } from "@/types/listing";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export function ListingCard({ listing }: { listing: Listing }) {
  const { isLoggedIn } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const router = useRouter();
  const saved = isWishlisted(listing._id);

  function handleWishlistClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    toggleWishlist(listing._id);
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 w-full shrink-0">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <button
          onClick={handleWishlistClick}
          aria-label={saved ? "Remove from wishlist" : "Save listing"}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
            saved
              ? "bg-price text-price-foreground"
              : "bg-background/80 text-foreground/70 hover:text-price"
          }`}
        >
          <FiHeart className={saved ? "fill-current" : ""} />
        </button>
        <span className="absolute bottom-3 left-3 rounded-full bg-price/90 px-2.5 py-1 text-xs font-semibold text-price-foreground">
          ৳{listing.price.toLocaleString()}/night
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-display text-base font-semibold text-foreground">
            {listing.title}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-foreground/70">
            <FiStar className="text-price" /> {listing.rating}
          </span>
        </div>

        <p className="flex items-center gap-1 text-xs text-foreground/50">
          <FiMapPin /> {listing.location}
        </p>

        <p className="line-clamp-2 text-sm text-foreground/70">
          {listing.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-xs text-foreground/50">
            {listing.bedrooms} bed · {listing.bathrooms} bath
          </span>
          <Link
            href={`/listings/${listing._id}`}
            className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
