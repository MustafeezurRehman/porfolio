export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-bright)] mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[var(--accent)] flex items-center justify-center text-[var(--accent)] text-xs">
            M
          </div>
          <div>
            <div className="text-white">
              Mustafeez Ur Rehman | Senior Full Stack Engineer
            </div>
            <div className="text-[var(--muted)]">
              Built with{" "}
              <span className="text-[var(--accent)]">{"<3"}</span> using Next.js,
              TypeScript & Tailwind
            </div>
          </div>
        </div>
        <div className="text-[var(--muted)]">
          © {new Date().getFullYear()} Mustafeez Ur Rehman. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
