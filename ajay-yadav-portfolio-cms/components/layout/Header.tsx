"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const order: Array<typeof theme> = ["light", "dark", "system"];
    const next = order[(order.indexOf(theme) + 1) % order.length];
    setTheme(next);
  };

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Laptop;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-heading text-lg font-bold">
          Ajay Yadav
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cycleTheme}
            aria-label={`Switch theme (current: ${theme})`}
            className="rounded-full p-2 text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            <ThemeIcon size={18} />
          </button>

          <Link
            href="/contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 md:inline-block"
          >
            Contact Me
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="rounded-full p-2 text-muted hover:bg-surface hover:text-foreground md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel */}
      <nav
        id="mobile-menu"
        className={clsx(
          "border-t border-border md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-3">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-surface"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
