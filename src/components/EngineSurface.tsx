import { Download, Layers3, Search, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { buildScannerUrl, recordFunnelHandoff } from "../lib/telemetry";

type EngineLink = {
  Icon: LucideIcon;
  title: string;
  body: string;
  href: string;
};

const links: EngineLink[] = [
  {
    Icon: Download,
    title: "npm package",
    body: "Run SecURL locally, in CI, or inside Node workflows with the same engine used by the hosted scanner.",
    href: "https://www.npmjs.com/package/securl",
  },
  {
    Icon: Search,
    title: "API integration guide",
    body: "Use compact scan resources, posture manifests, monitoring summaries, and share-card payloads safely.",
    href: "https://github.com/this-is-securl/securl/blob/main/docs/API-INTEGRATION-GUIDE.md",
  },
  {
    Icon: ShieldCheck,
    title: "Safety model",
    body: "Review the passive boundary, SSRF controls, privacy posture, package trust, and known limits.",
    href: "https://github.com/this-is-securl/securl/blob/main/docs/ARCHITECTURE-SAFETY.md",
  },
  {
    Icon: Layers3,
    title: "Posture manifest",
    body: "Treat a scan as an external security recipe card for audits, CI evidence, and vendor review.",
    href: "https://github.com/this-is-securl/securl/blob/main/docs/CONSUMER-API-MAP.md",
  },
];

export function EngineSurface() {
  return (
    <section id="engine" className="mx-auto max-w-6xl px-6 pb-32">
      <div
        className="relative overflow-hidden rounded-[2rem] p-px"
        style={{
          background: "linear-gradient(135deg, rgba(181,106,44,0.42) 0%, rgba(181,106,44,0.14) 42%, rgba(122,166,182,0.16) 100%)",
          boxShadow: "0 40px 96px rgba(0,0,0,0.55)",
        }}
      >
        <div
          className="glass-highlight relative rounded-[calc(2rem-1px)] p-7 sm:p-10"
          style={{
            background: "linear-gradient(135deg, rgba(11,18,32,0.98), rgba(16,24,39,0.95))",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        >
          <div
            className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(181,106,44,0.16), transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(122,166,182,0.12), transparent 70%)" }}
          />

          <div className="relative grid gap-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#d89a63]">
                Engine first
              </p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                One passive engine.{" "}
                <span className="text-gradient-brand">Every surface.</span>
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
                The website, web app, mobile apps, CLI, CI output, and hosted API all work from the
                same outside-in posture engine. Use the UI when you want a quick verdict; use the
                package or API when you want repeatable evidence.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={buildScannerUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordFunnelHandoff({ target: "https://app.securl.online", mode: "landing:engine_open_scanner", format: "web_app" })}
                  className="btn-glow inline-flex justify-center rounded-2xl px-6 py-3 text-sm font-bold text-white"
                  style={{ background: "#b56a2c" }}
                >
                  Open scanner
                </a>
                <a
                  href="https://github.com/this-is-securl/securl"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordFunnelHandoff({ target: "https://github.com/this-is-securl/securl", mode: "landing:engine_source", format: "github" })}
                  className="inline-flex justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-bold text-slate-200 transition-colors hover:border-white/18 hover:bg-white/[0.07]"
                >
                  View source
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {links.map(({ Icon, title, body, href }) => (
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => recordFunnelHandoff({ target: href, mode: `landing:engine_${title.toLowerCase().replaceAll(" ", "_")}`, format: "engine_link" })}
                  className="group min-h-40 rounded-[1.35rem] border border-white/[0.08] bg-white/[0.035] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b56a2c]/35 hover:bg-[#b56a2c]/[0.08]"
                >
                  <div
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: "rgba(181,106,44,0.12)", border: "1px solid rgba(181,106,44,0.24)" }}
                  >
                    <Icon className="h-5 w-5 text-[#d89a63]" strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-2 text-base font-semibold tracking-[-0.02em] text-white">
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {body}
                  </p>
                </a>
              ))}
            </div>

            <div className="relative flex flex-col gap-2 border-t border-white/[0.07] pt-6 text-sm text-slate-500 lg:col-span-2">
              <p>
                Passive by design: no credentials, no exploit attempts, no brute force, no invasive probing.
              </p>
              <p>
                Install-free scan: <span className="font-mono text-slate-300">npx securl scan example.com --format manifest</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
