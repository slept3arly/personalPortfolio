import Badge from "./ui/Badge";
import Button from "./ui/Button";
import AnimatedHeading from "./ui/AnimatedHeading";
import AnimatedCascade from "./ui/AnimatedCascade";

export default function Hero() {
  return (
    <section className="py-20 md:py-24" aria-label="Intro">
      <div className="mx-auto max-w-4xl text-center">
        
        {/* Top Tag */}
        <div className="flex flex-wrap justify-center gap-2">
          <Badge>Backend Systems • Data Processing • Full-Stack Engineering</Badge>
        </div>

        {/* Name */}
        <AnimatedHeading
          as="h1"
          by="char"
          stagger={0.028}
          className="mt-6 text-balance text-5xl font-semibold tracking-[-0.02em] text-white md:text-6xl"
        >
          Vinayak Nautiyal
        </AnimatedHeading>

        {/* Description */}
        <AnimatedHeading
          as="p"
          by="word"
          stagger={0.014}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-300 md:text-lg"
        >
          I build backend-focused systems and full-stack applications that handle real data, performance constraints,
          and scalable architecture.

          My work includes designing APIs, building data processing pipelines, and developing end-to-end systems —
          from ingestion and query execution to visualization and deployment.
        </AnimatedHeading>

        {/* CTA */}
        <AnimatedCascade
          className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center"
          stagger={0.08}
        >
          <Button href="#projects">View Systems Projects</Button>

          <Button
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            View Resume
          </Button>

          <Button
            href="https://github.com/slept3arly"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
          >
            GitHub
          </Button>

          <Button
            href="https://www.linkedin.com/in/vinayak-n-000a0b298/"
            target="_blank"
            rel="noreferrer"
            variant="ghost"
          >
            LinkedIn
          </Button>
        </AnimatedCascade>

        {/* Positioning Reinforcement */}
        <p className="mt-6 text-sm text-slate-400">
          Focused on backend systems, data processing, and scalable architecture.
        </p>

      </div>
    </section>
  );
}