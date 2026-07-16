"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiStar } from "react-icons/fi";

const testimonials = [
  {
    name: "Farhana Akter",
    role: "Guest, Dhaka",
    avatar: "https://i.pravatar.cc/100?img=45",
    rating: 5,
    quote:
      "Booked a studio in Gulshan within minutes. The listing photos matched exactly what I got — no surprises at check-in.",
  },
  {
    name: "Imran Kabir",
    role: "Guest, Chittagong",
    avatar: "https://i.pravatar.cc/100?img=51",
    rating: 5,
    quote:
      "Host communication was quick and the pricing was transparent from the start. Easily the smoothest rental booking I've had.",
  },
  {
    name: "Sabrina Hossain",
    role: "Host & Guest, Sylhet",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 4,
    quote:
      "I list two of my properties here and manage bookings without any hassle. The dashboard makes tracking requests simple.",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          What our guests say
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Real experiences from renters and hosts on NestFind.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="flex h-full flex-col rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm"
          >
            <div className="flex gap-0.5 text-price">
              {Array.from({ length: 5 }).map((_, idx) => (
                <FiStar
                  key={idx}
                  className={idx < t.rating ? "fill-current" : "opacity-30"}
                />
              ))}
            </div>

            <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
              “{t.quote}”
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{t.name}</p>
                <p className="text-xs text-foreground/50">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
