import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import AnimatedCascade from "./ui/AnimatedCascade";
import AnimatedHeading from "./ui/AnimatedHeading";

const frontend = ["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS"];
const backend = ["Node.js", "Express (placeholder)", "REST APIs", "Auth (JWT/session)"];
const tools = ["Git & GitHub", "Postman", "Vercel", "VS Code", "Figma (handoffs)", "Linux basics"];

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
      <AnimatedCascade className="grid gap-4 sm:grid-cols-3" stagger={0.1}>
        <Card>
          <AnimatedHeading className="text-sm font-semibold text-white">Frontend</AnimatedHeading>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            UI engineering focused on accessibility, performance, and component-driven design.
          </p>
          <div className="mt-4">
            <PillList items={frontend} />
          </div>
        </Card>
        <Card>
          <AnimatedHeading className="text-sm font-semibold text-white">Backend</AnimatedHeading>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Building clean APIs and integrating real-world services (payments, email, storage).
          </p>
          <div className="mt-4">
            <PillList items={backend} />
          </div>
        </Card>
        <Card>
          <AnimatedHeading className="text-sm font-semibold text-white">Tools</AnimatedHeading>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Practical tooling for shipping, debugging, and collaborating in teams.
          </p>
          <div className="mt-4">
            <PillList items={tools} />
          </div>
        </Card>
      </AnimatedCascade>
    </Section>
  );
}
