# SecURL Outreach Pack

Use this pack to drive traffic into the web funnel at `https://securl.online`.

Primary links:

- Landing page: https://securl.online
- Web scanner: https://app.securl.online/?utm_source=outreach&utm_medium=social&utm_campaign=launch
- npm package: https://www.npmjs.com/package/securl
- iOS SecURL app: https://apps.apple.com/app/securl/id6774322464
- Android downloads: https://securl.online/downloads
- GitHub repo: https://github.com/this-is-securl/securl

Core positioning:

> SecURL is a passive outside-in security posture scanner. Paste a public URL and it checks the things attackers see first: HTTP security headers, TLS and certificates, DNS trust, cookies, third-party surface, and public posture signals. No login, no credentials, no invasive probing.

## Publishing Order

1. Dev.to: publish the technical article first.
2. LinkedIn: post the maker/product version and link to the landing page.
3. X: post the short thread and link to the landing page plus npm.
4. Product Hunt: save for a coordinated launch unless there is time to prepare screenshots and first-comment support.

## Dev.to

Title:

```text
I built SecURL: a passive outside-in security posture scanner for websites
```

Tags:

```text
security, webdev, opensource, devops
```

Body:

```markdown
I have been building SecURL, a passive outside-in security posture scanner for public websites and services.

The idea is simple: before anyone has credentials, agents, source access, or a formal security engagement, they can still see a lot from the outside. HTTP security headers, TLS configuration, certificate health, DNS trust records, cookies, third-party surface, and public disclosure signals all say something about how seriously a site treats security.

SecURL turns those signals into a readable posture report:

- a grade from A to F
- a score out of 100
- score drivers showing what helped or hurt the result
- evidence-backed findings
- plain-language next steps
- monitor-friendly change detection

It stays deliberately passive. No exploit attempts. No fuzzing. No credentialed access. No intrusive probing. It is closer to an external security "recipe card" than a vulnerability scanner.

There are a few ways to use it:

- Web scanner: https://securl.online
- npm package / CLI: https://www.npmjs.com/package/securl
- GitHub: https://github.com/this-is-securl/securl
- iOS app: https://apps.apple.com/app/securl/id6774322464
- Self-hosted Android APKs: https://securl.online/downloads

For developers, the npm package is the most interesting bit. The engine can be used locally or in CI/CD so teams can check public posture before shipping, compare output over time, and treat posture regressions like any other release signal.

The roadmap is moving toward a posture manifest: a machine-readable external recipe card that records what was checked, what was skipped, evidence quality, signal clarity, engine version, policy profile, and timestamps. SBOMs explain what an app is made of internally; SecURL is aimed at explaining what it exposes externally.

If you try it, I would genuinely value feedback on:

- where the score feels too harsh or too generous
- which findings are unclear
- what would make the CLI/CI workflow more useful
- which passive signals are missing

Landing page: https://securl.online
Engine: https://www.npmjs.com/package/securl
Source: https://github.com/this-is-securl/securl
```

## LinkedIn

Post:

```text
I have been building SecURL: a passive outside-in security posture scanner for websites and web services.

Paste a public URL and it checks the things attackers usually see first:

• HTTP security headers
• TLS and certificate health
• DNS trust records
• cookie attributes
• third-party surface
• public posture signals

It returns a grade, a score out of 100, score drivers, evidence-backed findings, and plain-language next steps.

The important bit: it is deliberately passive. No credentials, no login, no exploit attempts, no intrusive probing.

It now exists as:

• a web scanner
• an npm package / CLI
• iOS companion apps
• self-hosted Android APKs
• a backend API for monitoring and push-driven change alerts

I think of it as an external security "recipe card". SBOMs help you understand what an application is made of internally; SecURL helps you understand what it exposes externally.

The web funnel is live here:
https://securl.online

The engine is here:
https://www.npmjs.com/package/securl

Feedback from developers, security people, and anyone responsible for shipping web services would be hugely useful.
```

## X Thread

Post 1:

```text
I built SecURL: a passive outside-in security posture scanner for websites.

Paste a URL. Get a grade, score, score drivers, and evidence-backed fixes.

No login. No credentials. No invasive probing.

https://securl.online
```

Post 2:

```text
It checks the things attackers see before they get anywhere near your code:

• HTTP security headers
• TLS + certificates
• DNS trust records
• cookies
• third-party surface
• public posture signals
```

Post 3:

```text
The engine is open and installable from npm:

npm: https://www.npmjs.com/package/securl
GitHub: https://github.com/this-is-securl/securl

Useful for local checks, CI/CD, vendor reviews, and pre-release posture gates.
```

Post 4:

```text
There are companion apps too:

iOS SecURL: https://apps.apple.com/app/securl/id6774322464
Android APKs: https://securl.online/downloads

Same posture engine, different surfaces.
```

Post 5:

```text
The roadmap is heading toward an external posture manifest: a machine-readable "recipe card" for what a public service exposes externally.

SBOMs describe the inside.
SecURL describes the outside.
```

## Product Hunt

Tagline:

```text
Passive website security posture checks, from web to CI
```

Short description:

```text
SecURL grades the outside-in security posture of any public website: headers, TLS, certificates, DNS trust, cookies, third-party surface, and public signals. No login, no credentials, no invasive scanning.
```

First comment:

```markdown
Hi Product Hunt,

I built SecURL because I wanted a fast, honest way to understand how secure a public website looks from the outside before doing anything deeper.

Paste a URL and SecURL returns a grade, score, score drivers, evidence-backed findings, and plain-language next steps. It checks HTTP security headers, TLS and certificate health, DNS trust records, cookies, third-party surface, and public posture signals.

The project is deliberately passive:

- no credentials
- no login
- no exploit attempts
- no fuzzing
- no intrusive scanning

It is available as a web scanner, npm package / CLI, iOS app, self-hosted Android APKs, and backend monitoring layer.

I would love feedback on the scoring model, findings, and what would make it more useful for developers and security teams.

Web: https://securl.online
npm: https://www.npmjs.com/package/securl
GitHub: https://github.com/this-is-securl/securl
```

Suggested assets:

- Landing page hero screenshot
- Web scanner result screenshot
- npm package screenshot
- iOS app screenshot
- Android downloads screenshot

Do not launch Product Hunt until there is a screenshot pack and at least a small early-support window ready.

