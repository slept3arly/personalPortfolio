import Card from "./ui/Card";
import Section from "./ui/Section";

type Item = {
  title: string;
  issuer: string;
  year: string;
  detail: string;
};

const items: Item[] = [
  {
    title: "JavaScript & Web Development (Placeholder)",
    issuer: "Coursera / Udemy / freeCodeCamp",
    year: "2025",
    detail:
      "Completed hands-on modules on modern JS, async patterns, DOM fundamentals, and building small apps end-to-end.",
  },
  {
    title: "React + Next.js (Placeholder)",
    issuer: "Platform / Bootcamp",
    year: "2025",
    detail:
      "Focused on component architecture, routing, data-fetching patterns, and building responsive UIs with Tailwind.",
  },
];

export default function Certifications() {
  return (
    <Section id="certifications" number="07" label="Achievements & certifications">
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((x) => (
          <Card key={`${x.title}-${x.issuer}`}>
            <p className="text-xs font-medium tracking-widest text-gray-500">{x.year}</p>
            <h3 className="mt-2 text-base font-semibold text-white">{x.title}</h3>
            <p className="mt-1 text-sm text-gray-400">{x.issuer}</p>
            <p className="mt-3 text-sm leading-relaxed text-gray-300">{x.detail}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

