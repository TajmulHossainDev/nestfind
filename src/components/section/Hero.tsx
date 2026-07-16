"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiSearch, FiMapPin, FiStar } from "react-icons/fi";
import { Listing } from "@/types/listing";

const categories = [
  "Any type",
  "Apartment",
  "House",
  "Room",
  "Studio",
  "Villa",
];

interface HeroProps {
  previewListings: Listing[];
}

export function Hero({ previewListings }: HeroProps) {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Any type");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (category !== "Any type") params.set("category", category.toLowerCase());
    router.push(`/explore?${params.toString()}`);
  }

  return (
    <section className="relative flex min-h-[65vh] items-center overflow-hidden bg-background px-4 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            2,400+ verified stays across Bangladesh
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            Find your next stay, <br /> without the guesswork.
          </h1>
          <p className="mt-4 max-w-md text-foreground/70">
            Browse rooms, apartments, and houses with verified photos, honest
            reviews, and transparent pricing — no surprises at check-in.
          </p>

          <form
            onSubmit={handleSearch}
            className="mt-8 flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-background p-3 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 items-center gap-2 px-2">
              <FiMapPin className="text-accent" />
              <input
                type="text"
                placeholder="Where are you looking? e.g. Gulshan"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
              />
            </div>
            <div className="h-px w-full bg-foreground/10 sm:h-6 sm:w-px" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-transparent px-2 text-sm text-foreground outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              <FiSearch /> Search
            </button>
          </form>
        </motion.div>

        <div className="relative hidden h-[420px] md:block">
          {previewListings[0] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              whileHover={{ y: -6 }}
              className="absolute left-0 top-6 w-64 rounded-2xl border border-foreground/10 bg-background p-3 shadow-lg"
            >
              <div className="relative h-32 w-full overflow-hidden rounded-xl">
                <Image
                  src={previewListings[0].images[0]}
                  alt={previewListings[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="line-clamp-1 text-sm font-medium text-foreground">
                  {previewListings[0].title}
                </p>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-foreground/60">
                <span className="flex items-center gap-1">
                  <FiStar className="text-price" />{" "}
                  {previewListings[0].rating || "New"}
                </span>
                <span className="rounded-full bg-price/15 px-2 py-0.5 font-medium text-price">
                  ৳{previewListings[0].price.toLocaleString()}/night
                </span>
              </div>
            </motion.div>
          )}

          {previewListings[1] && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="absolute bottom-4 right-0 w-64 rounded-2xl border border-foreground/10 bg-background p-3 shadow-lg"
            >
              <div className="relative h-32 w-full overflow-hidden rounded-xl">
                <Image
                  src={previewListings[1].images[0]}
                  alt={previewListings[1].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="line-clamp-1 text-sm font-medium text-foreground">
                  {previewListings[1].title}
                </p>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-foreground/60">
                <span className="flex items-center gap-1">
                  <FiStar className="text-price" />{" "}
                  {previewListings[1].rating || "New"}
                </span>
                <span className="rounded-full bg-price/15 px-2 py-0.5 font-medium text-price">
                  ৳{previewListings[1].price.toLocaleString()}/night
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
