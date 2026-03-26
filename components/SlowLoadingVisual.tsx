"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────
   Glitch keyframes injected once as a module-level <style>.
   We use a stark, chromatic-aberration text-shadow glitch.
───────────────────────────────────────────────────────────── */
const ECOM_GLITCH_CSS = `
@keyframes ecom-glitch {
  0%   { transform: translate(0); text-shadow: 0 0 0 transparent; }
  10%  { transform: translate(-3px, 1px); text-shadow: 2px 0 rgba(220,38,38,0.7), -2px 0 rgba(70,70,70,0.7); }
  20%  { transform: translate(3px, -1px); text-shadow: -2px 0 rgba(220,38,38,0.7), 2px 0 rgba(70,70,70,0.7); }
  30%  { transform: translate(-2px, 2px); text-shadow: 2px 0 rgba(220,38,38,0.5), -2px 0 rgba(70,70,70,0.5); }
  40%  { transform: translate(2px, 0px); text-shadow: none; }
  50%  { transform: translate(-1px, -1px); text-shadow: 1px 0 rgba(220,38,38,0.4), -1px 0 rgba(70,70,70,0.4); }
  60%  { transform: translate(0); text-shadow: none; }
  100% { transform: translate(0); text-shadow: none; }
}
.ecom-glitch-text {
  animation: ecom-glitch 0.5s steps(1) forwards;
}
`;

interface SlowLoadingVisualProps {
  isActive: boolean;
}

