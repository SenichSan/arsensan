"use client";

/**
 * NoiseOverlay — Premium Film Grain Effect
 *
 * Architecture:
 * 1. Hidden inline SVG defines a <filter> with feTurbulence (fractalNoise)
 * 2. A 300%×300% oversized div has the filter applied via CSS `filter: url(#...)`
 * 3. CSS keyframes randomly translate the oversized layer in hard steps(10)
 *    at ~10 fps (1s / 10 steps) — creating the illusion of flickering film grain
 *
 * Why this works:
 * - feTurbulence generates a static noise pattern (GPU-accelerated)
 * - The oversized layer extends far beyond the viewport
 * - Each keyframe step shifts the layer to a different region of the noise
 * - steps(10) ensures hard cuts (no interpolation) = authentic film jitter
 * - Only CSS transform is animated = zero layout/paint cost, pure compositor
 */
export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ opacity: 0.3 }}
    >
      {/* Hidden SVG filter definition */}
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

      {/* Oversized noise layer — animated via CSS */}
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
  );
}
