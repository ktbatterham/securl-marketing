import { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, CornerDownRight, Link2, Search, ShieldAlert } from "lucide-react";
import { Footer } from "./Footer";
import { recordFunnelHandoff, recordPlaygroundAction } from "../lib/telemetry";

const API_BASE_URL = "https://securl-app-production.up.railway.app";
const OWNER_KEY = "securl-link-check-owner";

type LinkSignal = { id: string; level: "info" | "attention" | "high"; title: string; detail: string };
type LinkInspection = {
  normalizedUrl: string;
  destinationUrl: string | null;
  verdict: { level: "no_obvious_concern" | "review" | "high_attention" | "blocked"; title: string; summary: string };
  input: { hostname: string; unicodeHostname: string; scheme: string; port: string | null };
  redirects: Array<{ position: number; url: string; hostname: string; statusCode: number; originChanged: boolean; downgradedToHttp: boolean }>;
  response: { statusCode: number; contentType: string | null; contentLength: string | null; contentDisposition: string | null } | null;
  signals: LinkSignal[];
  limitations: string[];
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

export function LinkChecker() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "complete" | "failed">("idle");
  const [inspection, setInspection] = useState<LinkInspection | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Trace a Link Before You Open It | SecURL";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Reveal a public link's real destination, redirect chain and deceptive URL characteristics without opening it in your browser.");
    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = "https://securl.online/check-link";
    recordPlaygroundAction("loaded", undefined, "link_check");
  }, []);

  async function checkLink(event: React.FormEvent) {
    event.preventDefault();
    const url = normalizeInput(input);
    if (!url) return;
    setStatus("checking");
    setInspection(null);
    setError("");
    recordPlaygroundAction("submitted", undefined, "link_check");
    try {
      const response = await fetch(`${API_BASE_URL}/api/link-checks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Scan-Owner": getOwnerToken(),
          "X-SecURL-Client": "securl-link-checker",
          "X-SecURL-Client-Version": "2.0.0",
        },
        body: JSON.stringify({ url }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.inspection) throw new Error(payload?.error || "The link could not be inspected.");
      setInspection(payload.inspection);
      setStatus("complete");
      recordPlaygroundAction("completed", undefined, "link_check");
    } catch (caught) {
      setStatus("failed");
      setError(caught instanceof Error ? caught.message : "The link could not be inspected.");
      recordPlaygroundAction("failed", undefined, "link_check");
    }
  }

  const destination = inspection?.destinationUrl ? new URL(inspection.destinationUrl) : null;
  const scanUrl = inspection?.destinationUrl
    ? `https://app.securl.online/?utm_source=before_you_click&utm_medium=web&utm_campaign=link_check_posture&url=${encodeURIComponent(inspection.destinationUrl)}`
    : null;

  return (
    <div className="noise min-h-screen bg-[#070b14] text-slate-100">
      <header className="border-b border-white/10 bg-[#070b14]/85 backdrop-blur-xl"><div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"><a href="/" className="text-lg font-black tracking-[-0.04em] text-white">Sec<span className="text-gradient-brand">URL</span></a><a href="/tools/csp-builder" className="text-sm text-slate-400 hover:text-white">Build a CSP</a></div></header>
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <section className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#b56a2c]/30 bg-[#b56a2c]/10"><Link2 className="h-7 w-7 text-[#d89a63]" /></div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d89a63]">Before you click</p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.045em] text-white sm:text-6xl">See where a link really goes</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">Paste the exact public URL. SecURL reveals its redirect path, final destination, response type and URL characteristics worth checking.</p>
          <form onSubmit={checkLink} className="glass-heavy mt-10 rounded-2xl p-3 sm:flex sm:gap-3">
            <label className="sr-only" htmlFor="link-to-check">Exact public link</label>
            <input id="link-to-check" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Paste the full link from the message" inputMode="url" autoCapitalize="none" autoCorrect="off" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-base text-white outline-none placeholder:text-slate-600 focus:border-[#b56a2c]/70" />
            <button type="submit" disabled={status === "checking" || !input.trim()} className="btn-glow mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#b56a2c] px-6 py-3.5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0 sm:w-auto">{status === "checking" ? <><Search className="h-4 w-4 animate-pulse" /> Tracing</> : <>Trace this link <ArrowRight className="h-4 w-4" /></>}</button>
          </form>
          <p className="mt-4 text-xs leading-5 text-slate-600">The checker makes passive public requests from SecURL's server. It does not open the page in your browser, run scripts, download files or submit information.</p>
        </section>

        {status === "checking" && <section className="glass mt-10 rounded-2xl p-7 text-center" aria-live="polite"><div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#b56a2c] border-t-transparent" /><p className="mt-4 font-semibold text-white">Following the link safely</p><p className="mt-1 text-sm text-slate-500">Checking the exact URL, each redirect hop and the final response.</p></section>}
        {status === "failed" && <section className="mt-10 rounded-2xl border border-rose-400/20 bg-rose-400/5 p-7" aria-live="polite"><div className="flex items-start gap-3"><ShieldAlert className="mt-0.5 h-5 w-5 text-rose-300" /><div><h2 className="font-bold text-white">We could not inspect that link</h2><p className="mt-1 text-sm text-slate-400">{error}</p></div></div></section>}

        {status === "complete" && inspection && (
          <section className="glass-heavy mt-10 overflow-hidden rounded-3xl" aria-live="polite">
            <div className="border-b border-white/10 p-7 sm:flex sm:items-start sm:justify-between sm:gap-6">
              <div className="max-w-2xl"><div className="flex items-center gap-2 text-sm font-semibold text-slate-400">{inspection.verdict.level === "no_obvious_concern" ? <CheckCircle2 className="h-4 w-4 text-emerald-300" /> : <AlertTriangle className="h-4 w-4 text-amber-300" />}Link inspection result</div><h2 className="mt-3 text-2xl font-black text-white">{inspection.verdict.title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{inspection.verdict.summary}</p></div>
              <div className="mt-5 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-right sm:mt-0"><p className="text-xs uppercase tracking-wider text-slate-600">Final host</p><p className="mt-1 break-all font-bold text-[#d89a63]">{destination?.hostname || "Not contacted"}</p></div>
            </div>

            <div className="grid gap-4 border-b border-white/10 p-7 sm:grid-cols-3"><Metric label="Redirects" value={Math.max(0, inspection.redirects.length - 1)} /><Metric label="Final response" value={inspection.response?.statusCode ?? "Blocked"} /><Metric label="Response type" value={inspection.response?.contentType?.split(";")[0] || "Not observed"} /></div>

            {inspection.redirects.length > 0 && <div className="border-b border-white/10 px-7 py-6"><h3 className="text-sm font-bold text-white">Where it goes</h3><ol className="mt-4 space-y-3">{inspection.redirects.map((hop) => <li key={`${hop.position}-${hop.url}`} className="flex gap-3"><div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-xs font-bold text-slate-500">{hop.position}</div><div className="min-w-0"><p className="break-all text-sm font-semibold text-slate-200">{hop.url}</p><p className="mt-1 flex items-center gap-1 text-xs text-slate-600"><CornerDownRight className="h-3 w-3" /> HTTP {hop.statusCode}{hop.originChanged ? " · changes site" : ""}{hop.downgradedToHttp ? " · drops HTTPS" : ""}</p></div></li>)}</ol></div>}

            <div className="border-b border-white/10 px-7 py-6"><h3 className="text-sm font-bold text-white">What to notice</h3>{inspection.signals.length ? <ul className="mt-4 space-y-3">{inspection.signals.map((item) => <li key={item.id} className="rounded-xl border border-white/8 bg-white/[0.025] p-4"><div className="flex items-start gap-3">{item.level === "high" ? <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" /> : item.level === "attention" ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" /> : <CornerDownRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />}<div><p className="text-sm font-semibold text-slate-200">{item.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</p></div></div></li>)}</ul> : <p className="mt-3 text-sm text-slate-500">No encoded hostname, hidden destination, unusual port, attachment response or concerning redirect change was observed.</p>}</div>

            <div className="flex flex-col gap-4 bg-white/[0.02] p-7 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-xs leading-5 text-slate-500">{inspection.limitations.join(" ")}</p>{scanUrl && <a href={scanUrl} onClick={() => recordFunnelHandoff({ target: inspection.destinationUrl, mode: "link_check:destination_posture", format: "web_report" })} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#b56a2c]/40 px-5 py-3 text-sm font-bold text-[#d89a63] hover:bg-[#b56a2c]/10">Scan destination posture <ArrowRight className="h-4 w-4" /></a>}</div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return <div><p className="text-xs font-bold uppercase tracking-wider text-slate-600">{label}</p><p className="mt-2 break-all text-xl font-black text-white">{value}</p></div>;
}
