"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function GlobalColorEngine() {
  useGSAP(() => {
    // 1. Find the global wrapper
    const wrapper = document.getElementById("global-color-wrapper");
    if (!wrapper) return;

    // 2. Find all sections with data-bg and data-text attributes
    // In Next.js, sometimes elements are immediately available, but with dynamic content we map all current ones
    const sections = document.querySelectorAll<HTMLElement>("[data-bg]");

    sections.forEach((section) => {
      const bgColor = section.getAttribute("data-bg") || "#F5F0EB";
      const textColor = section.getAttribute("data-text") || "#1C1917";

      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        // Optional markers for debugging if needed:
        // markers: true,
        onEnter: () => {
          gsap.to(wrapper, {
            backgroundColor: bgColor,
            color: textColor,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto"
          });
        },
        onEnterBack: () => {
          gsap.to(wrapper, {
            backgroundColor: bgColor,
            color: textColor,
            duration: 0.8,
            ease: "power2.out",
            overwrite: "auto"
          });
        },
      });
    });

    // Cleanup function automatically handled by useGSAP
  }, []); // Run on mount

  return null; // Headless component
}
