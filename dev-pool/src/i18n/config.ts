import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from '../../../i18n/locales/en/common.json';
import esCommon from '../../../i18n/locales/es/common.json';
import deCommon from '../../../i18n/locales/de/common.json';
import frCommon from '../../../i18n/locales/fr/common.json';
import zhCommon from '../../../i18n/locales/zh/common.json';
import enDevPool from '../../../i18n/locales/en/dev-pool.json';
import esDevPool from '../../../i18n/locales/es/dev-pool.json';
import deDevPool from '../../../i18n/locales/de/dev-pool.json';
import frDevPool from '../../../i18n/locales/fr/dev-pool.json';
import zhDevPool from '../../../i18n/locales/zh/dev-pool.json';

const resources = {
  en: { common: enCommon, 'dev-pool': enDevPool },
  es: { common: esCommon, 'dev-pool': esDevPool },
  de: { common: deCommon, 'dev-pool': deDevPool },
  fr: { common: frCommon, 'dev-pool': frDevPool },
  zh: { common: zhCommon, 'dev-pool': zhDevPool },
};

export const i18n = createI18nInstance(resources, 'dev-pool');
export const initDevPoolI18n = () => i18n;

export default resources;

