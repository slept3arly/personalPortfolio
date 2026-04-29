import { isInViewport } from "./isInViewport";

type Options = {
  threshold?: number;
  rootMargin?: string;
  onEnter: () => void;
};

export function observeOnce(element: Element, { threshold = 0.2, rootMargin = "0px 0px -8% 0px", onEnter }: Options) {
  if (typeof window === "undefined") {
    return () => {};
  }

  if (isInViewport(element, threshold) || !("IntersectionObserver" in window)) {
    onEnter();
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        onEnter();
      }
    },
    {
      threshold,
      rootMargin,
    },
  );

  observer.observe(element);

  return () => observer.disconnect();
}
