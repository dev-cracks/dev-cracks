import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import {
  BoxArrowUpRegular,
  SearchRegular,
  AddRegular,
  DocumentRegular,
  DismissRegular,
  EyeRegular,
  EyeOffRegular,
} from '@fluentui/react-icons';
import {
  shipmentService,
  ShipmentRequestDto,
} from '../services/shipmentService';
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
});

export const ShipmentRequestsPage = () => {
  const { t } = useTranslation('backoffice');
  console.log('[ShipmentRequestsPage] Component rendering - START');
  const styles = useStyles();
  const navigate = useNavigate();
  const { addGroup, removeGroup } = useRibbonMenu();
  const [requests, setRequests] = useState<ShipmentRequestDto[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<ShipmentRequestDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showContactGlobal, setShowContactGlobal] = useState(false);
  const [visibleContacts, setVisibleContacts] = useState<Set<string>>(new Set());

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
              label: t('shipments.title'),
              items: [
                {
                  id: 'new-request',
                  label: t('shipments.newRequest'),
                  icon: <AddRegular />,
                  action: () => navigate('/shipments/new'),
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
          setError(err.message || t('shipments.errorInitializing'));
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
      const requestsData = await shipmentService.getShipmentRequests().catch((err: any) => {
        console.error('[ShipmentRequestsPage] Error loading requests:', err);
        return [];
      });
      console.log('[ShipmentRequestsPage] Data loaded:', {
        requests: requestsData?.length || 0,
      });
      setRequests(requestsData || []);
      setFilteredRequests(requestsData || []);
    } catch (error: any) {
      console.error('[ShipmentRequestsPage] Error loading shipment data:', error);
      setError(error.message || t('shipments.errorUnknown'));
      notificationService.error(t('shipments.errorLoading'), error.message || t('shipments.errorUnknown'));
      // Asegurar que el estado se establece incluso si hay error
      setRequests([]);
      setFilteredRequests([]);
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


  const handleGenerateLabel = async (requestId: string) => {
    try {
      const blob = await shipmentService.getShipmentLabelPdf(requestId);
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error: any) {
      notificationService.error(t('shipments.errorGeneratingLabel'), error.message);
    }
  };

  const toggleContactGlobal = () => {
    const newValue = !showContactGlobal;
    setShowContactGlobal(newValue);
    // Limpiar visibilidades individuales cuando se cambia el estado global
    setVisibleContacts(new Set());
  };

  const toggleContactCell = (requestId: string) => {
    setVisibleContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(requestId)) {
        newSet.delete(requestId);
      } else {
        newSet.add(requestId);
      }
      return newSet;
    });
  };

  const isContactVisible = (requestId: string) => {
    return showContactGlobal || visibleContacts.has(requestId);
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
          <Text className={styles.title}>{t('shipments.title')}</Text>
        </div>

      <div className={styles.toolbar}>
        <SearchBox
          placeholder={t('shipments.searchPlaceholder')}
          value={searchQuery}
          onChange={(_, data) => setSearchQuery(data.value)}
          style={{ flex: 1 }}
        />
        <Button
          appearance="primary"
          icon={<AddRegular />}
          onClick={() => navigate('/shipments/new')}
        >
          {t('shipments.newRequest')}
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>{t('shipments.guideNumber')}</TableHeaderCell>
              <TableHeaderCell>{t('shipments.customer')}</TableHeaderCell>
              <TableHeaderCell>{t('shipments.origin')}</TableHeaderCell>
              <TableHeaderCell>{t('shipments.destination')}</TableHeaderCell>
              <TableHeaderCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                  <span>{t('shipments.contact')}</span>
                  <Button
                    appearance="subtle"
                    icon={showContactGlobal ? <EyeRegular /> : <EyeOffRegular />}
                    onClick={toggleContactGlobal}
                    size="small"
                    title={showContactGlobal ? t('shipments.hideAllContacts') : t('shipments.showAllContacts')}
                  />
                </div>
              </TableHeaderCell>
              <TableHeaderCell>{t('shipments.requestDate')}</TableHeaderCell>
              <TableHeaderCell>{t('shipments.estimatedDate')}</TableHeaderCell>
              <TableHeaderCell>{t('shipments.print')}</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <div style={{ textAlign: 'center', padding: tokens.spacingVerticalXL }}>
                    <Text>{t('shipments.noRequests')}</Text>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <Text weight="semibold">{request.guideNumber}</Text>
                  </TableCell>
                  <TableCell>{request.customerName || t('shipments.notAvailable')}</TableCell>
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                      {isContactVisible(request.id) ? (
                        <>
                          <div style={{ flex: 1 }}>
                            <Text>{request.contactName}</Text>
                            {request.contactPhone && (
                              <Text size={200} style={{ display: 'block', color: tokens.colorNeutralForeground3 }}>
                                {request.contactPhone}
                              </Text>
                            )}
                          </div>
                          <Button
                            appearance="subtle"
                            icon={<EyeRegular />}
                            onClick={() => toggleContactCell(request.id)}
                            size="small"
                            title={t('shipments.hideContact')}
                          />
                        </>
                      ) : (
                        <Button
                          appearance="subtle"
                          icon={<EyeOffRegular />}
                          onClick={() => toggleContactCell(request.id)}
                          size="small"
                          title={t('shipments.showContact')}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {request.requestDate ? (
                      <Text>{new Date(request.requestDate).toLocaleString()}</Text>
                    ) : (
                      <Text>{t('shipments.notAvailable')}</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    {request.estimatedDeliveryDate ? (
                      <Text>{new Date(request.estimatedDeliveryDate).toLocaleString()}</Text>
                    ) : (
                      <Text>{t('shipments.notAvailable')}</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      appearance="subtle"
                      icon={<DocumentRegular />}
                      onClick={() => handleGenerateLabel(request.id)}
                      size="small"
                    >
                      {t('shipments.label')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
    );
  } catch (renderError: any) {
    console.error('[ShipmentRequestsPage] Render error:', renderError);
    return (
      <div style={{ padding: tokens.spacingVerticalXL }}>
        <MessageBar intent="error">
          <MessageBarBody>
            <Text>{t('shipments.errorRendering')}: {renderError?.message || t('shipments.errorUnknown')}</Text>
            <Button
              appearance="primary"
              onClick={() => window.location.reload()}
              style={{ marginTop: tokens.spacingVerticalM }}
            >
              {t('shipments.reloadPage')}
            </Button>
          </MessageBarBody>
        </MessageBar>
      </div>
    );
  }
};

