"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { motionTransitions } from "@/lib/motion";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

export default function Navbar() {
  const reducedMotion = useReducedMotion();
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [activeSection, setActiveSection] = useState<(typeof navItems)[number]["id"]>("about");
  const [indicator, setIndicator] = useState({ x: 0, width: 0, opacity: 0 });

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      const offset = window.innerHeight * 0.28;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeLink = linkRefs.current[activeSection];
      const container = desktopNavRef.current;

      if (!activeLink || !container) {
        return;
      }

      setIndicator({
        x: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeSection]);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-900/60 bg-black/70 backdrop-blur"
      aria-label="Primary"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 text-sm">
        <a href="#top" className="font-semibold text-white" aria-label="Back to top">
          VN
        </a>
        <div ref={desktopNavRef} className="relative hidden items-center gap-1 sm:flex">
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 rounded-full border border-white/10 bg-white/[0.06]"
            animate={reducedMotion ? undefined : indicator}
            transition={motionTransitions.indicator}
            style={reducedMotion ? { opacity: 0 } : undefined}
          />
          {navItems.map((item) => (
            <a
              key={item.id}
              ref={(node) => {
                linkRefs.current[item.id] = node;
              }}
              className={[
                "relative z-10 rounded-full px-3 py-2 transition-colors duration-300",
                activeSection === item.id ? "text-white" : "text-gray-400 hover:text-white",
              ].join(" ")}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
          <a
            className="interactive-surface interactive-button rounded-md border border-gray-800/80 px-3 py-1.5 text-gray-200"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span className="relative z-10">Resume</span>
          </a>
        </div>
        <div className="flex items-center gap-3 sm:hidden">
          <a
            className="interactive-surface interactive-button rounded-md border border-gray-800/80 px-3 py-1.5 text-gray-200"
            href="#contact"
          >
            <span className="relative z-10">Contact</span>
          </a>
          <a
            className="interactive-surface interactive-button rounded-md bg-white px-3 py-1.5 font-medium text-black"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <span className="relative z-10">Resume</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

