import { expect } from '@playwright/test';
import { BasePage } from './_base.po';

/** Conduit home / global feed (/). */
export class HomePage extends BasePage {
  private readonly banner = () => this.page.getByRole('heading', { name: 'conduit' });
  private readonly articlePreviews = () => this.page.locator('.article-preview');
  private readonly popularTags = () => this.page.locator('.tag-list .tag-pill');

  async open(): Promise<void> {
    await this.navigateTo('/');
    await expect(this.banner()).toBeVisible();
  }

  async expectFeedLoaded(): Promise<void> {
    // Web-first: wait for the first preview to appear rather than sleeping.
    await expect(this.articlePreviews().first()).toBeVisible();
  }

  async openFirstArticle(): Promise<void> {
    await this.articlePreviews().first().getByRole('link', { name: 'Read more...' }).click();
  }

  async firstPopularTag(): Promise<string> {
    await expect(this.popularTags().first()).toBeVisible();
    return (await this.popularTags().first().innerText()).trim();
  }
}
