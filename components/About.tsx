import Badge from "./ui/Badge";
import Card from "./ui/Card";
import AnimatedCascade from "./ui/AnimatedCascade";
import Section from "./ui/Section";
import AnimatedHeading from "./ui/AnimatedHeading";

export default function About() {
  return (
    <Section id="about" number="01" label="About">
      <AnimatedCascade className="grid gap-4 sm:grid-cols-3" stagger={0.12}>
        
        {/* LEFT CARD */}
        <Card className="sm:col-span-2">
          <p className="text-sm leading-relaxed text-gray-300">
            I’m a computer science student focused on building backend-heavy systems and full-stack applications that solve real-world problems.
            My work centers around designing structured architectures, handling data pipelines, and building systems that are not just functional, but scalable and logically sound.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            I’ve built systems including a full-stack e-commerce platform with authentication and role-based access control, 
            a high-performance analytical engine for large-scale data queries, and machine learning pipelines for tasks like face recognition.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            I focus on understanding systems end-to-end — from data ingestion and processing to API design, business logic, and deployment.
          </p>
        </Card>

        {/* RIGHT CARD */}
        <Card>
          <AnimatedHeading className="text-sm font-semibold text-white">
            Focus areas
          </AnimatedHeading>

          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li>Backend systems & API design</li>
            <li>Data processing & analytical systems</li>
            <li>Full-stack architecture (end-to-end systems)</li>
            <li>Authentication, security & system design fundamentals</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge>TypeScript</Badge>
            <Badge>Python</Badge>
            <Badge>PostgreSQL</Badge>
            <Badge>Prisma</Badge>
            <Badge>FastAPI</Badge>
            <Badge>Next.js</Badge>
          </div>
        </Card>

      </AnimatedCascade>
    </Section>
  );
}