export default function SlowLoadingVisual({ isActive }: SlowLoadingVisualProps) {
  // Staggering the load states based on weight to simulate realism
  const [layoutLoaded, setLayoutLoaded] = useState(false);
  const [textLoaded, setTextLoaded] = useState(false);
  const [heavyPulsing, setHeavyPulsing] = useState(true);
  const [showError, setShowError] = useState(false);
  const [glitchReady, setGlitchReady] = useState(false);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const errorOverlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── CSS injection ── */
  useEffect(() => {
    if (document.getElementById("ecom-glitch-css")) return;
    const tag = document.createElement("style");
    tag.id = "ecom-glitch-css";
    tag.textContent = ECOM_GLITCH_CSS;
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
      // Reset state
      bar.style.width = "0%";
      bar.style.backgroundColor = "#1C1917"; // Graphite
      setLayoutLoaded(false);
      setTextLoaded(false);
      setHeavyPulsing(true);
      setShowError(false);
      setGlitchReady(false);

      const tl = gsap.timeline({
        onComplete: () => {
          /* ── 4.0s: Glitch / Error trigger ── */
          setHeavyPulsing(false);
          setShowError(true);
          requestAnimationFrame(() => setGlitchReady(true));

          /* ── Loop: wait 3.5s then restart ── */
          loopTimerRef.current = setTimeout(() => {
            if (isActive) runCycle();
          }, 3500);
        },
      });

      tlRef.current = tl;

      /* Phase 1 — Header/Layout load (0s -> 0.6s) */
      tl.to(bar, {
        width: "30%",
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setLayoutLoaded(true),
      });

      /* Phase 2 — Text data loads (0.6s -> 1.2s) */
      tl.to(bar, {
        width: "60%",
        duration: 0.6,
        ease: "power1.inOut",
        onComplete: () => setTextLoaded(true),
      });

      /* Phase 3 — Images/Heavy JS struggle and fail (1.2s -> 4.0s) */
      tl.to(bar, {
        width: "98%",
        duration: 2.8,
        ease: "power4.out",
      });
    };

    if (isActive) {
      loopTimerRef.current = setTimeout(runCycle, 200);
    } else {
      clearAll();
      if (bar) bar.style.width = "0%";
    }

    return clearAll;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div className="relative w-full h-[640px] rounded-2xl bg-[#F6F4F0] shadow-2xl overflow-hidden border border-black/5">
      
      {/* ── Progress Bar ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-graphite/5 z-20">
        <div
          ref={progressBarRef}
          className="absolute left-0 top-0 h-full"
          style={{ width: "0%", backgroundColor: "#1C1917" }}
        />
      </div>

      {/* ── Safari Chrome Header ── */}
      <div className="h-12 border-b border-black/5 flex items-center px-4 bg-white/60 backdrop-blur-md">
        <div className="flex gap-1.5 w-16">
          <div className="w-3 h-3 rounded-full bg-black/15 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-black/15 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-black/15 shadow-sm" />
        </div>
        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-[16rem] h-6 rounded-md bg-black/5 flex items-center px-3 gap-2">
            <div className="w-3 h-3 shrink-0 rounded-full bg-black/10" /> {/* dummy lock icon */}
            <div className="w-full h-2 rounded bg-black/10 mx-auto" />
          </div>
        </div>
        <div className="w-16 flex justify-end">
          <div className="w-4 h-4 rounded bg-black/10" />
        </div>
      </div>

      {/* ── E-Commerce Interface ── */}
      <div className="flex flex-col h-[calc(100%-3rem)] bg-[#F8F6F3]">
        
        {/* Store Header */}
        <div className={`px-8 py-5 border-b border-black/5 flex justify-between items-center bg-white transition-opacity duration-500 ${!layoutLoaded ? "animate-pulse opacity-50" : "opacity-100"}`}>
          <div className="flex gap-4 items-center">
            <div className="w-5 h-5 rounded-sm bg-graphite/10" /> {/* Hamburger */}
            <div className="w-5 h-5 rounded-full bg-graphite/10" /> {/* Search */}
          </div>
          <div className="w-28 h-6 rounded-sm bg-graphite/20" /> {/* Main Logo */}
          <div className="flex gap-4 items-center">
            <div className="w-5 h-5 rounded-full bg-graphite/10" /> {/* Account */}
            <div className="w-5 h-5 rounded bg-graphite/15 relative">
               <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo/40" />
            </div> {/* Cart */}
          </div>
        </div>

        {/* Store Body Container */}
        <div className="flex flex-1 p-8 gap-8">
          
          {/* Left: Images */}
          <div className="w-[45%] flex flex-col gap-4">
            
            {/* Breadcrumbs */}
            <div className={`flex gap-2 items-center transition-opacity duration-500 ${!layoutLoaded ? "animate-pulse opacity-40" : "opacity-100"}`}>
              <div className="w-10 h-2.5 rounded bg-graphite/15" />
              <div className="w-1.5 h-1.5 rounded-full bg-graphite/10" />
              <div className="w-16 h-2.5 rounded bg-graphite/15" />
              <div className="w-1.5 h-1.5 rounded-full bg-graphite/10" />
              <div className="w-20 h-2.5 rounded bg-graphite/20" />
            </div>

            {/* Main Product Image (Heavy) */}
            <div className={`w-full aspect-[3/4] rounded-lg bg-graphite/10 relative overflow-hidden ${heavyPulsing ? "animate-pulse" : ""}`}>
              {/* Fake picture loading icon in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-lg border-2 border-graphite/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-graphite/5" />
                </div>
              </div>
            </div>

            {/* Thumbnails (Heavy) */}
            <div className={`flex gap-3 justify-between ${heavyPulsing ? "animate-pulse" : ""}`}>
              <div className="w-[30%] aspect-square rounded-md bg-graphite/15" />
              <div className="w-[30%] aspect-square rounded-md bg-graphite/10" />
              <div className="w-[30%] aspect-square rounded-md bg-graphite/10" />
            </div>
            
          </div>

          {/* Right: Product Details */}
          <div className="w-[55%] flex flex-col">
            
            {/* Title & Brand */}
            <div className={`flex flex-col gap-3 mb-6 transition-opacity duration-500 ${!textLoaded ? "animate-pulse opacity-30" : "opacity-100"}`}>
              <div className="w-24 h-3 rounded bg-graphite/15" /> {/* Brand name */}
              <div className="w-full h-8 rounded-md bg-graphite/25" /> {/* Title Line 1 */}
              <div className="w-3/4 h-8 rounded-md bg-graphite/25" /> {/* Title Line 2 */}
            </div>

            {/* Price & Rating */}
            <div className={`flex justify-between items-center mb-8 transition-opacity duration-500 ${!textLoaded ? "animate-pulse opacity-30" : "opacity-100"}`}>
              <div className="w-28 h-7 rounded bg-graphite/30" /> {/* Price */}
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full bg-graphite/20" />
                ))}
                <div className="w-8 h-3.5 rounded bg-graphite/10 ml-1" />
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-graphite/5 mb-6" />

            {/* Options Selector (Heavy JS) */}
            <div className={`flex flex-col gap-4 mb-8 ${heavyPulsing ? "animate-pulse" : ""}`}>
              <div className="flex gap-2">
                <div className="w-16 h-3 rounded bg-graphite/20" />
                <div className="w-12 h-3 rounded bg-graphite/10" />
              </div>
              
              {/* Colors */}
              <div className="flex gap-3 mb-2">
                <div className="w-8 h-8 rounded-full border-2 border-graphite/20 bg-graphite/10" />
                <div className="w-8 h-8 rounded-full bg-graphite/15" />
                <div className="w-8 h-8 rounded-full bg-graphite/5" />
              </div>

              {/* Sizes */}
              <div className="flex flex-wrap gap-2">
                <div className="w-10 lg:w-12 xl:w-14 h-10 shrink-0 rounded border border-graphite/15" />
                <div className="w-10 lg:w-12 xl:w-14 h-10 shrink-0 rounded border border-graphite/15 bg-graphite/5" />
                <div className="w-10 lg:w-12 xl:w-14 h-10 shrink-0 rounded border border-graphite/15" />
                <div className="w-10 lg:w-12 xl:w-14 h-10 shrink-0 rounded border border-graphite/15" />
              </div>
            </div>

            {/* Actions (Stuck on loading) */}
            <div className={`flex flex-col xl:flex-row gap-3 mb-8 ${heavyPulsing ? "animate-pulse" : ""}`}>
              <div className="w-14 h-14 rounded-md bg-graphite/10 flex items-center justify-center"> {/* Quantity */}
                 <div className="w-6 h-1 rounded-sm bg-graphite/20" />
              </div>
              <div className="flex-1 h-14 rounded-md bg-graphite/80 flex items-center justify-center relative overflow-hidden"> {/* Add To Cart */}
                <div className="w-24 h-3.5 rounded bg-white/30" />
                {/* Shimmer effect inside button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] animate-[shimmer_2s_infinite]" />
              </div>
            </div>

            {/* Accordion Details (Text loads, but maybe content doesn't) */}
            <div className={`flex flex-col gap-3 mt-auto mb-2 transition-opacity duration-500 ${!textLoaded ? "animate-pulse opacity-30" : "opacity-100"}`}>
              <div className="w-full pb-3 border-b border-graphite/10 flex justify-between items-center">
                <div className="w-32 h-3.5 rounded bg-graphite/20" />
                <div className="w-3 h-3 rounded-sm bg-graphite/15" />
              </div>
              <div className="w-full pb-3 border-b border-graphite/10 flex justify-between items-center">
                <div className="w-24 h-3.5 rounded bg-graphite/15" />
                <div className="w-3 h-3 rounded-sm bg-graphite/10" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Error Overlay ── */}
      <div
        ref={errorOverlayRef}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-md bg-ivory/80 transition-all duration-300"
        style={{ opacity: showError ? 1 : 0, pointerEvents: showError ? "auto" : "none" }}
      >
        <div className="relative p-10 max-w-sm w-full bg-white rounded-2xl shadow-xl border border-red-500/10 text-center flex flex-col items-center">
          
          {/* Warning Icon Graphic */}
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <div className="w-8 h-8 rounded-full border-2 border-red-500 flex flex-col items-center justify-center gap-1.5">
               <div className="w-1 h-3 bg-red-500 rounded-sm" />
               <div className="w-1 h-1 bg-red-500 rounded-full" />
            </div>
          </div>

          <p
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-graphite/40 mb-3"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Connection Status
          </p>

          <p
            className={`text-2xl font-black uppercase tracking-widest text-[#DC2626] mb-4 ${glitchReady ? "ecom-glitch-text" : ""}`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Timeout
          </p>
          
          <div className="w-full h-[1px] bg-graphite/10 my-2 relative overflow-hidden">
             <div className={`absolute top-0 left-0 h-full w-1/3 bg-red-500/40 ${showError ? 'translate-x-[200%] transition-transform duration-1000' : ''}`} />
          </div>

          <p
            className="mt-4 text-xs font-medium tracking-wide text-graphite-soft/80 leading-relaxed max-w-[200px]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Heavy assets failed to respond.<br/>Client session dropped.
          </p>
          
          {/* Fake Retry Button */}
          <div className="mt-8 px-6 py-2.5 rounded-full border border-graphite/15 text-[10px] font-bold tracking-wider uppercase text-graphite/40">
            Retry Connection
          </div>
        </div>
      </div>

    </div>
  );
}
