import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import deCommon from './locales/de/common.json';
import frCommon from './locales/fr/common.json';
import zhCommon from './locales/zh/common.json';
import enDevPool from './locales/en/dev-pool.json';
import esDevPool from './locales/es/dev-pool.json';
import deDevPool from './locales/de/dev-pool.json';
import frDevPool from './locales/fr/dev-pool.json';
import zhDevPool from './locales/zh/dev-pool.json';

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

