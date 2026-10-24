"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { motion } from "@/lib/motion";

const dotPositions = [
  [4, 18], [11, 68], [19, 35], [27, 82], [35, 14], [43, 58],
  [52, 28], [60, 78], [69, 12], [77, 49], [86, 22], [95, 70],
  [7, 92], [30, 46], [56, 94], [91, 42], [73, 91], [16, 8],
];

export default function MagneticDots({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    if (!root || !layer) return;
    const dots = Array.from(layer.querySelectorAll<HTMLElement>("[data-magnetic-dot]"));
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const xTo = dots.map((dot) => gsap.quickTo(dot, "x", { duration: motion.duration.magnetic, ease: motion.ease.standard }));
    const yTo = dots.map((dot) => gsap.quickTo(dot, "y", { duration: motion.duration.magnetic, ease: motion.ease.standard }));

    const reset = () => {
      xTo.forEach((set) => set(0));
      yTo.forEach((set) => set(0));
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;
      // One rect read per event instead of one per dot: the dots are positioned
      // by percentage, so their centers derive from the layer box alone.
      const layerRect = layer.getBoundingClientRect();
      dots.forEach((dot, index) => {
        const [leftPercent, topPercent] = dotPositions[index];
        const centerX = layerRect.left + (leftPercent / 100) * layerRect.width + motion.magnetic.dotSize / 2;
        const centerY = layerRect.top + (topPercent / 100) * layerRect.height + motion.magnetic.dotSize / 2;
        const dx = event.clientX - centerX;
        const dy = event.clientY - centerY;
        const distance = Math.hypot(dx, dy);
        if (distance < motion.magnetic.radius) {
          const force = (motion.magnetic.radius - distance) / motion.magnetic.radius;
          xTo[index](dx * force * motion.magnetic.force);
          yTo[index](dy * force * motion.magnetic.force);
        } else {
          xTo[index](0);
          yTo[index](0);
        }
      });
    };
    const updateMotion = () => { if (reducedMotion.matches || !finePointer.matches) reset(); };
    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", reset);
    finePointer.addEventListener("change", updateMotion);
    reducedMotion.addEventListener("change", updateMotion);

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", reset);
      finePointer.removeEventListener("change", updateMotion);
      reducedMotion.removeEventListener("change", updateMotion);
      dots.forEach((dot) => gsap.killTweensOf(dot));
    };
  }, []);

  return (
    <div ref={rootRef} className="magnetic-heading">
      <div ref={layerRef} className="magnetic-heading__dots" aria-hidden="true">
        {dotPositions.map(([left, top], index) => (
          <span key={index} data-magnetic-dot style={{ left: `${left}%`, top: `${top}%` }} />
        ))}
      </div>
      {children}
    </div>
  );
}
