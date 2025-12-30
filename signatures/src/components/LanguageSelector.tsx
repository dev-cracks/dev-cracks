import { useTranslation } from 'react-i18next';
import { supportedLanguages, type SupportedLanguage } from '../../../i18n/index.ts';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  const currentLanguage = (i18n.language || 'es') as SupportedLanguage;

  return (
    <FormControl size="small" sx={{ minWidth: 120, mr: 2 }}>
      <InputLabel id="language-select-label" sx={{ color: 'white' }}>Idioma</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={currentLanguage}
        label="Idioma"
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        sx={{
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.23)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 255, 255, 0.5)',
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
        }}
      >
        {Object.entries(supportedLanguages).map(([code, name]) => (
          <MenuItem key={code} value={code}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

