import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";
import AnimatedCascade from "./ui/AnimatedCascade";
import AnimatedHeading from "./ui/AnimatedHeading";

export default function Resume() {
  return (
    <Section id="resume" number="08" label="Resume">
      <Card className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <AnimatedHeading className="text-base font-semibold text-white">
            Resume
          </AnimatedHeading>

          <AnimatedHeading
            as="p"
            by="word"
            stagger={0.012}
            className="mt-2 text-sm leading-relaxed text-gray-400 max-w-md"
          >
            Concise overview of my work across backend systems, data pipelines, and full-stack
            applications, including architecture decisions and implementation details.
          </AnimatedHeading>
        </div>

        <AnimatedCascade
          className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          stagger={0.08}
        >
          <Button
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto"
          >
            View resume
          </Button>

          <Button
            href="/resume.pdf"
            download
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Download PDF
          </Button>
        </AnimatedCascade>
      </Card>
    </Section>
  );
}