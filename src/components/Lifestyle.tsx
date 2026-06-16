"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1100&q=80",
    title: "Living room",
    copy: "Set the mood for movie night or a bright Sunday brunch with one tap.",
    span: "lg:col-span-2 lg:row-span-2",
    h: "h-full min-h-[420px]",
  },
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    title: "Bedroom",
    copy: "Wake gently to rising light and warm air.",
    span: "",
    h: "h-[200px]",
  },
  {
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    title: "Workspace",
    copy: "Focus lighting and climate that follow your calendar.",
    span: "",
    h: "h-[200px]",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=80",
    title: "The whole home",
    copy: "Leaving? One goodbye scene secures and powers down everything.",
    span: "lg:col-span-2",
    h: "h-[220px]",
  },
];

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <motion.div ref={ref} style={{ y }} className="absolute -inset-y-[11%] inset-x-0">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </motion.div>
  );
}

export default function Lifestyle() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">
          Designed for the way you live
        </p>
      </Reveal>
      <AnimatedHeading
        text="A smarter home, room by room"
        className="font-display mt-3 max-w-2xl text-4xl font-bold sm:text-5xl"
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SHOTS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} className={s.span}>
            <motion.div
              whileHover={{ scale: 1.012 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className={`card-shadow group relative ${s.h} overflow-hidden rounded-3xl border border-line`}
            >
              <ParallaxImage src={s.src} alt={s.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-xl font-bold text-white">
                  {s.title}
                </h3>
                <p className="mt-1 max-w-sm text-sm text-white/80">{s.copy}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
