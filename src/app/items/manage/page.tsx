"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiEye, FiTrash2, FiPlus } from "react-icons/fi";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { api } from "@/lib/api";
import { Listing } from "@/types/listing";

function ManageItemsContent() {
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  async function loadListings() {
    setIsLoading(true);
    try {
      const data = await api.get<{ items: Listing[] }>("/listings/mine");
      setMyListings(data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await api.delete(`/listings/${deleteTarget._id}`);
      setMyListings((prev) => prev.filter((l) => l._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Manage your listings
          </h1>
          <p className="mt-1 text-sm text-foreground/60">
            {isLoading
              ? "Loading..."
              : `${myListings.length} listing${myListings.length !== 1 ? "s" : ""} published`}
          </p>
        </div>
        <Link
          href="/items/add"
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90"
        >
          <FiPlus /> Add new
        </Link>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-xl bg-foreground/5"
            />
          ))}
        </div>
      ) : myListings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-foreground/20 py-16 text-center">
          <p className="text-sm text-foreground/60">
            You haven't added any listings yet.
          </p>
          <Link
            href="/items/add"
            className="mt-2 inline-block text-sm font-medium text-accent hover:underline"
          >
            Add your first listing →
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-foreground/10 md:block">
            <table className="w-full text-left text-sm">
              <thead className="bg-accent/5 text-xs uppercase text-foreground/60">
                <tr>
                  <th className="px-4 py-3">Listing</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Rating</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myListings.map((listing) => (
                  <tr
                    key={listing._id}
                    className="border-t border-foreground/10"
                  >
                    <td className="flex items-center gap-3 px-4 py-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={listing.images[0]}
                          alt={listing.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="line-clamp-1 font-medium text-foreground">
                        {listing.title}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize text-foreground/70">
                      {listing.category}
                    </td>
                    <td className="px-4 py-3 text-foreground/70">
                      ৳{listing.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-foreground/70">
                      {listing.rating}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/listings/${listing._id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/10 text-foreground/60 hover:text-accent"
                          aria-label="View"
                        >
                          <FiEye />
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(listing)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/10 text-foreground/60 hover:text-price"
                          aria-label="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 md:hidden">
            {myListings.map((listing) => (
              <div
                key={listing._id}
                className="flex gap-3 rounded-2xl border border-foreground/10 p-3"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="line-clamp-1 text-sm font-medium text-foreground">
                    {listing.title}
                  </p>
                  <p className="text-xs capitalize text-foreground/60">
                    {listing.category} · ৳{listing.price.toLocaleString()}
                  </p>
                  <div className="mt-auto flex gap-2 pt-2">
                    <Link
                      href={`/listings/${listing._id}`}
                      className="flex items-center gap-1 rounded-lg border border-foreground/10 px-2.5 py-1 text-xs text-foreground/70"
                    >
                      <FiEye /> View
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(listing)}
                      className="flex items-center gap-1 rounded-lg border border-foreground/10 px-2.5 py-1 text-xs text-price"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-lg">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Delete listing?
            </h3>
            <p className="mt-2 text-sm text-foreground/60">
              This will permanently remove "{deleteTarget.title}". This action
              cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="rounded-xl border border-foreground/10 px-4 py-2 text-sm text-foreground/70"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="rounded-xl bg-price px-4 py-2 text-sm font-medium text-price-foreground disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <ManageItemsContent />
    </ProtectedRoute>
  );
}
