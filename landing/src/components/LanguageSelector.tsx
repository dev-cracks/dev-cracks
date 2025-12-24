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
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        style={{
          padding: '0.5rem',
          backgroundColor: 'transparent',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <option key={code} value={code} style={{ backgroundColor: '#1a1a1a', color: 'white' }}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

