import Button from "./ui/Button";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
] as const;

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 border-b border-[color:var(--surface-border)] bg-[rgba(9,13,18,0.82)] backdrop-blur-sm"
      aria-label="Primary"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-sm md:px-8 lg:px-10">
        <a href="#top" className="font-semibold tracking-tight text-white" aria-label="Back to top">
          VN
        </a>
        <div className="hidden items-center gap-5 sm:flex">
          {navItems.map((item) => (
            <a key={item.id} className="interactive-link text-slate-400" href={item.href}>
              {item.label}
            </a>
          ))}
          <Button
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="h-10 px-3.5 text-xs"
          >
            Resume
          </Button>
        </div>
        <div className="flex items-center gap-3 sm:hidden">
          <Button href="#contact" variant="secondary" className="h-10 px-3 text-xs">
            Contact
          </Button>
          <Button href="/resume.pdf" target="_blank" rel="noreferrer" className="h-10 px-3 text-xs">
            Resume
          </Button>
        </div>
      </div>
    </nav>
  );
}
