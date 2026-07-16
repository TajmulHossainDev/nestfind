"use client";

import { useState } from "react";
import { FiX, FiCalendar } from "react-icons/fi";
import { redirectToCheckout } from "@/lib/stripe-client";

interface BookingModalProps {
  listingId: string;
  pricePerNight: number;
  onClose: () => void;
}

export function BookingModal({
  listingId,
  pricePerNight,
  onClose,
}: BookingModalProps) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;
  const total = nights > 0 ? nights * pricePerNight : 0;

  async function handleProceed() {
    setError("");
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    if (nights <= 0) {
      setError("Check-out must be after check-in.");
      return;
    }

    setIsLoading(true);
    try {
      await redirectToCheckout(listingId, checkIn, checkOut);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to start checkout.",
      );
      setIsLoading(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Confirm your stay
          </h3>
          <button
            onClick={onClose}
            className="text-foreground/50 hover:text-foreground"
          >
            <FiX />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <div>
            <label className="mb-1 flex items-center gap-1 text-xs font-medium text-foreground/70">
              <FiCalendar /> Check-in
            </label>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm outline-none"
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-xs font-medium text-foreground/70">
              <FiCalendar /> Check-out
            </label>
            <input
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-xl border border-foreground/10 bg-background px-3 py-2 text-sm outline-none"
            />
          </div>
        </div>

        {nights > 0 && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-accent/5 px-4 py-3 text-sm">
            <span className="text-foreground/70">
              ৳{pricePerNight.toLocaleString()} × {nights} night
              {nights > 1 ? "s" : ""}
            </span>
            <span className="font-semibold text-foreground">
              ৳{total.toLocaleString()}
            </span>
          </div>
        )}

        {error && <p className="mt-3 text-xs text-price">{error}</p>}

        <button
          onClick={handleProceed}
          disabled={isLoading}
          className="mt-5 w-full rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground hover:opacity-90 disabled:opacity-60"
        >
          {isLoading ? "Redirecting to payment..." : "Proceed to payment"}
        </button>
      </div>
    </div>
  );
}
