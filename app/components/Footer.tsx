export default function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-900/60 py-8 text-sm">
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-gray-500">© {new Date().getFullYear()} Vinayak Nautiyal</p>
        <div className="flex items-center gap-4 text-gray-500">
          <a className="transition hover:text-gray-300" href="#top">
            Back to top
          </a>
          <span className="text-gray-800">•</span>
          <a
            className="transition hover:text-gray-300"
            href="https://github.com/slept3arly"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition hover:text-gray-300"
            href="https://www.linkedin.com/in/vinayak-n-000a0b298/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}