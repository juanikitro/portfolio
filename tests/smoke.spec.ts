import { expect, test } from "@playwright/test";

const PAGES = [
  { path: "/", h1: /The system grows/ },
  { path: "/sisoc", h1: /An engineering system/ },
  { path: "/shineapp", h1: /paper notebook/ },
  { path: "/es", h1: /El sistema crece/ },
  { path: "/es/sisoc", h1: /Un sistema de ingeniería/ },
  { path: "/es/shineapp", h1: /cuaderno de un amigo/ },
];

for (const p of PAGES) {
  test(`${p.path} renders without horizontal overflow`, async ({ page }) => {
    const res = await page.goto(p.path);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(p.h1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBe(0);
    // the root clips horizontal overflow, so also check that the layout itself fits the viewport
    const widest = await page.evaluate(() => Math.max(...[...document.querySelectorAll("main, main > *, header, footer")].map((el) => el.getBoundingClientRect().right)));
    expect(widest).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
  });
}

test("/en paths redirect to the unprefixed English URL", async ({ page }) => {
  await page.goto("/en/sisoc");
  await expect(page).toHaveURL(/\/sisoc$/);
});

test("unknown locale is a 404", async ({ page }) => {
  const res = await page.goto("/fr");
  expect(res?.status()).toBe(404);
});

test("language switch keeps the current page and stays at the top", async ({ page }) => {
  await page.goto("/sisoc");
  await page.getByRole("link", { name: "Ver en español" }).click();
  await expect(page).toHaveURL(/\/es\/sisoc$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await page.waitForTimeout(800);
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

test("theme toggle switches between light and dark and persists", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("CV download follows the page language and the files exist", async ({ page, request }) => {
  for (const [path, file] of [["/", "CV_EN.pdf"], ["/es", "CV_ES.pdf"]]) {
    await page.goto(path);
    const href = await page.locator("#contact a[href$='.pdf']").getAttribute("href");
    expect(href).toContain(file);
    expect((await request.get(href!)).status()).toBe(200);
  }
});

test("The King Shine links to its Instagram on the ShineApp case", async ({ page }) => {
  await page.goto("/shineapp");
  const links = page.locator("main a[href='https://www.instagram.com/thekingshine_/']");
  expect(await links.count()).toBeGreaterThan(2);
});

test("header shows the full name; on phones it replaces the nav links", async ({ page, isMobile }) => {
  await page.goto("/");
  const header = page.locator("header");
  if (isMobile) {
    await expect(header.getByRole("link", { name: "Juan Ignacio Portilla Kitroser" })).toBeVisible();
    await expect(header.getByRole("navigation", { name: "Main" })).toBeHidden();
  } else {
    await expect(header.getByRole("navigation", { name: "Main" })).toBeVisible();
    await expect(header.getByRole("link", { name: "Juan Ignacio Portilla Kitroser" })).toBeVisible();
  }
});

test("navigating from the hero to a case lands at the top of the page", async ({ page }) => {
  // regression: with smooth scrolling on <html>, this navigation used to end at the bottom of /sisoc
  await page.goto("/");
  await page.locator("main nav a[href*=sisoc]").first().click();
  await page.waitForURL(/sisoc$/);
  await page.waitForTimeout(1200);
  expect(await page.evaluate(() => scrollY)).toBe(0);
});

test("hero leaves a header-sized gap at the bottom of the first screen", async ({ page }) => {
  await page.goto("/");
  const { heroBottom, header, vh } = await page.evaluate(() => ({
    heroBottom: document.querySelector("main > div")!.getBoundingClientRect().bottom,
    header: document.querySelector("header")!.getBoundingClientRect().height,
    vh: innerHeight,
  }));
  // tall content may push the hero past the minimum; it must never be shorter
  expect(heroBottom).toBeGreaterThanOrEqual(vh - header - 2);
});
