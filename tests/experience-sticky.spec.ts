import { expect, test } from "@playwright/test";

for (const path of ["/", "/es"]) {
  test(`${path} experience intro sticks only on desktop and releases before contact`, async ({ page, isMobile }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const intro = page.locator("#exp-h").locator("..");
    const section = page.locator("#experience");
    const start = await section.evaluate(el => el.getBoundingClientRect().top + scrollY);
    const scrollTo = async (y: number) => {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), y);
    };
    await scrollTo(start + 200);
    if (isMobile) {
      await expect(intro).toHaveCSS("position", "static");
      const first = (await intro.boundingBox())!.y;
      await scrollTo(start + 400);
      expect((await intro.boundingBox())!.y).toBeCloseTo(first - 200, 0);
    } else {
      await expect(intro).toHaveCSS("position", "sticky");
      const first = (await intro.boundingBox())!.y;
      const header = (await page.locator("header").boundingBox())!;
      expect(first).toBeGreaterThanOrEqual(header.y + header.height + 16);
      await scrollTo(start + 400);
      expect((await intro.boundingBox())!.y).toBeCloseTo(first, 0);
      const end = await section.evaluate(el => el.getBoundingClientRect().bottom + scrollY);
      await scrollTo(end - 150);
      const box = (await intro.boundingBox())!;
      expect(box.y).toBeLessThan(first);
      expect(box.y + box.height).toBeLessThanOrEqual((await section.boundingBox())!.y + (await section.boundingBox())!.height + 1);
      expect(box.y + box.height).toBeLessThanOrEqual((await page.locator("#contact").boundingBox())!.y + 1);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  });
}
