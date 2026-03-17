"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────
   Glitch keyframes injected once as a module-level <style>.
   Uses chromatic-aberration text-shadow + micro-translate.
───────────────────────────────────────────────────────────── */
const GLITCH_CSS = `
@keyframes glitch-shift {
  0%   { transform: translate(0); text-shadow: 0 0 0 transparent; }
  10%  { transform: translate(-3px, 1px); text-shadow: 2px 0 rgba(220,38,38,0.7), -2px 0 rgba(99,102,241,0.7); }
  20%  { transform: translate(3px, -1px); text-shadow: -2px 0 rgba(220,38,38,0.7), 2px 0 rgba(99,102,241,0.7); }
  30%  { transform: translate(-2px, 2px); text-shadow: 2px 0 rgba(220,38,38,0.5), -2px 0 rgba(99,102,241,0.5); }
  40%  { transform: translate(2px, 0px); text-shadow: none; }
  50%  { transform: translate(-1px, -1px); text-shadow: 1px 0 rgba(220,38,38,0.4), -1px 0 rgba(99,102,241,0.4); }
  60%  { transform: translate(0); text-shadow: none; }
  100% { transform: translate(0); text-shadow: none; }
}
.glitch-text {
  animation: glitch-shift 0.5s steps(1) forwards;
}
`;

interface SlowLoadingVisualProps {
  isActive: boolean;
}

export default function SlowLoadingVisual({ isActive }: SlowLoadingVisualProps) {
  const [isPulsing, setIsPulsing] = useState(true);
  const [showError, setShowError] = useState(false);
  const [glitchReady, setGlitchReady] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── CSS injection ── */
  useEffect(() => {
    if (document.getElementById("slow-loading-glitch-css")) return;
    const tag = document.createElement("style");
    tag.id = "slow-loading-glitch-css";
    tag.textContent = GLITCH_CSS;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  /* ── Main animation loop ── */
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;

    const clearAll = () => {
      tlRef.current?.kill();
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
    };

    const runCycle = () => {
      bar.style.width = "0%";
      bar.style.backgroundColor = "#1C1917";
      setIsPulsing(true);
      setShowError(false);
      setGlitchReady(false);

      const tl = gsap.timeline({
        onComplete: () => {
          /* ── 3.5s: Glitch trigger ── */
          bar.style.backgroundColor = "#1C1917"; // stays dark, no red
          setIsPulsing(false);
          setShowError(true);
          /* trigger glitch animation on next frame */
          requestAnimationFrame(() => setGlitchReady(true));

          /* ── Loop: wait 3s then restart ── */
          loopTimerRef.current = setTimeout(() => {
            if (isActive) runCycle();
          }, 3000);
        },
      });

      tlRef.current = tl;

      /* Phase 1 — 0s → 1.5s: rush to 85% */
      tl.to(bar, {
        width: "85%",
        duration: 1.5,
        ease: "power2.out",
      });

      /* Phase 2 — 1.5s → 3.5s: grind to 99% */
      tl.to(bar, {
        width: "99%",
        duration: 2.0,
        ease: "power4.out",
      });
    };

    if (isActive) {
      runCycle();
    } else {
      clearAll();
      if (bar) bar.style.width = "0%";
      setIsPulsing(true);
      setShowError(false);
      setGlitchReady(false);
    }

    return clearAll;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className="relative w-72 rounded-2xl bg-[#EDE7E0] shadow-[0_24px_60px_rgba(28,25,23,0.12)] overflow-hidden">

      {/* ── Progress Bar ── */}
      <div className="relative h-[2px] w-full bg-black/8">
        <div
          ref={progressBarRef}
          className="absolute left-0 top-0 h-full rounded-full"
          style={{ width: "0%", backgroundColor: "#1C1917" }}
        />
      </div>

      {/* ── Card Body ── */}
      <div className={`p-6 flex flex-col gap-4 ${isPulsing ? "animate-pulse" : ""}`}>

        {/* Browser chrome dots */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="w-2 h-2 rounded-full bg-black/15 inline-block" />
          <span className="w-2 h-2 rounded-full bg-black/15 inline-block" />
          <span className="w-2 h-2 rounded-full bg-black/15 inline-block" />
        </div>

        {/* Avatar + meta row */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-black/8 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-3.5 rounded bg-black/10 w-3/5" />
            <div className="h-2.5 rounded bg-black/7 w-2/5" />
          </div>
        </div>

        {/* Image placeholder */}
        <div className="w-full h-28 rounded-xl bg-black/7" />

        {/* Text lines */}
        <div className="flex flex-col gap-2">
          <div className="h-2.5 rounded bg-black/8 w-full" />
          <div className="h-2.5 rounded bg-black/8 w-5/6" />
          <div className="h-2.5 rounded bg-black/8 w-3/4" />
        </div>

        {/* Button skeleton */}
        <div className="mt-1 h-9 rounded-full bg-black/10 w-2/5" />
      </div>

      {/* ── Error Overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl backdrop-blur-[2px] bg-[#EDE7E0]/70 transition-opacity duration-300"
        style={{ opacity: showError ? 1 : 0, pointerEvents: showError ? "auto" : "none" }}
      >
        {/* Status label */}
        <p
          className="text-[10px] font-medium tracking-[0.3em] uppercase text-black/30 mb-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Connection Status
        </p>

        {/* Glitch error text */}
        <p
          className={`text-[13px] font-black uppercase tracking-[0.2em] text-graphite ${glitchReady ? "glitch-text" : ""}`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          [ TIMEOUT ERROR ]
        </p>

        {/* Thin divider */}
        <div className="mt-4 w-10 h-[1px] bg-black/15" />

        {/* Sub-label */}
        <p
          className="mt-3 text-[10px] tracking-widest uppercase text-black/25"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Server did not respond
        </p>
      </div>
    </div>
  );
}
