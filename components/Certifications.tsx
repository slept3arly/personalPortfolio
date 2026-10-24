"use client";

import { useRef } from "react";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { certifications } from "@/lib/portfolioContent";
import MagneticDots from "./ui/MagneticDots";
import SplitHeading from "./ui/SplitHeading";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useReveal(sectionRef, [
    { targets: [numberRef], delay: motion.reveal.delay.number, duration: motion.duration.sectionNumber },
    { targets: cardRefs, delay: motion.reveal.delay.content, stagger: motion.stagger.items },
  ]);

  return (
    <Section id="certifications" ariaLabel="Certifications">
      <div ref={sectionRef} className="space-y-5 md:space-y-6">
        <MagneticDots><header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p ref={numberRef} className="text-xs font-semibold tracking-[0.18em] text-slate-500">06</p>
            <SplitHeading as="h2" ref={titleRef} className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Certifications
            </SplitHeading>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header></MagneticDots>

        <div className="grid gap-4 sm:grid-cols-2">
          {certifications.map((item, index) => (
            <div
              key={item.title}
              ref={(node) => { cardRefs.current[index] = node; }}
            >
              <Card>
                <p className="text-xs text-gray-500">{item.year}</p>
                <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs text-gray-400">{item.subtitle}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
