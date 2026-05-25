import { Sparkles } from "lucide-react";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-heavy sticky top-0 z-50" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg, #b56a2c, #d89a63)" }}
          >
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-[-0.04em] text-white">
            Sec<span className="text-gradient-brand">URL</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-400 sm:flex">
          <a href="#features"     className="transition-colors hover:text-white">Features</a>
          <a href="#compare"      className="transition-colors hover:text-white">Compare</a>
          <a href="#how-it-works" className="transition-colors hover:text-white">How it works</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              document.querySelector('input[name="url"]')?.scrollIntoView({ behavior: "smooth", block: "center" });
              (document.querySelector('input[name="url"]') as HTMLInputElement)?.focus();
            }}
            className="btn-glow rounded-xl px-5 py-2 text-sm font-bold text-white"
            style={{ background: "#b56a2c" }}
          >
            Scan now
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg sm:hidden"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)" }}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[1.5px] w-5 rounded-full bg-slate-300 transition-all duration-200"
              style={open ? { transform: "translateY(6.5px) rotate(45deg)" } : {}}
            />
            <span
              className="block h-[1.5px] w-5 rounded-full bg-slate-300 transition-all duration-200"
              style={open ? { opacity: 0 } : {}}
            />
            <span
              className="block h-[1.5px] w-5 rounded-full bg-slate-300 transition-all duration-200"
              style={open ? { transform: "translateY(-6.5px) rotate(-45deg)" } : {}}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="overflow-hidden sm:hidden"
        style={{ maxHeight: open ? 200 : 0, transition: "max-height 0.25s ease" }}
      >
        <nav
          className="flex flex-col gap-1 px-6 pb-5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {[
            { href: "#features",     label: "Features" },
            { href: "#compare",      label: "Compare" },
            { href: "#how-it-works", label: "How it works" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
