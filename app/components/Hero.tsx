"use client";

import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const codeSnippet = `// Welcome to my workspace
import { Developer } from './universe';

const Portfolio = () => {
  return (
    <Developer
      name="Mustafeez Ur Rehman"
      role="Senior Full Stack Engineer"
      passion="Engineering Beyond Boundaries"
    />
  );
};`;

const modules = [
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "NODE.JS",
  "ANGULAR",
  "PYTHON",
];

export default function Hero() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(codeSnippet.slice(0, i));
      if (i >= codeSnippet.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-20 min-h-[calc(100vh-64px)]"
    >
      <div
        aria-hidden
        className="hidden md:block absolute bottom-8 left-6 text-[var(--muted)] opacity-25 font-mono text-sm pointer-events-none select-none"
      >
        while(alive) {`{ code() }`}
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 border border-[var(--border-accent)] bg-[var(--bg-2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] status-pulse" />
            <span className="text-[var(--accent)]">SYSTEM.KERNEL</span>
            <span className="text-[var(--dim)]">::</span>
            <span className="text-[var(--accent)]">v9.0.1 ONLINE</span>
          </div>

          <div>
            <h1 className="font-bold tracking-tight leading-[0.95]">
              <span className="block text-white text-5xl sm:text-6xl">
                Hello, I&apos;m
              </span>
              <span className="block font-mono font-bold tracking-tight text-6xl sm:text-7xl lg:text-[6rem] mt-2 name-gradient">
                {[..."Mustafeez"].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block letter-rise"
                    style={{ animationDelay: `${i * 35}ms` }}
                  >
                    {c}
                  </span>
                ))}
              </span>
              <span className="block font-mono font-bold tracking-tight text-6xl sm:text-7xl lg:text-[6rem] name-gradient">
                {[..."Ur Rehman"].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block letter-rise"
                    style={{
                      animationDelay: `${(i + 9) * 35}ms`,
                      whiteSpace: c === " " ? "pre" : undefined,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-lg sm:text-xl">
            <span className="text-[var(--accent)] font-mono text-glow">
              <span className="text-[var(--cyan)]">{"<"}</span>
              Architect
              <span className="text-[var(--cyan)]"> {"/>"}</span>
            </span>
            <span className="text-white">Engineering Beyond Boundaries.</span>
          </div>

          <p className="text-[var(--muted)] text-base leading-relaxed max-w-lg">
            Specializing in government-grade platforms, microservices, and
            AI-driven automation. 9+ years shipping systems used by millions
            across the UAE.
          </p>

          <div className="flex flex-wrap sm:flex-nowrap items-stretch gap-3">
            <Magnetic className="w-full sm:w-auto">
            <a
              href="#about"
              className="group relative flex items-stretch overflow-hidden h-full border border-[var(--accent)] bg-[var(--bg-2)] hover:bg-[var(--bg-3)] transition-colors w-full sm:w-[360px]"
            >
              <div className="flex items-center justify-center w-12 sm:w-14 bg-[var(--accent)]/15 border-r border-[var(--accent)] text-[var(--accent)] text-xl">
                {">_"}
              </div>
              <div className="flex-1 px-4 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white font-bold text-sm">
                    Initialize OS
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-[var(--accent)]"
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </div>
                <div className="mt-1 h-1 bg-[var(--bg-3)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--blue)] transition-all"
                    style={{
                      width: `${Math.round(
                        (typed.length / codeSnippet.length) * 100,
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-[var(--muted)] font-mono">
                  <span>{"> sudo boot_gui"}</span>
                  <span>
                    Loading
                    <span className="dot-1">.</span>
                    <span className="dot-2">.</span>
                    <span className="dot-3">.</span>
                  </span>
                </div>
              </div>
            </a>
            </Magnetic>

            <Magnetic>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-stretch h-full border border-[var(--border-bright)] bg-[var(--bg-2)] hover:border-[var(--accent)] transition-colors"
            >
              <div className="flex items-center justify-center w-12 sm:w-14 border-r border-[var(--border-bright)] text-[var(--muted)] group-hover:text-[var(--accent)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 007.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.74 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.04 11.04 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.7.41.35.78 1.05.78 2.12v3.14c0 .31.21.66.8.55A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </div>
              <div className="px-4 py-2.5 flex flex-col justify-center">
                <span className="text-[10px] text-[var(--muted)]">
                  Check out
                </span>
                <span className="text-white font-bold text-sm">GitHub</span>
              </div>
            </a>
            </Magnetic>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <span className="text-[10px] text-[var(--muted)] tracking-[0.2em] font-mono">
              LOADED_MODULES:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {modules.map((m) => (
                <span
                  key={m}
                  className="text-[10px] px-2 py-0.5 border border-[var(--border-accent)] text-[var(--accent)] font-mono tracking-wider"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-32" data-parallax="0.06" data-tilt="true">
          <div className="panel rounded-md shadow-[0_0_60px_rgba(254,110,0,0.08)]">
            <div className="panel-header rounded-t-md">
              <span className="tl-dot bg-[#fb2c36]" />
              <span className="tl-dot bg-[#ffcc00]" />
              <span className="tl-dot bg-[#00c758]" />
              <span className="ml-3 text-[11px] text-[var(--muted)] flex items-center gap-2">
                <span className="text-[var(--accent)]">●</span>
                portfolio.tsx
              </span>
            </div>
            <pre className="p-5 text-[13px] leading-7 overflow-x-auto font-mono">
              <code>
                {codeSnippet.split("\n").map((fullLine, i) => {
                  const startOffset = codeSnippet
                    .split("\n")
                    .slice(0, i)
                    .reduce((a, l) => a + l.length + 1, 0);
                  const visible =
                    typed.length <= startOffset
                      ? ""
                      : typed.slice(startOffset, startOffset + fullLine.length);
                  const isCurrent =
                    typed.length > startOffset &&
                    typed.length <= startOffset + fullLine.length + 1;
                  return (
                    <div key={i} className="flex gap-4">
                      <span className="text-[var(--dim)] select-none w-5 text-right shrink-0">
                        {i + 1}
                      </span>
                      <span>
                        {highlight(visible)}
                        {isCurrent && (
                          <span className="inline-block w-2 h-4 bg-[var(--accent)] align-middle ml-0.5 cursor-blink" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>

        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center text-[var(--muted)] hover:text-[var(--accent)] transition-colors scroll-bounce"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>

      <div
        aria-hidden
        className="hidden md:flex fixed bottom-6 right-6 z-30 items-center gap-2 scroll-avatar"
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-full border border-[var(--accent)] bg-[var(--bg-2)] overflow-hidden flex items-center justify-center text-[var(--accent)] font-bold">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="50" cy="40" r="14" />
              <path d="M22 86c2-14 14-24 28-24s26 10 28 24" />
            </svg>
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[var(--green)] border-2 border-[var(--background)] status-pulse" />
        </div>
      </div>

      <style jsx>{`
        .name-gradient {
          background: linear-gradient(
            90deg,
            #fe6e00 0%,
            #b07090 55%,
            #3080ff 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          filter: drop-shadow(0 0 30px rgba(254, 110, 0, 0.18));
        }
        .scroll-bounce {
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, 6px); }
        }
      `}</style>
    </section>
  );
}

function highlight(line: string) {
  if (line.trim().startsWith("//")) {
    return <span className="text-[#00c758]">{line}</span>;
  }
  const out: React.ReactNode[] = [];
  const re =
    /("[^"]*"|'[^']*')|\b(import|export|from|const|return|new|true|false|null)\b|(<\/?[A-Za-z][A-Za-z0-9]*|\/?>)|\b([A-Z][a-zA-Z]+)\b|(=>)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(line)) !== null) {
    if (m.index > last)
      out.push(
        <span key={key++} className="text-[#e6edf3]">
          {line.slice(last, m.index)}
        </span>,
      );
    if (m[1])
      out.push(
        <span key={key++} className="text-[#00c758]">
          {m[1]}
        </span>,
      );
    else if (m[2])
      out.push(
        <span key={key++} className="text-[#ff79c6]">
          {m[2]}
        </span>,
      );
    else if (m[3])
      out.push(
        <span key={key++} className="text-[var(--cyan)]">
          {m[3]}
        </span>,
      );
    else if (m[4])
      out.push(
        <span key={key++} className="text-[var(--accent)]">
          {m[4]}
        </span>,
      );
    else if (m[5])
      out.push(
        <span key={key++} className="text-[#ff79c6]">
          {m[5]}
        </span>,
      );
    last = re.lastIndex;
  }
  if (last < line.length)
    out.push(
      <span key={key++} className="text-[#e6edf3]">
        {line.slice(last)}
      </span>,
    );
  return out;
}
