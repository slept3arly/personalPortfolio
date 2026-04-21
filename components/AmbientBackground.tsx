"use client";

import { useEffect, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useMousePosition({
    disabled: reducedMotion,
    smoothing: 0.08,
    onChange: ({ normalizedX, normalizedY }) => {
      const element = ref.current;
      if (!element) {
        return;
      }

      element.style.setProperty("--ambient-x", `${normalizedX * 100}%`);
      element.style.setProperty("--ambient-y", `${normalizedY * 100}%`);
      element.style.setProperty("--ambient-shift-x", `${(normalizedX - 0.5) * 28}px`);
      element.style.setProperty("--ambient-shift-y", `${(normalizedY - 0.5) * 22}px`);
    },
  });

  return (
    <div ref={ref} className="ambient-background" aria-hidden="true">
      <div className="ambient-orb ambient-orb-primary" />
      <div className="ambient-orb ambient-orb-secondary" />
      <div className="ambient-grid" />
      <div className="ambient-dots" />
      <div className="ambient-cursor" />
      <div className="ambient-noise" />
    </div>
  );
}
