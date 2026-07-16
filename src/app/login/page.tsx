"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    const { error } = await authClient.signIn.email({ email, password });

    setIsSubmitting(false);

    if (error) {
      setErrors({ form: error.message || "Invalid email or password." });
      return;
    }

    router.push("/");
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          Log in to manage your listings and bookings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        {errors.form && (
          <div className="rounded-xl bg-price/10 px-4 py-3 text-sm text-price">
            {errors.form}
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/70">
            Email
          </label>
          <div
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${
              errors.email ? "border-price" : "border-foreground/10"
            }`}
          >
            <FiMail className="text-foreground/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-price">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/70">
            Password
          </label>
          <div
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${
              errors.password ? "border-price" : "border-foreground/10"
            }`}
          >
            <FiLock className="text-foreground/40" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="text-foreground/40"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-price">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-accent hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
