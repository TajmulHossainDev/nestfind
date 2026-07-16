"use client";

import { motion } from "framer-motion";
import { FiHome, FiUsers, FiMapPin, FiSmile } from "react-icons/fi";

const stats = [
  { icon: FiHome, value: "2,400+", label: "Active listings" },
  { icon: FiUsers, value: "18,000+", label: "Registered users" },
  { icon: FiMapPin, value: "12", label: "Cities covered" },
  { icon: FiSmile, value: "96%", label: "Guest satisfaction" },
];

export function Stats() {
  return (
    <section className="bg-foreground px-4 py-16 text-background sm:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/10 text-xl text-price">
              <stat.icon />
            </span>
            <span className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              {stat.value}
            </span>
            <span className="mt-1 text-sm text-background/70">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
