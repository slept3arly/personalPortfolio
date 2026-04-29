"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { observeOnce } from "@/lib/observeOnce";

export default function Resume() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const summaryRef = useRef<HTMLParagraphElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const actionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = sectionRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const summary = summaryRef.current;
    const actions = actionsRef.current;
    const actionItems = actionRefs.current.filter((item): item is HTMLDivElement => Boolean(item));

    if (!root || !number || !title || !summary || !actions || actionItems.length === 0) {
      return;
    }

    let stopReveal: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set([number, title, summary, ...actionItems], {
        opacity: 0,
        y: 14,
        scale: 0.985,
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.78, ease: "power2.out" },
      });

      tl.to(number, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0);
      tl.to(title, { opacity: 1, y: 0, scale: 1, duration: 0.68 }, 0.06);
      tl.to(summary, { opacity: 1, y: 0, scale: 1, duration: 0.56 }, 0.16);
      tl.to(actionItems, { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.62 }, 0.28);

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
    <Section id="resume" ariaLabel="Resume">
      <div ref={sectionRef}>
        <header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              08
            </p>
            <h2
              ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              Resume
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>

        <Card className="mt-5 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p
              ref={summaryRef}
              className="max-w-md text-sm leading-relaxed text-gray-400"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              Concise overview of my work across backend systems, data pipelines, and full-stack applications,
              including architecture decisions and implementation details.
            </p>
          </div>

          <div ref={actionsRef} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div
              ref={(node) => {
                actionRefs.current[0] = node;
              }}
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              <Button href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                View resume
              </Button>
            </div>

            <div
              ref={(node) => {
                actionRefs.current[1] = node;
              }}
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
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
