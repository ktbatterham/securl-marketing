#!/usr/bin/env node
// Snapshot real SecURL grades for the hero example cards.
//
// The hero (src/components/Hero.tsx) rotates through a few "this is what a scan
// produces" cards. Those numbers MUST be real — we grade other people's sites,
// so showing fabricated grades on our own front page is a credibility own-goal.
//
// This script runs a live standard-mode scan against each curated domain via the
// SecURL API, pulls the compact /digest, and regenerates src/data/heroExamples.ts.
// It is a manual/committed step (run `npm run snapshot:hero`), NOT a build hook —
// the build stays offline and deterministic; we just refresh the committed file
// when we want current numbers.
//
//   npm run snapshot:hero                 # default curated domains
//   node scripts/snapshotHeroExamples.mjs --probe a.com b.com   # print grades only
//
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const BASE = (process.env.SECURL_API_BASE || "https://securl-app-production.up.railway.app").replace(/\/+$/, "");
const MODE = "standard"; // matches the app's default scan mode

// Curated, recognizable domains chosen to span the grade range. Whatever grade
// the engine actually returns is what ships — that's the whole point.
const DEFAULT_DOMAINS = ["mozilla.org", "github.com", "cloudflare.com", "google.com"];

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = resolve(__dirname, "../src/data/heroExamples.ts");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function makeOwnerToken() {
  // x-scan-owner must be >=24 chars with >=8 distinct chars (a bearer secret).
  const hex = [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
  return `hero-snapshot-${hex}`;
}

async function jsonOrThrow(res, what) {
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    throw new Error(`${what}: non-JSON response (${res.status}): ${text.slice(0, 200)}`);
  }
  if (!res.ok) throw new Error(`${what}: HTTP ${res.status}: ${text.slice(0, 200)}`);
  return body;
}

async function scanDomain(domain, owner) {
  const url = domain.startsWith("http") ? domain : `https://${domain}`;
  const create = await jsonOrThrow(
    await fetch(`${BASE}/api/scans`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-scan-owner": owner },
      body: JSON.stringify({ url, mode: MODE }),
    }),
    `create ${domain}`,
  );
  const id = create?.scan?.id;
  if (!id) throw new Error(`create ${domain}: no scan id in response`);

  // Poll until the scan settles.
  for (let attempt = 0; attempt < 60; attempt += 1) {
    await sleep(2000);
    const poll = await jsonOrThrow(
      await fetch(`${BASE}/api/scans/${encodeURIComponent(id)}`, { headers: { "x-scan-owner": owner } }),
      `poll ${domain}`,
    );
    const status = poll?.scan?.status;
    if (status === "completed") break;
    if (status === "failed") throw new Error(`scan ${domain} failed: ${poll?.scan?.error ?? "unknown"}`);
  }

  const digestRes = await jsonOrThrow(
    await fetch(`${BASE}/api/scans/${encodeURIComponent(id)}/digest`, { headers: { "x-scan-owner": owner } }),
    `digest ${domain}`,
  );
  return digestRes.digest;
}

// Map a raw finding title to a short, readable chip label. Ordered phrase rules
// run first (they produce the nicest output); anything unmatched falls back to
// header-name abbreviation + light trimming.
const PHRASE_RULES = [
  [/cookie/i, "Cookie hygiene"],
  [/content-security-policy.*missing|\bcsp is missing\b/i, "CSP missing"],
  [/content-security-policy|\bcsp\b/i, "Weak CSP"],
  [/strict-transport-security|\bhsts\b/i, (t) => (/missing/i.test(t) ? "HSTS missing" : "HSTS weak")],
  [/cross-origin-opener-policy/i, "COOP missing"],
  [/cross-origin-resource-policy/i, "CORP missing"],
  [/cross-origin-embedder-policy/i, "COEP missing"],
  [/permissions-policy/i, "Permissions-Policy"],
  [/x-frame-options|clickjack/i, "X-Frame-Options"],
  [/x-content-type-options|mime.?sniff/i, "MIME sniffing"],
  [/referrer-policy/i, "Referrer-Policy"],
];

function chipLabel(title) {
  for (const [re, out] of PHRASE_RULES) {
    if (re.test(title)) return typeof out === "function" ? out(title) : out;
  }
  // Fallback: trim filler words and cap length.
  let label = title.replace(/\bis missing\b/i, "missing").trim();
  if (label.length > 24) label = `${label.slice(0, 23)}…`;
  return label;
}

