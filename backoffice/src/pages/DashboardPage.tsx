import {
  Card,
  CardHeader,
  CardPreview,
  Text,
  makeStyles,
  shorthands,
  tokens,
  Spinner,
} from '@fluentui/react-components';
import { HomeRegular } from '@fluentui/react-icons';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { backofficeService } from '../services/backofficeService';
import { tenantService } from '../services/tenantService';

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
      const users = await backofficeService.getUsers();
      setUserCount(users.length);
    } catch (error: any) {
      console.error('Error loading stats:', error);
      // Si es un error 403, simplemente mostrar 0 usuarios en lugar de causar un reinicio
      if (error?.statusCode === 403) {
        console.warn('Acceso denegado a usuarios. Mostrando 0 usuarios.');
      }
      // Para todos los errores, mostrar 0 usuarios
      setUserCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HomeRegular fontSize={32} />
        <h1 className={styles.title}>Dashboard</h1>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">Usuarios del Tenant</Text>}
            description="Total de usuarios en tu organización"
          />
          <CardPreview>
            {isLoading ? (
              <div style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}>
                <Spinner />
              </div>
            ) : (
              <div style={{ padding: '20px', fontSize: '32px', fontWeight: 'bold' }}>
                {userCount}
              </div>
            )}
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
      </div>

      <Card>
        <CardHeader
          header={<Text weight="semibold">Actividad Reciente</Text>}
          description="Últimas actividades del sistema"
        />
        <CardPreview>
          <div style={{ padding: '20px' }}>
            <Text>Aquí irá la actividad reciente...</Text>
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};

