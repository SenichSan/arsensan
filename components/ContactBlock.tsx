"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Спартанский инпут со строгим floating label на чистом CSS (без JS состояния)
const InputField = ({ id, label, type = "text" }: { id: string; label: string; type?: string }) => (
  <div className="relative w-full group">
    {/* 
      peer — это 핵심 логики. 
      Поле "слушает" состояния focus и placeholder-shown, и передает их label (через peer-focus / peer-placeholder-shown) 
    */}
    <input 
      type={type} 
      id={id}
      placeholder=" "  // Пробел нужен для работы :placeholder-shown в CSS
      className="peer block w-full appearance-none border-0 border-b-2 border-zinc-300 bg-transparent px-0 py-4 md:py-6 text-2xl md:text-3xl lg:text-4xl text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-0 transition-colors rounded-none"
    />
    <label 
      htmlFor={id}
      // Базовое состояние (когда в поле есть текст ИЛИ оно в фокусе): метка "уехала" наверх, стала мелкой и моноширинной
      className="pointer-events-none absolute top-4 md:top-6 left-0 origin-[0] -translate-y-10 scale-[0.65] md:scale-75 transform font-mono text-[10px] md:text-xs tracking-[0.2em] text-zinc-500 uppercase transition-all duration-500 
      
      peer-placeholder-shown:translate-y-0 
      peer-placeholder-shown:scale-100 
      peer-placeholder-shown:font-serif 
      peer-placeholder-shown:text-xl 
      md:peer-placeholder-shown:text-3xl 
      peer-placeholder-shown:tracking-normal 
      peer-placeholder-shown:text-zinc-500 
      peer-placeholder-shown:normal-case 
      
      peer-focus:-translate-y-10 
      peer-focus:scale-[0.65] 
      md:peer-focus:scale-75 
      peer-focus:font-mono 
      peer-focus:text-[10px] 
      md:peer-focus:text-xs 
      peer-focus:tracking-[0.2em] 
      peer-focus:text-zinc-800 
      peer-focus:uppercase"
    >
      {label}
    </label>
  </div>
);

export default function ContactBlock() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Изначально обе колонки скрыты и сдвинуты вниз
      gsap.set([leftColRef.current, rightColRef.current], { opacity: 0, y: 80 });

      // Таймлайн появления (cinematic stagger reveal)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Запуск при попадании на 75% экрана
          toggleActions: "play none none none",
        }
      });

      // Левая колонка (Текст и Контакты) выплывает первой
      tl.to(leftColRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      })
      // Правая колонка (Форма) выплывает с небольшой задержкой (stagger)
      .to(rightColRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=0.8"); 

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="contact"
      className="relative w-full min-h-screen bg-[#F5F0EB] text-[#0F0D0A] flex flex-col justify-center py-24 md:py-32 overflow-hidden"
    >
      {/* 
        Сетка: 2 равные колонки на Desktop (lg:grid-cols-2), 
        с огромным разрывом (gap-20/gap-32)
      */}
      <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 h-full">
        
        {/* =========================================
            Левая Колонка (Title, Desc, Direct Links)
            ========================================= */}
        <div ref={leftColRef} className="flex flex-col justify-between h-full min-h-[40vh] lg:min-h-[70vh]">
          
          <div className="flex flex-col gap-8 md:gap-10 max-w-xl">
            {/* Огромный монументальный заголовок */}
            <h2 className="text-6xl md:text-[6rem] lg:text-[7.5rem] font-black font-sans leading-[0.85] tracking-tighter uppercase text-[#0F0D0A]">
              ОБСУДИТЬ<br />ПРОЕКТ.
            </h2>
            
            {/* Читабельное описание */}
            <p className="font-serif text-xl md:text-2xl text-zinc-600 leading-[1.6] tracking-tight max-w-lg mt-4">
              Оставьте заявку, и я свяжусь с вами в течение 24 часов. Мы разберем вашу текущую архитектуру и найдем точки кратного роста конверсии.
            </p>
          </div>

          {/* Прямые контакты (сдвинуты к низу колонки) */}
          <div className="flex flex-col gap-5 mt-20 lg:mt-0">
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
              Direct Contact
            </span>
            <div className="flex flex-col gap-2">
              <a 
                href="mailto:hello@arsensan.com" 
                className="font-mono text-sm md:text-base tracking-[0.1em] text-zinc-800 hover:text-emerald-700 transition-colors w-max relative group"
              >
                HELLO@ARSENSAN.COM
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-700 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a 
                href="https://t.me/arsensan" 
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm md:text-base tracking-[0.1em] text-zinc-800 hover:text-emerald-700 transition-colors w-max relative group"
              >
                @ARSENSAN_TELEGRAM
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-700 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>

        </div>

        {/* =========================================
            Правая Колонка (Спартанская Форма)
            ========================================= */}
        <div ref={rightColRef} className="flex flex-col justify-center h-full w-full max-w-2xl lg:max-w-none lg:pl-16">
          
          <form className="flex flex-col gap-16 md:gap-24 w-full">
            
            {/* Ровно 3 чистых поля */}
            <InputField id="name" label="Ваше имя" />
            <InputField id="project" label="Ссылка на проект (текущий сайт или дизайн)" />
            <InputField id="contact_info" label="Telegram или Email для связи" />

            {/* Массивная Кнопка */}
            <button 
              type="button" // Заглушка, чтобы страница не перезагружалась при клике
              className="group relative w-full bg-[#0F0D0A] text-[#F5F0EB] py-8 md:py-10 px-8 flex items-center justify-between overflow-hidden rounded-sm hover:bg-emerald-950 transition-colors duration-500 mt-4 md:mt-8"
            >
              <span className="font-sans font-bold text-lg md:text-2xl uppercase tracking-widest relative z-10 transition-colors duration-500 group-hover:text-emerald-400">
                Отправить
              </span>
              <span className="text-3xl md:text-4xl font-light transform transition-transform duration-500 group-hover:translate-x-4 relative z-10 text-emerald-500 group-hover:text-emerald-400">
                →
              </span>
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}
