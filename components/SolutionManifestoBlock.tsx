"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

export default function SolutionManifestoBlock() {
  const containerRef = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return; // Ждем инициализации Lenis перед созданием триггеров

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Запускаем анимацию, когда блок частично в зоне видимости
          onEnter: () => {
            if (lenis && containerRef.current) {
              // Магнитный скролл: жестко и плавно захватываем управление
              lenis.scrollTo(containerRef.current, { 
                duration: 1.2, 
                lock: true, 
                force: true 
              });
            }
          }
        },
      });

      tl.to(".solution-bg", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power2.inOut",
        duration: 1.2,
      }).to(
        ".reveal-text",
        {
          y: "0%",
          stagger: 0.1,
          ease: "power3.out",
          duration: 1,
        },
        "-=0.6" // Начинаем текстовую анимацию чуть раньше для динамики
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lenis]);

  return (
    <section
      ref={containerRef}
      id="solution"
      className="relative w-full h-screen bg-transparent flex items-center justify-center overflow-hidden"
      data-bg="#09090B"
      data-text="#F5F0EB"
      style={{ fontFamily: "'Montserrat', 'Montserrat Fallback', sans-serif" }}
    >
      {/* Слой раскрывающегося фона (Свет) */}
      <div
        className="solution-bg absolute inset-0 bg-[#F5F0EB] w-full h-full origin-center"
        style={{
          clipPath: "polygon(0% 49%, 100% 49%, 100% 51%, 0% 51%)",
        }}
      ></div>

      {/* Контентный слой (Z-Паттерн) */}
      <div className="solution-content relative w-full h-full max-w-screen-2xl mx-auto pointer-events-none">
        
        {/* Элемент 1 (Левый верх) */}
        <div className="absolute top-8 left-8 md:top-16 md:left-16 overflow-hidden">
          <span className="reveal-text block text-xs tracking-[0.2em] text-zinc-900/50 uppercase translate-y-[110%] font-semibold">
            [ ARCHITECTURE: CUSTOM ]
          </span>
        </div>

        {/* Элемент 2 (Левый центр) */}
        <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-16 flex flex-col">
          <div className="overflow-hidden">
            <h2 className="reveal-text block font-black text-6xl md:text-[8vw] leading-[0.85] tracking-tighter text-zinc-900 translate-y-[110%]">
              ENGINEERING
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="reveal-text block font-black text-6xl md:text-[8vw] leading-[0.85] tracking-tighter text-zinc-900/30 translate-y-[110%]">
              OVER SHORTCUTS.
            </h2>
          </div>
        </div>

        {/* Элемент 3 (Правый низ) */}
        <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 w-full max-w-sm overflow-hidden text-right md:text-left">
          <p className="reveal-text block text-lg md:text-xl leading-relaxed text-zinc-900/80 translate-y-[110%] font-medium">
            External beauty is useless without flawless internal logic. We write clean, custom code that drives your business at 60 FPS.
          </p>
        </div>
        
      </div>
    </section>
  );
}
