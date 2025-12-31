import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import deCommon from './locales/de/common.json';
import frCommon from './locales/fr/common.json';
import zhCommon from './locales/zh/common.json';
import enRouteOn from './locales/en/route-on.json';
import esRouteOn from './locales/es/route-on.json';
import deRouteOn from './locales/de/route-on.json';
import frRouteOn from './locales/fr/route-on.json';
import zhRouteOn from './locales/zh/route-on.json';

const resources = {
  en: { common: enCommon, 'route-on': enRouteOn },
  es: { common: esCommon, 'route-on': esRouteOn },
  de: { common: deCommon, 'route-on': deRouteOn },
  fr: { common: frCommon, 'route-on': frRouteOn },
  zh: { common: zhCommon, 'route-on': zhRouteOn },
};

export const i18n = createI18nInstance(resources, 'route-on');
export const initRouteOnI18n = () => i18n;

export default resources;

