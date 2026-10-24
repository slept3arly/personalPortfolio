"use client";

import { useRef } from "react";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { skills } from "@/lib/portfolioContent";
import MagneticDots from "./ui/MagneticDots";
import SplitHeading from "./ui/SplitHeading";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";
import { useMobileCardCarousel } from "./ui/useMobileCardCarousel";
import MobileCarouselControls from "./ui/MobileCarouselControls";

function PillList({ items, tagRefs, indexOffset }: {
  items: string[];
  tagRefs: { current: Array<HTMLSpanElement | null> };
  indexOffset: number;
}) {
  return (
    <div className="skills-card__pill-list flex flex-wrap gap-2">
      {items.map((x, index) => (
        <span key={x} ref={(node) => { tagRefs.current[indexOffset + index] = node; }}><Badge className="skills-card__pill">{x}</Badge></span>
      ))}
    </div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tagRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const {
    containerRef: carouselRef,
    position: carouselPosition,
    isAnimating: carouselIsAnimating,
    next: advanceCarousel,
    previous: retreatCarousel,
  } = useMobileCardCarousel({ count: skills.length });

  useReveal(sectionRef, [
    { targets: [numberRef], delay: motion.reveal.delay.number, duration: motion.duration.sectionNumber },
    { targets: cardRefs, delay: motion.reveal.delay.content, stagger: motion.stagger.items, media: "(min-width: 640px)" },
    { targets: tagRefs, delay: motion.reveal.delay.tags, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true, media: "(min-width: 640px)" },
  ]);

  return (
    <Section id="tech-stack" ariaLabel="Tech stack" className="lg:-mx-6">
      <div ref={sectionRef} className="space-y-5 md:space-y-6">
        <MagneticDots><header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
            >
              03
            </p>
            <SplitHeading as="h2" ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Technical skills
            </SplitHeading>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header></MagneticDots>

        <div ref={carouselRef} className="skills-grid mobile-card-carousel grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, index) => (
            <div
              key={group.title}
              data-carousel-item={index}
              ref={(node) => { cardRefs.current[index] = node; }}
            >
              <Card className="skills-card">
                <p className="skills-card__title text-sm font-semibold text-white">{group.title}</p>
                <p className="skills-card__description mt-2 text-sm leading-relaxed text-gray-400">{group.description}</p>
                <div className="skills-card__pills mt-3">
                  <PillList
                    items={[...group.items]}
                    tagRefs={tagRefs}
                    indexOffset={skills.slice(0, index).reduce((count, entry) => count + entry.items.length, 0)}
                  />
                </div>
              </Card>
            </div>
          ))}
        </div>
        <MobileCarouselControls
          itemLabel="Category"
          controlsLabel="Technical skills navigation"
          previousLabel="Previous category"
          nextLabel="Next category"
          position={carouselPosition}
          count={skills.length}
          isAnimating={carouselIsAnimating}
          onPrevious={retreatCarousel}
          onNext={advanceCarousel}
        />
      </div>
    </Section>
  );
}
