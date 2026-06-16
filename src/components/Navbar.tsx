"use client";

import { useEffect, useState } from "react";
import LogoMark from "./Logo";

const LINKS = [
  { label: "Products", href: "#products" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Why us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/75 shadow-[0_8px_30px_-18px_rgba(22,20,15,0.25)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="group flex items-center gap-2.5">
          <LogoMark className="h-9 w-9 rounded-xl transition-transform duration-300 group-hover:scale-105" />
          <span className="font-display text-lg font-bold tracking-tight">
            Aarohana <span className="text-muted">Infratech</span>
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="rounded-full bg-cta px-5 py-2.5 text-sm font-semibold text-cta-fg shadow-[0_10px_24px_-12px_rgba(22,20,15,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(22,20,15,0.55)]"
          >
            Book a demo
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-text transition ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-text transition ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-0.5 w-5 bg-text transition ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-bg/95 px-6 py-4 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-muted hover:text-text"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-cta px-5 py-2.5 text-center text-sm font-semibold text-cta-fg"
          >
            Book a demo
          </a>
        </div>
      )}
    </header>
  );
}
