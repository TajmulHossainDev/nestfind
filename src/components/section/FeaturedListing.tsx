import Link from "next/link";
import { ListingCard } from "@/components/ui/ListingCard";
import { Listing, ListingsResponse } from "@/types/listing";

async function getFeaturedListings(): Promise<Listing[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/listings?sort=rating&limit=4`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    const data: ListingsResponse = await res.json();
    return data.items;
  } catch {
    return [];
  }
}

export async function FeaturedListings() {
  const featured = await getFeaturedListings();

  if (featured.length === 0) {
    return null;
  }

  return (
    <section className="bg-accent/5 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              Featured stays
            </h2>
            <p className="mt-2 text-sm text-foreground/60">
              Hand-picked listings our guests love most.
            </p>
          </div>
          <Link
            href="/explore"
            className="hidden text-sm font-medium text-accent hover:underline sm:block"
          >
            View all listings →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
