import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import deCommon from './locales/de/common.json';
import frCommon from './locales/fr/common.json';
import zhCommon from './locales/zh/common.json';
import enLanding from './locales/en/landing.json';
import esLanding from './locales/es/landing.json';
import deLanding from './locales/de/landing.json';
import frLanding from './locales/fr/landing.json';
import zhLanding from './locales/zh/landing.json';

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

