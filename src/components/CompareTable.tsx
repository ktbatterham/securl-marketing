const rows = [
  { label: "HTTP security headers",                        securl: true,  secheaders: true,  observatory: true,  sslabs: false },
  { label: "TLS / SSL configuration",                      securl: true,  secheaders: false, observatory: true,  sslabs: true  },
  { label: "DNS & email trust (SPF, DKIM, DMARC, DNSSEC, MTA-STS, TLS-RPT, BIMI)", securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Public disclosure signals",                    securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Third-party surface mapping",                  securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Passive intelligence (tech stack, AI surface, exposure)", securl: true, secheaders: false, observatory: false, sslabs: false },
  { label: "Session replay & analytics vendor detection (30+ tools)", securl: true, secheaders: false, observatory: false, sslabs: false },
  { label: "Prioritised, ranked findings",                 securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "OWASP / MITRE mapping",                        securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Monitoring over time",                         securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Executive-ready PDF export",                   securl: true,  secheaders: false, observatory: false, sslabs: false },
];

function Check({ yes, highlight }: { yes: boolean; highlight?: boolean }) {
  if (yes && highlight) {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", boxShadow: "0 0 10px rgba(16,185,129,0.2)" }}
      >
        <svg className="h-3.5 w-3.5 text-[#14b8a6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  if (yes) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.03)" }}>
      <svg className="h-3.5 w-3.5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  );
}

export function CompareTable() {
  return (
    <section id="compare" className="mx-auto max-w-6xl px-6 pb-32">
      <div className="mb-16 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#14b8a6]">
          Why SecURL
        </p>
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          Broader than any{" "}
          <span className="text-gradient-brand">single tool</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
          securityheaders.com, Mozilla Observatory, and SSL Labs are excellent — each covers one slice.
          SecURL reads the whole picture in one pass.
        </p>
      </div>

      {/* Table wrapper — gradient border */}
      <div
        className="relative rounded-[2rem] p-px"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.35) 0%, rgba(20,184,166,0.15) 40%, rgba(99,102,241,0.2) 100%)",
          boxShadow: "0 40px 96px rgba(0,0,0,0.6)",
        }}
      >
        <div
          className="glass-highlight relative overflow-hidden rounded-[calc(2rem-1px)]"
          style={{
            background: "rgba(4,12,8,0.72)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        >
          {/* Violet bloom inside table */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full opacity-30"
            style={{ background: "radial-gradient(ellipse at top right, rgba(99,102,241,0.25), transparent 70%)" }}
          />

          {/* Header row */}
          <div
            className="grid items-center border-b px-6 py-5"
            style={{
              gridTemplateColumns: "1fr 7rem 7rem 7rem 7rem",
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">Signal</span>
            <span className="text-center text-[10px] font-black uppercase tracking-[0.22em] text-[#34d399]">SecURL</span>
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">s-headers</span>
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">Observatory</span>
            <span className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">SSL Labs</span>
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
              <span className="pr-4 text-sm text-zinc-300">{row.label}</span>
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
            <p className="text-sm text-zinc-400">
              One URL. One grade. Public-response checks plus passive intelligence — everything ranked by what to fix first.{" "}
              <a
                href="https://app.securl.online"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#14b8a6] transition-colors hover:text-[#34d399]"
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
