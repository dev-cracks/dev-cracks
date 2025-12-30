import { useTranslation } from 'react-i18next';
import { Box, Grid, Paper, Typography } from '@mui/material';
import StatsCard from '../components/dashboard/StatsCard';
import LineChartComponent from '../components/dashboard/LineChart';
import RecentDocuments from '../components/dashboard/RecentDocuments';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

// Datos de ejemplo para el gráfico
const chartData = [
  { name: 'Ene', firmados: 12, pendientes: 8 },
  { name: 'Feb', firmados: 19, pendientes: 5 },
  { name: 'Mar', firmados: 15, pendientes: 10 },
  { name: 'Abr', firmados: 22, pendientes: 7 },
  { name: 'May', firmados: 18, pendientes: 9 },
  { name: 'Jun', firmados: 25, pendientes: 6 },
];

// Datos de ejemplo para documentos recientes
const recentDocuments = [
  {
    id: '1',
    name: 'Contrato de Servicios',
    status: 'signed' as const,
    signer: 'Juan Pérez',
    date: '2024-01-15',
  },
  {
    id: '2',
    name: 'Acuerdo de Confidencialidad',
    status: 'pending' as const,
    signer: 'María García',
    date: '2024-01-14',
  },
  {
    id: '3',
    name: 'Propuesta Comercial',
    status: 'signed' as const,
    signer: 'Carlos López',
    date: '2024-01-13',
  },
  {
    id: '4',
    name: 'Términos y Condiciones',
    status: 'pending' as const,
    signer: 'Ana Martínez',
    date: '2024-01-12',
  },
  {
    id: '5',
    name: 'Contrato de Trabajo',
    status: 'rejected' as const,
    signer: 'Pedro Sánchez',
    date: '2024-01-11',
  },
];

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('dashboard.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t('dashboard.subtitle')}
      </Typography>

      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title={t('dashboard.totalDocuments')}
            value="156"
            icon={<DescriptionIcon sx={{ fontSize: 40 }} />}
            color="#58a6ff"
            change={{ value: 12, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title={t('dashboard.signedDocuments')}
            value="124"
            icon={<CheckCircleIcon sx={{ fontSize: 40 }} />}
            color="#28a745"
            change={{ value: 8, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title={t('dashboard.pending')}
            value="28"
            icon={<PendingIcon sx={{ fontSize: 40 }} />}
            color="#ffc107"
            change={{ value: -5, isPositive: false }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard
            title={t('dashboard.activeRequests')}
            value="15"
            icon={<AssignmentIcon sx={{ fontSize: 40 }} />}
            color="#f0883e"
            change={{ value: 3, isPositive: true }}
          />
        </Grid>
      </Grid>

      {/* Gráfico y tabla */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <LineChartComponent
            title={t('dashboard.trends')}
            data={chartData}
            dataKeys={[
              { key: 'firmados', name: t('dashboard.signedDocuments'), color: '#28a745' },
              { key: 'pendientes', name: t('dashboard.pending'), color: '#ffc107' },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentDocuments documents={recentDocuments} />
        </Grid>
      </Grid>
    </Box>
  );
}
