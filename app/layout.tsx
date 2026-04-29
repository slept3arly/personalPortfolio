import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Vinayak Nautiyal | Full Stack & Systems Developer",
    template: `%s | Vinayak Nautiyal`,
  },

  description:
    "Full-stack developer focused on backend systems, data pipelines, and scalable web applications. Experience building production-oriented architectures and analytical systems.",

  applicationName: "Vinayak Nautiyal Portfolio",

  authors: [{ name: "Vinayak Nautiyal" }],
  creator: "Vinayak Nautiyal",

  keywords: [
    "Full Stack Developer",
    "Backend Developer",
    "Data Systems",
    "Data Pipelines",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "Flask",
    "Portfolio",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: "Vinayak Nautiyal | Full Stack & Systems Developer",
    description:
      "Full-stack developer focused on backend systems, data pipelines, and scalable web applications.",
    siteName: "Vinayak Nautiyal Portfolio",
    locale: siteConfig.locale,
  },

  twitter: {
    card: "summary",
    title: "Vinayak Nautiyal | Full Stack & Systems Developer",
    description:
      "Backend systems, data pipelines, and full-stack applications.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`}>
      <body className="min-h-dvh overflow-x-hidden bg-[var(--background)] text-gray-200 antialiased selection:bg-white/10 selection:text-white">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-black"
        >
          Skip to content
        </a>

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}