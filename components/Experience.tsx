import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import AnimatedCascade from "./ui/AnimatedCascade";
import AnimatedHeading from "./ui/AnimatedHeading";

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
    role: "Frontend Developer Intern (Placeholder)",
    company: "Company Name",
    location: "Remote / On-site",
    start: "Jun 2025",
    end: "Aug 2025",
    tags: ["Next.js", "React", "Tailwind", "REST APIs"],
    bullets: [
      "Built and shipped responsive UI screens with reusable components and consistent styling.",
      "Integrated frontend with API endpoints, handling loading/error states and edge cases cleanly.",
      "Improved perceived performance by optimizing rendering and reducing layout shift.",
      "Collaborated with a small team using GitHub PRs, code reviews, and issue tracking.",
    ],
  },
  {
    role: "Freelance Web Developer (Placeholder)",
    company: "Independent",
    location: "Remote",
    start: "2024",
    end: "Present",
    tags: ["Next.js", "SEO", "UI/UX", "Deployment"],
    bullets: [
      "Delivered small business landing pages with modern design, mobile-first layouts, and basic SEO.",
      "Worked directly with stakeholders to translate requirements into a clear scope and timeline.",
      "Deployed projects with repeatable build steps and simple content updates.",
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experience" number="05" label="Experience">
      <AnimatedCascade className="grid gap-4" stagger={0.1}>
        {experience.map((item) => (
          <Card key={`${item.company}-${item.role}`}>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <AnimatedHeading className="text-base font-semibold text-white">
                  {item.role}
                </AnimatedHeading>
                <p className="mt-1 text-sm text-gray-400">
                  {item.company} · {item.location}
                </p>
              </div>
              <p className="text-sm text-gray-500">
                {item.start} — {item.end}
              </p>
            </div>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300">
              {item.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </AnimatedCascade>
    </Section>
  );
}
