import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import AnimatedCascade from "./ui/AnimatedCascade";
import AnimatedHeading from "./ui/AnimatedHeading";

const skillGroups = [
  {
    title: "Core Engineering",
    description:
      "Strong foundations in programming and system design used to build scalable applications.",
    items: ["TypeScript", "Python", "C++", "Java", "Data Structures & Algorithms"],
  },
  {
    title: "Backend & Data Systems",
    description:
      "Designing APIs, handling data pipelines, and building structured backend logic.",
    items: [
      "Node.js",
      "FastAPI",
      "REST APIs",
      "PostgreSQL",
      "SQLite",
      "Prisma",
      "Pandas",
      "Data Pipelines",
    ],
  },
  {
    title: "Systems & Tooling",
    description:
      "Tools and practices for building, debugging, and deploying reliable systems.",
    items: [
      "Git",
      "GitHub",
      "Docker (basics)",
      "Linux",
      "Postman",
      "Vercel",
      "Debugging",
      "API Testing",
    ],
  },
  {
    title: "Frontend (Applied)",
    description:
      "Used to build clean interfaces for system-driven applications, not design-heavy work.",
    items: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Component Architecture",
      "Responsive Design",
    ],
  },
] as const;

export default function Skills() {
  return (
    <Section id="skills" number="04" label="Skills">
      <AnimatedCascade className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {skillGroups.map((g) => (
          <Card key={g.title}>
            <AnimatedHeading className="text-sm font-semibold text-white">
              {g.title}
            </AnimatedHeading>

            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              {g.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((x) => (
                <Badge key={x}>{x}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </AnimatedCascade>
    </Section>
  );
}