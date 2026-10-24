export type ProjectDetailSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type PortfolioProject = {
  slug: string;
  title: string;
  tagline: string;
  detailRole?: string;
  summary: string;
  detailSummary: string;
  cardTechnologies: string[];
  technologies: string[];
  details: ProjectDetailSection[];
};

/** Authoritative display order and content for both desktop grid and mobile stack. */
export const projects: PortfolioProject[] = [
  {
    slug: "vedic-wellness",
    title: "Vedic Wellness",
    tagline: "Independent Developer",
    detailRole: "Independent Developer",
    summary: "Commerce and CMS workflows spanning catalog, checkout, orders, and administration.",
    detailSummary: "Full-stack commerce and CMS platform for an Ayurvedic business, covering catalog, customer accounts, checkout, orders, and administration.",
    cardTechnologies: ["Next.js", "TypeScript", "PostgreSQL"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    details: [
      {
        title: "Architecture and Workflows",
        paragraphs: ["A layered Next.js application separates UI, security wrappers, business services, and Prisma data access. Cart and single-product checkout use transactional order workflows; a secret-protected scheduled endpoint handles order expiry."],
      },
      {
        title: "Engineering Highlights",
        bullets: [
          "Credential authentication, role-based access, validation, CSRF protections, and rate limiting",
          "Targeted cache-tag revalidation and ISR keep catalog content fresh after updates",
          "Cloudflare R2 media utilities, administrative audit logging, and Sentry observability",
        ],
      },
      {
        title: "Project Scope",
        paragraphs: ["Uses serverless-oriented patterns. A live deployment and production operation have not been verified."],
      },
    ],
  },
  {
    slug: "leadbridge",
    title: "LeadBridge",
    tagline: "Full-Stack Development",
    detailRole: undefined,
    summary: "Lead-management workflows for importing, validating, routing, and reviewing business leads.",
    detailSummary: "Internal lead-management platform for ingesting, organizing, routing, reviewing, and managing business leads.",
    cardTechnologies: ["Next.js", "TypeScript", "PostgreSQL"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    details: [
      {
        title: "Connector Runtime",
        paragraphs: ["Modular Gmail and REST connectors feed a parser pipeline that normalizes and validates external data before transactional PostgreSQL persistence. Sync history, health tracking, structured logs, and retry handling support connector operations."],
      },
      {
        title: "Engineering Highlights",
        bullets: [
          "Lease-based connector locks use generation counters and transaction fencing to reject stale writers",
          "REST ingestion validates destinations and redirects and bounds request size, duration, and pagination",
          "CSV export escapes spreadsheet formula inputs",
          "Role-based admin and sales workflows manage assignments, follow-ups, and activity history",
        ],
      },
      {
        title: "Project Scope",
        paragraphs: ["Built with Next.js, TypeScript, PostgreSQL, Prisma, and REST APIs. Role-based access controls, audit logs, reporting, and CSV exports support lead-management workflows. Active since July 2026; the resume lists deployment on Vercel, though live operation has not been independently verified."],
      },
    ],
  },
  {
    slug: "insightrush",
    title: "InsightRush",
    tagline: "Backend Contribution · Hackathon Project",
    detailRole: "Backend contribution · Hackathon project",
    summary: "FastAPI backend for CSV analytics, including approximate query results.",
    detailSummary: "FastAPI backend for analytical queries over uploaded CSV datasets, including approximate results.",
    cardTechnologies: ["Python", "FastAPI", "DuckDB"],
    technologies: ["Python", "FastAPI", "DuckDB"],
    details: [
      {
        title: "Backend Contribution",
        paragraphs: ["Built FastAPI services for CSV ingestion, schema validation, query execution, and structured responses."],
      },
      {
        title: "Key Work",
        bullets: [
          "Uses DuckDB to execute analytical queries over uploaded datasets",
          "Estimates COUNT, SUM, and AVG from dataset samples for approximate query processing",
          "API contracts return results with execution metadata for the frontend",
        ],
      },
      {
        title: "Outcome",
        paragraphs: ["Collaborated with a frontend developer to integrate the backend through shared API contracts."],
      },
    ],
  },
  {
    slug: "adaptness",
    title: "AdaptNess",
    tagline: "Windows Desktop Utility",
    detailRole: undefined,
    summary: "Windows tray utility that adjusts display brightness from screen luminance.",
    detailSummary: "Windows tray utility that adjusts display brightness from on-screen luminance using a smoothed feedback controller.",
    cardTechnologies: ["C#", ".NET 10", "WMI"],
    technologies: ["C#", ".NET 10", "WMI", "Win32 GDI"],
    details: [
      {
        title: "Controller Design",
        paragraphs: ["Average screen luminance maps to an inverse brightness target. Exponential smoothing, a deadband, bounded steps, and rate limiting help reduce oscillation; manual changes are detected despite delayed or rounded WMI readbacks."],
      },
      {
        title: "Engineering Highlights",
        bullets: [
          "Samples the primary display into a 32×18 BGRA buffer using Win32 GDI with resource cleanup",
          "Uses Rec. 709 perceived luminance and WMI brightness control",
          "Includes fail-safe handling for capture and brightness-control failures",
          "Provides framework-free in-process self-tests for controller logic",
        ],
      },
      {
        title: "Project Status",
        paragraphs: ["Early-stage source project (v0.1.0). Brightness control depends on compatible WMI monitor drivers; external-display behavior is not established. Runtime behavior was not checked during this review."],
      },
    ],
  },
  {
    slug: "semanticache",
    title: "semantiCache",
    tagline: "Semantic Caching Prototype",
    detailRole: undefined,
    summary: "Research prototype combining exact-match and semantic caching with model fallback.",
    detailSummary: "Research prototype with a two-tier SQLite exact-match and ChromaDB semantic cache, followed by Ollama fallback.",
    cardTechnologies: ["Python", "SQLite", "ChromaDB"],
    technologies: ["Python", "FastAPI", "SQLite", "ChromaDB"],
    details: [
      {
        title: "Two-Tier Lookup",
        bullets: [
          "Exact SQLite lookup is scoped by user, session, conversation, query, and category, with TTL expiry",
          "Semantic lookup embeds prompts with all-MiniLM-L6-v2 and applies a ChromaDB distance threshold",
          "API responses identify exact-cache, semantic-cache, or Ollama-generated results",
          "Cache misses generate asynchronously through Ollama and populate both cache tiers",
        ],
      },
      {
        title: "Prototype Notes",
        paragraphs: ["Semantic search currently queries the collection without the exact cache’s user, session, conversation, or category filters. No benchmarks or successful runtime checks were verified; this is a research prototype, not a production or federated caching system."],
      },
    ],
  },
  {
    slug: "local-ai",
    title: "Local AI",
    tagline: "Local AI Desktop Client",
    detailRole: undefined,
    summary: "Desktop chat client for a local Ollama service, built with Tauri and React.",
    detailSummary: "Tauri and React desktop chat client that connects to a locally running Ollama service.",
    cardTechnologies: ["React", "TypeScript", "Tauri 2"],
    technologies: ["React", "TypeScript", "Tauri 2", "Ollama HTTP API"],
    details: [
      {
        title: "Application Features",
        bullets: [
          "TypeScript service communicates with Ollama /api/chat and /api/tags endpoints",
          "Supports creating, selecting, deleting, and automatically titling conversations",
          "Groups conversations by recency; conversation state is currently in memory only",
          "Includes request cancellation, timed Ollama availability checks, and error handling",
        ],
      },
      {
        title: "Project Status",
        paragraphs: ["An early-stage local-LLM desktop prototype. Inference runs through the configured Ollama service; network behavior depends on that endpoint and deployment. The application and packaging were not built or run during review."],
      },
      {
        title: "Implementation Notes",
        paragraphs: ["Ollama communication is separated into a service module, while Tauri provides the desktop shell and Rust release-profile configuration."],
      },
    ],
  },
  {
    slug: "lumi",
    title: "Lumi",
    tagline: "Backend Contribution",
    detailRole: "Backend contribution",
    summary: "Wellness dashboard for habits, goals, tasks, health logs, and routine analysis.",
    detailSummary: "Flask and SQLite wellness dashboard for habits, goals, tasks, health logs, and optional routine analysis.",
    cardTechnologies: ["Python", "Flask", "SQLite"],
    technologies: ["Python", "Flask", "SQLite", "Google Gemini API"],
    details: [
      {
        title: "Problem",
        paragraphs: ["Wellness and productivity information can be scattered across separate trackers, making routines and progress harder to review together."],
      },
      {
        title: "Backend Contribution",
        bullets: [
          "Backend development for a Flask application organized around routes and a domain service layer",
          "SQLite persistence for habits, goals, tasks, wellness logs, and community posts",
          "Centralized input validation, session authentication, password hashing, and CSRF checks",
          "Optional Gemini routine analysis with ordered model attempts and deterministic local fallback",
        ],
      },
      {
        title: "Application",
        paragraphs: ["The dashboard brings habit completion, goals, tasks, wellness logs, and community updates together. It remains a prototype; deployment and production operation have not been verified."],
      },
    ],
  },
  {
    slug: "dfa-visualizer",
    title: "DFA-Visualizer",
    tagline: "Frontend Contribution",
    detailRole: "Frontend contribution",
    summary: "Interactive visualizer for regular-expression compilation, DFA graphs, and string traces.",
    detailSummary: "Interactive React and TypeScript tool for exploring regular-expression compilation through syntax trees, tables, DFA graphs, and string traces.",
    cardTechnologies: ["React", "TypeScript", "Vite"],
    technologies: ["React", "TypeScript", "Vite"],
    details: [
      {
        title: "Interactive Learning",
        paragraphs: ["Stage navigation connects compiler results to explanatory tables and graph views, helping learners inspect the steps from an expression to a minimized DFA and trace accepted or rejected strings."],
      },
      {
        title: "Frontend Contribution",
        bullets: [
          "Frontend development for the React interface and compiler-stage presentation",
          "Focus on interactive visualization, component integration, and clarity of algorithm results",
        ],
      },
      {
        title: "Project Notes",
        paragraphs: ["Supports literals, alternation, concatenation, Kleene star, and grouping. The UI and visualization phases are still in development; tests were not run during review, and no deployment configuration was found."],
      },
    ],
  },
  {
    slug: "process-creation-visualizer",
    title: "Process Creation Visualizer",
    tagline: "Frontend and Backend Contribution",
    detailRole: "Frontend and backend contribution",
    summary: "Process lifecycle and CPU-scheduling simulator with synchronized web views.",
    detailSummary: "Operating-systems simulator for process states, parent-child relationships, and CPU scheduling, with synchronized web visualizations.",
    cardTechnologies: ["Next.js", "Python", "FastAPI"],
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI"],
    details: [
      {
        title: "Full-Stack Development",
        bullets: [
          "Implemented a FastAPI REST backend with shared controller, process and state managers, and event logging",
          "Built interactive React views for process states, hierarchies, PCBs, event logs, and scheduling",
          "Validates lifecycle transitions and reports rejected actions with currently valid operations",
          "Tkinter desktop UI shares the controller and simulation logic",
        ],
      },
      {
        title: "Scheduling and Playback",
        paragraphs: ["FCFS, non-preemptive SJF, non-preemptive Priority, and Round Robin produce Gantt timelines and waiting, turnaround, and response-time metrics. Playback events derived from immutable schedule results stay synchronized with lifecycle graph animations."],
      },
      {
        title: "Project Scope",
        paragraphs: ["This is an educational simulation; it does not control real operating-system processes. The portfolio update is based on source inspection; tests were not run and deployments were not verified."],
      },
    ],
  },
];
