export function Nav() {
  return (
    <header className="glass-heavy sticky top-0 z-50 rounded-none border-b-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-black text-white"
            style={{ background: "linear-gradient(135deg, #10b981, #14b8a6)", boxShadow: "0 0 16px rgba(16,185,129,0.5)" }}
          >
            S
          </div>
          <span className="text-lg font-black tracking-[-0.04em] text-white">
            Sec<span className="text-gradient-brand">URL</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-400 sm:flex">
          <a href="#features" className="transition-colors hover:text-white">Features</a>
          <a href="#compare" className="transition-colors hover:text-white">Compare</a>
          <a href="#how-it-works" className="transition-colors hover:text-white">How it works</a>
        </nav>

        <a
          href="#"
          onClick={e => { e.preventDefault(); document.querySelector('input[name="url"]')?.scrollIntoView({ behavior: "smooth", block: "center" }); (document.querySelector('input[name="url"]') as HTMLInputElement)?.focus(); }}
          className="btn-glow rounded-xl bg-[#10b981] px-5 py-2 text-sm font-bold text-[#030b06]"
        >
          Scan now
        </a>
      </div>
    </header>
  );
}
