import PainPoints from "@/components/PainPoints";
import TechStackBlock from "@/components/TechStackBlock";
import SolutionManifestoBlock from "@/components/SolutionManifestoBlock";
import ServicesBlock from "@/components/ServicesBlock";
import PortfolioBlock from "@/components/PortfolioBlock";
import TransformationBlock from "@/components/TransformationBlock";
import ProcessTimelineBlock from "@/components/ProcessTimelineBlock";
import TestimonialsBlock from "@/components/TestimonialsBlock";
import ManifestoBlock from "@/components/ManifestoBlock";
import ContactBlock from "@/components/ContactBlock";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center min-h-screen w-full bg-transparent text-graphite">
      {/* ── Landing Container (equivalent to page_landingContainer) ── */}
      <div className="relative w-full h-screen overflow-hidden pointer-events-none flex flex-col items-center justify-center">

        {/* ── Central Content (equivalent to page_heading_and_button) ── */}
        <div className="flex flex-col items-center justify-center w-full max-w-[95vw] z-10 pointer-events-auto">

          <p
            className="w-[50%] text-center mb-6 md:mb-10 leading-[1.1] opacity-75 normal-case"
            data-intro-reveal
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1rem, 0.3vw + 1.1rem, 1.45rem)", textShadow: "0 -1px 0 rgba(255,255,255,0.6), 0 1px 2px rgba(28,25,23,0.08)", opacity: 0 }}
          >
            I&apos;m an independent creative designer &amp; developer who builds
            custom digital experiences through modern typography and unique
            interactions. I work with clients who want to stand out with
            unconventional and bold design and interactivity. Driven by craft, my
            work is rooted in purpose.
          </p>

          <div className="w-full flex justify-center" data-intro-reveal style={{ opacity: 0 }}>
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
            data-intro-reveal
            className="mt-8 md:mt-12 group inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-3 text-[11px] font-medium uppercase tracking-widest text-ivory transition-all duration-300 hover:bg-indigo"
            style={{ fontFamily: "var(--font-sans)", opacity: 0 }}
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
            data-intro-reveal
            style={{ fontFamily: "var(--font-sans)", opacity: 0 }}
          >
            ARSEN SAN
          </h5>
          <h5
            className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-6 md:bottom-8 text-[10px] uppercase tracking-wider text-graphite-soft opacity-50 text-center"
            data-intro-reveal
            style={{ fontFamily: "var(--font-sans)", opacity: 0 }}
          >
            [FREELANCE CREATIVE DEVELOPER]
          </h5>
          <h5
            className="text-[11px] uppercase tracking-wider text-graphite-soft"
            data-intro-reveal
            style={{ fontFamily: "var(--font-sans)", opacity: 0 }}
          >
            REMOTE, UA
          </h5>
        </div>

      </div>

      {/* ─── Блок 2: Идентификация (Боли) — Sticky Scroll ─── */}
      <PainPoints />

      {/* ─── Блок 3: Решение ─── */}
      <SolutionManifestoBlock />

      {/* ─── Блок 4: Услуги (Декомпозиция) ─── */}
      <ServicesBlock />

      {/* ─── Блок 5: Портфолио (Доказательства) ─── */}
      <PortfolioBlock />

      {/* ─── Блок 6: Спецификация (Tech Stack) ─── */}
      <TechStackBlock />

      {/* ─── Блок 7: Трансформация ─── */}
      <TransformationBlock />

      {/* ─── Блок 8: Процесс ─── */}
      <ProcessTimelineBlock />

      {/* ─── Блок 9: Социальные доказательства ─── */}
      <TestimonialsBlock />

      {/* ─── Блок 10: Манифест ─── */}
      <ManifestoBlock />

      {/* ─── Блок 11: Интерактивный Checkout (Главный CTA) ─── */}
      <ContactBlock />

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
