import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import AnimatedCascade from "./ui/AnimatedCascade";
import AnimatedHeading from "./ui/AnimatedHeading";

type EducationItem = {
  program: string;
  school: string;
  start: string;
  end: string;
  highlights: string[];
  tags: string[];
};

const education: EducationItem[] = [
  {
    program: "B.Tech in Computer Science and Engineering",
    school: "Vellore Institute of Technology (VIT), Vellore",
    start: "2024",
    end: "Present",
    tags: ["DSA", "OOP", "Computer Networks"],
    highlights: [
      "CGPA: 8.89 / 10.",
      "Core coursework: Data Structures & Algorithms, OOP, Computer Networks",
      "Focused on backend systems, data handling, and scalable application design through project-based learning.",
      "Built multiple full-stack and system-oriented projects involving APIs, databases, and data pipelines.",
    ],
  },
];

export default function Education() {
  return (
    <Section id="education" number="06" label="Education">
      <AnimatedCascade className="grid gap-4" stagger={0.1}>
        {education.map((item) => (
          <Card key={`${item.school}-${item.program}`}>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <AnimatedHeading className="text-base font-semibold text-white">
                  {item.program}
                </AnimatedHeading>
                <p className="mt-1 text-sm text-gray-400">{item.school}</p>
              </div>
              <p className="text-sm text-gray-500">
                {item.start} — {item.end}
              </p>
            </div>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-300">
              {item.highlights.map((h) => (
                <li key={h}>{h}</li>
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