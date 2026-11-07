import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Elastic Lettering Component (React Bits Pro Starter)
 * An interactive physics-based headline that can be grabbed, stretched,
 * and flung like a rubber elastic band, with automatic idle loop support.
 * Keeps whole words intact using whitespace-nowrap word boundaries.
 */
export function ElasticLettering({
  text = "",
  as: Component = "span",
  className,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  align = "left",
  tension = 0.65,
  stiffness = 320,
  damping = 12,
  bounce = 0.45,
  squash = true,
  tilt = true,
  color = "#F5F5F5",
  tensionColor = "#E87348",
  tensionTint = 0.9,
  loop = true,
  loopInterval = 4200,
}) {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const characters = text.split("");
  const words = text.split(" ");

  const handlePointerDown = (e, index) => {
    e.preventDefault();
    setIsDragging(true);
    setDragIndex(index);
    e.target.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || dragIndex === null || !containerRef.current) return;
    const charElements = containerRef.current.querySelectorAll("[data-char-idx]");
    const targetChar = charElements[dragIndex];
    if (!targetChar) return;

    const charRect = targetChar.getBoundingClientRect();
    const originX = charRect.left + charRect.width / 2;
    const originY = charRect.top + charRect.height / 2;

    const dx = e.clientX - originX;
    const dy = e.clientY - originY;

    const maxDist = 180;
    const dist = Math.hypot(dx, dy);
    const clampedDist = Math.min(dist, maxDist);
    const angle = Math.atan2(dy, dx);

    setDragOffset({
      x: Math.cos(angle) * clampedDist,
      y: Math.sin(angle) * clampedDist,
    });
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragIndex(null);
    setDragOffset({ x: 0, y: 0 });
    try {
      e.target.releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  useEffect(() => {
    if (!loop) return;

    const triggerElasticWave = () => {
      if (isDragging) return;
      const midIdx = Math.floor(characters.length / 2);
      setDragIndex(midIdx);
      
      const pluckAmount = 24 + Math.random() * 16;
      const pluckAngle = (Math.random() - 0.5) * 15;
      setDragOffset({ x: pluckAngle, y: pluckAmount });

      setTimeout(() => {
        setDragOffset({ x: 0, y: 0 });
        setDragIndex(null);
      }, 160);
    };

    const interval = setInterval(triggerElasticWave, loopInterval);
    return () => clearInterval(interval);
  }, [loop, loopInterval, isDragging, characters.length]);

  let globalCharCounter = 0;

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "relative inline-flex flex-wrap select-none touch-none py-4 px-2",
        align === "center" && "justify-center",
        align === "right" && "justify-end",
        align === "left" && "justify-start",
        className
      )}
      style={{
        fontSize,
        fontWeight,
        letterSpacing,
        lineHeight,
      }}
      aria-label={text}
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split("");

        return (
          <React.Fragment key={wordIdx}>
            <span className="inline-block whitespace-nowrap">
              {wordChars.map((char) => {
                const charIdx = globalCharCounter++;
                let influence = 0;
                let charX = 0;
                let charY = 0;
                let rotation = 0;
                let scaleX = 1;
                let scaleY = 1;

                if (dragIndex !== null) {
                  const distFromDrag = Math.abs(charIdx - dragIndex);
                  const sigma = Math.max(1, characters.length * tension * 0.28);
                  influence = Math.exp(-(distFromDrag * distFromDrag) / (2 * sigma * sigma));

                  charX = dragOffset.x * influence;
                  charY = dragOffset.y * influence;

                  if (tilt && influence > 0.05) {
                    rotation = (dragOffset.x * 0.12 - (charIdx - dragIndex) * (dragOffset.y * 0.08)) * influence;
                  }

                  if (squash && influence > 0.1) {
                    const stretchMag = Math.hypot(dragOffset.x, dragOffset.y) / 140;
                    scaleY = 1 + stretchMag * influence * 0.4;
                    scaleX = Math.max(0.7, 1 - stretchMag * influence * 0.2);
                  }
                }

                return (
                  <motion.span
                    key={charIdx}
                    data-char-idx={charIdx}
                    onPointerDown={(e) => handlePointerDown(e, charIdx)}
                    className="inline-block relative cursor-grab active:cursor-grabbing transform-gpu will-change-transform"
                    animate={{
                      x: charX,
                      y: charY,
                      rotate: rotation,
                      scaleX: scaleX,
                      scaleY: scaleY,
                      color: influence > 0.05 ? tensionColor : color,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: isDragging ? 550 : stiffness,
                      damping: isDragging ? 24 : damping,
                      mass: 0.6 + influence * 0.4,
                      bounce: bounce,
                    }}
                    style={{
                      textShadow:
                        influence > 0.2
                          ? `0 0 ${16 * influence}px rgba(232, 115, 72, ${0.45 * influence})`
                          : undefined,
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>

            {wordIdx < words.length - 1 && (() => {
              const spaceIdx = globalCharCounter++;
              return (
                <span
                  key={`space-${spaceIdx}`}
                  data-char-idx={spaceIdx}
                  className="inline-block w-[0.28em]"
                >
                  &nbsp;
                </span>
              );
            })()}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default ElasticLettering;
