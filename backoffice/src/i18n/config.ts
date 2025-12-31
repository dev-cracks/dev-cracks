import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import deCommon from './locales/de/common.json';
import frCommon from './locales/fr/common.json';
import zhCommon from './locales/zh/common.json';
import enBackoffice from './locales/en/backoffice.json';
import esBackoffice from './locales/es/backoffice.json';
import deBackoffice from './locales/de/backoffice.json';
import frBackoffice from './locales/fr/backoffice.json';
import zhBackoffice from './locales/zh/backoffice.json';

// Recursos de traducción para backoffice
const resources = {
  en: {
    common: enCommon,
    backoffice: enBackoffice,
  },
  es: {
    common: esCommon,
    backoffice: esBackoffice,
  },
  de: {
    common: deCommon,
    backoffice: deBackoffice,
  },
  fr: {
    common: frCommon,
    backoffice: frBackoffice,
  },
  zh: {
    common: zhCommon,
    backoffice: zhBackoffice,
  },
};

// Crear instancia única de i18n para backoffice
export const i18n = createI18nInstance(resources, 'backoffice');

// Exportar función de inicialización para compatibilidad
export const initBackofficeI18n = () => i18n;

export default resources;

