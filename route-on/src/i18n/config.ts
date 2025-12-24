import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from '../../../i18n/locales/en/common.json';
import esCommon from '../../../i18n/locales/es/common.json';
import deCommon from '../../../i18n/locales/de/common.json';
import frCommon from '../../../i18n/locales/fr/common.json';
import zhCommon from '../../../i18n/locales/zh/common.json';
import enRouteOn from '../../../i18n/locales/en/route-on.json';
import esRouteOn from '../../../i18n/locales/es/route-on.json';
import deRouteOn from '../../../i18n/locales/de/route-on.json';
import frRouteOn from '../../../i18n/locales/fr/route-on.json';
import zhRouteOn from '../../../i18n/locales/zh/route-on.json';

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

