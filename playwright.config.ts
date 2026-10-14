import { defineConfig, devices } from "@playwright/test";

// Smoke tests against the production build: `npm run build && npm run test:e2e`.
export default defineConfig({
  testDir: "tests",
  use: { baseURL: "http://localhost:3100" },
  webServer: { command: "npx next start -p 3100", url: "http://localhost:3100", reuseExistingServer: true },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
