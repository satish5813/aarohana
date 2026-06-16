"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

const QUOTES = [
  {
    q: "The panels look like art on the wall and the app just works. Our whole family adapted in a day.",
    n: "Ananya R.",
    r: "3 BHK · Bengaluru",
  },
  {
    q: "Retrofitting was painless — no rewiring, no mess. The goodnight scene alone is worth it.",
    n: "Vikram S.",
    r: "Villa · Surat",
  },
  {
    q: "Energy insights helped us cut our monthly bill noticeably. Support has been excellent.",
    n: "Meera & Arjun",
    r: "Apartment · Mumbai",
  },
  {
    q: "Even when the Wi-Fi drops, the switches keep working. That reliability sold me.",
    n: "Rohan T.",
    r: "Duplex · Pune",
  },
  {
    q: "We control four rooms from one master panel. Guests always ask where we got it.",
    n: "Fatima K.",
    r: "Penthouse · Dubai",
  },
];

export default function Testimonials() {
  const row = [...QUOTES, ...QUOTES];
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber">
          Loved at home
        </p>
      </Reveal>
      <AnimatedHeading
        text="Hear from our customers"
        className="font-display mt-3 max-w-2xl text-4xl font-bold sm:text-5xl"
      />

      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />
        <motion.div
          className="flex gap-5"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 36, ease: "linear" }}
        >
          {row.map((t, i) => (
            <figure
              key={i}
              className="card-shadow w-[340px] shrink-0 rounded-3xl border border-line bg-panel p-7"
            >
              <div className="text-amber">★★★★★</div>
              <blockquote className="mt-4 text-sm leading-relaxed text-text">
                “{t.q}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet to-blue text-sm font-semibold text-white">
                  {t.n[0]}
                </span>
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="text-xs text-muted">{t.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
      <p className="mt-6 text-center text-xs text-muted">
        Sample testimonials shown for demonstration.
      </p>
    </section>
  );
}
