import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[color:var(--surface-border)] py-10 text-sm md:mt-20">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-slate-500">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <div className="flex items-center gap-4 text-slate-500">
          <a className="interactive-link" href="#top">
            Back to top
          </a>
          <span className="text-slate-700" aria-hidden="true">
            •
          </span>
          <a
            className="interactive-link"
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="interactive-link"
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
