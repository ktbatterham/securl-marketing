# securl-marketing

Marketing site for [securl.online](https://securl.online) — the public landing page for the SecURL security posture product.

Live site: [securl.online](https://securl.online)  
App: [app.securl.online](https://app.securl.online)

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS

## Development

```sh
npm install
npm run dev
```

Runs the site locally with HMR.

## Build

```sh
npm run build
```

Outputs to `dist/`. This is a pure static site — no backend, no API calls.

## Deploy

Hostinger SSH deploy is available and defaults to a dry-run:

```sh
npm run deploy:hostinger
```

If the dry-run looks right, deploy live:

```sh
npm run deploy:hostinger:live
```

The live command builds `dist/`, creates a timestamped remote backup under `/home/u765511792/deploy-backups/`, syncs `dist/` to `/home/u765511792/domains/securl.online/public_html/`, and smoke-checks `https://securl.online`.

Useful options:

```sh
npm run deploy:hostinger -- --skip-build
npm run deploy:hostinger -- --live --skip-smoke
npm run deploy:hostinger -- --help
```

## Structure

```
src/
  components/
    Nav.tsx          — top navigation bar
    Hero.tsx         — rotating scan card hero with URL input
    FeatureGrid.tsx  — eight-feature capability grid
    CompareTable.tsx — comparison table (SecURL vs alternatives)
    HowItWorks.tsx   — three-step explainer section
    Footer.tsx       — footer with app link
  App.tsx            — page shell with animated gradient background
```

## Relationship to the app repo

This site links to [app.securl.online](https://app.securl.online). It has no shared code with the app repo (`external-posture-insight`) — it is a standalone static marketing site.
