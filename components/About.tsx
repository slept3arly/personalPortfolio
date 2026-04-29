"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { observeOnce } from "@/lib/observeOnce";

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;

    if (!root || !number || !title || !leftCard || !rightCard) {
      return;
    }

    let stopReveal: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set([number, title, leftCard, rightCard], {
        opacity: 0,
        y: 14,
        scale: 0.985,
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.8,
          ease: "power2.out",
        },
      });

      tl.to(number, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0);
      tl.to(title, { opacity: 1, y: 0, scale: 1, duration: 0.72 }, 0.06);
      tl.to(leftCard, { opacity: 1, y: 0, scale: 1, duration: 0.78 }, 0.16);
      tl.to(rightCard, { opacity: 1, y: 0, scale: 1, duration: 0.78 }, 0.24);

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
    <Section id="about" ariaLabel="About">
      <div ref={sectionRef} className="space-y-8 md:space-y-10">
        <header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              01
            </p>
            <h2
              ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              About
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          <div ref={leftCardRef} className="sm:col-span-2" style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}>
            <Card>
              <div className="space-y-4 text-sm leading-relaxed text-gray-300">
                <p>
                  I’m a computer science student focused on building backend-heavy systems and full-stack applications
                  that solve real-world problems. My work centers around designing structured architectures, handling
                  data pipelines, and building systems that are not just functional, but scalable and logically sound.
                </p>

                <p>
                  I’ve built systems including a full-stack e-commerce platform with authentication and role-based
                  access control, a high-performance analytical engine for large-scale data queries, and machine
                  learning pipelines for tasks like face recognition.
                </p>

                <p>
                  I focus on understanding systems end-to-end from data ingestion and processing to API design,
                  business logic, and deployment.
                </p>
              </div>
            </Card>
          </div>

          <div ref={rightCardRef} style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}>
            <Card>
              <p className="text-sm font-semibold text-white">Focus areas</p>

              <ul className="mt-3 space-y-2 text-sm text-gray-300">
                <li>Backend systems & API design</li>
                <li>Data processing & analytical systems</li>
                <li>Full-stack architecture (end-to-end systems)</li>
                <li>Authentication, security & system design fundamentals</li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>TypeScript</Badge>
                <Badge>Python</Badge>
                <Badge>PostgreSQL</Badge>
                <Badge>Prisma</Badge>
                <Badge>FastAPI</Badge>
                <Badge>Next.js</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
