"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ListingCard } from "@/components/ui/ListingCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { api } from "@/lib/api";
import { Listing } from "@/types/listing";

function WishlistContent() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<{ items: Listing[] }>("/wishlist/mine")
      .then((data) => setListings(data.items))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl font-semibold text-foreground">
        Your Wishlist
      </h1>
      <p className="mt-1 text-sm text-foreground/60">
        Listings you've saved for later.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : listings.map((l) => <ListingCard key={l._id} listing={l} />)}
      </div>

      {!isLoading && listings.length === 0 && (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <FiHeart className="text-4xl text-foreground/20" />
          <p className="mt-3 font-display text-lg font-medium text-foreground">
            Your wishlist is empty
          </p>
          <p className="mt-1 text-sm text-foreground/60">
            Tap the heart icon on any listing to save it here.
          </p>
          <Link
            href="/explore"
            className="mt-4 text-sm font-medium text-accent hover:underline"
          >
            Browse listings →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <WishlistContent />
    </ProtectedRoute>
  );
}
