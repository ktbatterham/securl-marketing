const GRADE_COLOR = "#10b981";

export function Hero() {
  function handleScan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem("url") as HTMLInputElement).value.trim();
    if (!input) return;
    const target = input.startsWith("http") ? input : `https://${input}`;
    window.open(`https://app.securl.online?target=${encodeURIComponent(target)}`, "_blank");
  }

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

      {/* URL scan input */}
      <form onSubmit={handleScan} className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
        <div
          className="relative flex flex-1 items-center overflow-hidden rounded-2xl transition-all duration-200 focus-within:ring-1 focus-within:ring-[#10b981]/50"
          style={{
            background: "rgba(4,14,8,0.60)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
          }}
        >
          <svg
            className="ml-4 h-4 w-4 shrink-0 text-zinc-500"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          <input
            name="url"
            type="text"
            placeholder="yourdomain.com"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent px-3 py-4 text-base text-white placeholder-zinc-600 outline-none"
          />
        </div>
        <button
          type="submit"
          className="btn-glow shrink-0 rounded-2xl bg-[#10b981] px-7 py-4 text-base font-bold text-[#030b06]"
        >
          Scan now
        </button>
      </form>

      <p className="mt-4 text-sm text-zinc-600">No login. No install. Results in seconds.</p>
      <div className="mt-3">
        <a href="#compare" className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300">
          See how it compares →
        </a>
      </div>

      {/* Grade preview card */}
      <div className="mx-auto mt-20 max-w-md">
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
