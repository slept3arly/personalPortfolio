"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function BackgroundLight() {
  const lightRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let moveX: ((value: number) => void) | undefined;
    let moveY: ((value: number) => void) | undefined;
    const move = (event: PointerEvent) => {
      moveX?.(event.clientX);
      moveY?.(event.clientY);
    };
    const setup = () => {
      window.removeEventListener("pointermove", move);
      gsap.killTweensOf(light);
      gsap.set(light, { opacity: 0 });
      if (!pointer.matches || reduce.matches) return;
      moveX = gsap.quickTo(light, "x", { duration: 0.35, ease: "power2.out" });
      moveY = gsap.quickTo(light, "y", { duration: 0.35, ease: "power2.out" });
      window.addEventListener("pointermove", move, { passive: true });
      gsap.to(light, { opacity: 1, duration: 0.45, ease: "power2.out" });
    };
    setup();
    pointer.addEventListener("change", setup);
    reduce.addEventListener("change", setup);
    return () => {
      window.removeEventListener("pointermove", move);
      pointer.removeEventListener("change", setup);
      reduce.removeEventListener("change", setup);
      gsap.killTweensOf(light);
      gsap.set(light, { clearProps: "all" });
      moveX = undefined;
      moveY = undefined;
    };
  }, [reducedMotion]);

  return <div ref={lightRef} className="background-light" aria-hidden="true" />;
}
