"use client";

/**
 * NoiseOverlay — Premium Film Grain + Horizontal Scanlines
 *
 * Two independent texture layers inside one fixed container:
 *
 * Layer 1 (back): Animated fractal noise via SVG feTurbulence
 *   - 300%×300% oversized div, shifted by CSS steps() keyframes
 *   - Own opacity control
 *
 * Layer 2 (front): Static horizontal micro-lines via CSS repeating-linear-gradient
 *   - 1px line every 4px at rgba(0,0,0,0.03)
 *   - mix-blend-mode: multiply — organic blending with ivory bg
 *   - Own opacity control (independent from grain)
 */
export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
    >
      {/* ── Layer 1: Animated Film Grain ── */}
      <div className="absolute inset-0 overflow-hidden" style={{ opacity: 0.3 }}>
        <svg className="absolute h-0 w-0" aria-hidden="true">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves={3}
              stitchTiles="stitch"
            />
          </filter>
        </svg>

        <div
          className="absolute animate-grain"
          style={{
            top: "-100%",
            left: "-100%",
            width: "300%",
            height: "300%",
            background: "white",
            filter: "url(#grain)",
          }}
        />
      </div>

      {/* ── Layer 2: Horizontal Scanlines (craft paper texture) ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent, transparent 3px, rgba(0,0,0,0.012) 3px, rgba(0,0,0,0.012) 4px)",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}
