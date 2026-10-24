"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";
import { motion } from "@/lib/motion";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
  { label: "Resume", href: "/resume.pdf", id: "resume" },
] as const;

const navItemIds = new Set<string>(navItems.map((item) => item.id));

/**
 * The active nav item is derived from the scroll position alone — scroll
 * position is the single source of truth, so clicks, manual scrolling, direct
 * hash loads and back/forward navigation can never disagree.
 *
 * Page sections without their own nav item map to the closest preceding nav
 * item, so the indicator always reflects where the reader is:
 *
 *   tech-stack → Projects · education / certifications → Experience
 *
 * (The Resume nav item links to the PDF, but the page also has a #resume
 * section; when the reader is at that section, the Resume item is active.)
 * Sections missing from this map are ignored for highlighting.
 */
const sectionToNavItem: Record<string, string> = {
  about: "about",
  projects: "projects",
  "tech-stack": "projects",
  experience: "experience",
  education: "experience",
  certifications: "experience",
  resume: "resume",
  contact: "contact",
};

function navItemForSection(sectionId: string): string | null {
  const mapped = sectionToNavItem[sectionId];
  if (mapped) return mapped;
  return navItemIds.has(sectionId) ? sectionId : null;
}

export default function Navbar() {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const activeIdRef = useRef<string | null>(null);
  const pointerHighlightIdRef = useRef<string | null>(null);
  const focusHighlightIdRef = useRef<string | null>(null);
  const scheduleMeasureRef = useRef<(() => void) | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Navbar background: only `opacity` is animated; the frosted-glass look is
  // static CSS. Scroll is rAF-throttled and tweens are overwritten.
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isScrolled = false;
    let raf = 0;
    gsap.set(bg, { opacity: motion.navbar.bgOpacityRest });
    const update = () => {
      const shouldShow = window.scrollY > motion.navbar.scrolledThreshold;
      if (shouldShow === isScrolled) return;
      isScrolled = shouldShow;
      const opacity = shouldShow ? motion.navbar.bgOpacityScrolled : motion.navbar.bgOpacityRest;
      if (reducedMotion.matches) gsap.set(bg, { opacity });
      else gsap.to(bg, { opacity, duration: motion.duration.navbar, ease: motion.ease.standard, overwrite: true });
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => { raf = 0; update(); });
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
      gsap.killTweensOf(bg);
    };
  }, []);

  // Active section detection. The anchor line sits at `anchorRatio` of the
  // viewport height: the section containing the line wins; otherwise the last
  // section above the line. At the very bottom of the document the final
  // section wins instead — its top can never reach the line there. Before the
  // first section reaches the line (top of the page) nothing is active.
  useEffect(() => {
    let raf = 0;
    const detect = () => {
      raf = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
      const doc = document.documentElement;
      const anchorY = window.innerHeight * motion.navbar.anchorRatio;
      const scrollable = doc.scrollHeight > window.innerHeight;
      const atBottom =
        scrollable &&
        window.innerHeight + window.scrollY >= doc.scrollHeight - motion.navbar.bottomEpsilon;

      let sectionId: string | null = null;
      if (atBottom) {
        for (let index = sections.length - 1; index >= 0; index -= 1) {
          if (navItemForSection(sections[index].id)) {
            sectionId = sections[index].id;
            break;
          }
        }
      } else {
        let lastPassedId: string | null = null;
        for (const section of sections) {
          if (!navItemForSection(section.id)) continue;
          const rect = section.getBoundingClientRect();
          if (rect.top <= anchorY && rect.bottom > anchorY) {
            sectionId = section.id;
            break;
          }
          if (rect.top <= anchorY) lastPassedId = section.id;
        }
        if (!sectionId) sectionId = lastPassedId;
      }

      const next = sectionId ? navItemForSection(sectionId) : null;
      activeIdRef.current = next;
      setActiveId((current) => (current === next ? current : next));
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(detect);
    };
    detect();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  // Indicator measurement. Listeners are registered once; `scheduleMeasureRef`
  // lets the active-id effect below request a re-measure without re-registering
  // anything (no accumulated fonts.ready callbacks, no per-change observers).
  useEffect(() => {
    const viewport = viewportRef.current;
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!viewport || !nav || !indicator) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tween: gsap.core.Tween | undefined;
    let frame = 0;
    let disposed = false;

    const measure = () => {
      frame = 0;
      // Kill any in-flight tween before every path — including early returns —
      // so a stale pill can never reappear over an inactive item.
      tween?.kill();
      const highlightedId = pointerHighlightIdRef.current ?? focusHighlightIdRef.current ?? activeIdRef.current;
      const target = highlightedId ? linkRefs.current[highlightedId] : null;
      if (!target || target.getClientRects().length === 0) {
        gsap.set(indicator, { opacity: 0 });
        return;
      }
      // Rect differences stay correct while the compact pill is horizontally
      // scrolled on small screens. The indicator is positioned against the
      // nav's padding box, whose left edge coincides with its border box
      // (`.nav-desktop` has no border), so this math needs no padding offset.
      const navRect = nav.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const horizontalBleed = motion.navbar.indicatorBleed;
      const itemIndex = navItems.findIndex((item) => item.id === highlightedId);
      const navPadding = getComputedStyle(nav);
      const leftPadding = Number.parseFloat(navPadding.paddingLeft);
      const rightPadding = Number.parseFloat(navPadding.paddingRight);
      const leftBleed = itemIndex === 0 ? Math.max(0, leftPadding - horizontalBleed) : horizontalBleed;
      const rightBleed = itemIndex === navItems.length - 1
        ? Math.max(0, rightPadding - horizontalBleed)
        : horizontalBleed;
      const viewportRect = viewport.getBoundingClientRect();
      const minLeft = viewportRect.left - navRect.left + horizontalBleed;
      const maxRight = viewportRect.right - navRect.left - horizontalBleed;
      const left = Math.max(minLeft, targetRect.left - navRect.left - leftBleed);
      const right = Math.min(maxRight, targetRect.right - navRect.left + rightBleed);
      const width = Math.max(0, right - left);
      if (reducedMotion.matches) gsap.set(indicator, { left, width, opacity: 1 });
      else tween = gsap.to(indicator, { left, width, opacity: 1, duration: motion.duration.navbar, ease: motion.ease.standard, overwrite: true });
    };
    const schedule = () => {
      if (disposed || frame) return;
      frame = window.requestAnimationFrame(measure);
    };
    const navItemIdFromTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      return target.closest<HTMLAnchorElement>("[data-nav-id]")?.dataset.navId ?? null;
    };
    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const nextId = navItemIdFromTarget(event.target);
      if (!nextId || nextId === pointerHighlightIdRef.current) return;
      pointerHighlightIdRef.current = nextId;
      schedule();
    };
    const onPointerOut = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const nextId = navItemIdFromTarget(event.relatedTarget);
      if (nextId === pointerHighlightIdRef.current) return;
      pointerHighlightIdRef.current = nextId;
      schedule();
    };
    const onFocusIn = (event: FocusEvent) => {
      const nextId = navItemIdFromTarget(event.target);
      const hadPointerHighlight = pointerHighlightIdRef.current !== null;
      pointerHighlightIdRef.current = null;
      if (!nextId || (nextId === focusHighlightIdRef.current && !hadPointerHighlight)) return;
      focusHighlightIdRef.current = nextId;
      schedule();
    };
    const onFocusOut = (event: FocusEvent) => {
      const nextId = navItemIdFromTarget(event.relatedTarget);
      if (nextId === focusHighlightIdRef.current) return;
      focusHighlightIdRef.current = nextId;
      schedule();
    };
    scheduleMeasureRef.current = schedule;

    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(viewport);
    resizeObserver.observe(nav);
    Object.values(linkRefs.current).forEach((link) => { if (link) resizeObserver.observe(link); });
    viewport.addEventListener("scroll", schedule, { passive: true });
    nav.addEventListener("pointerover", onPointerOver);
    nav.addEventListener("pointerout", onPointerOut);
    nav.addEventListener("focusin", onFocusIn);
    nav.addEventListener("focusout", onFocusOut);
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);
    document.fonts?.ready.then(() => { if (!disposed) schedule(); });
    schedule();

    return () => {
      disposed = true;
      scheduleMeasureRef.current = null;
      resizeObserver.disconnect();
      viewport.removeEventListener("scroll", schedule);
      nav.removeEventListener("pointerover", onPointerOver);
      nav.removeEventListener("pointerout", onPointerOut);
      nav.removeEventListener("focusin", onFocusIn);
      nav.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      tween?.kill();
      gsap.killTweensOf(indicator);
    };
  }, []);

  // Re-measure the indicator whenever the active item changes.
  useEffect(() => {
    scheduleMeasureRef.current?.();
  }, [activeId]);

  // Keep the active link visible inside the horizontally scrollable pill.
  useEffect(() => {
    if (!activeId) return;
    const viewport = viewportRef.current;
    const target = linkRefs.current[activeId];
    if (!viewport || !target || target.getClientRects().length === 0) return;
    const view = viewport.getBoundingClientRect();
    const link = target.getBoundingClientRect();
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    if (link.left < view.left) viewport.scrollTo({ left: viewport.scrollLeft + link.left - view.left - 8, behavior });
    else if (link.right > view.right) viewport.scrollTo({ left: viewport.scrollLeft + link.right - view.right + 8, behavior });
  }, [activeId]);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex justify-center px-2 pt-3 sm:px-6 sm:pt-5" aria-label="Primary">
      <div ref={viewportRef} className="navbar-pill relative">
        <div ref={bgRef} className="navbar-pill__bg" aria-hidden="true" />
        <div ref={navRef} className="nav-desktop relative z-10 flex items-center gap-x-1 px-2 py-1 sm:px-3">
          <span ref={indicatorRef} className="nav-indicator" aria-hidden="true" />
          {navItems.map((item) => (
            <a
              key={item.id}
              ref={(node) => { linkRefs.current[item.id] = node; }}
              href={item.href}
              data-nav-id={item.id}
              target={item.id === "resume" ? "_blank" : undefined}
              rel={item.id === "resume" ? "noreferrer" : undefined}
              aria-current={activeId === item.id ? "location" : undefined}
              className={`nav-link ${item.id === "resume" ? "nav-link--cta nav-link--desktop-only" : ""} ${activeId === item.id ? "nav-link--active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
