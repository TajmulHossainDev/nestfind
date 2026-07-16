"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { api } from "@/lib/api";

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setMessage("No session found.");
      return;
    }

    async function confirm() {
      try {
        await api.get(`/bookings/confirm/${sessionId}`);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setMessage(
          err instanceof Error ? err.message : "Could not confirm booking.",
        );
      }
    }
    confirm();
  }, [sessionId]);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      {status === "loading" && (
        <p className="text-sm text-foreground/60">Confirming your booking...</p>
      )}

      {status === "success" && (
        <>
          <FiCheckCircle className="text-5xl text-accent" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
            Booking confirmed!
          </h1>
          <p className="mt-2 text-sm text-foreground/60">
            Your payment was successful. You'll receive the host's details
            shortly.
          </p>
          <Link
            href="/explore"
            className="mt-6 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            Explore more stays
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <FiXCircle className="text-5xl text-price" />
          <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-foreground/60">{message}</p>
          <Link
            href="/explore"
            className="mt-6 rounded-xl border border-foreground/10 px-5 py-2.5 text-sm font-medium text-foreground/70"
          >
            Back to Explore
          </Link>
        </>
      )}
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
          <p className="text-sm text-foreground/60">Loading...</p>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
