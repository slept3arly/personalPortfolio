"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { observeOnce } from "@/lib/observeOnce";

type EducationItem = {
  program: string;
  school: string;
  start: string;
  end: string;
  highlights: string[];
  tags: string[];
};

const education: EducationItem[] = [
  {
    program: "B.Tech in Computer Science and Engineering",
    school: "Vellore Institute of Technology (VIT), Vellore",
    start: "2024",
    end: "Present",
    tags: ["DSA", "OOP", "Computer Networks"],
    highlights: [
      "CGPA: 8.89 / 10.",
      "Core coursework: Data Structures & Algorithms, OOP, Computer Networks",
      "Focused on backend systems, data handling, and scalable application design through project-based learning.",
      "Built multiple full-stack and system-oriented projects involving APIs, databases, and data pipelines.",
    ],
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const highlightRefs = useRef<Array<HTMLLIElement | null>>([]);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const root = sectionRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const card = cardRef.current;
    const highlights = highlightRefs.current.filter((item): item is HTMLLIElement => Boolean(item));
    const tags = tagRefs.current.filter((item): item is HTMLSpanElement => Boolean(item));

    if (!root || !number || !title || !card) {
      return;
    }

    let stopReveal: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set([number, title, card, ...highlights, ...tags], {
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
      tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.82 }, 0.16);
      tl.to(highlights, { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.58 }, 0.36);
      tl.to(tags, { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.48 }, 0.62);

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

  const item = education[0];

  return (
    <Section id="education" ariaLabel="Education">
      <div ref={sectionRef} className="space-y-8 md:space-y-10">
        <header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              06
            </p>
            <h2
              ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              Education
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>

        <div ref={cardRef} style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}>
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

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300">
              {item.highlights.map((h, index) => (
                <li
                  key={h}
                  ref={(node) => {
                    highlightRefs.current[index] = node;
                  }}
                  style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
                >
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t, index) => (
                <span
                  key={t}
                  ref={(node) => {
                    tagRefs.current[index] = node;
                  }}
                  style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
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
