"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl">
          Getachew Tadele
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-l">
          <Link href="/about">About</Link>
          <Link href="/art">Art</Link>
          <Link href="/films">Films</Link>
          <Link href="/exhibitions">Exhibitions</Link>
          <Link href="/contact">Contact</Link>
          <ThemeToggle />
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col justify-center gap-1 w-6 h-6"
            aria-label="Toggle menu"
          >
            <span
              className={`h-[2px] w-full bg-foreground transition ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full bg-foreground transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full bg-foreground transition ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="flex flex-col px-6 py-6 space-y-4 text-sm">
            {[
              ["About", "/about"],
              ["Art", "/art"],
              ["Films", "/films"],
              ["Exhibitions", "/exhibitions"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="hover:text-primary transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
