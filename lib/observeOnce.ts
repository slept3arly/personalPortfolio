import { motion } from "./motion";

/**
 * Calls `onEnter` once, the first time `element` enters the viewport.
 *
 * The trigger policy is identical for the immediate check and the observer:
 * an element counts as "entered" as soon as any part of it is inside the
 * viewport above the shared reveal line (`motion.trigger.revealLine`),
 * regardless of how much of it is visible. Elements taller than the viewport
 * therefore trigger at the same moment as short ones.
 */
export function observeOnce(element: Element, onEnter: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const entered = () => {
    const rect = element.getBoundingClientRect();
    const line = window.innerHeight * motion.trigger.revealLine;
    return rect.top < line && rect.bottom > 0;
  };

  if (entered()) {
    onEnter();
    return () => {};
  }

  if (!("IntersectionObserver" in window)) {
    onEnter();
    return () => {};
  }

  const bottomInsetPercent = Math.round((1 - motion.trigger.revealLine) * 100);
  let done = false;
  let frame = 0;
  let observer: IntersectionObserver | undefined;
  const cleanup = () => {
    observer?.disconnect();
    window.removeEventListener("scroll", scheduleCheck);
    window.removeEventListener("resize", scheduleCheck);
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  };
  const finish = () => {
    if (done) return;
    done = true;
    cleanup();
    onEnter();
  };
  const scheduleCheck = () => {
    if (frame || done) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      if (entered()) finish();
    });
  };

  try {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) finish();
      },
      { rootMargin: `0px 0px -${bottomInsetPercent}% 0px` },
    );
    observer.observe(element);
  } catch {
    observer?.disconnect();
    onEnter();
    return () => {};
  }

  // Scroll/resize checks are a fail-open backup if IntersectionObserver misses
  // an entry (for example, for a tall section crossing the reveal line).
  window.addEventListener("scroll", scheduleCheck, { passive: true });
  window.addEventListener("resize", scheduleCheck);

  return () => {
    if (done) return;
    done = true;
    cleanup();
  };
}
