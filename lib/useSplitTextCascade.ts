"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap, { ScrollTrigger, SplitText } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/** One fail-open, one-time word cascade for semantic section headings. */
export function useSplitTextCascade<T extends HTMLElement>(elementRef: RefObject<T | null>) {
  const hasCompletedRef = useRef(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    if (!element || reducedMotion || hasCompletedRef.current) return;

    let splitText: SplitText | undefined;
    let trigger: ScrollTrigger | undefined;
    let tween: gsap.core.Tween | undefined;
    const cleanup = () => {
      trigger?.kill();
      trigger = undefined;
      tween?.revert();
      tween = undefined;
      splitText?.revert();
      splitText = undefined;
    };

    try {
      splitText = SplitText.create(element, { type: "words", wordsClass: "split-word" });
      const targets = splitText.words;
      trigger = ScrollTrigger.create({
        trigger: element,
        start: motion.heading.start,
        once: true,
        onEnter: () => {
          if (hasCompletedRef.current) return;
          try {
            tween = gsap.from(targets, {
              opacity: 0,
              y: motion.heading.y,
              rotation: motion.heading.rotation,
              duration: motion.duration.heading,
              stagger: motion.stagger.headingWords,
              ease: motion.ease.heading,
              clearProps: "opacity,visibility,transform",
              onComplete: () => { hasCompletedRef.current = true; },
            });
          } catch {
            cleanup();
          }
        },
      });
    } catch {
      // Leave plain text if SplitText or ScrollTrigger cannot initialize.
      cleanup();
      return;
    }

    return cleanup;
  }, [elementRef, reducedMotion]);
}
