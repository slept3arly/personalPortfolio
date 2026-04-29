import Badge from "./ui/Badge";
import Card from "./ui/Card";
import Section from "./ui/Section";
import AnimatedHeading from "./ui/AnimatedHeading";

export default function Projects() {
  return (
    <Section id="projects" number="02" label="Projects">
      <div className="space-y-6">

        {/* ---------------- TOP PROJECTS ---------------- */}

        {/* VEDIC WELLNESS */}
        <Card>
          <AnimatedHeading className="text-lg font-semibold text-white">
            Vedic Wellness
          </AnimatedHeading>
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

        {/* INSIGHTRUSH */}
        <Card>
          <AnimatedHeading className="text-lg font-semibold text-white">
            InsightRush
          </AnimatedHeading>
          <p className="text-sm text-gray-400">Analytical Query Processing System</p>

          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-gray-400">Problem</p>
              <p className="mt-1 text-sm text-gray-300">
                Efficiently querying and analyzing large datasets.
              </p>

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

        {/* FACE RECOGNITION */}
        <Card>
          <AnimatedHeading className="text-lg font-semibold text-white">
            Hybrid CNN-PCA Face Recognition
          </AnimatedHeading>
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

        {/* ---------------- SECONDARY PROJECTS ---------------- */}

        {/* PAYPARSE */}
        <Card>
  <AnimatedHeading className="text-base font-semibold text-white">
    PayParse
  </AnimatedHeading>
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
        Converted unstructured transaction logs into structured datasets with categorized spending and location context.
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

        {/* LUMI */}
        <Card>
  <AnimatedHeading className="text-base font-semibold text-white">
    Lumi
  </AnimatedHeading>
  <p className="text-sm text-gray-400">Health & Productivity Tracking System</p>

  <div className="mt-3 grid gap-4 sm:grid-cols-2">
    <div>
      <p className="text-sm font-medium text-gray-400">Problem</p>
      <p className="mt-1 text-sm text-gray-300">
        Existing trackers lack unified data tracking and meaningful feedback across habits, goals, and wellness metrics.
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
        Delivered a self-contained analytics dashboard combining quantitative tracking with AI-assisted feedback.
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
    </Section>
  );
}