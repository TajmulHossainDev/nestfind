"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn) {
      router.replace("/login");
    } else if (!isAdmin) {
      router.replace("/");
    }
  }, [isLoading, isLoggedIn, isAdmin, router]);

  if (isLoading || !isLoggedIn || !isAdmin) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-foreground/60">Checking access...</p>
      </div>
    );
  }

  return <>{children}</>;
}
