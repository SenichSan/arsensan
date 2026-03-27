"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const servicesData = [
  {
    id: "01",
    title: "UI/UX ARCHITECTURE",
    description: "Проектирование логики, которая ведет клиента к покупке без визуального шума. Wireframes, Prototyping, Design Systems.",
    mediaSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "CREATIVE FRONTEND",
    description: "Анимации уровня Awwwards, WebGL и GSAP. Ваш сайт будет ощущаться как дорогой физический продукт.",
    mediaSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "ROBUST BACKEND",
    description: "Бесшовная интеграция, безопасность данных и архитектура, которая выдержит высокие нагрузки.",
    mediaSrc: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "PERFORMANCE SEO",
    description: "Техническая оптимизация до зеленых зон в Google Lighthouse. Семантика и микроразметка.",
    mediaSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ServicesBlock() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);
  const [activeMedia, setActiveMedia] = useState<number | null>(null);

  // Состояние клика для мобильных устройств
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  useEffect(() => {
    // Вся анимация скейла строго привязана к React состоянию
    if (cursorRef.current) {
      if (activeMedia !== null) {
        // overwrite: "auto" перезапишет ТОЛЬКО другие конфликтующие scale-анимации, не трогая x/y
        gsap.to(cursorRef.current, { scale: 1, duration: 0.5, ease: "back.out(1.5)", overwrite: "auto" });
      } else {
        gsap.to(cursorRef.current, { scale: 0, duration: 0.3, ease: "power2.in", overwrite: "auto" });
      }
    }
  }, [activeMedia]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    
    if (cursorRef.current && !isTouchDevice) {
      gsap.set(cursorRef.current, { scale: 0 });
      
      // Инициализация quickTo
      xTo.current = gsap.quickTo(cursorRef.current, "x", { duration: 0.6, ease: "power3" });
      yTo.current = gsap.quickTo(cursorRef.current, "y", { duration: 0.6, ease: "power3" });
    }

    const mouseMove = (e: MouseEvent) => {
      // Игнорируем mousemove на тач-девайсах
      if (isTouchDevice) return;
      
      // Вычитаем половину ширины и высоты медиа-контейнера для центрирования
      xTo.current?.(e.clientX - 150); 
      yTo.current?.(e.clientY - 200); 
    };

    if (!isTouchDevice) {
      window.addEventListener("mousemove", mouseMove);
    }
    
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const handleItemEnter = (index: number) => {
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;
    setActiveMedia(index);
  };

  const handleItemLeave = () => {
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) return;
    setActiveMedia(null);
  };

  const handleItemClick = (index: number) => {
    const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchDevice) {
      setActiveAccordion(activeAccordion === index ? null : index);
    }
  };

  return (
    <section id="services" className="relative w-full min-h-screen bg-transparent py-24 px-6 md:px-12 cursor-default" data-bg="#F5F0EB" data-text="#1C1917">
      
      {/* Заголовок блока */}
      <div className="w-full mb-8">
        <span className="font-mono text-xs tracking-[0.2em] text-graphite-soft uppercase">
          [ НАШИ КОМПЕТЕНЦИИ ]
        </span>
      </div>

      {/* Список услуг */}
      <ul className="flex flex-col w-full mt-16 group">
        {servicesData.map((service, index) => {
          const isMobileActive = activeAccordion === index;

          return (
            <li 
              key={service.id}
              className="group/item border-b border-graphite/10 py-8 md:py-12 relative flex flex-col justify-center transition-opacity duration-500 hover:!opacity-100 group-hover:opacity-30 cursor-pointer md:cursor-default"
              onMouseEnter={() => handleItemEnter(index)}
              onMouseLeave={handleItemLeave}
              onClick={() => handleItemClick(index)}
            >
              <div className="flex flex-col md:flex-row md:items-start w-full gap-4 md:gap-8 cursor-pointer">
                {/* Номер */}
                <span className="font-mono text-sm text-graphite-soft shrink-0 md:mt-2">
                  {service.id}
                </span>

                <div className="flex flex-col w-full">
                  {/* Огромный заголовок */}
                  <h2 className="text-4xl md:text-7xl font-sans font-black uppercase tracking-tighter">
                    {service.title}
                  </h2>

                  {/* Аккордеон (контент) */}
                  {/* 
                      CSS-математика аккордеона через Grid: 
                      На мобильных: управляется кликами (isMobileActive).
                      На десктопе: управляется чисто CSS hover-ом на li (md:group-hover/item:...) 
                      для идеально гладкого Transition без задержек JS
                  */}
                  <div 
                    className={`grid transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] 
                      ${isMobileActive ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"} 
                      md:grid-rows-[0fr] md:opacity-0 md:group-hover/item:grid-rows-[1fr] md:group-hover/item:opacity-100 md:group-hover/item:mt-4`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-lg md:text-xl text-graphite-soft font-serif max-w-2xl leading-relaxed pb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Плавающий Медиа-Контейнер */}
      <div 
        ref={cursorRef}
        className="media-cursor fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none overflow-hidden scale-0 z-50 hidden md:block rounded-xl bg-surface border border-graphite/10 shadow-2xl"
      >
        {servicesData.map((service, index) => (
          <img
            key={`img-${service.id}`}
            src={service.mediaSrc}
            alt={service.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
              activeMedia === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
