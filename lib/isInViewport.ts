export function isInViewport(element: Element, threshold = 0.2) {
  if (typeof window === "undefined") {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const ratio = rect.height > 0 ? visibleHeight / rect.height : 0;

  return ratio >= threshold;
}
