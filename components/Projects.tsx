"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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

export default function Projects() {
  type ProjectOpenHandler = (trigger: HTMLElement) => void;
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const projectCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const projectDetailsOpenRefs = useRef<Array<ProjectOpenHandler | null>>(Array(9).fill(null));
  const projectTagRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const busyRef = useRef(false);
  const activeCycleRef = useRef<{ card: HTMLElement; finish: () => void } | null>(null);
  const [position, setPosition] = useState(1);
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
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
      const position = order.indexOf(Number(card.dataset.projectCard));
      card.style.setProperty("--stack-position", String(position));
      card.style.order = String(position);
      card.dataset.stackPosition = String(position);
      card.dataset.stackVisible = String(position <= 3);
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
          rotateY(x * motion.tilt.maxAngle); rotateX(-y * motion.tilt.maxAngle);
        };
        const leave = () => { rotateX(0); rotateY(0); };
        card.addEventListener("pointermove", move); card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave);
          gsap.killTweensOf(card, "rotationX,rotationY");
          gsap.set(card, { rotationX: 0, rotationY: 0, clearProps: "transform" });
        });
      });
    };
    setup(); desktopPointer.addEventListener("change", setup); reduce.addEventListener("change", setup);
    return () => { cleanups.splice(0).forEach((cleanup) => cleanup()); desktopPointer.removeEventListener("change", setup); reduce.removeEventListener("change", setup); };
  }, []);

  const nextProject = () => {
    if (busyRef.current) return;
    const grid = gridRef.current; if (!grid) return;
    const outgoing = grid.querySelector<HTMLElement>(`[data-project-card="${order[0]}"]`);
    if (!outgoing) return;
    busyRef.current = true; setIsAnimating(true);
    const advance = () => {
      gsap.set(outgoing, { y: 0, opacity: 1, rotation: 0, clearProps: "transform,opacity" });
      setOrder((current) => [...current.slice(1), current[0]]);
      setPosition((current) => current === 9 ? 1 : current + 1);
      busyRef.current = false; setIsAnimating(false);
      activeCycleRef.current = null;
    };
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { advance(); return; }
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
        <MagneticDots><header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
            >
              02
            </p>
            <SplitHeading as="h2" ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
            >
              Projects
            </SplitHeading>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header></MagneticDots>

        <div ref={gridRef} className="project-grid">
          <div data-project-card="0" className="project-grid__item" role="button" tabIndex={0} aria-haspopup="dialog" aria-label="View details for Vedic Wellness" onClick={(event) => onProjectCardClick(event, 0)} onKeyDown={(event) => onProjectCardKeyDown(event, 0)}>
            <Card ref={(node) => { projectCardRefs.current[0] = node; }}>
              <p className="project-card__title text-base font-semibold text-white">Vedic Wellness</p>
              <p className="project-card__role">Independent Developer</p>
              <p className="project-card__summary">Full-stack commerce and CMS platform for an Ayurvedic business, covering catalog, customer accounts, checkout, orders, and administration.</p>

              <div className="project-card__footer">
              <span className="project-details-trigger" aria-hidden="true">View details</span>
              <ProjectDetails registerOpen={registerProjectDetailsOpen} projectIndex={0} title="Vedic Wellness" summary="Full-stack commerce and CMS platform for an Ayurvedic business, covering catalog, customer accounts, checkout, orders, and administration." technologies={["Next.js", "TypeScript", "PostgreSQL", "Prisma"]} role="Independent Developer"><div className="mt-3 grid gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Architecture and Workflows</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    A layered Next.js application separates UI, security wrappers, business services, and Prisma data
                    access. Cart and single-product checkout use transactional order workflows; a secret-protected
                    scheduled endpoint handles order expiry.
                  </p>

                  <p className="mt-3 text-sm font-medium text-gray-400">Engineering Highlights</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Credential authentication, role-based access, validation, CSRF protections, and rate limiting</li>
                    <li>• Targeted cache-tag revalidation and ISR keep catalog content fresh after updates</li>
                    <li>• Cloudflare R2 media utilities, administrative audit logging, and Sentry observability</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Project Scope</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Uses serverless-oriented patterns. A live deployment and production operation have not been verified.
                  </p>
                </div>
                </div></ProjectDetails>

              <div className="project-card__tags">
                <div className="project-card__tag-row project-card__tag-row--three">
                  <Badge ref={(node) => { projectTagRefs.current[0] = node; }}>Next.js</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[1] = node; }}>TypeScript</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[2] = node; }}>PostgreSQL</Badge>
                </div>
                <div className="project-card__tag-row">
                  <Badge ref={(node) => { projectTagRefs.current[3] = node; }}>Prisma</Badge>
                </div>
              </div>
            </div>
            </Card>
          </div>

          <div data-project-card="1" className="project-grid__item" role="button" tabIndex={0} aria-haspopup="dialog" aria-label="View details for InsightRush" onClick={(event) => onProjectCardClick(event, 1)} onKeyDown={(event) => onProjectCardKeyDown(event, 1)}>
            <Card ref={(node) => { projectCardRefs.current[1] = node; }}>
              <p className="project-card__title text-base font-semibold text-white">InsightRush</p>
              <p className="project-card__role">Backend contribution · Hackathon project</p>
              <p className="project-card__summary">FastAPI backend for analytical queries over uploaded CSV datasets, including approximate results.</p>

              <div className="project-card__footer">
              <span className="project-details-trigger" aria-hidden="true">View details</span>
              <ProjectDetails registerOpen={registerProjectDetailsOpen} projectIndex={1} title="InsightRush" summary="FastAPI backend for analytical queries over uploaded CSV datasets, including approximate results." technologies={["Python", "FastAPI", "DuckDB"]} role="Backend contribution · Hackathon project"><div className="mt-4 grid gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Backend Contribution</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Built FastAPI services for CSV ingestion, schema validation, query execution, and structured responses.
                  </p>

                  <p className="mt-4 text-sm font-medium text-gray-400">Key Work</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Uses DuckDB to execute analytical queries over uploaded datasets</li>
                    <li>• Estimates COUNT, SUM, and AVG from dataset samples for approximate query processing</li>
                    <li>• API contracts return results with execution metadata for the frontend</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Outcome</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Collaborated with a frontend developer to integrate the backend through shared API contracts.
                  </p>
                </div>
                </div></ProjectDetails>

              <div className="project-card__tags">
                <div className="project-card__tag-row project-card__tag-row--three">
                  <Badge ref={(node) => { projectTagRefs.current[4] = node; }}>Python</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[5] = node; }}>FastAPI</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[6] = node; }}>DuckDB</Badge>
                </div>
              </div>
            </div>
            </Card>
          </div>





          <div data-project-card="2" className="project-grid__item" role="button" tabIndex={0} aria-haspopup="dialog" aria-label="View details for Lumi" onClick={(event) => onProjectCardClick(event, 2)} onKeyDown={(event) => onProjectCardKeyDown(event, 2)}>
            <Card ref={(node) => { projectCardRefs.current[2] = node; }}>
              <p className="project-card__title text-base font-semibold text-white">Lumi</p>
              <p className="project-card__role">Backend contribution</p>
              <p className="project-card__summary">Flask and SQLite wellness dashboard for habits, goals, tasks, health logs, and optional routine analysis.</p>

              <div className="project-card__footer">
              <span className="project-details-trigger" aria-hidden="true">View details</span>
              <ProjectDetails registerOpen={registerProjectDetailsOpen} projectIndex={2} title="Lumi" summary="Flask and SQLite wellness dashboard for habits, goals, tasks, health logs, and optional routine analysis." technologies={["Python", "Flask", "SQLite", "Google Gemini API"]} role="Backend contribution"><div className="mt-3 grid gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Problem</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Wellness and productivity information can be scattered across separate trackers, making routines
                    and progress harder to review together.
                  </p>

                  <p className="mt-3 text-sm font-medium text-gray-400">Backend Contribution</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Backend development for a Flask application organized around routes and a domain service layer</li>
                    <li>• SQLite persistence for habits, goals, tasks, wellness logs, and community posts</li>
                    <li>• Centralized input validation, session authentication, password hashing, and CSRF checks</li>
                    <li>• Optional Gemini routine analysis with ordered model attempts and deterministic local fallback</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Application</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    The dashboard brings habit completion, goals, tasks, wellness logs, and community updates together.
                    It remains a prototype; deployment and production operation have not been verified.
                  </p>
                </div>
                </div></ProjectDetails>

              <div className="project-card__tags">
                <div className="project-card__tag-row project-card__tag-row--three">
                  <Badge ref={(node) => { projectTagRefs.current[7] = node; }}>Python</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[8] = node; }}>Flask</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[9] = node; }}>SQLite</Badge>
                </div>
                <div className="project-card__tag-row">
                  <Badge ref={(node) => { projectTagRefs.current[10] = node; }}>Google Gemini API</Badge>
                </div>
              </div>
            </div>
            </Card>
          </div>

          <div data-project-card="3" className="project-grid__item" role="button" tabIndex={0} aria-haspopup="dialog" aria-label="View details for AdaptNess" onClick={(event) => onProjectCardClick(event, 3)} onKeyDown={(event) => onProjectCardKeyDown(event, 3)}>
            <Card ref={(node) => { projectCardRefs.current[3] = node; }}>
              <p className="project-card__title text-base font-semibold text-white">AdaptNess</p>
              <p className="project-card__summary">Windows tray utility that adjusts display brightness from on-screen luminance using a smoothed feedback controller.</p>

              <div className="project-card__footer">
              <span className="project-details-trigger" aria-hidden="true">View details</span>
              <ProjectDetails registerOpen={registerProjectDetailsOpen} projectIndex={3} title="AdaptNess" summary="Windows tray utility that adjusts display brightness from on-screen luminance using a smoothed feedback controller." technologies={["C#", ".NET 10", "WMI", "Win32 GDI"]}><div className="mt-3 grid gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Controller Design</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Average screen luminance maps to an inverse brightness target. Exponential smoothing, a deadband,
                    bounded steps, and rate limiting help reduce oscillation; manual changes are detected despite
                    delayed or rounded WMI readbacks.
                  </p>

                  <p className="mt-3 text-sm font-medium text-gray-400">Engineering Highlights</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Samples the primary display into a 32×18 BGRA buffer using Win32 GDI with resource cleanup</li>
                    <li>• Uses Rec. 709 perceived luminance and WMI brightness control</li>
                    <li>• Includes fail-safe handling for capture and brightness-control failures</li>
                    <li>• Provides framework-free in-process self-tests for controller logic</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Project Status</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Early-stage source project (v0.1.0). Brightness control depends on compatible WMI monitor drivers;
                    external-display behavior is not established. Runtime behavior was not checked during this review.
                  </p>
                </div>
                </div></ProjectDetails>

              <div className="project-card__tags">
                <div className="project-card__tag-row project-card__tag-row--three">
                  <Badge ref={(node) => { projectTagRefs.current[11] = node; }}>C#</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[12] = node; }}>.NET 10</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[13] = node; }}>WMI</Badge>
                </div>
                <div className="project-card__tag-row">
                  <Badge ref={(node) => { projectTagRefs.current[14] = node; }}>Win32 GDI</Badge>
                </div>
              </div>
            </div>
            </Card>
          </div>

          <div data-project-card="4" className="project-grid__item" role="button" tabIndex={0} aria-haspopup="dialog" aria-label="View details for DFA-Visualizer" onClick={(event) => onProjectCardClick(event, 4)} onKeyDown={(event) => onProjectCardKeyDown(event, 4)}>
            <Card ref={(node) => { projectCardRefs.current[4] = node; }}>
              <p className="project-card__title text-base font-semibold text-white">DFA-Visualizer</p>
              <p className="project-card__role">Frontend contribution</p>
              <p className="project-card__summary">Interactive React and TypeScript tool for exploring regular-expression compilation through syntax trees, tables, DFA graphs, and string traces.</p>

              <div className="project-card__footer">
              <span className="project-details-trigger" aria-hidden="true">View details</span>
              <ProjectDetails registerOpen={registerProjectDetailsOpen} projectIndex={4} title="DFA-Visualizer" summary="Interactive React and TypeScript tool for exploring regular-expression compilation through syntax trees, tables, DFA graphs, and string traces." technologies={["React", "TypeScript", "Vite"]} role="Frontend contribution"><div className="mt-3 grid gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Interactive Learning</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Stage navigation connects compiler results to explanatory tables and graph views, helping learners
                    inspect the steps from an expression to a minimized DFA and trace accepted or rejected strings.
                  </p>

                  <p className="mt-3 text-sm font-medium text-gray-400">Frontend Contribution</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Frontend development for the React interface and compiler-stage presentation</li>
                    <li>• Focus on interactive visualization, component integration, and clarity of algorithm results</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Project Notes</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Supports literals, alternation, concatenation, Kleene star, and grouping. The UI and visualization
                    phases are still in development; tests were not run during review, and no deployment configuration
                    was found.
                  </p>
                </div>
                </div></ProjectDetails>

              <div className="project-card__tags">
                <div className="project-card__tag-row project-card__tag-row--three">
                  <Badge ref={(node) => { projectTagRefs.current[15] = node; }}>React</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[16] = node; }}>TypeScript</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[17] = node; }}>Vite</Badge>
                </div>
              </div>
            </div>
            </Card>
          </div>

          <div data-project-card="5" className="project-grid__item" role="button" tabIndex={0} aria-haspopup="dialog" aria-label="View details for Process Creation Visualizer" onClick={(event) => onProjectCardClick(event, 5)} onKeyDown={(event) => onProjectCardKeyDown(event, 5)}>
            <Card ref={(node) => { projectCardRefs.current[5] = node; }}>
              <p className="project-card__title text-base font-semibold text-white">Process Creation Visualizer</p>
              <p className="project-card__role">Frontend and backend contribution</p>
              <p className="project-card__summary">Operating-systems simulator for process states, parent-child relationships, and CPU scheduling, with synchronized web visualizations.</p>

              <div className="project-card__footer">
              <span className="project-details-trigger" aria-hidden="true">View details</span>
              <ProjectDetails registerOpen={registerProjectDetailsOpen} projectIndex={5} title="Process Creation Visualizer" summary="Operating-systems simulator for process states, parent-child relationships, and CPU scheduling, with synchronized web visualizations." technologies={["Next.js", "TypeScript", "Python", "FastAPI"]} role="Frontend and backend contribution"><div className="mt-3 grid gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Full-Stack Development</h3>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Implemented a FastAPI REST backend with shared controller, process and state managers, and event logging</li>
                    <li>• Built interactive React views for process states, hierarchies, PCBs, event logs, and scheduling</li>
                    <li>• Validates lifecycle transitions and reports rejected actions with currently valid operations</li>
                    <li>• Tkinter desktop UI shares the controller and simulation logic</li>
                  </ul>

                  <p className="mt-3 text-sm font-medium text-gray-400">Scheduling and Playback</p>
                  <p className="mt-1 text-sm text-gray-300">
                    FCFS, non-preemptive SJF, non-preemptive Priority, and Round Robin produce Gantt timelines and
                    waiting, turnaround, and response-time metrics. Playback events derived from immutable schedule
                    results stay synchronized with lifecycle graph animations.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Project Scope</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    This is an educational simulation; it does not control real operating-system processes. The
                    portfolio update is based on source inspection; tests were not run and deployments were not
                    verified.
                  </p>
                </div>
                </div></ProjectDetails>

              <div className="project-card__tags">
                <div className="project-card__tag-row project-card__tag-row--three">
                  <Badge ref={(node) => { projectTagRefs.current[18] = node; }}>Next.js</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[19] = node; }}>TypeScript</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[20] = node; }}>Python</Badge>
                </div>
                <div className="project-card__tag-row">
                  <Badge ref={(node) => { projectTagRefs.current[21] = node; }}>FastAPI</Badge>
                </div>
              </div>
            </div>
            </Card>
          </div>

          <div data-project-card="6" className="project-grid__item" role="button" tabIndex={0} aria-haspopup="dialog" aria-label="View details for Local AI" onClick={(event) => onProjectCardClick(event, 6)} onKeyDown={(event) => onProjectCardKeyDown(event, 6)}>
            <Card ref={(node) => { projectCardRefs.current[6] = node; }}>
              <p className="project-card__title text-base font-semibold text-white">Local AI</p>
              <p className="project-card__summary">Tauri and React desktop chat client that connects to a locally running Ollama service.</p>

              <div className="project-card__footer">
              <span className="project-details-trigger" aria-hidden="true">View details</span>
              <ProjectDetails registerOpen={registerProjectDetailsOpen} projectIndex={6} title="Local AI" summary="Tauri and React desktop chat client that connects to a locally running Ollama service." technologies={["React", "TypeScript", "Tauri 2", "Ollama HTTP API"]}><div className="mt-3 grid gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Application Features</h3>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• TypeScript service communicates with Ollama `/api/chat` and `/api/tags` endpoints</li>
                    <li>• Supports creating, selecting, deleting, and automatically titling conversations</li>
                    <li>• Groups conversations by recency; conversation state is currently in memory only</li>
                    <li>• Includes request cancellation, timed Ollama availability checks, and error handling</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Project Status</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    An early-stage local-LLM desktop prototype. Inference runs through the configured Ollama service;
                    network behavior depends on that endpoint and deployment. The application and packaging were not
                    built or run during review.
                  </p>
                  <p className="mt-3 text-sm font-medium text-gray-400">Implementation Notes</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Ollama communication is separated into a service module, while Tauri provides the desktop shell
                    and Rust release-profile configuration.
                  </p>
                </div>
                </div></ProjectDetails>

              <div className="project-card__tags">
                <div className="project-card__tag-row project-card__tag-row--three">
                  <Badge ref={(node) => { projectTagRefs.current[22] = node; }}>React</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[23] = node; }}>TypeScript</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[24] = node; }}>Tauri 2</Badge>
                </div>
                <div className="project-card__tag-row">
                  <Badge ref={(node) => { projectTagRefs.current[25] = node; }}>Ollama HTTP API</Badge>
                </div>
              </div>
            </div>
            </Card>
          </div>

          <div data-project-card="7" className="project-grid__item" role="button" tabIndex={0} aria-haspopup="dialog" aria-label="View details for semantiCache" onClick={(event) => onProjectCardClick(event, 7)} onKeyDown={(event) => onProjectCardKeyDown(event, 7)}>
            <Card ref={(node) => { projectCardRefs.current[7] = node; }}>
              <p className="project-card__title text-base font-semibold text-white">semantiCache</p>
              <p className="project-card__summary">Research prototype with a two-tier SQLite exact-match and ChromaDB semantic cache, followed by Ollama fallback.</p>

              <div className="project-card__footer">
              <span className="project-details-trigger" aria-hidden="true">View details</span>
              <ProjectDetails registerOpen={registerProjectDetailsOpen} projectIndex={7} title="semantiCache" summary="Research prototype with a two-tier SQLite exact-match and ChromaDB semantic cache, followed by Ollama fallback." technologies={["Python", "FastAPI", "SQLite", "ChromaDB"]}><div className="mt-3 grid gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Two-Tier Lookup</h3>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Exact SQLite lookup is scoped by user, session, conversation, query, and category, with TTL expiry</li>
                    <li>• Semantic lookup embeds prompts with all-MiniLM-L6-v2 and applies a ChromaDB distance threshold</li>
                    <li>• API responses identify exact-cache, semantic-cache, or Ollama-generated results</li>
                    <li>• Cache misses generate asynchronously through Ollama and populate both cache tiers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Prototype Notes</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Semantic search currently queries the collection without the exact cache’s user, session,
                    conversation, or category filters. No benchmarks or successful runtime checks were verified; this
                    is a research prototype, not a production or federated caching system.
                  </p>
                </div>
                </div></ProjectDetails>

              <div className="project-card__tags">
                <div className="project-card__tag-row project-card__tag-row--three">
                  <Badge ref={(node) => { projectTagRefs.current[26] = node; }}>Python</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[27] = node; }}>FastAPI</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[28] = node; }}>SQLite</Badge>
                </div>
                <div className="project-card__tag-row">
                  <Badge ref={(node) => { projectTagRefs.current[29] = node; }}>ChromaDB</Badge>
                </div>
              </div>
            </div>
            </Card>
          </div>

          <div data-project-card="8" className="project-grid__item" role="button" tabIndex={0} aria-haspopup="dialog" aria-label="View details for LeadBridge" onClick={(event) => onProjectCardClick(event, 8)} onKeyDown={(event) => onProjectCardKeyDown(event, 8)}>
            <Card ref={(node) => { projectCardRefs.current[8] = node; }}>
              <p className="project-card__title text-base font-semibold text-white">LeadBridge</p>
              <p className="project-card__summary">Internal lead-management platform for ingesting, organizing, routing, reviewing, and managing business leads.</p>

              <div className="project-card__footer">
              <span className="project-details-trigger" aria-hidden="true">View details</span>
              <ProjectDetails registerOpen={registerProjectDetailsOpen} projectIndex={8} title="LeadBridge" summary="Internal lead-management platform for ingesting, organizing, routing, reviewing, and managing business leads." technologies={["Next.js", "TypeScript", "PostgreSQL", "Prisma"]}><div className="mt-3 grid gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Connector Runtime</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Modular Gmail and REST connectors feed a parser pipeline that normalizes and validates external
                    data before transactional PostgreSQL persistence. Sync history, health tracking, structured logs,
                    and retry handling support connector operations.
                  </p>

                  <p className="mt-3 text-sm font-medium text-gray-400">Engineering Highlights</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Lease-based connector locks use generation counters and transaction fencing to reject stale writers</li>
                    <li>• REST ingestion validates destinations and redirects and bounds request size, duration, and pagination</li>
                    <li>• CSV export escapes spreadsheet formula inputs</li>
                    <li>• Role-based admin and sales workflows manage assignments, follow-ups, and activity history</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400">Project Scope</h3>
                  <p className="mt-1 text-sm text-gray-300">
                    Built with Next.js, TypeScript, PostgreSQL, Prisma, and REST APIs. Role-based access controls,
                    audit logs, reporting, and CSV exports support lead-management workflows. Active since July 2026;
                    the resume lists deployment on Vercel, though live operation has not been independently verified.
                  </p>
                </div>
                </div></ProjectDetails>

              <div className="project-card__tags">
                <div className="project-card__tag-row project-card__tag-row--three">
                  <Badge ref={(node) => { projectTagRefs.current[30] = node; }}>Next.js</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[31] = node; }}>TypeScript</Badge>
                  <Badge ref={(node) => { projectTagRefs.current[32] = node; }}>PostgreSQL</Badge>
                </div>
                <div className="project-card__tag-row">
                  <Badge ref={(node) => { projectTagRefs.current[33] = node; }}>Prisma</Badge>
                </div>
              </div>
            </div>
            </Card>
          </div>
        </div>
        <div className="project-stack-controls" aria-label="Project navigation">
          <p className="project-stack-position" aria-live="polite" aria-atomic="true">Project {position} of 9</p>
          <button type="button" className="project-next" onClick={nextProject} disabled={isAnimating} aria-label="Next project">Next project <span aria-hidden="true">→</span></button>
        </div>
      </div>
    </Section>
  );
}
