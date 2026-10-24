"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Tracks the user's `prefers-reduced-motion` preference, including changes
 * made while the page is open. The server snapshot is `false` so the initial
 * server-rendered markup matches the first client render; effects that must
 * avoid a hidden-content flash should still read matchMedia directly at setup
 * time (see `useReveal`).
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
