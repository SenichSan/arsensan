"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ManifestoBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Изначально элементы скрыты и немного сдвинуты вниз
      gsap.set(elementsRef.current, { opacity: 0, y: 50 });

      // Когда блок появляется на 60% высоты экрана (ближе к центру)
      gsap.to(elementsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", 
          toggleActions: "play none none none", // Анимация проигрывается 1 раз
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15, // Плавное поочередное появление (Staggering fade up)
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="manifesto" 
      // Концепция "Храм": Абсолютный минимум, 100vh высоты по центру.
      className="relative w-full min-h-screen bg-[#0F0D0A] flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 overflow-hidden"
    >
      {/* 
        Двухколоночный Editorial макет: Слева портрет, справа манифест с оптимальной длиной абзацев
      */}
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">

        {/* Левая колонка: Фотография */}
        <div 
          ref={addToRefs}
          className="relative w-full md:w-2/3 lg:w-2/5 aspect-[4/5] bg-[#151310] overflow-hidden shrink-0 mt-8 lg:mt-0 rounded-sm"
        >
          {/* Легкий градиент для красивого слияния нижнего края с темным фоном */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0A] via-transparent to-transparent z-10 pointer-events-none" />

          <img 
            src="/my-photo.jpg"
            alt="Arsen San Portrait"
            className="absolute inset-0 w-full h-full object-cover opacity-90 transition-all duration-1000 z-0 grayscale hover:grayscale-0 hover:opacity-100"
          />
        </div>

        {/* Правая колонка: Текст манифеста */}
        <div className="flex-1 flex flex-col items-start gap-12 md:gap-14 w-full">
          
          {/* Маркер */}
          <span 
            ref={addToRefs} 
            className="font-mono text-xs md:text-sm tracking-[0.2em] text-zinc-500 uppercase"
          >
            [ МАНИФЕСТ ]
          </span>

          {/* Основной текст */}
          <div className="flex flex-col gap-8 md:gap-10 w-full max-w-2xl">
            <p 
              ref={addToRefs} 
              className="font-serif text-xl md:text-2xl lg:text-[1.7rem] text-zinc-300/95 leading-[1.65] md:leading-[1.7] tracking-tight"
            >
              Я не строю конвейер и не передаю проекты младшим специалистам. Я работаю один, как независимый веб-разработчик и дизайнер. Это моя обитель, и здесь каждый пиксель создается вручную.
            </p>
            
            <p 
              ref={addToRefs} 
              className="font-serif text-xl md:text-2xl lg:text-[1.7rem] text-zinc-300/95 leading-[1.65] md:leading-[1.7] tracking-tight"
            >
              Вы продаете идею, эстетику и премиальный продукт. Моя задача — построить для вас цифровой монолит, который будет транслировать вашу легенду и конвертировать трафик с хирургической точностью.
            </p>

            <p 
              ref={addToRefs} 
              className="font-serif text-xl md:text-2xl lg:text-[1.7rem] text-zinc-300/95 leading-[1.65] md:leading-[1.7] tracking-tight"
            >
              Бутиковый подход к коду для владельцев бутикового бизнеса. Прямой контакт, кастомная архитектура и математически выверенный дизайн.
            </p>
          </div>

          {/* Подпись и Кнопка CTA */}
          <div 
            ref={addToRefs} 
            className="flex flex-col md:flex-row items-start lg:items-center justify-between w-full max-w-2xl mt-8 md:mt-12 gap-8 md:gap-12"
          >
            {/* Имя / Бренд */}
            <div className="flex flex-col">
              <span className="font-mono text-sm tracking-widest text-zinc-400 uppercase">
                ARSEN SAN
              </span>
              <span className="font-mono text-[10px] tracking-widest text-zinc-600 uppercase mt-1">
                ARCHITECT & ENGINEER
              </span>
            </div>
            
            {/* Кнопка */}
            <a 
              href="#contact"
              className="group relative inline-flex items-center gap-4 px-8 py-4 border border-zinc-800 rounded-full hover:bg-[#F5F0EB] hover:text-[#0F0D0A] transition-all duration-500"
            >
              <span className="font-mono text-xs tracking-widest uppercase transition-colors duration-500">
                Начать диалог
              </span>
              <span className="text-xl font-light leading-none transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

        </div>
        
      </div>
    </section>
  );
}
