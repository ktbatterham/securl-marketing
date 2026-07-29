import { Sparkles } from "lucide-react";
import { buildScannerUrl, recordFunnelHandoff } from "../lib/telemetry";

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
            <a href="#routes"       className="transition-colors hover:text-slate-300">Apps</a>
            <a href="#engine"       className="transition-colors hover:text-slate-300">Engine</a>
            <a href="#compare"      className="transition-colors hover:text-slate-300">Compare</a>
            <a href="#how-it-works" className="transition-colors hover:text-slate-300">How it works</a>
            <a href="/tools/csp-builder" className="transition-colors hover:text-slate-300">CSP Builder</a>
            <a href="/guides/content-security-policy" className="transition-colors hover:text-slate-300">CSP rollout guide</a>
            <a href={buildScannerUrl()} target="_blank" rel="noopener noreferrer" onClick={() => recordFunnelHandoff({ target: "https://app.securl.online", mode: "landing:footer_app", format: "web_app" })} className="transition-colors hover:text-slate-300">Open app ↗</a>
            <a href="https://www.npmjs.com/package/securl" target="_blank" rel="noopener noreferrer" onClick={() => recordFunnelHandoff({ target: "https://www.npmjs.com/package/securl", mode: "landing:footer_npm", format: "npm" })} className="transition-colors hover:text-slate-300">npm ↗</a>
            <a href="https://github.com/this-is-securl/securl" target="_blank" rel="noopener noreferrer" onClick={() => recordFunnelHandoff({ target: "https://github.com/this-is-securl/securl", mode: "landing:footer_source", format: "github" })} className="transition-colors hover:text-slate-300">Source ↗</a>
            <a href="https://apps.apple.com/app/securl/id6774322464" target="_blank" rel="noopener noreferrer" onClick={() => recordFunnelHandoff({ target: "https://apps.apple.com/app/securl/id6774322464", mode: "landing:footer_ios", format: "app_store" })} className="transition-colors hover:text-slate-300">iOS app ↗</a>
            <a href="/downloads" onClick={() => recordFunnelHandoff({ target: "https://securl.online/downloads", mode: "landing:footer_android", format: "android_apk" })} className="transition-colors hover:text-slate-300">Android APKs</a>
            <a href="/privacy" className="transition-colors hover:text-slate-300">Privacy</a>
          </nav>

          <p className="text-sm text-slate-700">© {new Date().getFullYear()} SecURL</p>
        </div>
      </div>
    </footer>
  );
}
