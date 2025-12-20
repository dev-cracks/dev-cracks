import {
  Card,
  CardHeader,
  CardPreview,
  Text,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { HomeRegular } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { backofficeService } from '../services/backofficeService';
import { tenantService } from '../services/tenantService';
import { customerService } from '../services/customerService';
import { StatsCardSkeleton } from '../components/StatsCardSkeleton';
import { DetailsSkeleton } from '../components/DetailsSkeleton';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginBottom: tokens.spacingVerticalM,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  card: {
    height: '100%',
  },
});

export const DashboardPage = () => {
  const styles = useStyles();
  const { userDetails } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [tenantCount, setTenantCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Solo cargar stats si userDetails está disponible
    if (userDetails) {
      loadStats();
    } else {
      setIsLoading(false);
    }
  }, [userDetails]);

  const loadStats = async () => {
    try {
      // Cargar todas las estadísticas en paralelo
      const [users, tenants, customers] = await Promise.allSettled([
        backofficeService.getUsers(),
        tenantService.getAllTenants(),
        customerService.getAllCustomers(),
      ]);

      // Procesar usuarios
      if (users.status === 'fulfilled') {
        setUserCount(users.value.length);
      } else {
        handleError(users.reason, 'usuarios');
        setUserCount(0);
      }

      // Procesar tenants
      if (tenants.status === 'fulfilled') {
        setTenantCount(tenants.value.length);
      } else {
        handleError(tenants.reason, 'tenants');
        setTenantCount(0);
      }

      // Procesar clientes
      if (customers.status === 'fulfilled') {
        setCustomerCount(customers.value.length);
      } else {
        handleError(customers.reason, 'clientes');
        setCustomerCount(0);
      }
    } catch (error: any) {
      // Si es un error de red (API no disponible), solo mostrar warning en desarrollo
      if (error?.statusCode === undefined && import.meta.env.DEV) {
        console.warn('[Dev] API server not available. Stats will show 0.');
      } else {
        console.error('Error loading stats:', error);
      }
      // Para todos los errores, mostrar 0
      setUserCount(0);
      setTenantCount(0);
      setCustomerCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: any, resource: string) => {
    if (error?.statusCode === undefined && import.meta.env.DEV) {
      console.warn(`[Dev] API server not available for ${resource}. Stats will show 0.`);
    } else if (error?.statusCode === 403) {
      console.warn(`Acceso denegado a ${resource}. Mostrando 0.`);
    } else {
      console.error(`Error loading ${resource}:`, error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HomeRegular fontSize={32} />
        <h1 className={styles.title}>Dashboard</h1>
      </div>

      <div className={styles.statsGrid}>
        {isLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <Card className={styles.card}>
              <CardHeader
                header={<Text weight="semibold">Clientes</Text>}
                description="Total de clientes en el sistema"
              />
              <CardPreview>
                <div style={{ padding: '20px', fontSize: '32px', fontWeight: 'bold' }}>
                  {customerCount}
                </div>
              </CardPreview>
            </Card>

            <Card className={styles.card}>
              <CardHeader
                header={<Text weight="semibold">Tenants</Text>}
                description="Total de tenants en el sistema"
              />
              <CardPreview>
                <div style={{ padding: '20px', fontSize: '32px', fontWeight: 'bold' }}>
                  {tenantCount}
                </div>
              </CardPreview>
            </Card>

            <Card className={styles.card}>
              <CardHeader
                header={<Text weight="semibold">Usuarios</Text>}
                description="Total de usuarios en el sistema"
              />
              <CardPreview>
                <div style={{ padding: '20px', fontSize: '32px', fontWeight: 'bold' }}>
                  {userCount}
                </div>
              </CardPreview>
            </Card>

            <Card className={styles.card}>
              <CardHeader
                header={<Text weight="semibold">Rol</Text>}
                description="Tu rol en la organización"
              />
              <CardPreview>
                <div style={{ padding: '20px', fontSize: '32px', fontWeight: 'bold' }}>
                  {userDetails?.role || 'N/A'}
                </div>
              </CardPreview>
            </Card>
          </>
        )}
      </div>

      <Card>
        <CardHeader
          header={<Text weight="semibold">Actividad Reciente</Text>}
          description="Últimas actividades del sistema"
        />
        <CardPreview>
          <div style={{ padding: '20px' }}>
            {isLoading ? (
              <DetailsSkeleton rows={5} />
            ) : (
              <Text>Aquí irá la actividad reciente...</Text>
            )}
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};

