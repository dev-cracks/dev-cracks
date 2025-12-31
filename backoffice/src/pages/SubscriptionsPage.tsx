import { useState, useEffect, useCallback } from 'react';
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
  Input,
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
  Combobox,
  Option,
  Label,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  ProgressBar,
  Tooltip,
} from '@fluentui/react-components';
import {
  AddRegular,
  EditRegular,
  DeleteRegular,
  PauseRegular,
  PlayRegular,
  ArrowClockwiseRegular,
  SearchRegular,
  DismissRegular,
  InfoRegular,
  MoreHorizontalRegular,
} from '@fluentui/react-icons';
import { subscriptionService, SubscriptionDto, SubscriptionTypeDto, CreateSubscriptionRequest } from '../services/subscriptionService';
import { customerService, CustomerDto } from '../services/customerService';
import { useTranslation } from 'react-i18next';
import { useToastController } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
    ...shorthands.padding(tokens.spacingVerticalXXL, tokens.spacingHorizontalXXL),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalM),
    alignItems: 'center',
  },
  tableCard: {
    ...shorthands.padding(tokens.spacingVerticalL),
  },
  formField: {
    marginBottom: tokens.spacingVerticalM,
  },
  usageContainer: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
    ...shorthands.padding(tokens.spacingVerticalS),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  usageBar: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  usageText: {
    minWidth: '120px',
    fontSize: tokens.fontSizeBase200,
  },
  badgeContainer: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalXS),
  },
});

