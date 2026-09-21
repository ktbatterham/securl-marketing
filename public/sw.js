const SHARE_TARGET_PATH = "/check-link/share-target";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

function firstHttpUrl(value) {
  if (typeof value !== "string") return null;
  const candidate = value.match(/https?:\/\/[^\s<>"']+/i)?.[0];
  if (!candidate) return null;

  const trimmed = candidate.replace(/[),.;!?]+$/, "");
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.toString() : null;
  } catch {
    return null;
  }
}

async function shareTargetResponse(request) {
  const form = await request.formData();
  const sharedUrl = [form.get("url"), form.get("text"), form.get("title")]
    .map((value) => firstHttpUrl(value))
    .find(Boolean);

  const destination = new URL("/check-link/", self.location.origin);
  const fragment = new URLSearchParams({ source: "web_share_target" });
  if (sharedUrl) fragment.set("url", sharedUrl);
  destination.hash = fragment.toString();
  return Response.redirect(destination.toString(), 303);
}

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (event.request.method === "POST" && requestUrl.pathname === SHARE_TARGET_PATH) {
    event.respondWith(shareTargetResponse(event.request));
  }
});
