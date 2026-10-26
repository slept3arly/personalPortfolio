# AGENTS.md

## Project overview

This repository is a single-page personal portfolio built with Next.js App Router, React 19, TypeScript, and Tailwind CSS 4. The homepage presents the owner's projects and experience. Keep project descriptions accurate to the implementation and contribution described in the source.

## Common edits

- `app/page.tsx` composes the homepage and controls section order.
- `components/` contains page sections such as Hero, About, Projects, Experience, Education, Contact, and Resume.
- `components/ui/` contains shared layout, card, heading, carousel, and footer components.
- `lib/portfolioContent.ts` is the source for experience, education, certifications, and skills content.
- `lib/projectData.ts` is the source of truth for project card and detail content and display order. Update its types/content rather than duplicating project copy in components.
- `lib/site.ts` contains site identity, canonical URL fallback, and social links.
- `app/layout.tsx` contains document metadata, fonts, and the root layout.
- `app/globals.css` contains global theme variables, shared styles, and responsive/motion rules.
- `public/` contains static assets, including `resume.pdf`; reference public files by root-relative URL (for example `/resume.pdf`).
- `app/robots.ts`, `app/sitemap.ts`, and `app/manifest.ts` provide generated site metadata.

## Conventions

- Use TypeScript and the existing React component structure. Keep reusable primitives in `components/ui/` when a pattern is shared.
- Use the `@/*` path alias for imports from the repository root.
- Follow existing two-space indentation and LF line endings.
- Use Tailwind utility classes for component styling; put global tokens and genuinely shared CSS in `app/globals.css`.
- Preserve responsive behavior and keyboard accessibility. Use semantic elements, meaningful link labels, visible focus states, and reduced-motion support.
- Animation utilities use GSAP. Follow existing hooks and cleanup patterns in `lib/` and `components/ui/`; account for `prefers-reduced-motion` and avoid conflicting with CSS scroll behavior.
- Keep content consistent across project cards, project details, resume links, and metadata where applicable.
- Do not add dependencies for functionality already available in the existing stack without a clear need.

## Commands

Use Node.js `24.12.0` as specified in `.nvmrc`. Both npm and pnpm lockfiles are present; avoid changing lockfiles unnecessarily and use the package manager already used for the task.

- `npm run dev` — start the development server.
- `npm run lint` — run ESLint.
- `npm run build` — create a production build.
- `npm run start` — serve the production build.

Run the checks relevant to the change. There is no test script defined in `package.json`.
