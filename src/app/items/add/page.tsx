"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { ListingCategory } from "@/types/listing";
import { api } from "@/lib/api";

const categories: ListingCategory[] = [
  "apartment",
  "house",
  "room",
  "studio",
  "villa",
];

interface FormState {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  location: string;
  category: ListingCategory;
  bedrooms: string;
  bathrooms: string;
  imageUrl: string;
}

const initialForm: FormState = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  price: "",
  location: "",
  category: "apartment",
  bedrooms: "",
  bathrooms: "",
  imageUrl: "",
};

function AddItemForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.shortDescription.trim())
      newErrors.shortDescription = "Short description is required";
    if (!form.fullDescription.trim())
      newErrors.fullDescription = "Full description is required";
    if (!form.location.trim()) newErrors.location = "Location is required";

    if (!form.price.trim()) newErrors.price = "Price is required";
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price";

    if (!form.bedrooms.trim())
      newErrors.bedrooms = "Number of bedrooms is required";
    if (!form.bathrooms.trim())
      newErrors.bathrooms = "Number of bathrooms is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      await api.post("/listings", {
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        price: Number(form.price),
        location: form.location,
        category: form.category,
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        images: form.imageUrl ? [form.imageUrl] : undefined,
        amenities: [],
      });

      setSuccessMessage(true);
      setForm(initialForm);
      setTimeout(() => router.push("/items/manage"), 1200);
    } catch (err) {
      setErrors({
        form: err instanceof Error ? err.message : "Failed to add listing.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl font-semibold text-foreground">
        Add a new listing
      </h1>
      <p className="mt-1 text-sm text-foreground/60">
        Fill in the details below. Fields marked with an asterisk are required.
      </p>

      {successMessage && (
        <div className="mt-4 rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent">
          Listing added successfully! Redirecting to your listings...
        </div>
      )}

      {errors.form && (
        <div className="mt-4 rounded-xl bg-price/10 px-4 py-3 text-sm text-price">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <Field label="Title *" error={errors.title}>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            placeholder="Sunlit Studio in Gulshan"
            className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
          />
        </Field>

        <Field label="Short description *" error={errors.shortDescription}>
          <input
            type="text"
            value={form.shortDescription}
            onChange={(e) => update("shortDescription", e.target.value)}
            placeholder="One-line summary shown on listing cards"
            className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
          />
        </Field>

        <Field label="Full description *" error={errors.fullDescription}>
          <textarea
            value={form.fullDescription}
            onChange={(e) => update("fullDescription", e.target.value)}
            placeholder="Detailed description shown on the listing details page"
            rows={4}
            className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Price (per night, ৳) *" error={errors.price}>
            <input
              type="number"
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              placeholder="2800"
              className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
            />
          </Field>

          <Field label="Category *" error="">
            <select
              value={form.category}
              onChange={(e) =>
                update("category", e.target.value as ListingCategory)
              }
              className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Location *" error={errors.location}>
          <input
            type="text"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="Gulshan, Dhaka"
            className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Bedrooms *" error={errors.bedrooms}>
            <input
              type="number"
              value={form.bedrooms}
              onChange={(e) => update("bedrooms", e.target.value)}
              placeholder="2"
              className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
            />
          </Field>

          <Field label="Bathrooms *" error={errors.bathrooms}>
            <input
              type="number"
              value={form.bathrooms}
              onChange={(e) => update("bathrooms", e.target.value)}
              placeholder="1"
              className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
            />
          </Field>
        </div>

        <Field label="Image URL (optional)" error="">
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => update("imageUrl", e.target.value)}
            placeholder="https://images.unsplash.com/..."
            className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2.5 text-sm outline-none placeholder:text-foreground/40"
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit listing"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-foreground/70">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-price">{error}</p>}
    </div>
  );
}

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <AddItemForm />
    </ProtectedRoute>
  );
}
