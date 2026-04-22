import Badge from "./ui/Badge";
import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="py-20 md:py-24" aria-label="Intro">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex flex-wrap justify-center gap-2">
          <Badge>Next.js • React • TypeScript</Badge>
        </div>

        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.02em] text-white md:text-6xl">
          Vinayak Nautiyal
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-300 md:text-lg">
          I build modern, performance-focused web apps with clean UI, practical UX, and production-grade
          structure. I enjoy shipping polished experiences end-to-end — from component design to
          integration and deployment.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
          <Button href="#projects">View projects</Button>
          <Button href="/resume.pdf" target="_blank" rel="noreferrer" variant="secondary">
            Resume
          </Button>
          <Button href="https://github.com/slept3arly" target="_blank" rel="noreferrer" variant="ghost">
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
        </div>
      </div>
    </section>
  );
}
