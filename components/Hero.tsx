"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function Hero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const titleWords = useRef<Array<HTMLSpanElement | null>>([]);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const descriptionWords = useRef<Array<HTMLSpanElement | null>>([]);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const ctaItems = useRef<Array<HTMLDivElement | null>>([]);
  const noteRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const badge = badgeRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const cta = ctaRef.current;
    const note = noteRef.current;

    if (!root || !badge || !title || !description || !cta || !note) {
      return;
    }

    const titleItems = titleWords.current.filter((item): item is HTMLSpanElement => Boolean(item));
    const descriptionItems = descriptionWords.current.filter((item): item is HTMLSpanElement => Boolean(item));
    const actionItems = ctaItems.current.filter((item): item is HTMLDivElement => Boolean(item));

    const ctx = gsap.context(() => {
      gsap.set([badge, ...titleItems, ...descriptionItems, ...actionItems, note], {
        opacity: 0,
        y: 14,
      });

      const tl = gsap.timeline({
        defaults: {
          duration: 0.82,
          ease: "power2.out",
        },
      });

      tl.to(badge, { opacity: 1, y: 0, duration: 0.54 }, 0);
      tl.to(
        titleItems,
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.68,
        },
        0.08,
      );
      tl.to(
        descriptionItems,
        {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          duration: 0.56,
        },
        0.18,
      );
      tl.to(
        actionItems,
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.62,
        },
        0.32,
      );
      tl.to(note, { opacity: 1, y: 0, duration: 0.5 }, 0.42);
    }, root);

    return () => ctx.revert();
  }, []);

  const description = [
    "I build backend-focused systems and full-stack applications that handle real data, performance constraints, and scalable architecture.",
    "My work includes designing APIs, building data processing pipelines, and developing end-to-end systems from ingestion and query execution to visualization and deployment.",
  ].join(" ");
  const titleText = "Vinayak Nautiyal";
  const titleSegments = titleText.split(/(\s+)/).filter(Boolean);
  const descriptionSegments = description.split(/(\s+)/).filter(Boolean);

  return (
    <section ref={rootRef} className="flex min-h-screen flex-col justify-center pt-28 pb-20 md:pt-36 md:pb-24" aria-label="Intro">
      <div className="mx-auto max-w-4xl text-center">
        <div ref={badgeRef} className="flex flex-wrap justify-center gap-2 opacity-0">
          <Badge>Backend Systems • Data Processing • Full-Stack Engineering</Badge>
        </div>

        <h1
          ref={titleRef}
          className="mt-5 text-balance text-5xl font-semibold tracking-[-0.02em] text-white md:text-6xl"
          aria-label={titleText}
        >
          {titleSegments.map((segment, index) => (
            <span
              key={`${segment}-${index}`}
              ref={(node) => {
                titleWords.current[index] = node;
              }}
              className="inline-block will-change-transform"
              aria-hidden="true"
              style={{ opacity: 0, transform: "translateY(14px)" }}
            >
              {segment === " " ? "\u00A0" : segment}
            </span>
          ))}
        </h1>

        <p
          ref={descriptionRef}
          className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-8 text-slate-300 md:text-lg"
        >
          {descriptionSegments.map((segment, index) => (
            <span
              key={`${segment}-${index}`}
              ref={(node) => {
                descriptionWords.current[index] = node;
              }}
              className="inline-block will-change-transform"
              aria-hidden="true"
              style={{ opacity: 0, transform: "translateY(14px)" }}
            >
              {segment === " " ? "\u00A0" : segment}
            </span>
          ))}
        </p>

        <div
          ref={ctaRef}
          className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center"
        >
          <div
            ref={(node) => {
              ctaItems.current[0] = node;
            }}
            className="will-change-transform"
            style={{ opacity: 0, transform: "translateY(14px)" }}
          >
            <Button href="#projects">View Systems Projects</Button>
          </div>

          <div
            ref={(node) => {
              ctaItems.current[1] = node;
            }}
            className="will-change-transform"
            style={{ opacity: 0, transform: "translateY(14px)" }}
          >
            <Button href="/resume.pdf" target="_blank" rel="noreferrer" variant="secondary">
              View Resume
            </Button>
          </div>

          <div
            ref={(node) => {
              ctaItems.current[2] = node;
            }}
            className="will-change-transform"
            style={{ opacity: 0, transform: "translateY(14px)" }}
          >
            <Button href="https://github.com/slept3arly" target="_blank" rel="noreferrer" variant="ghost">
              GitHub
            </Button>
          </div>

          <div
            ref={(node) => {
              ctaItems.current[3] = node;
            }}
            className="will-change-transform"
            style={{ opacity: 0, transform: "translateY(14px)" }}
          >
            <Button
              href="https://www.linkedin.com/in/vinayak-n-000a0b298/"
              target="_blank"
              rel="noreferrer"
              variant="ghost"
            >
              LinkedIn
            </Button>
          </div>
        </div>

        <p ref={noteRef} className="mt-5 text-sm text-slate-400" style={{ opacity: 0, transform: "translateY(14px)" }}>
          Focused on backend systems, data processing, and scalable architecture.
        </p>
      </div>
    </section>
  );
}
