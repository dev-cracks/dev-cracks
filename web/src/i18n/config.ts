import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import deCommon from './locales/de/common.json';
import frCommon from './locales/fr/common.json';
import zhCommon from './locales/zh/common.json';
import enWeb from './locales/en/web.json';
import esWeb from './locales/es/web.json';
import deWeb from './locales/de/web.json';
import frWeb from './locales/fr/web.json';
import zhWeb from './locales/zh/web.json';

const resources = {
  en: { common: enCommon, web: enWeb },
  es: { common: esCommon, web: esWeb },
  de: { common: deCommon, web: deWeb },
  fr: { common: frCommon, web: frWeb },
  zh: { common: zhCommon, web: zhWeb },
};

export const i18n = createI18nInstance(resources, 'web');
export const initWebI18n = () => i18n;

export default resources;

