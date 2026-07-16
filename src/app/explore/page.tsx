"use client";

import { Suspense, useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { ListingCard } from "@/components/ui/ListingCard";
import { SkeletonCard } from "@/components/ui/SkeletonCard";
import { Pagination } from "@/components/ui/Pagination";
import { FilterBar, Filters } from "@/components/ui/FilterBar";
import { api } from "@/lib/api";
import { Listing, ListingsResponse } from "@/types/listing";

const PAGE_SIZE = 8;

function ExploreContent() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get("location") || "",
    category: searchParams.get("category") || "all",
    maxPrice: 50000,
    sort: "recommended",
  });
  const [page, setPage] = useState(1);
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchListings = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const params = new URLSearchParams();
      if (filters.search) params.set("search", filters.search);
      if (filters.category !== "all") params.set("category", filters.category);
      params.set("maxPrice", String(filters.maxPrice));
      params.set("sort", filters.sort);
      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));

      const data = await api.get<ListingsResponse>(
        `/listings?${params.toString()}`,
      );
      setListings(data.items);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to load listings.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  function handleFilterChange(newFilters: Filters) {
    setFilters(newFilters);
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Explore listings
        </h1>
        <p className="mt-1 text-sm text-foreground/60">
          {isLoading ? "Searching..." : `${total} stays found`}
        </p>
      </div>

      <FilterBar filters={filters} onChange={handleFilterChange} />

      {errorMsg && (
        <div className="mt-6 rounded-xl bg-price/10 px-4 py-3 text-sm text-price">
          {errorMsg} — is the backend server running?
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
      </div>

      {!isLoading && listings.length === 0 && !errorMsg && (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <p className="font-display text-lg font-medium text-foreground">
            No listings match your search
          </p>
          <p className="mt-1 text-sm text-foreground/60">
            Try adjusting your filters or search for a different location.
          </p>
        </div>
      )}

      {!isLoading && listings.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}
