"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/motion";
import { observeOnce } from "@/lib/observeOnce";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// Layout effects run before paint on the client, so the hide never flashes
// after hydration, but they warn during SSR where they do nothing. Using the
// plain effect on the server avoids the warning.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type ElementRef = RefObject<HTMLElement | null>;
type ElementArrayRef = RefObject<Array<HTMLElement | null>>;
type Target = ElementRef | ElementArrayRef;

export type RevealGroup = {
  /** A single ref, an array-ref, or a list of refs whose elements animate together. */
  targets: Target | ReadonlyArray<Target>;
  /** Timeline offset in seconds. Defaults to the primary content delay. */
  delay?: number;
  /** Per-element duration in seconds. Defaults to the section-content duration. */
  duration?: number;
  /** Stagger between elements in seconds. Defaults to 0 (single elements). */
  stagger?: number;
  /** Start after all elements in the preceding group have finished. */
  afterPrevious?: boolean;
  /** Optionally reveal a group only when a media query matches. */
  media?: string;
};

function resolveRef(ref: Target): HTMLElement[] {
  const value = ref.current as HTMLElement | HTMLElement[] | null | undefined;
  if (!value) return [];
  return Array.isArray(value)
    ? value.filter((element): element is HTMLElement => element instanceof HTMLElement)
    : [value];
}

function resolveTargets(group: RevealGroup): HTMLElement[] {
  const refs: ReadonlyArray<Target> = Array.isArray(group.targets) ? group.targets : [group.targets];
  return refs.flatMap(resolveRef);
}

/**
 * Shared section-reveal behavior.
 *
 * The listed elements start hidden only once the effect runs on the client —
 * the server-rendered markup is always fully visible, so content never depends
 * on GSAP, an observer, or a ref being available. If any part of setup fails,
 * the content is left (or restored) in its natural visible state.
 *
 * Elements fade/rise in once, when the section top crosses the shared reveal
 * line (`motion.trigger.revealLine`). Headings are deliberately not part of
 * this: the SplitText cascade owns them.
 */
export function useReveal<T extends HTMLElement>(
  rootRef: RefObject<T | null>,
  groups: RevealGroup[],
): void {
  // Callers pass a fresh array each render; keep the newest copy in a ref so
  // the setup effect below runs only once per mount.
  const groupsRef = useRef(groups);
  useEffect(() => {
    groupsRef.current = groups;
  }, [groups]);

  const reducedMotion = usePrefersReducedMotion();
  const teardownRef = useRef<(() => void) | null>(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let hasPlayed = false;
    let stopReveal: (() => void) | undefined;
    let timeline: gsap.core.Timeline | undefined;
    let ctx: gsap.Context | undefined;
    const mediaQueries = Array.from(new Set(groupsRef.current.flatMap((group) => group.media ? [group.media] : [])))
      .map((query) => window.matchMedia(query));

    const teardownAnimation = () => {
      stopReveal?.();
      timeline?.kill();
      ctx?.revert();
      stopReveal = undefined;
      timeline = undefined;
      ctx = undefined;
      teardownRef.current = null;
    };

    const setupAnimation = () => {
      if (hasPlayed || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const resolved = groupsRef.current
        .filter((group) => !group.media || window.matchMedia(group.media).matches)
        .map((group) => ({
          targets: resolveTargets(group),
          delay: group.delay ?? motion.reveal.delay.content,
          duration: group.duration ?? motion.duration.sectionContent,
          stagger: group.stagger ?? 0,
          afterPrevious: group.afterPrevious ?? false,
        }))
        .filter((group) => group.targets.length > 0);

      // Missing refs or nothing to animate: leave the content visible instead
      // of hiding it behind an animation that will never run.
      if (resolved.length === 0) return;

      let previousEnd = 0;
      const sequenced = resolved.map((group) => {
        const start = group.afterPrevious ? previousEnd : group.delay;
        const span = group.duration + group.stagger * Math.max(0, group.targets.length - 1);
        previousEnd = Math.max(previousEnd, start + span);
        return { ...group, start };
      });
      const all = sequenced.flatMap((group) => group.targets);

      try {
        ctx = gsap.context(() => {
          gsap.set(all, { opacity: 0, y: motion.reveal.y });
          timeline = gsap.timeline({ paused: true, defaults: { ease: motion.ease.standard } });
          for (const group of sequenced) {
            timeline.to(
              group.targets,
              {
                opacity: 1,
                y: 0,
                duration: group.duration,
                stagger: group.stagger,
              },
              group.start,
            );
          }
        }, root);
        stopReveal = observeOnce(root, () => {
          hasPlayed = true;
          timeline?.play(0);
        });
        teardownRef.current = teardownAnimation;
      } catch {
        // If setup fails part-way, restore the natural visible state.
        teardownAnimation();
        gsap.killTweensOf(all);
        gsap.set(all, { clearProps: "opacity,visibility,transform" });
      }
    };

    setupAnimation();
    const onMediaChange = () => {
      if (hasPlayed) {
        teardownAnimation();
        return;
      }
      teardownAnimation();
      setupAnimation();
    };
    mediaQueries.forEach((query) => query.addEventListener("change", onMediaChange));

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener("change", onMediaChange));
      teardownAnimation();
    };
    // Run once per mount: the inputs below are stable refs and module
    // constants, so a change in the caller's re-renders never invalidates it.
  }, [rootRef]);

  // If the preference is enabled mid-session, drop any in-flight reveal and
  // show the content immediately. Disabling it again does not replay reveals.
  useEffect(() => {
    if (!reducedMotion) return;
    const teardown = teardownRef.current;
    teardownRef.current = null;
    teardown?.();
  }, [reducedMotion]);
}
