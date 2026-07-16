"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FiMenu, FiX, FiHome, FiUser } from "react-icons/fi";

const loggedOutLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "About", href: "/about" },
];

const loggedInLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Add Listing", href: "/items/add" },
  { label: "Manage Listings", href: "/items/manage" },
  { label: "Dashboard", href: "/dashboard" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isLoggedIn, logout, isAdmin } = useAuth();

  const baseLinks = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const links = isAdmin
    ? [...baseLinks, { label: "Admin", href: "/admin" }]
    : baseLinks;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-semibold text-accent"
        >
          <FiHome className="text-2xl" />
          NestFind
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <Button variant="ghost" size="sm" onClick={logout}>
              <FiUser className="mr-1" />
              Log out
            </Button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-foreground/80 hover:text-accent"
              >
                Log in
              </Link>

              <Link href="/register">
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-foreground/10 bg-background px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm font-medium text-foreground/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="pt-2">
              {isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={logout}
                >
                  <FiUser className="mr-1" />
                  Log out
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-foreground/80"
                  >
                    Log in
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" size="sm">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
