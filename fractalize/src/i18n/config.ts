import { createI18nInstance } from '../../../i18n/index.ts';
import enCommon from '../../../i18n/locales/en/common.json';
import esCommon from '../../../i18n/locales/es/common.json';
import deCommon from '../../../i18n/locales/de/common.json';
import frCommon from '../../../i18n/locales/fr/common.json';
import zhCommon from '../../../i18n/locales/zh/common.json';
import enFractalize from '../../../i18n/locales/en/fractalize.json';
import esFractalize from '../../../i18n/locales/es/fractalize.json';
import deFractalize from '../../../i18n/locales/de/fractalize.json';
import frFractalize from '../../../i18n/locales/fr/fractalize.json';
import zhFractalize from '../../../i18n/locales/zh/fractalize.json';

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

