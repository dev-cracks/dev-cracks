import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from '../../../i18n/locales/en/common.json';
import esCommon from '../../../i18n/locales/es/common.json';
import deCommon from '../../../i18n/locales/de/common.json';
import frCommon from '../../../i18n/locales/fr/common.json';
import zhCommon from '../../../i18n/locales/zh/common.json';
import enBackoffice from '../../../i18n/locales/en/backoffice.json';
import esBackoffice from '../../../i18n/locales/es/backoffice.json';
import deBackoffice from '../../../i18n/locales/de/backoffice.json';
import frBackoffice from '../../../i18n/locales/fr/backoffice.json';
import zhBackoffice from '../../../i18n/locales/zh/backoffice.json';

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

