export default function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen w-full z-10 bg-transparent text-graphite">
      {/* ── Landing Container (equivalent to page_landingContainer) ── */}
      <div className="relative w-full h-screen overflow-hidden pointer-events-none flex flex-col items-center justify-center">
        
        {/* ── Central Content (equivalent to page_heading_and_button) ── */}
        <div className="flex flex-col items-center justify-center w-full max-w-[95vw] z-10 pointer-events-auto">
          
          <p
            className="w-[50%] text-center mb-6 md:mb-10 text-base leading-[1.1] opacity-75 normal-case font-medium md:text-lg"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            I&apos;m an independent creative designer &amp; developer who builds
            custom digital experiences through modern typography and unique
            interactions. I work with clients who want to stand out with
            unconventional and bold design and interactivity. Driven by craft, my
            work is rooted in purpose.
          </p>

          <div className="w-full flex justify-center">
            <h1
              className="w-full text-center text-[10vw] leading-[1] tracking-tighter uppercase font-black text-graphite"
              style={{ fontFamily: "var(--font-display)" }}
            >
              CREATING FOR A<br />
              HIGHER PURPOSE
            </h1>
          </div>

          <a
            href="#contact"
            data-cursor="hover"
            className="mt-8 md:mt-12 group inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-3 text-[11px] font-medium uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-indigo"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            LET&apos;S TALK!
            <span className="inline-block transition-transform duration-300 group-hover:rotate-45">
              +
            </span>
          </a>
        </div>

        {/* ── Footer Info (equivalent to page_video_container > page_extra_info) ── */}
        <div className="absolute bottom-0 left-0 w-full flex justify-between items-end p-6 md:p-8 z-50 pointer-events-auto">
          <h5
            className="text-[11px] font-medium uppercase tracking-widest text-graphite"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            ARSEN SAN
          </h5>
          <h5
            className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 text-[10px] uppercase tracking-wider text-graphite-soft opacity-50 text-center"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            [FREELANCE CREATIVE DEVELOPER]
          </h5>
          <h5
            className="text-[11px] uppercase tracking-wider text-graphite-soft"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            REMOTE, UA
          </h5>
        </div>

      </div>

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
