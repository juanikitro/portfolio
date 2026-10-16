import { expect, test } from "@playwright/test";
import { en } from "../src/content/en";
import { es } from "../src/content/es";

const PAGES = ["/", "/sisoc", "/shineapp", "/es", "/es/sisoc", "/es/shineapp"];
const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

// Check the source copy independently of the renderer, so omitted sections and future
// additions to a case study cannot silently disappear from the text version.
function contentStrings(value: unknown): string[] {
  if (typeof value === "string") return value ? [value] : [];
  if (Array.isArray(value)) return value.flatMap(contentStrings);
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) => key === "id" ? [] : contentStrings(child));
  }
  return [];
}

test.use({ javaScriptEnabled: false });

test("full text contains all substantive portfolio copy in both languages", async ({ request }) => {
  const response = await request.get("/llms-full.txt", { headers: { "User-Agent": "OAI-SearchBot" } });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toMatch(/^text\/plain;\s*charset=utf-8$/i);
  const text = normalize(await response.text());
  expect(text).toContain("## English");
  expect(text).toContain("## Español");
  expect(text).not.toMatch(/<!doctype|<html|<script/i);

  for (const t of [en, es]) {
    const copy = [t.hero.lines, t.hero.lede, t.hero.sub, t.hero.facts,
      t.work.sisoc, t.work.shine, t.experience.items,
      t.contact.body, t.contact.terms, t.contact.email, t.sisoc, t.shine];
    for (const value of contentStrings(copy)) {
      expect(text, `Missing public copy: ${value}`).toContain(normalize(value));
    }
  }
});

test("reading guide links to all pages, CVs and the full text without redirects", async ({ request }) => {
  const response = await request.get("/llms.txt");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toMatch(/^text\/plain;\s*charset=utf-8$/i);
  const index = await response.text();
  expect(index).toMatch(/^# Juan Ignacio Portilla Kitroser\n/);
  const urls = [...index.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((match) => new URL(match[1]));
  expect(urls.map((url) => url.pathname).sort()).toEqual([
    ...PAGES, "/llms-full.txt",
    "/cv/Juan_Ignacio_Portilla_Kitroser_CV_EN.pdf",
    "/cv/Juan_Ignacio_Portilla_Kitroser_CV_ES.pdf",
  ].sort());

  for (const url of urls) {
    // Request the corresponding local resource even when canonical URLs use the public domain.
    expect((await request.get(url.pathname, { maxRedirects: 0 })).status(), url.pathname).toBe(200);
  }
  expect((await request.head("/llms.txt")).status()).toBe(200);
  expect((await request.head("/llms-full.txt")).status()).toBe(200);
});

test("sitemap lists six canonical pages with reciprocal language alternates", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const sitemap = await response.text();
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  expect(entries).toHaveLength(6);
  expect(entries.map((entry) => new URL(entry.match(/<loc>(.*?)<\/loc>/)![1]).pathname).sort()).toEqual([...PAGES].sort());
  for (const entry of entries) {
    const canonical = entry.match(/<loc>(.*?)<\/loc>/)![1];
    expect(entry).toContain('hreflang="en"');
    expect(entry).toContain('hreflang="es"');
    expect(entry).toContain(`href="${canonical}"`);
  }
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toMatch(/User-Agent: \*\s+Allow: \/\s/i);
  expect(await robots.text()).toContain("/sitemap.xml");
});

for (const path of PAGES) {
  test(`${path} exposes content and the reading guide without JavaScript`, async ({ page }) => {
    const t = path.startsWith("/es") ? es : en;
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('head link[rel="describedby"]')).toHaveAttribute("href", "/llms.txt");
    await expect(page.locator("#contact")).toContainText(t.contact.email);
    await expect(page.locator("#contact")).toContainText(t.contact.body);

    if (path.endsWith("sisoc")) {
      await expect(page.locator("main")).toContainText(t.sisoc.incident.did[1]);
      await expect(page.getByRole("img", { name: t.sisoc.map.title })).toHaveAccessibleDescription(t.sisoc.map.description);
    } else if (path.endsWith("shineapp")) {
      await expect(page.locator("main")).toContainText(t.shine.quote.text);
      await expect(page.locator("main")).toContainText(t.shine.status.body[0]);
    } else {
      for (const item of t.experience.items) {
        await expect(page.getByRole("heading", { name: item.org, exact: true })).toBeVisible();
        for (const bullet of item.bullets) await expect(page.locator("main")).toContainText(bullet);
      }
    }
    const opacities = await page.locator("[data-reveal]").evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).opacity));
    expect(opacities.length).toBeGreaterThan(0);
    expect(opacities.every((opacity) => opacity === "1")).toBe(true);
  });
}
