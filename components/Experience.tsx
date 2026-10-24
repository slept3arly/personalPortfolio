"use client";

import { useRef } from "react";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { experience } from "@/lib/portfolioContent";
import MagneticDots from "./ui/MagneticDots";
import SplitHeading from "./ui/SplitHeading";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const bulletRefs = useRef<Array<HTMLLIElement | null>>([]);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useReveal(sectionRef, [
    { targets: [numberRef], delay: motion.reveal.delay.number, duration: motion.duration.sectionNumber },
    { targets: [cardRef], delay: motion.reveal.delay.content },
    { targets: bulletRefs, delay: motion.reveal.delay.items, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
    { targets: tagRefs, delay: motion.reveal.delay.tags, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
  ]);

  return (
    <Section id="experience" ariaLabel="Experience">
      <div ref={sectionRef} className="space-y-5 md:space-y-6">
        <MagneticDots><header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
            >
              04
            </p>
            <SplitHeading as="h2" ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Experience
            </SplitHeading>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header></MagneticDots>

        <div ref={cardRef}>
          <Card>
            {experience.map((item, itemIndex) => {
              const bulletOffset = experience.slice(0, itemIndex).reduce((count, entry) => count + entry.bullets.length, 0);
              const tagOffset = experience.slice(0, itemIndex).reduce((count, entry) => count + entry.tags.length, 0);

              return (
                <div key={item.company} className={itemIndex > 0 ? "mt-5 border-t border-[color:var(--surface-border)] pt-5" : ""}>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="text-base font-semibold text-white">{item.role}</p>
                      <p className="mt-1 text-sm text-gray-400">
                        {item.company}{item.location ? ` · ${item.location}` : ""}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{item.start} — {item.end}</p>
                  </div>

                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300">
                    {item.bullets.map((bullet, index) => {
                      const refIndex = bulletOffset + index;
                      return (
                        <li
                          key={bullet}
                          ref={(node) => { bulletRefs.current[refIndex] = node; }}
                        >
                          {bullet}
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => {
                      const refIndex = tagOffset + index;
                      return (
                        <span
                          key={tag}
                          ref={(node) => { tagRefs.current[refIndex] = node; }}
                        >
                          <Badge>{tag}</Badge>
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Card>
        </div>
      </div>
    </Section>
  );
}
