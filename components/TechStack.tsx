import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import AnimatedCascade from "./ui/AnimatedCascade";
import AnimatedHeading from "./ui/AnimatedHeading";

const frontend = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Component Architecture",
];

const backend = [
  "Node.js",
  "FastAPI",
  "Flask",
  "REST APIs",
  "Authentication (JWT / sessions)",
  "API Design",
];

const data = [
  "PostgreSQL",
  "SQLite",
  "Pandas",
  "Data Pipelines",
  "Feature Engineering",
  "Fuzzy Matching (RapidFuzz)",
];

const tools = [
  "Git",
  "GitHub",
  "Postman",
  "Docker (basics)",
  "Linux",
  "Vercel",
];

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => (
        <Badge key={x}>{x}</Badge>
      ))}
    </div>
  );
}

export default function TechStack() {
  return (
    <Section id="tech-stack" number="03" label="Tech stack">
      <AnimatedCascade className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        
        <Card>
          <AnimatedHeading className="text-sm font-semibold text-white">
            Frontend
          </AnimatedHeading>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Building clean, structured interfaces for system-driven applications.
          </p>
          <div className="mt-4">
            <PillList items={frontend} />
          </div>
        </Card>

        <Card>
          <AnimatedHeading className="text-sm font-semibold text-white">
            Backend
          </AnimatedHeading>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Designing APIs, handling business logic, and structuring scalable services.
          </p>
          <div className="mt-4">
            <PillList items={backend} />
          </div>
        </Card>

        <Card>
          <AnimatedHeading className="text-sm font-semibold text-white">
            Data & Systems
          </AnimatedHeading>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Working with structured data, pipelines, and analytical processing.
          </p>
          <div className="mt-4">
            <PillList items={data} />
          </div>
        </Card>

        <Card>
          <AnimatedHeading className="text-sm font-semibold text-white">
            Tools
          </AnimatedHeading>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Tooling for development, debugging, and deployment workflows.
          </p>
          <div className="mt-4">
            <PillList items={tools} />
          </div>
        </Card>

      </AnimatedCascade>
    </Section>
  );
}