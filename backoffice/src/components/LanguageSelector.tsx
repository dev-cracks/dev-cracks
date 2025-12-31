import { Button, Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from '@fluentui/react-components';
import { GlobeRegular } from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '../../../i18n/index.ts';

export const LanguageSelector = () => {
  const { i18n, t } = useTranslation('backoffice');

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = (i18n.language || 'en') as SupportedLanguage;
  const currentLanguageName = supportedLanguages[currentLanguage] || 'English';

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button
          appearance="subtle"
          icon={<GlobeRegular />}
          aria-label={t('languageSelector.selectLanguage')}
        >
          {currentLanguageName}
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {Object.entries(supportedLanguages).map(([code, name]) => (
            <MenuItem
              key={code}
              onClick={() => handleLanguageChange(code as SupportedLanguage)}
              checked={currentLanguage === code}
            >
              {name}
            </MenuItem>
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

