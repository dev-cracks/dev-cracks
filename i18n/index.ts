// Configuración base de i18next para todos los proyectos
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Idiomas soportados
export const supportedLanguages = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  zh: '中文'
} as const;

export type SupportedLanguage = keyof typeof supportedLanguages;

// Idioma por defecto
export const defaultLanguage: SupportedLanguage = 'en';

// Configuración base de i18next
export const i18nConfig = {
  fallbackLng: defaultLanguage,
  supportedLngs: Object.keys(supportedLanguages),
  debug: false,
  
  interpolation: {
    escapeValue: false, // React ya escapa valores
  },

  detection: {
    // Orden de detección del idioma
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
    lookupLocalStorage: 'i18nextLng',
  },
};

// Función para crear una nueva instancia de i18next para cada proyecto
// NO usar initReactI18next aquí - I18nextProvider lo manejará
export function createI18nInstance(resources: Record<string, any>, namespace: string) {
  const i18n = i18next.createInstance();
  
  // Inicializar i18next sin initReactI18next
  // I18nextProvider se encargará del contexto de React
  i18n
    .use(LanguageDetector)
    .init({
      ...i18nConfig,
      resources,
      defaultNS: namespace,
      ns: [namespace, 'common'],
    });
  
  return i18n;
}

// Exportar la función de inicialización para compatibilidad
export async function initI18n(resources: Record<string, any>, namespace: string) {
  return createI18nInstance(resources, namespace);
}

export default i18next;

