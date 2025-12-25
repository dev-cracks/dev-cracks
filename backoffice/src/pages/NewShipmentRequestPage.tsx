import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Text,
  makeStyles,
  shorthands,
  tokens,
  Button,
  Field,
  Spinner,
  MessageBar,
  MessageBarBody,
  Input,
  Combobox,
  Option,
  Checkbox,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from '@fluentui/react-components';
import {
  ArrowLeftRegular,
} from '@fluentui/react-icons';
import {
  shipmentService,
  CreateShipmentRequestDto,
  ShipmentCategoryDto,
  ShipmentRateDto,
} from '../services/shipmentService';
import {
  customerService,
  CustomerDto,
  countryService,
  CountryDto,
} from '../services/customerService';
import { notificationService } from '../services/notificationService';
import { useRibbonMenu } from '../contexts/RibbonMenuContext';
import { RibbonMenu } from '../components/RibbonMenu';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(0),
    margin: 0,
    padding: 0,
    height: '100%',
    overflow: 'hidden',
  },
  ribbonMenuContainer: {
    marginLeft: `calc(-1 * ${tokens.spacingVerticalXL})`,
    marginRight: `calc(-1 * ${tokens.spacingVerticalXL})`,
    marginTop: `calc(-1 * ${tokens.spacingVerticalXL})`,
    marginBottom: tokens.spacingVerticalL,
    width: `calc(100% + ${tokens.spacingVerticalXL} * 2)`,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginBottom: tokens.spacingVerticalL,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
  },
  formContent: {
    flex: 1,
    overflowY: 'auto',
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  formContentRef: {
    scrollBehavior: 'smooth',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    ...shorthands.gap(tokens.spacingVerticalM),
    marginBottom: tokens.spacingVerticalM,
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
    },
  },
  formFieldFull: {
    gridColumn: '1 / -1',
  },
  formSection: {
    marginBottom: tokens.spacingVerticalXL,
  },
  formSectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  checkboxGroup: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalL),
    marginTop: tokens.spacingVerticalM,
  },
  ratePreview: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    marginTop: tokens.spacingVerticalS,
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    ...shorthands.gap(tokens.spacingHorizontalM),
    ...shorthands.padding(tokens.spacingVerticalL),
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const NewShipmentRequestPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { addGroup, removeGroup } = useRibbonMenu();
  const formContentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [createdGuideNumber, setCreatedGuideNumber] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState<CreateShipmentRequestDto>({
    customerId: '',
    originAddress: '',
    originCity: '',
    originStateProvince: '',
    originPostalCode: '',
    originCountryId: '',
    destinationAddress: '',
    destinationCity: '',
    destinationStateProvince: '',
    destinationPostalCode: '',
    destinationCountryId: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    weight: 0,
    width: 0,
    height: 0,
    depth: 0,
    categoryId: '',
    isFragile: false,
    isInsured: false,
    insuredValue: undefined,
    rateId: '',
  });

  // Options
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [categories, setCategories] = useState<ShipmentCategoryDto[]>([]);
  const [rates, setRates] = useState<ShipmentRateDto[]>([]);
  const [selectedRate, setSelectedRate] = useState<ShipmentRateDto | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        if (isMounted) {
          await loadData();
        }
      } catch (err: any) {
        console.error('[NewShipmentRequestPage] Error initializing:', err);
        if (isMounted) {
          setError(err.message || 'Error al inicializar la página');
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
      try {
        removeGroup('new-shipment-request');
      } catch (err) {
        // Ignorar errores al limpiar
      }
    };
  }, [removeGroup]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [customersData, countriesData, categoriesData, ratesData] = await Promise.all([
        customerService.getAllCustomers().catch((err) => {
          console.error('[NewShipmentRequestPage] Error loading customers:', err);
          return [];
        }),
        countryService.getAllCountries().catch((err) => {
          console.error('[NewShipmentRequestPage] Error loading countries:', err);
          return [];
        }),
        shipmentService.getCategories(true).catch((err) => {
          console.error('[NewShipmentRequestPage] Error loading categories:', err);
          return [];
        }),
        shipmentService.getRates(true).catch((err) => {
          console.error('[NewShipmentRequestPage] Error loading rates:', err);
          return [];
        }),
      ]);

      setCustomers(customersData || []);
      setCountries(countriesData || []);
      setCategories(categoriesData || []);
      setRates(ratesData || []);
    } catch (error: any) {
      console.error('[NewShipmentRequestPage] Error loading data:', error);
      setError(error.message || 'Error desconocido');
      notificationService.error('Error al cargar datos', error.message || 'Error desconocido');
      setCustomers([]);
      setCountries([]);
      setCategories([]);
      setRates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyFromCustomer = () => {
    const customer = customers.find((c) => c.id === formData.customerId);
    if (customer) {
      setFormData({
        ...formData,
        contactName: customer.name,
        contactPhone: customer.phone || '',
        contactEmail: customer.email || '',
      });
    }
  };

  const handleRateChange = (rateId: string) => {
    const rate = rates.find((r) => r.id === rateId);
    setSelectedRate(rate || null);
    setFormData({ ...formData, rateId });
  };

  const resetForm = () => {
    setFormData({
      customerId: '',
      originAddress: '',
      originCity: '',
      originStateProvince: '',
      originPostalCode: '',
      originCountryId: '',
      destinationAddress: '',
      destinationCity: '',
      destinationStateProvince: '',
      destinationPostalCode: '',
      destinationCountryId: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      weight: 0,
      width: 0,
      height: 0,
      depth: 0,
      categoryId: '',
      isFragile: false,
      isInsured: false,
      insuredValue: undefined,
      rateId: '',
    });
    setSelectedRate(null);
  };

  const scrollToTop = () => {
    if (formContentRef.current) {
      formContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const created = await shipmentService.createShipmentRequest(formData);
      setCreatedGuideNumber(created.guideNumber);
      resetForm();
      scrollToTop();
      setConfirmDialogOpen(true);
    } catch (error: any) {
      setErrorMessage(error.message || 'Error desconocido al crear la solicitud');
      setErrorDialogOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmCreateAnother = () => {
    setConfirmDialogOpen(false);
    setCreatedGuideNumber('');
    // El formulario ya está reseteado, solo necesitamos cerrar el diálogo
  };

  const handleConfirmGoToList = () => {
    setConfirmDialogOpen(false);
    setCreatedGuideNumber('');
    navigate('/shipments');
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
    setErrorMessage('');
  };

  const handleCancel = () => {
    navigate('/shipments');
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.ribbonMenuContainer}>
          <RibbonMenu />
        </div>
        <Card>
          <div style={{ padding: tokens.spacingVerticalXL, textAlign: 'center' }}>
            <Spinner size="large" />
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.ribbonMenuContainer}>
          <RibbonMenu />
        </div>
        <MessageBar intent="error">
          <MessageBarBody>
            <Text>Error: {error}</Text>
            <Button
              appearance="primary"
              onClick={() => {
                setError(null);
                loadData();
              }}
              style={{ marginTop: tokens.spacingVerticalM }}
            >
              Reintentar
            </Button>
          </MessageBarBody>
        </MessageBar>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.ribbonMenuContainer}>
        <RibbonMenu />
      </div>

      <div className={styles.header}>
        <Button
          appearance="subtle"
          icon={<ArrowLeftRegular />}
          onClick={handleCancel}
        >
          Volver
        </Button>
        <Text className={styles.title}>Nueva Solicitud de Recogida</Text>
      </div>

      <Card className={styles.formContainer}>
        <div ref={formContentRef} className={styles.formContent}>
          <div className={styles.formSection}>
            <Text className={styles.formSectionTitle}>Cliente y Direcciones</Text>
            <div className={styles.formGrid}>
              <Field label="Cliente" required className={styles.formFieldFull}>
                <Combobox
                  value={customers.find((c) => c.id === formData.customerId)?.name || ''}
                  onOptionSelect={(_, data) => {
                    setFormData({ ...formData, customerId: data.optionValue || '' });
                  }}
                >
                  {customers.map((customer) => (
                    <Option key={customer.id} value={customer.id} text={customer.name}>
                      {customer.name}
                    </Option>
                  ))}
                </Combobox>
              </Field>

              <Field label="Dirección Origen" required className={styles.formFieldFull}>
                <Input
                  value={formData.originAddress}
                  onChange={(_, data) => setFormData({ ...formData, originAddress: data.value })}
                />
              </Field>

              <Field label="Ciudad Origen">
                <Input
                  value={formData.originCity || ''}
                  onChange={(_, data) => setFormData({ ...formData, originCity: data.value })}
                />
              </Field>

              <Field label="Estado/Provincia Origen">
                <Input
                  value={formData.originStateProvince || ''}
                  onChange={(_, data) => setFormData({ ...formData, originStateProvince: data.value })}
                />
              </Field>

              <Field label="Código Postal Origen">
                <Input
                  value={formData.originPostalCode || ''}
                  onChange={(_, data) => setFormData({ ...formData, originPostalCode: data.value })}
                />
              </Field>

              <Field label="País Origen" required>
                <Combobox
                  value={countries.find((c) => c.id === formData.originCountryId)?.name || ''}
                  onOptionSelect={(_, data) => {
                    setFormData({ ...formData, originCountryId: data.optionValue || '' });
                  }}
                >
                  {countries.map((country) => (
                    <Option key={country.id} value={country.id} text={country.name}>
                      {country.name}
                    </Option>
                  ))}
                </Combobox>
              </Field>

              <Field label="Dirección Destino" required className={styles.formFieldFull}>
                <Input
                  value={formData.destinationAddress}
                  onChange={(_, data) => setFormData({ ...formData, destinationAddress: data.value })}
                />
              </Field>

              <Field label="Ciudad Destino">
                <Input
                  value={formData.destinationCity || ''}
                  onChange={(_, data) => setFormData({ ...formData, destinationCity: data.value })}
                />
              </Field>

              <Field label="Estado/Provincia Destino">
                <Input
                  value={formData.destinationStateProvince || ''}
                  onChange={(_, data) => setFormData({ ...formData, destinationStateProvince: data.value })}
                />
              </Field>

              <Field label="Código Postal Destino">
                <Input
                  value={formData.destinationPostalCode || ''}
                  onChange={(_, data) => setFormData({ ...formData, destinationPostalCode: data.value })}
                />
              </Field>

              <Field label="País Destino" required>
                <Combobox
                  value={countries.find((c) => c.id === formData.destinationCountryId)?.name || ''}
                  onOptionSelect={(_, data) => {
                    setFormData({ ...formData, destinationCountryId: data.optionValue || '' });
                  }}
                >
                  {countries.map((country) => (
                    <Option key={country.id} value={country.id} text={country.name}>
                      {country.name}
                    </Option>
                  ))}
                </Combobox>
              </Field>
            </div>
          </div>

          <div className={styles.formSection}>
            <Text className={styles.formSectionTitle}>Datos de Contacto</Text>
            <div className={styles.formGrid}>
              <Field label="Nombre de Contacto" required>
                <Input
                  value={formData.contactName}
                  onChange={(_, data) => setFormData({ ...formData, contactName: data.value })}
                />
              </Field>

              <Field label="Teléfono">
                <Input
                  value={formData.contactPhone || ''}
                  onChange={(_, data) => setFormData({ ...formData, contactPhone: data.value })}
                />
              </Field>

              <Field label="Email" className={styles.formFieldFull}>
                <Input
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(_, data) => setFormData({ ...formData, contactEmail: data.value })}
                />
              </Field>

              <div className={styles.formFieldFull}>
                <Button
                  appearance="secondary"
                  onClick={handleCopyFromCustomer}
                  disabled={!formData.customerId}
                >
                  Copiar Datos del Cliente
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <Text className={styles.formSectionTitle}>Detalles del Envío</Text>
            <div className={styles.formGrid}>
              <Field label="Peso (kg)" required>
                <Input
                  type="number"
                  value={formData.weight.toString()}
                  onChange={(_, data) => setFormData({ ...formData, weight: parseFloat(data.value) || 0 })}
                />
              </Field>

              <Field label="Ancho (cm)" required>
                <Input
                  type="number"
                  value={formData.width.toString()}
                  onChange={(_, data) => setFormData({ ...formData, width: parseFloat(data.value) || 0 })}
                />
              </Field>

              <Field label="Alto (cm)" required>
                <Input
                  type="number"
                  value={formData.height.toString()}
                  onChange={(_, data) => setFormData({ ...formData, height: parseFloat(data.value) || 0 })}
                />
              </Field>

              <Field label="Profundidad (cm)" required>
                <Input
                  type="number"
                  value={formData.depth.toString()}
                  onChange={(_, data) => setFormData({ ...formData, depth: parseFloat(data.value) || 0 })}
                />
              </Field>

              <Field label="Categoría" required className={styles.formFieldFull}>
                <Combobox
                  value={categories.find((c) => c.id === formData.categoryId)?.name || ''}
                  onOptionSelect={(_, data) => {
                    setFormData({ ...formData, categoryId: data.optionValue || '' });
                  }}
                >
                  {categories.map((category) => (
                    <Option key={category.id} value={category.id} text={category.name}>
                      {category.name}
                    </Option>
                  ))}
                </Combobox>
              </Field>

              <div className={styles.checkboxGroup}>
                <Checkbox
                  checked={formData.isFragile}
                  onChange={(_, data) => setFormData({ ...formData, isFragile: data.checked })}
                  label="Frágil"
                />
                <Checkbox
                  checked={formData.isInsured}
                  onChange={(_, data) => {
                    setFormData({
                      ...formData,
                      isInsured: data.checked,
                      insuredValue: data.checked ? formData.insuredValue : undefined,
                    });
                  }}
                  label="Asegurado"
                />
              </div>

              {formData.isInsured && (
                <Field label="Valor Asegurado" required className={styles.formFieldFull}>
                  <Input
                    type="number"
                    value={formData.insuredValue?.toString() || ''}
                    onChange={(_, data) =>
                      setFormData({ ...formData, insuredValue: parseFloat(data.value) || undefined })
                    }
                  />
                </Field>
              )}
            </div>
          </div>

          <div className={styles.formSection}>
            <Text className={styles.formSectionTitle}>Tarifa</Text>
            <Field label="Seleccionar Tarifa" required className={styles.formFieldFull}>
              <Combobox
                value={selectedRate?.name || ''}
                onOptionSelect={(_, data) => handleRateChange(data.optionValue || '')}
              >
                {rates.map((rate) => {
                  const rateText = `${rate.name} - ${rate.slaDays} días - ${rate.baseCost.toFixed(2)} €`;
                  return (
                    <Option key={rate.id} value={rate.id} text={rateText}>
                      {rateText}
                    </Option>
                  );
                })}
              </Combobox>
            </Field>

            {selectedRate && (
              <div className={styles.ratePreview}>
                <Text weight="semibold">Vista Previa:</Text>
                <Text style={{ display: 'block', marginTop: tokens.spacingVerticalS }}>
                  Fecha estimada de entrega: {new Date(Date.now() + selectedRate.slaDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </Text>
                <Text style={{ display: 'block' }}>
                  Costo estimado: {selectedRate.baseCost.toFixed(2)} €
                </Text>
              </div>
            )}
          </div>
        </div>

        <div className={styles.actionsContainer}>
          <Button
            appearance="secondary"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            appearance="primary"
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.customerId || !formData.rateId}
          >
            {isSubmitting ? <Spinner size="tiny" /> : 'Crear Solicitud'}
          </Button>
        </div>
      </Card>

      {/* Dialog de Error */}
      <Dialog open={errorDialogOpen} onOpenChange={(_, data) => {
        if (!data.open) {
          handleCloseErrorDialog();
        }
      }}>
        <DialogSurface>
          <DialogTitle>Error al Crear Solicitud</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>{errorMessage}</Text>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="primary" onClick={handleCloseErrorDialog}>
              Cerrar
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Dialog de Confirmación */}
      <Dialog open={confirmDialogOpen} onOpenChange={(_, data) => {
        if (!data.open) {
          handleConfirmGoToList();
        }
      }}>
        <DialogSurface>
          <DialogTitle>Solicitud Creada Exitosamente</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                La solicitud se ha creado correctamente con el número de guía: <strong>{createdGuideNumber}</strong>
              </Text>
              <Text style={{ display: 'block', marginTop: tokens.spacingVerticalM }}>
                ¿Desea crear otra solicitud?
              </Text>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={handleConfirmGoToList}>
              Ir a la Lista
            </Button>
            <Button appearance="primary" onClick={handleConfirmCreateAnother}>
              Crear Otra
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

