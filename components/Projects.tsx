"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import { observeOnce } from "@/lib/observeOnce";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLParagraphElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const root = sectionRef.current;
    const number = numberRef.current;
    const title = titleRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => Boolean(card));

    if (!root || !number || !title || cards.length === 0) {
      return;
    }

    let stopReveal: (() => void) | undefined;

    const ctx = gsap.context(() => {
      gsap.set([number, title, ...cards], {
        opacity: 0,
        y: 16,
        scale: 0.985,
      });

      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.82, ease: "power2.out" },
      });

      tl.to(number, { opacity: 1, y: 0, scale: 1, duration: 0.5 }, 0);
      tl.to(title, { opacity: 1, y: 0, scale: 1, duration: 0.72 }, 0.06);
      tl.to(cards, { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.82 }, 0.18);

      stopReveal = observeOnce(root, {
        threshold: 0.2,
        onEnter: () => tl.play(0),
      });
    }, root);

    return () => {
      stopReveal?.();
      ctx.revert();
    };
  }, []);

  return (
    <Section id="projects" ariaLabel="Projects">
      <div ref={sectionRef} className="space-y-8 md:space-y-10">
        <header className="flex items-end gap-4">
          <div className="space-y-2.5">
            <p
              ref={numberRef}
              className="text-xs font-semibold tracking-[0.18em] text-slate-500"
              style={{ opacity: 0, transform: "translateY(16px) scale(0.985)" }}
            >
              02
            </p>
            <h2
              ref={titleRef}
              className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
              style={{ opacity: 0, transform: "translateY(16px) scale(0.985)" }}
            >
              Projects
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-[color:var(--surface-border)] sm:block" />
        </header>

        <div className="space-y-5 md:space-y-6">
          <div
            ref={(node) => {
              cardRefs.current[0] = node;
            }}
            style={{ opacity: 0, transform: "translateY(16px) scale(0.985)" }}
          >
            <Card>
              <p className="text-lg font-semibold text-white">Vedic Wellness</p>
              <p className="text-sm text-gray-400">Full-Stack E-commerce Platform</p>

              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-400">Problem</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Building a secure, structured system for managing products, users, and transactions.
                  </p>

                  <p className="mt-4 text-sm font-medium text-gray-400">Key Work</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Designed full-stack architecture using Next.js and PostgreSQL</li>
                    <li>• Implemented authentication, RBAC, OTP verification, and rate limiting</li>
                    <li>• Built product catalog, cart, and order workflows</li>
                    <li>• Structured backend with Prisma and clean API patterns</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-400">Outcome</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Delivered a production-style system with secure flows and scalable architecture.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Next.js</Badge>
                <Badge>TypeScript</Badge>
                <Badge>PostgreSQL</Badge>
                <Badge>Prisma</Badge>
                <Badge>Auth / RBAC</Badge>
              </div>
            </Card>
          </div>

          <div
            ref={(node) => {
              cardRefs.current[1] = node;
            }}
            style={{ opacity: 0, transform: "translateY(16px) scale(0.985)" }}
          >
            <Card>
              <p className="text-lg font-semibold text-white">InsightRush</p>
              <p className="text-sm text-gray-400">Analytical Query Processing System</p>

              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-400">Problem</p>
                  <p className="mt-1 text-sm text-gray-300">Efficiently querying and analyzing large datasets.</p>

                  <p className="mt-4 text-sm font-medium text-gray-400">Key Work</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Built query engine for large CSV datasets</li>
                    <li>• Implemented filtering, aggregation, and indexing logic</li>
                    <li>• Designed data ingestion and processing pipeline</li>
                    <li>• Optimized memory usage for large-scale data handling</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-400">Outcome</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Enabled efficient analysis of large datasets with structured processing pipelines.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Python</Badge>
                <Badge>Data Processing</Badge>
                <Badge>Query Engine</Badge>
              </div>
            </Card>
          </div>

          <div
            ref={(node) => {
              cardRefs.current[2] = node;
            }}
            style={{ opacity: 0, transform: "translateY(16px) scale(0.985)" }}
          >
            <Card>
              <p className="text-lg font-semibold text-white">Hybrid CNN-PCA Face Recognition</p>
              <p className="text-sm text-gray-400">Machine Learning System</p>

              <div className="mt-4 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-400">Key Work</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Used MobileNetV2 for feature extraction</li>
                    <li>• Applied PCA for dimensionality reduction</li>
                    <li>• Trained SVM classifier on embeddings</li>
                    <li>• Built preprocessing and evaluation pipeline</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-400">Outcome</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Achieved ~92% recognition accuracy with optimized computation.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Python</Badge>
                <Badge>TensorFlow</Badge>
                <Badge>OpenCV</Badge>
                <Badge>PCA</Badge>
                <Badge>SVM</Badge>
              </div>
            </Card>
          </div>

          <div
            ref={(node) => {
              cardRefs.current[3] = node;
            }}
            style={{ opacity: 0, transform: "translateY(16px) scale(0.985)" }}
          >
            <Card>
              <p className="text-base font-semibold text-white">PayParse</p>
              <p className="text-sm text-gray-400">Transaction Parsing & Data Enrichment Pipeline</p>

              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-400">Problem</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Google Pay exports are raw HTML with no structured categorization or usable analytics format.
                  </p>

                  <p className="mt-3 text-sm font-medium text-gray-400">Key Work</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Built HTML parsing pipeline using BeautifulSoup and regex extraction</li>
                    <li>• Implemented data cleaning and feature engineering using Pandas</li>
                    <li>• Designed merchant enrichment using Google Places API with fuzzy matching</li>
                    <li>• Added caching layer to reduce repeated API calls and improve performance</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-400">Outcome</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Converted unstructured transaction logs into structured datasets with categorized spending and
                    location context.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Python</Badge>
                <Badge>Pandas</Badge>
                <Badge>BeautifulSoup</Badge>
                <Badge>FastAPI</Badge>
                <Badge>Data Pipeline</Badge>
              </div>
            </Card>
          </div>

          <div
            ref={(node) => {
              cardRefs.current[4] = node;
            }}
            style={{ opacity: 0, transform: "translateY(16px) scale(0.985)" }}
          >
            <Card>
              <p className="text-base font-semibold text-white">Lumi</p>
              <p className="text-sm text-gray-400">Health & Productivity Tracking System</p>

              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-400">Problem</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Existing trackers lack unified data tracking and meaningful feedback across habits, goals, and
                    wellness metrics.
                  </p>

                  <p className="mt-3 text-sm font-medium text-gray-400">Key Work</p>
                  <ul className="mt-1 space-y-1 text-sm text-gray-300">
                    <li>• Built full-stack Flask application with SQLite-backed data models</li>
                    <li>• Implemented EMA-based habit tracking for consistency scoring</li>
                    <li>• Developed server-side chart generation using Matplotlib (Base64 rendering)</li>
                    <li>• Integrated AI-based routine analysis with fallback logic for reliability</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-400">Outcome</p>
                  <p className="mt-1 text-sm text-gray-300">
                    Delivered a self-contained analytics dashboard combining quantitative tracking with AI-assisted
                    feedback.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Python</Badge>
                <Badge>Flask</Badge>
                <Badge>SQLite</Badge>
                <Badge>Matplotlib</Badge>
                <Badge>LLM Integration</Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  );
}
