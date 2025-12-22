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
  Spinner,
  Image,
} from '@fluentui/react-components';
import { SettingsRegular } from '@fluentui/react-icons';
import { useEffect, useState, useRef } from 'react';
import { tenantService } from '../services/tenantService';
import { customerParameterService } from '../services/customerService';

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
  logoPreview: {
    marginTop: tokens.spacingVerticalS,
    maxWidth: '200px',
    maxHeight: '100px',
    objectFit: 'contain',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    padding: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacingVerticalXXL,
  },
});

const PARAM_KEYS = {
  SITE_NAME: 'SiteName',
  SITE_URL: 'SiteUrl',
  SITE_LOGO: 'SiteLogo',
  MAINTENANCE_MODE: 'MaintenanceMode',
  EMAIL_NOTIFICATIONS: 'EmailNotifications',
} as const;

export const SettingsPage = () => {
  const styles = useStyles();
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [siteLogo, setSiteLogo] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const tenant = await tenantService.getCurrentTenant();
      if (!tenant?.customerId) {
        console.error('No se encontró tenant o customerId');
        setIsLoading(false);
        return;
      }

      setCustomerId(tenant.customerId);

      // Cargar todos los parámetros del cliente
      const parameters = await customerParameterService.getByCustomerId(tenant.customerId);
      
      // Mapear los parámetros a los estados
      const paramMap = new Map(parameters.map(p => [p.key, p.value]));
      
      setSiteName(paramMap.get(PARAM_KEYS.SITE_NAME) || '');
      setSiteUrl(paramMap.get(PARAM_KEYS.SITE_URL) || '');
      setSiteLogo(paramMap.get(PARAM_KEYS.SITE_LOGO) || '');
      setMaintenanceMode(paramMap.get(PARAM_KEYS.MAINTENANCE_MODE) === 'true');
      setEmailNotifications(paramMap.get(PARAM_KEYS.EMAIL_NOTIFICATIONS) !== 'false');
    } catch (error) {
      console.error('Error cargando configuración:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveLogoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoChange = (newValue: string) => {
    setSiteLogo(newValue);

    // Actualizar el RibbonBar inmediatamente con el nuevo valor (sin esperar al servidor)
    window.dispatchEvent(new CustomEvent('siteLogoUpdated', { 
      detail: { logoUrl: newValue } 
    }));

    // Guardar en el servidor con debounce (después de 500ms de inactividad)
    if (saveLogoTimeoutRef.current) {
      clearTimeout(saveLogoTimeoutRef.current);
    }

    saveLogoTimeoutRef.current = setTimeout(async () => {
      let currentCustomerId = customerId;

      // Si no hay customerId, intentar obtenerlo del tenant
      if (!currentCustomerId) {
        try {
          const tenant = await tenantService.getCurrentTenant();
          if (!tenant?.customerId) {
            return;
          }
          currentCustomerId = tenant.customerId;
          setCustomerId(tenant.customerId);
        } catch (error) {
          console.error('Error obteniendo tenant para guardar logo:', error);
          return;
        }
      }

      try {
        await customerParameterService.createOrUpdate({
          customerId: currentCustomerId,
          key: PARAM_KEYS.SITE_LOGO,
          value: newValue,
        });
      } catch (error) {
        console.error('Error guardando logo:', error);
      }
    }, 500);
  };

  const handleLogoBlur = async () => {
    // Limpiar el timeout si existe para guardar inmediatamente
    if (saveLogoTimeoutRef.current) {
      clearTimeout(saveLogoTimeoutRef.current);
      saveLogoTimeoutRef.current = null;
    }

    let currentCustomerId = customerId;

    // Si no hay customerId, intentar obtenerlo del tenant
    if (!currentCustomerId) {
      try {
        const tenant = await tenantService.getCurrentTenant();
        if (!tenant?.customerId) {
          return;
        }
        currentCustomerId = tenant.customerId;
        setCustomerId(tenant.customerId);
      } catch (error) {
        console.error('Error obteniendo tenant para guardar logo:', error);
        return;
      }
    }

    try {
      // Guardar el logo inmediatamente cuando el usuario sale del campo
      await customerParameterService.createOrUpdate({
        customerId: currentCustomerId,
        key: PARAM_KEYS.SITE_LOGO,
        value: siteLogo,
      });
    } catch (error) {
      console.error('Error guardando logo:', error);
    }
  };

  // Limpiar timeout al desmontar el componente
  useEffect(() => {
    return () => {
      if (saveLogoTimeoutRef.current) {
        clearTimeout(saveLogoTimeoutRef.current);
      }
    };
  }, []);

  const handleSave = async () => {
    let currentCustomerId = customerId;

    // Si no hay customerId, intentar obtenerlo del tenant
    if (!currentCustomerId) {
      try {
        const tenant = await tenantService.getCurrentTenant();
        if (!tenant?.customerId) {
          alert('Error: No se encontró el cliente asociado. Por favor, recarga la página e intenta de nuevo.');
          return;
        }
        currentCustomerId = tenant.customerId;
        setCustomerId(tenant.customerId);
      } catch (error) {
        console.error('Error obteniendo tenant:', error);
        alert('Error: No se pudo obtener la información del cliente. Por favor, recarga la página e intenta de nuevo.');
        return;
      }
    }

    try {
      setIsSaving(true);

      // Guardar todos los parámetros
      await Promise.all([
        customerParameterService.createOrUpdate({
          customerId: currentCustomerId,
          key: PARAM_KEYS.SITE_NAME,
          value: siteName,
        }),
        customerParameterService.createOrUpdate({
          customerId: currentCustomerId,
          key: PARAM_KEYS.SITE_URL,
          value: siteUrl,
        }),
        customerParameterService.createOrUpdate({
          customerId: currentCustomerId,
          key: PARAM_KEYS.SITE_LOGO,
          value: siteLogo,
        }),
        customerParameterService.createOrUpdate({
          customerId: currentCustomerId,
          key: PARAM_KEYS.MAINTENANCE_MODE,
          value: maintenanceMode.toString(),
        }),
        customerParameterService.createOrUpdate({
          customerId: currentCustomerId,
          key: PARAM_KEYS.EMAIL_NOTIFICATIONS,
          value: emailNotifications.toString(),
        }),
      ]);

      // Disparar evento personalizado para notificar a RibbonBar
      window.dispatchEvent(new CustomEvent('siteSettingsUpdated'));

      alert('Configuración guardada exitosamente');
    } catch (error) {
      console.error('Error guardando configuración:', error);
      alert('Error al guardar la configuración');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SettingsRegular fontSize={32} />
        <h1 className={styles.title}>Configuración</h1>
      </div>

      <Card>
        <CardHeader
          header={<Text weight="semibold">Configuración General</Text>}
          description="Ajustes generales del sistema"
        />
        <div style={{ padding: '20px' }}>
          <div className={styles.formGroup}>
            <Label htmlFor="siteLogo">Logo del Sitio (URL)</Label>
            <Input 
              id="siteLogo" 
              placeholder="https://example.com/logo.png"
              value={siteLogo}
              onChange={(e) => handleLogoChange(e.target.value)}
              onBlur={handleLogoBlur}
            />
            {siteLogo && (
              <Image
                src={siteLogo}
                alt="Vista previa del logo"
                className={styles.logoPreview}
                onError={(e) => {
                  // Ocultar la imagen si falla la carga
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="siteName">Nombre del Sitio</Label>
            <Input 
              id="siteName" 
              placeholder="Dev Cracks"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="siteUrl">URL del Sitio</Label>
            <Input 
              id="siteUrl" 
              placeholder="https://devcracks.com"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor="maintenanceMode">Modo Mantenimiento</Label>
              <Switch 
                id="maintenanceMode" 
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.currentTarget.checked)}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Label htmlFor="emailNotifications">Notificaciones por Email</Label>
              <Switch 
                id="emailNotifications" 
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.currentTarget.checked)}
              />
            </div>
          </div>

          <Button 
            appearance="primary" 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

