import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";

export default function Resume() {
  return (
    <Section id="resume" number="08" label="Resume">
      <Card className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-semibold text-white">Download my resume</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            A one-page overview of my skills, projects, and experience. Replace it anytime at{" "}
            <span className="font-mono text-gray-300">/public/resume.pdf</span>.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            View PDF
          </Button>
          <Button href="/resume.pdf" download variant="secondary" className="w-full sm:w-auto">
            Download
          </Button>
        </div>
      </Card>
    </Section>
  );
}

