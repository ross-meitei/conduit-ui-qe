import { expect, Locator } from '@playwright/test';
import { BasePage } from './_base.po';

/** Conduit article page (/article/{slug}). */
export class ArticlePage extends BasePage {
  private readonly title = () => this.page.getByRole('heading').first();
  private readonly deleteButtons = () => this.page.getByRole('button', { name: 'Delete Article' });

  async expectTitle(expected: string): Promise<void> {
    await expect(this.title()).toHaveText(expected);
  }

  async expectTag(tag: string): Promise<void> {
    await expect(this.page.locator('.tag-list').getByText(tag, { exact: true })).toBeVisible();
  }

  async delete(): Promise<void> {
    const button: Locator = this.deleteButtons().first();
    await expect(button).toBeVisible();
    await button.click();
    // Deleting redirects to the home feed.
    await expect(this.page.getByRole('heading', { name: 'conduit' })).toBeVisible();
  }
}
