import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from '../../../i18n/locales/en/common.json';
import esCommon from '../../../i18n/locales/es/common.json';
import deCommon from '../../../i18n/locales/de/common.json';
import frCommon from '../../../i18n/locales/fr/common.json';
import zhCommon from '../../../i18n/locales/zh/common.json';
import enLanding from '../../../i18n/locales/en/landing.json';
import esLanding from '../../../i18n/locales/es/landing.json';
import deLanding from '../../../i18n/locales/de/landing.json';
import frLanding from '../../../i18n/locales/fr/landing.json';
import zhLanding from '../../../i18n/locales/zh/landing.json';

// Recursos de traducción para landing
const resources = {
  en: {
    common: enCommon,
    landing: enLanding,
  },
  es: {
    common: esCommon,
    landing: esLanding,
  },
  de: {
    common: deCommon,
    landing: deLanding,
  },
  fr: {
    common: frCommon,
    landing: frLanding,
  },
  zh: {
    common: zhCommon,
    landing: zhLanding,
  },
};

// Crear instancia única de i18n para landing
export const i18n = createI18nInstance(resources, 'landing');

// Exportar función de inicialización para compatibilidad
export const initLandingI18n = () => i18n;

export default resources;

