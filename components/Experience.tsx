"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { observeOnce } from "@/lib/observeOnce";

type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
  tags: string[];
};

const experience: ExperienceItem[] = [
  {
    role: "Freelance Developer",
    company: "Vedic Wellness",
    location: "Remote",
    start: "2024",
    end: "Present",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Docker", "Auth"],
    bullets: [
      "Developed and deployed a full-stack e-commerce platform for a real-world Ayurvedic business.",
      "Architected backend using service-layer abstractions with Prisma ORM for structured and scalable data access.",
      "Implemented authentication with RBAC, OTP-based verification, and rate limiting for secure user workflows.",
      "Designed normalized database schema for products, users, and orders with transactional order processing.",
      "Optimized performance using server-side rendering and cache revalidation for read-heavy traffic.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const bulletRefs = useRef<Array<HTMLLIElement | null>>([]);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const root = sectionRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const card = cardRef.current;
    const bullets = bulletRefs.current.filter((item): item is HTMLLIElement => Boolean(item));
    const tags = tagRefs.current.filter((item): item is HTMLSpanElement => Boolean(item));

    if (!root || !number || !title || !card) {
      return;
    }

    let stopReveal: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set([number, title, card, ...bullets, ...tags], {
        opacity: 0,
        y: 12,
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.88, ease: "power2.out" },
      });

      tl.to(number, { opacity: 1, y: 0, duration: 0.5 }, 0);
      tl.to(title, { opacity: 1, y: 0, duration: 0.72 }, 0.06);
      tl.to(card, { opacity: 1, y: 0, duration: 0.82 }, 0.16);
      tl.to(bullets, { opacity: 1, y: 0, stagger: 0.045, duration: 0.5 }, 0.38);
      tl.to(tags, { opacity: 1, y: 0, stagger: 0.03, duration: 0.42 }, 0.62);

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

  const item = experience[0];

  return (
    <Section id="experience" ariaLabel="Experience">
      <div ref={sectionRef} className="space-y-8 md:space-y-10">
        <header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
              style={{ opacity: 0, transform: "translateY(12px)" }}
            >
              05
            </p>
            <h2
              ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ opacity: 0, transform: "translateY(12px)" }}
            >
              Experience
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>

        <div ref={cardRef} style={{ opacity: 0, transform: "translateY(12px)" }}>
          <Card>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-base font-semibold text-white">{item.role}</p>
                <p className="mt-1 text-sm text-gray-400">
                  {item.company} · {item.location}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {item.start} — {item.end}
              </p>
            </div>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300">
              {item.bullets.map((b, index) => (
                <li
                  key={b}
                  ref={(node) => {
                    bulletRefs.current[index] = node;
                  }}
                  style={{ opacity: 0, transform: "translateY(8px)" }}
                >
                  {b}
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
                  style={{ opacity: 0, transform: "translateY(8px)" }}
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
