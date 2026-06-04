import { Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppStoreBadge } from "./AppStoreBadge";

/* ── Example scan data ─────────────────────────────────────────────────── */
const EXAMPLES = [
  {
    domain: "github.com",
    grade: "A",
    score: 91,
    label: "Excellent posture",
    gradeColor: "#22c55e",
    glowColor: "rgba(34,197,94,0.22)",
    borderColor: "rgba(34,197,94,0.40)",
    shadowRing: "0 0 0 6px rgba(34,197,94,0.07), 0 0 40px rgba(34,197,94,0.22)",
    labelColor: "#4ade80",
    labelBg: "rgba(34,197,94,0.10)",
    labelBorder: "rgba(34,197,94,0.25)",
    critical: 0,
    warning: 1,
    signals: 18,
    chips: [
      { label: "HSTS preloaded", color: "emerald" },
      { label: "DNSSEC enabled", color: "emerald" },
      { label: "Strong CSP", color: "emerald" },
    ],
  },
  {
    domain: "portswigger.net",
    grade: "B",
    score: 74,
    label: "Good posture",
    gradeColor: "#3b82f6",
    glowColor: "rgba(59,130,246,0.25)",
    borderColor: "rgba(59,130,246,0.45)",
    shadowRing: "0 0 0 6px rgba(59,130,246,0.08), 0 0 40px rgba(59,130,246,0.25)",
    labelColor: "#93c5fd",
    labelBg: "rgba(59,130,246,0.10)",
    labelBorder: "rgba(59,130,246,0.25)",
    critical: 0,
    warning: 3,
    signals: 14,
    chips: [
      { label: "COOP missing", color: "amber" },
      { label: "DNSSEC off", color: "amber" },
      { label: "security.txt", color: "zinc" },
    ],
  },
  {
    domain: "stackoverflow.com",
    grade: "C",
    score: 55,
    label: "Mixed posture",
    gradeColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.22)",
    borderColor: "rgba(245,158,11,0.40)",
    shadowRing: "0 0 0 6px rgba(245,158,11,0.06), 0 0 40px rgba(245,158,11,0.20)",
    labelColor: "#fcd34d",
    labelBg: "rgba(245,158,11,0.10)",
    labelBorder: "rgba(245,158,11,0.25)",
    critical: 0,
    warning: 5,
    signals: 11,
    chips: [
      { label: "No DMARC policy", color: "amber" },
      { label: "Server exposed", color: "amber" },
      { label: "No CAA records", color: "zinc" },
    ],
  },
  {
    domain: "httpbin.org",
    grade: "D",
    score: 31,
    label: "Needs attention",
    gradeColor: "#f97316",
    glowColor: "rgba(249,115,22,0.22)",
    borderColor: "rgba(249,115,22,0.40)",
    shadowRing: "0 0 0 6px rgba(249,115,22,0.06), 0 0 40px rgba(249,115,22,0.20)",
    labelColor: "#fb923c",
    labelBg: "rgba(249,115,22,0.10)",
    labelBorder: "rgba(249,115,22,0.25)",
    critical: 2,
    warning: 4,
    signals: 7,
    chips: [
      { label: "No HSTS", color: "red" },
      { label: "No CSP", color: "red" },
      { label: "Open CORS", color: "amber" },
    ],
  },
];

const RING_R = 52;
const RING_SIZE = 120;
const RING_CIRC = parseFloat((2 * Math.PI * RING_R).toFixed(2));

