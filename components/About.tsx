"use client";

import { useRef, useState } from "react";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import MagneticDots from "./ui/MagneticDots";
import SplitHeading from "./ui/SplitHeading";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

const aboutIntroduction =
  "I’m interested in building backend systems and full-stack applications, especially the workflows that connect APIs, data processing, and user-facing tools. I approach engineering by defining clear system boundaries, validating inputs and state changes, and keeping application logic dependable as integrations and data move through a product. My projects have included CRM connector workflows, a process-scheduling simulator and visualizer, transaction parsing, semantic caching, and desktop utilities. Across these different problem spaces, I value practical software whose behavior is understandable, maintainable, and useful to the people working with it.";

export default function About() {
  const [introductionExpanded, setIntroductionExpanded] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const focusItemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useReveal(sectionRef, [
    { targets: [numberRef], delay: motion.reveal.delay.number, duration: motion.duration.sectionNumber },
    { targets: [leftCardRef, rightCardRef], stagger: motion.stagger.items },
    { targets: focusItemRefs, delay: motion.reveal.delay.items, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
    { targets: tagRefs, delay: motion.reveal.delay.tags, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
  ]);

  return (
    <Section id="about" ariaLabel="About" className="lg:-mx-6">
      <div ref={sectionRef} className="space-y-5 md:space-y-6">
        <MagneticDots><header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
            >
              01
            </p>
            <SplitHeading as="h2" ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              About
            </SplitHeading>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header></MagneticDots>

        <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
          <div ref={leftCardRef}>
            <Card>
              <div
                id="about-introduction"
                className={`${introductionExpanded ? "max-h-[100rem]" : "max-h-[8.125em]"} overflow-hidden text-sm leading-relaxed text-gray-300 transition-[max-height] duration-300 ease-out motion-reduce:transition-none md:max-h-none md:overflow-visible`}
              >
                <p className="max-w-[72ch]">{aboutIntroduction}</p>
              </div>
              <button
                type="button"
                className="mt-3 inline-flex min-h-11 items-center text-sm font-medium text-slate-300 underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 motion-reduce:transition-none md:hidden"
                aria-expanded={introductionExpanded}
                aria-controls="about-introduction"
                onClick={() => setIntroductionExpanded((expanded) => !expanded)}
              >
                {introductionExpanded ? "Read less" : "Read more"}
              </button>
            </Card>
          </div>

          <div ref={rightCardRef}>
            <Card>
              <p className="text-sm font-semibold text-white">Focus areas</p>

              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                {[
                  "Backend systems & API design",
                  "Data processing & analytical systems",
                  "Full-stack application workflows",
                  "Authentication, input validation, and integration safety",
                ].map((focus, index) => (
                  <li key={focus} ref={(node) => { focusItemRefs.current[index] = node; }}>{focus}</li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {["TypeScript", "Python", "PostgreSQL", "Prisma", "FastAPI", "Next.js"].map((tag, index) => (
                  <span key={tag} ref={(node) => { tagRefs.current[index] = node; }}><Badge>{tag}</Badge></span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
