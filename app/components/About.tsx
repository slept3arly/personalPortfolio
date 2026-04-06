import Section from "./ui/Section";
import Card from "./ui/Card";
import Badge from "./ui/Badge";

export default function About() {
  return (
    <Section id="about" number="01" label="About">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="sm:col-span-2">
          <p className="text-sm leading-relaxed text-gray-300">
            I’m a developer focused on building <span className="text-white">reliable, user-friendly web
            applications</span>. I care about clean architecture, reusable UI, and the small details that
            make a product feel “finished” — accessible interactions, consistent spacing, and clear
            information hierarchy.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            Recently, I’ve been working on projects like{" "}
            <span className="text-white">Vedic Wellness</span> where I practice real-world patterns:
            building a structured UI system, organizing data models, and presenting features in a
            recruiter-friendly way (problem → approach → outcome).
          </p>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-white">Focus areas</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li>Component-driven UI & design systems</li>
            <li>Responsive layouts and accessibility</li>
            <li>API integration and clean state handling</li>
            <li>Performance basics (CLS, rendering, bundling)</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>Next.js</Badge>
            <Badge>React</Badge>
            <Badge>TypeScript</Badge>
            <Badge>Tailwind</Badge>
          </div>
        </Card>
      </div>
    </Section>
  );
}