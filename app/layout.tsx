import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arsen San — Премиальная разработка интернет-магазинов",
  description:
    "Разработка кастомных e-commerce решений, которые продают статус и генерируют прибыль. UI/UX дизайн, фронтенд с WebGL/Motion, headless backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-ivory text-graphite">
        {/* Animated film grain — SVG feTurbulence + CSS steps() */}
        <NoiseOverlay />

        {/* Premium custom cursor — mix-blend-mode: difference */}
        <CustomCursor />

        {/* Lenis smooth scroll wraps all page content */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
