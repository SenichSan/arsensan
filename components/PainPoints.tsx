"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlowLoadingVisual from "@/components/SlowLoadingVisual";
import AbandonedCartVisual from "@/components/AbandonedCartVisual";

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
      className="relative w-full bg-transparent py-20 md:py-40"
      data-bg="#09090B"
      data-text="#F5F0EB"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">

        {/* ── Left Column (Meta Zone) — Sticky Visual / Scene ── */}
        <div className="hidden md:flex md:col-span-4 sticky top-0 h-screen flex-col items-start justify-center pr-8">
          {/* Scene 0: Медленная загрузка */}
          {activeIndex === 0 && (
            <div className="w-full">
              <SlowLoadingVisual isActive={true} />
            </div>
          )}

          {/* Scene 3: Сложный чекаут */}
          {activeIndex === 3 && (
            <div className="w-full">
              <AbandonedCartVisual isActive={true} />
            </div>
          )}

          {/* Fallback: numbered placeholder for remaining pains */}
          {activeIndex !== 0 && activeIndex !== 3 && (
            <div className="flex w-full flex-col items-start gap-4">
              <span className="font-display text-[10rem] lg:text-[12rem] font-black leading-none text-on-dark/10 transition-all duration-500">
                {activeIndex + 1}
              </span>
              <span className="font-sans text-sm font-medium uppercase tracking-widest text-on-dark-muted/60">
                Боль {activeIndex + 1}
              </span>
            </div>
          )}
        </div>

        {/* ── Right Column (Content Zone) — Scrollable Text Blocks ── */}
        <div className="md:col-span-8 flex flex-col">
          {painPoints.map((point, index) => (
            <div
              key={point.id}
              ref={(el) => {
                textBlockRefs.current[index] = el;
              }}
              className="flex min-h-screen flex-col justify-center py-20"
            >
              <div
                className={`max-w-3xl transition-opacity duration-500 ease-out ${
                  activeIndex === index ? "opacity-100" : "opacity-30"
                }`}
              >
                {/* Mobile-only index indicator */}
                <span className="mb-4 block font-sans text-xs font-medium uppercase tracking-widest text-indigo-light md:hidden">
                  {String(index + 1).padStart(2, "0")} / {String(painPoints.length).padStart(2, "0")}
                </span>

                <h3 className="font-display text-3xl font-black uppercase leading-[1.1] tracking-tight md:text-5xl lg:text-6xl text-left">
                  {point.title}
                </h3>
                <p className="font-sans mt-8 text-base leading-relaxed text-on-dark-muted md:text-lg text-left">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
