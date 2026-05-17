const features = [
  {
    icon: "⚡",
    title: "Instant grade",
    body: "A–F posture score derived from every signal category — not just headers. Know your standing in seconds.",
  },
  {
    icon: "🔍",
    title: "Ranked findings",
    body: "Critical issues surface first. Each finding maps to OWASP and MITRE ATT&CK so your team speaks the same language as auditors.",
  },
  {
    icon: "📡",
    title: "DNS & email trust",
    body: "SPF, DKIM, DMARC, DNSSEC — the signals that tell the world whether to trust mail from your domain.",
  },
  {
    icon: "🌐",
    title: "Third-party surface",
    body: "Every external script and resource loaded by your page is a potential attack vector. SecURL maps them.",
  },
  {
    icon: "📢",
    title: "Disclosure signals",
    body: "security.txt, responsible disclosure policy, public vulnerability reports — the signals that tell researchers you're serious.",
  },
  {
    icon: "📋",
    title: "Prioritised actions",
    body: "Not a raw list. Findings are ordered by impact so you know exactly what to fix first — and why.",
  },
  {
    icon: "📊",
    title: "Executive reporting",
    body: "Export a clean PDF your CISO can send to the board. No terminal output, no jargon dump.",
  },
  {
    icon: "🔔",
    title: "Monitoring",
    body: "Track posture over time. Get alerted when a new header disappears or a misconfiguration appears after a deploy.",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 pb-24">
      {/* Section header */}
      <div className="mb-14 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#10b981]">What you get</p>
        <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
          One scan. The full picture.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
          SecURL combines eight signal categories into a single posture read —
          the kind of breadth that used to require four separate tools.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-[1.5rem] border border-zinc-800 bg-[#111a14] p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.04)_inset] transition-all duration-200 hover:-translate-y-px hover:border-zinc-700 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)]"
          >
            <div className="mb-4 text-2xl">{f.icon}</div>
            <h3 className="mb-2 text-base font-black tracking-[-0.02em] text-white">{f.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
