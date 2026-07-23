import { useEffect, useMemo, useState } from "react";
import { BellRing, ExternalLink, LoaderCircle, ShieldCheck, Smartphone } from "lucide-react";
import { recordFunnelHandoff, recordPageLoad } from "../lib/telemetry";

const API_BASE_URL = "https://securl-app-production.up.railway.app";
const REPORT_BASE_URL = "https://app.securl.online";
const SCAN_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type ShareCardResponse = {
  ready?: boolean;
  scan?: {
    url?: string;
  };
  shareCard?: {
    title?: string;
    summary?: string;
    target?: {
      finalUrl?: string;
      host?: string;
    };
    posture?: {
      grade?: string;
      score?: number;
    };
  };
};

type AppRoute = {
  name: string;
  description: string;
  deepLink: string;
  storeUrl: string;
  format: string;
};

function scanIdFromPath(pathname: string) {
  const match = pathname.match(/^\/m\/([^/]+)\/?$/);
  try {
    const candidate = match?.[1] ? decodeURIComponent(match[1]) : "";
    return SCAN_ID_PATTERN.test(candidate) ? candidate : null;
  } catch {
    return null;
  }
}

function buildAppRoutes(targetUrl: string, host: string): AppRoute[] {
  return [
    {
      name: "SecURL",
      description: "Open a full posture scan with the target pre-filled.",
      deepLink: `securl://?url=${encodeURIComponent(targetUrl)}`,
      storeUrl: "https://apps.apple.com/app/securl/id6774322464",
      format: "securl_app",
    },
    {
      name: "Header Watch",
      description: "Add the site to header regression monitoring.",
      deepLink: `headerwatch://add?url=${encodeURIComponent(targetUrl)}`,
      storeUrl: "https://apps.apple.com/app/header-watch/id6774599437",
      format: "header_watch_app",
    },
    {
      name: "Cert Watch",
      description: "Add the hostname to certificate expiry monitoring.",
      deepLink: `certwatch://add?domain=${encodeURIComponent(host)}`,
      storeUrl: "https://apps.apple.com/app/cert-watch/id6774979236",
      format: "cert_watch_app",
    },
  ];
}

