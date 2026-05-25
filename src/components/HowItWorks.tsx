const steps = [
  {
    num: "01",
    title: "Paste a URL",
    body: "Any public-facing domain. No login, no install, no configuration required.",
  },
  {
    num: "02",
    title: "SecURL scans",
    body: "SecURL reads headers, DNS (SPF, DMARC, MTA-STS, TLS-RPT, BIMI), TLS config, HTML, and public records passively — no active probing, no noise, no footprint.",
  },
  {
    num: "03",
    title: "Get your verdict",
    body: "An A–F grade with every finding ranked by severity — OWASP and MITRE references included.",
  },
  {
    num: "04",
    title: "Act on it",
    body: "Prioritised action list, PDF export for stakeholders, and monitoring to catch regressions after future deploys.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 pb-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#d89a63]">
          How it works
        </p>
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          From URL to verdict{" "}
          <span className="text-gradient-brand">in seconds</span>
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.num}
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
              className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: "rgba(181,106,44,0.18)", filter: "blur(16px)" }}
            />

            <p
              className="mb-5 text-5xl font-black tracking-[-0.05em]"
              style={{
                backgroundImage: "linear-gradient(135deg, #b56a2c, #d89a63)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {step.num}
            </p>
            <h3 className="mb-2 text-base font-semibold tracking-[-0.02em] text-white">{step.title}</h3>
            <p className="text-sm leading-relaxed text-slate-400">{step.body}</p>
          </div>
        ))}
      </div>

      {/* Final CTA band */}
      <div
        className="relative mt-12 rounded-[2rem] p-px"
        style={{
          background: "linear-gradient(135deg, rgba(181,106,44,0.50) 0%, rgba(181,106,44,0.20) 40%, rgba(122,166,182,0.15) 100%)",
          boxShadow: "0 0 80px rgba(181,106,44,0.10), 0 40px 96px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="glass-highlight relative overflow-hidden rounded-[calc(2rem-1px)] p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(11,18,32,0.98), rgba(16,24,39,0.95))",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        >
          {/* Subtle copper radials */}
          <div
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(181,106,44,0.14), transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(122,166,182,0.10), transparent 70%)" }}
          />

          <h3 className="relative text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
            Ready to see your posture?
          </h3>
          <p className="relative mt-3 text-base text-slate-400">
            Free, instant, no account required.
          </p>
          <a
            href="https://app.securl.online"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow relative mt-10 inline-block rounded-2xl px-12 py-4 text-base font-bold text-white"
            style={{ background: "#b56a2c" }}
          >
            Scan your site now
          </a>
        </div>
      </div>
    </section>
  );
}
