"use client";

import React from "react";

// Массив со спецификацией технологий и их бизнес-потенциалом
const techSpecs = [
  {
    id: "01",
    tool: "NEXT.JS",
    node: "[ СЕРВЕРНЫЙ РЕНДЕРИНГ ]",
    benefit: "Страницы генерируются на сервере до запроса пользователя. Гарантирует максимальную скорость первой отрисовки и 100% индексацию для SEO."
  },
  {
    id: "02",
    tool: "GSAP & WEBGL",
    node: "[ ДВИЖОК АНИМАЦИЙ ]",
    benefit: "Математически точная анимация, работающая напрямую с GPU. Обеспечивает 60 FPS и плавность интерфейса без перегрузки процессора устройства."
  },
  {
    id: "03",
    tool: "TAILWIND CSS",
    node: "[ ATOMIC STYLING ]",
    benefit: "Архитектура стилей без избыточного кода. Вес страниц остается минимальным независимо от сложности дизайна и количества элементов."
  },
  {
    id: "04",
    tool: "HEADLESS CMS",
    node: "[ НЕЗАВИСИМЫЙ BACKEND ]",
    benefit: "Отвязка базы данных от визуальной части. Обеспечивает банковский уровень безопасности и возможность неограниченного масштабирования."
  }
];

export default function TechStackBlock() {
  return (
    <section 
      id="tech-stack" 
      className="relative w-full min-h-[90vh] lg:min-h-screen bg-transparent py-32 px-6 md:px-12 flex flex-col justify-center select-none"
      data-bg="#F5F0EB"
      data-text="#1C1917"
    >
      <div className="w-full max-w-7xl mx-auto">
        
        {/* Шапка блока */}
        <div className="mb-16 md:mb-24">
          <span className="font-mono text-xs tracking-[0.2em] text-zinc-500 uppercase">
            [ СПЕЦИФИКАЦИЯ МОНОЛИТА ]
          </span>
        </div>

        {/* Таблица спецификаций */}
        {/* Родительский group/table отслеживает наведение курсора в область всей таблицы */}
        <ul className="w-full flex flex-col group/table">
          {techSpecs.map((item) => (
            <li 
              key={item.id}
              // По умолчанию строка слегка тусклая (opacity-60)
              // Если навести курсор куда-либо на таблицу, все строки падают до 30%
              // Но конкретная строка под курсором (hover:) становится яркой (!opacity-100)
              className="w-full flex flex-col md:flex-row md:items-start py-10 md:py-16 border-b border-zinc-800/60 first:border-t transition-opacity duration-500 opacity-60 md:group-hover/table:opacity-30 hover:!opacity-100 cursor-default"
            >
              {/* Колонка 1 (Инструмент: ~25%) */}
              <div className="w-full md:w-1/4 mb-4 md:mb-0 pr-4 shrink-0">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans uppercase tracking-tighter text-zinc-100 leading-none">
                  {item.tool}
                </h3>
              </div>

              {/* Колонка 2 (Узел архитектуры: ~25%) */}
              <div className="w-full md:w-1/4 mb-6 md:mb-0 pr-4 flex md:items-start pt-1 md:pt-2 md:justify-center shrink-0">
                <span className="font-mono text-xs md:text-sm tracking-widest text-zinc-500 uppercase md:-ml-8 lg:-ml-12">
                  {item.node}
                </span>
              </div>

              {/* Колонка 3 (Бизнес-польза: ~50%) */}
              <div className="w-full md:w-2/4 flex md:justify-start">
                <p className="font-serif text-lg md:text-xl lg:text-2xl text-zinc-400 leading-relaxed max-w-xl">
                  {item.benefit}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
