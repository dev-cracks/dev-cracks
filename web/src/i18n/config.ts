import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from '../../../i18n/locales/en/common.json';
import esCommon from '../../../i18n/locales/es/common.json';
import deCommon from '../../../i18n/locales/de/common.json';
import frCommon from '../../../i18n/locales/fr/common.json';
import zhCommon from '../../../i18n/locales/zh/common.json';
import enWeb from '../../../i18n/locales/en/web.json';
import esWeb from '../../../i18n/locales/es/web.json';
import deWeb from '../../../i18n/locales/de/web.json';
import frWeb from '../../../i18n/locales/fr/web.json';
import zhWeb from '../../../i18n/locales/zh/web.json';

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

