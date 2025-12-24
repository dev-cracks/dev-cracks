import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '../../../i18n/index.ts';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = (i18n.language || 'en') as SupportedLanguage;
  const currentLanguageName = supportedLanguages[currentLanguage] || 'English';

  return (
    <select
      value={currentLanguage}
      onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
      className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm cursor-pointer hover:border-primary-500 transition-colors"
    >
      {Object.entries(supportedLanguages).map(([code, name]) => (
        <option key={code} value={code} className="bg-gray-800">
          {name}
        </option>
      ))}
    </select>
  );
};

