export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#040c08]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <span className="text-lg font-black tracking-[-0.04em] text-white">
            Sec<span className="text-[#10b981]">URL</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-400 sm:flex">
          <a href="#features" className="transition-colors hover:text-white">Features</a>
          <a href="#compare" className="transition-colors hover:text-white">Compare</a>
          <a href="#how-it-works" className="transition-colors hover:text-white">How it works</a>
        </nav>

        <a
          href="https://app.securl.online"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-[#10b981] px-4 py-2 text-sm font-bold text-[#040c08] transition-all hover:bg-[#34d399] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          Launch app
        </a>
      </div>
    </header>
  );
}
