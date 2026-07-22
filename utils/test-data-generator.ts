import { ArticleDraft } from '../types/article-info';

/** Unique-enough article drafts so parallel runs don't collide on the demo backend. */
export function newArticleDraft(): ArticleDraft {
  const unique = Math.random().toString(36).slice(2, 8);
  return {
    title: `Playwright E2E article ${unique}`,
    description: `Created by the Conduit E2E suite (${unique})`,
    body: 'This article was created by an automated end-to-end test and will be deleted.',
    tags: ['qe', 'e2e'],
  };
}

export function credentials(): { email: string; password: string } {
  return {
    email: process.env.APP_EMAIL ?? '',
    password: process.env.APP_PASSWORD ?? '',
  };
}
