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
    role: "Freelance Developer",
    company: "Vedic Wellness",
    location: "Remote",
    start: "2024",
    end: "Present",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Docker", "Auth"],
    bullets: [
      "Developed and deployed a full-stack e-commerce platform for a real-world Ayurvedic business.",
      "Architected backend using service-layer abstractions with Prisma ORM for structured and scalable data access.",
      "Implemented authentication with RBAC, OTP-based verification, and rate limiting for secure user workflows.",
      "Designed normalized database schema for products, users, and orders with transactional order processing.",
      "Optimized performance using server-side rendering and cache revalidation for read-heavy traffic.",
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