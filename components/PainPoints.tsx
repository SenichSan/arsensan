"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ── */
interface PainPoint {
  id: string;
  title: string;
  description: string;
}

const painPoints: PainPoint[] = [
  {
    id: "slow-loading",
    title: "Медленная загрузка",
    description:
      "Каждая лишняя секунда загрузки отнимает до 7% конверсии. Шаблонные решения набиты неиспользуемым кодом, тяжёлыми плагинами и неоптимизированными изображениями — ваши клиенты уходят, не дождавшись первого экрана.",
  },
  {
    id: "template-design",
    title: "Шаблонный дизайн",
    description:
      "Ваш магазин выглядит как сотни других. Покупатели не чувствуют уникальности бренда, а вы теряете лояльность ещё до первой покупки. Шаблон не продаёт статус — он продаёт дешевизну.",
  },
  {
    id: "plugin-conflicts",
    title: "Конфликты плагинов",
    description:
      "Обновили один плагин — сломался другой. Каждый апдейт превращается в лотерею: оплата не проходит, корзина пропадает, страницы рассыпаются. Бизнес стоит, пока разработчик ищет «конфликт».",
  },
  {
    id: "complex-checkout",
    title: "Сложный чекаут",
    description:
      "Запутанная форма заказа, лишние шаги, обязательная регистрация — всё это убивает до 70% корзин. Клиент добавил товар, начал оформлять и… ушёл. Навсегда.",
  },
];

/* ── Component ── */
export default function PainPoints() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textBlockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      textBlockRefs.current.forEach((block, index) => {
        if (!block) return;

        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="problem"
      className="relative w-full flex flex-col md:flex-row bg-background text-foreground"
    >
      {/* ── Left Column — Sticky Visual / Scene ── */}
      <div className="hidden md:flex sticky top-0 h-screen w-1/2 items-center justify-center border-r border-black/5">
        <div className="flex flex-col items-center gap-3">
          <span
            className="text-[12rem] font-black leading-none text-graphite/10 transition-all duration-500"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {activeIndex + 1}
          </span>
          <span
            className="text-sm font-medium uppercase tracking-widest text-graphite-soft/60 transition-opacity duration-500"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Боль {activeIndex + 1}
          </span>
        </div>
      </div>

      {/* ── Right Column — Scrollable Text Blocks ── */}
      <div className="w-full md:w-1/2">
        {painPoints.map((point, index) => (
          <div
            key={point.id}
            ref={(el) => {
              textBlockRefs.current[index] = el;
            }}
            className="flex min-h-screen items-center justify-center px-8 md:px-16 lg:px-24"
          >
            <div
              className="max-w-lg transition-opacity duration-500 ease-out"
              style={{ opacity: activeIndex === index ? 1 : 0.3 }}
            >
              {/* Mobile-only index indicator */}
              <span
                className="mb-4 block text-xs font-medium uppercase tracking-widest text-indigo md:hidden"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {String(index + 1).padStart(2, "0")} / {String(painPoints.length).padStart(2, "0")}
              </span>

              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {point.title}
              </h3>
              <p
                className="mt-6 text-base md:text-lg leading-relaxed text-graphite-soft"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {point.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
