"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { observeOnce } from "@/lib/observeOnce";

const skillGroups = [
  {
    title: "Core Engineering",
    description:
      "Strong foundations in programming and system design used to build scalable applications.",
    items: ["TypeScript", "Python", "C++", "Java", "Data Structures & Algorithms"],
  },
  {
    title: "Backend & Data Systems",
    description:
      "Designing APIs, handling data pipelines, and building structured backend logic.",
    items: [
      "Node.js",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "SQLite",
      "Prisma",
      "Pandas",
      "Data Pipelines",
    ],
  },
  {
    title: "Systems & Tooling",
    description:
      "Tools and practices for building, debugging, and deploying reliable systems.",
    items: ["Git", "GitHub", "Docker (basics)", "Linux", "Postman", "Vercel", "Debugging", "API Testing"],
  },
  {
    title: "Frontend (Applied)",
    description:
      "Used to build clean interfaces for system-driven applications, not design-heavy work.",
    items: ["React", "Next.js", "Tailwind CSS", "Component Architecture", "Responsive Design"],
  },
] as const;

export default function Skills() {
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
      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.72,
        },
        0.16,
      );

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
    <Section id="skills" ariaLabel="Skills">
      <div ref={sectionRef} className="space-y-8 md:space-y-10">
        <header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              04
            </p>
            <h2
              ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              Skills
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, index) => (
            <div
              key={g.title}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              <Card>
                <p className="text-sm font-semibold text-white">{g.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{g.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((x) => (
                    <Badge key={x}>{x}</Badge>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
