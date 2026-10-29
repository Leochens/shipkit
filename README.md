# ShipKit

给独立开发者的 AI 产品出海工具目录。Chinese editorial copy, English tool names, 33 real tools across 12 shipping categories. Built with Next.js App Router, TypeScript and Tailwind CSS v3; no UI kit, database or server runtime.

## Run

Requires Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production export

```bash
npm run build
npm run check:export
```

The complete static website is written to `out/`. `next.config.ts` sets `output: 'export'`, `trailingSlash: true` and `images.unoptimized: true`. Every tool and category route uses `generateStaticParams`; dynamic parameters are disabled. `robots.txt` and `sitemap.xml` are exported as static assets.

For a sub-path deployment such as GitHub Pages, build and validate with:

```bash
NEXT_PUBLIC_SITE_URL=https://leochens.github.io/shipkit NEXT_PUBLIC_BASE_PATH=/shipkit npm run build
NEXT_PUBLIC_SITE_URL=https://leochens.github.io/shipkit NEXT_PUBLIC_BASE_PATH=/shipkit npm run check:export
```

`NEXT_PUBLIC_BASE_PATH` sets Next.js's `basePath` and `assetPrefix` and defaults to an empty string. `NEXT_PUBLIC_SITE_URL` is the full public base URL, including `/shipkit` in this example. Upload the contents of `out/` to the host's configured base path. The postbuild script creates `out/.nojekyll` so GitHub Pages serves `_next` assets.

Serve the export with any static host, or preview locally:

```bash
npx serve out
```

Configure the host to serve `/route/index.html` for `/route/` and use `404.html` for missing paths. Do not add an SPA catch-all rewrite that masks missing pages. The normal `npm run dev` server is for development only.

## Routes

- `/` — introduction, 3 editorial picks, category navigation, searchable and filterable directory, grid/list views, name/date sorting, newsletter demo, submission CTA.
- `/category/[slug]/` — 12 category pages with precise Chinese / English niche titles and filtered tool lists.
- `/tools/[slug]/` — 33 tool pages with official links, a one-line description, pricing type, pricing context, tags and related tools.
- `/submit/` — free submissions, sponsorship pricing and a validated mailto submission form.
- `/about/` — purpose, curation standards, sponsorship transparency and contact.
- `/robots.txt`, `/sitemap.xml`, `/404.html` — static crawler and error assets.

## Content

`data/categories.json` contains the 12 requested category slugs, labels, English SEO descriptions and icon keys. `data/tools.json` contains:

```text
name, slug, url, description_zh, category,
pricing_hint, pricing_tag, tags[], featured,
added_at, logo_bg, logo_color, logo_text
```

`pricing_tag` must be `Free`, `Freemium`, or `Paid`. Three records have `featured: true`; these are editorial picks, not paid placements. `added_at` represents directory collection dates, not tool release dates. The local typographic logo tiles avoid third-party image requests and are not official brand assets. Prices and eligibility should always be checked on each tool's official website. Official URLs in every record are the primary reference for the content.

Add or edit JSON records, then rebuild. Adding data generates the corresponding static detail pages and sitemap entries automatically. Do not put secret keys in the data or client bundle.

## Forms and pricing

All communication goes to **ryanleochens@gmail.com**. No Stripe integration or online payment is configured.

| Plan               | Price    | Placement / duration                        |
| ------------------ | -------- | ------------------------------------------- |
| Featured listing   | **$69**  | Category top, 30 days                       |
| Homepage spotlight | **$199** | Homepage spotlight, 30 days                 |
| Quarterly sponsor  | **$499** | Home + category badge, 3 months             |
| Free submission    | **$0**   | Limited to **10/month**, then queue or paid |

The submission form validates required fields, email and HTTP(S) website URL client-side, then generates a percent-encoded mailto draft. The visitor must open their email client and send it; generating a draft does not submit anything. Moderation, monthly free slots, payment, placement labels and scheduling are handled manually by the editor. Plan buttons preselect the form's plan. Submitted form text is not sent to a backend or stored in localStorage.

The newsletter is an explicitly labeled **local demo**. A valid address is stored under `shipkit:newsletter:v1` in the current browser. The confirmation says it is saved locally, not subscribed to a real list, and offers a mailto link for a subscription request. Storage errors are displayed rather than silently reporting success. No email service is connected.

## SEO and deployment origin

Set your full public site URL, including any deployment base path, before a production build:

```bash
cp .env.example .env.local
# Edit NEXT_PUBLIC_SITE_URL in .env.local, then:
npm run build
```

The default is `https://shipkit.directory` as a configurable example origin, not a claim that this project is deployed there. `NEXT_PUBLIC_SITE_URL` supplies canonical links, sitemap URLs, robots host and social metadata. Every content route has a unique title, description and canonical URL. The homepage embeds JSON-LD `ItemList` for all tools. Social previews use the bundled `public/og.png`; favicon and touch icons are bundled too. No external fonts are required during build or browsing.

## Validation

`npm run build` runs the Next.js production build with webpack and TypeScript checks. Webpack allows builds in environments that restrict the local ports used by Turbopack's CSS workers. Type checking uses the compiler API to avoid detached CLI subprocesses. `npm run typecheck` can also be run independently. `npm run check:export` validates all data fields, category coverage, every exported content route, internal HTML links and assets with the configured base path, titles, H1s, canonical / OG / description metadata, official tool links, JSON-LD, sitemap URLs, crawler assets, `.nojekyll` and submission pricing.

The interface supports mobile layouts, visible keyboard focus, a skip link, labeled form controls, reduced motion, a mobile navigation menu, empty search results and explicit form success/error states.
