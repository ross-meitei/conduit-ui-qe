import { allure } from 'allure-playwright';
import { Severity } from 'allure-js-commons';

interface AllureValues {
  description: string;
  tags: string[];
  feature: string;
  epic: string;
  severity?: Severity;
}

/** Attach Allure metadata to the current test (mirrors the Keystone helper). */
export async function setAllureValues(values: AllureValues): Promise<void> {
  await allure.description(values.description);
  await allure.epic(values.epic);
  await allure.feature(values.feature);
  await allure.severity(values.severity ?? Severity.NORMAL);
  for (const tag of values.tags) {
    await allure.tag(tag);
  }
}
