import { expect } from '@playwright/test';
import { BasePage } from './_base.po';
import { ArticleDraft } from '../types/article-info';

/** Conduit article editor (/editor). */
export class EditorPage extends BasePage {
  private readonly title = () => this.page.getByPlaceholder('Article Title');
  private readonly about = () => this.page.getByPlaceholder("What's this article about?");
  private readonly body = () => this.page.getByPlaceholder('Write your article (in markdown)');
  private readonly tags = () => this.page.getByPlaceholder('Enter tags');
  private readonly publishButton = () => this.page.getByRole('button', { name: 'Publish Article' });

  async open(): Promise<void> {
    await this.navigateTo('/editor');
    await expect(this.publishButton()).toBeVisible();
  }

  async publish(draft: ArticleDraft): Promise<void> {
    await this.title().fill(draft.title);
    await this.about().fill(draft.description);
    await this.body().fill(draft.body);
    for (const tag of draft.tags) {
      await this.tags().fill(tag);
      await this.tags().press('Enter');
    }
    await this.publishButton().click();
  }
}
