const SECURL_API_BASE_URL = "https://securl-app-production.up.railway.app";

type TelemetryPayload = Record<string, unknown>;

type FunnelEvent = {
  event: "handoff_started";
  target?: string | null;
  mode?: string | null;
  format?: string | null;
};

declare global {
  interface Window {
    __SECURL_TELEMETRY_EVENTS__?: Array<{ path: string; payload: TelemetryPayload }>;
  }
}

function isLocalhost() {
  return (
    typeof window !== "undefined" &&
    ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname)
  );
}

function sendTelemetry(path: string, payload: TelemetryPayload) {
  if (isLocalhost()) {
    window.__SECURL_TELEMETRY_EVENTS__ = window.__SECURL_TELEMETRY_EVENTS__ ?? [];
    window.__SECURL_TELEMETRY_EVENTS__.push({ path, payload });
    return;
  }

  const body = JSON.stringify({
    ...payload,
    referrer: typeof document !== "undefined" ? document.referrer : "",
    currentUrl: typeof window !== "undefined" ? window.location.href : "",
  });
  const url = `${SECURL_API_BASE_URL}${path}`;

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    // A JSON Blob is not CORS-safelisted and Safari can silently drop the
    // cross-origin beacon. The API parses the JSON body independently of its
    // content type, so text/plain keeps Beacon reliable across browsers.
    const queued = navigator.sendBeacon(
      url,
      new Blob([body], { type: "text/plain;charset=UTF-8" }),
    );
    if (queued) return;
  }

  void fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {
    // Product telemetry must never block navigation or scanning.
  });
}

export function recordPageLoad() {
  sendTelemetry("/api/telemetry/page-load", {});
}

export function recordFunnelHandoff({ target, mode, format }: Omit<FunnelEvent, "event">) {
  sendTelemetry("/api/telemetry/event", {
    event: "handoff_started",
    target,
    mode,
    format,
  });
}

export function buildScannerUrl(target?: string) {
  const url = new URL("https://app.securl.online/");
  url.searchParams.set("utm_source", "securl_landing");
  url.searchParams.set("utm_medium", "web");
  url.searchParams.set("utm_campaign", target ? "landing_scan" : "landing_open_app");
  if (target) {
    url.searchParams.set("url", target);
  }
  return url.toString();
}
