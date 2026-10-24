"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function FooterWaves() {
  const wavesRef = useRef<SVGSVGElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const svg = wavesRef.current;
    if (!svg) return;
    const waves = Array.from(svg.querySelectorAll<SVGPathElement>(".footer-wave"));
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !waves.length) {
      gsap.set(waves, { clearProps: "all" });
      return;
    }
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    waves.forEach((wave, index) => {
      timeline.to(wave, {
        y: -8 + index * 3,
        scaleX: 1.025,
        transformOrigin: "center center",
        opacity: 0.12 + index * 0.025,
        duration: 3 + index * 0.6,
        ease: "sine.inOut",
      }, 0);
    });
    return () => {
      timeline.kill();
      gsap.set(waves, { clearProps: "transform,opacity" });
    };
  }, [reducedMotion]);

  return (
    <svg ref={wavesRef} className="footer-waves" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true">
      <path className="footer-wave" d="M-40 95 C120 35 240 150 400 92 S680 35 840 92 1080 145 1240 78" />
      <path className="footer-wave" d="M-40 112 C130 58 260 162 440 112 S730 55 900 108 1090 155 1240 100" />
      <path className="footer-wave" d="M-40 128 C120 84 290 170 480 128 S760 77 940 122 1110 170 1240 122" />
    </svg>
  );
}
