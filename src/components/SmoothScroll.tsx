"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    // Lenis hijacks scrolling, so native anchor jumps (#products, #contact …)
    // no longer work. Intercept in-page links and drive Lenis directly,
    // offsetting for the fixed navbar so headings aren't tucked underneath.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey)
        return;
      const link = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      const hash = link?.getAttribute("href");
      if (!hash) return;

      if (hash === "#") {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
        history.pushState(null, "", " ");
        return;
      }

      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -88, duration: 1.2 });
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
