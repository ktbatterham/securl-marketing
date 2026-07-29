import { ArrowRight, ExternalLink, ShieldCheck, TerminalSquare } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { recordPlaygroundAction } from "../lib/telemetry";
import { Footer } from "./Footer";

const BUILDER_URL = "/tools/csp-builder?utm_source=securl_guide&utm_medium=content&utm_campaign=csp_rollout_guide";

function BuilderLink({ placement, children }: { placement: string; children: ReactNode }) {
  return (
    <a
      href={BUILDER_URL}
      onClick={() => recordPlaygroundAction("guide_handoff", placement, "csp_guide")}
      className="btn-glow inline-flex items-center justify-center gap-2 rounded-xl bg-[#b56a2c] px-5 py-3.5 text-sm font-bold text-white"
    >
      {children} <ArrowRight className="h-4 w-4" />
    </a>
  );
}

export function CspGuide() {
  useEffect(() => {
    document.title = "How to Roll Out CSP Without Breaking Production | SecURL";
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (description) {
      description.content = "A practical Content-Security-Policy rollout: choose nonces or hashes, start in Report-Only, remove unsafe allowances, deploy, and verify the public header.";
    }
    if (canonical) canonical.href = "https://securl.online/guides/content-security-policy/";
    recordPlaygroundAction("loaded", "article", "csp_guide");
  }, []);

  return (
    <div className="noise min-h-screen bg-[#070b14] text-slate-300">
      <header className="glass-heavy sticky top-0 z-50 border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#b56a2c] to-[#d89a63]">
              <ShieldCheck className="h-4 w-4 text-white" />
            </span>
            <span className="text-lg font-black tracking-[-0.04em] text-white">Sec<span className="text-gradient-brand">URL</span></span>
          </a>
          <a
            href={BUILDER_URL}
            onClick={() => recordPlaygroundAction("guide_handoff", "header", "csp_guide")}
            className="text-sm font-semibold text-slate-300 hover:text-white"
          >
            Open the CSP Builder →
          </a>
        </div>
      </header>

      <main>
        <article className="mx-auto max-w-3xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d89a63]/25 bg-[#b56a2c]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#e9b98e]">
            Practical web security · 8 minute read
          </div>
          <h1 className="text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
            How to roll out CSP without breaking production
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-400">
            Content-Security-Policy can materially reduce the impact of script injection, but a policy copied straight into enforcement can also block your own application. The useful path is controlled: model, observe, repair, enforce, and verify.
          </p>

          <div className="my-10 rounded-3xl border border-[#d89a63]/25 bg-gradient-to-br from-[#b56a2c]/20 to-white/[0.03] p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#e9b98e]">Build while you read</p>
            <p className="mt-3 text-lg leading-7 text-slate-300">The SecURL CSP Builder generates policies locally, points out obvious unsafe allowances, and gives you deployment-ready snippets.</p>
            <div className="mt-5"><BuilderLink placement="hero">Build your policy</BuilderLink></div>
          </div>

          <section className="space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-white">1. Decide whether scripts need nonces or hashes</h2>
            <p className="leading-7">
              A strict CSP trusts scripts using a cryptographic nonce or hash instead of maintaining a long list of permitted hosts. Generate a fresh, unpredictable nonce for every dynamically rendered response. For static HTML, hashes are usually the more practical choice, but they must be updated when script contents change.
            </p>
            <p className="leading-7">
              CSP is defence in depth, not a replacement for preventing and fixing cross-site scripting vulnerabilities.
            </p>
          </section>

          <section className="mt-12 space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-white">2. Start with a narrow baseline</h2>
            <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-[#050913] p-5 font-mono text-sm leading-7 text-slate-300">{`Content-Security-Policy-Report-Only:
  default-src 'self';
  script-src 'nonce-{RANDOM}' 'strict-dynamic';
  object-src 'none';
  base-uri 'none';
  frame-ancestors 'none';
  form-action 'self';
  upgrade-insecure-requests;
  report-to csp-endpoint`}</pre>
            <p className="leading-7">
              This is a shape, not a paste-ready universal policy. Your asset, API, image, font, worker, and framing requirements determine the remaining directives. Replace the nonce placeholder on every response; never ship a fixed nonce.
            </p>
          </section>

          <section className="mt-12 space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-white">3. Observe before enforcing</h2>
            <p className="leading-7">
              Serve the candidate as <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[#e9b98e]">Content-Security-Policy-Report-Only</code>. The browser observes violations without blocking resources. Exercise real user paths, review browser-console output, and send reports to a controlled endpoint using the Reporting API.
            </p>
            <p className="leading-7">
              Do not blindly permit every reported origin. Reports can expose unused code, browser extensions, injected content, or third parties that deserve removal rather than permanent trust.
            </p>
          </section>

          <section className="mt-12 space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-white">4. Remove shortcuts that erase protection</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["unsafe-inline in script-src", "Prefer nonces or hashes. Broadly permitting inline execution gives injected script an easier path."],
                ["unsafe-eval", "Refactor dependencies or build settings that rely on string-to-code evaluation before enforcing."],
                ["Wildcard script hosts", "A broad allowlist may trust origins that host attacker-controlled content."],
                ["Missing object-src and base-uri", "Block legacy embeds and constrain base URL manipulation explicitly."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-12 space-y-5">
            <h2 className="text-3xl font-bold tracking-tight text-white">5. Enforce, then verify the public response</h2>
            <p className="leading-7">
              Once legitimate violations are resolved, move the proven policy to the enforcing <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[#e9b98e]">Content-Security-Policy</code> header. Keep a stricter candidate in Report-Only while you iterate.
            </p>
            <p className="leading-7">
              Finally, check the response served at the public edge—not just an application configuration file. CDNs, reverse proxies, route-specific middleware, and stale deploys can all change what browsers receive.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <div className="flex gap-3">
                <TerminalSquare className="mt-1 h-5 w-5 shrink-0 text-[#d89a63]" />
                <div>
                  <p className="font-bold text-white">The completion loop</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Build locally → deploy Report-Only → observe real paths → repair violations → enforce → scan the public URL.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-2xl font-bold text-white">Primary references</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a className="inline-flex items-center gap-1 text-[#e9b98e] hover:text-white" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP" target="_blank" rel="noopener noreferrer">MDN: Content Security Policy guide <ExternalLink className="h-3.5 w-3.5" /></a></li>
              <li><a className="inline-flex items-center gap-1 text-[#e9b98e] hover:text-white" href="https://web.dev/articles/strict-csp" target="_blank" rel="noopener noreferrer">web.dev: Mitigate XSS with a strict CSP <ExternalLink className="h-3.5 w-3.5" /></a></li>
              <li><a className="inline-flex items-center gap-1 text-[#e9b98e] hover:text-white" href="https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html" target="_blank" rel="noopener noreferrer">OWASP Content Security Policy Cheat Sheet <ExternalLink className="h-3.5 w-3.5" /></a></li>
            </ul>
          </section>

          <div className="mt-14 rounded-3xl border border-[#d89a63]/25 bg-[#b56a2c]/10 p-6 text-center sm:p-8">
            <h2 className="text-2xl font-bold text-white">Build the policy, then verify reality.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">The builder keeps your policy local. The scanner checks the CSP and surrounding public posture your deployment actually serves.</p>
            <div className="mt-6"><BuilderLink placement="footer">Open the free CSP Builder</BuilderLink></div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
