"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface WishlistContextType {
  wishlistIds: Set<string>;
  isWishlisted: (listingId: string) => boolean;
  toggleWishlist: (listingId: string) => Promise<void>;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined,
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  const loadWishlist = useCallback(async () => {
    if (!isLoggedIn) {
      setWishlistIds(new Set());
      setIsLoading(false);
      return;
    }
    try {
      const data = await api.get<{ listingIds: string[] }>(
        "/wishlist/mine/ids",
      );
      setWishlistIds(new Set(data.listingIds));
    } catch {
      setWishlistIds(new Set());
    } finally {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  function isWishlisted(listingId: string) {
    return wishlistIds.has(listingId);
  }

  async function toggleWishlist(listingId: string) {
    if (!isLoggedIn) return;

    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(listingId)) next.delete(listingId);
      else next.add(listingId);
      return next;
    });

    try {
      await api.post("/wishlist/toggle", { listingId });
    } catch {
      loadWishlist();
    }
  }

  return (
    <WishlistContext.Provider
      value={{ wishlistIds, isWishlisted, toggleWishlist, isLoading }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
