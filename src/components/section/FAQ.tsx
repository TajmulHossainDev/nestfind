"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "How do I book a listing on NestFind?",
    answer:
      "Search or filter listings on the Explore page, open the one you like, and click 'Book Now' on the details page. You'll need to be logged in to complete a booking.",
  },
  {
    question: "Is there a fee for listing my property?",
    answer:
      "Creating a listing is free. NestFind only takes a small service fee once a booking is confirmed through the platform.",
  },
  {
    question: "Can I cancel or modify a booking?",
    answer:
      "Yes. You can manage your bookings from your dashboard. Cancellation policies vary by host and are shown on each listing's details page.",
  },
  {
    question: "How are hosts and listings verified?",
    answer:
      "Hosts must verify their identity before publishing a listing, and our team manually reviews new listings for accurate photos and descriptions.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support major cards and mobile banking through our secure payment partner. Full payment details are handled at checkout.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-sm text-foreground/60">
          Everything you need to know before your first booking.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-foreground/10 bg-background"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-foreground">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-accent"
                >
                  <FiChevronDown />
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 text-sm text-foreground/70">
                  {faq.answer}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
