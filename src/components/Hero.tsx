"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  LightsIcon,
  ClimateIcon,
  SecurityIcon,
  EnergyIcon,
  CurtainsIcon,
  FanIcon,
} from "./icons";

const APPLIANCES = [
  { label: "Lights", Icon: LightsIcon },
  { label: "Climate", Icon: ClimateIcon },
  { label: "Curtains", Icon: CurtainsIcon },
  { label: "Fans", Icon: FanIcon },
  { label: "Security", Icon: SecurityIcon },
  { label: "Energy", Icon: EnergyIcon },
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
});

function FloatCard({
  className,
  delay,
  children,
}: {
  className: string;
  delay: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`pointer-events-none absolute z-20 ${className}`}
    >
      <div className={`float-slow ${delay}`}>
        <div className="glass card-shadow rounded-2xl px-4 py-3">{children}</div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-paper pb-20 pt-28">
      {/* vibrant aurora + perspective grid backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-30 aurora-modern opacity-90" />
      <div className="pointer-events-none absolute inset-0 -z-20 grid-fade opacity-[0.35]" />
      {/* drifting glow orbs */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="orb absolute -left-24 top-10 h-[460px] w-[460px] rounded-full bg-blue/20 blur-[140px]" />
        <div className="orb absolute right-[-12%] top-[28%] h-[480px] w-[480px] rounded-full bg-violet/20 blur-[150px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 lg:grid-cols-[1.05fr_1fr]">
        {/* copy */}
        <div>
          <motion.span
            {...fade(0)}
            className="glass card-shadow inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-text"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky" />
            </span>
            Now shipping across India
            <span className="h-3 w-px bg-line" />
            <span className="font-semibold text-glow">7-year warranty</span>
          </motion.span>

          <motion.h1
            {...fade(0.08)}
            className="font-display mt-6 text-[2.9rem] font-bold leading-[1.03] tracking-[-0.03em] text-text sm:text-6xl lg:text-[5rem]"
          >
            Welcome,
            <br />
            smarter <span className="text-glow">than ever.</span>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mt-7 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            At Aarotech, we transform ordinary spaces into intelligent living
            environments with smarter automation solutions tailored to your
            needs — without rewiring and without complexity.
          </motion.p>

          <motion.div
            {...fade(0.24)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#products"
              className="btn-grad group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                aria-hidden
              />
              Explore the range
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#ecosystem"
              className="glass card-shadow group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold text-text transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full btn-grad text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-0.5 h-3 w-3"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              See it in action
            </a>
          </motion.div>

          <motion.p
            {...fade(0.27)}
            className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted"
          >
            <span className="font-semibold text-glow">
              Start your automation from just ₹48,000
            </span>
            <span className="hidden h-3 w-px bg-line sm:inline-block" />
            <span>no rewiring, no hassle</span>
          </motion.p>

          <motion.div
            {...fade(0.3)}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Controls
            </span>
            <div className="flex items-center gap-2">
              {APPLIANCES.map(({ label, Icon }) => (
                <span
                  key={label}
                  title={label}
                  className="group glass grid h-9 w-9 place-items-center rounded-xl text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-text hover:shadow-[0_8px_20px_-6px_rgba(124,95,247,0.5)]"
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fade(0.42)}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[
                  { i: "AR", c: "bg-[#5b7cfa]" },
                  { i: "VK", c: "bg-[#22d3ee]" },
                  { i: "MA", c: "bg-[#a855f7]" },
                  { i: "RT", c: "bg-[#6366f1]" },
                ].map((a) => (
                  <span
                    key={a.i}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-bg ${a.c} text-[10px] font-semibold text-white shadow-sm`}
                  >
                    {a.i}
                  </span>
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-amber" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-3.5 w-3.5"
                    >
                      <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.1l-4.94 2.6.94-5.49-4-3.9 5.53-.8L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <div className="mt-0.5 text-xs text-muted">
                  4.9/5 · loved by 120k+ homes
                </div>
              </div>
            </div>
            <div className="h-10 w-px bg-line" />
            <div className="flex gap-8">
              {[
                ["45+", "Cities"],
                ["9+", "Years"],
                ["99.9%", "Uptime"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-xl font-bold text-glow">
                    {n}
                  </div>
                  <div className="text-xs text-muted">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* premium product showcase */}
        <div className="relative h-[58vh] min-h-[440px] lg:h-[64vh] lg:min-h-[520px]">
          {/* luminous halo behind the frame */}
          <div className="glow-ring pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[84%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[34px]" />

          {/* gradient-bordered dark frame holding the hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group card-shadow relative h-full w-full overflow-hidden rounded-[2rem] p-[1.5px] [background:linear-gradient(135deg,rgba(34,211,238,0.7),rgba(99,102,241,0.6),rgba(168,85,247,0.5))]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-white">
              {/* soft brand wash so the white product shot has depth */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(34,211,238,0.12),transparent_60%)]" />
              <Image
                src="/HeroWhite.png"
                alt="Aarotech smart-home product family — touch panels, hub, smart lock, sensors and the companion app"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center p-5 transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] sm:p-8"
              />
              {/* subtle bottom fade to ground the products */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/[0.05] to-transparent" />
            </div>
          </motion.div>

          {/* glossy reflection under the frame */}
          <div
            className="pointer-events-none absolute -bottom-5 left-1/2 -z-10 h-16 w-3/4 -translate-x-1/2 rounded-[50%] blur-2xl"
            style={{ background: "rgba(124,95,247,0.32)" }}
          />

          {/* floating glass accent cards */}
          <FloatCard className="-left-3 top-[12%] sm:-left-5" delay="">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-sky/20 text-sky">
                <EnergyIcon className="h-4.5 w-4.5" />
              </span>
              <div>
                <div className="text-[11px] text-muted">Energy saved</div>
                <div className="font-display text-lg font-bold leading-none text-text">
                  up to 25%
                </div>
              </div>
            </div>
          </FloatCard>

          <FloatCard className="-right-3 bottom-[12%] sm:-right-5" delay="delay-2">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet/20 text-violet">
                <SecurityIcon className="h-4.5 w-4.5" />
              </span>
              <div>
                <div className="text-[11px] text-muted">Front door</div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-text">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                  Secured
                </div>
              </div>
            </div>
          </FloatCard>
        </div>
      </div>

      {/* animated scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted">
          Scroll
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1.5">
          <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-violet" />
        </span>
      </motion.div>
    </section>
  );
}
