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
            Download my resume
          </AnimatedHeading>
          <AnimatedHeading
            as="p"
            by="word"
            stagger={0.012}
            className="mt-2 text-sm leading-relaxed text-gray-400"
          >
            A one-page overview of my skills, projects, and experience. Replace it anytime at
          </AnimatedHeading>
          <p className="mt-1 text-sm leading-relaxed text-gray-400">
            <span className="font-mono text-gray-300">/public/resume.pdf</span>.
          </p>
        </div>
        <AnimatedCascade className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row" stagger={0.08}>
          <Button href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            View PDF
          </Button>
          <Button href="/resume.pdf" download variant="secondary" className="w-full sm:w-auto">
            Download
          </Button>
        </AnimatedCascade>
      </Card>
    </Section>
  );
}
