"use client";

const NAV_LINKS = [
  { label: "SERVICES", href: "#services" },
  { label: "SELECTED WORK", href: "#portfolio" },
  { label: "PROCESS", href: "#process" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  return (
    <>
      {/* ── Progress Number Block (001) ── */}
      {/* (Вынесен из nav, как в оригинальном DOM) */}
      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50 pointer-events-none">
        <h5
          className="text-xs font-medium tracking-widest text-graphite-soft"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          001
        </h5>
      </div>

      {/* ── Main Navigation ── */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-start p-6 md:p-8 z-[9000] pointer-events-auto">
        
        {/* Левый блок: Логотип + Статус */}
        <div className="flex flex-row items-start gap-4">
          <a
            href="#hero"
            data-cursor="hover"
            className="text-xs font-medium uppercase tracking-widest text-graphite leading-tight"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            ARSEN<br />SAN
          </a>
          <h5
            className="hidden md:block text-[10px] uppercase tracking-wider text-graphite-soft mt-0.5"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            [AVAILABLE FOR WORK APRIL, 2026]
          </h5>
        </div>

        {/* Центральный блок: Список ссылок */}
        <ul
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 md:top-8 gap-6 m-0 p-0 list-none"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                data-cursor="hover"
                className="text-[11px] font-medium uppercase tracking-wider text-graphite transition-opacity duration-200 hover:opacity-40"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

      </nav>
    </>
  );
}
