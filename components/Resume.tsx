"use client";

import { useRef } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";
import MagneticDots from "./ui/MagneticDots";
import SplitHeading from "./ui/SplitHeading";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const actionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useReveal(sectionRef, [
    { targets: [numberRef], delay: motion.reveal.delay.number, duration: motion.duration.sectionNumber },
    { targets: [cardRef], delay: motion.reveal.delay.content },
    { targets: actionRefs, delay: motion.reveal.delay.items, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
  ]);

  return (
    <Section id="resume" ariaLabel="Resume">
      <div ref={sectionRef}>
        <MagneticDots><header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
            >
              08
            </p>
            <SplitHeading as="h2" ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Resume
            </SplitHeading>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header></MagneticDots>

        <Card ref={cardRef} className="mt-5 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p
              className="max-w-md text-sm leading-relaxed text-gray-400"
            >
              Concise overview of my work across backend systems, data pipelines, and full-stack applications,
              including architecture decisions and implementation details.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div
              ref={(node) => {
                actionRefs.current[0] = node;
              }}
            >
              <Button href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                View resume
              </Button>
            </div>

            <div
              ref={(node) => {
                actionRefs.current[1] = node;
              }}
            >
              <Button href="/resume.pdf" download variant="secondary" className="w-full sm:w-auto">
                Download PDF
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