export function MobileReportBridge() {
  const scanId = useMemo(() => scanIdFromPath(window.location.pathname), []);
  const [shareCard, setShareCard] = useState<ShareCardResponse["shareCard"] | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "missing">(
    scanId ? "loading" : "missing",
  );

  useEffect(() => {
    recordPageLoad();
    if (!scanId) return;

    const controller = new AbortController();
    void fetch(`${API_BASE_URL}/api/scans/${encodeURIComponent(scanId)}/share-card`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) return null;
        return response.json() as Promise<ShareCardResponse>;
      })
      .then((payload) => {
        if (!payload?.ready || !(payload.shareCard?.target?.finalUrl || payload.scan?.url)) {
          setState("missing");
          return;
        }
        setShareCard({
          ...payload.shareCard,
          target: {
            ...payload.shareCard?.target,
            finalUrl: payload.shareCard?.target?.finalUrl || payload.scan?.url,
          },
        });
        setState("ready");
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setState("missing");
        }
      });
    return () => controller.abort();
  }, [scanId]);

  const targetUrl = shareCard?.target?.finalUrl ?? "";
  const host = shareCard?.target?.host
    ?? (() => {
      try {
        return new URL(targetUrl).hostname;
      } catch {
        return "";
      }
    })();
  const appRoutes = targetUrl && host ? buildAppRoutes(targetUrl, host) : [];
  const reportUrl = scanId
    ? `${REPORT_BASE_URL}/report/${encodeURIComponent(scanId)}?utm_source=securl_mobile_bridge&utm_medium=web&utm_campaign=cli_mobile_sync`
    : REPORT_BASE_URL;

  return (
    <main className="noise relative min-h-screen overflow-hidden bg-[#070b14] px-5 py-10 text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 0%, rgba(181,106,44,0.18), transparent 34%)," +
            "radial-gradient(circle at 82% 12%, rgba(122,166,182,0.12), transparent 30%)," +
            "linear-gradient(180deg, #070b14 0%, #0b1220 48%, #101827 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-black text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#b56a2c]">
            <ShieldCheck className="h-4 w-4" />
          </span>
          SecURL
        </a>

        {state === "loading" && (
          <section className="mt-24 text-center">
            <LoaderCircle className="mx-auto h-9 w-9 animate-spin text-[#d89a63]" />
            <p className="mt-4 text-sm text-slate-400">Loading the secure report bridge…</p>
          </section>
        )}

        {state === "missing" && (
          <section className="mx-auto mt-20 max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center">
            <h1 className="text-3xl font-black tracking-[-0.04em] text-white">Report unavailable</h1>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              The report may still be running, may have expired, or the bridge link is invalid.
              No app was opened automatically.
            </p>
            <a
              href="https://app.securl.online/?utm_source=securl_mobile_bridge&utm_medium=web&utm_campaign=missing_report"
              className="btn-glow mt-7 inline-flex rounded-xl bg-[#b56a2c] px-5 py-3 text-sm font-bold text-white"
            >
              Run a fresh scan
            </a>
          </section>
        )}

        {state === "ready" && shareCard && (
          <>
            <section className="mt-14 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl sm:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d89a63]">
                Terminal → web → phone
              </p>
              <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">
                    {shareCard.title ?? `SecURL report for ${host}`}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                    {shareCard.summary ?? "Review the hosted report, then choose a focused mobile watch."}
                  </p>
                </div>
                <div className="shrink-0 rounded-2xl border border-[#b56a2c]/25 bg-[#b56a2c]/10 px-5 py-4 text-center">
                  <p className="text-3xl font-black text-white">{shareCard.posture?.grade ?? "—"}</p>
                  <p className="text-xs text-[#f0d5bc]">{shareCard.posture?.score ?? "—"}/100</p>
                </div>
              </div>
              <a
                href={reportUrl}
                onClick={() =>
                  recordFunnelHandoff({
                    target: reportUrl,
                    mode: "mobile_bridge:hosted_report",
                    format: "shared_report",
                  })
                }
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.07] px-5 py-3 text-sm font-bold text-white transition hover:border-[#b56a2c]/40 hover:bg-[#b56a2c]/10"
              >
                View the interactive report
                <ExternalLink className="h-4 w-4" />
              </a>
            </section>

            <section className="mt-7">
              <div className="flex items-center gap-3">
                <BellRing className="h-5 w-5 text-[#d89a63]" />
                <div>
                  <h2 className="text-xl font-black text-white">Keep watch from your phone</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Opening an app only pre-fills {host}. Scanning or saving always requires your tap.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {appRoutes.map((app) => (
                  <article
                    key={app.name}
                    className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
                  >
                    <Smartphone className="h-5 w-5 text-[#d89a63]" />
                    <h3 className="mt-4 text-lg font-bold text-white">{app.name}</h3>
                    <p className="mt-2 min-h-16 text-sm leading-6 text-slate-400">{app.description}</p>
                    <div className="mt-5 flex flex-col gap-2">
                      <a
                        href={app.deepLink}
                        onClick={() =>
                          recordFunnelHandoff({
                            target: targetUrl,
                            mode: `mobile_bridge:open_${app.format}`,
                            format: app.format,
                          })
                        }
                        className="rounded-xl bg-[#b56a2c] px-4 py-2.5 text-center text-sm font-bold text-white"
                      >
                        Open in app
                      </a>
                      <a
                        href={app.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          recordFunnelHandoff({
                            target: app.storeUrl,
                            mode: `mobile_bridge:install_${app.format}`,
                            format: "app_store",
                          })
                        }
                        className="rounded-xl border border-white/10 px-4 py-2.5 text-center text-xs font-semibold text-slate-300"
                      >
                        Install on iPhone
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              <a
                href="/downloads"
                onClick={() =>
                  recordFunnelHandoff({
                    target: "https://securl.online/downloads",
                    mode: "mobile_bridge:android_downloads",
                    format: "android_apk",
                  })
                }
                className="mt-5 inline-flex text-sm font-bold text-[#d89a63]"
              >
                Prefer Android? Download the self-hosted APKs →
              </a>
              <p className="mt-5 text-xs leading-5 text-slate-500">
                Deep-link pre-fill is included in the mobile suite’s planned 1.2.0 release.
                Older app versions can use the same target by copying it from the hosted report.
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
