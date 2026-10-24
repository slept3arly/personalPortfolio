"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** One scoped, fail-open center-out curtain reveal for the hero name only. */
export function useCurtainReveal(elementRef: RefObject<HTMLElement | null>) {
  const hasCompletedRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;
    if (!element || reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches || hasCompletedRef.current) {
      return;
    }

    let context: gsap.Context | undefined;
    try {
      context = gsap.context(() => {
        gsap.from(element, {
          // The target is a padded wrapper, so the center-out wipe clips the
          // text inside a line box with extra clearance for glyph overhang.
          clipPath: "inset(-0.18em 50% -0.18em 50%)",
          duration: 1,
          ease: "power3.inOut",
          clearProps: "clipPath",
          onComplete: () => { hasCompletedRef.current = true; },
        });
      }, element);
    } catch {
      context?.revert();
      gsap.killTweensOf(element);
      gsap.set(element, { clearProps: "clipPath" });
    }

    return () => context?.revert();
  }, [elementRef, reducedMotion]);
}
