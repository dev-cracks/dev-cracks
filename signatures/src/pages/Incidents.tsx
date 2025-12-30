import { useTranslation } from 'react-i18next';
import { Box, Typography, Paper } from '@mui/material';

export default function Incidents() {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('incidents.title')}
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          {t('incidents.subtitle')}
        </Typography>
      </Paper>
    </Box>
  );
}

