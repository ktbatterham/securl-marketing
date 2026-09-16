import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

async function loadWorker() {
  const listeners = new Map();
  const context = vm.createContext({
    URL,
    URLSearchParams,
    Response,
    self: {
      location: { origin: "https://securl.online" },
      clients: { claim: async () => {} },
      skipWaiting() {},
      addEventListener(type, listener) {
        listeners.set(type, listener);
      },
    },
  });
  const source = await readFile(new URL("../public/sw.js", import.meta.url), "utf8");
  vm.runInContext(source, context, { filename: "public/sw.js" });
  return listeners;
}

async function dispatchShare(fields) {
  const listeners = await loadWorker();
  const form = new FormData();
  for (const [name, value] of Object.entries(fields)) form.set(name, value);
  const request = new Request("https://securl.online/check-link/share-target", {
    method: "POST",
    body: form,
  });
  let responsePromise;
  listeners.get("fetch")({
    request,
    respondWith(value) {
      responsePromise = Promise.resolve(value);
    },
  });
  assert.ok(responsePromise, "share-target POST should be intercepted");
  return responsePromise;
}

test("share target keeps the received URL in the fragment and marks its source", async () => {
  const response = await dispatchShare({
    text: "Have a look at https://example.com/path?token=private-value.",
  });
  assert.equal(response.status, 303);
  const destination = new URL(response.headers.get("location"));
  assert.equal(destination.origin, "https://securl.online");
  assert.equal(destination.pathname, "/check-link/");
  assert.equal(destination.search, "");
  const fragment = new URLSearchParams(destination.hash.slice(1));
  assert.equal(fragment.get("source"), "web_share_target");
  assert.equal(fragment.get("url"), "https://example.com/path?token=private-value");
});

test("share target prefers url, then text, then title and never invents a URL", async () => {
  const response = await dispatchShare({
    url: "https://url.example/path",
    text: "https://text.example/path",
    title: "https://title.example/path",
  });
  const destination = new URL(response.headers.get("location"));
  const fragment = new URLSearchParams(destination.hash.slice(1));
  assert.equal(fragment.get("url"), "https://url.example/path");

  const emptyResponse = await dispatchShare({ text: "No link in this share" });
  const emptyDestination = new URL(emptyResponse.headers.get("location"));
  const emptyFragment = new URLSearchParams(emptyDestination.hash.slice(1));
  assert.equal(emptyFragment.get("source"), "web_share_target");
  assert.equal(emptyFragment.has("url"), false);
});
