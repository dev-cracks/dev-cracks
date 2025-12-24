import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from '../../../i18n/locales/en/common.json';
import esCommon from '../../../i18n/locales/es/common.json';
import deCommon from '../../../i18n/locales/de/common.json';
import frCommon from '../../../i18n/locales/fr/common.json';
import zhCommon from '../../../i18n/locales/zh/common.json';
import enDevCoach from '../../../i18n/locales/en/dev-coach.json';
import esDevCoach from '../../../i18n/locales/es/dev-coach.json';
import deDevCoach from '../../../i18n/locales/de/dev-coach.json';
import frDevCoach from '../../../i18n/locales/fr/dev-coach.json';
import zhDevCoach from '../../../i18n/locales/zh/dev-coach.json';

const resources = {
  en: { common: enCommon, 'dev-coach': enDevCoach },
  es: { common: esCommon, 'dev-coach': esDevCoach },
  de: { common: deCommon, 'dev-coach': deDevCoach },
  fr: { common: frCommon, 'dev-coach': frDevCoach },
  zh: { common: zhCommon, 'dev-coach': zhDevCoach },
};

export const i18n = createI18nInstance(resources, 'dev-coach');
export const initDevCoachI18n = () => i18n;

export default resources;

