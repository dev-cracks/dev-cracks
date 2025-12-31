import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '../../../i18n/index.ts';
import './LanguageSelector.css';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = (i18n.language || 'en') as SupportedLanguage;

  return (
    <div className="language-selector">
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        className="language-selector__select"
      >
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
