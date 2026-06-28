const rows = [
  { label: "HTTP security headers",                        securl: true,  secheaders: true,  observatory: true,  sslabs: false },
  { label: "TLS / SSL configuration",                      securl: true,  secheaders: false, observatory: true,  sslabs: true  },
  { label: "DNS & email trust (SPF, DKIM, DMARC, DNSSEC, MTA-STS, TLS-RPT, BIMI)", securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Public disclosure signals",                    securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Third-party surface mapping",                  securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Passive intelligence (tech stack, AI surface, exposure)", securl: true, secheaders: false, observatory: false, sslabs: false },
  { label: "Session replay & analytics vendor detection (30+ tools)", securl: true, secheaders: false, observatory: false, sslabs: false },
  { label: "Finding evidence with observed and expected values", securl: true, secheaders: false, observatory: false, sslabs: false },
  { label: "Prioritized remediation plan with owner, effort, and verification", securl: true, secheaders: false, observatory: false, sslabs: false },
  { label: "OWASP / MITRE mapping",                        securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Monitoring over time",                         securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Executive-ready PDF export",                   securl: true,  secheaders: false, observatory: false, sslabs: false },
];

function Check({ yes, highlight }: { yes: boolean; highlight?: boolean }) {
  if (yes && highlight) {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full"
        style={{
          background: "rgba(181,106,44,0.15)",
          border: "1px solid rgba(181,106,44,0.30)",
          boxShadow: "0 0 10px rgba(181,106,44,0.20)",
        }}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="#d89a63" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  if (yes) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.03)" }}>
      <svg className="h-3.5 w-3.5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  );
}

export function CompareTable() {
  return (
    <section id="compare" className="mx-auto max-w-6xl px-6 pb-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#d89a63]">
          Why SecURL
        </p>
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          Broader than any{" "}
          <span className="text-gradient-brand">single tool</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400">
          securityheaders.com, Mozilla Observatory, and SSL Labs are excellent — each covers one slice.
          SecURL reads the whole picture in one pass, then turns the evidence into actions.
        </p>
      </div>

      <div
        className="relative rounded-[2rem] p-px"
        style={{
          background: "linear-gradient(135deg, rgba(181,106,44,0.35) 0%, rgba(181,106,44,0.12) 40%, rgba(122,166,182,0.15) 100%)",
          boxShadow: "0 40px 96px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="glass-highlight relative overflow-hidden rounded-[calc(2rem-1px)]"
          style={{
            background: "linear-gradient(135deg, rgba(11,18,32,0.98), rgba(16,24,39,0.95))",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        >
          {/* Header row */}
          <div
            className="grid items-center border-b px-6 py-5"
            style={{
              gridTemplateColumns: "1fr 7rem 7rem 7rem 7rem",
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Signal</span>
            <span className="text-center text-[10px] font-black uppercase tracking-[0.22em] text-[#f0d5bc]">SecURL</span>
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">s-headers</span>
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Observatory</span>
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">SSL Labs</span>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div
              key={row.label}
              className="grid items-center px-6 py-4 transition-colors duration-150 hover:bg-white/[0.025]"
              style={{
                gridTemplateColumns: "1fr 7rem 7rem 7rem 7rem",
                borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined,
              }}
            >
              <span className="pr-4 text-sm text-slate-300">{row.label}</span>
              <span className="flex justify-center"><Check yes={row.securl}     highlight /></span>
              <span className="flex justify-center"><Check yes={row.secheaders}          /></span>
              <span className="flex justify-center"><Check yes={row.observatory}         /></span>
              <span className="flex justify-center"><Check yes={row.sslabs}             /></span>
            </div>
          ))}

          {/* Footer */}
          <div
            className="border-t px-6 py-5 text-center"
            style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
          >
            <p className="text-sm text-slate-400">
              One URL. One grade. Public-response checks plus passive intelligence, evidence, and a remediation plan ranked by what to fix first.{" "}
              <a
                href="https://app.securl.online"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#d89a63] transition-colors hover:text-[#f0d5bc]"
              >
                Try it free →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
