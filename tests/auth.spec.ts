import { test, expect } from '../utils/global-fixture';
import { setAllureValues } from '../utils/allure';
import { AUTHENTICATION, TESTS } from '../utils/tags';
import { credentials } from '../utils/test-data-generator';
import { Severity } from 'allure-js-commons';

const { email, password } = credentials();

test.describe('Authentication', () => {
  test('a registered user can sign in', async ({ pages, page }) => {
    test.skip(!email || !password, 'Set APP_EMAIL and APP_PASSWORD to run auth E2E.');
    await setAllureValues({
      description: 'Given valid credentials, When the user signs in, Then the app shows an authenticated nav.',
      tags: [AUTHENTICATION.feature, AUTHENTICATION.epics.LOGIN, TESTS.SMOKE],
      feature: AUTHENTICATION.feature,
      epic: AUTHENTICATION.epics.LOGIN,
      severity: Severity.CRITICAL,
    });

    await test.step('sign in', async () => {
      await pages.login.open();
      await pages.login.signIn(email, password);
    });

    await test.step('verify authenticated', async () => {
      await pages.login.expectSignedIn();
      await expect(page.getByRole('link', { name: 'Settings' })).toBeVisible();
    });
  });

  test('invalid credentials show an error', async ({ pages }) => {
    await setAllureValues({
      description: 'Given wrong credentials, When the user signs in, Then an error message appears.',
      tags: [AUTHENTICATION.feature, AUTHENTICATION.epics.LOGIN, TESTS.REGRESSION],
      feature: AUTHENTICATION.feature,
      epic: AUTHENTICATION.epics.LOGIN,
      severity: Severity.NORMAL,
    });

    await pages.login.open();
    await pages.login.signIn('nobody@conduit-qe.test', `wrong-${Date.now()}`);
    await pages.login.expectError();
  });
});
