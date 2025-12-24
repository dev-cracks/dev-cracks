import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from '../../../i18n/locales/en/common.json';
import esCommon from '../../../i18n/locales/es/common.json';
import deCommon from '../../../i18n/locales/de/common.json';
import frCommon from '../../../i18n/locales/fr/common.json';
import zhCommon from '../../../i18n/locales/zh/common.json';
import enPortal from '../../../i18n/locales/en/portal.json';
import esPortal from '../../../i18n/locales/es/portal.json';
import dePortal from '../../../i18n/locales/de/portal.json';
import frPortal from '../../../i18n/locales/fr/portal.json';
import zhPortal from '../../../i18n/locales/zh/portal.json';

const resources = {
  en: { common: enCommon, portal: enPortal },
  es: { common: esCommon, portal: esPortal },
  de: { common: deCommon, portal: dePortal },
  fr: { common: frCommon, portal: frPortal },
  zh: { common: zhCommon, portal: zhPortal },
};

export const i18n = createI18nInstance(resources, 'portal');
export const initPortalI18n = () => i18n;

export default resources;

