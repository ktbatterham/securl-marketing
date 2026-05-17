export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#040c08]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="/" className="text-lg font-black tracking-[-0.04em] text-white">
            Sec<span className="text-[#10b981]">URL</span>
          </a>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <a href="#features" className="transition-colors hover:text-zinc-300">Features</a>
            <a href="#compare" className="transition-colors hover:text-zinc-300">Compare</a>
            <a href="#how-it-works" className="transition-colors hover:text-zinc-300">How it works</a>
            <a
              href="https://app.securl.online"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-300"
            >
              Launch app
            </a>
          </nav>

          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} SecURL
          </p>
        </div>
      </div>
    </footer>
  );
}
