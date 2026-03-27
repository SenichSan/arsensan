"use client";

import React, { useState, useEffect } from "react";

export default function FooterBlock() {
  const [time, setTime] = useState<string>("--:--");

  useEffect(() => {
    // Живые часы (Киевское время)
    const updateTime = () => {
      const kyivTime = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Kyiv",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(kyivTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // Обновляем раз в 10 секунд
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    // Если на проекте подключен Lenis, он автоматически подхватит стандартный scrollTo
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // Хак с `clip-path`: Внешний блок скроллится как обычно, 
    // но внутренний `fixed` элемент виден только в границах внешнего.
    // Это создает идеальный, легковесный эффект Parallax Reveal без сложного JS.
    <footer 
      id="footer"
      className="relative h-[85vh] md:h-[80vh] w-full bg-transparent pointer-events-none z-0 select-none"
      data-bg="#09090B"
      data-text="#F5F0EB"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 left-0 w-full h-[85vh] md:h-[80vh] flex flex-col justify-between pointer-events-auto">
        
        {/* =========================================
            Верхний ярус (Информационная сетка)
            ========================================= */}
        <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 pt-16 md:pt-24 flex-1 flex flex-col">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-12 w-full border-t border-zinc-900 pt-10">
            
            {/* Колонка 1: Связь */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#4A4742] uppercase mb-1 md:mb-2">
                Connect
              </span>
              <a href="mailto:hello@arsensan.com" className="font-sans text-sm md:text-base text-zinc-400 hover:text-zinc-100 transition-colors duration-300 w-max">Email</a>
              <a href="https://t.me/arsensan" className="font-sans text-sm md:text-base text-zinc-400 hover:text-zinc-100 transition-colors duration-300 w-max">Telegram</a>
              <a href="https://linkedin.com" className="font-sans text-sm md:text-base text-zinc-400 hover:text-zinc-100 transition-colors duration-300 w-max">LinkedIn</a>
            </div>

            {/* Колонка 2: Локация */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#4A4742] uppercase mb-1 md:mb-2">
                Location
              </span>
              <span className="font-sans text-sm md:text-base text-zinc-400 uppercase">
                BASED IN UA
              </span>
              <span className="font-mono text-sm md:text-base text-zinc-400 uppercase">
                LOCAL TIME: {time}
              </span>
            </div>

            {/* Колонка 3: Статус */}
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1 mt-4 md:mt-0">
              <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#4A4742] uppercase mb-1 md:mb-2">
                Availability
              </span>
              <span className="font-sans text-sm md:text-base text-zinc-400 uppercase leading-[1.6] max-w-[200px]">
                AVAILABLE FOR NEW COMMISSIONS & CHALLENGES
              </span>
            </div>

            {/* Колонка 4: Навигация */}
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1 md:items-end mt-4 md:mt-0">
              <span className="font-mono text-[10px] md:text-xs tracking-widest text-[#4A4742] uppercase mb-1 md:mb-3">
                Navigation
              </span>
              <button 
                onClick={scrollToTop}
                className="font-mono text-[10px] md:text-xs tracking-widest text-zinc-300 border border-zinc-800 rounded-full py-4 px-8 hover:bg-zinc-100 hover:text-zinc-950 transition-all duration-300 w-max"
              >
                [ BACK TO TOP ]
              </button>
            </div>

          </div>
        </div>

        {/* =========================================
            Нижний ярус (Гигантский монументальный текст)
            ========================================= */}
        <div className="w-full flex flex-col items-center mt-auto pb-4 md:pb-6 px-6 md:px-12">
          
          <div className="w-full flex items-end justify-between mb-4 md:mb-6 px-2">
            <span className="font-mono text-[#2A2825] text-[10px] md:text-xs tracking-widest leading-none">
              © {new Date().getFullYear()}
            </span>
            <span className="font-mono text-[#2A2825] text-[10px] md:text-xs tracking-widest leading-none">
              ALL RIGHTS RESERVED
            </span>
          </div>

          <h1 className="text-[22vw] md:text-[18vw] font-black font-sans leading-[0.75] tracking-[-0.05em] text-[#151310] whitespace-nowrap overflow-hidden text-center w-full">
            ARSEN SAN
          </h1>

        </div>

      </div>
    </footer>
  );
}
