import Card from "./ui/Card";
import Section from "./ui/Section";
import AnimatedCascade from "./ui/AnimatedCascade";
import AnimatedHeading from "./ui/AnimatedHeading";

type Item = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
};

const items: Item[] = [
  {
    year: "YYYY",
    title: "Sample Achievement / Certification",
    subtitle: "Platform / Organization",
    description:
      "Brief description of what was accomplished, learned, or demonstrated. Replace with actual achievements or certifications.",
  },
  {
    year: "YYYY",
    title: "Another Sample Entry",
    subtitle: "Platform / Organization",
    description:
      "Short explanation highlighting relevance or skills gained. Keep it concise and impact-focused.",
  },
];

export default function Achievements() {
  return (
    <Section id="achievements" number="07" label="Achievements & certifications">
      <AnimatedCascade className="grid gap-4 sm:grid-cols-2" stagger={0.1}>
        {items.map((item) => (
          <Card key={item.title}>
            <p className="text-xs text-gray-500">{item.year}</p>

            <AnimatedHeading className="mt-1 text-sm font-semibold text-white">
              {item.title}
            </AnimatedHeading>

            <p className="mt-1 text-xs text-gray-400">{item.subtitle}</p>

            <p className="mt-3 text-sm leading-relaxed text-gray-300">
              {item.description}
            </p>
          </Card>
        ))}
      </AnimatedCascade>
    </Section>
  );
}