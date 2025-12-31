import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import deCommon from './locales/de/common.json';
import frCommon from './locales/fr/common.json';
import zhCommon from './locales/zh/common.json';
import enPortal from './locales/en/portal.json';
import esPortal from './locales/es/portal.json';
import dePortal from './locales/de/portal.json';
import frPortal from './locales/fr/portal.json';
import zhPortal from './locales/zh/portal.json';

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

