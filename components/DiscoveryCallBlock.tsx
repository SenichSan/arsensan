"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function DiscoveryCallBlock() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Изначально прозрачно и сдвинуто (правая колонка с календарем ниже)
      gsap.set(leftColRef.current, { opacity: 0 });
      gsap.set(rightColRef.current, { opacity: 0, y: 50 });

      // Анимация привязанная к скроллу
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Срабатывает, когда секция на 75% высоты viewport
          toggleActions: "play none none none", // Анимация проигрывается один раз
        }
      });

      // 1. Плавное проявление левой колонки со Смыслами
      tl.to(leftColRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
      })
      // 2. Всплытие календаря с задержкой (эффект левитации)
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
      id="discovery"
      // Большие отступы, светлый теплый оттенок фона
      className="relative w-full py-24 md:py-32 lg:py-48 bg-[#FDFBF7] text-zinc-900 overflow-hidden"
    >
      {/* 
        Асимметричный CSS Grid: 
        12 колонок. Левая занимает 5 (41%), Правая 7 (58%). 
        На мобильных устройствах — вертикальная стопка (grid-cols-1).
      */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
        
        {/* =========================================
            Левая Колонка: Смыслы и Ценность
            ========================================= */}
        <div ref={leftColRef} className="lg:col-span-5 flex flex-col items-start gap-8 md:gap-10">
          
          {/* Акцентный маркер */}
          <span className="font-mono text-[10px] md:text-sm tracking-[0.2em] text-indigo-900 uppercase">
            [ DISCOVERY CALL ]
          </span>

          {/* Главный заголовок (Elegant Serif) */}
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-zinc-900">
            НЕТ ВРЕМЕНИ<br />НА БРИФЫ?
          </h2>

          {/* Читабельное описание */}
          <p className="font-sans text-lg md:text-xl text-zinc-600 leading-[1.6] max-w-md">
            Забронируйте 15 минут. Без презентаций и продаж. Мы просто откроем ваш текущий магазин, найдем узкие места в архитектуре и обсудим, как кастомный монолит увеличит вашу конверсию.
          </p>

          {/* Плашка доверия с Аватаром */}
          <div className="flex items-center gap-4 md:gap-6 mt-4 p-4 md:p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-zinc-200/50 shadow-sm w-max">
            {/* Круглая маска */}
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-zinc-200 shrink-0 border border-zinc-100 shadow-inner">
              <img 
                src="/my-photo.jpg" 
                alt="Arsen San" 
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </div>
            {/* Подпись */}
            <p className="font-serif text-sm md:text-base text-zinc-700 leading-snug lg:leading-normal max-w-[200px]">
              15 минут аудио или видео.<br className="hidden lg:block"/>Прямой разговор с архитектором.
            </p>
          </div>

        </div>

        {/* =========================================
            Правая Колонка: Интерфейс Календаря
            ========================================= */}
        <div ref={rightColRef} className="lg:col-span-7 w-full flex justify-center lg:justify-end">
          
          {/* 
            Soft UI Card: Идеально белый фон, очень мягкая огромная рассеянная тень, 
            скругление rounded-3xl. Без резких бордеров.
          */}
          <div className="w-full max-w-2xl bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(30,41,59,0.08)] border border-zinc-50 flex flex-col md:flex-row gap-8 md:gap-12">
            
            {/* 1. Сетка месяца (Стилизация) */}
            <div className="flex-1 flex flex-col">
              
              {/* Шапка календаря */}
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-sans font-semibold text-lg text-zinc-900">Май 2026</h4>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:bg-zinc-50 transition-colors">{"<"}</button>
                  <button className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-800 hover:bg-zinc-50 transition-colors">{">"}</button>
                </div>
              </div>

              {/* Дни недели */}
              <div className="grid grid-cols-7 gap-2 mb-4 text-center">
                {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map(day => (
                  <span key={day} className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">{day}</span>
                ))}
              </div>

              {/* Даты */}
              <div className="grid grid-cols-7 gap-y-4 gap-x-1 md:gap-x-2 text-center text-sm md:text-base font-sans">
                {/* Неактивные прошлые дни */}
                <div className="p-2 text-zinc-300">27</div>
                <div className="p-2 text-zinc-300">28</div>
                <div className="p-2 text-zinc-300">29</div>
                <div className="p-2 text-zinc-300">30</div>
                {/* Активные дни */}
                <div className="p-2 text-zinc-400">1</div>
                <div className="p-2 text-zinc-400">2</div>
                <div className="p-2 text-zinc-400">3</div>
                <div className="p-2 text-zinc-800 font-medium cursor-pointer hover:bg-zinc-50 rounded-lg transition-colors">4</div>
                
                {/* Выбранный день (Индиго точка) */}
                <div className="relative p-2 text-indigo-700 font-bold cursor-pointer group hover:bg-indigo-50 rounded-lg transition-colors bg-indigo-50/50">
                  5
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"></span>
                </div>
                
                <div className="p-2 text-zinc-800 font-medium cursor-pointer hover:bg-zinc-50 rounded-lg transition-colors">6</div>
                <div className="relative p-2 text-zinc-800 font-medium cursor-pointer group hover:bg-zinc-50 rounded-lg transition-colors">
                  7
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-zinc-300 rounded-full group-hover:bg-indigo-300 transition-colors"></span>
                </div>
                <div className="p-2 text-zinc-400">8</div>
                <div className="p-2 text-zinc-400">9</div>
                <div className="p-2 text-zinc-400">10</div>
                {/* Оставшиеся дни */}
                {Array.from({length: 17}).map((_, i) => (
                  <div key={i} className="p-2 text-zinc-400 hover:bg-zinc-50 rounded-lg cursor-pointer transition-colors max-w-full">
                    {11 + i}
                  </div>
                ))}
              </div>
            </div>

            {/* Разделитель */}
            <div className="hidden md:block w-[1px] bg-zinc-100 my-4 shrink-0"></div>
            <div className="md:hidden w-full h-[1px] bg-zinc-100 shrink-0"></div>

            {/* 2. Пилюли времени (Слоты) */}
            <div className="w-full md:w-56 flex flex-col gap-3 shrink-0">
              <h4 className="font-sans font-medium text-sm text-zinc-500 mb-2 md:mb-5">Пятница, 5 Мая</h4>
              
              {[
                '11:00',
                '13:30', 
                '15:00', 
                '16:45', 
                '18:00'
              ].map((time) => (
                <button 
                  key={time} 
                  // Кнопки-пилюли, при hover плавно заливаются акцентным индиго
                  className="w-full py-3 md:py-4 px-6 rounded-xl border border-indigo-100/60 text-indigo-900 font-sans font-medium text-sm md:text-base hover:bg-indigo-600 hover:text-white hover:border-indigo-600 hover:shadow-[0_8px_20px_-8px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                >
                  {time}
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
