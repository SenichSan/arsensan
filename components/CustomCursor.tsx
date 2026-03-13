"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * CustomCursor
 *
 * A two-layer cursor:
 * 1. `dot`  — tiny 6px dot that snaps exactly to the real pointer position
 * 2. `ring` — 40px circle that follows with GSAP inertia (duration: 0.6s ease)
 *
 * mix-blend-mode: difference on the ring makes it invert whatever is under it —
 * pure white on dark backgrounds, dark on light, indigo pill on ivory, etc.
 *
 * Hover state:
 * Add `data-cursor="hover"` to any interactive element to scale the ring up.
 * Add `data-cursor="text"` to collapse the ring to a slim I-beam bar.
 */

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide the native cursor site-wide
    document.documentElement.style.cursor = "none";

    let mouseX = -100;
    let mouseY = -100;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    // Ring follows with lag
    gsap.to(ring, {
      duration: 0,
      x: -100,
      y: -100,
    });

    const ticker = () => {
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    };

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", onMove);

    // ----- Hover effects -----
    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      const type = target.dataset.cursor;
      if (type === "hover" || target.closest("a, button, [role='button']")) {
        gsap.to(ring, { scale: 2.2, duration: 0.3, ease: "power2.out" });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      }
      if (type === "text") {
        gsap.to(ring, { scaleX: 0.08, scaleY: 1.2, duration: 0.3, ease: "power2.out", borderRadius: "2px" });
      }
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, scaleX: 1, scaleY: 1, duration: 0.4, ease: "elastic.out(1, 0.6)", borderRadius: "50%" });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    // Mouse leave / enter window
    const onWindowLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };
    const onWindowEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mouseleave", onWindowLeave);
    document.addEventListener("mouseenter", onWindowEnter);

    return () => {
      document.documentElement.style.cursor = "";
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mouseleave", onWindowLeave);
      document.removeEventListener("mouseenter", onWindowEnter);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-graphite will-change-transform"
      />

      {/* Ring — follows with inertia, inverts colors via mix-blend-mode */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-[40px] w-[40px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-graphite will-change-transform mix-blend-difference"
      />
    </>
  );
}
