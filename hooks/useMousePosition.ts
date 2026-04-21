"use client";

import { useEffect, useEffectEvent } from "react";

type MousePosition = {
  x: number;
  y: number;
  normalizedX: number;
  normalizedY: number;
};

type UseMousePositionOptions = {
  disabled?: boolean;
  smoothing?: number;
  onChange?: (position: MousePosition) => void;
};

export function useMousePosition({
  disabled = false,
  smoothing = 0.1,
  onChange,
}: UseMousePositionOptions = {}) {
  const emitChange = useEffectEvent((position: MousePosition) => {
    onChange?.(position);
  });

  useEffect(() => {
    if (disabled) {
      return;
    }

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const updateTarget = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
    };

    const handleResize = () => {
      targetX = window.innerWidth / 2;
      targetY = window.innerHeight / 2;
      currentX = targetX;
      currentY = targetY;
    };

    const loop = () => {
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;

      emitChange({
        x: currentX,
        y: currentY,
        normalizedX: window.innerWidth ? currentX / window.innerWidth : 0.5,
        normalizedY: window.innerHeight ? currentY / window.innerHeight : 0.5,
      });

      frame = window.requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", updateTarget, { passive: true });
    window.addEventListener("resize", handleResize);
    frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updateTarget);
      window.removeEventListener("resize", handleResize);
    };
  }, [disabled, smoothing]);
}
