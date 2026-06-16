/**
 * Brand mark — abstract isometric 3D cube. Three shaded faces in the teal/cyan
 * brand colours with an indigo-pop right face. Tile-less, premium product feel.
 * Used in the navbar and footer.
 */
export default function LogoMark({
  className = "h-9 w-9",
}: {
  className?: string;
}) {
  return (
    <span className={`relative inline-grid shrink-0 place-items-center ${className}`}>
      <svg
        viewBox="0 0 24 24"
        className="h-full w-full [filter:drop-shadow(0_5px_10px_rgba(8,145,178,0.35))]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#67e8f9" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <linearGradient id="cubeLeft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#06b6d4" />
            <stop offset="1" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="cubeRight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6366f1" />
            <stop offset="1" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        {/* top face */}
        <polygon points="12,2.5 20.5,7.25 12,12 3.5,7.25" fill="url(#cubeTop)" />
        {/* left face */}
        <polygon points="3.5,7.25 12,12 12,21.5 3.5,16.75" fill="url(#cubeLeft)" />
        {/* right face */}
        <polygon points="20.5,7.25 12,12 12,21.5 20.5,16.75" fill="url(#cubeRight)" />
        {/* edge highlights for crisp 3D definition */}
        <path
          d="M12 2.5 12 12 M3.5 7.25 12 12 20.5 7.25"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.3"
          strokeWidth="0.4"
        />
      </svg>
    </span>
  );
}
