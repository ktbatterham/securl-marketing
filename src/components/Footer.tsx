import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(7,11,20,0.90)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="/" className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "linear-gradient(135deg, #b56a2c, #d89a63)" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-base font-black tracking-[-0.04em] text-white">
              Sec<span className="text-gradient-brand">URL</span>
            </span>
          </a>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
            <a href="#features"     className="transition-colors hover:text-slate-300">Features</a>
            <a href="#compare"      className="transition-colors hover:text-slate-300">Compare</a>
            <a href="#how-it-works" className="transition-colors hover:text-slate-300">How it works</a>
            <a href="https://app.securl.online" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-slate-300">Open app ↗</a>
            <a href="https://apps.apple.com/app/securl/id6774322464" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-slate-300">iOS app ↗</a>
            <a href="/privacy" className="transition-colors hover:text-slate-300">Privacy</a>
          </nav>

          <p className="text-sm text-slate-700">© {new Date().getFullYear()} SecURL</p>
        </div>
      </div>
    </footer>
  );
}
