"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { observeOnce } from "@/lib/observeOnce";

type Item = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
};

const items: Item[] = [
  {
    year: "YYYY",
    title: "Sample Achievement / Certification",
    subtitle: "Platform / Organization",
    description:
      "Brief description of what was accomplished, learned, or demonstrated. Replace with actual achievements or certifications.",
  },
  {
    year: "YYYY",
    title: "Another Sample Entry",
    subtitle: "Platform / Organization",
    description:
      "Short explanation highlighting relevance or skills gained. Keep it concise and impact-focused.",
  },
];

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = sectionRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => Boolean(card));

    if (!root || !number || !title || cards.length === 0) {
      return;
    }

    let stopReveal: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set([number, title, ...cards], {
        opacity: 0,
        y: 14,
        scale: 0.985,
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.78, ease: "power2.out" },
      });

      tl.to(number, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0);
      tl.to(title, { opacity: 1, y: 0, scale: 1, duration: 0.72 }, 0.06);
      tl.to(cards, { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.72 }, 0.16);

      stopReveal = observeOnce(root, {
        threshold: 0.2,
        onEnter: () => tl.play(0),
      });
    }, root);

    return () => {
      stopReveal?.();
      ctx.revert();
    };
  }, []);

  return (
    <Section id="achievements" ariaLabel="Achievements and certifications">
      <div ref={sectionRef} className="space-y-8 md:space-y-10">
        <header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              07
            </p>
            <h2
              ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              Achievements & certifications
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={item.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              <Card>
                <p className="text-xs text-gray-500">{item.year}</p>
                <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-xs text-gray-400">{item.subtitle}</p>
                <p className="mt-3 text-sm leading-relaxed text-gray-300">{item.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
