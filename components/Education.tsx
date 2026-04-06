import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";

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
    program: "B.Tech in Computer Science (Placeholder)",
    school: "University / Institute Name",
    start: "2024",
    end: "2028",
    tags: ["DSA", "OOP", "DBMS", "Networks", "OS"],
    highlights: [
      "Coursework: Data Structures & Algorithms, OOP, DBMS, Computer Networks, Operating Systems.",
      "Built multiple web projects focused on component design, accessibility, and performance.",
      "Active learning through hackathons / clubs (placeholder).",
    ],
  },
];

export default function Education() {
  return (
    <Section id="education" number="06" label="Education">
      <div className="grid gap-4">
        {education.map((item) => (
          <Card key={`${item.school}-${item.program}`}>
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h3 className="text-base font-semibold text-white">{item.program}</h3>
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
      </div>
    </Section>
  );
}

