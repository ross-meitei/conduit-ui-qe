// Test-type tags, used with `--grep` in the test:ui:* scripts (mirrors Keystone).
export const TESTS = {
  SMOKE: '@SmokeTest',
  REGRESSION: '@RegressionTest',
  CRITICAL: '@CriticalTest',
  UI: '@UITest',
};

export const AUTHENTICATION = {
  feature: '@Authentication',
  epics: {
    LOGIN: '@Login',
    SESSION: '@Session',
  },
};

export const ARTICLES = {
  feature: '@Articles',
  epics: {
    CREATE: '@ArticleCreate',
    READ: '@ArticleRead',
    DELETE: '@ArticleDelete',
  },
};
