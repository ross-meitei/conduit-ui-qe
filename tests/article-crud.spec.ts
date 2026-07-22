import { test, expect } from '../utils/global-fixture';
import { setAllureValues } from '../utils/allure';
import { ARTICLES, TESTS } from '../utils/tags';
import { credentials, newArticleDraft } from '../utils/test-data-generator';
import { Severity } from 'allure-js-commons';

const { email, password } = credentials();

test.describe('Article authoring', () => {
  test.skip(!email || !password, 'Set APP_EMAIL and APP_PASSWORD to run article E2E.');

  test.beforeEach(async ({ pages }) => {
    await pages.login.open();
    await pages.login.signIn(email, password);
    await pages.login.expectSignedIn();
  });

  test('publish then delete an article round-trips', async ({ pages, page }) => {
    await setAllureValues({
      description:
        'Given a signed-in author, When they publish an article and then delete it, Then it appears and is removed.',
      tags: [ARTICLES.feature, ARTICLES.epics.CREATE, ARTICLES.epics.DELETE, TESTS.CRITICAL],
      feature: ARTICLES.feature,
      epic: ARTICLES.epics.CREATE,
      severity: Severity.CRITICAL,
    });

    const draft = newArticleDraft();

    await test.step('publish the article', async () => {
      await pages.editor.open();
      await pages.editor.publish(draft);
    });

    await test.step('verify the published article', async () => {
      await pages.article.expectTitle(draft.title);
      await pages.article.expectTag('qe');
      await expect(page.getByRole('button', { name: 'Delete Article' }).first()).toBeVisible();
    });

    await test.step('delete the article', async () => {
      await pages.article.delete();
    });
  });

  test('the home feed loads global articles', async ({ pages }) => {
    await setAllureValues({
      description: 'Given the site has content, When the home feed loads, Then article previews are shown.',
      tags: [ARTICLES.feature, ARTICLES.epics.READ, TESTS.SMOKE],
      feature: ARTICLES.feature,
      epic: ARTICLES.epics.READ,
      severity: Severity.NORMAL,
    });

    await pages.home.open();
    await pages.home.expectFeedLoaded();
  });
});
