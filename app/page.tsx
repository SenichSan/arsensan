export default function Home() {
  return (
    <main>
      {/* ─── Блок 1: Hero Section (Импульс) ─── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center"
      >
        <div className="text-center space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo/10 text-indigo text-sm font-medium font-heading tracking-wide">
            Свободен для 1 проекта в марте
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.95] tracking-tight">
            Премиальные
            <br />
            интернет-магазины
          </h1>
          <p className="max-w-xl mx-auto text-lg text-on-surface-muted">
            Которые продают статус и генерируют прибыль
          </p>
        </div>
      </section>

      {/* ─── Блок 2: Идентификация (Боли) ─── */}
      <section
        id="problem"
        className="min-h-screen flex items-center justify-center bg-surface-alt"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Проблема
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 2 — Идентификация болей</p>
        </div>
      </section>

      {/* ─── Блок 3: Решение ─── */}
      <section
        id="solution"
        className="min-h-[80vh] flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Решение
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 3 — Элегантное решение</p>
        </div>
      </section>

      {/* ─── Блок 4: Услуги (Декомпозиция) ─── */}
      <section
        id="services"
        className="min-h-screen flex items-center justify-center bg-surface-alt"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Услуги
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 4 — UI/UX, Frontend, Backend, SEO</p>
        </div>
      </section>

      {/* ─── Блок 5: Портфолио (Доказательства) ─── */}
      <section
        id="portfolio"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Портфолио
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 5 — Кейсы и результаты</p>
        </div>
      </section>

      {/* ─── Блок 6: Стек технологий (Tech Radar) ─── */}
      <section
        id="tech-stack"
        className="py-24 flex items-center justify-center bg-surface-alt"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Технологии
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 6 — Marquee / Tech Radar</p>
        </div>
      </section>

      {/* ─── Блок 7: Трансформация ─── */}
      <section
        id="transformation"
        className="min-h-[80vh] flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Трансформация
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 7 — До / После</p>
        </div>
      </section>

      {/* ─── Блок 8: Процесс ─── */}
      <section
        id="process"
        className="min-h-screen flex items-center justify-center bg-surface-alt"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Процесс
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 8 — Таймлайн: Discovery → Launch</p>
        </div>
      </section>

      {/* ─── Блок 9: Социальные доказательства ─── */}
      <section
        id="testimonials"
        className="min-h-[80vh] flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Отзывы
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 9 — Цитаты клиентов</p>
        </div>
      </section>

      {/* ─── Блок 10: Манифест ─── */}
      <section
        id="manifesto"
        className="min-h-[60vh] flex items-center justify-center bg-surface-alt"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Манифест
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 10 — «Бутик для бутиков»</p>
        </div>
      </section>

      {/* ─── Блок 11: Интерактивный Checkout (Главный CTA) ─── */}
      <section
        id="checkout"
        className="min-h-screen flex items-center justify-center bg-surface-dark text-on-dark"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Соберите проект
          </h2>
          <p className="mt-4 text-on-dark-muted">Блок 11 — Интерактивный Checkout</p>
        </div>
      </section>

      {/* ─── Блок 12: FAQ ─── */}
      <section
        id="faq"
        className="py-24 flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            FAQ
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 12 — Частые вопросы</p>
        </div>
      </section>

      {/* ─── Блок 13: Контакт ─── */}
      <section
        id="contact"
        className="min-h-[60vh] flex items-center justify-center bg-surface-alt"
      >
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold">
            Контакт
          </h2>
          <p className="mt-4 text-on-surface-muted">Блок 13 — Связаться</p>
        </div>
      </section>

      {/* ─── Блок 14: Футер ─── */}
      <footer
        id="footer"
        className="py-16 flex items-center justify-center bg-surface-dark text-on-dark"
      >
        <div className="text-center">
          <p className="text-sm text-on-dark-muted">
            © {new Date().getFullYear()} Arsen San. Все права защищены.
          </p>
        </div>
      </footer>
    </main>
  );
}
