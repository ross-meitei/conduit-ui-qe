import { test as base } from '@playwright/test';
import { PageObjectManager } from '../pageobjects/_manager.po';

/**
 * Extends Playwright's `test` with a `pages` fixture (the PageObjectManager), so
 * specs read as `async ({ pages }) => ...`. Mirrors the Keystone global fixture.
 */
export const test = base.extend<{ pages: PageObjectManager }>({
  pages: async ({ page }, use) => {
    await use(new PageObjectManager(page));
  },
});

export { expect } from '@playwright/test';
