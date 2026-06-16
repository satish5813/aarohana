"use client";

import dynamic from "next/dynamic";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

function Placeholder() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="card-shadow relative flex aspect-[5/7] w-[clamp(220px,70%,300px)] flex-col justify-between overflow-hidden rounded-[30px] border border-line bg-white p-6">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-70 blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.35), transparent 70%)",
          }}
        />
        {/* brand mark */}
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-line" />
          <span className="h-2 w-2 rounded-full bg-violet" />
        </div>
        {/* touch keys */}
        <div className="grid grid-cols-2 gap-5 py-2">
          {[
            "from-violet to-blue",
            "from-amber to-amber",
            "from-violet to-blue",
            "from-violet to-blue",
          ].map((c, i) => (
            <span
              key={i}
              className={`mx-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br ${c} shadow-[0_8px_20px_-8px_rgba(106,75,255,0.6)]`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
            </span>
          ))}
        </div>
        {/* slider + status */}
        <div className="space-y-3">
          <div className="h-2 w-full rounded-full bg-line">
            <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-violet to-blue" />
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1fd18a]" />
            <span className="text-[10px] font-medium text-muted">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// App-Router-safe lazy load: ssr:false avoids hydration mismatch and the
// "Router action dispatched before initialization" error that React.lazy +
// manual mount gating triggered during hydration.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <Placeholder />,
});

export default function HeroCanvas() {
  return (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-[90px]" />
      </div>
      <CanvasErrorBoundary fallback={<Placeholder />}>
        <HeroScene />
      </CanvasErrorBoundary>
    </div>
  );
}
