"use client";

import Reveal from "./Reveal";

const CLIENTS = [
  "Northwind Realty",
  "Skyline Group",
  "Vista Homes",
  "Marina Developers",
  "Crestview Living",
  "Aurora Estates",
  "Brightwall Builders",
  "Highgrove Spaces",
];

function Mark() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect
        x="1.5"
        y="1.5"
        width="19"
        height="19"
        rx="6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="11" cy="11" r="3.4" fill="currentColor" />
    </svg>
  );
}

export default function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-y border-line bg-bg-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-muted">
            Trusted by leading builders &amp; developers
          </p>
        </Reveal>
        <div className="relative mt-9 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-bg-soft to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-bg-soft to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-14">
            {row.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 text-muted/70 transition-colors hover:text-text"
              >
                <Mark />
                <span className="font-display whitespace-nowrap text-lg font-semibold">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-7 text-center text-[11px] text-muted">
          Representative names shown for demonstration.
        </p>
      </div>
    </section>
  );
}
