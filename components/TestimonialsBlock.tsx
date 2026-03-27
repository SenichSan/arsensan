"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reviews = [
  {
    id: 1,
    quote: "Мы теряли треть клиентов на этапе оплаты из-за тяжелого шаблона. Индивидуальная архитектура решила эту проблему за месяц. Конверсия выросла на 40%, а сайт летает.",
    author: "Основатель бренда нишевой парфюмерии"
  },
  {
    id: 2,
    quote: "Наш продукт относится к премиум-сегменту, но старый сайт выглядел дешево. Теперь цифровой опыт полностью соответствует качеству нашего товара. Безупречная эстетика и плавность.",
    author: "Владелец бутика селективной оптики"
  },
  {
    id: 3,
    quote: "Во время дропов новых коллекций наш старый магазин просто ложился. Переход на headless-решение дал нам абсолютную стабильность и банковскую надежность.",
    author: "CEO крафтового ювелирного дома"
  }
];

export default function TestimonialsBlock() {
  const containerRef = useRef<HTMLElement>(null);
  const quotesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Инициализируем стартовые стили: 
      // Все кроме первой цитаты скрыты внизу (y: 50) с нулевой прозрачностью.
      gsap.set(quotesRef.current.slice(1), { opacity: 0, y: 50 });

      // Таймлайн, жестко привязанный к скроллу внешнего 300vh контейнера
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Плавное сглаживание
        }
      });

      // Логика перехода 1 -> 2
      // Первая уходит вверх
      tl.to(quotesRef.current[0], { opacity: 0, y: -50, duration: 1 })
        // Вторая выплывает снизу
        .to(quotesRef.current[1], { opacity: 1, y: 0, duration: 1 }, "<")
        
        // Микропауза для задержки второго отзыва на экране
        .to({}, { duration: 0.5 }) 

        // Логика перехода 2 -> 3
        .to(quotesRef.current[1], { opacity: 0, y: -50, duration: 1 })
        .to(quotesRef.current[2], { opacity: 1, y: 0, duration: 1 }, "<")
        
        // Замыкающая пауза, чтобы последний отзыв оставался на экране до конца секции
        .to({}, { duration: 0.5 });
        
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="testimonials"
      // 300vh — идеальная высота для плавной смены 3 экранов-цитат
      className="relative w-full h-[300vh] bg-transparent select-none"
      data-bg="#F5F0EB"
      data-text="#1C1917"
    >
      {/* Липкий контейнер высотой в 1 экран */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Гигантская Декоративная Кавычка на фоне (лежит в нулевом слое) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span className="text-[50vw] md:text-[40vw] font-serif font-black text-zinc-300/30 leading-none translate-y-16 select-none -translate-x-4 md:-translate-x-8">
            "
          </span>
        </div>

        {/* Контейнер для цитат */}
        <div className="relative w-full max-w-4xl lg:max-w-5xl px-6 md:px-12 z-10 flex items-center justify-center h-full">
          
          {reviews.map((review, index) => (
            <div
              key={review.id}
              ref={(el) => { quotesRef.current[index] = el; }}
              // Абсолютное позиционирование собирает все цитаты строго друг над другом по центру
              className="absolute w-full flex flex-col items-center justify-center text-center"
            >
              {/* Текст цитаты (Editorial Serif Layout) */}
              <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-zinc-900 leading-[1.35] md:leading-[1.4] max-w-[90%] md:max-w-[85%] tracking-tight">
                {review.quote}
              </h3>
              
              {/* Подпись автора как в журнале */}
              <div className="mt-8 md:mt-12 flex flex-col items-center gap-4">
                <div className="w-8 md:w-16 h-[1px] bg-emerald-600/60"></div>
                <span className="font-mono text-[10px] md:text-sm tracking-widest text-zinc-500 uppercase">
                  {review.author}
                </span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
