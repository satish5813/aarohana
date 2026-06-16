"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";
import { PRODUCTS, type Product } from "@/lib/products";

function Card({ p, index }: { p: Product; index: number }) {
  const [v, setV] = useState(0);
  const href = `/products/${p.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
      whileHover={{ y: -8 }}
      className="card-shadow group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-panel p-6 lg:w-[330px]"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br from-[#00d6e6]/15 to-[#2f6bff]/10 blur-2xl opacity-70 transition-opacity group-hover:opacity-100" />

      <Link
        href={href}
        aria-label={`View ${p.name}`}
        className="relative flex h-52 items-center justify-center"
      >
        <span className="absolute right-2 top-2 z-10 rounded-full border border-line bg-bg-soft/80 px-2.5 py-1 text-[10px] font-semibold brand-text opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          View details ↗
        </span>
        <motion.div
          key={v}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          whileHover={{ scale: 1.06 }}
          className="relative h-52 w-full"
        >
          <Image
            src={p.variants[v].src}
            alt={`${p.name} smart device`}
            fill
            sizes="330px"
            className="object-contain drop-shadow-[0_18px_30px_rgba(14,17,23,0.18)]"
          />
        </motion.div>
      </Link>

      {p.variants.length > 1 && (
        <div className="mt-3 flex justify-center gap-2.5">
          {p.variants.map((vr, i) => (
            <button
              key={vr.color}
              onClick={() => setV(i)}
              aria-label={`${p.name} colour ${i + 1}`}
              className="relative grid h-5 w-5 place-items-center rounded-full"
            >
              {v === i && (
                <span className="absolute inset-0 rounded-full ring-2 ring-[#2f6bff] ring-offset-2 ring-offset-panel" />
              )}
              <span
                className="h-4 w-4 rounded-full ring-1 ring-line"
                style={{ backgroundColor: vr.color }}
              />
            </button>
          ))}
        </div>
      )}

      <Link href={href} className="mt-4 block">
        <p className="text-xs font-medium brand-text">{p.tagline}</p>
        <h3 className="font-display mt-1 text-2xl font-bold">{p.name}</h3>
        <p className="mt-2 min-h-[44px] text-sm leading-relaxed text-muted">
          {p.desc}
        </p>
        <span className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-text">
          View details
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </Link>
    </motion.article>
  );
}

export default function Products() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * 360, behavior: "smooth" });

  return (
    <section id="products" className="py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] brand-text">
                The range
              </p>
            </Reveal>
            <AnimatedHeading
              text="Explore our categories"
              className="font-display mt-3 text-4xl font-bold sm:text-5xl"
            />
          </div>
          <div className="hidden gap-3 sm:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => scroll(d)}
                aria-label={d === -1 ? "Previous" : "Next"}
                className="card-shadow grid h-11 w-11 place-items-center rounded-full border border-line bg-panel text-lg transition hover:bg-bg-soft"
              >
                {d === -1 ? "‹" : "›"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-bg to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg to-transparent sm:w-24" />
        <div
          ref={track}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
        >
          {PRODUCTS.map((p, i) => (
            <Card key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
