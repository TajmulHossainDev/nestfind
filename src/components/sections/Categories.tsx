"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiKey, FiLayers, FiSun, FiStar } from "react-icons/fi";

const categories = [
  { label: "Apartments", value: "apartment", icon: FiHome, count: 640 },
  { label: "Houses", value: "house", icon: FiKey, count: 280 },
  { label: "Rooms", value: "room", icon: FiLayers, count: 910 },
  { label: "Studios", value: "studio", icon: FiSun, count: 415 },
  { label: "Villas", value: "villa", icon: FiStar, count: 95 },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            Browse by category
          </h2>
          <p className="mt-2 text-sm text-foreground/60">
            Find the stay that fits how you live.
          </p>
        </div>
        <Link
          href="/explore"
          className="hidden text-sm font-medium text-accent hover:underline sm:block"
        >
          View all listings →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.value}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link
              href={`/explore?category=${cat.value}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-foreground/10 bg-background p-5 text-center transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-xl text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <cat.icon />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {cat.label}
                </p>
                <p className="text-xs text-foreground/50">
                  {cat.count} listings
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
