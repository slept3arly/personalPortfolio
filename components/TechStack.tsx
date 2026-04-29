"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { observeOnce } from "@/lib/observeOnce";

const frontend = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Component Architecture"];
const backend = ["Node.js", "FastAPI", "Flask", "REST APIs", "JWT Authentication", "API Design"];
const data = ["PostgreSQL", "SQLite", "Pandas", "Data Pipelines", "Feature Engineering", "Fuzzy Matching (RapidFuzz)"];
const tools = ["Git", "GitHub", "Postman", "Docker (basics)", "Linux", "Vercel"];

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => (
        <Badge key={x}>{x}</Badge>
      ))}
    </div>
  );
}

export default function TechStack() {
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
    <Section id="tech-stack" ariaLabel="Tech stack">
      <div ref={sectionRef} className="space-y-8 md:space-y-10">
        <header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              03
            </p>
            <h2
              ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              Tech stack
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            ref={(node) => {
              cardRefs.current[0] = node;
            }}
            style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
          >
            <Card>
              <p className="text-sm font-semibold text-white">Frontend</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Building clean, structured interfaces for system-driven applications.
              </p>
              <div className="mt-4">
                <PillList items={frontend} />
              </div>
            </Card>
          </div>

          <div
            ref={(node) => {
              cardRefs.current[1] = node;
            }}
            style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
          >
            <Card>
              <p className="text-sm font-semibold text-white">Backend</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Designing APIs, handling business logic, and structuring scalable services.
              </p>
              <div className="mt-4">
                <PillList items={backend} />
              </div>
            </Card>
          </div>

          <div
            ref={(node) => {
              cardRefs.current[2] = node;
            }}
            style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
          >
            <Card>
              <p className="text-sm font-semibold text-white">Data & Systems</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Working with structured data, pipelines, and analytical processing.
              </p>
              <div className="mt-4">
                <PillList items={data} />
              </div>
            </Card>
          </div>

          <div
            ref={(node) => {
              cardRefs.current[3] = node;
            }}
            style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
          >
            <Card>
              <p className="text-sm font-semibold text-white">Tools</p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Tooling for development, debugging, and deployment workflows.
              </p>
              <div className="mt-4">
                <PillList items={tools} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
