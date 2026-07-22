import { expect } from '@playwright/test';
import { BasePage } from './_base.po';

/** Conduit sign-in page (/login). */
export class LoginPage extends BasePage {
  private readonly email = () => this.page.getByPlaceholder('Email');
  private readonly password = () => this.page.getByPlaceholder('Password');
  private readonly signInButton = () => this.page.getByRole('button', { name: 'Sign in' });
  private readonly errorMessages = () => this.page.locator('.error-messages li');

  async open(): Promise<void> {
    await this.navigateTo('/login');
    await expect(this.signInButton()).toBeVisible();
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.email().fill(email);
    await this.password().fill(password);
    await this.signInButton().click();
  }

  async expectSignedIn(): Promise<void> {
    // The nav shows "New Article" / "Settings" only when authenticated.
    await expect(this.page.getByRole('link', { name: 'New Article' })).toBeVisible();
  }

  async expectError(): Promise<void> {
    await expect(this.errorMessages().first()).toBeVisible();
  }
}
