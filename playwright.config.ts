import { defineConfig, devices } from "@playwright/test";

// Smoke tests against the production build: `npm run build && npm run test:e2e`.
// Against a deployed site: `BASE_URL=https://juanikitro.vercel.app npm run test:e2e` (no local server is started).
const baseURL = process.env.BASE_URL ?? "http://localhost:3100";

export default defineConfig({
  testDir: "tests",
  use: { baseURL },
  webServer: process.env.BASE_URL ? undefined : { command: "npx next start -p 3100", url: baseURL, reuseExistingServer: true },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
