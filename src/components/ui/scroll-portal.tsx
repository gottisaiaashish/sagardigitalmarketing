import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PortalFrame {
  id: string | number;
  tag?: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  image?: string;
  accentColor?: string;
}

export interface ScrollPortalProps {
  frames: PortalFrame[];
  className?: string;
  height?: string; // Total scroll height, e.g. "350vh"
  maxScale?: number; // Zoom expansion multiplier
  smoothing?: boolean;
}

/**
 * Scroll Portal Component (React Bits Pro Starter)
 * Scroll through frames nested one inside the next, creating a continuous
 * cinematic zoom/portal tunnel through brand narratives.
 */
export function ScrollPortal({
  frames,
  className,
  height = "360vh",
  maxScale = 6,
  smoothing = true,
}: ScrollPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll spring interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.2,
  });

  const progress = smoothing ? smoothProgress : scrollYProgress;
  const count = frames.length;

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ height }}
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A0A0A] flex items-center justify-center select-none">
        {/* Ambient Portal Vignette & Radial Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,115,72,0.12)_0%,transparent_70%)] z-10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10" />

        {/* Progress Tracker Line */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {frames.map((_, i) => {
            const stepStart = i / count;
            const stepEnd = (i + 1) / count;
            return (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300 bg-white/20"
                style={{
                  width: "36px",
                  background: `linear-gradient(90deg, #E87348 0%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
            );
          })}
        </div>

        {/* Nested Frames Stage */}
        <div className="relative w-full max-w-5xl h-[70vh] sm:h-[75vh] flex items-center justify-center">
          {frames.map((frame, index) => {
            // Normalized range for this frame
            // Frame 0 begins active [0, 1/count], expands past screen [1/count, 1.5/count]
            const start = index / count;
            const peak = (index + 0.5) / count;
            const end = (index + 1) / count;

            // Frame dynamic scale calculation
            const scale = useTransform(progress, (p) => {
              const diff = p - start;
              if (diff < 0) {
                // Incoming inner frame (nested inside current)
                const nestedScale = Math.max(0.12, 1 - Math.abs(diff) * count * 0.75);
                return nestedScale;
              } else {
                // Active frame zooming forward into the camera
                const zoomFactor = 1 + diff * count * (maxScale - 1);
                return zoomFactor;
              }
            });

            // Opacity: Fades out as it zooms past the screen edges
            const opacity = useTransform(progress, (p) => {
              const diff = p - start;
              if (diff < -0.35) return 0;
              if (diff < 0) return Math.min(1, 0.4 + (1 + diff * count) * 0.6);
              // As it scales past 2.5x, smoothly fade out so inner frame is seen clearly
              const fadeOutStart = 0.4 / count;
              const fadeOutEnd = 0.95 / count;
              if (diff > fadeOutEnd) return 0;
              if (diff > fadeOutStart) {
                return 1 - (diff - fadeOutStart) / (fadeOutEnd - fadeOutStart);
              }
              return 1;
            });

            // Border radius narrows or expands as frame zooms
            const borderRadius = useTransform(progress, (p) => {
              const diff = p - start;
              if (diff > 0.3 / count) return "0px";
              return "28px";
            });

            return (
              <motion.div
                key={frame.id}
                className={cn(
                  "absolute inset-0 m-auto w-full h-full rounded-[28px] overflow-hidden",
                  "bg-[#121212] border border-white/[0.1] shadow-[0_30px_90px_rgba(0,0,0,0.9)]",
                  "flex flex-col justify-between p-8 sm:p-14 transform-gpu will-change-transform"
                )}
                style={{
                  scale,
                  opacity,
                  borderRadius,
                  zIndex: count - index,
                  transformOrigin: "50% 50%",
                }}
              >
                {/* Background Ambient Imagery or Gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#1C1613] via-[#121212] to-[#0A0A0A] opacity-90 -z-10"
                  style={{
                    backgroundColor: frame.accentColor ? `${frame.accentColor}10` : undefined,
                  }}
                />

                {/* Frame Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#E87348] animate-pulse" />
                    <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#E87348] font-medium">
                      {frame.tag || `Portal 0${index + 1}`}
                    </span>
                  </div>
                  {frame.badge && (
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 bg-white/[0.05] px-3 py-1 rounded-full border border-white/[0.06]">
                      {frame.badge}
                    </span>
                  )}
                </div>

                {/* Frame Center Headline */}
                <div className="my-auto py-6 max-w-2xl relative z-10 space-y-4">
                  <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.08] tracking-[-0.02em]">
                    {frame.title}
                  </h3>
                  {frame.subtitle && (
                    <p className="font-serif text-xl sm:text-2xl italic text-[#FFA57D] font-light">
                      {frame.subtitle}
                    </p>
                  )}
                  {frame.description && (
                    <p className="text-xs sm:text-sm text-[#9A9790] font-light leading-relaxed max-w-xl pt-2">
                      {frame.description}
                    </p>
                  )}
                </div>

                {/* Frame Footer */}
                <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between relative z-10 text-xs">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A7A7A]">
                    Scroll Down to Step Inside Next Portal
                  </span>
                  <span className="text-[#E87348] font-mono text-xs">
                    0{index + 1} / 0{count} ↓
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ScrollPortal;

