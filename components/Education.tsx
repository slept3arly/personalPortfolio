"use client";

import { useRef } from "react";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { education as item } from "@/lib/portfolioContent";
import MagneticDots from "./ui/MagneticDots";
import SplitHeading from "./ui/SplitHeading";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

export default function Education() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const highlightRefs = useRef<Array<HTMLLIElement | null>>([]);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useReveal(sectionRef, [
    { targets: [numberRef], delay: motion.reveal.delay.number, duration: motion.duration.sectionNumber },
    { targets: [cardRef], delay: motion.reveal.delay.content },
    { targets: highlightRefs, delay: motion.reveal.delay.items, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
    { targets: tagRefs, delay: motion.reveal.delay.tags, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
  ]);

  return (
    <Section id="education" ariaLabel="Education">
      <div ref={sectionRef} className="space-y-5 md:space-y-6">
        <MagneticDots><header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
            >
              05
            </p>
            <SplitHeading as="h2" ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Education
            </SplitHeading>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header></MagneticDots>

        <div ref={cardRef}>
          <Card>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-base font-semibold text-white">{item.program}</p>
                <p className="mt-1 text-sm text-gray-400">{item.school}</p>
              </div>
              <p className="text-sm text-gray-500">
                {item.start} — {item.end}
              </p>
            </div>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300">
              {item.highlights.map((h, index) => (
                <li
                  key={h}
                  ref={(node) => {
                    highlightRefs.current[index] = node;
                  }}
                >
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((t, index) => (
                <span
                  key={t}
                  ref={(node) => {
                    tagRefs.current[index] = node;
                  }}
                >
                  <Badge>{t}</Badge>
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
