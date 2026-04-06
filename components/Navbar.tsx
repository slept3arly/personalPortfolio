export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-gray-900/60 bg-black/70 backdrop-blur"
      aria-label="Primary"
    >
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4 text-sm">
        <a href="#top" className="font-semibold text-white" aria-label="Back to top">
          VN
        </a>
        <div className="hidden items-center gap-5 text-gray-400 sm:flex">
          <a className="transition hover:text-white" href="#about">
            About
          </a>
          <a className="transition hover:text-white" href="#projects">
            Projects
          </a>
          <a className="transition hover:text-white" href="#experience">
            Experience
          </a>
          <a className="transition hover:text-white" href="#contact">
            Contact
          </a>
          <a
            className="rounded-md border border-gray-800 px-3 py-1.5 text-gray-200 transition hover:border-gray-600 hover:bg-white/5"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>
        <div className="flex items-center gap-3 sm:hidden">
          <a
            className="rounded-md border border-gray-800 px-3 py-1.5 text-gray-200 transition hover:border-gray-600 hover:bg-white/5"
            href="#contact"
          >
            Contact
          </a>
          <a
            className="rounded-md bg-white px-3 py-1.5 font-medium text-black transition hover:bg-gray-200"
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

