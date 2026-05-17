export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(3,11,6,0.9)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="/" className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black text-[#030b06]"
              style={{ background: "linear-gradient(135deg, #10b981, #14b8a6)" }}
            >
              S
            </div>
            <span className="text-base font-black tracking-[-0.04em] text-white">
              Sec<span className="text-gradient-brand">URL</span>
            </span>
          </a>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-zinc-600">
            <a href="#features"     className="transition-colors hover:text-zinc-300">Features</a>
            <a href="#compare"      className="transition-colors hover:text-zinc-300">Compare</a>
            <a href="#how-it-works" className="transition-colors hover:text-zinc-300">How it works</a>
          </nav>

          <p className="text-sm text-zinc-700">© {new Date().getFullYear()} SecURL</p>
        </div>
      </div>
    </footer>
  );
}
