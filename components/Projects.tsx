"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "@/lib/gsap";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import ProjectDetails from "./ui/ProjectDetails";
import Section from "./ui/Section";
import MagneticDots from "./ui/MagneticDots";
import SplitHeading from "./ui/SplitHeading";
import { motion } from "@/lib/motion";
import { useReveal } from "@/lib/useReveal";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { projects } from "@/lib/projectData";

const projectTagOffsets = projects.map((_, index) =>
  projects.slice(0, index).reduce((total, project) => total + project.cardTechnologies.length, 0),
);

export default function Projects() {
  type ProjectOpenHandler = (trigger: HTMLElement) => void;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const projectCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const projectDetailsOpenRefs = useRef<Array<ProjectOpenHandler | null>>(Array(projects.length).fill(null));
  const projectTagRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const busyRef = useRef(false);
  const activeCycleRef = useRef<{ card: HTMLElement; finish: () => void } | null>(null);
  const [position, setPosition] = useState(1);
  const [order, setOrder] = useState(projects.map((_, index) => index));
  const [isAnimating, setIsAnimating] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const registerProjectDetailsOpen = useCallback((index: number, open: ProjectOpenHandler | null) => {
    projectDetailsOpenRefs.current[index] = open;
  }, []);

  useReveal(sectionRef, [
    { targets: [numberRef], delay: motion.reveal.delay.number, duration: motion.duration.sectionNumber },
    { targets: projectCardRefs, delay: motion.reveal.delay.content, stagger: motion.stagger.items },
    { targets: projectTagRefs, duration: motion.duration.sectionItem, stagger: motion.stagger.items, afterPrevious: true },
  ]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    grid.classList.add("is-stack-ready");
    grid.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card) => {
      const stackPosition = order.indexOf(Number(card.dataset.projectCard));
      card.style.setProperty("--stack-position", String(stackPosition));
      card.style.order = String(stackPosition);
      card.dataset.stackPosition = String(stackPosition);
      card.dataset.stackVisible = String(stackPosition <= 3);
    });
    const mobile = window.matchMedia("(max-width: 639px)");
    const syncAccess = () => grid.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card) => {
      const behind = mobile.matches && Number(card.dataset.stackPosition) !== 0;
      card.setAttribute("aria-hidden", behind ? "true" : "false");
      card.inert = behind;
    });
    syncAccess();
    mobile.addEventListener("change", syncAccess);
    return () => {
      mobile.removeEventListener("change", syncAccess);
      grid.classList.remove("is-stack-ready");
      grid.querySelectorAll<HTMLElement>("[data-project-card]").forEach((card) => {
        card.removeAttribute("aria-hidden");
        card.inert = false;
      });
    };
  }, [order]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const desktopPointer = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups: Array<() => void> = [];
    const setup = () => {
      cleanups.splice(0).forEach((cleanup) => cleanup());
      const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-project-card]"));
      if (!desktopPointer.matches || reduce.matches) {
        cards.forEach((card) => gsap.set(card, { clearProps: "transform" }));
        return;
      }
      cards.forEach((card) => gsap.set(card, { rotationX: 0, rotationY: 0, transformPerspective: motion.tilt.perspective }));
      cards.forEach((card) => {
        const rotateX = gsap.quickTo(card, "rotationX", { duration: motion.duration.tilt, ease: motion.ease.standard });
        const rotateY = gsap.quickTo(card, "rotationY", { duration: motion.duration.tilt, ease: motion.ease.standard });
        const move = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          const rect = card.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
          const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));
          rotateY(x * motion.tilt.maxAngle);
          rotateX(-y * motion.tilt.maxAngle);
        };
        const leave = () => { rotateX(0); rotateY(0); };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
          gsap.killTweensOf(card, "rotationX,rotationY");
          gsap.set(card, { rotationX: 0, rotationY: 0, clearProps: "transform" });
        });
      });
    };
    setup();
    desktopPointer.addEventListener("change", setup);
    reduce.addEventListener("change", setup);
    return () => {
      cleanups.splice(0).forEach((cleanup) => cleanup());
      desktopPointer.removeEventListener("change", setup);
      reduce.removeEventListener("change", setup);
    };
  }, []);

  const nextProject = () => {
    if (busyRef.current) return;
    const grid = gridRef.current;
    if (!grid) return;
    const outgoing = grid.querySelector<HTMLElement>(`[data-project-card="${order[0]}"]`);
    if (!outgoing) return;
    busyRef.current = true;
    setIsAnimating(true);
    const advance = () => {
      gsap.set(outgoing, { y: 0, opacity: 1, rotation: 0, clearProps: "transform,opacity" });
      setOrder((current) => [...current.slice(1), current[0]]);
      setPosition((current) => current === projects.length ? 1 : current + 1);
      busyRef.current = false;
      setIsAnimating(false);
      activeCycleRef.current = null;
    };
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      advance();
      return;
    }
    activeCycleRef.current = { card: outgoing, finish: advance };
    gsap.to(outgoing, { y: 120, opacity: 0, rotation: 10, duration: 0.4, ease: "power2.in", onComplete: advance });
  };

  const openProjectDetails = (index: number, trigger: HTMLElement) => {
    if (busyRef.current) return;
    projectDetailsOpenRefs.current[index]?.(trigger);
  };

  const onProjectCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    const target = event.target as HTMLElement;
    if (target !== event.currentTarget && target.closest("a, button, input, select, textarea, [contenteditable='true']")) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openProjectDetails(index, event.currentTarget);
  };

  const onProjectCardClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const target = event.target as HTMLElement;
    if (target.closest("a, button, input, select, textarea, [contenteditable='true']")) return;
    openProjectDetails(index, event.currentTarget);
  };

  useEffect(() => () => {
    const active = activeCycleRef.current;
    if (!active) return;
    gsap.killTweensOf(active.card);
    gsap.set(active.card, { y: 0, opacity: 1, rotation: 0, clearProps: "transform,opacity" });
    activeCycleRef.current = null;
    busyRef.current = false;
  }, []);

  useEffect(() => {
    if (!reducedMotion || !activeCycleRef.current) return;
    const active = activeCycleRef.current;
    gsap.killTweensOf(active.card);
    active.finish();
  }, [reducedMotion]);

  return (
    <Section id="projects" ariaLabel="Projects" className="lg:-mx-6">
      <div ref={sectionRef} className="space-y-5 md:space-y-6">
        <MagneticDots>
          <header className="flex items-end gap-4">
            <div className="space-y-2.5">
              <p ref={numberRef} className="text-xs font-semibold tracking-[0.18em] text-slate-500">02</p>
              <SplitHeading as="h2" ref={titleRef} className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                Projects
              </SplitHeading>
            </div>
            <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
          </header>
        </MagneticDots>

        <div ref={gridRef} className="project-grid">
          {projects.map((project, index) => {
            const longestPillLabel = project.cardTechnologies.reduce(
              (longest, technology) => technology.length > longest.length ? technology : longest,
              "",
            );
            const pillWidth = `calc(${(longestPillLabel.length * 0.55).toFixed(2)}em + 0.9rem)`;

            return (
              <div
                key={project.slug}
                data-project-card={index}
                className="project-grid__item"
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label={`View details for ${project.title}`}
                onClick={(event) => onProjectCardClick(event, index)}
                onKeyDown={(event) => onProjectCardKeyDown(event, index)}
              >
                <Card
                  ref={(node) => { projectCardRefs.current[index] = node; }}
                  className="project-card"
                >
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__role">{project.tagline}</p>
                  <p className="project-card__summary">{project.summary}</p>
                  <div className="project-card__pill-grid" style={{ "--project-pill-width": pillWidth } as CSSProperties}>
                    {project.cardTechnologies.map((technology, tagIndex) => (
                      <Badge
                        key={technology}
                        ref={(node) => { projectTagRefs.current[projectTagOffsets[index] + tagIndex] = node; }}
                        className="project-card__pill"
                      >
                        {technology}
                      </Badge>
                    ))}
                  </div>
                  <span className="project-details-trigger" aria-hidden="true">View details</span>
                </Card>

                <ProjectDetails
                  registerOpen={registerProjectDetailsOpen}
                  projectIndex={index}
                  title={project.title}
                  role={project.detailRole}
                  summary={project.detailSummary}
                  technologies={project.technologies}
                >
                  <div className="project-detail-sections">
                    {project.details.map((detail) => (
                      <section key={detail.title}>
                        <h3>{detail.title}</h3>
                        {detail.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        {detail.bullets ? <ul>{detail.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}
                      </section>
                    ))}
                  </div>
                </ProjectDetails>
              </div>
            );
          })}
        </div>

        <div className="project-stack-controls" aria-label="Project navigation">
          <p className="project-stack-position" aria-live="polite" aria-atomic="true">Project {position} of {projects.length}</p>
          <button type="button" className="project-next" onClick={nextProject} disabled={isAnimating} aria-label="Next project">
            Next project <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </Section>
  );
}
