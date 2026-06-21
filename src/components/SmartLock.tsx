"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import AnimatedHeading from "./AnimatedHeading";

// Real Zeswin smart-door-lock installations, curated best-first.
const GALLERY = [
  { src: "/lock-keypad.jpeg", caption: "Fingerprint, PIN & RFID access" },
  { src: "/lock-display.jpeg", caption: "Smart display, one-touch open" },
  { src: "/lock-handle.jpeg", caption: "Premium matte-black lever" },
  { src: "/lock-mechanism.jpeg", caption: "Multi-point mortise locking" },
  { src: "/lock-installed.jpeg", caption: "Seamless on-door fit" },
  { src: "/lock-box.jpeg", caption: "Keyless convenience, in the box" },
  { src: "/lock-fit.jpeg", caption: "Professional installation" },
  { src: "/lock-strike.jpeg", caption: "Precision strike plate" },
  { src: "/lock-onsite.jpeg", caption: "On-site fitting by our team" },
] as const;

const FEATURES = [
  "Fingerprint, PIN, RFID card & key",
  "Anti-peep password & tamper alarm",
  "Auto-lock & remote unlock via app",
  "Multi-point mortise for real security",
];

export default function SmartLock() {
  const [active, setActive] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section id="smart-lock" className="relative overflow-hidden bg-bg py-28">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-[420px] w-[420px] rounded-full bg-blue/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6">
        {/* header */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber">
                Smart Door Lock
              </p>
            </Reveal>
            <AnimatedHeading
              text="Keyless convenience, real security"
              className="font-display mt-3 text-4xl font-bold sm:text-5xl"
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-muted lg:pb-2">
              Walk up and you&apos;re in — fingerprint, PIN, card or app. Our
              smart locks pair a premium matte finish with a hardened
              multi-point mortise, so the door that greets you also guards you.
              Below are real installations from homes across India.
            </p>
          </Reveal>
        </div>

        {/* feature chips */}
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap gap-3">
            {FEATURES.map((f) => (
              <span
                key={f}
                className="glass card-shadow inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-text"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue to-violet" />
                {f}
              </span>
            ))}
          </div>
        </Reveal>

        {/* pro image gallery */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={(i % 3) * 0.06}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border border-line bg-panel card-shadow"
              >
                <Image
                  src={g.src}
                  alt={g.caption}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <p className="translate-y-1 text-sm font-semibold text-white opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {g.caption}
                  </p>
                </div>
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

      </div>

      {/* unified split card: description + clear portrait video in one card */}
      <div className="mx-auto mt-20 max-w-7xl px-6">
        <Reveal>
          <div className="card-shadow overflow-hidden rounded-[2.4rem] border border-line bg-panel">
            <div className="grid items-stretch md:grid-cols-2">
              {/* left — copy */}
              <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-violet/10 px-3.5 py-1.5 text-xs font-medium text-violet">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
                  </span>
                  Live demo
                </span>
                <h3 className="font-display mt-5 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]">
                  See it in action
                </h3>
                <p className="mt-4 max-w-md text-muted">
                  One touch, a fingerprint or the app — watch the smart lock
                  recognise you and open in real time. Smooth, silent and
                  secure, every single time.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Instant fingerprint recognition",
                    "Auto-locks the moment the door shuts",
                    "Unlock remotely from anywhere",
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-sm font-medium text-text"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gradient-to-r from-blue to-violet text-white">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="h-3 w-3"
                        >
                          <path
                            d="M20 6 9 17l-5-5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="mt-8 inline-flex w-fit rounded-full bg-cta px-7 py-3.5 text-sm font-semibold text-cta-fg transition-transform hover:scale-[1.03]"
                >
                  Book a demo
                </a>
              </div>

              {/* right — video stage built into the same card */}
              <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0c0b12] via-[#141225] to-[#241a3a] p-8 sm:p-10">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/30 blur-[90px]" />
                <div
                  className="relative aspect-[9/16] h-[420px] max-h-[72vh] overflow-hidden rounded-[1.6rem] border border-white/10 shadow-2xl sm:h-[500px]"
                >
                  <video
                    ref={videoRef}
                    src="/1.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
                  >
                    {muted ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          d="M11 5 6 9H2v6h4l5 4V5z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="m23 9-6 6M17 9l6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                      >
                        <path
                          d="M11 5 6 9H2v6h4l5 4V5z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* lightbox */}
      {active !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <button
            aria-label="Close"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col items-center"
          >
            <div className="relative h-[78vh] w-full">
              <Image
                src={GALLERY[active].src}
                alt={GALLERY[active].caption}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-white/80">
              {GALLERY[active].caption}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
