"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession, signOut as authSignOut } from "@/lib/auth-client";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  userName: string | null;
  userId: string | null;
  role: string | null;
  isAdmin: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  async function logout() {
    await authSignOut();
    window.location.href = "/";
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!session,
        isLoading: isPending,
        userName: session?.user.name ?? null,
        userId: session?.user.id ?? null,
        role: (session?.user as { role?: string })?.role ?? null,
        isAdmin: (session?.user as { role?: string })?.role === "admin",
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
