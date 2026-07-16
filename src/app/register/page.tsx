"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email address";

    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    setIsSubmitting(false);

    if (error) {
      setErrors({
        form: error.message || "Registration failed. Please try again.",
      });
      return;
    }

    router.push("/");
  }

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-foreground/60">
          List your property or find your next stay.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/70">
            Full name
          </label>
          <div
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${
              errors.name ? "border-price" : "border-foreground/10"
            }`}
          >
            <FiUser className="text-foreground/40" />
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Tajmul Hossain"
              className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
            />
          </div>
          {errors.form && (
            <div className="rounded-xl bg-price/10 px-4 py-3 text-sm text-price">
              {errors.form}
            </div>
          )}
        </div>

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
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
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
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-price">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-foreground/70">
            Confirm password
          </label>
          <div
            className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${
              errors.confirmPassword ? "border-price" : "border-foreground/10"
            }`}
          >
            <FiLock className="text-foreground/40" />
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.target.value)}
              placeholder="••••••••"
              className="w-full bg-transparent text-sm outline-none placeholder:text-foreground/40"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-price">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 rounded-xl bg-accent px-4 py-3 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/60">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
