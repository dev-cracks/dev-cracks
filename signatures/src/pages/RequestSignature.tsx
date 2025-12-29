import { Box, Typography, Paper } from '@mui/material';

export default function RequestSignature() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Solicitar Firma de Documentos
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          Formulario para solicitar firma de documentos - Próximamente
        </Typography>
      </Paper>
    </Box>
  );
}

