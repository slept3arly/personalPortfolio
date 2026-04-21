import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-900/60 py-8 text-sm">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-gray-500">© {new Date().getFullYear()} {siteConfig.name}</p>
        <div className="flex items-center gap-4 text-gray-500">
          <a className="interactive-link" href="#top">
            Back to top
          </a>
          <span className="text-gray-800" aria-hidden="true">
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

