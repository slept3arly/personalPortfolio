"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import gsap from "@/lib/gsap";
import { motion } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Direction = "next" | "previous";

type ActiveTransition = {
  outgoing: HTMLElement;
  incoming: HTMLElement;
  timeline: gsap.core.Timeline;
  finish: () => void;
};

type Options = {
  count: number;
  /** Projects historically reorder if the viewport is widened after cycling. */
  applyOrderOnDesktop?: boolean;
};

export type MobileCardCarouselState = {
  containerRef: RefObject<HTMLDivElement | null>;
  position: number;
  isAnimating: boolean;
  isBusy: () => boolean;
  next: () => void;
  previous: () => void;
};

const EXIT_DURATION = 0.2;
const ENTER_DELAY = 0.1;
const ENTER_DURATION = 0.26;
const STACK_DURATION = 0.36;
const CARD_TRAVEL = 16;

function stackMetrics(container: HTMLDivElement) {
  const styles = window.getComputedStyle(container);
  const rootFontSize = Number.parseFloat(styles.fontSize) || 16;
  const step = Number.parseFloat(styles.getPropertyValue("--mobile-carousel-stack-step")) || 0.38;
  const scaleStep = Number.parseFloat(styles.getPropertyValue("--mobile-carousel-stack-scale-step")) || 0.015;
  return { offset: step * rootFontSize, scale: scaleStep };
}

function syncItems(container: HTMLDivElement, order: number[], mobile: boolean, applyOrderOnDesktop: boolean) {
  const { offset, scale } = stackMetrics(container);
  container.querySelectorAll<HTMLElement>("[data-carousel-item]").forEach((item) => {
    const itemIndex = Number(item.dataset.carouselItem);
    const stackPosition = order.indexOf(itemIndex);
    item.style.setProperty("--stack-position", String(stackPosition));
    item.style.setProperty("--stack-offset", `${stackPosition * offset}px`);
    item.style.setProperty("--stack-scale", String(1 - stackPosition * scale));
    item.style.order = mobile || applyOrderOnDesktop ? String(stackPosition) : "";
    item.dataset.stackPosition = String(stackPosition);
    item.dataset.stackVisible = String(stackPosition <= 3);
    const behind = mobile && stackPosition !== 0;
    if (behind) item.setAttribute("aria-hidden", "true");
    else item.removeAttribute("aria-hidden");
    item.inert = behind;
  });
}

