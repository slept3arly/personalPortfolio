import Button from "./ui/Button";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { siteConfig } from "@/lib/site";

export default function Contact() {
  return (
    <Section id="contact" number="09" label="Contact">
      <Card className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-semibold text-white">Let’s build something useful</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            If you’re hiring or want to collaborate, I’m happy to chat. I reply fastest by email.
          </p>
          <div className="mt-4 space-y-1 text-sm text-gray-300">
            <p>
              <span className="text-gray-500">Email:</span>{" "}
              <a
                className="text-white underline decoration-gray-700 underline-offset-4 hover:decoration-gray-400"
                href={`mailto:${siteConfig.social.email}`}
              >
                {siteConfig.social.email}
              </a>
            </p>
            <p>
              <span className="text-gray-500">GitHub:</span>{" "}
              <a
                className="text-white underline decoration-gray-700 underline-offset-4 hover:decoration-gray-400"
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer"
              >
                github.com/slept3arly
              </a>
            </p>
            <p>
              <span className="text-gray-500">LinkedIn:</span>{" "}
              <a
                className="text-white underline decoration-gray-700 underline-offset-4 hover:decoration-gray-400"
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/vinayak-n-000a0b298
              </a>
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto">
          <Button href={`mailto:${siteConfig.social.email}`} className="w-full sm:w-auto">
            Email me
          </Button>
          <Button
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            View resume
          </Button>
        </div>
      </Card>
    </Section>
  );
}

