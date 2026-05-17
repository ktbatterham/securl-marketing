const GRADE_COLOR = "#10b981";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32 pt-28 text-center">
      {/* Eyebrow pill */}
      <div
        className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.22em]"
        style={{
          background: "rgba(16,185,129,0.08)",
          border: "1px solid rgba(16,185,129,0.22)",
          color: "#34d399",
          backdropFilter: "blur(12px)",
        }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "#10b981", boxShadow: "0 0 6px #10b981" }}
        />
        Security posture intelligence
      </div>

      {/* Headline */}
      <h1 className="mx-auto max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5rem]">
        Not a list of headers.{" "}
        <br className="hidden sm:block" />
        <span className="text-gradient-vivid">A verdict.</span>
      </h1>

      {/* Sub */}
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
        Paste a URL. Get a graded read of your site's entire external security posture — headers,
        DNS trust, TLS, third-party surface, and public disclosure signals, all{" "}
        <span className="font-semibold text-zinc-200">ranked by what to fix first.</span>
      </p>

      {/* CTAs */}
      <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <a
          href="https://app.securl.online"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow rounded-2xl bg-[#10b981] px-9 py-4 text-base font-bold text-[#030b06]"
        >
          Scan your site — it's free
        </a>
        <a
          href="#compare"
          className="glass rounded-2xl px-9 py-4 text-base font-semibold text-zinc-300 transition-all duration-200 hover:text-white"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          See how it compares
        </a>
      </div>

      <p className="mt-5 text-sm text-zinc-600">No login. No install. Results in seconds.</p>

      {/* Grade preview card */}
      <div className="mx-auto mt-24 max-w-md">
        {/* Outer glow ring */}
        <div
          className="relative rounded-[2rem] p-px"
          style={{
            background: "linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(20,184,166,0.2) 50%, rgba(99,102,241,0.15) 100%)",
            boxShadow: "0 0 80px rgba(16,185,129,0.2), 0 40px 96px rgba(0,0,0,0.6)",
          }}
        >
          <div
            className="glass-highlight relative overflow-hidden rounded-[calc(2rem-1px)] p-8"
            style={{
              background: "rgba(4,14,8,0.65)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Grade ring */}
            <div className="flex flex-col items-center gap-3">
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full text-4xl font-black text-white"
                style={{
                  background: `rgba(16,185,129,0.1)`,
                  border: `2px solid rgba(16,185,129,0.45)`,
                  boxShadow: `0 0 0 6px rgba(16,185,129,0.08), 0 0 40px rgba(16,185,129,0.25)`,
                }}
              >
                B
              </div>
              <span
                className="rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{
                  color: GRADE_COLOR,
                  background: "rgba(16,185,129,0.10)",
                  border: "1px solid rgba(16,185,129,0.25)",
                }}
              >
                Good Posture
              </span>
              <p className="font-mono text-xs text-zinc-500">portswigger.net</p>
            </div>

            {/* Finding chips */}
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "COOP missing", color: "amber" },
                { label: "DNSSEC off",   color: "amber" },
                { label: "security.txt", color: "zinc"  },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  className="rounded-full border px-3 py-1 text-[11px] font-semibold"
                  style={
                    color === "amber"
                      ? { color: "#fcd34d", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)" }
                      : { color: "#a1a1aa", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div
              className="mt-6 grid grid-cols-3 gap-3 border-t pt-6"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {[
                { label: "Critical", value: "0",  accent: "rgba(244,63,94,0.6)"  },
                { label: "Warning",  value: "3",  accent: "rgba(245,158,11,0.6)" },
                { label: "Signals",  value: "14", accent: "rgba(16,185,129,0.6)" },
              ].map(({ label, value, accent }) => (
                <div
                  key={label}
                  className="glass-highlight relative overflow-hidden rounded-xl px-3 py-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="absolute inset-y-0 left-0 w-[2.5px] rounded-r-[2px]"
                    style={{ background: accent }}
                  />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">{label}</p>
                  <p className="mt-1.5 text-2xl font-black text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
