"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiCheck } from "react-icons/fi";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl bg-accent px-6 py-12 text-center sm:px-12"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-foreground/15 text-2xl text-accent-foreground">
          <FiMail />
        </span>
        <div>
          <h2 className="font-display text-2xl font-semibold text-accent-foreground sm:text-3xl">
            Get new listings before anyone else
          </h2>
          <p className="mt-2 text-sm text-accent-foreground/80">
            Weekly picks of newly listed rooms, apartments, and houses in your
            city.
          </p>
        </div>

        {submitted ? (
          <div className="flex items-center gap-2 rounded-xl bg-accent-foreground/15 px-5 py-3 text-sm font-medium text-accent-foreground">
            <FiCheck /> Subscribed! Check your inbox soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full flex-1 rounded-xl border-none bg-background px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
            <button
              type="submit"
              className="rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
