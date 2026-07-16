import Link from "next/link";
import { FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-6xl font-semibold text-accent">
        404
      </span>
      <h1 className="mt-4 font-display text-2xl font-semibold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-foreground/60">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          <FiHome /> Go home
        </Link>
        <Link
          href="/explore"
          className="flex items-center gap-2 rounded-xl border border-foreground/10 px-4 py-2.5 text-sm font-medium text-foreground/70 hover:border-accent/40 hover:text-accent"
        >
          <FiSearch /> Explore listings
        </Link>
      </div>
    </div>
  );
}
