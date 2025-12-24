import { useState, useEffect } from 'react';
import {
  Card,
  Text,
  makeStyles,
  shorthands,
  tokens,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell,
  Button,
  SearchBox,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Spinner,
  MessageBar,
  MessageBarBody,
  Badge,
  Input,
  Combobox,
  Option,
  Checkbox,
  Label,
  Link,
} from '@fluentui/react-components';
import {
  BoxArrowUpRegular,
  SearchRegular,
  AddRegular,
  DocumentRegular,
  DismissRegular,
} from '@fluentui/react-icons';
import {
  shipmentService,
  ShipmentRequestDto,
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
import { TableSkeleton } from '../components/TableSkeleton';
import { useRibbonMenu } from '../contexts/RibbonMenuContext';
import { RibbonMenu } from '../components/RibbonMenu';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(0),
    margin: 0,
    padding: 0,
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
    justifyContent: 'space-between',
    marginBottom: tokens.spacingVerticalM,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  toolbar: {
    display: 'flex',
    width: '100%',
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginBottom: tokens.spacingVerticalL,
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
});

export const ShipmentRequestsPage = () => {
  console.log('[ShipmentRequestsPage] Component rendering - START');
  const styles = useStyles();
  const { addGroup, removeGroup } = useRibbonMenu();
  const [requests, setRequests] = useState<ShipmentRequestDto[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ShipmentRequestDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<ShipmentRequestDto | null>(null);

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      try {
        if (isMounted) {
          await loadData();
        }
        
        // Registrar acciones en el RibbonMenu
        if (isMounted && addGroup) {
          try {
            addGroup({
              id: 'shipments-main',
              label: 'Solicitudes',
              items: [
                {
                  id: 'new-request',
                  label: 'Nueva Solicitud',
                  icon: <AddRegular />,
                  action: () => setIsDialogOpen(true),
                },
              ],
            });
          } catch (ribbonError) {
            console.error('[ShipmentRequestsPage] Error setting up ribbon menu:', ribbonError);
            // No fallar si hay error en el ribbon menu
          }
        }
      } catch (err: any) {
        console.error('[ShipmentRequestsPage] Error initializing:', err);
        if (isMounted) {
          setError(err.message || 'Error al inicializar la página');
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
      try {
        removeGroup('shipments-main');
      } catch (err) {
        // Ignorar errores al limpiar
      }
    };
  }, [addGroup, removeGroup]);

  useEffect(() => {
    filterRequests();
  }, [searchQuery, requests]);

  const loadData = async () => {
    try {
      console.log('[ShipmentRequestsPage] Loading data...');
      setIsLoading(true);
      const [requestsData, customersData, countriesData, categoriesData, ratesData] = await Promise.all([
        shipmentService.getShipmentRequests().catch((err) => {
          console.error('[ShipmentRequestsPage] Error loading requests:', err);
          return [];
        }),
        customerService.getAllCustomers().catch((err) => {
          console.error('[ShipmentRequestsPage] Error loading customers:', err);
          return [];
        }),
        countryService.getAllCountries().catch((err) => {
          console.error('[ShipmentRequestsPage] Error loading countries:', err);
          return [];
        }),
        shipmentService.getCategories(true).catch((err) => {
          console.error('[ShipmentRequestsPage] Error loading categories:', err);
          return [];
        }),
        shipmentService.getRates(true).catch((err) => {
          console.error('[ShipmentRequestsPage] Error loading rates:', err);
          return [];
        }),
      ]);
      console.log('[ShipmentRequestsPage] Data loaded:', {
        requests: requestsData?.length || 0,
        customers: customersData?.length || 0,
        countries: countriesData?.length || 0,
        categories: categoriesData?.length || 0,
        rates: ratesData?.length || 0,
      });
      setRequests(requestsData || []);
      setFilteredRequests(requestsData || []);
      setCustomers(customersData || []);
      setCountries(countriesData || []);
      setCategories(categoriesData || []);
      setRates(ratesData || []);
    } catch (error: any) {
      console.error('[ShipmentRequestsPage] Error loading shipment data:', error);
      setError(error.message || 'Error desconocido');
      notificationService.error('Error al cargar datos', error.message || 'Error desconocido');
      // Asegurar que el estado se establece incluso si hay error
      setRequests([]);
      setFilteredRequests([]);
      setCustomers([]);
      setCountries([]);
      setCategories([]);
      setRates([]);
    } finally {
      setIsLoading(false);
      console.log('[ShipmentRequestsPage] Loading completed');
    }
  };

  const filterRequests = () => {
    if (!searchQuery.trim()) {
      setFilteredRequests(requests);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = requests.filter(
      (req) =>
        req.guideNumber.toLowerCase().includes(query) ||
        req.customerName?.toLowerCase().includes(query) ||
        req.contactName.toLowerCase().includes(query) ||
        req.originAddress.toLowerCase().includes(query) ||
        req.destinationAddress.toLowerCase().includes(query)
    );
    setFilteredRequests(filtered);
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

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const created = await shipmentService.createShipmentRequest(formData);
      notificationService.success('Solicitud creada exitosamente', `Número de guía: ${created.guideNumber}`);
      setIsDialogOpen(false);
      resetForm();
      await loadData();
    } catch (error: any) {
      notificationService.error('Error al crear solicitud', error.message);
    } finally {
      setIsSubmitting(false);
    }
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

  const handleGenerateLabel = async (requestId: string) => {
    try {
      const blob = await shipmentService.getShipmentLabelPdf(requestId);
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error: any) {
      notificationService.error('Error al generar etiqueta', error.message);
    }
  };

  console.log('[ShipmentRequestsPage] Render state:', { isLoading, error, requestsCount: requests.length });

  try {
    if (isLoading) {
      console.log('[ShipmentRequestsPage] Rendering skeleton');
      return <TableSkeleton />;
    }

    if (error) {
      console.log('[ShipmentRequestsPage] Rendering error state');
      return (
        <div className={styles.container}>
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

    console.log('[ShipmentRequestsPage] Rendering main content');
    return (
      <div className={styles.container}>
        <div className={styles.ribbonMenuContainer}>
          <RibbonMenu />
        </div>

        <div className={styles.header}>
          <Text className={styles.title}>Solicitudes de Recogida</Text>
        </div>

      <div className={styles.toolbar}>
        <SearchBox
          placeholder="Buscar por número de guía, cliente, contacto o dirección..."
          value={searchQuery}
          onChange={(_, data) => setSearchQuery(data.value)}
          style={{ flex: 1 }}
        />
        <Button
          appearance="primary"
          icon={<AddRegular />}
          onClick={() => setIsDialogOpen(true)}
        >
          Nueva Solicitud
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Número de Guía</TableHeaderCell>
              <TableHeaderCell>Cliente</TableHeaderCell>
              <TableHeaderCell>Origen</TableHeaderCell>
              <TableHeaderCell>Destino</TableHeaderCell>
              <TableHeaderCell>Contacto</TableHeaderCell>
              <TableHeaderCell>Fecha Estimada</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div style={{ textAlign: 'center', padding: tokens.spacingVerticalXL }}>
                    <Text>No hay solicitudes registradas</Text>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <Text weight="semibold">{request.guideNumber}</Text>
                  </TableCell>
                  <TableCell>{request.customerName || 'N/A'}</TableCell>
                  <TableCell>
                    <Text>{request.originAddress}</Text>
                    {request.originCity && (
                      <Text size={200} style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>
                        {request.originCity}
                      </Text>
                    )}
                  </TableCell>
                  <TableCell>
                    <Text>{request.destinationAddress}</Text>
                    {request.destinationCity && (
                      <Text size={200} style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>
                        {request.destinationCity}
                      </Text>
                    )}
                  </TableCell>
                  <TableCell>
                    <Text>{request.contactName}</Text>
                    {request.contactPhone && (
                      <Text size={200} style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>
                        {request.contactPhone}
                      </Text>
                    )}
                  </TableCell>
                  <TableCell>
                    {request.estimatedDeliveryDate ? (
                      <Text>{new Date(request.estimatedDeliveryDate).toLocaleDateString()}</Text>
                    ) : (
                      <Text>N/A</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      appearance="subtle"
                      icon={<DocumentRegular />}
                      onClick={() => handleGenerateLabel(request.id)}
                      size="small"
                    >
                      Etiqueta
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={(_, data) => setIsDialogOpen(data.open)}>
        <DialogSurface style={{ maxWidth: '800px', width: '90vw' }}>
          <DialogTitle>Nueva Solicitud de Recogida</DialogTitle>
          <DialogBody>
            <DialogContent>
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
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button
              appearance="secondary"
              onClick={() => {
                setIsDialogOpen(false);
                resetForm();
              }}
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
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </div>
    );
  } catch (renderError: any) {
    console.error('[ShipmentRequestsPage] Render error:', renderError);
    return (
      <div style={{ padding: tokens.spacingVerticalXL }}>
        <MessageBar intent="error">
          <MessageBarBody>
            <Text>Error al renderizar la página: {renderError?.message || 'Error desconocido'}</Text>
            <Button
              appearance="primary"
              onClick={() => window.location.reload()}
              style={{ marginTop: tokens.spacingVerticalM }}
            >
              Recargar Página
            </Button>
          </MessageBarBody>
        </MessageBar>
      </div>
    );
  }
};

