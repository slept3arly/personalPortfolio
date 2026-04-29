"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
  { label: "Resume", href: "/resume.pdf", id: "resume" },
] as const;

export default function Navbar() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Start transparent — at the top of the page the pill has no background
    gsap.set(bg, { opacity: 0 });

    let isScrolled = false;
    let raf = 0;

    const update = () => {
      const shouldShow = window.scrollY > 40;
      if (shouldShow === isScrolled) return;
      isScrolled = shouldShow;

      // Only opacity changes — GPU composited, zero layout thrash
      if (reducedMotion.matches) {
        gsap.set(bg, { opacity: shouldShow ? 1 : 0 });
      } else {
        gsap.to(bg, {
          opacity: shouldShow ? 1 : 0,
          duration: 0.45,
          ease: "expo.out",
          overwrite: true,
        });
      }
    };

    const onScroll = () => {
      // Coalesce scroll events into a single RAF tick
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    // Run immediately — handles page load mid-scroll
    update();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-6 pt-5"
      aria-label="Primary"
    >
      {/*
        Outer pill: always-visible layout container.
        Sizing, padding and border-radius live here — never animated,
        so there is zero risk of layout-triggered jank.
      */}
      <div className="navbar-pill relative">
        {/*
          Background layer: ONLY `opacity` is animated.
          opacity is GPU-composited — no reflow, no repaint, silky 60 fps.
          The frosted glass, shadow and border are baked into the element;
          they fade in / out together as one composited layer.
        */}
        <div ref={bgRef} className="navbar-pill__bg" aria-hidden="true" />

        {/* Links — always in the DOM, always interactive */}
        <div className="relative z-10 flex items-center gap-x-0.5 px-3 py-2.5">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.id === "resume" ? "_blank" : undefined}
              rel={item.id === "resume" ? "noreferrer" : undefined}
              className={[
                "nav-link",
                item.id === "resume" ? "nav-link--cta" : "",
              ]
                .join(" ")
                .trim()}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
