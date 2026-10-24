"use client";

import { useRef } from "react";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { skills } from "@/lib/portfolioContent";
import MagneticDots from "./ui/MagneticDots";
import SplitHeading from "./ui/SplitHeading";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

function PillList({ items, tagRefs, indexOffset }: {
  items: string[];
  tagRefs: { current: Array<HTMLSpanElement | null> };
  indexOffset: number;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x, index) => (
        <span key={x} ref={(node) => { tagRefs.current[indexOffset + index] = node; }}><Badge>{x}</Badge></span>
      ))}
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useReveal(sectionRef, [
    { targets: [numberRef], delay: motion.reveal.delay.number, duration: motion.duration.sectionNumber },
    { targets: cardRefs, delay: motion.reveal.delay.content, stagger: motion.stagger.items },
    { targets: tagRefs, delay: motion.reveal.delay.tags, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
  ]);

  return (
    <Section id="tech-stack" ariaLabel="Tech stack" className="lg:-mx-6">
      <div ref={sectionRef} className="space-y-5 md:space-y-6">
        <MagneticDots><header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
            >
              03
            </p>
            <SplitHeading as="h2" ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Technical skills
            </SplitHeading>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header></MagneticDots>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, index) => (
            <div
              key={group.title}
              ref={(node) => { cardRefs.current[index] = node; }}
            >
              <Card>
                <p className="text-sm font-semibold text-white">{group.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{group.description}</p>
                <div className="mt-3">
                  <PillList
                    items={[...group.items]}
                    tagRefs={tagRefs}
                    indexOffset={skills.slice(0, index).reduce((count, entry) => count + entry.items.length, 0)}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
