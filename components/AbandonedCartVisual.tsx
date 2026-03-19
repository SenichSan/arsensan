"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AbandonedCartVisualProps {
  isActive: boolean;
}

export default function AbandonedCartVisual({ isActive }: AbandonedCartVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Element Refs
  const emailRef = useRef<HTMLSpanElement>(null);
  const passRef = useRef<HTMLSpanElement>(null);
  const totalRef = useRef<HTMLSpanElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const strikeRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);
  
  // Cursor Refs
  const cursor1Ref = useRef<HTMLSpanElement>(null);
  const cursor2Ref = useRef<HTMLSpanElement>(null);
  const cursor3Ref = useRef<HTMLSpanElement>(null);

  // Overlays
  const overlaysRef = useRef<HTMLDivElement>(null);
  const popup1Ref = useRef<HTMLDivElement>(null);
  const popup2Ref = useRef<HTMLDivElement>(null);
  const popup3Ref = useRef<HTMLDivElement>(null);
  const popup4Ref = useRef<HTMLDivElement>(null);

  const mainTl = useRef<gsap.core.Timeline | null>(null);
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const emailTarget = "client@mail.com";
    const passTarget = "********";

    const clearAll = () => {
      mainTl.current?.kill();
      if (loopTimerRef.current) clearTimeout(loopTimerRef.current);
      
      // Reset text
      if (emailRef.current) emailRef.current.innerText = "";
      if (passRef.current) passRef.current.innerText = "";
      if (totalRef.current) {
        totalRef.current.innerText = "95 000 ₽";
        totalRef.current.style.color = "var(--color-graphite, #1C1917)";
      }
      
      gsap.set(footerRef.current, { color: "var(--color-graphite, #1C1917)" });
      gsap.set(strikeRef.current, { scaleX: 0 });
      gsap.set(stampRef.current, { scale: 2, opacity: 0 });
      if (overlaysRef.current) gsap.set(overlaysRef.current, { x: 0, y: 0 });
      
      const popupsToReset = [popup1Ref.current, popup2Ref.current, popup3Ref.current, popup4Ref.current].filter(Boolean);
      if (popupsToReset.length) {
        gsap.set(popupsToReset, { scale: 0.5, opacity: 0, y: 0 });
      }
      
      const cursors = [cursor1Ref.current, cursor2Ref.current, cursor3Ref.current].filter(Boolean);
      if (cursors.length) gsap.set(cursors, { opacity: 0, display: "none" });
      
      gsap.set(cursor1Ref.current, { opacity: 1, display: "inline" });
    };

    const runCycle = () => {
      clearAll();

      const proxy = { emailLen: 0, passLen: 0, total: 95000 };

      const tl = gsap.timeline({
        onComplete: () => {
          loopTimerRef.current = setTimeout(() => {
            if (isActive) runCycle();
          }, 2500);
        }
      });
      mainTl.current = tl;

      // --- PHASE 1: FILLING DATA (0.0s - 1.5s) ---

      tl.to(
        proxy,
        {
          emailLen: emailTarget.length,
          duration: 0.5,
          ease: "none",
          onUpdate: () => {
            if (emailRef.current) emailRef.current.innerText = emailTarget.substring(0, Math.round(proxy.emailLen));
          }
        },
        0.2
      );

      tl.add(() => {
        gsap.set(cursor1Ref.current, { opacity: 0, display: "none" });
        gsap.set(cursor2Ref.current, { opacity: 1, display: "inline" });
      }, 0.7);

      tl.to(
        proxy,
        {
          passLen: passTarget.length,
          duration: 0.4,
          ease: "none",
          onUpdate: () => {
            if (passRef.current) passRef.current.innerText = passTarget.substring(0, Math.round(proxy.passLen));
          }
        },
        0.8
      );

      tl.add(() => {
        gsap.set(cursor2Ref.current, { opacity: 0, display: "none" });
        gsap.set(cursor3Ref.current, { opacity: 1, display: "inline" });
      }, 1.3);

      // --- PHASE 2: OVERLAY CASCADE (1.5s - 3.5s) ---
      
      tl.fromTo(popup1Ref.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, 1.5);
      tl.fromTo(popup2Ref.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, 1.7);
      tl.fromTo(popup3Ref.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, 1.9);
      tl.fromTo(popup4Ref.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.5)" }, 2.1);

      // --- PHASE 3: VIBRATION (3.5s - 4.5s) ---
      // We do a rapid repeat yoyo on the wrapper
      tl.to(overlaysRef.current, {
        x: () => (Math.random() - 0.5) * 8, // ~ -4 to 4 px
        y: () => (Math.random() - 0.5) * 8, // ~ -4 to 4 px
        duration: 0.05,
        repeat: 20,
        yoyo: true,
        ease: "none",
        onComplete: () => {
          if (overlaysRef.current) gsap.set(overlaysRef.current, { x: 0, y: 0 });
        }
      }, 3.5);

      // --- PHASE 4: RESET / SCRAMBLE (4.5s - 5.0s) ---
      
      tl.add(() => {
        if (emailRef.current) emailRef.current.innerText = "";
        if (passRef.current) passRef.current.innerText = "";
        const cursors = [cursor1Ref.current, cursor2Ref.current, cursor3Ref.current].filter(Boolean);
        if (cursors.length) gsap.set(cursors, { opacity: 0, display: "none" });
      }, 4.5);

      tl.to(
        proxy,
        {
          total: 0,
          duration: 0.5,
          ease: "none", // linear gives best scramble effect
          onUpdate: () => {
            if (totalRef.current) {
              const val = Math.round(proxy.total);
              if (val === 0) {
                totalRef.current.innerText = "00.00 ₽";
                totalRef.current.style.color = "rgba(28, 25, 23, 0.3)";
              } else {
                // Hard glitch randomizer
                const num = Math.floor(Math.random() * proxy.total).toLocaleString("ru-RU");
                totalRef.current.innerText = num + " ₽";
              }
            }
          }
        },
        4.5
      );

      // --- PHASE 5: FINAL IMPACT (5.5s) ---
      
      const popupsToHide = [popup1Ref.current, popup2Ref.current, popup3Ref.current, popup4Ref.current].filter(Boolean);
      if (popupsToHide.length) {
        tl.to(popupsToHide, { scale: 0.9, opacity: 0, y: 40, duration: 0.3, ease: "power2.in", stagger: -0.05 }, 5.5);
      }

      tl.to(
        strikeRef.current,
        { scaleX: 1, duration: 0.2, ease: "power4.inOut" },
        5.8
      );

      tl.fromTo(
        stampRef.current,
        { scale: 2.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" },
        6.0
      );
    };

    if (isActive) {
      runCycle();
    } else {
      clearAll();
    }

    return clearAll;
  }, [isActive]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center overflow-hidden bg-ivory">
      
      {/* Brutalist Invoice Card */}
      <div className="relative w-[340px] bg-ivory border border-black/20 p-8 flex flex-col font-mono text-graphite shadow-sm">
        
        {/* Header */}
        <div className="border-b border-black/10 pb-4 mb-6">
          <h3 className="uppercase tracking-widest text-xs font-bold leading-tight flex justify-between">
            <span>Invoice</span>
            <span>#8920</span>
          </h3>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-5 text-sm relative z-10 w-full">
          
          <div className="flex justify-between items-end border-b border-black/10 pb-3">
            <span className="text-graphite/50 text-xs font-sans uppercase tracking-widest">Товар</span>
            <span className="font-bold tracking-tight">Premium Plan</span>
          </div>
          
          <div className="flex flex-col border-b border-black/10 pb-3 gap-1.5 min-h-[50px]">
            <span className="text-graphite/50 text-xs font-sans uppercase tracking-widest">Email</span>
            <div className="min-h-[20px] text-sm">
              <span ref={emailRef}></span>
              <span ref={cursor1Ref} className="animate-pulse bg-graphite w-[8px] h-[1em] inline-block align-middle ml-1" />
            </div>
          </div>

          <div className="flex flex-col border-b border-black/10 pb-3 gap-1.5 min-h-[50px]">
            <span className="text-graphite/50 text-xs font-sans uppercase tracking-widest">Пароль</span>
            <div className="min-h-[20px] text-sm">
              <span ref={passRef}></span>
              <span ref={cursor2Ref} className="animate-pulse bg-graphite w-[8px] h-[1em] inline-block align-middle ml-1 hidden opacity-0" />
            </div>
          </div>

          <div className="flex flex-col border-b border-black/10 pb-3 gap-1.5 min-h-[50px]">
            <span className="text-red-700/80 text-[10px] font-sans font-bold uppercase tracking-widest leading-none mt-1">
              Докажите, что вы человек
            </span>
            <span className="text-graphite/50 text-xs font-sans uppercase tracking-widest -mt-1">Капча</span>
            <div className="min-h-[20px] text-sm">
              <span ref={cursor3Ref} className="animate-pulse bg-red-700/80 w-[8px] h-[1em] inline-block align-middle ml-1 hidden opacity-0" />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div ref={footerRef} className="mt-8 pt-5 border-t-2 border-black flex justify-between items-end relative z-10 transition-colors duration-200">
          <span className="text-sm font-sans font-black tracking-widest uppercase mb-1">Итого</span>
          <span ref={totalRef} className="font-sans font-black text-3xl tabular-nums tracking-tighter text-graphite transition-colors duration-200">
            95 000 ₽
          </span>
        </div>

        {/* Diagonal Strike */}
        <div 
          ref={strikeRef} 
          className="absolute left-0 top-1/2 w-[150%] h-[4px] bg-[#DC2626] origin-left -rotate-[35deg] -translate-y-1/2 -translate-x-8 z-40 pointer-events-none" 
          style={{ transform: "scaleX(0)" }} 
        />

        {/* Stamp Overlay */}
        <div 
          ref={stampRef} 
          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none opacity-0"
        >
          <div className="border-[4px] border-[#DC2626] px-8 py-4 rotate-[-12deg] bg-ivory/80 backdrop-blur-sm shadow-2xl">
            <span 
              className="font-serif italic text-4xl font-black text-[#DC2626] whitespace-nowrap" 
              style={{ fontFamily: "var(--font-display)" }}
            >
              [ КЛИЕНТ УШЕЛ ]
            </span>
          </div>
        </div>
      </div>

      {/* --- BUREAUCRACY OVERLAYS --- */}
      <div ref={overlaysRef} className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center">
        
        {/* Popup 1: IDENTITY */}
        <div 
          ref={popup1Ref} 
          className="absolute w-[90%] bg-graphite text-ivory border-2 border-black p-5 rotate-[3deg] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] opacity-0 flex items-center justify-center"
        >
          <h4 className="font-sans font-black text-3xl uppercase tracking-tighter leading-none text-center">
            [ ПОДТВЕРДИТЕ<br/>IDENTITY ]
          </h4>
        </div>

        {/* Popup 2: T&C */}
        <div 
          ref={popup2Ref} 
          className="absolute w-[80%] bg-white border border-graphite p-4 -translate-y-12 -translate-x-6 rotate-[-4deg] shadow-2xl opacity-0"
        >
          <div className="font-sans font-bold text-xs bg-graphite text-white inline-block px-2 py-0.5 uppercase tracking-widest mb-2">
            READ T&C (40 PAGES)
          </div>
          <div className="text-[7px] leading-tight text-justify font-serif text-graphite/40 line-clamp-4 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
          </div>
        </div>

        {/* Popup 3: CAPTCHA */}
        <div 
          ref={popup3Ref} 
          className="absolute w-[85%] bg-[#F6F4F0] border-4 border-[#DC2626] p-4 translate-y-16 translate-x-4 rotate-[2deg] shadow-2xl opacity-0"
        >
          <div className="font-sans font-black text-xs uppercase tracking-tighter text-[#DC2626] mb-3 leading-tight border-b-2 border-[#DC2626]/20 pb-2">
            SELECT SQUARES WITH:<br/>[ TRAFFIC LIGHTS ]
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className={`h-10 border-2 border-[#DC2626]/20 ${i % 2 === 0 ? 'bg-graphite/10' : 'bg-white'}`} />
            ))}
          </div>
        </div>

        {/* Popup 4: TRACKERS */}
        <div 
          ref={popup4Ref} 
          className="absolute w-[100%] max-w-[360px] bg-white border-[6px] border-black p-6 translate-y-4 rotate-[-2deg] shadow-[0_40px_100px_rgba(0,0,0,0.8)] opacity-0 flex flex-col items-center"
        >
          <h4 className="font-sans font-black text-xl md:text-2xl uppercase tracking-widest mb-6 text-center text-graphite border-b-4 border-black pb-2">
            [ ACCEPT ALL TRACKERS ]
          </h4>
          <div className="w-full py-4 bg-black text-white font-black text-2xl text-center uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">
            ACCEPT ALL
          </div>
          <div className="mt-4 text-[10px] text-graphite/30 underline italic tracking-widest">
            decline and exit...
          </div>
        </div>

      </div>

    </div>
  );
}
