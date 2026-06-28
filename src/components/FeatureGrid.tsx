import {
  AlertTriangle,
  BellDot,
  Download,
  Globe,
  Layers3,
  ListTodo,
  Search,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    Icon: ShieldCheck,
    title: "Instant grade",
    body: "A–F posture score from every signal category — not just headers. Know your standing in seconds.",
    accent: "rgba(181,106,44,0.15)",
    iconColor: "#d89a63",
  },
  {
    Icon: ListTodo,
    title: "Evidence-backed fixes",
    body: "Findings carry observed evidence, expected posture, and references, then roll into a remediation plan ranked by impact and effort.",
    accent: "rgba(181,106,44,0.12)",
    iconColor: "#d89a63",
  },
  {
    Icon: Globe,
    title: "DNS & email trust",
    body: "SPF, DKIM, DMARC, DNSSEC, MTA-STS, TLS-RPT, and BIMI — a complete read of your email trust chain, not just the basics.",
    accent: "rgba(181,106,44,0.12)",
    iconColor: "#d89a63",
  },
  {
    Icon: Layers3,
    title: "Third-party surface",
    body: "Every external script and resource loaded by your page is a potential attack vector. SecURL maps them.",
    accent: "rgba(181,106,44,0.12)",
    iconColor: "#d89a63",
  },
  {
    Icon: Search,
    title: "Passive intelligence",
    body: "Detects 30+ analytics, telemetry, and session replay vendors alongside stack, CDN, AI surface, and exposure indicators — observation only, no active probing, no footprint.",
    accent: "rgba(181,106,44,0.12)",
    iconColor: "#d89a63",
  },
  {
    Icon: AlertTriangle,
    title: "Owner-aware actions",
    body: "Not a raw list. Each action points at the likely owner — app, edge, DNS, identity, or third party — with a plain verification step.",
    accent: "rgba(181,106,44,0.12)",
    iconColor: "#d89a63",
  },
  {
    Icon: Download,
    title: "Executive reporting",
    body: "Export a clean PDF your CISO can send to the board. No terminal output, no jargon dump.",
    accent: "rgba(181,106,44,0.12)",
    iconColor: "#d89a63",
  },
  {
    Icon: BellDot,
    title: "Monitoring",
    body: "Track posture over time. Get alerted when a header disappears or a misconfiguration appears after a deploy.",
    accent: "rgba(181,106,44,0.12)",
    iconColor: "#d89a63",
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 pb-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#d89a63]">
          What you get
        </p>
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          One scan.{" "}
          <span className="text-gradient-brand">The full picture.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">
          Eight signal categories. One posture read. Including passive intelligence, evidence snapshots, and remediation guidance derived from observation alone.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ Icon, title, body, accent, iconColor }) => (
          <div
            key={title}
            className="glass-highlight group relative overflow-hidden rounded-[1.75rem] p-7 transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              boxShadow: "0 24px 60px -36px rgba(0,0,0,0.65)",
            }}
          >
            {/* Accent bloom on hover */}
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: accent, filter: "blur(20px)" }}
            />

            <div
              className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
              style={{
                background: accent,
                border: "1px solid rgba(181,106,44,0.25)",
              }}
            >
              <Icon className="h-5 w-5" style={{ color: iconColor }} strokeWidth={1.5} />
            </div>
            <h3 className="mb-2 text-base font-semibold tracking-[-0.02em] text-white">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
