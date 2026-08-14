import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Link2, Search, ShieldAlert, TriangleAlert } from "lucide-react";
import { Footer } from "./Footer";
import { recordFunnelHandoff, recordPlaygroundAction } from "../lib/telemetry";

const API_BASE_URL = "https://securl-app-production.up.railway.app";
const OWNER_KEY = "securl-link-check-owner";

type DigestPayload = {
  scan?: { id?: string; status?: string; url?: string };
  digest?: {
    target?: { finalUrl?: string; host?: string };
    posture?: { score?: number; grade?: string; summary?: string };
    findings?: {
      bySeverity?: { critical?: number; warning?: number };
      top?: Array<{ title?: string; detail?: string }>;
    };
    signalClarity?: { headline?: string };
    controls?: { tls?: { available?: boolean; valid?: boolean } };
  } | null;
};

function getOwnerToken() {
  const existing = window.localStorage.getItem(OWNER_KEY);
  if (existing) return existing;
  const created = `${crypto.randomUUID()}-${crypto.randomUUID()}`;
  window.localStorage.setItem(OWNER_KEY, created);
  return created;
}

function normalizeInput(value: string) {
  const trimmed = value.trim();
  return !trimmed || /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

const wait = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export function LinkChecker() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "complete" | "failed">("idle");
  const [payload, setPayload] = useState<DigestPayload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Check a Link Before You Open It | SecURL";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "Inspect a public link with a passive SecURL posture check before opening it in your browser.",
    );
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://securl.online/check-link";
    recordPlaygroundAction("loaded", undefined, "link_check");
  }, []);

  const digest = payload?.digest;
  const scanId = payload?.scan?.id;
  const reportUrl = scanId
    ? `https://app.securl.online/report/${encodeURIComponent(scanId)}?utm_source=before_you_click&utm_medium=web&utm_campaign=link_check_report`
    : "";
  const hasAttention = (digest?.findings?.bySeverity?.critical ?? 0) > 0
    || (digest?.findings?.bySeverity?.warning ?? 0) > 0;

  async function checkLink(event: React.FormEvent) {
    event.preventDefault();
    const url = normalizeInput(input);
    if (!url) return;
    setStatus("checking");
    setPayload(null);
    setError("");
    recordPlaygroundAction("submitted", undefined, "link_check");

    try {
      const headers = {
        "Content-Type": "application/json",
        "X-Scan-Owner": getOwnerToken(),
        "X-SecURL-Client": "securl-link-checker",
        "X-SecURL-Client-Version": "1.0.0",
      };
      const response = await fetch(`${API_BASE_URL}/api/link-checks`, {
        method: "POST",
        headers,
        body: JSON.stringify({ url }),
      });
      const created = await response.json();
      if (!response.ok || !created?.scan?.id) throw new Error(created?.error || "The link could not be checked.");

      for (let attempt = 0; attempt < 75; attempt += 1) {
        const result = await fetch(`${API_BASE_URL}${created.resources.digest}`, { headers });
        const next = await result.json() as DigestPayload & { error?: string };
        if (!result.ok) throw new Error(next.error || "The result could not be read.");
        if (next.scan?.status === "failed") throw new Error("The target did not return enough public evidence to complete the check.");
        if (next.scan?.status === "completed" && next.digest) {
          setPayload(next);
          setStatus("complete");
          recordPlaygroundAction("completed", undefined, "link_check");
          return;
        }
        await wait(800);
      }
      throw new Error("The check is taking longer than expected. Please try again.");
    } catch (caught) {
      setStatus("failed");
      setError(caught instanceof Error ? caught.message : "The link could not be checked.");
      recordPlaygroundAction("failed", undefined, "link_check");
    }
  }

  return (
    <div className="noise min-h-screen bg-[#070b14] text-slate-100">
      <header className="border-b border-white/10 bg-[#070b14]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="text-lg font-black tracking-[-0.04em] text-white">Sec<span className="text-gradient-brand">URL</span></a>
          <a href="/tools/csp-builder" className="text-sm text-slate-400 hover:text-white">Build a CSP</a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <section className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#b56a2c]/30 bg-[#b56a2c]/10">
            <Link2 className="h-7 w-7 text-[#d89a63]" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d89a63]">Before you click</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-6xl">Check the link without opening it</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Paste a public URL. SecURL inspects what the site exposes from the outside and returns a compact, evidence-based posture check.
          </p>

          <form onSubmit={checkLink} className="glass-heavy mt-10 rounded-2xl p-3 sm:flex sm:gap-3">
            <label className="sr-only" htmlFor="link-to-check">Public link</label>
            <input
              id="link-to-check"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Paste a link, for example example.com/login"
              inputMode="url"
              autoCapitalize="none"
              autoCorrect="off"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-base text-white outline-none placeholder:text-slate-600 focus:border-[#b56a2c]/70"
            />
            <button type="submit" disabled={status === "checking" || !input.trim()} className="btn-glow mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#b56a2c] px-6 py-3.5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0 sm:w-auto">
              {status === "checking" ? <><Search className="h-4 w-4 animate-pulse" /> Checking</> : <>Check before opening <ArrowRight className="h-4 w-4" /></>}
            </button>
          </form>
          <p className="mt-4 text-xs leading-5 text-slate-600">Passive checks only. We do not open the target in your browser, submit credentials, exploit it, or claim that any link is completely safe.</p>
        </section>

        {status === "checking" && (
          <section className="glass mt-10 rounded-2xl p-7 text-center" aria-live="polite">
            <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#b56a2c] border-t-transparent" />
            <p className="mt-4 font-semibold text-white">Reading the public evidence</p>
            <p className="mt-1 text-sm text-slate-500">Following redirects, checking TLS, headers, DNS trust and visible third parties.</p>
          </section>
        )}

        {status === "failed" && (
          <section className="mt-10 rounded-2xl border border-rose-400/20 bg-rose-400/5 p-7" aria-live="polite">
            <div className="flex items-start gap-3"><ShieldAlert className="mt-0.5 h-5 w-5 text-rose-300" /><div><h2 className="font-bold text-white">We could not complete that check</h2><p className="mt-1 text-sm text-slate-400">{error}</p></div></div>
          </section>
        )}

        {status === "complete" && digest && (
          <section className="glass-heavy mt-10 overflow-hidden rounded-3xl" aria-live="polite">
            <div className="border-b border-white/10 p-7 sm:flex sm:items-start sm:justify-between sm:gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                  {hasAttention ? <TriangleAlert className="h-4 w-4 text-amber-300" /> : <CheckCircle2 className="h-4 w-4 text-emerald-300" />}
                  Public posture result
                </div>
                <h2 className="mt-3 text-2xl font-black text-white">{digest.signalClarity?.headline || digest.posture?.summary || "Check complete"}</h2>
                <p className="mt-2 break-all text-sm text-slate-500">{digest.target?.finalUrl || payload.scan?.url}</p>
              </div>
              <div className="mt-5 flex items-baseline gap-2 sm:mt-0"><span className="text-5xl font-black text-[#d89a63]">{digest.posture?.grade || "?"}</span><span className="text-sm text-slate-500">{digest.posture?.score ?? 0}/100</span></div>
            </div>

            <div className="grid gap-6 p-7 sm:grid-cols-3">
              <Metric label="Critical findings" value={digest.findings?.bySeverity?.critical ?? 0} />
              <Metric label="Warnings" value={digest.findings?.bySeverity?.warning ?? 0} />
              <Metric label="TLS observed" value={digest.controls?.tls?.available ? (digest.controls.tls.valid ? "Valid" : "Issue") : "Unknown"} />
            </div>

            {(digest.findings?.top?.length ?? 0) > 0 && (
              <div className="border-t border-white/10 px-7 py-6">
                <h3 className="text-sm font-bold text-white">What stood out</h3>
                <ul className="mt-3 space-y-3">
                  {digest.findings?.top?.slice(0, 3).map((finding, index) => <li key={`${finding.title}-${index}`} className="text-sm text-slate-400"><span className="font-semibold text-slate-200">{finding.title}</span>{finding.detail ? `: ${finding.detail}` : ""}</li>)}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.02] p-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-xs leading-5 text-slate-500">This result covers externally visible posture. It is not malware analysis, reputation intelligence, or a guarantee that opening the link is risk-free.</p>
              <a href={reportUrl} onClick={() => recordFunnelHandoff({ target: digest.target?.finalUrl || null, mode: "link_check:full_report", format: "web_report" })} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#b56a2c] px-5 py-3 text-sm font-bold text-white hover:bg-[#9d5a23]">View full evidence <ExternalLink className="h-4 w-4" /></a>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div><p className="text-xs font-bold uppercase tracking-wider text-slate-600">{label}</p><p className="mt-2 text-2xl font-black text-white">{value}</p></div>;
}
