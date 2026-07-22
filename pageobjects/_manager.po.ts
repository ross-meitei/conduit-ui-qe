import { Page } from '@playwright/test';
import { LoginPage } from './login.po';
import { HomePage } from './home.po';
import { EditorPage } from './editor.po';
import { ArticlePage } from './article.po';

/*
  Lazily instantiates page objects as tests reference them, so specs stay terse
  (`pages.login`, `pages.editor`, ...). Mirrors the Keystone PageObjectManager.
*/
export class PageObjectManager {
  private page: Page;
  private instances = new Map<string, unknown>();

  constructor(page: Page) {
    this.page = page;
  }

  private get<T>(key: string, Ctor: new (page: Page) => T): T {
    if (!this.instances.has(key)) {
      this.instances.set(key, new Ctor(this.page));
    }
    return this.instances.get(key) as T;
  }

  get login(): LoginPage {
    return this.get('login', LoginPage);
  }
  get home(): HomePage {
    return this.get('home', HomePage);
  }
  get editor(): EditorPage {
    return this.get('editor', EditorPage);
  }
  get article(): ArticlePage {
    return this.get('article', ArticlePage);
  }
}
