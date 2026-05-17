const features = [
  {
    icon: "⚡",
    title: "Instant grade",
    body: "A–F posture score from every signal category — not just headers. Know your standing in seconds.",
    accent: "rgba(16,185,129,0.15)",
    glow: "rgba(16,185,129,0.08)",
  },
  {
    icon: "🎯",
    title: "Ranked findings",
    body: "Critical issues surface first. Every finding maps to OWASP and MITRE ATT&CK so your team speaks the same language as auditors.",
    accent: "rgba(244,63,94,0.12)",
    glow: "rgba(244,63,94,0.06)",
  },
  {
    icon: "📡",
    title: "DNS & email trust",
    body: "SPF, DKIM, DMARC, DNSSEC — the signals that tell the world whether to trust mail from your domain.",
    accent: "rgba(20,184,166,0.14)",
    glow: "rgba(20,184,166,0.07)",
  },
  {
    icon: "🌐",
    title: "Third-party surface",
    body: "Every external script and resource loaded by your page is a potential attack vector. SecURL maps them.",
    accent: "rgba(99,102,241,0.14)",
    glow: "rgba(99,102,241,0.07)",
  },
  {
    icon: "📢",
    title: "Disclosure signals",
    body: "security.txt, responsible disclosure policy, public CVEs — the signals that tell researchers you're serious.",
    accent: "rgba(251,191,36,0.12)",
    glow: "rgba(251,191,36,0.06)",
  },
  {
    icon: "🔢",
    title: "Prioritised actions",
    body: "Not a raw list. Findings are ordered by impact so you know exactly what to fix first — and why.",
    accent: "rgba(16,185,129,0.14)",
    glow: "rgba(16,185,129,0.07)",
  },
  {
    icon: "📊",
    title: "Executive reporting",
    body: "Export a clean PDF your CISO can send to the board. No terminal output, no jargon dump.",
    accent: "rgba(129,140,248,0.14)",
    glow: "rgba(129,140,248,0.07)",
  },
  {
    icon: "🔔",
    title: "Monitoring",
    body: "Track posture over time. Get alerted when a header disappears or a misconfiguration appears after a deploy.",
    accent: "rgba(20,184,166,0.14)",
    glow: "rgba(20,184,166,0.07)",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 pb-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#10b981]">
          What you get
        </p>
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          One scan.{" "}
          <span className="text-gradient-brand">The full picture.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
          Eight signal categories. One posture read. The breadth that used to require four separate tools.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="glass-highlight group relative overflow-hidden rounded-[1.5rem] p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(4,14,8,0.55)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset`,
            }}
          >
            {/* Accent bloom behind card */}
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: f.accent, filter: "blur(20px)" }}
            />

            <div
              className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-xl"
              style={{ background: f.accent, border: `1px solid ${f.glow.replace("0.07", "0.2")}` }}
            >
              {f.icon}
            </div>
            <h3 className="mb-2 text-base font-black tracking-[-0.02em] text-white">{f.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
