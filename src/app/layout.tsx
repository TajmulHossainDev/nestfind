import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "NestFind — Find your next stay",
  description: "Browse and book rooms, apartments, and houses for rent.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${inter.variable} font-sans`}>
        <AuthProvider>
          <WishlistProvider>
            <Navbar></Navbar>
            <main>{children}</main>
            <Footer></Footer>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
