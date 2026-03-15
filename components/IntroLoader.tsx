"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { useLenis } from "@/components/SmoothScroll";

const LOADER_TEXT = "ArsenSan";
const MIN_DISPLAY_MS = 2500;

export default function IntroLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const hasRun = useRef(false);
  const lenis = useLenis();

  const setLetterRef = useCallback(
    (index: number) => (el: HTMLSpanElement | null) => {
      lettersRef.current[index] = el;
    },
    []
  );

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    /* ── Respect prefers-reduced-motion ── */
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      skipIntro();
      return;
    }

    /* ── Stop scrolling during intro ── */
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";

    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const startTime = Date.now();

    /* ── Phase 1: Typewriter + Color Saturation ── */
    gsap.set(letters, { opacity: 0, y: 10 });

    const phase1 = gsap.timeline();

    // typewriter: letters appear one-by-one
    phase1.to(letters, {
      opacity: 1,
      y: 0,
      duration: 0.06,
      stagger: 0.14,
      ease: "power2.out",
    });

    // subtle glow pulse once text is fully typed
    phase1.to(letters, {
      textShadow: "0 0 24px rgba(245, 240, 235, 0.5)",
      duration: 0.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 1,
    });

    // hold & wait for page load + minimum display time
    phase1.add(() => {
      const waitForReady = () =>
        new Promise<void>((resolve) => {
          const check = () => {
            const elapsed = Date.now() - startTime;
            const ready = document.readyState === "complete";
            if (ready && elapsed >= MIN_DISPLAY_MS) {
              resolve();
            } else {
              requestAnimationFrame(check);
            }
          };
          check();
        });

      waitForReady().then(() => runPhase2());
    });

    /* ── Phase 2: Stamp / Imprint ── */
    function runPhase2() {
      const navLogo = document.querySelector<HTMLElement>("[data-intro-logo]");
      const loaderText = overlayRef.current?.querySelector<HTMLElement>(
        "[data-loader-text]"
      );
      const wrapper = document.querySelector<HTMLElement>(
        "[data-intro-wrapper]"
      );

      if (!navLogo || !loaderText || !overlayRef.current) {
        // fallback: simple fade-out
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => runPhase3(),
        });
        return;
      }

      // measure positions
      const navRect = navLogo.getBoundingClientRect();
      const loaderRect = loaderText.getBoundingClientRect();

      // compute scale ratio (nav logo is smaller)
      const navFontSize = parseFloat(getComputedStyle(navLogo).fontSize);
      const loaderFontSize = parseFloat(getComputedStyle(loaderText).fontSize);
      const scale = navFontSize / loaderFontSize;

      const stamp = gsap.timeline({
        onComplete: () => {
          // seamless swap: hide animated text, reveal real navbar logo
          loaderText.style.visibility = "hidden";
          navLogo.style.opacity = "1";
          if (overlayRef.current) overlayRef.current.style.display = "none";
          runPhase3();
        },
      });

      // fly text from center to nav logo position
      stamp.to(loaderText, {
        x:
          navRect.left -
          loaderRect.left +
          (navRect.width - loaderRect.width * scale) / 2,
        y:
          navRect.top -
          loaderRect.top +
          (navRect.height - loaderRect.height * scale) / 2,
        scale,
        color: "#1C1917",
        duration: 0.6,
        ease: "power4.out",
      });

      // shake on impact (medium intensity)
      if (wrapper) {
        stamp.to(
          wrapper,
          { x: 2, duration: 0.04, ease: "none", yoyo: true, repeat: 5 },
          "-=0.15"
        );
        stamp.set(wrapper, { x: 0, clearProps: "x" });
      }

      // fade overlay
      stamp.to(
        overlayRef.current,
        { opacity: 0, duration: 0.35, ease: "power2.inOut" },
        "-=0.3"
      );
    }

    /* ── Phase 3: Shockwave Reveal ── */
    function runPhase3() {
      const revealEls = gsap.utils.toArray<HTMLElement>("[data-intro-reveal]");
      const navEls = gsap.utils.toArray<HTMLElement>(
        "[data-intro-nav-reveal]"
      );

      const reveal = gsap.timeline({
        onComplete: () => {
          // unlock scroll
          document.documentElement.style.overflow = "";
          lenis?.start();
          // clean up inline styles left by GSAP
          [...revealEls, ...navEls].forEach((el) => {
            el.style.willChange = "auto";
          });
        },
      });

      // hero elements burst from depth
      if (revealEls.length) {
        reveal.fromTo(
          revealEls,
          {
            y: (i: number) => 40 + i * 12,
            scale: 0.96,
            opacity: 0,
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "back.out(1.4)",
            stagger: 0.1,
          },
          "reveal"
        );
      }

      // navbar elements slide in from top
      if (navEls.length) {
        reveal.fromTo(
          navEls,
          {
            y: -25,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.06,
          },
          "reveal"
        );
      }
    }

    /* ── Fallback: skip everything instantly ── */
    function skipIntro() {
      if (overlayRef.current) overlayRef.current.style.display = "none";
      document
        .querySelectorAll<HTMLElement>("[data-intro-reveal]")
        .forEach((el) => (el.style.opacity = "1"));
      document
        .querySelectorAll<HTMLElement>("[data-intro-nav-reveal]")
        .forEach((el) => (el.style.opacity = "1"));
      const navLogo = document.querySelector<HTMLElement>("[data-intro-logo]");
      if (navLogo) navLogo.style.opacity = "1";
      document.documentElement.style.overflow = "";
      lenis?.start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis]);

  return (
    <div ref={overlayRef} className="intro-overlay" aria-hidden="true">
      <div
        data-loader-text=""
        className="intro-loader-text"
        style={{ fontFamily: "var(--font-sans)" }}
        role="status"
        aria-live="polite"
      >
        {LOADER_TEXT.split("").map((char, i) => (
          <span
            key={i}
            ref={setLetterRef(i)}
            className="inline-block"
            style={{ willChange: "opacity, transform" }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
