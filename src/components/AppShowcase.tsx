"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { LightsIcon, FanIcon } from "./icons";

const ROOMS = ["Living", "Bedroom", "Kitchen", "Office"];

export default function AppShowcase() {
  const [room, setRoom] = useState(0);
  const [lights, setLights] = useState(true);
  const [fan, setFan] = useState(false);
  const [bright, setBright] = useState(70);

  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-soft py-28">
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-80 w-80 rounded-full bg-blue/10 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-blue">
            One app for everything
          </p>
          <h2 className="font-display mt-3 text-4xl font-bold sm:text-5xl">
            Your whole home, in your pocket
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Group rooms, build scenes, schedule routines and watch live energy
            usage — from anywhere. The app stays in sync with every wall panel
            in real time.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              "Voice control with Alexa & Google",
              "Family access with custom permissions",
              "Automations triggered by time, presence or weather",
              "Secure remote access over the cloud",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                <span className="text-muted">{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* CSS phone mockup */}
        <Reveal delay={0.1}>
          <div className="mx-auto w-[300px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="card-shadow rounded-[2.6rem] border border-line bg-panel p-3"
            >
              <div className="rounded-[2.1rem] bg-bg p-5">
                <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-line" />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted">Good evening</p>
                    <p className="font-display text-lg font-bold">Home</p>
                  </div>
                  <span className="h-9 w-9 rounded-full bg-gradient-to-br from-violet to-blue" />
                </div>

                <div className="mt-5 flex gap-2">
                  {ROOMS.map((r, i) => (
                    <button
                      key={r}
                      onClick={() => setRoom(i)}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition ${
                        room === i
                          ? "bg-cta text-cta-fg"
                          : "bg-bg-soft text-muted"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLights((v) => !v)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      lights
                        ? "border-transparent bg-gradient-to-br from-amber/90 to-amber text-black"
                        : "border-line bg-bg-soft text-muted"
                    }`}
                  >
                    <LightsIcon className="h-5 w-5" />
                    <span className="mt-3 block text-xs font-semibold">
                      Lights
                    </span>
                    <span className="text-[10px] opacity-70">
                      {lights ? "On" : "Off"}
                    </span>
                  </button>
                  <button
                    onClick={() => setFan((v) => !v)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      fan
                        ? "border-transparent bg-gradient-to-br from-blue to-violet text-white"
                        : "border-line bg-bg-soft text-muted"
                    }`}
                  >
                    <motion.span
                      animate={{ rotate: fan ? 360 : 0 }}
                      transition={
                        fan
                          ? { repeat: Infinity, duration: 1.2, ease: "linear" }
                          : { duration: 0.3 }
                      }
                      className="block w-fit"
                    >
                      <FanIcon className="h-5 w-5" />
                    </motion.span>
                    <span className="mt-3 block text-xs font-semibold">Fan</span>
                    <span className="text-[10px] opacity-70">
                      {fan ? "Running" : "Off"}
                    </span>
                  </button>
                </div>

                <div className="mt-3 rounded-2xl border border-line bg-bg-soft p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted">Brightness</span>
                    <span className="font-semibold">{bright}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={bright}
                    onChange={(e) => setBright(+e.target.value)}
                    className="mt-3 w-full accent-violet"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between rounded-2xl bg-gradient-to-r from-violet/15 to-blue/15 p-4 text-xs">
                  <span className="text-muted">Today&apos;s energy</span>
                  <span className="font-display text-base font-bold">
                    3.2 kWh
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
