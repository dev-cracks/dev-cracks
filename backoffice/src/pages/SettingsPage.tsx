import {
  Card,
  CardHeader,
  Text,
  makeStyles,
  shorthands,
  tokens,
  Switch,
  Input,
  Label,
  Button,
} from '@fluentui/react-components';
import { Settings } from '@fluentui/react-icons';

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
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    marginBottom: tokens.spacingVerticalL,
  },
});

export const SettingsPage = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Settings fontSize={32} />
        <h1 className={styles.title}>Configuración</h1>
      </div>

      <Card>
        <CardHeader
          header={<Text weight="semibold">Configuración General</Text>}
          description="Ajustes generales del sistema"
        />
        <div style={{ padding: '20px' }}>
          <div className={styles.formGroup}>
            <Label htmlFor="siteName">Nombre del Sitio</Label>
            <Input id="siteName" placeholder="Dev Cracks" />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="siteUrl">URL del Sitio</Label>
            <Input id="siteUrl" placeholder="https://devcracks.com" />
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor="maintenanceMode">Modo Mantenimiento</Label>
              <Switch id="maintenanceMode" />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
              <Switch id="emailNotifications" defaultChecked />
            </div>
          </div>

          <Button appearance="primary">Guardar Cambios</Button>
        </div>
      </Card>
    </div>
  );
};

