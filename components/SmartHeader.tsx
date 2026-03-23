"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navLinks = [
  { label: "Портфолио", href: "#portfolio" },
  { label: "Процесс",   href: "#process"   },
  { label: "FAQ",       href: "#faq"        },
];

export default function SmartHeader() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Изначально скрыт — появляется при скролле вверх
      gsap.set(headerRef.current, { yPercent: -150, opacity: 0 });

      ScrollTrigger.create({
        start: "top -80",  // Начинаем после 80px скролла вниз
        end: "max",
        onUpdate: (self) => {
          if (self.direction === 1) {
            // Скролл ВНИЗ → скрыть
            gsap.to(headerRef.current, {
              yPercent: -150,
              opacity: 0,
              duration: 0.45,
              ease: "power2.in",
              overwrite: true,
            });
          } else {
            // Скролл ВВЕРХ → показать
            gsap.to(headerRef.current, {
              yPercent: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              overwrite: true,
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <header
      ref={headerRef}
      // Фиксировано вверху по центру, поверх всего
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      {/* Капсула: glassmorphism + rounded-full */}
      <div className="pointer-events-auto flex items-center gap-2 md:gap-5 px-4 py-2 md:px-6 md:py-3 rounded-full bg-[#F5F0EB]/80 backdrop-blur-md border border-white/60 shadow-[0_4px_24px_-4px_rgba(30,20,10,0.12)]">

        {/* Левая зона: Имя / Логотип */}
        <button
          onClick={scrollToTop}
          className="font-sans font-black text-[10px] md:text-xs tracking-[0.22em] uppercase text-zinc-900 hover:text-emerald-700 transition-colors duration-300 whitespace-nowrap"
        >
          ARSEN SAN
        </button>

        {/* Разделитель (только Desktop) */}
        <div className="hidden md:block w-px h-4 bg-zinc-300/80 mx-1" />

        {/* Центральная зона: Навигационные якоря (скрыты на мобильных) */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1 rounded-full font-sans text-xs text-zinc-500 hover:text-zinc-900 hover:bg-white/60 transition-all duration-300 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Разделитель (только Desktop) */}
        <div className="hidden md:block w-px h-4 bg-zinc-300/80 mx-1" />

        {/* Правая зона: CTA кнопка-таблетка */}
        <a
          href="#contact"
          className="flex items-center px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-zinc-900 text-[#F5F0EB] font-sans font-semibold text-[10px] md:text-xs tracking-widest uppercase hover:bg-emerald-900 transition-colors duration-300 whitespace-nowrap"
        >
          LET&apos;S TALK
        </a>

      </div>
    </header>
  );
}
