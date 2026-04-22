import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { siteConfig } from "@/lib/site";

export default function Contact() {
  return (
    <Section id="contact" number="09" label="Contact">
      <Card>
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
          <div className="space-y-8">
            <header className="max-w-2xl space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-white">Let’s build something useful</h3>
              <p className="max-w-xl text-sm leading-7 text-slate-300">
                If you&apos;re hiring or planning a product collaboration, I&apos;d be glad to connect. I typically
                reply fastest by email.
              </p>
            </header>

            <ul className="space-y-5 text-sm text-slate-200">
              <li className="grid gap-1">
                <span className="text-xs font-semibold tracking-[0.14em] text-slate-500">EMAIL</span>
                <a className="interactive-link w-fit" href={`mailto:${siteConfig.social.email}`}>
                  {siteConfig.social.email}
                </a>
              </li>
              <li className="grid gap-1">
                <span className="text-xs font-semibold tracking-[0.14em] text-slate-500">GITHUB</span>
                <a
                  className="interactive-link w-fit"
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/slept3arly
                </a>
              </li>
              <li className="grid gap-1">
                <span className="text-xs font-semibold tracking-[0.14em] text-slate-500">LINKEDIN</span>
                <a
                  className="interactive-link w-fit"
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/vinayak-n-000a0b298
                </a>
              </li>
            </ul>
          </div>

          <div className="grid gap-3 md:justify-end">
            <Button href={`mailto:${siteConfig.social.email}`} className="w-full md:w-52">
              Email me
            </Button>
            <Button
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="w-full md:w-52"
            >
              View resume
            </Button>
            <Button
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              className="w-full md:w-52"
            >
              LinkedIn
            </Button>
          </div>
        </div>
      </Card>
    </Section>
  );
}
