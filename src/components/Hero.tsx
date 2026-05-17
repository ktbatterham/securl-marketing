export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-24 text-center">
      {/* Eyebrow */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#10b981]/20 bg-[#10b981]/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#34d399]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
        Security posture intelligence
      </div>

      {/* Headline */}
      <h1 className="mx-auto max-w-3xl text-5xl font-black leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
        Not a list of headers.{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(135deg, #10b981 0%, #34d399 50%, #14b8a6 100%)",
          }}
        >
          A verdict.
        </span>
      </h1>

      {/* Sub */}
      <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-zinc-400">
        Paste a URL. Get an instant, graded read of your site's external security
        posture — headers, DNS trust, TLS, third-party surface, and public
        disclosure signals, all ranked by what to fix first.
      </p>

      {/* CTA row */}
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="https://app.securl.online"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-[#10b981] px-8 py-4 text-base font-bold text-[#040c08] shadow-[0_0_32px_rgba(16,185,129,0.35)] transition-all hover:bg-[#34d399] hover:shadow-[0_0_48px_rgba(16,185,129,0.5)]"
        >
          Scan your site — it's free
        </a>
        <a
          href="#compare"
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-8 py-4 text-base font-semibold text-zinc-300 transition-all hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
        >
          See how it compares
        </a>
      </div>

      {/* Social proof nudge */}
      <p className="mt-6 text-sm text-zinc-600">
        No login. No install. Results in seconds.
      </p>

      {/* Preview card */}
      <div className="mx-auto mt-20 max-w-lg">
        <div
          className="rounded-3xl border border-emerald-700/20 p-8 shadow-[0_40px_96px_-24px_rgba(0,0,0,0.75),0_1px_0_rgba(16,185,129,0.08)_inset]"
          style={{ background: "rgba(4,12,8,0.60)", backdropFilter: "blur(12px)" }}
        >
          {/* Grade ring */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black text-white shadow-[0_0_0_3px_rgba(16,185,129,0.35),0_0_32px_rgba(16,185,129,0.2)]"
              style={{ background: "rgba(16,185,129,0.12)", border: "2px solid rgba(16,185,129,0.4)" }}
            >
              B
            </div>
            <span
              className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: "#10b981", background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)" }}
            >
              Good Posture
            </span>
            <p className="font-mono text-xs text-zinc-400">portswigger.net</p>
          </div>

          {/* Finding chips */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { label: "COOP missing", color: "amber" },
              { label: "DNSSEC off", color: "amber" },
              { label: "security.txt", color: "zinc" },
            ].map(({ label, color }) => (
              <span
                key={label}
                className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${
                  color === "amber"
                    ? "border-amber-500/30 bg-amber-500/[0.08] text-amber-300"
                    : "border-white/10 bg-white/[0.05] text-zinc-400"
                }`}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Stat row */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-6">
            {[
              { label: "Critical", value: "0", accent: "#f43f5e" },
              { label: "Warning", value: "3", accent: "#f59e0b" },
              { label: "Signals", value: "14", accent: "#10b981" },
            ].map(({ label, value, accent }) => (
              <div key={label} className="relative overflow-hidden rounded-xl bg-[#0c1410] px-3 py-3 ring-1 ring-white/[0.05]">
                <div
                  className="absolute inset-y-0 left-0 w-[2.5px] rounded-r-[2px]"
                  style={{ background: `${accent}99` }}
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
                <p className="mt-1.5 text-xl font-black text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
