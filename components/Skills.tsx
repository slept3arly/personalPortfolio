import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import AnimatedCascade from "./ui/AnimatedCascade";
import AnimatedHeading from "./ui/AnimatedHeading";

const skillGroups = [
  {
    title: "Core",
    description: "Strong fundamentals I use daily for building modern UIs.",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS"],
  },
  {
    title: "UI & UX",
    description: "Practical skills for clean layouts, accessible components, and consistency.",
    items: [
      "Tailwind CSS",
      "Responsive design",
      "Accessibility",
      "Forms & validation",
      "Component systems",
    ],
  },
  {
    title: "Engineering",
    description: "Tools and habits that support shipping and collaboration.",
    items: ["Git", "GitHub PRs", "Debugging", "API integration", "Deployment (Vercel)"],
  },
] as const;

export default function Skills() {
  return (
    <Section id="skills" number="04" label="Skills">
      <AnimatedCascade className="grid gap-4 sm:grid-cols-3" stagger={0.1}>
        {skillGroups.map((g) => (
          <Card key={g.title}>
            <AnimatedHeading className="text-sm font-semibold text-white">{g.title}</AnimatedHeading>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">{g.description}</p>
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
