import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from './locales/en/common.json';
import esCommon from './locales/es/common.json';
import deCommon from './locales/de/common.json';
import frCommon from './locales/fr/common.json';
import zhCommon from './locales/zh/common.json';
import enFractalize from './locales/en/fractalize.json';
import esFractalize from './locales/es/fractalize.json';
import deFractalize from './locales/de/fractalize.json';
import frFractalize from './locales/fr/fractalize.json';
import zhFractalize from './locales/zh/fractalize.json';

const resources = {
  en: { common: enCommon, fractalize: enFractalize },
  es: { common: esCommon, fractalize: esFractalize },
  de: { common: deCommon, fractalize: deFractalize },
  fr: { common: frCommon, fractalize: frFractalize },
  zh: { common: zhCommon, fractalize: zhFractalize },
};

export const i18n = createI18nInstance(resources, 'fractalize');
export const initFractalizeI18n = () => i18n;

export default resources;

