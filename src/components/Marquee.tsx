const ITEMS = [
  "Voice & app control",
  "End-to-end encrypted",
  "Energy intelligence",
  "Retrofit ready",
  "Works offline",
  "OTA updates",
  "Scene automation",
  "7-year warranty",
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg-soft py-5">
      <div className="flex w-max animate-marquee gap-12">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-sm font-medium text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
