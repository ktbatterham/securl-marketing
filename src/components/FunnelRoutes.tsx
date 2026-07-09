import { AppWindow, BellDot, Code2, Download, ExternalLink, ShieldCheck, Smartphone } from "lucide-react";
import { buildScannerUrl, recordFunnelHandoff } from "../lib/telemetry";

const appStoreLinks = [
  {
    label: "SecURL",
    href: "https://apps.apple.com/app/securl/id6774322464",
  },
  {
    label: "Header Watch",
    href: "https://apps.apple.com/app/header-watch/id6774599437",
  },
  {
    label: "Cert Watch",
    href: "https://apps.apple.com/app/cert-watch/id6774979236",
  },
];

const routes = [
  {
    Icon: AppWindow,
    title: "Run a browser scan",
    body: "Paste a public URL and get the full web report: grade, score drivers, evidence, exports, and monitoring.",
    href: buildScannerUrl(),
    cta: "Open scanner",
    mode: "landing:open_scanner",
    format: "web_app",
  },
  {
    Icon: Smartphone,
    title: "Install the iOS suite",
    body: "SecURL, Header Watch, and Cert Watch are live on the App Store for quick checks and watch-list workflows.",
    href: "https://apps.apple.com/app/securl/id6774322464",
    cta: "View SecURL app",
    mode: "landing:ios_suite",
    format: "app_store",
  },
  {
    Icon: Download,
    title: "Download Android APKs",
    body: "Use the self-hosted Android builds for the same companion workflows without waiting on a store listing.",
    href: "https://securl.online/downloads",
    cta: "Open downloads",
    mode: "landing:android_downloads",
    format: "android_apk",
  },
  {
    Icon: Code2,
    title: "Use the engine",
    body: "Run the npm package in CI or locally, including manifest output, schema validation, and cert-only checks.",
    href: "https://www.npmjs.com/package/securl",
    cta: "Open npm",
    mode: "landing:npm",
    format: "npm",
  },
];

const proof = [
  { label: "iOS apps", value: "3", detail: "SecURL suite live" },
  { label: "npm pulls", value: "1k+", detail: "weekly package downloads" },
  { label: "No account", value: "0", detail: "credentials required" },
];

export function FunnelRoutes() {
  return (
    <section id="routes" className="mx-auto max-w-6xl px-6 pb-32">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#d89a63]">
            Choose your route
          </p>
          <h2 className="max-w-lg text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Web, mobile, or CI.{" "}
            <span className="text-gradient-brand">Same SecURL engine.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
            The site should get you to the right product surface quickly: instant web scan,
            phone-first monitoring, Android installs, or the package developers are already pulling.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-xl">
            {proof.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-4"
              >
                <p className="text-2xl font-black tracking-[-0.04em] text-white">{item.value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-1 text-xs text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {routes.map(({ Icon, title, body, href, cta, mode, format }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => recordFunnelHandoff({ target: href, mode, format })}
              className="group relative min-h-56 overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-white/[0.04] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#b56a2c]/35 hover:bg-[#b56a2c]/[0.08]"
              style={{
                boxShadow: "0 24px 60px -36px rgba(0,0,0,0.65)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: "rgba(181,106,44,0.16)", filter: "blur(18px)" }}
              />
              <div
                className="relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{
                  background: "rgba(181,106,44,0.12)",
                  border: "1px solid rgba(181,106,44,0.24)",
                }}
              >
                <Icon className="h-5 w-5 text-[#d89a63]" strokeWidth={1.7} />
              </div>
              <h3 className="relative text-lg font-bold tracking-[-0.03em] text-white">{title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-400">{body}</p>
              <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#d89a63] transition-colors group-hover:text-[#f0d5bc]">
                {cta}
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}

          <div className="rounded-[1.75rem] border border-emerald-300/[0.14] bg-emerald-400/[0.055] p-6 sm:col-span-2">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10">
                  <BellDot className="h-5 w-5 text-emerald-200" strokeWidth={1.7} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-[-0.03em] text-white">
                    Three focused iOS apps, one backend.
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                    Use SecURL for full posture, Header Watch for header regression monitoring,
                    and Cert Watch for certificate expiry alerts.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {appStoreLinks.map((app) => (
                  <a
                    key={app.label}
                    href={app.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      recordFunnelHandoff({
                        target: app.href,
                        mode: `landing:ios_${app.label.toLowerCase().replace(/\s+/g, "_")}`,
                        format: "app_store",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3.5 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-emerald-200/30 hover:bg-emerald-300/10"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-200" />
                    {app.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
