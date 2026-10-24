"use client";

import { useRef } from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { siteConfig } from "@/lib/site";
import MagneticDots from "./ui/MagneticDots";
import SplitHeading from "./ui/SplitHeading";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const listRefs = useRef<Array<HTMLLIElement | null>>([]);
  const actionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useReveal(sectionRef, [
    { targets: [numberRef], delay: motion.reveal.delay.number, duration: motion.duration.sectionNumber },
    { targets: [cardRef], delay: motion.reveal.delay.content },
    { targets: listRefs, delay: motion.reveal.delay.items, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
    { targets: actionRefs, delay: motion.reveal.delay.items, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
  ]);

  return (
    <Section id="contact" ariaLabel="Contact">
      <div ref={sectionRef}>
        <MagneticDots><header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
            >
              07
            </p>
            <SplitHeading as="h2" ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Contact
            </SplitHeading>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header></MagneticDots>

        <Card ref={cardRef} className="mt-5">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-stretch">
            <div className="space-y-6">
              <header className="max-w-2xl space-y-3">
                <p
                  className="max-w-xl text-sm leading-7 text-slate-300"
                >
                  I&apos;m a third-year BTech student interested in backend and full-stack engineering opportunities.
                  For roles or collaboration involving APIs, data workflows, or application systems, you can reach me
                  by email or LinkedIn.
                </p>
              </header>

              <ul className="space-y-4 text-sm text-slate-200">
                <li
                  ref={(node) => {
                    listRefs.current[0] = node;
                  }}
                  className="grid gap-1"
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

            <div className="contact-actions grid justify-items-center gap-3 md:content-center">
              <div
                ref={(node) => {
                  actionRefs.current[0] = node;
                }}
                className="w-full md:w-52"
              >
                <Button href={`mailto:${siteConfig.social.email}`} variant="secondary" className="w-full">
                  Email me
                </Button>
              </div>

              <div
                ref={(node) => {
                  actionRefs.current[1] = node;
                }}
                className="w-full md:w-52"
              >
                <Button
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="w-full"
                >
                  GitHub
                </Button>
              </div>

              <div
                ref={(node) => {
                  actionRefs.current[2] = node;
                }}
                className="w-full md:w-52"
              >
                <Button href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" variant="secondary" className="w-full">
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
