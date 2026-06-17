"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

type Scene = {
  id: string;
  label: string;
  icon: string;
  sky: string; // what you see through the window
  wall: string; // room wall colour
  ambient: string; // soft room light wash
  dim: number; // 0 bright -> 0.7 night darkness
  curtain: number; // 0 closed -> 100 fully open
  lamp: number; // 0 off -> 1 full glow
  stats: { lights: string; curtain: string; climate: string; security: string };
  actions: string[];
};

const SCENES: Scene[] = [
  {
    id: "morning",
    label: "Morning",
    icon: "☀",
    sky: "linear-gradient(180deg,#bfe0ff,#fef3da)",
    wall: "#f1ece2",
    ambient: "rgba(255,221,150,0.18)",
    dim: 0,
    curtain: 100,
    lamp: 0,
    stats: { lights: "60%", curtain: "Open", climate: "23°C", security: "Disarmed" },
    actions: [
      "Curtains drawn fully open",
      "Bedroom lights fade up to 60%",
      "Geyser & coffee maker on",
      "Climate set to 23°C",
    ],
  },
  {
    id: "movie",
    label: "Movie Night",
    icon: "🎬",
    sky: "linear-gradient(180deg,#181a2b,#0c0d16)",
    wall: "#1a1726",
    ambient: "rgba(106,75,255,0.4)",
    dim: 0.5,
    curtain: 0,
    lamp: 0.3,
    stats: { lights: "15%", curtain: "Closed", climate: "22°C", security: "Disarmed" },
    actions: [
      "Curtains drawn closed",
      "Ceiling lights off, cove lights 15%",
      "TV & sound bar powered on",
      "Do-not-disturb enabled",
    ],
  },
  {
    id: "goodnight",
    label: "Goodnight",
    icon: "🌙",
    sky: "linear-gradient(180deg,#0b1430,#070912)",
    wall: "#0e1322",
    ambient: "rgba(79,139,255,0.22)",
    dim: 0.66,
    curtain: 0,
    lamp: 0.12,
    stats: { lights: "Off", curtain: "Closed", climate: "Sleep", security: "Armed" },
    actions: [
      "All lights off except pathway",
      "Doors locked, alarm armed",
      "Climate to sleep curve",
      "Energy-saver mode on",
    ],
  },
  {
    id: "away",
    label: "Away",
    icon: "🏃",
    sky: "linear-gradient(180deg,#9fb4c9,#dfe6ee)",
    wall: "#e7e9ec",
    ambient: "rgba(0,0,0,0)",
    dim: 0.12,
    curtain: 50,
    lamp: 0,
    stats: { lights: "Off", curtain: "Half", climate: "Eco", security: "Armed" },
    actions: [
      "Everything powered down",
      "Security cameras armed",
      "Presence simulation enabled",
      "Leak & smoke alerts active",
    ],
  },
];

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-bg-soft px-3 py-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <AnimatePresence mode="wait">
        <motion.p
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className="font-display mt-0.5 text-sm font-bold"
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default function Scenes() {
  const [active, setActive] = useState(1);
  const s = SCENES[active];

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">
          One tap, whole-home
        </p>
      </Reveal>
      <AnimatedHeading
        text="Scenes that set the moment"
        className="font-display mt-3 max-w-2xl text-4xl font-bold sm:text-5xl"
      />
      <Reveal delay={0.1}>
        <p className="mt-4 max-w-2xl text-muted">
          A scene is one tap that moves your whole home together — lights,
          curtains, climate and security. Pick a scene below and watch the living
          room respond in real time.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* ── Left: live room preview ───────────────────────── */}
        <div>
          <div className="card-shadow relative h-[420px] overflow-hidden rounded-3xl border border-line">
            {/* room back wall */}
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundColor: s.wall }}
              transition={{ duration: 0.8 }}
            />
            {/* floor */}
            <div className="absolute inset-x-0 bottom-0 h-[28%] bg-black/15" />
            <div className="absolute inset-x-0 bottom-[28%] h-px bg-white/15" />

            {/* window with curtains that draw open and closed */}
            <div className="absolute left-12 top-14 h-48 w-60 overflow-hidden rounded-xl border-[3px] border-black/25 shadow-inner">
              <motion.div
                className="absolute inset-0"
                animate={{ background: s.sky }}
                transition={{ duration: 0.9 }}
              />
              {/* window cross frame */}
              <div className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-black/20" />
              <div className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-black/20" />

              {/* left curtain panel — gathers to the side when open */}
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg,#7c89ad 0px,#aab4d2 6px,#c6cee5 9px,#9aa6c6 13px,#7c89ad 18px)",
                  boxShadow: "inset -10px 0 16px -8px rgba(0,0,0,0.4)",
                }}
                animate={{ width: `${8 + ((100 - s.curtain) / 100) * 42}%` }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* right curtain panel */}
              <motion.div
                className="absolute inset-y-0 right-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg,#9aa6c6 0px,#c6cee5 6px,#aab4d2 9px,#7c89ad 13px,#9aa6c6 18px)",
                  boxShadow: "inset 10px 0 16px -8px rgba(0,0,0,0.4)",
                }}
                animate={{ width: `${8 + ((100 - s.curtain) / 100) * 42}%` }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* curtain rod across the top */}
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-b from-[#5b6680] to-[#3c4358]" />
            </div>

            {/* floor lamp with a real glowing bulb */}
            <div className="absolute bottom-[28%] right-16 flex flex-col items-center">
              <motion.div
                className="h-12 w-12 rounded-full"
                animate={{
                  backgroundColor: `rgba(255,200,128,${0.25 + s.lamp})`,
                  boxShadow: `0 0 ${20 + s.lamp * 70}px ${
                    8 + s.lamp * 26
                  }px rgba(255,196,120,${s.lamp * 0.85})`,
                }}
                transition={{ duration: 0.8 }}
              />
              <div className="h-1 w-12 rounded bg-black/40" />
              <div className="h-24 w-1 bg-black/40" />
              <div className="h-1.5 w-12 rounded bg-black/50" />
            </div>

            {/* sofa */}
            <div className="absolute bottom-[20%] left-14 h-20 w-56">
              <div className="absolute bottom-0 h-12 w-full rounded-xl bg-black/30" />
              <div className="absolute bottom-7 h-12 w-full rounded-t-2xl bg-black/25" />
              <div className="absolute bottom-3 left-3 h-9 w-9 rounded-lg bg-white/10" />
              <div className="absolute bottom-3 right-3 h-9 w-9 rounded-lg bg-white/10" />
            </div>

            {/* night dimming wash */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[#05060c]"
              animate={{ opacity: s.dim }}
              transition={{ duration: 0.8 }}
            />
            {/* ambient colour wash */}
            <motion.div
              className="pointer-events-none absolute inset-0"
              animate={{ backgroundColor: s.ambient }}
              transition={{ duration: 0.8 }}
            />

            {/* labels */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
              <span>{s.icon}</span>
              <span>Living room · {s.label}</span>
            </div>
            <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1fd18a]" />
              Live preview
            </div>
          </div>

          {/* live home state */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatChip label="Lights" value={s.stats.lights} />
            <StatChip label="Curtains" value={s.stats.curtain} />
            <StatChip label="Climate" value={s.stats.climate} />
            <StatChip label="Security" value={s.stats.security} />
          </div>
        </div>

        {/* ── Right: scene picker + what happens ─────────────── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Tap a scene
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {SCENES.map((sc, i) => (
              <button
                key={sc.id}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`card-shadow flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                  active === i
                    ? "border-transparent bg-cta text-cta-fg"
                    : "border-line bg-panel text-text hover:bg-bg-soft"
                }`}
              >
                <span className="text-xl">{sc.icon}</span>
                <span className="text-sm font-semibold">{sc.label}</span>
              </button>
            ))}
          </div>

          <div className="card-shadow mt-5 rounded-2xl border border-line bg-panel p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              What happens when you tap “{s.label}”
            </p>
            <ul className="mt-4 space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {s.actions.map((a, i) => (
                    <motion.li
                      key={a}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-violet/12 text-[11px] text-violet">
                        ✓
                      </span>
                      <span className="text-muted">{a}</span>
                    </motion.li>
                  ))}
                </motion.div>
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
