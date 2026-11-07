import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Bending Marquee Component (React Bits Pro Starter)
 * A text and element marquee that bends dynamically along a 3D curve / perspective arc as it scrolls.
 */
export function BendingMarquee({
  items = [],
  bend = 18,
  speed = 25,
  direction = "left",
  pauseOnHover = true,
  perspective = "1000px",
  curve = "arch",
  className,
  itemClassName,
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const dynamicBend = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [bend * 0.7, bend, bend * 0.7]
  );

  const rotateX = curve === "arch" ? 8 : curve === "valley" ? -8 : 0;
  const rotateY = direction === "left" ? -4 : 4;

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden py-12 select-none",
        className
      )}
      style={{
        perspective: perspective,
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* Curved 3D Wrapper */}
      <motion.div
        className="w-full flex items-center justify-center transform-gpu"
        style={{
          transformStyle: "preserve-3d",
          rotateX: `${rotateX}deg`,
          rotateY: `${rotateY}deg`,
        }}
      >
        <motion.div
          className={cn(
            "flex w-max gap-8 items-center whitespace-nowrap will-change-transform",
            pauseOnHover && "hover:[animation-play-state:paused]"
          )}
          animate={{
            x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {duplicatedItems.map((item, idx) => {
            const angleOffset = Math.sin((idx % items.length) / items.length * Math.PI) * bend;
            
            return (
              <div
                key={idx}
                className={cn(
                  "inline-flex items-center gap-4 px-6 py-3 rounded-full",
                  "bg-[#141414]/90 backdrop-blur-md border border-white/[0.08]",
                  "text-[#F5F5F5] font-serif text-xl sm:text-2xl font-light",
                  "hover:border-[#E87348]/50 hover:shadow-[0_0_25px_rgba(232,115,72,0.2)]",
                  "transition-all duration-300 transform-gpu cursor-default",
                  itemClassName
                )}
                style={{
                  transform: `rotateZ(${angleOffset * 0.25}deg) translateZ(${Math.abs(angleOffset) * 1.5}px)`,
                }}
              >
                {typeof item === "string" ? (
                  <>
                    <span className="text-white/90">{item}</span>
                    <span className="text-[#E87348] text-base font-sans">✦</span>
                  </>
                ) : (
                  item
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Subtle Side Vignette Gradients for Cinematic Depth */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10" />
    </div>
  );
}

export default BendingMarquee;

