"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiHome, FiCalendar, FiTrendingUp, FiDollarSign } from "react-icons/fi";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { api } from "@/lib/api";

interface DashboardStats {
  totalListings: number;
  totalBookingsMade: number;
  totalBookingsReceived: number;
  totalRevenue: number;
  chartData: { month: string; revenue: number }[];
}

function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get<DashboardStats>("/dashboard/stats")
      .then(setStats)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-sm text-foreground/60">Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center">
        <p className="text-sm text-foreground/60">
          Could not load dashboard data.
        </p>
      </div>
    );
  }

  const cards = [
    { icon: FiHome, label: "Your listings", value: stats.totalListings },
    {
      icon: FiCalendar,
      label: "Bookings made",
      value: stats.totalBookingsMade,
    },
    {
      icon: FiTrendingUp,
      label: "Bookings received",
      value: stats.totalBookingsReceived,
    },
    {
      icon: FiDollarSign,
      label: "Total revenue",
      value: `৳${stats.totalRevenue.toLocaleString()}`,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl font-semibold text-foreground">
        Dashboard
      </h1>
      <p className="mt-1 text-sm text-foreground/60">
        An overview of your listings, bookings, and earnings.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-2xl border border-foreground/10 p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <c.icon />
            </span>
            <p className="mt-3 text-2xl font-semibold text-foreground">
              {c.value}
            </p>
            <p className="text-xs text-foreground/60">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-foreground/10 p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Revenue by month
        </h2>
        {stats.chartData.length === 0 ? (
          <p className="mt-6 text-sm text-foreground/60">
            No confirmed bookings yet — revenue will appear here once guests
            book your listings.
          </p>
        ) : (
          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--foreground)"
                  strokeOpacity={0.1}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--foreground)"
                  fontSize={12}
                />
                <YAxis stroke="var(--foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--foreground)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="var(--accent)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
