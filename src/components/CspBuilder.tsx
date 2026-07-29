import { BellRing, Check, Clipboard, ExternalLink, ShieldAlert, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { buildScannerUrl, recordFunnelHandoff, recordPlaygroundAction } from "../lib/telemetry";
import { Footer } from "./Footer";

type Policy = Record<string, string>;
type PresetKey = "balanced" | "strict" | "spa";
type SnippetKey = "header" | "nginx" | "apache" | "cloudflare" | "vercel";

const PRESETS: Record<PresetKey, { name: string; description: string; policy: Policy }> = {
  balanced: {
    name: "Balanced web app",
    description: "A practical same-origin baseline with HTTPS images, fonts, APIs and frames blocked.",
    policy: {
      "default-src": "'self'",
      "script-src": "'self'",
      "style-src": "'self' 'unsafe-inline'",
      "img-src": "'self' data: https:",
      "font-src": "'self' data: https:",
      "connect-src": "'self' https:",
      "object-src": "'none'",
      "base-uri": "'self'",
      "form-action": "'self'",
      "frame-ancestors": "'none'",
      "upgrade-insecure-requests": "",
    },
  },
  strict: {
    name: "Strict baseline",
    description: "No inline code, plugins, framing or cross-origin loading. Best for simple sites.",
    policy: {
      "default-src": "'self'",
      "script-src": "'self'",
      "style-src": "'self'",
      "img-src": "'self'",
      "font-src": "'self'",
      "connect-src": "'self'",
      "object-src": "'none'",
      "base-uri": "'none'",
      "form-action": "'self'",
      "frame-ancestors": "'none'",
      "upgrade-insecure-requests": "",
    },
  },
  spa: {
    name: "Modern SPA",
    description: "A starting point for apps with API calls, data images and HTTPS asset hosts.",
    policy: {
      "default-src": "'self'",
      "script-src": "'self'",
      "style-src": "'self' 'unsafe-inline'",
      "img-src": "'self' data: blob: https:",
      "font-src": "'self' data: https:",
      "connect-src": "'self' https: wss:",
      "worker-src": "'self' blob:",
      "object-src": "'none'",
      "base-uri": "'self'",
      "form-action": "'self'",
      "frame-ancestors": "'none'",
      "upgrade-insecure-requests": "",
    },
  },
};

const DIRECTIVES = [
  ["default-src", "Fallback for resource types without a more specific rule."],
  ["script-src", "Controls JavaScript sources. Avoid unsafe-inline and unsafe-eval."],
  ["style-src", "Controls CSS sources. Replace unsafe-inline with nonces or hashes when possible."],
  ["img-src", "Controls image sources, including data: and blob: URLs."],
  ["font-src", "Controls font downloads."],
  ["connect-src", "Controls fetch, XHR, EventSource and WebSocket destinations."],
  ["worker-src", "Controls workers and service workers."],
  ["object-src", "Controls plugin content. Most sites should use 'none'."],
  ["base-uri", "Restricts the document base URL and blocks base-tag injection."],
  ["form-action", "Restricts where forms can submit."],
  ["frame-ancestors", "Controls which sites may frame this page."],
] as const;

function policyHeader(policy: Policy) {
  return Object.entries(policy)
    .filter(([, value]) => value !== undefined)
    .map(([directive, value]) => `${directive}${value ? ` ${value.trim()}` : ""}`)
    .join("; ");
}

function warningsFor(policy: Policy) {
  const warnings: string[] = [];
  if (!policy["default-src"]) warnings.push("Add default-src so unlisted resource types fail closed.");
  if (policy["script-src"]?.includes("'unsafe-eval'")) warnings.push("script-src allows unsafe-eval, which weakens script injection protection.");
  if (policy["script-src"]?.includes("'unsafe-inline'")) warnings.push("script-src allows unsafe-inline. Prefer nonces or hashes.");
  if (policy["script-src"]?.includes("*")) warnings.push("script-src contains a wildcard source.");
  if (!policy["object-src"]) warnings.push("Add object-src 'none' to disable legacy plugin content.");
  if (!policy["base-uri"]) warnings.push("Add base-uri to reduce base-tag injection risk.");
  if (!policy["frame-ancestors"]) warnings.push("Add frame-ancestors to define framing policy.");
  if (!policy["form-action"]) warnings.push("Add form-action to constrain form submissions.");
  if (policy["frame-ancestors"]?.includes("*")) warnings.push("frame-ancestors allows every origin.");
  return warnings;
}

function snippetFor(kind: SnippetKey, header: string) {
  if (kind === "nginx") return `add_header Content-Security-Policy "${header}" always;`;
  if (kind === "apache") return `Header always set Content-Security-Policy "${header}"`;
  if (kind === "cloudflare") return `response.headers.set("Content-Security-Policy", "${header}");`;
  if (kind === "vercel") {
    return JSON.stringify({
      headers: [{
        source: "/(.*)",
        headers: [{ key: "Content-Security-Policy", value: header }],
      }],
    }, null, 2);
  }
  return `Content-Security-Policy: ${header}`;
}

export function CspBuilder() {
  const [policy, setPolicy] = useState<Policy>(PRESETS.balanced.policy);
  const [preset, setPreset] = useState<PresetKey>("balanced");
  const [snippet, setSnippet] = useState<SnippetKey>("header");
  const [copied, setCopied] = useState(false);
  const [target, setTarget] = useState("");
  const header = useMemo(() => policyHeader(policy), [policy]);
  const warnings = useMemo(() => warningsFor(policy), [policy]);
  const output = useMemo(() => snippetFor(snippet, header), [header, snippet]);

  useEffect(() => {
    document.title = "Free CSP Builder — Generate a Content Security Policy | SecURL";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (description) description.content = "Build a Content-Security-Policy visually, catch unsafe allowances, and copy deployment-ready CSP headers for Nginx, Apache, Cloudflare and Vercel.";
    if (canonical) canonical.href = "https://securl.online/tools/csp-builder";
    recordPlaygroundAction("loaded");
  }, []);

  const applyPreset = (key: PresetKey) => {
    setPreset(key);
    setPolicy({ ...PRESETS[key].policy });
    recordPlaygroundAction("preset", key);
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    recordPlaygroundAction("copied", snippet);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const scannerUrl = (() => {
    try {
      return buildScannerUrl(target ? new URL(target.includes("://") ? target : `https://${target}`).toString() : undefined);
    } catch {
      return buildScannerUrl();
    }
  })();
  const normalizedTarget = (() => {
    if (!target) return null;
    try {
      return new URL(target.includes("://") ? target : `https://${target}`).toString();
    } catch {
      return null;
    }
  })();
  const headerWatchUrl = normalizedTarget
    ? `headerwatch://add?url=${encodeURIComponent(normalizedTarget)}`
    : "https://apps.apple.com/app/header-watch/id6774599437";

  return (
    <div className="noise min-h-screen bg-[#070b14]">
      <header className="glass-heavy sticky top-0 z-50 border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#b56a2c] to-[#d89a63]">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="text-lg font-black tracking-[-0.04em] text-white">Sec<span className="text-gradient-brand">URL</span></span>
          </a>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 sm:inline">Developer tools</span>
            <a href="/" className="text-sm font-semibold text-slate-300 hover:text-white">Run a full scan →</a>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d89a63]/25 bg-[#b56a2c]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#e9b98e]">
              <ShieldCheck className="h-3.5 w-3.5" /> Free, local and private
            </div>
            <h1 className="text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Build a CSP you can <span className="text-gradient-brand">actually ship.</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400 sm:text-xl">
              Start from a secure policy, adjust each directive, catch dangerous allowances, then copy the exact header for your stack. Your policy never leaves this browser.
            </p>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
          <div className="space-y-6">
            <div className="glass rounded-3xl p-5 sm:p-7">
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d89a63]">1 · Choose a starting point</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Secure presets, not empty boxes</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {(Object.keys(PRESETS) as PresetKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className={`rounded-2xl border p-4 text-left transition ${preset === key ? "border-[#d89a63]/70 bg-[#b56a2c]/15" : "border-white/10 bg-white/[0.025] hover:border-white/20"}`}
                  >
                    <span className="font-bold text-white">{PRESETS[key].name}</span>
                    <span className="mt-2 block text-sm leading-5 text-slate-500">{PRESETS[key].description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-5 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d89a63]">2 · Shape the policy</p>
              <div className="mt-5 space-y-5">
                {DIRECTIVES.map(([directive, help]) => (
                  <label key={directive} className="block">
                    <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                      <span className="font-mono text-sm font-semibold text-white">{directive}</span>
                      <span className="text-xs text-slate-600">{help}</span>
                    </span>
                    <input
                      value={policy[directive] ?? ""}
                      onChange={(event) => {
                        setPreset("balanced");
                        setPolicy((current) => ({ ...current, [directive]: event.target.value }));
                      }}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#090f1b] px-4 py-3 font-mono text-sm text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-[#d89a63]/60 focus:ring-2 focus:ring-[#b56a2c]/15"
                      placeholder={directive === "object-src" ? "'none'" : "'self' https://trusted.example"}
                      spellCheck={false}
                    />
                  </label>
                ))}
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                  <input
                    type="checkbox"
                    checked={Object.hasOwn(policy, "upgrade-insecure-requests")}
                    onChange={(event) => setPolicy((current) => {
                      const next = { ...current };
                      if (event.target.checked) next["upgrade-insecure-requests"] = "";
                      else delete next["upgrade-insecure-requests"];
                      return next;
                    })}
                    className="mt-1 h-4 w-4 accent-[#b56a2c]"
                  />
                  <span><strong className="text-sm text-white">Upgrade insecure requests</strong><span className="mt-1 block text-xs text-slate-500">Ask the browser to rewrite HTTP subresources to HTTPS.</span></span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="glass-heavy rounded-3xl p-5 shadow-2xl shadow-black/30 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d89a63]">3 · Copy and deploy</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Your policy</h2>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${warnings.length ? "bg-amber-400/10 text-amber-300" : "bg-emerald-400/10 text-emerald-300"}`}>
                  {warnings.length ? `${warnings.length} to review` : "Strong baseline"}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {(["header", "nginx", "apache", "cloudflare", "vercel"] as SnippetKey[]).map((key) => (
                  <button key={key} onClick={() => setSnippet(key)} className={`rounded-lg px-3 py-2 text-xs font-bold capitalize ${snippet === key ? "bg-[#b56a2c] text-white" : "bg-white/[0.05] text-slate-400 hover:text-white"}`}>
                    {key}
                  </button>
                ))}
              </div>

              <div className="relative mt-4">
                <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-white/10 bg-[#050913] p-4 pr-12 font-mono text-xs leading-6 text-slate-300">{output}</pre>
                <button onClick={copyOutput} aria-label="Copy generated CSP" className="absolute right-3 top-3 rounded-lg border border-white/10 bg-white/[0.07] p-2 text-slate-300 hover:bg-white/[0.12] hover:text-white">
                  {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Clipboard className="h-4 w-4" />}
                </button>
              </div>

              {warnings.length ? (
                <div className="mt-5 space-y-2">
                  {warnings.map((warning) => (
                    <div key={warning} className="flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[0.06] p-3 text-sm leading-5 text-amber-100/80">
                      <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" /> {warning}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 flex gap-3 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.06] p-4 text-sm text-emerald-100/80">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-300" /> No obvious high-risk allowances detected. Test in Report-Only mode before enforcement.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-[#d89a63]/25 bg-gradient-to-br from-[#b56a2c]/20 to-white/[0.03] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#e9b98e]">Don’t stop at syntax</p>
              <h2 className="mt-2 text-2xl font-bold text-white">Verify what the public site serves.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">Deploy your policy, then let SecURL check the live CSP alongside TLS, headers, DNS trust and external exposure.</p>
              <input value={target} onChange={(event) => setTarget(event.target.value)} className="mt-5 w-full rounded-xl border border-white/10 bg-[#090f1b] px-4 py-3 text-sm text-white outline-none focus:border-[#d89a63]/60" placeholder="example.com" inputMode="url" />
              <a
                href={scannerUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  recordPlaygroundAction("scanner_handoff");
                  recordFunnelHandoff({ target: target || "https://app.securl.online", mode: "csp_builder:scan", format: "web_app" });
                }}
                className="btn-glow mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#b56a2c] px-5 py-3.5 text-sm font-bold text-white"
              >
                Scan the deployed policy <ExternalLink className="h-4 w-4" />
              </a>
              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="flex gap-3">
                  <BellRing className="mt-0.5 h-5 w-5 shrink-0 text-[#d89a63]" />
                  <div>
                    <p className="text-sm font-bold text-white">Keep the policy from silently drifting.</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Header Watch opens with this target pre-filled. Saving the watch still requires your tap.
                    </p>
                  </div>
                </div>
                <a
                  href={headerWatchUrl}
                  onClick={() =>
                    recordFunnelHandoff({
                      target: normalizedTarget ?? "https://apps.apple.com/app/header-watch/id6774599437",
                      mode: "csp_builder:header_watch",
                      format: "header_watch_app",
                    })
                  }
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#d89a63]/35 bg-[#b56a2c]/10 px-5 py-3 text-sm font-bold text-[#f0d5bc] transition hover:bg-[#b56a2c]/20 hover:text-white"
                >
                  Watch this policy for drift
                </a>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                  <a
                    href="https://apps.apple.com/app/header-watch/id6774599437"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => recordFunnelHandoff({ target: "https://apps.apple.com/app/header-watch/id6774599437", mode: "csp_builder:header_watch_install", format: "app_store" })}
                    className="hover:text-slate-300"
                  >
                    Install on iPhone ↗
                  </a>
                  <a
                    href="/downloads"
                    onClick={() => recordFunnelHandoff({ target: "https://securl.online/downloads", mode: "csp_builder:header_watch_android", format: "android_apk" })}
                    className="hover:text-slate-300"
                  >
                    Android downloads →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
