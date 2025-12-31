import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import deCommon from './locales/de/common.json';
import frCommon from './locales/fr/common.json';
import zhCommon from './locales/zh/common.json';
import enDevCoach from './locales/en/dev-coach.json';
import esDevCoach from './locales/es/dev-coach.json';
import deDevCoach from './locales/de/dev-coach.json';
import frDevCoach from './locales/fr/dev-coach.json';
import zhDevCoach from './locales/zh/dev-coach.json';

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