// Pad chip: turn a score-driver area into a short "<area> gaps" chip, used to
// fill out cards whose top findings collapse to a single label (e.g. all-cookie).
function areaChip(driver) {
  const area = String(driver?.areaLabel ?? "").replace(/\s*&\s*/g, " & ").trim();
  if (!area) return null;
  return { label: `${area} gaps`, sev: "info" };
}

function cleanHost(host) {
  return String(host ?? "unknown").replace(/^www\./i, "");
}

// Build up to three distinct chips: humanized top findings first, deduped by
// label, then padded from score-driver areas so every card stays balanced.
function buildChips(digest) {
  const top = Array.isArray(digest?.findings?.top) ? digest.findings.top : [];
  const drivers = Array.isArray(digest?.posture?.scoreDrivers) ? digest.posture.scoreDrivers : [];
  const chips = [];
  const seen = new Set();
  const push = (chip) => {
    if (!chip || seen.has(chip.label) || chips.length >= 3) return;
    seen.add(chip.label);
    chips.push(chip);
  };
  for (const f of top) push({ label: chipLabel(f.title), sev: f.severity });
  for (const d of drivers) push(areaChip(d));
  return chips;
}

function postureLabel(grade) {
  const g = grade.toUpperCase();
  if (g === "A+" || g === "A") return "Excellent posture";
  if (g === "B") return "Good posture";
  if (g === "C") return "Mixed posture";
  if (g === "D") return "Needs attention";
  return "Critical posture";
}

function toExample(digest) {
  const sev = digest?.findings?.bySeverity ?? { critical: 0, warning: 0, info: 0 };
  const chips = buildChips(digest);
  return {
    domain: cleanHost(digest?.target?.host),
    grade: String(digest?.posture?.grade ?? "U"),
    score: Number(digest?.posture?.score ?? 0),
    label: postureLabel(String(digest?.posture?.grade ?? "U")),
    critical: Number(sev.critical ?? 0),
    warning: Number(sev.warning ?? 0),
    info: Number(sev.info ?? 0),
    chips,
  };
}

function renderFile(examples, generatedAt) {
  const body = examples
    .map((ex) => {
      const chips = ex.chips
        .map((c) => `    { label: ${JSON.stringify(c.label)}, sev: ${JSON.stringify(c.sev)} },`)
        .join("\n");
      return `  {
    domain: ${JSON.stringify(ex.domain)},
    grade: ${JSON.stringify(ex.grade)},
    score: ${ex.score},
    label: ${JSON.stringify(ex.label)},
    critical: ${ex.critical},
    warning: ${ex.warning},
    info: ${ex.info},
    chips: [
${chips}
    ],
  },`;
    })
    .join("\n");

  return `// AUTO-GENERATED by scripts/snapshotHeroExamples.mjs — do not edit by hand.
// Real standard-mode SecURL grades, snapshotted ${generatedAt}.
// Refresh with: npm run snapshot:hero
export type ChipSeverity = "critical" | "warning" | "info";

export interface HeroExampleChip {
  label: string;
  sev: ChipSeverity;
}

export interface HeroExample {
  domain: string;
  grade: string;
  score: number;
  label: string;
  critical: number;
  warning: number;
  info: number;
  chips: HeroExampleChip[];
}

export const HERO_EXAMPLES_GENERATED_AT = ${JSON.stringify(generatedAt)};

export const HERO_EXAMPLES: HeroExample[] = [
${body}
];
`;
}

async function main() {
  const args = process.argv.slice(2);
  const probe = args.includes("--probe");
  const domains = args.filter((a) => !a.startsWith("--"));
  const targets = domains.length ? domains : DEFAULT_DOMAINS;
  const owner = makeOwnerToken();

  console.log(`Snapshotting ${targets.length} domain(s) via ${BASE} (mode=${MODE})`);
  const examples = [];
  for (const domain of targets) {
    process.stdout.write(`  ${domain} … `);
    try {
      const digest = await scanDomain(domain, owner);
      const ex = toExample(digest);
      console.log(`${ex.grade}/${ex.score}  (crit ${ex.critical}, warn ${ex.warning}, info ${ex.info})`);
      examples.push(ex);
    } catch (err) {
      console.log(`FAILED — ${err.message}`);
    }
  }

  if (probe) {
    console.log("\nProbe only — no file written.");
    return;
  }
  if (!examples.length) {
    console.error("No successful scans; refusing to write an empty file.");
    process.exit(1);
  }

  // Stable, deterministic timestamp source: the freshest scan in the batch.
  const generatedAt = new Date().toISOString();
  await mkdir(dirname(OUT_FILE), { recursive: true });
  await writeFile(OUT_FILE, renderFile(examples, generatedAt), "utf8");
  console.log(`\nWrote ${OUT_FILE} (${examples.length} examples).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
