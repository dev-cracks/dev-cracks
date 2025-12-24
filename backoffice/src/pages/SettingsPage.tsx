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
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Badge,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import { SettingsRegular, AddRegular, EditRegular, DeleteRegular, CheckmarkRegular, DismissRegular } from '@fluentui/react-icons';
import { useEffect, useState, useRef } from 'react';
import { tenantService } from '../services/tenantService';
import { customerParameterService } from '../services/customerService';
import { shipmentService, ShipmentCategoryDto, ShipmentRateDto } from '../services/shipmentService';
import { subscriptionService, SubscriptionTypeDto, CreateSubscriptionTypeRequest } from '../services/subscriptionService';
import { notificationService } from '../services/notificationService';

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
  tableContainer: {
    marginTop: tokens.spacingVerticalM,
  },
  actionButtons: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginBottom: tokens.spacingVerticalM,
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
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

  // Categories state
  const [categories, setCategories] = useState<ShipmentCategoryDto[]>([]);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isCategorySubmitting, setIsCategorySubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ShipmentCategoryDto | null>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', description: '' });

  // Rates state
  const [rates, setRates] = useState<ShipmentRateDto[]>([]);
  const [isRateDialogOpen, setIsRateDialogOpen] = useState(false);
  const [isRateSubmitting, setIsRateSubmitting] = useState(false);
  const [selectedRate, setSelectedRate] = useState<ShipmentRateDto | null>(null);
  const [rateForm, setRateForm] = useState({ name: '', description: '', slaDays: 1, baseCost: 0 });

  // Subscription Types state
  const [subscriptionTypes, setSubscriptionTypes] = useState<SubscriptionTypeDto[]>([]);
  const [isSubscriptionTypeDialogOpen, setIsSubscriptionTypeDialogOpen] = useState(false);
  const [isSubscriptionTypeSubmitting, setIsSubscriptionTypeSubmitting] = useState(false);
  const [selectedSubscriptionType, setSelectedSubscriptionType] = useState<SubscriptionTypeDto | null>(null);
  const [subscriptionTypeForm, setSubscriptionTypeForm] = useState({
    name: '',
    allowedModel: '',
    maxTokensPerMonth: undefined as number | undefined,
    maxMessagesPerMonth: undefined as number | undefined,
    maxTokensPerMessage: 1000,
    pricePerMonth: 0,
    features: [] as string[],
  });
  const [newFeature, setNewFeature] = useState('');

  useEffect(() => {
    loadSettings();
    loadCategories();
    loadRates();
    loadSubscriptionTypes();
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
        if (!tenant) {
          alert('Error: No se encontró el tenant. Por favor, recarga la página e intenta de nuevo.');
          return;
        }

        // Intentar obtener el customerId del tenant (si está disponible en la respuesta)
        if (tenant.customerId) {
          currentCustomerId = tenant.customerId;
          setCustomerId(tenant.customerId);
        } else {
          // Si el tenant no tiene customerId en la respuesta, intentar obtenerlo de los customers del tenant
          try {
            const tenantCustomers = await tenantService.getTenantCustomers(tenant.id);
            if (tenantCustomers && tenantCustomers.length > 0) {
              currentCustomerId = tenantCustomers[0].id;
              setCustomerId(tenantCustomers[0].id);
            } else {
              alert('Error: El tenant no tiene un cliente asociado. Por favor, asocia un cliente al tenant primero.');
              return;
            }
          } catch (customerError) {
            console.error('Error obteniendo customers del tenant:', customerError);
            alert('Error: No se pudo obtener el cliente asociado. Por favor, recarga la página después de reiniciar el servidor e intenta de nuevo.');
            return;
          }
        }
      } catch (error) {
        console.error('Error obteniendo tenant:', error);
        alert('Error: No se pudo obtener la información del tenant. Por favor, recarga la página e intenta de nuevo.');
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

  // Categories management
  const loadCategories = async () => {
    try {
      const data = await shipmentService.getCategories(false);
      setCategories(data);
    } catch (error: any) {
      console.error('Error loading categories:', error);
      notificationService.error('Error', 'No se pudieron cargar las categorías');
    }
  };

  const handleOpenCategoryDialog = (category?: ShipmentCategoryDto) => {
    if (category) {
      setSelectedCategory(category);
      setCategoryForm({ name: category.name, description: category.description || '' });
    } else {
      setSelectedCategory(null);
      setCategoryForm({ name: '', description: '' });
    }
    setIsCategoryDialogOpen(true);
  };

  const handleCloseCategoryDialog = () => {
    setIsCategoryDialogOpen(false);
    setSelectedCategory(null);
    setCategoryForm({ name: '', description: '' });
  };

  const handleSaveCategory = async () => {
    if (!categoryForm.name.trim()) {
      notificationService.error('Error', 'El nombre de la categoría es requerido');
      return;
    }

    try {
      setIsCategorySubmitting(true);
      if (selectedCategory) {
        await shipmentService.updateCategory(selectedCategory.id, categoryForm.name, categoryForm.description || undefined);
        notificationService.success('Éxito', 'Categoría actualizada correctamente');
      } else {
        await shipmentService.createCategory(categoryForm.name, categoryForm.description || undefined);
        notificationService.success('Éxito', 'Categoría creada correctamente');
      }
      await loadCategories();
      handleCloseCategoryDialog();
    } catch (error: any) {
      notificationService.error('Error', error.message || 'Error al guardar la categoría');
    } finally {
      setIsCategorySubmitting(false);
    }
  };

  const handleToggleCategoryStatus = async (category: ShipmentCategoryDto) => {
    try {
      if (category.isActive) {
        await shipmentService.deactivateCategory(category.id);
        notificationService.success('Éxito', 'Categoría desactivada');
      } else {
        await shipmentService.activateCategory(category.id);
        notificationService.success('Éxito', 'Categoría activada');
      }
      await loadCategories();
    } catch (error: any) {
      notificationService.error('Error', error.message || 'Error al cambiar el estado de la categoría');
    }
  };

  // Rates management
  const loadRates = async () => {
    try {
      const data = await shipmentService.getRates(false);
      setRates(data);
    } catch (error: any) {
      console.error('Error loading rates:', error);
      notificationService.error('Error', 'No se pudieron cargar las tarifas');
    }
  };

  const handleOpenRateDialog = (rate?: ShipmentRateDto) => {
    if (rate) {
      setSelectedRate(rate);
      setRateForm({ 
        name: rate.name, 
        description: rate.description || '', 
        slaDays: rate.slaDays, 
        baseCost: rate.baseCost 
      });
    } else {
      setSelectedRate(null);
      setRateForm({ name: '', description: '', slaDays: 1, baseCost: 0 });
    }
    setIsRateDialogOpen(true);
  };

  const handleCloseRateDialog = () => {
    setIsRateDialogOpen(false);
    setSelectedRate(null);
    setRateForm({ name: '', description: '', slaDays: 1, baseCost: 0 });
  };

  const handleSaveRate = async () => {
    if (!rateForm.name.trim()) {
      notificationService.error('Error', 'El nombre de la tarifa es requerido');
      return;
    }
    if (rateForm.slaDays <= 0) {
      notificationService.error('Error', 'Los días de SLA deben ser mayores a cero');
      return;
    }
    if (rateForm.baseCost < 0) {
      notificationService.error('Error', 'El costo base no puede ser negativo');
      return;
    }

    try {
      setIsRateSubmitting(true);
      if (selectedRate) {
        await shipmentService.updateRate(
          selectedRate.id,
          rateForm.name,
          rateForm.slaDays,
          rateForm.baseCost,
          rateForm.description || undefined
        );
        notificationService.success('Éxito', 'Tarifa actualizada correctamente');
      } else {
        await shipmentService.createRate(
          rateForm.name,
          rateForm.slaDays,
          rateForm.baseCost,
          rateForm.description || undefined
        );
        notificationService.success('Éxito', 'Tarifa creada correctamente');
      }
      await loadRates();
      handleCloseRateDialog();
    } catch (error: any) {
      notificationService.error('Error', error.message || 'Error al guardar la tarifa');
    } finally {
      setIsRateSubmitting(false);
    }
  };

  const handleToggleRateStatus = async (rate: ShipmentRateDto) => {
    try {
      if (rate.isActive) {
        await shipmentService.deactivateRate(rate.id);
        notificationService.success('Éxito', 'Tarifa desactivada');
      } else {
        await shipmentService.activateRate(rate.id);
        notificationService.success('Éxito', 'Tarifa activada');
      }
      await loadRates();
    } catch (error: any) {
      notificationService.error('Error', error.message || 'Error al cambiar el estado de la tarifa');
    }
  };

  // Subscription Types management
  const loadSubscriptionTypes = async () => {
    try {
      const data = await subscriptionService.getAllSubscriptionTypes();
      setSubscriptionTypes(data);
    } catch (error: any) {
      console.error('Error loading subscription types:', error);
      notificationService.error('Error', 'No se pudieron cargar los tipos de suscripción');
    }
  };

  const handleOpenSubscriptionTypeDialog = (type?: SubscriptionTypeDto) => {
    if (type) {
      setSelectedSubscriptionType(type);
      setSubscriptionTypeForm({
        name: type.name,
        allowedModel: type.allowedModel,
        maxTokensPerMonth: type.maxTokensPerMonth,
        maxMessagesPerMonth: type.maxMessagesPerMonth,
        maxTokensPerMessage: type.maxTokensPerMessage,
        pricePerMonth: type.pricePerMonth,
        features: type.features || [],
      });
    } else {
      setSelectedSubscriptionType(null);
      setSubscriptionTypeForm({
        name: '',
        allowedModel: '',
        maxTokensPerMonth: undefined,
        maxMessagesPerMonth: undefined,
        maxTokensPerMessage: 1000,
        pricePerMonth: 0,
        features: [],
      });
    }
    setNewFeature('');
    setIsSubscriptionTypeDialogOpen(true);
  };

  const handleCloseSubscriptionTypeDialog = () => {
    setIsSubscriptionTypeDialogOpen(false);
    setSelectedSubscriptionType(null);
    setSubscriptionTypeForm({
      name: '',
      allowedModel: '',
      maxTokensPerMonth: undefined,
      maxMessagesPerMonth: undefined,
      maxTokensPerMessage: 1000,
      pricePerMonth: 0,
      features: [],
    });
    setNewFeature('');
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setSubscriptionTypeForm({
        ...subscriptionTypeForm,
        features: [...subscriptionTypeForm.features, newFeature.trim()],
      });
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setSubscriptionTypeForm({
      ...subscriptionTypeForm,
      features: subscriptionTypeForm.features.filter((_, i) => i !== index),
    });
  };

  const handleSaveSubscriptionType = async () => {
    if (!subscriptionTypeForm.name.trim()) {
      notificationService.error('Error', 'El nombre del tipo de suscripción es requerido');
      return;
    }
    if (!subscriptionTypeForm.allowedModel.trim()) {
      notificationService.error('Error', 'El modelo permitido es requerido');
      return;
    }
    if (subscriptionTypeForm.maxTokensPerMessage <= 0) {
      notificationService.error('Error', 'Los tokens máximos por mensaje deben ser mayores a cero');
      return;
    }
    if (subscriptionTypeForm.pricePerMonth < 0) {
      notificationService.error('Error', 'El precio mensual no puede ser negativo');
      return;
    }

    try {
      setIsSubscriptionTypeSubmitting(true);
      const request: CreateSubscriptionTypeRequest = {
        name: subscriptionTypeForm.name,
        allowedModel: subscriptionTypeForm.allowedModel,
        maxTokensPerMonth: subscriptionTypeForm.maxTokensPerMonth,
        maxMessagesPerMonth: subscriptionTypeForm.maxMessagesPerMonth,
        maxTokensPerMessage: subscriptionTypeForm.maxTokensPerMessage,
        pricePerMonth: subscriptionTypeForm.pricePerMonth,
        features: subscriptionTypeForm.features.length > 0 ? subscriptionTypeForm.features : undefined,
      };

      if (selectedSubscriptionType) {
        await subscriptionService.updateSubscriptionType(selectedSubscriptionType.id, request);
        notificationService.success('Éxito', 'Tipo de suscripción actualizado correctamente');
      } else {
        await subscriptionService.createSubscriptionType(request);
        notificationService.success('Éxito', 'Tipo de suscripción creado correctamente');
      }
      await loadSubscriptionTypes();
      handleCloseSubscriptionTypeDialog();
    } catch (error: any) {
      notificationService.error('Error', error.message || 'Error al guardar el tipo de suscripción');
    } finally {
      setIsSubscriptionTypeSubmitting(false);
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

      {/* Categories Management */}
      <Card>
        <CardHeader
          header={<Text weight="semibold">Categorías de Envío</Text>}
          description="Gestiona las categorías de envío disponibles para este tenant"
          action={
            <Button
              appearance="primary"
              icon={<AddRegular />}
              onClick={() => handleOpenCategoryDialog()}
            >
              Nueva Categoría
            </Button>
          }
        />
        <div style={{ padding: '20px' }}>
          <div className={styles.tableContainer}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Nombre</TableHeaderCell>
                  <TableHeaderCell>Descripción</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                  <TableHeaderCell>Acciones</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Text>No hay categorías registradas</Text>
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <Text weight="semibold">{category.name}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{category.description || '-'}</Text>
                      </TableCell>
                      <TableCell>
                        <Badge
                          appearance={category.isActive ? 'filled' : 'outline'}
                          color={category.isActive ? 'success' : 'danger'}
                        >
                          {category.isActive ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className={styles.actionButtons}>
                          <Button
                            appearance="subtle"
                            icon={<EditRegular />}
                            onClick={() => handleOpenCategoryDialog(category)}
                          >
                            Editar
                          </Button>
                          <Button
                            appearance="subtle"
                            icon={category.isActive ? <DismissRegular /> : <CheckmarkRegular />}
                            onClick={() => handleToggleCategoryStatus(category)}
                          >
                            {category.isActive ? 'Desactivar' : 'Activar'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {/* Rates Management */}
      <Card>
        <CardHeader
          header={<Text weight="semibold">Tarifas de Envío</Text>}
          description="Gestiona las tarifas de envío disponibles para este tenant"
          action={
            <Button
              appearance="primary"
              icon={<AddRegular />}
              onClick={() => handleOpenRateDialog()}
            >
              Nueva Tarifa
            </Button>
          }
        />
        <div style={{ padding: '20px' }}>
          <div className={styles.tableContainer}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Nombre</TableHeaderCell>
                  <TableHeaderCell>Descripción</TableHeaderCell>
                  <TableHeaderCell>SLA (días)</TableHeaderCell>
                  <TableHeaderCell>Costo Base</TableHeaderCell>
                  <TableHeaderCell>Estado</TableHeaderCell>
                  <TableHeaderCell>Acciones</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Text>No hay tarifas registradas</Text>
                    </TableCell>
                  </TableRow>
                ) : (
                  rates.map((rate) => (
                    <TableRow key={rate.id}>
                      <TableCell>
                        <Text weight="semibold">{rate.name}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{rate.description || '-'}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{rate.slaDays}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{rate.baseCost.toFixed(2)} €</Text>
                      </TableCell>
                      <TableCell>
                        <Badge
                          appearance={rate.isActive ? 'filled' : 'outline'}
                          color={rate.isActive ? 'success' : 'danger'}
                        >
                          {rate.isActive ? 'Activa' : 'Inactiva'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className={styles.actionButtons}>
                          <Button
                            appearance="subtle"
                            icon={<EditRegular />}
                            onClick={() => handleOpenRateDialog(rate)}
                          >
                            Editar
                          </Button>
                          <Button
                            appearance="subtle"
                            icon={rate.isActive ? <DismissRegular /> : <CheckmarkRegular />}
                            onClick={() => handleToggleRateStatus(rate)}
                          >
                            {rate.isActive ? 'Desactivar' : 'Activar'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={(_, data) => !data.open && handleCloseCategoryDialog()}>
        <DialogSurface>
          <DialogTitle>
            {selectedCategory ? 'Editar Categoría' : 'Nueva Categoría'}
          </DialogTitle>
          <DialogBody>
            <DialogContent>
              <Field label="Nombre" required>
                <Input
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="Ej: Documento, Paquete, etc."
                />
              </Field>
              <Field label="Descripción">
                <Input
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  placeholder="Descripción opcional"
                />
              </Field>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={handleCloseCategoryDialog}>
              Cancelar
            </Button>
            <Button
              appearance="primary"
              onClick={handleSaveCategory}
              disabled={isCategorySubmitting || !categoryForm.name.trim()}
            >
              {isCategorySubmitting ? <Spinner size="tiny" /> : selectedCategory ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Rate Dialog */}
      <Dialog open={isRateDialogOpen} onOpenChange={(_, data) => !data.open && handleCloseRateDialog()}>
        <DialogSurface>
          <DialogTitle>
            {selectedRate ? 'Editar Tarifa' : 'Nueva Tarifa'}
          </DialogTitle>
          <DialogBody>
            <DialogContent>
              <div className={styles.formRow}>
                <Field label="Nombre" required>
                  <Input
                    value={rateForm.name}
                    onChange={(e) => setRateForm({ ...rateForm, name: e.target.value })}
                    placeholder="Ej: Estándar, Express, etc."
                  />
                </Field>
                <Field label="SLA (días)" required>
                  <Input
                    type="number"
                    min="1"
                    value={rateForm.slaDays.toString()}
                    onChange={(e) => setRateForm({ ...rateForm, slaDays: parseInt(e.target.value) || 1 })}
                  />
                </Field>
              </div>
              <div className={styles.formRow}>
                <Field label="Costo Base (€)" required>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={rateForm.baseCost.toString()}
                    onChange={(e) => setRateForm({ ...rateForm, baseCost: parseFloat(e.target.value) || 0 })}
                  />
                </Field>
                <Field label="Descripción">
                  <Input
                    value={rateForm.description}
                    onChange={(e) => setRateForm({ ...rateForm, description: e.target.value })}
                    placeholder="Descripción opcional"
                  />
                </Field>
              </div>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={handleCloseRateDialog}>
              Cancelar
            </Button>
            <Button
              appearance="primary"
              onClick={handleSaveRate}
              disabled={isRateSubmitting || !rateForm.name.trim() || rateForm.slaDays <= 0 || rateForm.baseCost < 0}
            >
              {isRateSubmitting ? <Spinner size="tiny" /> : selectedRate ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Subscription Types Management */}
      <Card>
        <CardHeader
          header={<Text weight="semibold">Tipos de Suscripción</Text>}
          description="Gestiona los tipos de suscripción disponibles en el sistema"
          action={
            <Button
              appearance="primary"
              icon={<AddRegular />}
              onClick={() => handleOpenSubscriptionTypeDialog()}
            >
              Nuevo Tipo
            </Button>
          }
        />
        <div style={{ padding: '20px' }}>
          <div className={styles.tableContainer}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Nombre</TableHeaderCell>
                  <TableHeaderCell>Modelo</TableHeaderCell>
                  <TableHeaderCell>Tokens/Mes</TableHeaderCell>
                  <TableHeaderCell>Mensajes/Mes</TableHeaderCell>
                  <TableHeaderCell>Tokens/Mensaje</TableHeaderCell>
                  <TableHeaderCell>Precio/Mes</TableHeaderCell>
                  <TableHeaderCell>Características</TableHeaderCell>
                  <TableHeaderCell>Acciones</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptionTypes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Text>No hay tipos de suscripción registrados</Text>
                    </TableCell>
                  </TableRow>
                ) : (
                  subscriptionTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell>
                        <Text weight="semibold">{type.name}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{type.allowedModel}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{type.maxTokensPerMonth?.toLocaleString() || '∞'}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{type.maxMessagesPerMonth?.toLocaleString() || '∞'}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{type.maxTokensPerMessage.toLocaleString()}</Text>
                      </TableCell>
                      <TableCell>
                        <Text>{type.pricePerMonth > 0 ? `${type.pricePerMonth.toFixed(2)} €` : 'Gratis'}</Text>
                      </TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalXS }}>
                          {type.features && type.features.length > 0 ? (
                            type.features.slice(0, 3).map((feature, idx) => (
                              <Badge key={idx} appearance="outline" size="small">
                                {feature}
                              </Badge>
                            ))
                          ) : (
                            <Text size={200}>-</Text>
                          )}
                          {type.features && type.features.length > 3 && (
                            <Badge appearance="outline" size="small">
                              +{type.features.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          appearance="subtle"
                          icon={<EditRegular />}
                          onClick={() => handleOpenSubscriptionTypeDialog(type)}
                        >
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {/* Subscription Type Dialog */}
      <Dialog open={isSubscriptionTypeDialogOpen} onOpenChange={(_, data) => !data.open && handleCloseSubscriptionTypeDialog()}>
        <DialogSurface style={{ maxWidth: '600px', width: '90vw' }}>
          <DialogTitle>
            {selectedSubscriptionType ? 'Editar Tipo de Suscripción' : 'Nuevo Tipo de Suscripción'}
          </DialogTitle>
          <DialogBody>
            <DialogContent>
              <div className={styles.formRow}>
                <Field label="Nombre" required>
                  <Input
                    value={subscriptionTypeForm.name}
                    onChange={(e) => setSubscriptionTypeForm({ ...subscriptionTypeForm, name: e.target.value })}
                    placeholder="Ej: Básico, Premium, etc."
                  />
                </Field>
                <Field label="Modelo Permitido" required>
                  <Input
                    value={subscriptionTypeForm.allowedModel}
                    onChange={(e) => setSubscriptionTypeForm({ ...subscriptionTypeForm, allowedModel: e.target.value })}
                    placeholder="Ej: gpt-4, gpt-3.5-turbo, etc."
                  />
                </Field>
              </div>
              <div className={styles.formRow}>
                <Field label="Tokens Máximos/Mes">
                  <Input
                    type="number"
                    min="0"
                    value={subscriptionTypeForm.maxTokensPerMonth?.toString() || ''}
                    onChange={(e) => setSubscriptionTypeForm({
                      ...subscriptionTypeForm,
                      maxTokensPerMonth: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                    placeholder="Sin límite si está vacío"
                  />
                </Field>
                <Field label="Mensajes Máximos/Mes">
                  <Input
                    type="number"
                    min="0"
                    value={subscriptionTypeForm.maxMessagesPerMonth?.toString() || ''}
                    onChange={(e) => setSubscriptionTypeForm({
                      ...subscriptionTypeForm,
                      maxMessagesPerMonth: e.target.value ? parseInt(e.target.value) : undefined
                    })}
                    placeholder="Sin límite si está vacío"
                  />
                </Field>
              </div>
              <div className={styles.formRow}>
                <Field label="Tokens Máximos/Mensaje" required>
                  <Input
                    type="number"
                    min="1"
                    value={subscriptionTypeForm.maxTokensPerMessage.toString()}
                    onChange={(e) => setSubscriptionTypeForm({
                      ...subscriptionTypeForm,
                      maxTokensPerMessage: parseInt(e.target.value) || 1000
                    })}
                  />
                </Field>
                <Field label="Precio Mensual (€)" required>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={subscriptionTypeForm.pricePerMonth.toString()}
                    onChange={(e) => setSubscriptionTypeForm({
                      ...subscriptionTypeForm,
                      pricePerMonth: parseFloat(e.target.value) || 0
                    })}
                  />
                </Field>
              </div>
              <Field label="Características">
                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
                  <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Agregar característica"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                      style={{ flex: 1 }}
                    />
                    <Button onClick={handleAddFeature} disabled={!newFeature.trim()}>
                      Agregar
                    </Button>
                  </div>
                  {subscriptionTypeForm.features.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: tokens.spacingHorizontalXS }}>
                      {subscriptionTypeForm.features.map((feature, index) => (
                        <Badge
                          key={index}
                          appearance="filled"
                          size="medium"
                          style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}
                        >
                          {feature}
                          <Button
                            appearance="subtle"
                            size="small"
                            icon={<DismissRegular />}
                            onClick={() => handleRemoveFeature(index)}
                            style={{ minWidth: 'auto', padding: '2px' }}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={handleCloseSubscriptionTypeDialog}>
              Cancelar
            </Button>
            <Button
              appearance="primary"
              onClick={handleSaveSubscriptionType}
              disabled={
                isSubscriptionTypeSubmitting ||
                !subscriptionTypeForm.name.trim() ||
                !subscriptionTypeForm.allowedModel.trim() ||
                subscriptionTypeForm.maxTokensPerMessage <= 0 ||
                subscriptionTypeForm.pricePerMonth < 0
              }
            >
              {isSubscriptionTypeSubmitting ? <Spinner size="tiny" /> : selectedSubscriptionType ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

