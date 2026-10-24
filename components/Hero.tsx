"use client";

import { useRef } from "react";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";
import { useCurtainReveal } from "@/lib/useCurtainReveal";

const heroBadgeText = "Backend Services • Data Processing • Full-Stack Tools";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);

  useCurtainReveal(headingRef);

  useReveal(heroRef, [
    { targets: [badgeRef], delay: motion.reveal.delay.heroEyebrow },
    { targets: [descriptionRef], delay: motion.reveal.delay.heroParagraph, duration: motion.duration.sectionItem },
    { targets: [actionsRef, linksRef], delay: motion.reveal.delay.tags, duration: motion.duration.sectionItem, stagger: motion.stagger.items },
  ]);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col justify-center px-1 pt-20 pb-10 md:pt-24 md:pb-16"
      aria-label="Intro"
    >
      <div className="relative mx-auto w-full max-w-4xl text-center">
        <div ref={badgeRef} className="flex justify-center">
          <Badge className="max-w-full whitespace-normal text-center leading-5">{heroBadgeText}</Badge>
        </div>

        <h1 ref={headingRef} className="mt-6 text-balance text-[clamp(2.1rem,9.7vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-white">
          Vinayak Nautiyal
        </h1>

        <p ref={descriptionRef} className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-7 text-slate-300 sm:text-base sm:leading-8 md:text-lg">
          I’m a third-year BTech student who builds backend services and full-stack tools. My projects explore API
          design, data processing, integrations, and interfaces that make system behavior easier to inspect.
        </p>

        <div ref={actionsRef} className="mx-auto mt-7 grid w-full max-w-md grid-cols-2 gap-2 sm:flex sm:max-w-none sm:justify-center sm:gap-3">
          <Button href="#projects" className="w-full sm:w-auto">View projects</Button>
          <Button href="/resume.pdf" target="_blank" rel="noreferrer" variant="secondary" className="w-full sm:w-auto">
            View resume
          </Button>
        </div>

        <div ref={linksRef} className="mt-5 flex items-center justify-center gap-5 text-sm text-slate-400">
          <a className="interactive-link" href="https://github.com/slept3arly" target="_blank" rel="noreferrer">GitHub</a>
          <a className="interactive-link" href="https://www.linkedin.com/in/slept3arly/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
