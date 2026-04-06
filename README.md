## Personal Portfolio (Next.js)

Recruiter-friendly personal portfolio built with Next.js (App Router), React, TypeScript, and Tailwind CSS.

## Tech stack

- **Framework**: Next.js (App Router)
- **UI**: React + Tailwind CSS
- **Language**: TypeScript
- **Deploy**: Vercel

## Running locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Customization checklist

- **Site URL (SEO)**: update `lib/site.ts` (`siteConfig.url`) before deploying.
- **Env**: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.
- **Resume**: replace `public/resume.pdf`.
- **Content**: update project/experience placeholders in `components/`.

