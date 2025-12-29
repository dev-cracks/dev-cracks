import { Box, Typography, Paper } from '@mui/material';

export default function Documents() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Documentos
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          Lista de documentos solicitados para firma - Próximamente
        </Typography>
      </Paper>
    </Box>
  );
}