function chipStyle(color: string) {
  if (color === "emerald")
    return { color: "#4ade80", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" };
  if (color === "amber")
    return { color: "#fcd34d", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" };
  if (color === "red")
    return { color: "#f87171", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)" };
  return { color: "#94a3b8", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" };
}

export function Hero() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const rotate = () => {
      setVisible(false);
      timerRef.current = setTimeout(() => {
        setIdx((i) => (i + 1) % EXAMPLES.length);
        setVisible(true);
      }, 380);
    };
    const interval = setInterval(rotate, 4800);
    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const ex = EXAMPLES[idx];
  const offset = parseFloat((RING_CIRC * (1 - ex.score / 100)).toFixed(2));

  function handleScan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem("url") as HTMLInputElement).value.trim();
    if (!input) return;
    const target = input.startsWith("http") ? input : `https://${input}`;
    window.open(`https://app.securl.online?target=${encodeURIComponent(target)}`, "_blank");
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-32 pt-28 text-center">
      {/* Eyebrow pill */}
      <div
        className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.22em]"
        style={{
          background: "rgba(181,106,44,0.12)",
          border: "1px solid rgba(181,106,44,0.25)",
          color: "#f0d5bc",
          backdropFilter: "blur(12px)",
        }}
      >
        <Sparkles className="h-3.5 w-3.5 text-[#d89a63]" />
        Posture intelligence
      </div>

      {/* Headline */}
      <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5rem]">
        Not a list of headers.{" "}
        <br className="hidden sm:block" />
        <span className="text-gradient-vivid">A verdict.</span>
      </h1>

      {/* Sub */}
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
        Paste a URL. Get a graded read of your site's entire external security posture — headers,
        DNS trust, TLS, third-party surface, and public disclosure signals, all{" "}
        <span className="font-semibold text-slate-200">ranked by what to fix first.</span>
      </p>

      {/* URL scan input */}
      <form onSubmit={handleScan} className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
        <div
          className="relative flex flex-1 items-center overflow-hidden rounded-2xl transition-all duration-200 focus-within:ring-1 focus-within:ring-[#b56a2c]/50"
          style={{
            background: "rgba(2,6,23,0.60)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(20px)",
          }}
        >
          <svg
            className="ml-4 h-4 w-4 shrink-0 text-slate-500"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          <input
            name="url"
            type="text"
            placeholder="yourdomain.com"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent px-3 py-4 text-base text-white placeholder-slate-600 outline-none"
          />
        </div>
        <button
          type="submit"
          className="btn-glow shrink-0 rounded-2xl px-7 py-4 text-base font-bold text-white"
          style={{ background: "#b56a2c" }}
        >
          Scan now
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">No login. No install. Results in seconds.</p>
      <div className="mt-3">
        <a href="#compare" className="text-sm font-medium text-slate-500 transition-colors hover:text-slate-300">
          See how it compares →
        </a>
      </div>

      {/* Secondary CTA — iOS app */}
      <div className="mt-8 flex flex-col items-center gap-2.5">
        <span className="text-xs text-slate-600">Prefer your phone? Track posture on the go.</span>
        <AppStoreBadge />
      </div>

      {/* ── Rotating grade preview card ──────────────────────────────────── */}
      <div className="mx-auto mt-20 max-w-md">
        <div
          className="relative rounded-[2rem] p-px"
          style={{
            background: `linear-gradient(135deg, ${ex.borderColor} 0%, rgba(181,106,44,0.12) 50%, rgba(122,166,182,0.10) 100%)`,
            boxShadow: `0 0 80px ${ex.glowColor}, 0 40px 96px rgba(0,0,0,0.6)`,
            transition: "background 0.6s ease, box-shadow 0.6s ease",
          }}
        >
          <div
            className="glass-highlight relative overflow-hidden rounded-[calc(2rem-1px)] p-8"
            style={{
              background: "linear-gradient(135deg, rgba(11,18,32,0.98), rgba(16,24,39,0.95))",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              {/* Grade ring */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative" style={{ width: RING_SIZE, height: RING_SIZE }}>
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${ex.glowColor} 0%, transparent 70%)`,
                      filter: "blur(16px)",
                    }}
                  />
                  <svg
                    viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
                    width={RING_SIZE}
                    height={RING_SIZE}
                    className="relative -rotate-90"
                  >
                    <circle
                      cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
                      fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"
                    />
                    <circle
                      cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_R}
                      fill="none" stroke={ex.gradeColor} strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={RING_CIRC}
                      strokeDashoffset={offset}
                      filter={`drop-shadow(0 0 5px ${ex.gradeColor}aa)`}
                      style={{ transition: "stroke-dashoffset 0.7s ease, stroke 0.5s ease" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-black text-white" style={{ transition: "color 0.4s ease" }}>
                      {ex.grade}
                    </span>
                  </div>
                </div>

                <span
                  className="rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    color: ex.labelColor,
                    background: ex.labelBg,
                    border: `1px solid ${ex.labelBorder}`,
                    transition: "color 0.4s ease, background 0.4s ease, border-color 0.4s ease",
                  }}
                >
                  {ex.label}
                </span>
                <p className="font-mono text-xs text-slate-500">{ex.domain}</p>
              </div>

              {/* Finding chips */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {ex.chips.map(({ label, color }) => (
                  <span
                    key={label}
                    className="rounded-full border px-3 py-1 text-[11px] font-semibold"
                    style={chipStyle(color)}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div
                className="mt-6 grid grid-cols-3 gap-3 border-t pt-6"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
              >
                {[
                  { label: "Critical", value: ex.critical, accent: "rgba(244,63,94,0.6)" },
                  { label: "Warning",  value: ex.warning,  accent: "rgba(245,158,11,0.6)" },
                  { label: "Signals",  value: ex.signals,  accent: ex.gradeColor },
                ].map(({ label, value, accent }) => (
                  <div
                    key={label}
                    className="glass-highlight relative overflow-hidden rounded-xl px-3 py-3"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 w-[2.5px] rounded-r-[2px]"
                      style={{ background: accent }}
                    />
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">{label}</p>
                    <p className="mt-1.5 text-2xl font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rotation dots */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {EXAMPLES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setVisible(false);
                setTimeout(() => { setIdx(i); setVisible(true); }, 380);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 20 : 6,
                height: 6,
                background: i === idx ? ex.gradeColor : "rgba(255,255,255,0.15)",
              }}
              aria-label={`View ${EXAMPLES[i].domain} example`}
            />
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-600">
          Example scans — try any domain above
        </p>
      </div>
    </section>
  );
}
