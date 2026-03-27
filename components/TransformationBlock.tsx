"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TransformationBlock() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Используем gsap.context для очистки
    const ctx = gsap.context(() => {
      
      // Таймлайн привязан к скроллу внешнего контейнера (300vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Плавный скраббинг
        },
      });

      // Анимация 1: Раскрываем маску слоя 2 (справа налево до 100%)
      tl.to(".layer-after", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
      }, 0);

      // Анимация 2: Двигаем линию сканера синхронно с краем маски (от 100% до 0%)
      tl.fromTo(".scanner-line", 
        { left: "100%" },
        { left: "0%", ease: "none" },
        0
      );
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Выносим общие классы сетки, чтобы оба слоя были пиксель-в-пиксель идентичны
  const layoutClasses = "absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-12 lg:p-24 pointer-events-none";
  const gridClasses = "grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 w-full max-w-7xl mx-auto items-center pointer-events-auto";
  
  return (
    <section 
      ref={containerRef} 
      id="transformation"
      className="relative w-full h-[300vh] bg-transparent select-none"
      data-bg="#F5F0EB"
      data-text="#1C1917"
    >
      {/* Залипающий контейнер ровно в 1 экран */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        
        {/* =========================================
            СЛОЙ 1: "ДО" (Цена Шаблона) - Нижний
            ========================================= */}
        <div className={`${layoutClasses} bg-zinc-950 text-zinc-400 z-0`}>
          <div className={gridClasses}>
            
            {/* Левая колонка */}
            <div className="flex flex-col gap-6 items-start">
              <h2 className="text-5xl md:text-7xl lg:text-[7vw] font-black font-sans leading-[0.85] tracking-tighter text-zinc-700 uppercase">
                ЦЕНА<br/>ШАБЛОНА
              </h2>
              <p className="font-serif text-lg md:text-xl leading-relaxed text-zinc-500 max-w-md mt-4">
                Зависимость от сторонних плагинов, конфликты при каждом обновлении и неминуемая потеря горячих клиентов на этапе мучительно долгой загрузки скриптов.
              </p>
            </div>

            {/* Правая колонка (Метрики) */}
            <div className="flex flex-col gap-8 md:pl-12 lg:pl-24 font-mono w-full">
              <div className="flex flex-col gap-2 border-l border-red-900/40 pl-6 py-2">
                <span className="text-xs uppercase tracking-widest text-zinc-600">Загрузка контента</span>
                <span className="text-4xl lg:text-5xl font-light text-red-500/70">4.8s</span>
              </div>
              <div className="flex flex-col gap-2 border-l border-red-900/40 pl-6 py-2">
                <span className="text-xs uppercase tracking-widest text-zinc-600">Показатель отказов</span>
                <span className="text-4xl lg:text-5xl font-light text-red-500/70">68%</span>
              </div>
              <div className="flex flex-col gap-2 border-l border-red-900/40 pl-6 py-2">
                <span className="text-xs uppercase tracking-widest text-zinc-600">Lighthouse Score</span>
                <span className="text-4xl lg:text-5xl font-light text-red-500/70">34/100</span>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            СЛОЙ 2: "ПОСЛЕ" (Монолитная Архитектура) - Верхний маскированный слой
            ========================================= */}
        <div 
          className={`layer-after ${layoutClasses} bg-[#F5F0EB] text-zinc-900 z-10 pointer-events-none`}
          // Изначально стянуто в ноль справа
          style={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" }} 
        >
          <div className={gridClasses}>
            
            {/* Левая колонка */}
            <div className="flex flex-col gap-6 items-start">
              <h2 className="text-5xl md:text-7xl lg:text-[7vw] font-black font-sans leading-[0.85] tracking-tighter text-zinc-900 uppercase">
                МОНОЛИТНАЯ<br/>АРХИТЕКТУРА
              </h2>
              <p className="font-serif text-lg md:text-xl leading-relaxed text-zinc-700 max-w-md mt-4">
                Чистый кастомный код, абсолютная нулевая избыточность и математическая точность каждого пикселя. Система работает как единый молниеносный механизм.
              </p>
            </div>

            {/* Правая колонка (Метрики) */}
            <div className="flex flex-col gap-8 md:pl-12 lg:pl-24 font-mono w-full">
              <div className="flex flex-col gap-2 border-l border-emerald-500/50 pl-6 py-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Загрузка контента</span>
                <span className="text-4xl lg:text-5xl font-medium text-emerald-600">0.6s</span>
              </div>
              <div className="flex flex-col gap-2 border-l border-emerald-500/50 pl-6 py-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Показатель отказов</span>
                <span className="text-4xl lg:text-5xl font-medium text-emerald-600">12%</span>
              </div>
              <div className="flex flex-col gap-2 border-l border-emerald-500/50 pl-6 py-2">
                <span className="text-xs uppercase tracking-widest text-zinc-500">Lighthouse Score</span>
                <span className="text-4xl lg:text-5xl font-medium text-emerald-600">100/100</span>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            ДЕКОР: ЛИНИЯ СКАНИРОВАНИЯ
            ========================================= */}
        <div 
          className="scanner-line absolute top-0 w-[2px] h-full bg-emerald-500 shadow-[0_0_20px_4px_rgba(16,185,129,0.5)] z-20 pointer-events-none" 
          style={{ left: "100%", transform: "translateX(-50%)" }}
        />

      </div>
    </section>
  );
}
