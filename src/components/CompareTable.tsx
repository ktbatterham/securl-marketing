const rows = [
  { label: "HTTP security headers",         securl: true,  secheaders: true,  observatory: true,  sslabs: false },
  { label: "TLS / SSL configuration",       securl: true,  secheaders: false, observatory: true,  sslabs: true  },
  { label: "DNS & email trust (SPF, DKIM, DMARC, DNSSEC)", securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Public disclosure signals",     securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Third-party surface mapping",   securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Prioritised, ranked findings",  securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "OWASP / MITRE mapping",         securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Monitoring over time",          securl: true,  secheaders: false, observatory: false, sslabs: false },
  { label: "Executive-ready PDF export",    securl: true,  secheaders: false, observatory: false, sslabs: false },
];

function Check({ yes }: { yes: boolean }) {
  return yes ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981]/15 text-[#10b981]">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
  ) : (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/[0.04] text-zinc-600">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  );
}

export function CompareTable() {
  return (
    <section id="compare" className="mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-14 text-center">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#10b981]">Why SecURL</p>
        <h2 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
          Broader than any single tool
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-zinc-400">
          securityheaders.com, Mozilla Observatory, and SSL Labs are excellent — but each covers one slice.
          SecURL reads the whole posture in one pass.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#111a14] shadow-[0_40px_96px_-24px_rgba(0,0,0,0.75),0_1px_0_rgba(255,255,255,0.07)_inset]">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_6rem_6rem_6rem_6rem] border-b border-zinc-800 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 sm:grid-cols-[1fr_8rem_8rem_8rem_8rem]">
          <span>Signal</span>
          <span className="text-center text-[#10b981]">SecURL</span>
          <span className="text-center">securityheaders</span>
          <span className="text-center">Observatory</span>
          <span className="text-center">SSL Labs</span>
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[1fr_6rem_6rem_6rem_6rem] items-center px-6 py-4 sm:grid-cols-[1fr_8rem_8rem_8rem_8rem] ${
              i < rows.length - 1 ? "border-b border-white/[0.05]" : ""
            } transition-colors hover:bg-white/[0.02]`}
          >
            <span className="text-sm text-zinc-300">{row.label}</span>
            <span className="flex justify-center"><Check yes={row.securl} /></span>
            <span className="flex justify-center"><Check yes={row.secheaders} /></span>
            <span className="flex justify-center"><Check yes={row.observatory} /></span>
            <span className="flex justify-center"><Check yes={row.sslabs} /></span>
          </div>
        ))}

        {/* Footer CTA */}
        <div className="border-t border-zinc-800 bg-[#0c1410] px-6 py-5 text-center">
          <p className="text-sm text-zinc-400">
            One URL. One grade. Everything ranked by what to fix first.{" "}
            <a
              href="https://app.securl.online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#10b981] hover:text-[#34d399]"
            >
              Try it free →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
