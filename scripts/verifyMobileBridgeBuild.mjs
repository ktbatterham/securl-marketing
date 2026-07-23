import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");
const indexHtml = readFileSync(resolve(distDir, "index.html"), "utf8");
const htaccess = readFileSync(resolve(distDir, ".htaccess"), "utf8");
const assetFiles = readdirSync(resolve(distDir, "assets"))
  .filter((name) => name.endsWith(".js"));
const javascript = assetFiles
  .map((name) => readFileSync(resolve(distDir, "assets", name), "utf8"))
  .join("\n");

for (const required of [
  "securl://?url=",
  "headerwatch://add?url=",
  "certwatch://add?domain=",
  "mobile_bridge:hosted_report",
  "Deep-link pre-fill is included",
]) {
  if (!javascript.includes(required)) {
    throw new Error(`Mobile bridge build is missing required contract marker: ${required}`);
  }
}

if (!htaccess.includes("RewriteRule . /index.html [L]")) {
  throw new Error("SPA fallback is missing; /m/<scanId> would not reach the bridge.");
}
if (!indexHtml.includes('id="root"')) {
  throw new Error("Built index is missing the application root.");
}

console.log("Mobile bridge build verified.");
