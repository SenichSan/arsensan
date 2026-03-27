"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portfolioCases = [
  {
    id: "01",
    title: "THE MONOLITH",
    description: "E-commerce платформа.",
    metrics: ["Конверсия: +42%", "Скорость: 0.8s"],
    mediaSrc: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "AERIS",
    description: "Сайт премиального бренда мебели.",
    metrics: ["WebGL", "GSAP"],
    mediaSrc: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "KINETIC",
    description: "Корпоративный портал финтех-компании.",
    metrics: ["React", "Node.js"],
    mediaSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  }
];

export default function PortfolioBlock() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const cases = gsap.utils.toArray<HTMLElement>(".portfolio-case");
      
      cases.forEach((el) => {
        const imageWrapper = el.querySelector(".portfolio-image-wrapper");
        const image = el.querySelector(".parallax-image");
        const textElements = el.querySelectorAll(".portfolio-text-reveal");

        // 1. Анимация параллакса для картинки с scrub
        if (imageWrapper && image) {
          gsap.fromTo(
            image,
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: imageWrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }

        // 2. Раскрытие текста при скролле вниз
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
              },
            }
          );
        }
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="portfolio" 
      className="relative w-full bg-transparent py-32 px-6 md:px-12 overflow-hidden"
      data-bg="#F5F0EB"
      data-text="#1C1917"
    >
      {/* Заголовок секции */}
      <div className="w-full flex flex-col items-start mb-24 md:mb-32 portfolio-case">
        <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase portfolio-text-reveal">
          [ ИЗБРАННЫЕ РАБОТЫ ]
        </span>
        <h2 className="mt-6 text-6xl md:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase font-sans portfolio-text-reveal">
          ДОКАЗАТЕЛЬСТВА.
        </h2>
      </div>

      {/* Список проектов */}
      <div className="flex flex-col w-full">
        {portfolioCases.map((item, index) => {
          // Чередование макета: у каждого второго (с визуальным индексом 2, то есть i=1)
          // меняем порядок блоков Flexbox на reverse для десктопов
          const isEven = index % 2 !== 0; 

          return (
            <div 
              key={item.id} 
              className={`portfolio-case flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 mb-32 md:mb-48 last:mb-0 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              
              {/* Блок Фотографии (50-60%) */}
              <div className="portfolio-image-wrapper relative w-full md:w-3/5 h-[50vh] md:h-[70vh] overflow-hidden bg-zinc-200 rounded-xl">
                <img
                  src={item.mediaSrc}
                  alt={item.title}
                  className="parallax-image absolute top-0 left-0 w-full h-[130%] object-cover scale-110 transform origin-center"
                />
              </div>

              {/* Блок Текста (30-40%) */}
              <div className="portfolio-text w-full md:w-2/5 flex flex-col items-start">
                <span className="portfolio-text-reveal font-mono text-sm text-zinc-500 mb-6">
                  {item.id}
                </span>

                <h3 className="portfolio-text-reveal font-serif text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight mb-8">
                  {item.title}
                </h3>

                <p className="portfolio-text-reveal font-serif text-xl md:text-2xl text-zinc-700 leading-relaxed mb-12">
                  {item.description}
                </p>

                <div className="portfolio-text-reveal w-full flex flex-row flex-wrap gap-8 py-6 border-t border-zinc-300 mb-12">
                  {item.metrics.map((metric, i) => (
                    <span key={i} className="font-mono text-xs uppercase tracking-wider text-zinc-600">
                      {metric}
                    </span>
                  ))}
                </div>

                <a 
                  href={`#case-${item.id}`} 
                  className="portfolio-text-reveal group relative inline-flex items-center text-sm font-semibold uppercase tracking-widest transition-colors hover:text-blue-600"
                >
                  <span className="relative pb-1 border-b border-zinc-900 group-hover:border-blue-600 transition-colors">
                    Смотреть проект
                  </span>
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    -&gt;
                  </span>
                </a>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
