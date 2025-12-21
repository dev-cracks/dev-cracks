import {
  Card,
  CardHeader,
  CardPreview,
  Text,
  Skeleton,
  SkeletonItem,
  makeStyles,
  shorthands,
  tokens,
  Button,
} from '@fluentui/react-components';
import { HomeRegular, ArrowClockwiseRegular } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { backofficeService } from '../services/backofficeService';
import { tenantService } from '../services/tenantService';
import { customerService } from '../services/customerService';
import { officeService } from '../services/officeService';
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
  numberSkeleton: {
    width: '80px',
    height: '48px',
    marginTop: tokens.spacingVerticalM,
  },
  previewContent: {
    padding: '20px',
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60px',
  },
});

export const DashboardPage = () => {
  const styles = useStyles();
  const { userDetails } = useAuth();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [tenantCount, setTenantCount] = useState<number | null>(null);
  const [customerCount, setCustomerCount] = useState<number | null>(null);
  const [officeCount, setOfficeCount] = useState<number | null>(null);
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
      const [users, tenants, customers, offices] = await Promise.allSettled([
        backofficeService.getUsers(),
        tenantService.getAllTenants(),
        customerService.getAllCustomers(),
        officeService.getAllOffices(),
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

      // Procesar sedes
      if (offices.status === 'fulfilled') {
        setOfficeCount(offices.value.length);
      } else {
        handleError(offices.reason, 'sedes');
        setOfficeCount(0);
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
      setOfficeCount(0);
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
        <Button
          appearance="primary"
          icon={<ArrowClockwiseRegular />}
          onClick={loadStats}
          disabled={isLoading}
          title="Actualizar estadísticas del dashboard"
        >
          Actualizar
        </Button>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">Clientes</Text>}
            description="Total de clientes en el sistema"
          />
          <CardPreview>
            <div className={styles.previewContent}>
              {isLoading || customerCount === null ? (
                <Skeleton className={styles.numberSkeleton}>
                  <SkeletonItem size={48} />
                </Skeleton>
              ) : (
                customerCount
              )}
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">Tenants</Text>}
            description="Total de tenants en el sistema"
          />
          <CardPreview>
            <div className={styles.previewContent}>
              {isLoading || tenantCount === null ? (
                <Skeleton className={styles.numberSkeleton}>
                  <SkeletonItem size={48} />
                </Skeleton>
              ) : (
                tenantCount
              )}
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">Usuarios</Text>}
            description="Total de usuarios en el sistema"
          />
          <CardPreview>
            <div className={styles.previewContent}>
              {isLoading || userCount === null ? (
                <Skeleton className={styles.numberSkeleton}>
                  <SkeletonItem size={48} />
                </Skeleton>
              ) : (
                userCount
              )}
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">Sedes</Text>}
            description="Total de sedes en el sistema"
          />
          <CardPreview>
            <div className={styles.previewContent}>
              {isLoading || officeCount === null ? (
                <Skeleton className={styles.numberSkeleton}>
                  <SkeletonItem size={48} />
                </Skeleton>
              ) : (
                officeCount
              )}
            </div>
          </CardPreview>
        </Card>
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

