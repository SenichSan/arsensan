"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Архитектурные данные о процессе разработки
const processSteps = [
  {
    num: "01",
    title: "DISCOVERY",
    marker: "[ АНАЛИТИКА И ПРОЕКТИРОВАНИЕ ]",
    desc: "Изучение бизнес-логики, аудит текущих метрик, создание архитектурного плана и wireframes."
  },
  {
    num: "02",
    title: "DESIGN SYSTEM",
    marker: "[ ВИЗУАЛЬНЫЙ ЯЗЫК ]",
    desc: "Разработка премиального UI/UX, типографики и сетки, которые отражают характер бренда, а не копируют конкурентов."
  },
  {
    num: "03",
    title: "ENGINEERING",
    marker: "[ FRONTEND & BACKEND ]",
    desc: "Написание чистого кастомного кода. Интеграция GSAP-анимаций, настройка headless-архитектуры и базы данных."
  },
  {
    num: "04",
    title: "LAUNCH",
    marker: "[ ТЕСТИРОВАНИЕ И РЕЛИЗ ]",
    desc: "Оптимизация до 100/100 в Lighthouse, нагрузочное тестирование и бесшовный перенос на рабочий домен."
  }
];

export default function ProcessTimelineBlock() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      
      // Таймлайн, завязанный на общий скролл внешнего 400vh контейнера
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // плавное следование (0.5 - 1 секунда задержки за скроллом)
          pin: stickyRef.current, // Прилепляем 100vh контейнер
        }
      });

      // Сдвигаем длину всего трека строго на остаток его ширины относительно экрана
      tl.to(trackRef.current, {
        x: () => {
          if (!trackRef.current || !stickyRef.current) return 0;
          return -(trackRef.current.scrollWidth - stickyRef.current.clientWidth);
        },
        ease: "none",
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="process" 
      // Внешний контейнер на 400vh дает длинный путь для комфортного скроллинга 4х карточек
      className="relative w-full h-[400vh] bg-transparent select-none"
      data-bg="#F5F0EB"
      data-text="#1C1917"
    >
      {/* Липкий контейнер в 1 экран высотой. Обрезаем то, что уходит за экран. */}
      <div 
        ref={stickyRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-center"
      >
        
        {/* Подвижный горизонтальный трек шириной w-max */}
        <div 
          ref={trackRef} 
          className="flex flex-nowrap items-center h-full gap-16 md:gap-32 pl-6 md:pl-24 pr-[10vw] w-max"
        >
          {/* Интро: Главный заголовок секции */}
          <div className="flex flex-col justify-center w-[85vw] md:w-[45vw] lg:w-[35vw] shrink-0 h-full relative">
            <h2 className="text-5xl md:text-7xl lg:text-[7vw] font-black uppercase font-sans leading-[0.85] tracking-tighter text-zinc-100">
              ПРОЦЕСС<br/>СОЗДАНИЯ<br/>МОНОЛИТА
            </h2>
            {/* Стартовая линия прогресса */}
            <div className="absolute top-[60%] md:top-[65%] left-0 w-full h-[1px] bg-zinc-800 -z-10 mt-12"></div>
            <div className="absolute top-[60%] md:top-[65%] right-0 w-2 h-2 rounded-full bg-zinc-700 mt-[47px] md:mt-[47px] translate-x-1/2"></div>
          </div>

          {/* Карточки Этапов */}
          {processSteps.map((step) => (
            <div 
              key={step.num} 
              className="relative flex flex-col justify-center w-[85vw] md:w-[45vw] lg:w-[35vw] shrink-0 h-full"
            >
              <div className="flex flex-col relative z-10 w-full">
                
                {/* Гигантская Нумерация + Мелкий технический маркер */}
                <div className="flex items-end gap-4 md:gap-8 mb-8 md:mb-12">
                  <span className="text-[7rem] md:text-[9rem] font-black text-zinc-800/40 leading-[0.75] tracking-tighter">
                    {step.num}
                  </span>
                  <span className="font-mono text-xs md:text-sm tracking-widest text-zinc-500 uppercase pb-2 md:pb-4 border-b border-emerald-900/50">
                    {step.marker}
                  </span>
                </div>

                {/* Заголовок Этапа */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-zinc-100 mb-4 font-sans">
                  {step.title}
                </h3>

                {/* Описание бизнес-сути */}
                <p className="font-serif text-lg md:text-xl text-zinc-400 leading-relaxed max-w-sm md:max-w-sm">
                  {step.desc}
                </p>

              </div>
              
              {/* Неразрывная пунктирная линия сквозь весь трек (Progress/Connection) */}
              <div className="absolute top-[60%] md:top-[65%] left-0 w-[150%] h-[1px] bg-zinc-800/70 -z-10 mt-12"></div>
            </div>
          ))}

        </div>
        
      </div>
    </section>
  );
}
