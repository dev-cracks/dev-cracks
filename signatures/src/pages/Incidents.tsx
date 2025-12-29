import { Box, Typography, Paper } from '@mui/material';

export default function Incidents() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Incidencias
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          Gestión de incidencias - Próximamente
        </Typography>
      </Paper>
    </Box>
  );
}

