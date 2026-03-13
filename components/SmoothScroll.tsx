"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";

// Context to expose Lenis instance to child components (e.g. GSAP ScrollTrigger integration)
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);

  const raf = useCallback(
    (time: number) => {
      lenis?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    },
    [lenis]
  );

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(instance);

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Start / restart the RAF loop when lenis instance changes
  useEffect(() => {
    if (!lenis) return;
    rafIdRef.current = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [lenis, raf]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
