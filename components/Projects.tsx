"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionViewport, projectCardVariants, staggerContainerVariants } from "@/lib/motion";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";

type ProjectLink = { label: string; href: string };

type Project = {
  name: string;
  featured?: boolean;
  subtitle: string;
  problem: string;
  role: string;
  tech: string[];
  features: string[];
  links: ProjectLink[];
};

const projects: Project[] = [
  {
    name: "Vedic Wellness",
    featured: true,
    subtitle: "Featured · Web Development Project",
    problem:
      "Accessing structured and reliable wellness information is often fragmented across sources. This project addresses that by providing a centralized, well-organized platform with clear navigation and content hierarchy.",
    role:
      "Designed and developed the full frontend architecture, including reusable UI components, layout system, and scalable content structure.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    features: [
      "Modular content structure with consistent UI patterns",
      "Clean and intuitive navigation for improved usability",
      "Responsive design optimized for multiple screen sizes",
      "Scalable component-based architecture for future expansion",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/slept3arly/vedic_wellness" },
      { label: "Live Demo", href: "https://vedic-wellness.vercel.app" },
    ],
  },
  {
    name: "InsightRush",
    subtitle: "Analytics Dashboard",
    problem:
      "Teams often struggle to consolidate and interpret data efficiently. InsightRush provides a unified dashboard to visualize key metrics and trends in a clear and accessible format.",
    role:
      "Developed frontend components for dashboards, implemented responsive layouts, and improved UI consistency across views.",
    tech: ["React", "Tailwind CSS", "REST APIs"],
    features: [
      "Interactive dashboard with KPI cards and visual indicators",
      "Filterable data views for improved analysis",
      "Responsive layout ensuring usability across devices",
    ],
    links: [{ label: "GitHub", href: "https://github.com/slept3arly/insightrush" }],
  },
  {
    name: "Team Epik",
    subtitle: "Collaborative Workflow Tool",
    problem:
      "Managing team tasks and updates can become inefficient without a structured system. This project explores a streamlined UI for tracking tasks and collaboration.",
    role:
      "Contributed to UI development and component integration across multiple pages within a team environment.",
    tech: ["Next.js", "React", "Tailwind CSS"],
    features: [
      "Task tracking interface with clear status indicators",
      "Reusable component system for consistent design",
      "User-friendly forms with validation and feedback",
    ],
    links: [{ label: "GitHub", href: "https://github.com/slept3arly/team-epik" }],
  },
  {
    name: "Lumi",
    subtitle: "UI/UX Exploration Project",
    problem:
      "Balancing aesthetics with usability is key in modern interfaces. Lumi focuses on refining micro-interactions and layout clarity.",
    role: "Designed and implemented UI components with emphasis on interaction, spacing, and typography.",
    tech: ["React", "Tailwind CSS"],
    features: [
      "Refined card layouts with subtle hover interactions",
      "Improved typography scale for readability",
      "Reusable UI elements for consistent styling",
    ],
    links: [{ label: "GitHub", href: "https://github.com/slept3arly/lumi" }],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={projectCardVariants}>
      <Card
        className={
          project.featured
            ? "border-gray-700 bg-gradient-to-b from-white/[0.08] to-transparent ring-1 ring-white/10"
            : undefined
        }
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-white">{project.name}</h3>
              {project.featured && (
                <span className="rounded-full border border-gray-700 bg-white/5 px-2.5 py-0.5 text-xs text-gray-200">
                  Featured
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-400">{project.subtitle}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-widest text-gray-500">Problem</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-widest text-gray-500">Role</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-300">{project.role}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium tracking-widest text-gray-500">Key Features</p>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-300">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {project.links.map((l, idx) => (
            <Button
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              variant={idx === 0 ? "secondary" : "ghost"}
              className="w-full sm:w-auto"
            >
              {l.label}
            </Button>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const reducedMotion = useReducedMotion();

  return (
    <Section id="projects" number="02" label="Projects">
      <p className="max-w-3xl text-sm leading-relaxed text-gray-400">
        Selected projects demonstrating strong fundamentals in frontend development, UI design, and
        scalable component-based architecture.
      </p>

      <motion.div
        className="mt-6 grid gap-4"
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={motionViewport}
        variants={staggerContainerVariants}
      >
        {featured && <ProjectCard project={featured} />}
        <div className="grid gap-4 sm:grid-cols-2">
          {rest.map((p) => (
            <ProjectCard key={p.name} project={p} />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}

