"use client";

import { useState } from "react";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-foreground">
          Get in touch
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          Questions about a listing, a booking, or becoming a host? We're here
          to help.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiMail />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Email</p>
              <p className="text-sm text-foreground/60">support@nestfind.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiPhone />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Phone</p>
              <p className="text-sm text-foreground/60">
                +880 1XXX-XXXXXX (9am–8pm, everyday)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiMapPin />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Office</p>
              <p className="text-sm text-foreground/60">
                Gulshan Avenue, Dhaka 1212, Bangladesh
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {sent && (
            <div className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent">
              Thanks! We'll get back to you within 24 hours.
            </div>
          )}
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
          />
          <input
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
          />
          <textarea
            placeholder="How can we help?"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            className="rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
          />
          <button
            type="submit"
            className="rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
