import { Page, TestInfo } from '@playwright/test';

/** Shared base for every page object: navigation, waits, and evidence capture. */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle');
  }

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async takeScreenshot(name: string, testInfo: TestInfo): Promise<void> {
    const file = `screenshots/${name}-${testInfo.project.name}.png`;
    await this.page.screenshot({ path: file });
    await testInfo.attach(name, { path: file, contentType: 'image/png' });
  }
}