export const SubscriptionsPage = () => {
  const styles = useStyles();
  const { t } = useTranslation('backoffice');
  const { dispatchToast } = useToastController();

  const [subscriptions, setSubscriptions] = useState<SubscriptionDto[]>([]);
  const [subscriptionTypes, setSubscriptionTypes] = useState<SubscriptionTypeDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionDto | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createFormData, setCreateFormData] = useState<CreateSubscriptionRequest>({
    customerId: '',
    subscriptionTypeId: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [subscriptionTypesData, customersData] = await Promise.all([
        subscriptionService.getAllSubscriptionTypes(),
        customerService.getAllCustomers(),
      ]);
      setSubscriptionTypes(subscriptionTypesData);
      setCustomers(customersData);

      // Cargar suscripciones según el filtro
      if (selectedCustomer) {
        const customerSubscriptions = await subscriptionService.getCustomerSubscriptions(selectedCustomer);
        setSubscriptions(customerSubscriptions);
      } else {
        // Si no hay cliente seleccionado, cargar todas las suscripciones
        const allSubscriptions = await subscriptionService.getAllSubscriptions();
        setSubscriptions(allSubscriptions);
      }
    } catch (err: any) {
      setError(err.message || 'Error al cargar los datos');
      dispatchToast(
        <MessageBar intent="error">
          <MessageBarBody>{err.message || 'Error al cargar los datos'}</MessageBarBody>
        </MessageBar>,
        { intent: 'error' }
      );
    } finally {
      setIsLoading(false);
    }
  }, [selectedCustomer, dispatchToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = !searchText || 
      sub.subscriptionTypeName.toLowerCase().includes(searchText.toLowerCase()) ||
      customers.find(c => c.id === sub.customerId)?.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesCustomer = !selectedCustomer || sub.customerId === selectedCustomer;
    return matchesSearch && matchesCustomer;
  });

  const handleCreateSubscription = async () => {
    if (!createFormData.customerId || !createFormData.subscriptionTypeId) {
      setError('Por favor, complete todos los campos requeridos');
      return;
    }

    setIsProcessing(true);
    setError(null);
    try {
      await subscriptionService.createSubscription(createFormData);
      dispatchToast(
        <MessageBar intent="success">
          <MessageBarBody>Suscripción creada exitosamente</MessageBarBody>
        </MessageBar>,
        { intent: 'success' }
      );
      setIsCreateDialogOpen(false);
      setCreateFormData({
        customerId: '',
        subscriptionTypeId: '',
        startDate: new Date().toISOString().split('T')[0],
      });
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Error al crear la suscripción');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeactivate = async () => {
    if (!selectedSubscription) return;

    setIsProcessing(true);
    setError(null);
    try {
      await subscriptionService.deactivateSubscription(selectedSubscription.id);
      dispatchToast(
        <MessageBar intent="success">
          <MessageBarBody>Suscripción desactivada exitosamente</MessageBarBody>
        </MessageBar>,
        { intent: 'success' }
      );
      setIsDeactivateDialogOpen(false);
      setSelectedSubscription(null);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Error al desactivar la suscripción');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleActivate = async () => {
    if (!selectedSubscription) return;

    setIsProcessing(true);
    setError(null);
    try {
      await subscriptionService.activateSubscription(selectedSubscription.id);
      dispatchToast(
        <MessageBar intent="success">
          <MessageBarBody>Suscripción activada exitosamente</MessageBarBody>
        </MessageBar>,
        { intent: 'success' }
      );
      setIsActivateDialogOpen(false);
      setSelectedSubscription(null);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Error al activar la suscripción');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetUsage = async () => {
    if (!selectedSubscription) return;

    setIsProcessing(true);
    setError(null);
    try {
      await subscriptionService.resetSubscriptionUsage(selectedSubscription.id);
      dispatchToast(
        <MessageBar intent="success">
          <MessageBarBody>Uso de suscripción reiniciado exitosamente</MessageBarBody>
        </MessageBar>,
        { intent: 'success' }
      );
      setIsResetDialogOpen(false);
      setSelectedSubscription(null);
      await loadData();
    } catch (err: any) {
      setError(err.message || 'Error al reiniciar el uso de la suscripción');
    } finally {
      setIsProcessing(false);
    }
  };

  const getUsagePercentage = (current: number, max?: number): number => {
    if (!max || max === 0) return 0;
    return Math.min((current / max) * 100, 100);
  };

  const getProgressBarColor = (percentage: number): 'success' | 'warning' | 'error' => {
    if (percentage >= 90) return 'error';
    if (percentage >= 70) return 'warning';
    return 'success';
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCustomerName = (customerId: string): string => {
    return customers.find(c => c.id === customerId)?.name || 'N/A';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text as="h1" size={800} weight="bold">
          {t('subscriptions.title')}
        </Text>
        <Button
          appearance="primary"
          icon={<AddRegular />}
          onClick={() => setIsCreateDialogOpen(true)}
        >
          {t('subscriptions.newSubscription')}
        </Button>
      </div>

      {error && (
        <MessageBar intent="error">
          <MessageBarBody>{error.startsWith('common.') || error.startsWith('customers.') || error.startsWith('offices.') || error.startsWith('subscriptions.') ? t(error as any) : error}</MessageBarBody>
        </MessageBar>
      )}

      <Card className={styles.tableCard}>
        <div className={styles.searchContainer}>
          <SearchBox
            placeholder={t('subscriptions.searchPlaceholder')}
            value={searchText}
            onChange={(e, data) => setSearchText(data.value)}
            style={{ flex: 1 }}
          />
          <Combobox
            placeholder={t('subscriptions.filterByCustomer')}
            value={selectedCustomer ? getCustomerName(selectedCustomer) : ''}
            onOptionSelect={(e, data) => {
              setSelectedCustomer(data.optionValue || '');
            }}
            style={{ width: '250px' }}
          >
            <Option value="" text={t('subscriptions.allCustomers')}>{t('subscriptions.allCustomers')}</Option>
            {customers.map((customer) => (
              <Option key={customer.id} value={customer.id} text={customer.name}>
                {customer.name}
              </Option>
            ))}
          </Combobox>
          <Button
            appearance="subtle"
            icon={<ArrowClockwiseRegular />}
            onClick={loadData}
            disabled={isLoading}
          >
            {t('subscriptions.refresh')}
          </Button>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: tokens.spacingVerticalXXL }}>
            <Spinner size="large" label={t('subscriptions.loadingSubscriptions')} />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>{t('subscriptions.customer')}</TableHeaderCell>
                <TableHeaderCell>{t('subscriptions.subscriptionType')}</TableHeaderCell>
                <TableHeaderCell>{t('subscriptions.model')}</TableHeaderCell>
                <TableHeaderCell>{t('subscriptions.status')}</TableHeaderCell>
                <TableHeaderCell>{t('subscriptions.startDate')}</TableHeaderCell>
                <TableHeaderCell>{t('subscriptions.tokenUsage')}</TableHeaderCell>
                <TableHeaderCell>{t('subscriptions.messageUsage')}</TableHeaderCell>
                <TableHeaderCell>{t('subscriptions.actions')}</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscriptions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Text>{t('subscriptions.noSubscriptionsFound')}</Text>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell>
                      <Text weight="semibold">{getCustomerName(subscription.customerId)}</Text>
                    </TableCell>
                    <TableCell>
                      <Badge appearance="filled" color="brand">
                        {subscription.subscriptionTypeName}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Text>{subscription.allowedModelName}</Text>
                    </TableCell>
                    <TableCell>
                      <Badge
                        appearance="filled"
                        color={subscription.isActive ? 'success' : 'danger'}
                      >
                        {subscription.isActive ? t('subscriptions.active') : t('subscriptions.inactive')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Text>{formatDate(subscription.startDate)}</Text>
                    </TableCell>
                    <TableCell>
                      <div className={styles.usageContainer}>
                        <div className={styles.usageBar}>
                          <Text size={200} className={styles.usageText}>
                            {subscription.monthlyUsageTokens.toLocaleString()} / {subscription.maxTokensPerMonth?.toLocaleString() || '∞'}
                          </Text>
                          <ProgressBar
                            value={getUsagePercentage(subscription.monthlyUsageTokens, subscription.maxTokensPerMonth)}
                            max={100}
                            color={getProgressBarColor(getUsagePercentage(subscription.monthlyUsageTokens, subscription.maxTokensPerMonth))}
                            style={{ flex: 1 }}
                          />
                          <Tooltip
                            content={`${getUsagePercentage(subscription.monthlyUsageTokens, subscription.maxTokensPerMonth).toFixed(1)}% usado`}
                            relationship="label"
                          >
                            <InfoRegular fontSize={14} />
                          </Tooltip>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={styles.usageContainer}>
                        <div className={styles.usageBar}>
                          <Text size={200} className={styles.usageText}>
                            {subscription.monthlyUsageMessages.toLocaleString()} / {subscription.maxMessagesPerMonth?.toLocaleString() || '∞'}
                          </Text>
                          <ProgressBar
                            value={getUsagePercentage(subscription.monthlyUsageMessages, subscription.maxMessagesPerMonth)}
                            max={100}
                            color={getProgressBarColor(getUsagePercentage(subscription.monthlyUsageMessages, subscription.maxMessagesPerMonth))}
                            style={{ flex: 1 }}
                          />
                          <Tooltip
                            content={`${getUsagePercentage(subscription.monthlyUsageMessages, subscription.maxMessagesPerMonth).toFixed(1)}% usado`}
                            relationship="label"
                          >
                            <InfoRegular fontSize={14} />
                          </Tooltip>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Menu>
                        <MenuTrigger disableButtonEnhancement>
                          <Button appearance="subtle" icon={<MoreHorizontalRegular />} />
                        </MenuTrigger>
                        <MenuPopover>
                          <MenuList>
                            {subscription.isActive ? (
                              <MenuItem
                                icon={<PauseRegular />}
                                onClick={() => {
                                  setSelectedSubscription(subscription);
                                  setIsDeactivateDialogOpen(true);
                                }}
                              >
                                Desactivar
                              </MenuItem>
                            ) : (
                              <MenuItem
                                icon={<PlayRegular />}
                                onClick={() => {
                                  setSelectedSubscription(subscription);
                                  setIsActivateDialogOpen(true);
                                }}
                              >
                                Activar
                              </MenuItem>
                            )}
                            <MenuItem
                              icon={<ArrowClockwiseRegular />}
                              onClick={() => {
                                setSelectedSubscription(subscription);
                                setIsResetDialogOpen(true);
                              }}
                            >
                              Reiniciar Uso
                            </MenuItem>
                          </MenuList>
                        </MenuPopover>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Create Subscription Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={(_, data) => setIsCreateDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle
            action={
              <Button
                appearance="subtle"
                aria-label="close"
                icon={<DismissRegular />}
                onClick={() => setIsCreateDialogOpen(false)}
              />
            }
          >
            Crear Nueva Suscripción
          </DialogTitle>
          <DialogBody>
            {error && (
              <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{error}</MessageBarBody>
              </MessageBar>
            )}
            <Field label={t('subscriptions.customer')} required className={styles.formField}>
                <Combobox
                placeholder={t('subscriptions.selectCustomer')}
                value={createFormData.customerId ? getCustomerName(createFormData.customerId) : ''}
                onOptionSelect={(e, data) => {
                  setCreateFormData({ ...createFormData, customerId: data.optionValue || '' });
                }}
              >
                {customers.map((customer) => (
                  <Option key={customer.id} value={customer.id} text={customer.name}>
                    {customer.name}
                  </Option>
                ))}
              </Combobox>
            </Field>
            <Field label={t('subscriptions.subscriptionType')} required className={styles.formField}>
                <Combobox
                placeholder={t('subscriptions.selectSubscriptionType')}
                value={createFormData.subscriptionTypeId ? subscriptionTypes.find(st => st.id === createFormData.subscriptionTypeId)?.name || '' : ''}
                onOptionSelect={(e, data) => {
                  setCreateFormData({ ...createFormData, subscriptionTypeId: data.optionValue || '' });
                }}
              >
                {subscriptionTypes.map((type) => {
                  const optionText = `${type.name} - ${type.allowedModelName} (${type.pricePerMonth > 0 ? `$${type.pricePerMonth}/mes` : 'Gratis'})`;
                  return (
                    <Option key={type.id} value={type.id} text={optionText}>
                      {optionText}
                    </Option>
                  );
                })}
              </Combobox>
            </Field>
            <Field label={t('subscriptions.startDateLabel')} className={styles.formField}>
              <Input
                type="date"
                value={createFormData.startDate || ''}
                onChange={(e) => setCreateFormData({ ...createFormData, startDate: e.target.value })}
              />
            </Field>
          </DialogBody>
          <DialogActions>
            <Button
              appearance="secondary"
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              appearance="primary"
              onClick={handleCreateSubscription}
              disabled={isProcessing}
            >
              {isProcessing ? 'Creando...' : 'Crear'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Deactivate Dialog */}
      <Dialog open={isDeactivateDialogOpen} onOpenChange={(_, data) => setIsDeactivateDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Desactivar Suscripción</DialogTitle>
          <DialogBody>
            <Text>
              ¿Está seguro de que desea desactivar la suscripción de{' '}
              <strong>{selectedSubscription && getCustomerName(selectedSubscription.customerId)}</strong>?
            </Text>
          </DialogBody>
          <DialogActions>
            <Button
              appearance="secondary"
              onClick={() => setIsDeactivateDialogOpen(false)}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              appearance="primary"
              onClick={handleDeactivate}
              disabled={isProcessing}
            >
              {isProcessing ? 'Desactivando...' : 'Desactivar'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Activate Dialog */}
      <Dialog open={isActivateDialogOpen} onOpenChange={(_, data) => setIsActivateDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Activar Suscripción</DialogTitle>
          <DialogBody>
            <Text>
              ¿Está seguro de que desea activar la suscripción de{' '}
              <strong>{selectedSubscription && getCustomerName(selectedSubscription.customerId)}</strong>?
              <br />
              <br />
              <strong>Nota:</strong> Esto desactivará automáticamente cualquier otra suscripción activa del mismo cliente.
            </Text>
          </DialogBody>
          <DialogActions>
            <Button
              appearance="secondary"
              onClick={() => setIsActivateDialogOpen(false)}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              appearance="primary"
              onClick={handleActivate}
              disabled={isProcessing}
            >
              {isProcessing ? 'Activando...' : 'Activar'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Reset Usage Dialog */}
      <Dialog open={isResetDialogOpen} onOpenChange={(_, data) => setIsResetDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Reiniciar Uso de Suscripción</DialogTitle>
          <DialogBody>
            <Text>
              ¿Está seguro de que desea reiniciar el uso mensual de la suscripción de{' '}
              <strong>{selectedSubscription && getCustomerName(selectedSubscription.customerId)}</strong>?
              <br />
              <br />
              Esto establecerá los tokens y mensajes usados en 0.
            </Text>
          </DialogBody>
          <DialogActions>
            <Button
              appearance="secondary"
              onClick={() => setIsResetDialogOpen(false)}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              appearance="primary"
              onClick={handleResetUsage}
              disabled={isProcessing}
            >
              {isProcessing ? 'Reiniciando...' : 'Reiniciar'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

