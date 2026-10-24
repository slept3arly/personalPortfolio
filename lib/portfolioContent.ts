export const experience = [
  {
    role: "Independent Developer",
    company: "Vedic Wellness",
    location: "Remote",
    start: "January 2026",
    end: "Present",
    tags: ["Next.js", "PostgreSQL", "Prisma", "Authentication", "RBAC"],
    bullets: [
      "Developing full-stack customer, catalog, cart, checkout, order, and administrative workflows for an Ayurvedic business.",
      "Implemented data and authorization models with session-based authentication and role-based access control.",
      "Built transactional order handling, server-side validation, CAPTCHA protection, and signup and order rate limits.",
      "Added protected file uploads and targeted cache revalidation for catalog content.",
    ],
  },
  {
    role: "AWS Cloud Practitioner Internship Program",
    company: "Ethnus",
    location: "",
    start: "May 2026",
    end: "July 2026 · Completed",
    tags: ["AWS", "Amazon Cognito", "API Gateway", "Lambda", "DynamoDB", "EC2"],
    bullets: [
      "Completed a cloud computing program covering cloud architecture, core AWS services, security, pricing, and operational fundamentals; final score: 98/100 (A).",
      "Collaborated on a team capstone: a cloud-based voting application using Cognito-authenticated REST workflows with API Gateway, Lambda, DynamoDB, and EC2.",
    ],
  },
] as const;

export const education = {
  program: "B.Tech in Computer Science and Engineering",
  school: "Vellore Institute of Technology (VIT), Vellore",
  start: "2024",
  end: "Present",
  highlights: [
    "CGPA: 8.92 / 10.",
    "Core coursework: DSA, OOP, Computer Networks",
  ],
  tags: ["DSA", "OOP", "Computer Networks"],
} as const;

export const certifications = [
  {
    year: "2026",
    title: "AWS Certified Cloud Practitioner (CLF-C02)",
    subtitle: "Amazon Web Services (AWS)",
  },
  {
    year: "2026",
    title: "Docker Foundations Professional Certificate",
    subtitle: "LinkedIn Learning",
  },
] as const;

export const skills = [
  {
    title: "Languages",
    description: "Languages used across coursework and project development.",
    items: ["Python", "Java", "C++", "TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "Web & Backend",
    description: "Web application development, APIs, and access-control workflows.",
    items: ["React", "Next.js", "FastAPI", "REST APIs", "Prisma ORM", "Authentication", "RBAC"],
  },
  {
    title: "Data & Systems",
    description: "Database platforms and core programming and operating-systems foundations.",
    items: ["PostgreSQL", "DuckDB", "SQLite", "DSA", "OOP", "DBMS", "Operating Systems"],
  },
  {
    title: "Cloud, Tools & Networking",
    description: "Cloud services, developer tools, and networking fundamentals.",
    items: ["AWS", "Docker", "Git", "GitHub", "Vercel", "Computer Networks"],
  },
] as const;
