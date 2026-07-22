import { PlaywrightTestConfig } from '@playwright/test';
import * as os from 'node:os';

// Per-environment base URLs. Production is intentionally absent - E2E runs
// against the public demo.
const baseUrls: { [key: string]: string } = {
  Local: 'http://localhost:4100',
  Development: 'https://demo.realworld.show',
};

const config: PlaywrightTestConfig = {
  testDir: 'tests/',
  outputDir: 'test-results',
  fullyParallel: true,
  timeout: 90 * 1000,
  retries: process.env.CI ? 2 : 0,
  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        suiteTitle: true,
        environmentInfo: {
          os_platform: os.platform(),
          node_version: process.version,
          target: process.env.TEST_ENV || 'Development',
        },
      },
    ],
  ],
  use: {
    baseURL: baseUrls[process.env.TEST_ENV || 'Development'],
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    { name: 'Chrome', use: { browserName: 'chromium', channel: 'chromium' } },
    { name: 'Edge', use: { browserName: 'chromium', channel: 'msedge' } },
    { name: 'Safari', use: { browserName: 'webkit' } },
  ],
};

export default config;
