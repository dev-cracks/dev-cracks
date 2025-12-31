import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('backoffice');
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
          setError(err.message || t('newShipmentRequest.errorInitializing'));
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
      setError(error.message || t('newShipmentRequest.errorUnknown'));
      notificationService.error(t('newShipmentRequest.errorLoading'), error.message || t('newShipmentRequest.errorUnknown'));
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
      setErrorMessage(error.message || t('newShipmentRequest.errorCreating'));
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
          {t('newShipmentRequest.back')}
        </Button>
        <Text className={styles.title}>{t('newShipmentRequest.title')}</Text>
      </div>

      <Card className={styles.formContainer}>
        <div ref={formContentRef} className={styles.formContent}>
          <div className={styles.formSection}>
            <Text className={styles.formSectionTitle}>{t('newShipmentRequest.customerData')}</Text>
            <div className={styles.formGrid}>
              <Field label={t('newShipmentRequest.customer')} required className={styles.formFieldFull}>
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

              <Field label={t('newShipmentRequest.originAddress')} required className={styles.formFieldFull}>
                <Input
                  value={formData.originAddress}
                  onChange={(_, data) => setFormData({ ...formData, originAddress: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.originCity')}>
                <Input
                  value={formData.originCity || ''}
                  onChange={(_, data) => setFormData({ ...formData, originCity: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.originStateProvince')}>
                <Input
                  value={formData.originStateProvince || ''}
                  onChange={(_, data) => setFormData({ ...formData, originStateProvince: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.originPostalCode')}>
                <Input
                  value={formData.originPostalCode || ''}
                  onChange={(_, data) => setFormData({ ...formData, originPostalCode: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.originCountry')} required>
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

              <Field label={t('newShipmentRequest.destinationAddress')} required className={styles.formFieldFull}>
                <Input
                  value={formData.destinationAddress}
                  onChange={(_, data) => setFormData({ ...formData, destinationAddress: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.destinationCity')}>
                <Input
                  value={formData.destinationCity || ''}
                  onChange={(_, data) => setFormData({ ...formData, destinationCity: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.destinationStateProvince')}>
                <Input
                  value={formData.destinationStateProvince || ''}
                  onChange={(_, data) => setFormData({ ...formData, destinationStateProvince: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.destinationPostalCode')}>
                <Input
                  value={formData.destinationPostalCode || ''}
                  onChange={(_, data) => setFormData({ ...formData, destinationPostalCode: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.destinationCountry')} required>
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
            <Text className={styles.formSectionTitle}>{t('newShipmentRequest.contactData')}</Text>
            <div className={styles.formGrid}>
              <Field label={t('newShipmentRequest.contactName')} required>
                <Input
                  value={formData.contactName}
                  onChange={(_, data) => setFormData({ ...formData, contactName: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.phone')}>
                <Input
                  value={formData.contactPhone || ''}
                  onChange={(_, data) => setFormData({ ...formData, contactPhone: data.value })}
                />
              </Field>

              <Field label={t('newShipmentRequest.email')} className={styles.formFieldFull}>
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
                  {t('newShipmentRequest.copyFromCustomer')}
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <Text className={styles.formSectionTitle}>{t('newShipmentRequest.shipmentDetails')}</Text>
            <div className={styles.formGrid}>
              <Field label={t('newShipmentRequest.weight')} required>
                <Input
                  type="number"
                  value={formData.weight.toString()}
                  onChange={(_, data) => setFormData({ ...formData, weight: parseFloat(data.value) || 0 })}
                />
              </Field>

              <Field label={t('newShipmentRequest.width')} required>
                <Input
                  type="number"
                  value={formData.width.toString()}
                  onChange={(_, data) => setFormData({ ...formData, width: parseFloat(data.value) || 0 })}
                />
              </Field>

              <Field label={t('newShipmentRequest.height')} required>
                <Input
                  type="number"
                  value={formData.height.toString()}
                  onChange={(_, data) => setFormData({ ...formData, height: parseFloat(data.value) || 0 })}
                />
              </Field>

              <Field label={t('newShipmentRequest.depth')} required>
                <Input
                  type="number"
                  value={formData.depth.toString()}
                  onChange={(_, data) => setFormData({ ...formData, depth: parseFloat(data.value) || 0 })}
                />
              </Field>

              <Field label={t('newShipmentRequest.category')} required className={styles.formFieldFull}>
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
                  label={t('newShipmentRequest.fragile')}
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
                  label={t('newShipmentRequest.insured')}
                />
              </div>

              {formData.isInsured && (
                <Field label={t('newShipmentRequest.insuredValue')} required className={styles.formFieldFull}>
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
            <Text className={styles.formSectionTitle}>{t('newShipmentRequest.rate')}</Text>
            <Field label={t('newShipmentRequest.selectRate')} required className={styles.formFieldFull}>
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
                <Text weight="semibold">{t('newShipmentRequest.ratePreview')}</Text>
                <Text style={{ display: 'block', marginTop: tokens.spacingVerticalS }}>
                  {t('newShipmentRequest.estimatedDeliveryDate')}: {new Date(Date.now() + selectedRate.slaDays * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </Text>
                <Text style={{ display: 'block' }}>
                  {t('newShipmentRequest.estimatedCost')}: {selectedRate.baseCost.toFixed(2)} €
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
            {t('newShipmentRequest.cancel')}
          </Button>
          <Button
            appearance="primary"
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.customerId || !formData.rateId}
          >
            {isSubmitting ? <Spinner size="tiny" /> : t('newShipmentRequest.create')}
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
          <DialogTitle>{t('newShipmentRequest.errorCreating')}</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>{errorMessage}</Text>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="primary" onClick={handleCloseErrorDialog}>
              {t('common.close')}
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
          <DialogTitle>{t('newShipmentRequest.successCreating')}</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                {t('newShipmentRequest.successCreating')}: <strong>{createdGuideNumber}</strong>
              </Text>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={handleConfirmGoToList}>
              {t('shipments.title')}
            </Button>
            <Button appearance="primary" onClick={handleConfirmCreateAnother}>
              {t('newShipmentRequest.create')}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

