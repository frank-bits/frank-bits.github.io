# Deploying the FooCorp landing pages (free static hosting)

These are plain static HTML/CSS/JS files — no build step. Any static host works.
This is the FOO-5 deliverable; publishing it is what makes the pages **live and
indexable** and unlocks the FOO-3 web-analytics/Search Console tracking.

## 0. One prerequisite: pick the production domain (CEO decision)

Every absolute URL (canonical, Open Graph, JSON-LD, sitemap) uses the placeholder
`https://frank-bits.github.io`. Before deploying, decide the real domain and swap it in **one command**:

```bash
# from the web/ directory — replace with the chosen production origin
NEW="https://apps.foocorp.dev"          # or a free host subdomain, e.g. https://foocorp.pages.dev
grep -rl 'https://frank-bits.github.io' . | xargs sed -i '' "s#https://frank-bits.github.io#${NEW}#g"   # macOS sed
```

**GardenPin is settled:** it already lives on its own brand domain, **gardenpin.com**
(CEO-owned). Its SEO upgrade ships separately in `gardenpin.com-seo-patch/`, and the
github.io `/gardenpin/` page now canonicalizes to it and is excluded from the sitemap.
The domain decision below therefore only covers the **hub + SavorKeep + Fretkit**.

Options, cheapest first:
- **Free host subdomain** (no purchase): `*.pages.dev` (Cloudflare), `*.netlify.app`, or `*.github.io`. Ship today, add a custom domain later.
- **Custom domain**: GardenPin already lists `gardenpin.com` as its seller URL. A FooCorp-wide domain (e.g. `foocorp.dev`) keeps all three apps' SEO authority on one origin — recommended for the hub + subfolders structure used here.

## 1. Deploy (pick ONE — all free tier, all HTTPS)

### A. Cloudflare Pages (recommended — free, fast CDN, easy custom domain)
```bash
npm i -g wrangler
wrangler pages deploy web --project-name foocorp-apps
```
Or connect the repo in the Cloudflare dashboard → Pages → framework preset "None",
build command empty, output dir `web`.

### B. Netlify
```bash
npm i -g netlify-cli
netlify deploy --dir=web --prod
```

### C. GitHub Pages
Push this repo, then Settings → Pages → deploy from branch, folder `/web`
(or move `web/*` to repo root / `docs/`). Custom domain via the "Custom domain" box.

## 2. Verify Search Console + submit sitemap (FOO-3 activation)

Follow `../aso-seo-measurement/WEB_ANALYTICS_SETUP.md`. Short version once live:
1. Add a **Domain property** in Google Search Console (DNS TXT — covers all pages).
   DNS-awkward? Use a URL-prefix property and uncomment the `google-site-verification`
   `<meta>` tag already present in each page `<head>`.
2. Search Console → **Sitemaps** → submit `sitemap.xml`.
3. Optionally **URL Inspection → Request indexing** on each of the 4 URLs to speed first crawl.
4. Set `GSC_CREDENTIALS` + `GSC_SITE_URL` (e.g. `sc-domain:foocorp.app`) and run
   `python3 ../aso-seo-measurement/gsc_puller.py` — it goes from stub to live capture.

## 3. Turn on GA4 (optional, free)

Replace `G-XXXXXXXXXX` in **one file** — `web/assets/analytics.js` — with the real
GA4 Measurement ID. The App Store CTAs already fire an `app_store_click` conversion event.

## What's in this bundle

```
web/
  index.html            FooCorp hub (Organization + app ItemList schema)
  gardenpin/index.html  Lead app: garden organizer / map / care wedge
  savorkeep/index.html  Recipe keeper / meal planner
  fretkit/index.html    Guitar scales / chords / fretboard
  assets/style.css      One shared ~4KB stylesheet, per-app accent
  assets/analytics.js   Single-source GA4 + app_store_click event (no-op until ID set)
  sitemap.xml           All 4 URLs
  robots.txt            Allow all + sitemap pointer
```

Every page ships: unique SEO `<title>` + meta description, canonical, Open Graph/Twitter
cards, `MobileApplication` + `BreadcrumbList` + `FAQPage` JSON-LD, keyword-targeted copy
from the FOO-2 map, internal links across all apps, and a tracked App Store CTA.