export function useMobileCardCarousel({ count, applyOrderOnDesktop = false }: Options): MobileCardCarouselState {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [order, setOrder] = useState(() => Array.from({ length: count }, (_, index) => index));
  const orderRef = useRef(order);
  const [isAnimating, setIsAnimating] = useState(false);
  const busyRef = useRef(false);
  const activeTransitionRef = useRef<ActiveTransition | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const mobile = window.matchMedia("(max-width: 639px)");
    container.classList.add("is-stack-ready");
    syncItems(container, orderRef.current, mobile.matches, applyOrderOnDesktop);
    const onBreakpointChange = () => {
      if (!mobile.matches) activeTransitionRef.current?.finish();
      syncItems(container, orderRef.current, mobile.matches, applyOrderOnDesktop);
    };
    mobile.addEventListener("change", onBreakpointChange);
    return () => {
      mobile.removeEventListener("change", onBreakpointChange);
      container.classList.remove("is-stack-ready");
      container.querySelectorAll<HTMLElement>("[data-carousel-item]").forEach((item) => {
        item.removeAttribute("aria-hidden");
        item.removeAttribute("data-stack-position");
        item.removeAttribute("data-stack-visible");
        item.style.removeProperty("--stack-position");
        item.style.removeProperty("--stack-offset");
        item.style.removeProperty("--stack-scale");
        item.style.order = "";
        item.inert = false;
      });
    };
  }, [applyOrderOnDesktop]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    orderRef.current = order;
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    syncItems(container, order, mobile, applyOrderOnDesktop);
    container.querySelectorAll<HTMLElement>(".is-entering, .is-exiting, .is-stack-revealing, .is-stacking").forEach((item) => {
      item.classList.remove("is-entering", "is-exiting", "is-stack-revealing", "is-stacking");
    });
  }, [order, applyOrderOnDesktop]);

  const navigate = (direction: Direction) => {
    if (busyRef.current || count < 2) return;
    const container = containerRef.current;
    if (!container) return;

    const currentOrder = orderRef.current;
    const nextOrder = direction === "next"
      ? [...currentOrder.slice(1), currentOrder[0]]
      : [currentOrder[currentOrder.length - 1], ...currentOrder.slice(0, -1)];
    const outgoing = container.querySelector<HTMLElement>(`[data-carousel-item="${currentOrder[0]}"]`);
    const incoming = container.querySelector<HTMLElement>(`[data-carousel-item="${nextOrder[0]}"]`);
    if (!outgoing || !incoming) return;

    busyRef.current = true;
    setIsAnimating(true);
    const directionSign = direction === "next" ? -1 : 1;
    const { offset, scale } = stackMetrics(container);
    const items = Array.from(container.querySelectorAll<HTMLElement>("[data-carousel-item]"));
    const oldPositions = new Map(items.map((item) => [item, currentOrder.indexOf(Number(item.dataset.carouselItem))]));
    // Establish the incoming card's initial visual state before making its
    // layer visible. A delayed entrance can otherwise leave one painted frame
    // at the card's resting opacity and stack position.
    const incomingStackPosition = direction === "next" ? 1 : 0;
    gsap.set(incoming, {
      x: -directionSign * CARD_TRAVEL,
      opacity: 0,
      "--stack-offset": `${incomingStackPosition * offset}px`,
      "--stack-scale": String(1 - incomingStackPosition * scale),
    });
    outgoing.classList.add("is-exiting");
    incoming.classList.add("is-entering");
    items.forEach((item) => {
      const oldPosition = oldPositions.get(item) ?? -1;
      const targetPosition = nextOrder.indexOf(Number(item.dataset.carouselItem));
      if (oldPosition > 3 && targetPosition <= 3) item.classList.add("is-stack-revealing");
    });

    let finished = false;
    let transition: ActiveTransition | null = null;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (transition && activeTransitionRef.current === transition) {
        transition.timeline.kill();
        activeTransitionRef.current = null;
      }
      // Only clear properties owned by this transition. Other reveal or
      // component animations on nested content must remain undisturbed.
      gsap.set([outgoing, incoming], { x: 0, opacity: 1 });
      items.forEach((item) => item.classList.remove("is-entering", "is-exiting", "is-stack-revealing", "is-stacking"));
      orderRef.current = nextOrder;
      syncItems(container, nextOrder, window.matchMedia("(max-width: 639px)").matches, applyOrderOnDesktop);
      setOrder(nextOrder);
      busyRef.current = false;
      setIsAnimating(false);
    };

    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    try {
      const timeline = gsap.timeline({ onComplete: finish });
      transition = { outgoing, incoming, timeline, finish };
      activeTransitionRef.current = transition;

      timeline.to(outgoing, {
        x: directionSign * CARD_TRAVEL,
        opacity: 0,
        duration: EXIT_DURATION,
        ease: "power2.in",
      }, 0);
      timeline.to(incoming, {
        x: 0,
        opacity: 1,
        duration: ENTER_DURATION,
        ease: motion.ease.standard,
      }, ENTER_DELAY);

      items.forEach((item) => {
        if (item === outgoing || item === incoming) return;
        const oldPosition = oldPositions.get(item) ?? -1;
        const targetPosition = nextOrder.indexOf(Number(item.dataset.carouselItem));
        if (oldPosition === targetPosition) return;
        timeline.to(item, {
          "--stack-offset": `${targetPosition * offset}px`,
          "--stack-scale": String(1 - targetPosition * scale),
          duration: STACK_DURATION,
          ease: motion.ease.standard,
        }, 0);
      });

      timeline.to(incoming, {
        "--stack-offset": "0px",
        "--stack-scale": "1",
        duration: STACK_DURATION,
        ease: motion.ease.standard,
      }, 0);

      const outgoingTargetPosition = nextOrder.indexOf(Number(outgoing.dataset.carouselItem));
      timeline.to(outgoing, {
        "--stack-offset": `${outgoingTargetPosition * offset}px`,
        "--stack-scale": String(1 - outgoingTargetPosition * scale),
        duration: STACK_DURATION,
        ease: motion.ease.standard,
      }, 0);

      if (outgoingTargetPosition <= 3) {
        timeline.call(() => outgoing.classList.add("is-stacking"), [], EXIT_DURATION);
        timeline.to(outgoing, {
          x: 0,
          opacity: 1,
          duration: STACK_DURATION - EXIT_DURATION,
          ease: motion.ease.standard,
        }, EXIT_DURATION);
      }

      // If the outgoing card remains in the visible stack, it returns as a
      // quiet background layer after its foreground content has exited.
    } catch {
      activeTransitionRef.current?.timeline.kill();
      finish();
    }
  };

  useLayoutEffect(() => () => {
    const active = activeTransitionRef.current;
    if (!active) return;
    active.timeline.kill();
    gsap.set([active.outgoing, active.incoming], { x: 0, opacity: 1 });
    const container = containerRef.current;
    const items = container ? Array.from(container.querySelectorAll<HTMLElement>("[data-carousel-item]")) : [active.outgoing, active.incoming];
    items.forEach((item) => item.classList.remove("is-entering", "is-exiting", "is-stack-revealing", "is-stacking"));
    activeTransitionRef.current = null;
    busyRef.current = false;
  }, []);

  useEffect(() => {
    if (!reducedMotion) return;
    activeTransitionRef.current?.finish();
  }, [reducedMotion]);

  return {
    containerRef,
    position: order[0] + 1,
    isAnimating,
    isBusy: () => busyRef.current,
    next: () => navigate("next"),
    previous: () => navigate("previous"),
  };
}
