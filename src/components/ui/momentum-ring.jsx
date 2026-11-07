import React, { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Momentum Ring / Vertical Reel Component (React Bits Pro Starter)
 * A 3D cylinder ring of cards that spins with momentum, applies dynamic
 * velocity-based motion blur, and clicks into place with spring snap physics.
 */
export function MomentumRing({
  items = [],
  direction = "vertical",
  radius = 360,
  cardWidth = 320,
  cardHeight = 420,
  autoRotateSpeed = 6,
  snap = true,
  motionBlur = true,
  maxBlur = 8,
  pauseOnHover = true,
  className,
  onItemSelect,
}) {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const lastPosRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);

  const count = items.length || 1;
  const angleStep = 360 / count;

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const snapToNearest = useCallback(() => {
    const currentRot = rotationRef.current;
    const nearestIndex = Math.round(currentRot / angleStep);
    const targetAngle = nearestIndex * angleStep;
    const normalizedIdx = ((-nearestIndex % count) + count) % count;
    setActiveIndex(normalizedIdx);

    let start = currentRot;
    let startTime = performance.now();
    const duration = 500;

    const animateSnap = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      const newAngle = start + (targetAngle - start) * ease;
      rotationRef.current = newAngle;
      setRotation(newAngle);

      if (progress < 1) {
        requestAnimationFrame(animateSnap);
      } else {
        velocityRef.current = 0;
        setVelocity(0);
      }
    };

    requestAnimationFrame(animateSnap);
  }, [angleStep, count]);

  useEffect(() => {
    let animationFrameId;
    let lastTick = performance.now();

    const loop = (now) => {
      const delta = (now - lastTick) / 1000;
      lastTick = now;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.05) {
          velocityRef.current *= Math.pow(0.92, delta * 60);
          rotationRef.current += velocityRef.current * delta * 60;
          setRotation(rotationRef.current);
          setVelocity(velocityRef.current);
        } else if (snap && Math.abs(velocityRef.current) > 0) {
          velocityRef.current = 0;
          snapToNearest();
        } else if (!isHovered && autoRotateSpeed > 0) {
          rotationRef.current += autoRotateSpeed * delta;
          setRotation(rotationRef.current);
          setVelocity(autoRotateSpeed * 0.1);
        } else {
          setVelocity(0);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, autoRotateSpeed, snap, snapToNearest]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    velocityRef.current = 0;
    setVelocity(0);

    const pos = direction === "vertical" ? e.clientY : e.clientX;
    lastPosRef.current = pos;
    lastTimeRef.current = performance.now();
    e.target.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const pos = direction === "vertical" ? e.clientY : e.clientX;
    const now = performance.now();
    const dt = Math.max(1, now - lastTimeRef.current);
    const dPos = pos - lastPosRef.current;

    const rotDelta = (dPos / radius) * (180 / Math.PI) * 1.4;
    rotationRef.current += (direction === "vertical" ? -rotDelta : rotDelta);
    setRotation(rotationRef.current);

    velocityRef.current = (rotDelta / dt) * 16;
    setVelocity(velocityRef.current);

    lastPosRef.current = pos;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
    try {
      e.target.releasePointerCapture?.(e.pointerId);
    } catch {}

    if (Math.abs(velocityRef.current) < 0.5 && snap) {
      snapToNearest();
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * 0.15;
    velocityRef.current += delta * 0.2;
    rotationRef.current += delta;
    setRotation(rotationRef.current);
  };

  const handleCardClick = (index, item) => {
    const targetAngle = -index * angleStep;
    const diff = (targetAngle - rotationRef.current) % 360;
    const shortestDiff = ((diff + 540) % 360) - 180;
    const newTarget = rotationRef.current + shortestDiff;

    let start = rotationRef.current;
    let startTime = performance.now();

    const animateClick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / 450);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = start + (newTarget - start) * ease;
      rotationRef.current = current;
      setRotation(current);

      if (progress < 1) {
        requestAnimationFrame(animateClick);
      } else {
        setActiveIndex(index);
        onItemSelect?.(item, index);
      }
    };

    requestAnimationFrame(animateClick);
  };

  const currentBlur = motionBlur
    ? Math.min(maxBlur, Math.abs(velocity) * 0.45)
    : 0;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      onMouseEnter={() => pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      className={cn(
        "relative w-full flex items-center justify-center select-none overflow-hidden touch-none py-16",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      style={{
        perspective: `${radius * 2.8}px`,
        perspectiveOrigin: "50% 50%",
        height: `${cardHeight + 140}px`,
      }}
    >
      <div
        className="relative transform-gpu will-change-transform"
        style={{
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          transformStyle: "preserve-3d",
          transform:
            direction === "vertical"
              ? `rotateX(${rotation}deg)`
              : `rotateY(${rotation}deg)`,
          filter: currentBlur > 0.4 ? `blur(${currentBlur.toFixed(1)}px)` : "none",
          transition: "filter 0.15s ease",
        }}
      >
        {items.map((item, index) => {
          const itemAngle = index * angleStep;
          const transform =
            direction === "vertical"
              ? `rotateX(${itemAngle}deg) translateZ(${radius}px)`
              : `rotateY(${itemAngle}deg) translateZ(${radius}px)`;

          const totalAngle = (rotation + itemAngle) % 360;
          const normalized = ((totalAngle % 360) + 360) % 360;
          const isFacing = normalized < 80 || normalized > 280;

          return (
            <div
              key={item.id || index}
              onClick={() => handleCardClick(index, item)}
              className={cn(
                "absolute inset-0 rounded-2xl p-6 flex flex-col justify-between overflow-hidden",
                "bg-[#141414] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.8)]",
                "transition-all duration-300 backface-hidden transform-gpu",
                isFacing ? "opacity-100 hover:border-[#E87348]/60" : "opacity-35 pointer-events-none"
              )}
              style={{
                transform,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E87348]">
                  {item.tag || `0${index + 1} / Case`}
                </span>
                <span className="text-xs text-white/40 font-mono">✦</span>
              </div>

              <div className="my-auto py-6 text-center relative z-10">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-36 object-cover rounded-xl border border-white/[0.06] mb-4"
                  />
                ) : (
                  <div className="h-32 rounded-xl bg-gradient-to-br from-[#1C1613] to-[#0F0F0F] border border-white/[0.06] flex items-center justify-center p-4">
                    <span className="font-serif text-2xl text-white italic">
                      {item.title}
                    </span>
                  </div>
                )}
                <h3 className="font-serif text-2xl text-white font-normal mt-3">
                  {item.title}
                </h3>
                {item.category && (
                  <p className="text-xs text-[#8A8A8A] font-light mt-1">
                    {item.category}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between relative z-10 text-xs">
                <span className="text-[#7A7A7A] font-light truncate max-w-[200px]">
                  {item.description || "Commercial Precision"}
                </span>
                <span className="text-[#E87348] font-mono text-[10px] uppercase tracking-wider">
                  View →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {direction === "vertical" ? (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-20" />
        </>
      )}
    </div>
  );
}

export default MomentumRing;

