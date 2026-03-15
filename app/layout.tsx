import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Geist, Bebas_Neue, Space_Grotesk } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import IntroLoader from "@/components/IntroLoader";
import Navbar from "@/components/Navbar";
import "./globals.css";

/* ── Display font — Montserrat Black (weight 900) for H1 ── */
const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: "900",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

/* ── Body font — Geist for UI and Navigation ── */
const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

/* ── Nav font — Bebas Neue for Header Links ── */
const bebasNeue = Bebas_Neue({
  variable: "--font-nav",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  display: "swap",
});

/* ── Space Grotesk ── */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arsen San — Premium E‑Commerce Development",
  description:
    "Custom e-commerce solutions that sell status and generate profit. UI/UX design, frontend with WebGL/Motion, headless backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfairDisplay.variable} ${geist.variable} ${bebasNeue.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased bg-ivory text-graphite">
        <CustomCursor />
        <SmoothScroll>
          <IntroLoader />
          <div data-intro-wrapper>
            <Navbar />
            {children}
          </div>
        </SmoothScroll>
        <NoiseOverlay />
      </body>
    </html>
  );
}
