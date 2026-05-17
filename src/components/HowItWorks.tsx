const steps = [
  {
    num: "01",
    title: "Paste a URL",
    body: "Any public-facing domain. No login, no install, no configuration.",
  },
  {
    num: "02",
    title: "SecURL scans",
    body: "We probe headers, DNS records, TLS configuration, third-party scripts, and public disclosure signals simultaneously.",
  },
  {
    num: "03",
    title: "Get your verdict",
    body: "An A–F grade with every finding ranked by severity — critical issues first, with OWASP and MITRE references attached.",
  },
  {
    num: "04",
    title: "Act on it",
    body: "Prioritised action list, export a PDF for stakeholders, or set up monitoring to catch regressions after future deploys.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#10b981]">How it works</p>
        <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
          From URL to verdict in seconds
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className="relative rounded-[1.5rem] border border-zinc-800 bg-[#111a14] p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.04)_inset]"
          >
            <p
              className="mb-4 text-4xl font-black tracking-[-0.04em]"
              style={{
                backgroundImage: "linear-gradient(135deg, #10b981, #14b8a6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {step.num}
            </p>
            <h3 className="mb-2 text-base font-black tracking-[-0.02em] text-white">{step.title}</h3>
            <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
          </div>
        ))}
      </div>

      {/* CTA band */}
      <div className="mt-12 overflow-hidden rounded-[2rem] border border-[#10b981]/20 bg-[#111a14] p-10 text-center shadow-[0_40px_96px_-24px_rgba(0,0,0,0.75),0_0_0_1px_rgba(16,185,129,0.08)_inset]">
        <h3 className="text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
          Ready to see your posture?
        </h3>
        <p className="mt-3 text-base text-zinc-400">
          Free, instant, no account required.
        </p>
        <a
          href="https://app.securl.online"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-2xl bg-[#10b981] px-10 py-4 text-base font-bold text-[#040c08] shadow-[0_0_32px_rgba(16,185,129,0.35)] transition-all hover:bg-[#34d399] hover:shadow-[0_0_48px_rgba(16,185,129,0.5)]"
        >
          Scan your site now
        </a>
      </div>
    </section>
  );
}
