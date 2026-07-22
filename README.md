# Conduit UI QE (TypeScript / Playwright)

End-to-end tests for the public **RealWorld "Conduit"** storefront
(`https://demo.realworld.show`). Mirrors a real
client engagement: **Playwright** + the **Page Object Model** + **allure-playwright**
reporting, run across Chrome / Edge / Safari.

## Layout

```
playwright.config.ts     multi-project (Chrome/Edge/Safari), allure-playwright reporter
package.json             playwright, allure-playwright/commandline, @axe-core/playwright, typescript
tsconfig.json
pageobjects/             POM: _base, _manager (lazy), login, home, editor, article
utils/                   global-fixture (pages), tags, allure, constants, test-data-generator
types/                   shared TS types
tests/                   auth.spec.ts, article-crud.spec.ts
```

## Page Object Model

`pageobjects/_manager.po.ts` lazily instantiates page objects so specs read as
`async ({ pages }) => ...` via the `pages` fixture in `utils/global-fixture.ts`.
Each page object extends `_base.po.ts` and uses stable role/label/placeholder
locators with web-first assertions (no hard waits).

## Run

```bash
npm install && npx playwright install
export APP_EMAIL=... APP_PASSWORD=...          # a RealWorld demo account
TEST_ENV=Development TAGS=@SmokeTest npm run test:ui:chrome
npm run allure:generate && npm run allure:open
```

Type-check the suite with `npx tsc --noEmit`.

Production is intentionally not targeted; no secret or production URL
is hardcoded (credentials come from environment variables).
