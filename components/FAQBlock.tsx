"use client";

import React, { useState } from "react";

const faqs = [
  {
    question: "ВЫ ИСПОЛЬЗУЕТЕ ГОТОВЫЕ ШАБЛОНЫ ИЛИ CMS?",
    answer: "Нет. Я пишу архитектуру с нуля (Headless-подход). Визуальная часть и база данных разделены. Это дает абсолютную свободу в дизайне и банковскую безопасность. Никаких конфликтующих плагинов и тормозов."
  },
  {
    question: "СМОГУ ЛИ Я САМ УПРАВЛЯТЬ ТОВАРАМИ И КОНТЕНТОМ?",
    answer: "Да. Я интегрирую удобную панель управления (например, Sanity или Strapi), настроенную специально под ваши бизнес-процессы. Вы сможете менять тексты, цены и фото в два клика."
  },
  {
    question: "ЧТО ПРОИСХОДИТ ПОСЛЕ РЕЛИЗА ПРОЕКТА?",
    answer: "Я не бросаю проекты. После запуска вы получаете месяц технической поддержки, мониторинг метрик и обучение вашей команды работе с платформой. Далее возможен формат SLA-поддержки."
  },
  {
    question: "ПОЧЕМУ КАСТОМНАЯ РАЗРАБОТКА СТОИТ ДОРОЖЕ?",
    answer: "Шаблон — это аренда чужого, неудобного костюма. Монолит — это костюм, сшитый по вашим меркам. Вы платите за скорость загрузки менее секунды, уникальный визуальный опыт и конверсию, которую невозможно получить на коробочных решениях."
  }
];

export default function FAQBlock() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    // Эксклюзивный аккордеон: если кликаем на открытый — он закроется,
    // если на другой — предыдущий закроется сам.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq" 
      // Темный, глубокий фон и большие отступы сверху/снизу
      className="w-full bg-transparent py-24 md:py-32 flex justify-center select-none"
      data-bg="#09090B"
      data-text="#F5F0EB"
    >
      {/* Ограниченный по ширине отцентрированный контейнер */}
      <div className="w-full max-w-5xl px-6 md:px-12 flex flex-col">
        
        {/* Шапка секции */}
        <div className="mb-16 md:mb-20">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-zinc-500 uppercase">
            [ СНЯТИЕ ВОЗРАЖЕНИЙ ]
          </span>
        </div>

        {/* Список Аккордеона */}
        {/* Первая линия задается через border-t у обертки, остальные через border-b внутри */}
        <div className="w-full border-t border-zinc-800">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="border-b border-zinc-800 flex flex-col"
              >
                {/* Вопрос (Кликабельная зона) */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-8 md:py-12 flex items-center justify-between text-left group gap-8"
                  aria-expanded={isOpen}
                >
                  {/* Огромный рубленый шрифт белого/светло-серого цвета */}
                  <h3 className="font-sans font-bold text-2xl md:text-3xl lg:text-4xl text-zinc-300 group-hover:text-emerald-500 transition-colors duration-500 uppercase tracking-tight md:tracking-tighter">
                    {faq.question}
                  </h3>
                  
                  {/* Строгий геометрический крестик */}
                  <div className="relative w-6 h-6 md:w-8 md:h-8 shrink-0 flex items-center justify-center">
                    {/* Горизонтальная линия */}
                    <div 
                      className={`absolute w-full h-[2px] transition-all duration-500 ${
                        isOpen ? "bg-emerald-500 rotate-180" : "bg-zinc-600 group-hover:bg-emerald-500"
                      }`} 
                    />
                    {/* Вертикальная линия (исчезает при открытии, образуя минус) */}
                    <div 
                      className={`absolute w-[2px] h-full transition-all duration-500 ${
                        isOpen ? "bg-emerald-500 rotate-90 opacity-0 scale-50" : "bg-zinc-600 group-hover:bg-emerald-500 opacity-100 scale-100"
                      }`} 
                    />
                  </div>
                </button>

                {/* 
                  Ответ (Скрытая зона). 
                  Используем grid-template-rows для плавной аппаратной анимации высоты (0 -> auto)
                */}
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* 
                      Внутренний паддинг для отступа от нижней линии. 
                      Текст с засечками (serif), приглушенный цвет, ограниченная ширина 
                    */}
                    <div className="pb-10 md:pb-14 pt-0">
                      <p className="font-serif text-lg md:text-xl text-zinc-400 leading-[1.6] md:leading-[1.7] max-w-3xl">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
