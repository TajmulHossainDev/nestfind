"use client";

import { motion } from "framer-motion";
import { FiSearch, FiCalendar, FiKey } from "react-icons/fi";

const steps = [
  {
    icon: FiSearch,
    title: "Search & compare",
    description:
      "Filter by location, price, and category to find stays that match your budget and needs.",
  },
  {
    icon: FiCalendar,
    title: "Check availability",
    description:
      "View real-time availability, read verified reviews, and message the host with questions.",
  },
  {
    icon: FiKey,
    title: "Book & move in",
    description:
      "Confirm your booking securely and get instant access details straight to your inbox.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          How NestFind works
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          From search to move-in, in three simple steps.
        </p>
      </div>

      <div className="relative grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="absolute left-0 right-0 top-8 hidden h-px bg-foreground/10 md:block" />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="relative flex flex-col items-center text-center"
          >
            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-accent-foreground shadow-sm">
              <step.icon />
            </span>
            <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-price">
              Step {i + 1}
            </span>
            <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-foreground/70">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
