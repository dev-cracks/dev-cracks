import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '../i18n/config';

interface I18nProviderProps {
  children: ReactNode;
}

// I18nProvider envuelve los children con I18nextProvider
// que proporciona el contexto de React para i18next
export const I18nProvider = ({ children }: I18nProviderProps) => {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

