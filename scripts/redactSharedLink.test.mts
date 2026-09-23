import assert from "node:assert/strict";
import test from "node:test";
import { redactLinkForSharing } from "../src/lib/redactSharedLink.ts";

test("shared link prefill strips query strings, fragments and credentials", () => {
  assert.equal(
    redactLinkForSharing("https://person:secret@example.com/reset/account?token=private#continue"),
    "https://example.com/reset/account",
  );
});

test("shared link prefill accepts only HTTP and HTTPS URLs", () => {
  assert.equal(redactLinkForSharing("javascript:alert(1)"), null);
  assert.equal(redactLinkForSharing("not a URL"), null);
  assert.equal(redactLinkForSharing("http://example.com/path?secret=yes"), "http://example.com/path");
});
