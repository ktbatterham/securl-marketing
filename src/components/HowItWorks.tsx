const steps = [
  {
    num: "01",
    title: "Paste a URL",
    body: "Any public-facing domain. No login, no install, no configuration required.",
    accent: "rgba(16,185,129,0.2)",
    numColor: "linear-gradient(135deg, #10b981, #34d399)",
  },
  {
    num: "02",
    title: "SecURL scans",
    body: "We probe headers, DNS records, TLS config, third-party scripts, and disclosure signals simultaneously.",
    accent: "rgba(20,184,166,0.2)",
    numColor: "linear-gradient(135deg, #14b8a6, #10b981)",
  },
  {
    num: "03",
    title: "Get your verdict",
    body: "An A–F grade with every finding ranked by severity — OWASP and MITRE references included.",
    accent: "rgba(99,102,241,0.18)",
    numColor: "linear-gradient(135deg, #818cf8, #6366f1)",
  },
  {
    num: "04",
    title: "Act on it",
    body: "Prioritised action list, PDF export for stakeholders, and monitoring to catch regressions after future deploys.",
    accent: "rgba(16,185,129,0.18)",
    numColor: "linear-gradient(135deg, #34d399, #14b8a6)",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 pb-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#10b981]">
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
            className="glass-highlight group relative overflow-hidden rounded-[1.5rem] p-6 transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(4,14,8,0.55)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Accent bloom */}
            <div
              className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: step.accent, filter: "blur(16px)" }}
            />

            <p
              className="mb-5 text-5xl font-black tracking-[-0.05em]"
              style={{
                backgroundImage: step.numColor,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {step.num}
            </p>
            <h3 className="mb-2 text-base font-black tracking-[-0.02em] text-white">{step.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
          </div>
        ))}
      </div>

      {/* Final CTA band — gradient border + glass interior */}
      <div
        className="relative mt-12 rounded-[2rem] p-px"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.5) 0%, rgba(20,184,166,0.3) 40%, rgba(99,102,241,0.3) 100%)",
          boxShadow: "0 0 80px rgba(16,185,129,0.12), 0 40px 96px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="glass-highlight relative overflow-hidden rounded-[calc(2rem-1px)] p-12 text-center"
          style={{
            background: "rgba(4,12,8,0.68)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        >
          {/* Decorative blobs inside CTA */}
          <div
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(16,185,129,0.2), transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.18), transparent 70%)" }}
          />

          <h3 className="relative text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
            Ready to see your posture?
          </h3>
          <p className="relative mt-3 text-base text-zinc-400">
            Free, instant, no account required.
          </p>
          <a
            href="https://app.securl.online"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow relative mt-10 inline-block rounded-2xl bg-[#10b981] px-12 py-4 text-base font-bold text-[#030b06]"
          >
            Scan your site now
          </a>
        </div>
      </div>
    </section>
  );
}
