"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { siteConfig } from "@/lib/site";
import { observeOnce } from "@/lib/observeOnce";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const introRef = useRef<HTMLParagraphElement | null>(null);
  const listRefs = useRef<Array<HTMLLIElement | null>>([]);
  const actionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = sectionRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const intro = introRef.current;
    const listItems = listRefs.current.filter((item): item is HTMLLIElement => Boolean(item));
    const actions = actionRefs.current.filter((item): item is HTMLDivElement => Boolean(item));

    if (!root || !number || !title || !intro || listItems.length === 0 || actions.length === 0) {
      return;
    }

    let stopReveal: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set([number, title, intro, ...listItems, ...actions], {
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
      tl.to(intro, { opacity: 1, y: 0, scale: 1, duration: 0.56 }, 0.16);
      tl.to(listItems, { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.56 }, 0.28);
      tl.to(actions, { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.62 }, 0.34);

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
    <Section id="contact" ariaLabel="Contact">
      <div ref={sectionRef}>
        <header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              09
            </p>
            <h2
              ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
              Contact
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>

        <Card className="mt-5">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
            <div className="space-y-8">
              <header className="max-w-2xl space-y-4">
                <p
                  ref={introRef}
                  className="max-w-xl text-sm leading-7 text-slate-300"
                  style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
                >
                  I&apos;m currently looking for opportunities where I can work on real-world systems, backend
                  architecture, or data-driven applications. If you&apos;re hiring or building something interesting,
                  feel free to reach out.
                </p>
              </header>

              <ul className="space-y-5 text-sm text-slate-200">
                <li
                  ref={(node) => {
                    listRefs.current[0] = node;
                  }}
                  className="grid gap-1"
                  style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
                >
                  <span className="text-xs font-semibold tracking-[0.14em] text-slate-500">EMAIL</span>
                  <a className="interactive-link w-fit" href={`mailto:${siteConfig.social.email}`}>
                    {siteConfig.social.email}
                  </a>
                </li>

                <li
                  ref={(node) => {
                    listRefs.current[1] = node;
                  }}
                  className="grid gap-1"
                  style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
                >
                  <span className="text-xs font-semibold tracking-[0.14em] text-slate-500">GITHUB</span>
                  <a
                    className="interactive-link w-fit"
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/slept3arly
                  </a>
                </li>

                <li
                  ref={(node) => {
                    listRefs.current[2] = node;
                  }}
                  className="grid gap-1"
                  style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
                >
                  <span className="text-xs font-semibold tracking-[0.14em] text-slate-500">LINKEDIN</span>
                  <a
                    className="interactive-link w-fit"
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/slept3arly
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid gap-3 md:justify-end">
              <div
                ref={(node) => {
                  actionRefs.current[0] = node;
                }}
                style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
              >
                <Button href={`mailto:${siteConfig.social.email}`} className="w-full md:w-52">
                  Email me
                </Button>
              </div>

              <div
                ref={(node) => {
                  actionRefs.current[1] = node;
                }}
                style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
              >
                <Button
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="w-full md:w-52"
                >
                  View resume
                </Button>
              </div>

              <div
                ref={(node) => {
                  actionRefs.current[2] = node;
                }}
                style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
              >
                <Button href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" variant="ghost" className="w-full md:w-52">
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
