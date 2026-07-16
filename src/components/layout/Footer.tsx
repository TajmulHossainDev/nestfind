import Link from "next/link";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const footerLinks = {
  Explore: [
    { label: "Browse Listings", href: "/explore" },
    { label: "Add a Listing", href: "/items/add" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-lg font-semibold text-accent">
              NestFind
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              Find and book verified rooms, apartments, and houses across
              Bangladesh.
            </p>
            <div className="mt-4 flex gap-3 text-lg text-foreground/70">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-accent"
              >
                <FiFacebook />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-accent"
              >
                <FiInstagram />
              </a>
              <a
                href="https://x.com"
                aria-label="Twitter"
                className="hover:text-accent"
              >
                <FiTwitter />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-sm font-semibold text-foreground">
                {section}
              </h4>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/70 hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-foreground/10 pt-6 text-sm text-foreground/60 sm:flex-row">
          <p>© 2026 NestFind. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FiMail /> support@nestfind.com
            </span>
            <span className="flex items-center gap-1">
              <FiPhone /> +880 1777-999666
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
