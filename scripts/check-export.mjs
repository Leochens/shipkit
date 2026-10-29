import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
import path from "node:path";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://shipkit.directory"
).replace(/\/+$/, "");
const tools = JSON.parse(readFileSync("data/tools.json", "utf8"));
const categories = JSON.parse(readFileSync("data/categories.json", "utf8"));
const expectedCategories = [
  "llm-apis",
  "payments",
  "auth",
  "hosting",
  "databases",
  "email",
  "analytics",
  "seo-distribution",
  "localization",
  "design",
  "legal",
  "agent-tools",
];
assert.deepEqual(
  categories.map((category) => category.slug),
  expectedCategories,
);
assert.ok(tools.length >= 24);
assert.equal(new Set(tools.map((tool) => tool.slug)).size, tools.length);
assert.equal(tools.filter((tool) => tool.featured).length, 3);
for (const category of categories)
  assert.ok(
    tools.filter((tool) => tool.category === category.slug).length >= 2,
    `${category.slug} needs at least two tools`,
  );
for (const tool of tools) {
  for (const field of [
    "name",
    "slug",
    "url",
    "description_zh",
    "category",
    "pricing_hint",
    "pricing_tag",
  ])
    assert.ok(tool[field], `${tool.slug}: missing ${field}`);
  assert.ok(["Free", "Freemium", "Paid"].includes(tool.pricing_tag));
  assert.ok(categories.some((category) => category.slug === tool.category));
  assert.ok(new URL(tool.url).protocol === "https:");
  assert.ok(tool.tags.length > 0);
}
const routes = [
  "/",
  "/about/",
  "/submit/",
  ...categories.map((category) => `/category/${category.slug}/`),
  ...tools.map((tool) => `/tools/${tool.slug}/`),
];
const titles = new Set();
for (const route of routes) {
  const filename = path.join("out", route, "index.html");
  assert.ok(existsSync(filename), `Missing ${filename}`);
  const html = readFileSync(filename, "utf8");
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${route}: needs one H1`,
  );
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(
    title && !titles.has(title),
    `${route}: duplicate or missing title`,
  );
  titles.add(title);
  assert.ok(html.includes('rel="canonical"'), `${route}: missing canonical`);
  assert.ok(html.includes('property="og:image"'), `${route}: missing OG image`);
  assert.ok(html.includes('property="og:url"'), `${route}: missing OG URL`);
  assert.ok(html.includes('property="og:title"'), `${route}: missing OG title`);
  assert.ok(
    html.includes('name="description"'),
    `${route}: missing description`,
  );
  for (const tag of [
    `<link rel="canonical" href="${siteUrl}${route}"`,
    `<meta property="og:url" content="${siteUrl}${route}"`,
    `<meta property="og:image" content="${siteUrl}/og.png"`,
    `<meta name="twitter:image" content="${siteUrl}/og.png"`,
    `<link rel="icon" href="${basePath}/icon.svg"`,
    `<link rel="apple-touch-icon" href="${basePath}/apple-touch-icon.png"`,
  ]) {
    assert.ok(html.includes(tag), `${route}: missing expected metadata ${tag}`);
  }
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[^\"]*)"/g)) {
    assert.ok(
      href.startsWith(`${basePath}/`),
      `${route}: URL missing base path: ${href}`,
    );
    const decoded = decodeURIComponent(
      href.slice(basePath.length).replaceAll("&amp;", "&"),
    );
    const target = decoded.endsWith("/")
      ? path.join("out", decoded, "index.html")
      : path.join("out", decoded);
    assert.ok(existsSync(target), `${route}: broken local link ${href}`);
  }
}
const home = readFileSync("out/index.html", "utf8");
const jsonLdText = home.match(
  /<script type="application\/ld\+json">([^<]+)<\/script>/,
)?.[1];
assert.ok(jsonLdText, "Missing ItemList");
const itemList = JSON.parse(jsonLdText);
assert.equal(itemList["@type"], "ItemList");
assert.equal(itemList.numberOfItems, tools.length);
assert.equal(itemList.itemListElement.length, tools.length);
for (const [index, tool] of tools.entries()) {
  assert.equal(
    itemList.itemListElement[index].url,
    `${siteUrl}/tools/${tool.slug}/`,
  );
}
for (const tool of tools) {
  const html = readFileSync(`out/tools/${tool.slug}/index.html`, "utf8");
  assert.ok(
    html.includes(`href="${tool.url}"`),
    `Missing official URL: ${tool.slug}`,
  );
  assert.ok(
    html.includes(tool.pricing_tag),
    `Missing pricing tag: ${tool.slug}`,
  );
}
const submit = readFileSync("out/submit/index.html", "utf8");
for (const price of ["69", "199", "499"])
  assert.ok(submit.includes(price), `Missing price ${price}`);
assert.ok(submit.includes("ryanleochens@gmail.com"));
assert.ok(existsSync("out/404.html"));
assert.ok(existsSync("out/robots.txt"));
assert.ok(existsSync("out/sitemap.xml"));
assert.ok(existsSync("out/og.png"));
assert.ok(existsSync("out/.nojekyll"));
const sitemap = readFileSync("out/sitemap.xml", "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length);
for (const route of routes) {
  assert.ok(sitemap.includes(`<loc>${siteUrl}${route}</loc>`));
}
const robots = readFileSync("out/robots.txt", "utf8");
assert.ok(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`));
assert.ok(robots.includes(`Host: ${siteUrl}`));
console.log(
  `Export verified: ${tools.length} tools, ${categories.length} categories, ${routes.length} content routes, all internal links, metadata, ItemList, sitemap and robots.`,
);
