"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FiTrash2, FiUsers, FiHome, FiShield } from "react-icons/fi";
import { AdminRoute } from "@/components/layout/AdminRoute";
import { api } from "@/lib/api";
import { AdminUser } from "@/types/admin";
import { Listing } from "@/types/listing";

type Tab = "users" | "listings";

function AdminContent() {
  const [tab, setTab] = useState<Tab>("users");
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "user" | "listing";
    id: string;
    label: string;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    try {
      const [usersRes, listingsRes] = await Promise.all([
        api.get<{ items: AdminUser[] }>("/admin/users"),
        api.get<{ items: Listing[] }>("/admin/listings"),
      ]);
      setUsers(usersRes.items);
      setListings(listingsRes.items);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.type === "user") {
        await api.delete(`/admin/users/${deleteTarget.id}`);
        setUsers((prev) => prev.filter((u) => u._id !== deleteTarget.id));
      } else {
        await api.delete(`/admin/listings/${deleteTarget.id}`);
        setListings((prev) => prev.filter((l) => l._id !== deleteTarget.id));
      }
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-2">
        <FiShield className="text-accent" />
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Admin Panel
        </h1>
      </div>
      <p className="mt-1 text-sm text-foreground/60">
        Manage all users and listings across NestFind.
      </p>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-foreground/10">
        <button
          onClick={() => setTab("users")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium ${
            tab === "users"
              ? "border-accent text-accent"
              : "border-transparent text-foreground/60"
          }`}
        >
          <FiUsers /> Users ({users.length})
        </button>
        <button
          onClick={() => setTab("listings")}
          className={`flex items-center gap-2 border-b-2 px-4 py-2 text-sm font-medium ${
            tab === "listings"
              ? "border-accent text-accent"
              : "border-transparent text-foreground/60"
          }`}
        >
          <FiHome /> Listings ({listings.length})
        </button>
      </div>

      {isLoading ? (
        <div className="mt-6 flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-14 animate-pulse rounded-xl bg-foreground/5"
            />
          ))}
        </div>
      ) : tab === "users" ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-foreground/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/5 text-xs uppercase text-foreground/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-foreground/10">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-foreground/70">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        u.role === "admin"
                          ? "bg-accent/15 text-accent"
                          : "bg-foreground/10 text-foreground/60"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {u.role !== "admin" && (
                      <button
                        onClick={() =>
                          setDeleteTarget({
                            type: "user",
                            id: u._id,
                            label: u.name,
                          })
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/10 text-foreground/60 hover:text-price"
                        aria-label="Delete user"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-foreground/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/5 text-xs uppercase text-foreground/60">
              <tr>
                <th className="px-4 py-3">Listing</th>
                <th className="px-4 py-3">Host</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((l) => (
                <tr key={l._id} className="border-t border-foreground/10">
                  <td className="flex items-center gap-3 px-4 py-3">
                    <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={l.images[0]}
                        alt={l.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="line-clamp-1 font-medium text-foreground">
                      {l.title}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground/70">{l.hostName}</td>
                  <td className="px-4 py-3 capitalize text-foreground/70">
                    {l.category}
                  </td>
                  <td className="px-4 py-3 text-foreground/70">
                    ৳{l.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() =>
                        setDeleteTarget({
                          type: "listing",
                          id: l._id,
                          label: l.title,
                        })
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-foreground/10 text-foreground/60 hover:text-price"
                      aria-label="Delete listing"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-lg">
            <h3 className="font-display text-lg font-semibold text-foreground">
              Delete {deleteTarget.type}?
            </h3>
            <p className="mt-2 text-sm text-foreground/60">
              This will permanently remove "{deleteTarget.label}". This action
              cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-foreground/10 px-4 py-2 text-sm text-foreground/70"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-xl bg-price px-4 py-2 text-sm font-medium text-price-foreground"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminContent />
    </AdminRoute>
  );
}
