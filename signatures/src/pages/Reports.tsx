import { Box, Typography, Paper } from '@mui/material';

export default function Reports() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Reportes
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1">
          Reportes y estadísticas - Próximamente
        </Typography>
      </Paper>
    </Box>
  );
}

