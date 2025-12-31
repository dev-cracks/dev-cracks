import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardHeader,
  CardPreview,
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
  CounterBadge,
  Persona,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Combobox,
  Option,
  Textarea,
  Input,
  TabList,
  Tab,
} from '@fluentui/react-components';
import {
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverBody,
} from '@fluentui/react-teaching-popover';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-drawer';
import {
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components';
import {
  LocationRegular,
  SearchRegular,
  MoreHorizontalRegular,
  EditRegular,
  DeleteRegular,
  PauseRegular,
  PlayRegular,
  EyeRegular,
  AddRegular,
  BuildingRegular,
  DismissRegular,
  ArrowClockwiseRegular,
  TableRegular,
  FlowchartRegular,
} from '@fluentui/react-icons';
import {
  officeService,
  OfficeDto,
  CreateOfficeRequest,
  UpdateOfficeRequest,
} from '../services/officeService';
import {
  customerService,
  CustomerDto,
  countryService,
  CountryDto,
} from '../services/customerService';
import {
  tenantService,
  TenantDto,
} from '../services/tenantService';
import { notificationService } from '../services/notificationService';
import { userService, UserDto } from '../services/userService';
import { OfficeLocationMap } from '../components/OfficeLocationMap';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  ReactFlowProvider,
  Panel,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import dagre from 'dagre';
import { TableSkeleton } from '../components/TableSkeleton';
import { DetailsSkeleton } from '../components/DetailsSkeleton';
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
    ...shorthands.gap(tokens.spacingHorizontalM),
    marginBottom: tokens.spacingVerticalM,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalM),
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
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacingVerticalXXL,
  },
  actionsCell: {
    width: '100px',
  },
  detailsContent: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  detailsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  detailsLabel: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  formField: {
    marginBottom: tokens.spacingVerticalM,
  },
  flowContainer: {
    width: '100%',
    height: 'calc(100vh - 300px)',
    minHeight: '500px',
    maxHeight: '800px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      height: 'calc(100vh - 250px)',
      minHeight: '400px',
    },
    '@media (max-width: 480px)': {
      height: 'calc(100vh - 200px)',
      minHeight: '350px',
    },
  },
  flowNode: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    minWidth: '180px',
    maxWidth: '250px',
    width: 'auto',
    boxShadow: tokens.shadow4,
    '@media (max-width: 768px)': {
      minWidth: '150px',
      maxWidth: '200px',
      padding: tokens.spacingVerticalS,
    },
    '@media (max-width: 480px)': {
      minWidth: '120px',
      maxWidth: '160px',
      padding: tokens.spacingVerticalXS,
    },
  },
  flowNodeHeader: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    marginBottom: tokens.spacingVerticalXS,
    color: tokens.colorNeutralForeground1,
  },
  flowNodeContent: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    ...shorthands.margin(0),
  },
  flowNodeOffice: {
    backgroundColor: tokens.colorBrandBackground2,
    borderTop: `2px solid ${tokens.colorBrandForeground1}`,
    borderRight: `2px solid ${tokens.colorBrandForeground1}`,
    borderBottom: `2px solid ${tokens.colorBrandForeground1}`,
    borderLeft: `2px solid ${tokens.colorBrandForeground1}`,
  },
  flowNodeUser: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    borderTop: `2px solid ${tokens.colorPaletteGreenForeground1}`,
    borderRight: `2px solid ${tokens.colorPaletteGreenForeground1}`,
    borderBottom: `2px solid ${tokens.colorPaletteGreenForeground1}`,
    borderLeft: `2px solid ${tokens.colorPaletteGreenForeground1}`,
  },
});

export const OfficesPage = () => {
  const styles = useStyles();
  const { t } = useTranslation('backoffice');
  const { addGroup, removeGroup } = useRibbonMenu();
  
  // Hooks para restauración de foco en el Drawer
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  const [offices, setOffices] = useState<OfficeDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [countrySearchText, setCountrySearchText] = useState('');
  const [editCountrySearchText, setEditCountrySearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<OfficeDto | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isNotifyUsersDialogOpen, setIsNotifyUsersDialogOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isCreateDrawerLoading, setIsCreateDrawerLoading] = useState(false);
  const [isEditDrawerLoading, setIsEditDrawerLoading] = useState(false);
  const [isCustomerDetailsDialogOpen, setIsCustomerDetailsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null);
  const [isTenantDetailsDialogOpen, setIsTenantDetailsDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<TenantDto | null>(null);
  const [isChangeTenantDialogOpen, setIsChangeTenantDialogOpen] = useState(false);
  const [selectedNewTenantId, setSelectedNewTenantId] = useState<string>('');
  const [allTenants, setAllTenants] = useState<TenantDto[]>([]);
  const [isChangingTenant, setIsChangingTenant] = useState(false);
  const [officeUsers, setOfficeUsers] = useState<Record<string, any[]>>({});
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [officeForLocation, setOfficeForLocation] = useState<OfficeDto | null>(null);
  
  // Estados para tabs
  const [detailsActiveTab, setDetailsActiveTab] = useState<'details' | 'users'>('details');
  const [editActiveTab, setEditActiveTab] = useState<'details' | 'users'>('details');
  
  // Estados para usuarios
  const [officeUsersList, setOfficeUsersList] = useState<UserDto[]>([]);
  const [allUsersForAssign, setAllUsersForAssign] = useState<UserDto[]>([]);
  const [selectedUserToAdd, setSelectedUserToAdd] = useState<string>('');
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isAssigningUser, setIsAssigningUser] = useState(false);
  const [userSearchText, setUserSearchText] = useState('');
  
  // Estados para la vista de React Flow
  const [selectedView, setSelectedView] = useState<'table' | 'flow'>('table');
  const [selectedTabValue, setSelectedTabValue] = useState<'table' | 'flow'>('table');
  const [flowNodes, setFlowNodes] = useState<Node[]>([]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const [flowLoading, setFlowLoading] = useState(false);
  const flowLoadingRef = useRef(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Form state
  const [formData, setFormData] = useState<CreateOfficeRequest>({
    tenantId: '',
    name: '',
    address: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    phone: '',
    email: '',
    countryId: '',
  });

  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  const loadOffices = useCallback(async () => {
    if (isLoadingRef.current) {
      return;
    }
    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);
      const data = await officeService.getAllOffices();
      setOffices(data);
    } catch (err: any) {
      console.error('[OfficesPage] Error cargando offices:', err);
      setError(err.message || 'Error al cargar sedes');
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  const loadCustomers = useCallback(async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
    } catch (err: any) {
      console.error('[OfficesPage] Error cargando customers:', err);
    }
  }, []);

  const loadCountries = useCallback(async () => {
    try {
      const data = await countryService.getAllCountries();
      setCountries(data);
    } catch (err: any) {
      console.error('[OfficesPage] Error cargando países:', err);
    }
  }, []);

  const loadOfficeUsers = useCallback(async (officeId: string) => {
    try {
      const users = await officeService.getOfficeUsers(officeId);
      setOfficeUsers((prev) => ({ ...prev, [officeId]: users }));
    } catch (err: any) {
      console.error('[OfficesPage] Error cargando usuarios de la oficina:', err);
      setOfficeUsers((prev) => ({ ...prev, [officeId]: [] }));
    }
  }, []);

  useEffect(() => {
    if (!isLoadingRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadOffices();
      loadCustomers();
      loadCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cargar tenants cuando se necesiten
  useEffect(() => {
    const loadTenants = async () => {
      try {
        const tenants = await tenantService.getAllTenants();
        setAllTenants(tenants);
      } catch (err) {
        console.error('[OfficesPage] Error cargando tenants:', err);
      }
    };
    loadTenants();
  }, []);

  // Cargar usuarios de cada oficina cuando se cargan las oficinas
  useEffect(() => {
    if (offices.length > 0) {
      offices.forEach((office) => {
        loadOfficeUsers(office.id);
      });
    }
  }, [offices, loadOfficeUsers]);

  // Filtrar oficinas según el término de búsqueda
  const filteredOffices = offices.filter((office) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesName = office.name.toLowerCase().includes(searchLower);
    const matchesAddress = office.address?.toLowerCase().includes(searchLower);
    const matchesCity = office.city?.toLowerCase().includes(searchLower);
    const matchesCountry = office.countryName?.toLowerCase().includes(searchLower);
    const matchesCustomerName = office.customerName?.toLowerCase().includes(searchLower);
    const matchesTenantName = office.tenantName?.toLowerCase().includes(searchLower);
    const matchesCustomers = office.customers?.some(c => c.name.toLowerCase().includes(searchLower));
    const matchesTenants = office.tenants?.some(t => t.name.toLowerCase().includes(searchLower));
    
    return matchesName || matchesAddress || matchesCity || matchesCountry || matchesCustomerName || 
           matchesTenantName || matchesCustomers || matchesTenants;
  });

  // Detectar cambios en el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para aplicar layout automático con Dagre (responsive)
  const getLayoutedElements = useCallback((nodes: Node[], edges: Edge[], direction: 'TB' | 'LR' = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    
    // Detectar tamaño de pantalla para ajustar espaciado
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const nodesep = isMobile ? 50 : isTablet ? 75 : 100; // Separación horizontal
    const ranksep = isMobile ? 100 : isTablet ? 120 : 150; // Separación vertical
    const marginx = isMobile ? 20 : 50;
    const marginy = isMobile ? 20 : 50;
    
    dagreGraph.setGraph({ 
      rankdir: direction,
      nodesep,
      ranksep,
      marginx,
      marginy,
    });

    const nodeWidth = isMobile ? 150 : isTablet ? 180 : 220;
    const nodeHeight = isMobile ? 100 : isTablet ? 110 : 120;

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - nodeWidth / 2,
          y: nodeWithPosition.y - nodeHeight / 2,
        },
      };
    });

    return { nodes: layoutedNodes, edges };
  }, []);

  // Función para cargar datos del flow
  const loadFlowData = useCallback(async () => {
    if (filteredOffices.length === 0) {
      setFlowNodes([]);
      setFlowEdges([]);
      return;
    }

    // Prevenir múltiples cargas simultáneas
    if (flowLoadingRef.current) {
      console.log('[OfficesPage] loadFlowData ya está en ejecución, ignorando llamada duplicada');
      return;
    }

    flowLoadingRef.current = true;
    setFlowLoading(true);
    try {
      // Crear nodos y edges (sin posiciones, Dagre las calculará)
      const nodes: Node[] = [];
      const edges: Edge[] = [];
      
      // Crear nodos de oficinas
      filteredOffices.forEach((office) => {
        const officeNodeId = `office-${office.id}`;
        
        nodes.push({
          id: officeNodeId,
          type: 'default',
          position: { x: 0, y: 0 }, // Posición temporal, Dagre la calculará
          data: {
            label: (
              <div className={`${styles.flowNode} ${styles.flowNodeOffice}`}>
                <div className={styles.flowNodeHeader}>{office.name}</div>
                <div className={styles.flowNodeContent}>
                  Clientes: {office.customers && office.customers.length > 0 
                    ? office.customers.map(c => c.name).join(', ') 
                    : 'N/A'}
                </div>
                <div className={styles.flowNodeContent}>
                  Tenants: {office.tenants && office.tenants.length > 0 
                    ? office.tenants.map(t => t.name).join(', ') 
                    : 'N/A'}
                </div>
                {office.city && (
                  <div className={styles.flowNodeContent}>Ciudad: {office.city}</div>
                )}
                {office.email && (
                  <div className={styles.flowNodeContent}>Email: {office.email}</div>
                )}
                <div className={styles.flowNodeContent}>
                  {office.isSuspended ? 'Suspendido' : office.isActive ? 'Activo' : 'Inactivo'}
                </div>
              </div>
            ),
          },
        });

        // Crear nodos de usuarios para esta oficina
        const users = officeUsers[office.id] || [];
        users.forEach((user: any) => {
          const userNodeId = `user-${user.id}`;
          
          nodes.push({
            id: userNodeId,
            type: 'default',
            position: { x: 0, y: 0 }, // Posición temporal, Dagre la calculará
            data: {
              label: (
                <div className={`${styles.flowNode} ${styles.flowNodeUser}`}>
                  <div className={styles.flowNodeHeader}>{user.name || user.email}</div>
                  <div className={styles.flowNodeContent}>{user.contactEmail || user.email}</div>
                  {user.role && (
                    <div className={styles.flowNodeContent}>Rol: {user.role === 'Admin' ? 'Administrador' : 'Usuario'}</div>
                  )}
                </div>
              ),
            },
          });

          // Edge de oficina a usuario
          edges.push({
            id: `edge-${officeNodeId}-${userNodeId}`,
            source: officeNodeId,
            target: userNodeId,
            type: 'smoothstep',
          });
        });
      });

      // Aplicar layout automático con Dagre
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, 'TB');

      setFlowNodes(layoutedNodes);
      setFlowEdges(layoutedEdges);
    } catch (err: any) {
      console.error('Error cargando datos del flow:', err);
      setError(err.message || 'Error al cargar datos para la vista interactiva');
    } finally {
      setFlowLoading(false);
      flowLoadingRef.current = false;
    }
  }, [filteredOffices, officeUsers, getLayoutedElements, styles]);

  // Cargar datos del flow cuando cambia la vista, las oficinas o los usuarios
  useEffect(() => {
    if (selectedView === 'flow' && filteredOffices.length > 0) {
      // Esperar un poco para que se carguen los usuarios si aún no están cargados
      const timer = setTimeout(() => {
        loadFlowData().catch((err) => {
          console.error('[OfficesPage] Error en loadFlowData:', err);
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedView, filteredOffices.length, officeUsers, loadFlowData]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setFlowNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setFlowEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setFlowEdges((eds) => addEdge(params, eds)),
    []
  );

  // Registrar acciones en el RibbonMenu
  useEffect(() => {
    addGroup({
      id: 'offices',
      label: 'Sedes',
      icon: <LocationRegular />,
      items: [
        {
          id: 'create',
          label: t('offices.new'),
          icon: <AddRegular />,
          action: () => {
            setFormData({
              tenantId: '',
              name: '',
              address: '',
              city: '',
              stateProvince: '',
              postalCode: '',
              phone: '',
              email: '',
            });
            setIsCreateDialogOpen(true);
          },
        },
      ],
    });

    // Limpiar al desmontar
    return () => {
      removeGroup('offices');
    };
  }, [addGroup, removeGroup]);

  const handleCreate = async () => {
    if (!formData.name || !formData.tenantId) {
      setError('El nombre y el tenant son requeridos');
      return;
    }

    try {
      setError(null);
      setIsCreating(true);
      await officeService.createOffice(formData);
      setIsCreateDialogOpen(false);
      setIsCreating(false);
      setFormData({
        tenantId: '',
        name: '',
        address: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        phone: '',
        email: '',
        countryId: '',
      });
      setCountrySearchText('');
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al crear sede');
      setIsCreating(false);
    }
  };

  const handleEdit = async (office: OfficeDto) => {
    setSelectedOffice(office);
    // Usar el primer tenant de la lista si existe, o el tenantId legacy
    const firstTenantId = office.tenants && office.tenants.length > 0 
      ? office.tenants[0].id 
      : (office.tenantId || '');
    setFormData({
      tenantId: firstTenantId,
      name: office.name,
      address: office.address || '',
      city: office.city || '',
      stateProvince: office.stateProvince || '',
      postalCode: office.postalCode || '',
      phone: office.phone || '',
      email: office.email || '',
      countryId: office.countryId || '',
    });
    setEditCountrySearchText('');
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedOffice || !formData.name) {
      setError('El nombre es requerido');
      return;
    }

    const officeIdBeingUpdated = selectedOffice.id;
    try {
      setError(null);
      setIsSaving(true);
      const updateData: UpdateOfficeRequest = {
        name: formData.name,
        address: formData.address || undefined,
        city: formData.city || undefined,
        stateProvince: formData.stateProvince || undefined,
        postalCode: formData.postalCode || undefined,
        phone: formData.phone || undefined,
        email: formData.email || undefined,
        countryId: formData.countryId || undefined,
      };
      await officeService.updateOffice(officeIdBeingUpdated, updateData);
      // Mantener selectedOffice hasta que se complete la carga para que el spinner se muestre
      await loadOffices();
      setIsEditDialogOpen(false);
      setSelectedOffice(null);
      setEditCountrySearchText('');
      setIsSaving(false);
    } catch (err: any) {
      setError(err.message || 'Error al actualizar sede');
      setIsSaving(false);
    }
  };

  const handleSuspend = async (office: OfficeDto) => {
    try {
      await officeService.suspendOffice(office.id);
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al suspender sede');
    }
  };

  const handleDelete = (office: OfficeDto) => {
    setSelectedOffice(office);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedOffice) return;

    try {
      setError(null);
      await officeService.deleteOffice(selectedOffice.id);
      setIsDeleteDialogOpen(false);
      setSelectedOffice(null);
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar sede');
    }
  };

  const handleViewDetails = (office: OfficeDto) => {
    setSelectedOffice(office);
    setIsDetailsDialogOpen(true);
  };

  // Funciones para manejar usuarios de la sede
  const loadOfficeUsersList = useCallback(async (officeId: string) => {
    try {
      setIsLoadingUsers(true);
      const users = await officeService.getOfficeUsers(officeId);
      setOfficeUsersList(users);
    } catch (err: any) {
      console.error('[OfficesPage] Error cargando usuarios de la sede:', err);
      setError(err.message || 'Error al cargar usuarios de la sede');
      setOfficeUsersList([]);
    } finally {
      setIsLoadingUsers(false);
    }
  }, []);

  const loadAllUsersForAssign = useCallback(async () => {
    try {
      const users = await userService.getAllUsers();
      setAllUsersForAssign(users);
    } catch (err: any) {
      console.error('[OfficesPage] Error cargando usuarios disponibles:', err);
      setAllUsersForAssign([]);
    }
  }, []);

  const handleAssignUserToOffice = async () => {
    if (!selectedOffice || !selectedUserToAdd) {
      setError('Debe seleccionar un usuario');
      return;
    }

    try {
      setIsAssigningUser(true);
      setError(null);
      await userService.assignOfficeToUser(selectedUserToAdd, selectedOffice.id);
      await loadOfficeUsersList(selectedOffice.id);
      setSelectedUserToAdd('');
      setUserSearchText('');
    } catch (err: any) {
      console.error('[OfficesPage] Error asignando usuario a la sede:', err);
      setError(err.message || 'Error al asignar usuario a la sede');
    } finally {
      setIsAssigningUser(false);
    }
  };

  const handleRemoveUserFromOffice = async (userId: string) => {
    if (!selectedOffice) return;

    try {
      setIsAssigningUser(true);
      setError(null);
      await userService.removeOfficeFromUser(userId, selectedOffice.id);
      await loadOfficeUsersList(selectedOffice.id);
    } catch (err: any) {
      console.error('[OfficesPage] Error desasignando usuario de la sede:', err);
      setError(err.message || 'Error al desasignar usuario de la sede');
    } finally {
      setIsAssigningUser(false);
    }
  };

  // Filtrar usuarios para el combobox
  // Filtrar países para el Combobox de crear sede
  const filteredCountries = useMemo(() => {
    if (!countrySearchText.trim()) return countries;
    const searchLower = countrySearchText.toLowerCase();
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchLower) ||
      country.isoCode.toLowerCase().includes(searchLower)
    );
  }, [countries, countrySearchText]);

  // Filtrar países para el Combobox de editar sede
  const filteredEditCountries = useMemo(() => {
    if (!editCountrySearchText.trim()) return countries;
    const searchLower = editCountrySearchText.toLowerCase();
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchLower) ||
      country.isoCode.toLowerCase().includes(searchLower)
    );
  }, [countries, editCountrySearchText]);

  const filteredUsersForAssign = useMemo(() => {
    if (!userSearchText.trim()) return allUsersForAssign;
    const searchLower = userSearchText.toLowerCase();
    return allUsersForAssign.filter((user) =>
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.contactEmail?.toLowerCase().includes(searchLower)
    );
  }, [allUsersForAssign, userSearchText]);

  // Manejar loading del drawer de detalles
  useEffect(() => {
    if (isDetailsDialogOpen) {
      setIsDetailsLoading(true);
      const timer = setTimeout(() => {
        setIsDetailsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsDetailsLoading(false);
    }
  }, [isDetailsDialogOpen]);

  // Cargar usuarios cuando se abre el drawer de detalles
  useEffect(() => {
    if (isDetailsDialogOpen && selectedOffice) {
      loadOfficeUsersList(selectedOffice.id);
      loadAllUsersForAssign();
      setDetailsActiveTab('details');
    }
  }, [isDetailsDialogOpen, selectedOffice, loadOfficeUsersList, loadAllUsersForAssign]);

  // Cargar usuarios cuando se abre el drawer de edición
  useEffect(() => {
    if (isEditDialogOpen && selectedOffice) {
      loadOfficeUsersList(selectedOffice.id);
      loadAllUsersForAssign();
      setEditActiveTab('details');
    }
  }, [isEditDialogOpen, selectedOffice, loadOfficeUsersList, loadAllUsersForAssign]);

  // Manejar loading del drawer de creación
  useEffect(() => {
    if (isCreateDialogOpen) {
      setIsCreateDrawerLoading(true);
      const timer = setTimeout(() => {
        setIsCreateDrawerLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsCreateDrawerLoading(false);
    }
  }, [isCreateDialogOpen]);

  // Manejar loading del drawer de edición
  useEffect(() => {
    if (isEditDialogOpen) {
      setIsEditDrawerLoading(true);
      const timer = setTimeout(() => {
        setIsEditDrawerLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsEditDrawerLoading(false);
    }
  }, [isEditDialogOpen]);

  const handleNotifyUsers = (office: OfficeDto) => {
    setSelectedOffice(office);
    setNotificationTitle('');
    setNotificationMessage('');
    setIsNotifyUsersDialogOpen(true);
  };

  const handleSendNotification = async () => {
    if (!selectedOffice || !notificationTitle.trim() || !notificationMessage.trim()) {
      setError('El título y el mensaje son requeridos');
      return;
    }

    try {
      setError(null);
      setIsSendingNotification(true);
      const response = await notificationService.notifyOfficeUsers(selectedOffice.id, {
        title: notificationTitle,
        message: notificationMessage,
      });
      setIsNotifyUsersDialogOpen(false);
      setNotificationTitle('');
      setNotificationMessage('');
      alert(response.message);
    } catch (err: any) {
      setError(err.message || 'Error al enviar notificaciones');
    } finally {
      setIsSendingNotification(false);
    }
  };

  const handleActivate = async (office: OfficeDto) => {
    try {
      await officeService.activateOffice(office.id);
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al activar sede');
    }
  };

  const handleOpenLocationDialog = (office: OfficeDto) => {
    setOfficeForLocation(office);
    setIsLocationDialogOpen(true);
  };

  const handleSaveLocation = async (
    latitude: number | null,
    longitude: number | null,
    fullAddress: string | null
  ) => {
    if (!officeForLocation) {
      return;
    }

    try {
      setError(null);
      setIsSaving(true);
      const updateData: UpdateOfficeRequest = {
        name: officeForLocation.name,
        address: officeForLocation.address || undefined,
        city: officeForLocation.city || undefined,
        stateProvince: officeForLocation.stateProvince || undefined,
        postalCode: officeForLocation.postalCode || undefined,
        phone: officeForLocation.phone || undefined,
        email: officeForLocation.email || undefined,
        countryId: officeForLocation.countryId || undefined,
        latitude: latitude || undefined,
        longitude: longitude || undefined,
        fullAddress: fullAddress || undefined,
      };
      await officeService.updateOffice(officeForLocation.id, updateData);
      await loadOffices();
      setIsLocationDialogOpen(false);
      setOfficeForLocation(null);
    } catch (err: any) {
      console.error('[OfficesPage] Error guardando ubicación:', err);
      setError(err.message || 'Error al guardar la ubicación');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeactivate = async (office: OfficeDto) => {
    try {
      await officeService.deactivateOffice(office.id);
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al desactivar sede');
    }
  };

  const handleViewCustomerDetails = async (customerId: string) => {
    try {
      const customer = await customerService.getCustomerById(customerId);
      setSelectedCustomer(customer);
      setIsCustomerDetailsDialogOpen(true);
    } catch (err: any) {
      setError(err.message || 'Error al cargar detalles del cliente');
    }
  };

  const handleViewTenantDetails = async (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setIsTenantDetailsDialogOpen(true);
  };

  const handleChangeTenant = async (office: OfficeDto) => {
    setSelectedOffice(office);
    // Usar el primer tenant de la lista si existe, o el tenantId legacy, o cadena vacía
    const firstTenantId = office.tenants && office.tenants.length > 0 
      ? office.tenants[0].id 
      : (office.tenantId || '');
    setSelectedNewTenantId(firstTenantId);
    try {
      // Cargar todos los tenants disponibles
      const tenants = await tenantService.getAllTenants();
      setAllTenants(tenants);
      setIsChangeTenantDialogOpen(true);
    } catch (err: any) {
      setError(err.message || 'Error al cargar tenants');
    }
  };

  const handleConfirmChangeTenant = async () => {
    if (!selectedOffice || !selectedNewTenantId || selectedNewTenantId.trim() === '') {
      setError('Debe seleccionar un tenant');
      return;
    }

    // Validar que el tenant seleccionado sea diferente de los actuales (si existen)
    const currentTenantIds = selectedOffice.tenants?.map(t => t.id) || [];
    if (selectedOffice.tenantId) {
      currentTenantIds.push(selectedOffice.tenantId);
    }
    if (currentTenantIds.includes(selectedNewTenantId)) {
      setError('El tenant seleccionado ya está asociado a esta sede');
      return;
    }

    // Validar que el tenantId sea un GUID válido
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!guidRegex.test(selectedNewTenantId)) {
      setError('El tenant seleccionado no es válido');
      return;
    }

    try {
      setError(null);
      setIsChangingTenant(true);
      console.log('[OfficesPage] Cambiando tenant de la sede:', {
        officeId: selectedOffice.id,
        officeName: selectedOffice.name,
        currentTenantId: selectedOffice.tenantId,
        newTenantId: selectedNewTenantId
      });
      
      await officeService.updateOffice(selectedOffice.id, {
        name: selectedOffice.name,
        address: selectedOffice.address,
        city: selectedOffice.city,
        stateProvince: selectedOffice.stateProvince,
        postalCode: selectedOffice.postalCode,
        phone: selectedOffice.phone,
        email: selectedOffice.email,
        tenantId: selectedNewTenantId,
      });
      
      console.log('[OfficesPage] Tenant cambiado exitosamente');
      setIsChangeTenantDialogOpen(false);
      setSelectedOffice(null);
      setSelectedNewTenantId('');
      await loadOffices();
      setIsChangingTenant(false);
    } catch (err: any) {
      console.error('[OfficesPage] Error al cambiar tenant:', err);
      setError(err.message || 'Error al cambiar tenant de la sede');
      setIsChangingTenant(false);
    }
  };

  if (isLoading && offices.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <LocationRegular fontSize={32} />
          <h1 className={styles.title}>{t('offices.title')}</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
          <div style={{ flex: 1 }}>
            <SearchBox
              placeholder={t('offices.searchPlaceholder')}
              disabled
              size="large"
              style={{ width: '100%' }}
            />
          </div>
          <TabList selectedValue="table" disabled>
            <Tab value="table" icon={<TableRegular />}>
              {t('offices.tableView')}
            </Tab>
            <Tab value="flow" icon={<FlowchartRegular />}>
              {t('offices.interactiveView')}
            </Tab>
          </TabList>
        </div>
        <Card>
          <TableSkeleton rows={8} columns={9} />
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.ribbonMenuContainer}>
        <RibbonMenu />
      </div>
      <div className={styles.header}>
        <LocationRegular fontSize={32} />
        <h1 className={styles.title}>{t('offices.title')}</h1>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
        <div style={{ flex: 1 }}>
          <SearchBox
            placeholder={t('offices.searchPlaceholder')}
            value={searchTerm}
            onChange={(e, data) => setSearchTerm(data.value)}
            size="large"
            style={{ width: '100%' }}
          />
        </div>
        <Button
          appearance="secondary"
          icon={!isRefreshing ? <ArrowClockwiseRegular /> : undefined}
          onClick={async () => {
            setIsRefreshing(true);
            try {
              await loadOffices();
              if (selectedView === 'flow') {
                await loadFlowData();
              }
            } finally {
              setIsRefreshing(false);
            }
          }}
          disabled={isRefreshing}
          disabledFocusable={isRefreshing}
          loading={isRefreshing}
          title={t('offices.refreshTitle')}
        >
          {t('offices.refresh')}
        </Button>
        <TabList
          selectedValue={selectedTabValue}
          onTabSelect={(_, data) => {
            const value = data.value as 'table' | 'flow';
            setSelectedTabValue(value);
            setSelectedView(value);
          }}
        >
          <Tab value="table" icon={<TableRegular />}>
            {t('offices.tableView')}
          </Tab>
          <Tab value="flow" icon={<FlowchartRegular />}>
            {t('offices.interactiveView')}
          </Tab>
        </TabList>
      </div>

      <Card>
        <CardPreview>
          <div style={{ padding: tokens.spacingVerticalXL }}>
            {error && (
              <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{error.startsWith('common.') || error.startsWith('customers.') || error.startsWith('offices.') || error.startsWith('subscriptions.') ? t(error as any) : error}</MessageBarBody>
              </MessageBar>
            )}

            {selectedView === 'table' && (
              <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>{t('offices.name')}</TableHeaderCell>
              <TableHeaderCell>{t('offices.country')}</TableHeaderCell>
              <TableHeaderCell>{t('offices.city')}</TableHeaderCell>
              <TableHeaderCell>{t('offices.contactData')}</TableHeaderCell>
              <TableHeaderCell>{t('offices.location')}</TableHeaderCell>
              <TableHeaderCell>{t('offices.customers')}</TableHeaderCell>
              <TableHeaderCell>{t('offices.tenants')}</TableHeaderCell>
              <TableHeaderCell>{t('offices.users')}</TableHeaderCell>
              <TableHeaderCell>{t('offices.status')}</TableHeaderCell>
              <TableHeaderCell>{t('offices.actions')}</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} style={{ textAlign: 'center', padding: tokens.spacingVerticalXXL }}>
                  <Text>{t('offices.noOfficesFound')}</Text>
                </TableCell>
              </TableRow>
            ) : (
              filteredOffices.map((office) => {
                const users = officeUsers[office.id] || [];
                const hasContactData = office.address || office.phone || office.email;
                // Mostrar spinner si estamos guardando y esta es la oficina que se está actualizando
                const isUpdating = isSaving && selectedOffice?.id === office.id;
                return (
                  <TableRow key={office.id}>
                  <TableCell>
                    {isUpdating ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                        <Spinner size="tiny" />
                        <Text weight="semibold">{office.name}</Text>
                      </div>
                    ) : (
                      <Text weight="semibold">{office.name}</Text>
                    )}
                  </TableCell>
                  <TableCell>{office.countryName || 'N/A'}</TableCell>
                  <TableCell>{office.city || 'N/A'}</TableCell>
                  <TableCell>
                    {hasContactData ? (
                      <TeachingPopover>
                        <TeachingPopoverTrigger>
                          <Button
                            appearance="subtle"
                            style={{
                              padding: 0,
                              minWidth: 'auto',
                              height: 'auto',
                              color: tokens.colorBrandForegroundLink,
                              fontWeight: tokens.fontWeightSemibold,
                            }}
                          >
                            Ver datos de contacto
                          </Button>
                        </TeachingPopoverTrigger>
                        <TeachingPopoverSurface>
                          <TeachingPopoverHeader>Datos de Contacto</TeachingPopoverHeader>
                          <TeachingPopoverBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                              {office.address && (
                                <div>
                                  <Text weight="semibold" style={{ display: 'block', marginBottom: tokens.spacingVerticalXS }}>
                                    Dirección:
                                  </Text>
                                  <Text>{office.address}</Text>
                                </div>
                              )}
                              {office.phone && (
                                <div>
                                  <Text weight="semibold" style={{ display: 'block', marginBottom: tokens.spacingVerticalXS }}>
                                    Teléfono:
                                  </Text>
                                  <Text>{office.phone}</Text>
                                </div>
                              )}
                              {office.email && (
                                <div>
                                  <Text weight="semibold" style={{ display: 'block', marginBottom: tokens.spacingVerticalXS }}>
                                    Email:
                                  </Text>
                                  <Text>{office.email}</Text>
                                </div>
                              )}
                              {!office.address && !office.phone && !office.email && (
                                <Text>No hay datos de contacto disponibles</Text>
                              )}
                            </div>
                          </TeachingPopoverBody>
                        </TeachingPopoverSurface>
                      </TeachingPopover>
                    ) : (
                      <Text>N/A</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    {office.latitude && office.longitude ? (
                      <TeachingPopover>
                        <TeachingPopoverTrigger>
                          <Button
                            appearance="subtle"
                            icon={<LocationRegular />}
                            title={t('offices.viewEditLocation')}
                            style={{
                              padding: 0,
                              minWidth: 'auto',
                              height: 'auto',
                              color: tokens.colorBrandForeground1,
                            }}
                          />
                        </TeachingPopoverTrigger>
                        <TeachingPopoverSurface>
                          <TeachingPopoverHeader>Ubicación de la Sede</TeachingPopoverHeader>
                          <TeachingPopoverBody>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                              {office.fullAddress && (
                                <div>
                                  <Text weight="semibold" style={{ display: 'block', marginBottom: tokens.spacingVerticalXS }}>
                                    Dirección:
                                  </Text>
                                  <Text>{office.fullAddress}</Text>
                                </div>
                              )}
                              <div>
                                <Text weight="semibold" style={{ display: 'block', marginBottom: tokens.spacingVerticalXS }}>
                                  Coordenadas:
                                </Text>
                                <Text>
                                  Lat: {office.latitude.toFixed(6)}, Lng: {office.longitude.toFixed(6)}
                                </Text>
                              </div>
                              <Button
                                appearance="primary"
                                onClick={() => handleOpenLocationDialog(office)}
                                style={{ marginTop: tokens.spacingVerticalS }}
                              >
                                Ver/Editar en Mapa
                              </Button>
                            </div>
                          </TeachingPopoverBody>
                        </TeachingPopoverSurface>
                      </TeachingPopover>
                    ) : (
                      <Button
                        appearance="subtle"
                        icon={<LocationRegular />}
                        onClick={() => handleOpenLocationDialog(office)}
                        title={t('offices.addLocation')}
                        style={{
                          padding: 0,
                          minWidth: 'auto',
                          height: 'auto',
                          color: tokens.colorNeutralForeground3,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {office.customers && office.customers.length > 0 ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                        <TeachingPopover>
                          <TeachingPopoverTrigger>
                            <Button
                              appearance="subtle"
                              style={{
                                padding: 0,
                                minWidth: 'auto',
                                height: 'auto'
                              }}
                            >
                              <CounterBadge 
                                count={office.customers.length} 
                                size="medium" 
                                appearance="filled" 
                                color="brand" 
                              />
                            </Button>
                          </TeachingPopoverTrigger>
                          <TeachingPopoverSurface>
                            <TeachingPopoverHeader>{t('offices.associatedCustomers')}</TeachingPopoverHeader>
                            <TeachingPopoverBody>
                              <div style={{ maxWidth: '400px', maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
                                {office.customers.map((customer) => (
                                  <Button
                                    key={customer.id}
                                    appearance="subtle"
                                    onClick={() => handleViewCustomerDetails(customer.id)}
                                    style={{ 
                                      color: tokens.colorBrandForegroundLink, 
                                      textDecoration: 'none',
                                      fontWeight: tokens.fontWeightSemibold,
                                      padding: tokens.spacingVerticalXS,
                                      justifyContent: 'flex-start',
                                      textAlign: 'left'
                                    }}
                                  >
                                    {customer.name}
                                  </Button>
                                ))}
                              </div>
                            </TeachingPopoverBody>
                          </TeachingPopoverSurface>
                        </TeachingPopover>
                      </div>
                    ) : (
                      <Text>N/A</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    {office.tenants && office.tenants.length > 0 ? (
                      <TeachingPopover>
                        <TeachingPopoverTrigger>
                          <Button
                            appearance="subtle"
                            style={{
                              padding: 0,
                              minWidth: 'auto',
                              height: 'auto'
                            }}
                          >
                            <CounterBadge 
                              count={office.tenants.length} 
                              size="medium" 
                              appearance="filled" 
                              color="brand" 
                            />
                          </Button>
                        </TeachingPopoverTrigger>
                        <TeachingPopoverSurface>
                          <TeachingPopoverHeader>Tenants Asociados</TeachingPopoverHeader>
                          <TeachingPopoverBody>
                            <div style={{ maxWidth: '400px', maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
                              {office.tenants.map((tenant) => (
                                <Button
                                  key={tenant.id}
                                  appearance="subtle"
                                  onClick={() => handleViewTenantDetails({ id: tenant.id, name: tenant.name } as TenantDto)}
                                  style={{ 
                                    color: tokens.colorBrandForegroundLink, 
                                    textDecoration: 'none',
                                    fontWeight: tokens.fontWeightSemibold,
                                    padding: tokens.spacingVerticalXS,
                                    justifyContent: 'flex-start',
                                    textAlign: 'left'
                                  }}
                                >
                                  {tenant.name}
                                </Button>
                              ))}
                            </div>
                          </TeachingPopoverBody>
                        </TeachingPopoverSurface>
                      </TeachingPopover>
                    ) : (
                      <Text>N/A</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    {users.length > 0 ? (
                      <TeachingPopover>
                        <TeachingPopoverTrigger>
                          <Button
                            appearance="subtle"
                            style={{
                              padding: 0,
                              minWidth: 'auto',
                              height: 'auto'
                            }}
                          >
                            <CounterBadge 
                              count={users.length} 
                              size="medium" 
                              appearance="filled" 
                              color={users.length === 0 ? 'informative' : 'brand'} 
                            />
                          </Button>
                        </TeachingPopoverTrigger>
                        <TeachingPopoverSurface>
                          <TeachingPopoverHeader>Usuarios Asociados</TeachingPopoverHeader>
                          <TeachingPopoverBody>
                            <div style={{ maxWidth: '600px', maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                              {users.map((user: any) => (
                                <Persona
                                  key={user.id}
                                  name={user.name || user.email}
                                  secondaryText={user.contactEmail || user.email}
                                  presence={{ status: user.isActive && !user.isSuspended ? 'available' : 'offline' }}
                                />
                              ))}
                            </div>
                          </TeachingPopoverBody>
                        </TeachingPopoverSurface>
                      </TeachingPopover>
                    ) : (
                      <CounterBadge 
                        count={0} 
                        size="medium" 
                        appearance="filled" 
                        color="informative" 
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {office.isSuspended ? (
                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                    ) : office.isActive ? (
                      <Badge appearance="filled" color="success">Activo</Badge>
                    ) : (
                      <Badge appearance="outline">Inactivo</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Menu>
                      <MenuTrigger disableButtonEnhancement>
                        <Button
                          appearance="subtle"
                          icon={<MoreHorizontalRegular />}
                          aria-label="Más acciones"
                        />
                      </MenuTrigger>
                      <MenuPopover>
                        <MenuList>
                          <MenuItem icon={<EyeRegular />} onClick={() => handleViewDetails(office)}>
                            Ver detalles
                          </MenuItem>
                          <MenuItem icon={<BuildingRegular />} onClick={() => handleNotifyUsers(office)}>
                            Enviar notificación
                          </MenuItem>
                          <MenuItem icon={<EditRegular />} onClick={() => handleEdit(office)}>
                            Editar
                          </MenuItem>
                          {office.isSuspended ? (
                            <MenuItem icon={<PlayRegular />} onClick={() => handleActivate(office)}>
                              Activar
                            </MenuItem>
                          ) : (
                            <MenuItem icon={<PauseRegular />} onClick={() => handleSuspend(office)}>
                              Suspender
                            </MenuItem>
                          )}
                          <MenuItem icon={<DeleteRegular />} onClick={() => handleDelete(office)}>
                            Eliminar
                          </MenuItem>
                        </MenuList>
                      </MenuPopover>
                    </Menu>
                  </TableCell>
                </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
              </>
            )}

            {selectedView === 'flow' && (
              <div style={{ position: 'relative' }}>
                {flowLoading && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1000,
                      ...shorthands.borderRadius(tokens.borderRadiusMedium),
                    }}
                  >
                    <Spinner size="large" label="Cargando vista interactiva..." />
                  </div>
                )}
                {flowNodes.length === 0 && !flowLoading ? (
                  <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                    <Text>No hay datos para mostrar en la vista interactiva</Text>
                  </div>
                ) : (
                  <div className={styles.flowContainer}>
                    <ReactFlowProvider>
                      <ReactFlow
                        nodes={flowNodes}
                        edges={flowEdges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                        minZoom={0.2}
                        maxZoom={2}
                        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
                      >
                        <Background />
                        <Controls />
                        <MiniMap />
                        <Panel position="top-left">
                          <div style={{ backgroundColor: tokens.colorNeutralBackground1, padding: tokens.spacingVerticalS, ...shorthands.borderRadius(tokens.borderRadiusMedium) }}>
                            <Text weight="semibold">Vista Interactiva: Sedes → Usuarios</Text>
                            <div style={{ marginTop: tokens.spacingVerticalXS }}>
                              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                                Nivel: Sedes (1) → Usuarios (2)
                              </Text>
                            </div>
                          </div>
                        </Panel>
                      </ReactFlow>
                    </ReactFlowProvider>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardPreview>
      </Card>

      {/* Drawer de creación */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isCreateDialogOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            if (isCreating) {
              return;
            }
            const hasData = formData.name.trim() || 
                            formData.tenantId || 
                            formData.address.trim() || 
                            formData.city.trim() || 
                            formData.stateProvince.trim() || 
                            formData.postalCode.trim() || 
                            formData.phone.trim() || 
                            formData.email.trim();
            if (hasData) {
              if (window.confirm(t('common.confirmClose'))) {
                setIsCreateDialogOpen(false);
                setFormData({
                  tenantId: '',
                  name: '',
                  address: '',
                  city: '',
                  stateProvince: '',
                  postalCode: '',
                  phone: '',
                  email: '',
                });
                setError(null);
              }
              return;
            } else {
              setIsCreateDialogOpen(false);
            }
          } else {
            setIsCreateDialogOpen(data.open);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label={t('common.close')}
                icon={<DismissRegular />}
                onClick={() => {
                  if (isCreating) {
                    return;
                  }
                  const hasData = formData.name.trim() || 
                                  formData.tenantId || 
                                  formData.address.trim() || 
                                  formData.city.trim() || 
                                  formData.stateProvince.trim() || 
                                  formData.postalCode.trim() || 
                                  formData.phone.trim() || 
                                  formData.email.trim();
                  if (hasData) {
                    if (window.confirm(t('common.confirmClose'))) {
                      setIsCreateDialogOpen(false);
                      setFormData({
                        tenantId: '',
                        name: '',
                        address: '',
                        city: '',
                        stateProvince: '',
                        postalCode: '',
                        phone: '',
                        email: '',
                        countryId: '',
                      });
                      setCountrySearchText('');
                      setError(null);
                    }
                  } else {
                    setIsCreateDialogOpen(false);
                  }
                }}
              />
            }
          >
            Nueva Sede
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isCreateDrawerLoading || isCreating ? (
              <DetailsSkeleton rows={8} />
            ) : (
              <>
              <Field label={t('offices.tenants')} required className={styles.formField}>
                <Combobox
                  value={allTenants.find(t => t.id === formData.tenantId)?.name || ''}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      setFormData({ ...formData, tenantId: data.optionValue });
                    }
                  }}
                >
                  {allTenants.map((tenant) => (
                    <Option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </Option>
                  ))}
                </Combobox>
              </Field>
              <Field label={t('offices.name')} required className={styles.formField}>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('offices.namePlaceholder')}
                />
              </Field>
              <Field label={t('offices.country')} className={styles.formField}>
                <Combobox
                  value={countrySearchText || countries.find(c => c.id === formData.countryId)?.name || ''}
                  onOptionSelect={(_, data) => {
                    const country = countries.find((c) => c.name === data.optionValue);
                    if (country) {
                      setFormData({ ...formData, countryId: country.id });
                      setCountrySearchText('');
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    setCountrySearchText(target.value);
                  }}
                  placeholder={t('offices.selectCountry')}
                >
                  {filteredCountries.map((country) => (
                    <Option key={country.id} value={country.name}>
                      {country.name} ({country.isoCode})
                    </Option>
                  ))}
                </Combobox>
              </Field>
              <Field label={t('common.address')} className={styles.formField}>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={t('customers.addressPlaceholder')}
                />
              </Field>
              <Field label={t('common.city')} className={styles.formField}>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder={t('common.city')}
                />
              </Field>
              <Field label={t('common.stateProvince')} className={styles.formField}>
                <Input
                  value={formData.stateProvince}
                  onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                  placeholder={t('common.stateProvince')}
                />
              </Field>
              <Field label={t('common.postalCode')} className={styles.formField}>
                <Input
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder={t('customers.postalCodePlaceholder')}
                />
              </Field>
              <Field label={t('common.phone')} className={styles.formField}>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t('common.phone')}
                />
              </Field>
              <Field label={t('common.email')} className={styles.formField}>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('common.email')}
                />
              </Field>
              <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                <Button 
                  appearance="secondary" 
                  onClick={() => {
                    const hasData = formData.name.trim() || 
                                    formData.tenantId || 
                                    formData.countryId ||
                                    formData.address.trim() || 
                                    formData.city.trim() || 
                                    formData.stateProvince.trim() || 
                                    formData.postalCode.trim() || 
                                    formData.phone.trim() || 
                                    formData.email.trim();
                    if (hasData) {
                      if (window.confirm(t('common.confirmCancel'))) {
                        setIsCreateDialogOpen(false);
                        setFormData({
                          tenantId: '',
                          name: '',
                          address: '',
                          city: '',
                          stateProvince: '',
                          postalCode: '',
                          phone: '',
                          email: '',
                          countryId: '',
                        });
                        setError(null);
                      }
                    } else {
                      setIsCreateDialogOpen(false);
                    }
                  }}
                  disabled={isCreating}
                >
                  {t('common.cancel')}
                </Button>
                <Button appearance="primary" onClick={handleCreate} disabled={isCreating}>
                  {isCreating ? t('common.creating') : t('common.create')}
                </Button>
              </div>
              </>
            )}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Drawer de edición */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isEditDialogOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            if (isSaving) {
              return;
            }
            if (!selectedOffice) {
              setIsEditDialogOpen(false);
              setSelectedOffice(null);
              setFormData({
                tenantId: '',
                name: '',
                address: '',
                city: '',
                stateProvince: '',
                postalCode: '',
                phone: '',
                email: '',
                countryId: '',
              });
              setEditCountrySearchText('');
              return;
            }
            const hasChanges = 
              formData.name !== selectedOffice.name ||
              formData.address !== (selectedOffice.address || '') ||
              formData.city !== (selectedOffice.city || '') ||
              formData.stateProvince !== (selectedOffice.stateProvince || '') ||
              formData.postalCode !== (selectedOffice.postalCode || '') ||
              formData.phone !== (selectedOffice.phone || '') ||
              formData.email !== (selectedOffice.email || '');
            if (hasChanges) {
              if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los cambios no guardados.')) {
                setIsEditDialogOpen(false);
                setSelectedOffice(null);
                setFormData({
                  tenantId: '',
                  name: '',
                  address: '',
                  city: '',
                  stateProvince: '',
                  postalCode: '',
                  phone: '',
                  email: '',
                  countryId: '',
                });
                setEditCountrySearchText('');
                setError(null);
              }
              return;
            } else {
              setIsEditDialogOpen(false);
              setSelectedOffice(null);
              setFormData({
                tenantId: '',
                name: '',
                address: '',
                city: '',
                stateProvince: '',
                postalCode: '',
                phone: '',
                email: '',
                countryId: '',
              });
              setEditCountrySearchText('');
              setError(null);
            }
          }
          if (data.open === true) {
            setIsEditDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label={t('common.close')}
                icon={<DismissRegular />}
                onClick={() => {
                  if (isSaving) {
                    return;
                  }
                  if (!selectedOffice) {
                    setIsEditDialogOpen(false);
                    setSelectedOffice(null);
                    setFormData({
                      customerId: '',
                      name: '',
                      address: '',
                      city: '',
                      stateProvince: '',
                      postalCode: '',
                      phone: '',
                      email: '',
                    });
                    return;
                  }
                  const hasChanges = 
                    formData.name !== selectedOffice.name ||
                    formData.address !== (selectedOffice.address || '') ||
                    formData.city !== (selectedOffice.city || '') ||
                    formData.stateProvince !== (selectedOffice.stateProvince || '') ||
                    formData.postalCode !== (selectedOffice.postalCode || '') ||
                    formData.phone !== (selectedOffice.phone || '') ||
                    formData.email !== (selectedOffice.email || '');
                  if (hasChanges) {
                    if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los cambios no guardados.')) {
                      setIsEditDialogOpen(false);
                      setSelectedOffice(null);
                      setFormData({
                        customerId: '',
                        name: '',
                        address: '',
                        city: '',
                        stateProvince: '',
                        postalCode: '',
                        phone: '',
                        email: '',
                      });
                      setError(null);
                    }
                  } else {
                    setIsEditDialogOpen(false);
                    setSelectedOffice(null);
                    setFormData({
                      customerId: '',
                      name: '',
                      address: '',
                      city: '',
                      stateProvince: '',
                      postalCode: '',
                      phone: '',
                      email: '',
                    });
                    setError(null);
                  }
                }}
              />
            }
          >
            {t('offices.edit')}
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isEditDrawerLoading || isSaving ? (
              <DetailsSkeleton rows={8} />
            ) : (
              <>
                <TabList
                  selectedValue={editActiveTab}
                  onTabSelect={(_, data) => setEditActiveTab(data.value as any)}
                >
                  <Tab value="details">Detalles</Tab>
                  <Tab value="users">Usuarios</Tab>
                </TabList>

                {/* Tab de Detalles */}
                {editActiveTab === 'details' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <Field label="Tenant" required className={styles.formField}>
                      <Combobox
                        value={allTenants.find(t => t.id === formData.tenantId)?.name || ''}
                        disabled={true}
                      >
                        {allTenants.map((tenant) => (
                          <Option key={tenant.id} value={tenant.id}>
                            {tenant.name}
                          </Option>
                        ))}
                      </Combobox>
                    </Field>
                    <Field label={t('offices.name')} required className={styles.formField}>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nombre de la sede"
                        disabled={isSaving}
                      />
                    </Field>
                    <Field label="País" className={styles.formField}>
                      <Combobox
                        value={editCountrySearchText || countries.find(c => c.id === formData.countryId)?.name || ''}
                        onOptionSelect={(_, data) => {
                          const country = countries.find((c) => c.name === data.optionValue);
                          if (country) {
                            setFormData({ ...formData, countryId: country.id });
                            setEditCountrySearchText('');
                          }
                        }}
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          setEditCountrySearchText(target.value);
                        }}
                        placeholder={t('offices.selectCountry')}
                        disabled={isSaving}
                      >
                        {filteredEditCountries.map((country) => (
                          <Option key={country.id} value={country.name}>
                            {country.name} ({country.isoCode})
                          </Option>
                        ))}
                      </Combobox>
                    </Field>
                    <Field label="Dirección" className={styles.formField}>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder={t('customers.addressPlaceholder')}
                        disabled={isSaving}
                      />
                    </Field>
                    <Field label={t('common.city')} className={styles.formField}>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder={t('common.city')}
                        disabled={isSaving}
                      />
                    </Field>
                    <Field label={t('common.stateProvince')} className={styles.formField}>
                      <Input
                        value={formData.stateProvince}
                        onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                        placeholder={t('common.stateProvince')}
                        disabled={isSaving}
                      />
                    </Field>
                    <Field label={t('common.postalCode')} className={styles.formField}>
                      <Input
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder={t('customers.postalCodePlaceholder')}
                        disabled={isSaving}
                      />
                    </Field>
                    <Field label="Teléfono" className={styles.formField}>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t('common.phone')}
                        disabled={isSaving}
                      />
                    </Field>
                    <Field label={t('common.email')} className={styles.formField}>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('common.email')}
                        disabled={isSaving}
                      />
                    </Field>
                    {error && (
                      <MessageBar intent="error" style={{ marginTop: tokens.spacingVerticalXL, marginBottom: tokens.spacingVerticalM }}>
                        <MessageBarBody>{error}</MessageBarBody>
                      </MessageBar>
                    )}
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                      <Button 
                        appearance="secondary" 
                        onClick={() => {
                          if (!selectedOffice) {
                            setIsEditDialogOpen(false);
                            setSelectedOffice(null);
                            setFormData({
                              customerId: '',
                              name: '',
                              address: '',
                              city: '',
                              stateProvince: '',
                              postalCode: '',
                              phone: '',
                              email: '',
                            });
                            return;
                          }
                          const hasChanges = 
                            formData.name !== selectedOffice.name ||
                            formData.address !== (selectedOffice.address || '') ||
                            formData.city !== (selectedOffice.city || '') ||
                            formData.stateProvince !== (selectedOffice.stateProvince || '') ||
                            formData.postalCode !== (selectedOffice.postalCode || '') ||
                            formData.phone !== (selectedOffice.phone || '') ||
                            formData.email !== (selectedOffice.email || '') ||
                            formData.countryId !== (selectedOffice.countryId || '');
                          if (hasChanges) {
                            if (window.confirm(t('common.confirmCancelChanges'))) {
                              setIsEditDialogOpen(false);
                              setSelectedOffice(null);
                              setFormData({
                                customerId: '',
                                name: '',
                                address: '',
                                city: '',
                                stateProvince: '',
                                postalCode: '',
                                phone: '',
                                email: '',
                              });
                              setError(null);
                            }
                          } else {
                            setIsEditDialogOpen(false);
                            setSelectedOffice(null);
                            setFormData({
                              customerId: '',
                              name: '',
                              address: '',
                              city: '',
                              stateProvince: '',
                              postalCode: '',
                              phone: '',
                              email: '',
                            });
                            setError(null);
                          }
                        }}
                        disabled={isSaving}
                      >
                        {t('common.cancel')}
                      </Button>
                      <Button appearance="primary" onClick={handleUpdate} disabled={isSaving}>
                        {isSaving ? t('common.saving') : t('common.save')}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tab de Usuarios */}
                {editActiveTab === 'users' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalM }}>
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Combobox
                          placeholder="Seleccionar usuario para asignar"
                          value={
                            selectedUserToAdd
                              ? allUsersForAssign.find((u) => u.id === selectedUserToAdd)?.email || ''
                              : userSearchText
                          }
                          onOptionSelect={(_, data) => {
                            const user = allUsersForAssign.find((u) => u.email === data.optionValue);
                            if (user) {
                              setSelectedUserToAdd(user.id);
                              setUserSearchText('');
                            }
                          }}
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            setUserSearchText(target.value);
                            if (!target.value) {
                              setSelectedUserToAdd('');
                            }
                          }}
                          style={{ width: '300px' }}
                        >
                          {filteredUsersForAssign.map((user) => (
                            <Option key={user.id} value={user.email}>
                              {user.name || user.email} {user.email !== user.name ? `(${user.email})` : ''}
                            </Option>
                          ))}
                        </Combobox>
                        <Button
                          appearance="primary"
                          icon={<AddRegular />}
                          onClick={handleAssignUserToOffice}
                          disabled={!selectedUserToAdd || isAssigningUser}
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>

                    {isLoadingUsers ? (
                      <Spinner label="Cargando usuarios..." />
                    ) : (
                      <div>
                        {officeUsersList.length === 0 ? (
                          <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                            <Text>No hay usuarios asignados</Text>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell>{t('offices.userName')}</TableHeaderCell>
                                <TableHeaderCell>{t('offices.userEmail')}</TableHeaderCell>
                                <TableHeaderCell>{t('offices.userRole')}</TableHeaderCell>
                                <TableHeaderCell>{t('offices.userStatus')}</TableHeaderCell>
                                <TableHeaderCell>Acciones</TableHeaderCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {officeUsersList.map((user: any) => (
                                <TableRow key={user.id}>
                                  <TableCell>{user.name || 'N/A'}</TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell>{user.role || 'N/A'}</TableCell>
                                  <TableCell>
                                    {user.isSuspended ? (
                                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                                    ) : user.isActive ? (
                                      <Badge appearance="filled" color="success">Activo</Badge>
                                    ) : (
                                      <Badge appearance="outline">Inactivo</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      appearance="subtle"
                                      icon={<DeleteRegular />}
                                      onClick={() => handleRemoveUserFromOffice(user.id)}
                                      disabled={isAssigningUser}
                                    >
                                      Desasignar
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Dialog de Eliminar */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(_, data) => setIsDeleteDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Eliminar Sede</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                ¿Está seguro de que desea eliminar la sede "{selectedOffice?.name}"? Esta acción no se puede deshacer.
              </Text>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button appearance="primary" onClick={handleConfirmDelete}>
                Eliminar
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Drawer de detalles */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isDetailsDialogOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            setIsDetailsDialogOpen(false);
            setSelectedOffice(null);
          } else {
            setIsDetailsDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label={t('common.close')}
                icon={<DismissRegular />}
                onClick={() => {
                  setIsDetailsDialogOpen(false);
                  setSelectedOffice(null);
                }}
              />
            }
          >
            {t('offices.details')}
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isDetailsLoading ? (
              <DetailsSkeleton rows={12} />
            ) : selectedOffice ? (
              <>
                {error && (
                  <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                    <MessageBarBody>{error}</MessageBarBody>
                  </MessageBar>
                )}

                <TabList
                  selectedValue={detailsActiveTab}
                  onTabSelect={(_, data) => setDetailsActiveTab(data.value as any)}
                >
                  <Tab value="details">Detalles</Tab>
                  <Tab value="users">Usuarios</Tab>
                </TabList>

                {/* Tab de Detalles */}
                {detailsActiveTab === 'details' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <Field label="Nombre" className={styles.formField}>
                      <Input value={selectedOffice.name} readOnly />
                    </Field>
                    <Field label="Tenants" className={styles.formField}>
                      {selectedOffice.tenants && selectedOffice.tenants.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS }}>
                          {selectedOffice.tenants.map((tenant) => (
                            <Text key={tenant.id} weight="semibold">{tenant.name}</Text>
                          ))}
                        </div>
                      ) : (
                        <Input value="N/A" readOnly />
                      )}
                    </Field>
                    <Field label="Clientes" className={styles.formField}>
                      {selectedOffice.customers && selectedOffice.customers.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS }}>
                          {selectedOffice.customers.map((customer) => (
                            <Text key={customer.id} weight="semibold">{customer.name}</Text>
                          ))}
                        </div>
                      ) : (
                        <Input value="N/A" readOnly />
                      )}
                    </Field>
                    <Field label="Dirección" className={styles.formField}>
                      <Input value={selectedOffice.address || 'N/A'} readOnly />
                    </Field>
                    <Field label={t('common.city')} className={styles.formField}>
                      <Input value={selectedOffice.city || 'N/A'} readOnly />
                    </Field>
                    <Field label={t('common.stateProvince')} className={styles.formField}>
                      <Input value={selectedOffice.stateProvince || 'N/A'} readOnly />
                    </Field>
                    <Field label={t('common.postalCode')} className={styles.formField}>
                      <Input value={selectedOffice.postalCode || 'N/A'} readOnly />
                    </Field>
                    <Field label="Teléfono" className={styles.formField}>
                      <Input value={selectedOffice.phone || 'N/A'} readOnly />
                    </Field>
                    <Field label="Correo electrónico" className={styles.formField}>
                      <Input value={selectedOffice.email || 'N/A'} readOnly />
                    </Field>
                    <Field label="Estado" className={styles.formField}>
                      <div>
                        {selectedOffice.isSuspended ? (
                          <Badge appearance="filled" color="danger">Suspendido</Badge>
                        ) : selectedOffice.isActive ? (
                          <Badge appearance="filled" color="success">Activo</Badge>
                        ) : (
                          <Badge appearance="outline">Inactivo</Badge>
                        )}
                      </div>
                    </Field>
                    <Field label="Creado" className={styles.formField}>
                      <Input value={new Date(selectedOffice.createdAt).toLocaleString()} readOnly />
                    </Field>
                    <Field label="Actualizado" className={styles.formField}>
                      <Input value={new Date(selectedOffice.updatedAt).toLocaleString()} readOnly />
                    </Field>
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                      <Button appearance="primary" onClick={() => setIsDetailsDialogOpen(false)}>
                        Cerrar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tab de Usuarios */}
                {detailsActiveTab === 'users' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalM }}>
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Combobox
                          placeholder="Seleccionar usuario para asignar"
                          value={
                            selectedUserToAdd
                              ? allUsersForAssign.find((u) => u.id === selectedUserToAdd)?.email || ''
                              : userSearchText
                          }
                          onOptionSelect={(_, data) => {
                            const user = allUsersForAssign.find((u) => u.email === data.optionValue);
                            if (user) {
                              setSelectedUserToAdd(user.id);
                              setUserSearchText('');
                            }
                          }}
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            setUserSearchText(target.value);
                            if (!target.value) {
                              setSelectedUserToAdd('');
                            }
                          }}
                          style={{ width: '300px' }}
                        >
                          {filteredUsersForAssign.map((user) => (
                            <Option key={user.id} value={user.email}>
                              {user.name || user.email} {user.email !== user.name ? `(${user.email})` : ''}
                            </Option>
                          ))}
                        </Combobox>
                        <Button
                          appearance="primary"
                          icon={<AddRegular />}
                          onClick={handleAssignUserToOffice}
                          disabled={!selectedUserToAdd || isAssigningUser}
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>

                    {isLoadingUsers ? (
                      <Spinner label="Cargando usuarios..." />
                    ) : (
                      <div>
                        {officeUsersList.length === 0 ? (
                          <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                            <Text>No hay usuarios asignados</Text>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell>{t('offices.userName')}</TableHeaderCell>
                                <TableHeaderCell>{t('offices.userEmail')}</TableHeaderCell>
                                <TableHeaderCell>{t('offices.userRole')}</TableHeaderCell>
                                <TableHeaderCell>{t('offices.userStatus')}</TableHeaderCell>
                                <TableHeaderCell>Acciones</TableHeaderCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {officeUsersList.map((user: any) => (
                                <TableRow key={user.id}>
                                  <TableCell>{user.name || 'N/A'}</TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell>{user.role || 'N/A'}</TableCell>
                                  <TableCell>
                                    {user.isSuspended ? (
                                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                                    ) : user.isActive ? (
                                      <Badge appearance="filled" color="success">Activo</Badge>
                                    ) : (
                                      <Badge appearance="outline">Inactivo</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      appearance="subtle"
                                      icon={<DeleteRegular />}
                                      onClick={() => handleRemoveUserFromOffice(user.id)}
                                      disabled={isAssigningUser}
                                    >
                                      Desasignar
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : null}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Dialog de enviar notificación */}
      <Dialog open={isNotifyUsersDialogOpen} onOpenChange={(_, data) => setIsNotifyUsersDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Enviar Notificación a Usuarios</DialogTitle>
          <DialogBody>
            <DialogContent>
              <div className={styles.detailsContent}>
                <MessageBar intent="info">
                  <MessageBarBody>
                    Se enviará una notificación por email a todos los usuarios del cliente de la sede "{selectedOffice?.name}".
                  </MessageBarBody>
                </MessageBar>
                <Field label="Título" required>
                  <Input
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    placeholder="Título de la notificación"
                  />
                </Field>
                <Field label="Mensaje" required>
                  <Textarea
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    placeholder="Mensaje de la notificación"
                    rows={5}
                  />
                </Field>
              </div>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button 
              appearance="secondary" 
              onClick={() => {
                setIsNotifyUsersDialogOpen(false);
                setNotificationTitle('');
                setNotificationMessage('');
              }}
              disabled={isSendingNotification}
            >
              Cancelar
            </Button>
            <Button 
              appearance="primary" 
              onClick={handleSendNotification}
              disabled={isSendingNotification || !notificationTitle.trim() || !notificationMessage.trim()}
            >
              {isSendingNotification ? 'Enviando...' : 'Enviar Notificación'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Drawer de detalles del tenant */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isTenantDetailsDialogOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            setIsTenantDetailsDialogOpen(false);
            setSelectedTenant(null);
          } else {
            setIsTenantDetailsDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label={t('common.close')}
                icon={<DismissRegular />}
                onClick={() => {
                  setIsTenantDetailsDialogOpen(false);
                  setSelectedTenant(null);
                }}
              />
            }
          >
            {t('offices.tenantDetails')}
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {selectedTenant ? (
              <>
                <Field label={t('tenants.name')} className={styles.formField}>
                  <Input value={selectedTenant.name} readOnly />
                </Field>
                <Field label={t('tenants.customer')} className={styles.formField}>
                  <Input value={selectedTenant.customerName || t('common.notAvailable')} readOnly />
                </Field>
                <Field label={t('tenants.status')} className={styles.formField}>
                  <div>
                    {selectedTenant.isSuspended ? (
                      <Badge appearance="filled" color="danger">{t('common.suspended')}</Badge>
                    ) : selectedTenant.isActive ? (
                      <Badge appearance="filled" color="success">{t('common.active')}</Badge>
                    ) : (
                      <Badge appearance="outline">{t('common.inactive')}</Badge>
                    )}
                  </div>
                </Field>
                <Field label={t('tenants.users')} className={styles.formField}>
                  <Input value={String(selectedTenant.userCount || 0)} readOnly />
                </Field>
                <Field label={t('common.created')} className={styles.formField}>
                  <Input value={new Date(selectedTenant.createdAt).toLocaleString()} readOnly />
                </Field>
                <Field label={t('common.updated')} className={styles.formField}>
                  <Input value={new Date(selectedTenant.updatedAt).toLocaleString()} readOnly />
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button appearance="primary" onClick={() => setIsTenantDetailsDialogOpen(false)}>
                    {t('common.close')}
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Drawer de detalles del cliente */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isCustomerDetailsDialogOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            setIsCustomerDetailsDialogOpen(false);
            setSelectedCustomer(null);
          } else {
            setIsCustomerDetailsDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label={t('common.close')}
                icon={<DismissRegular />}
                onClick={() => {
                  setIsCustomerDetailsDialogOpen(false);
                  setSelectedCustomer(null);
                }}
              />
            }
          >
            Detalles del Cliente
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {selectedCustomer && (
              <>
                <Field label="Nombre" className={styles.formField}>
                  <Input value={selectedCustomer.name} readOnly />
                </Field>
                <Field label="Identificación" className={styles.formField}>
                  <Input value={selectedCustomer.identification} readOnly />
                </Field>
                <Field label="País" className={styles.formField}>
                  <Input value={selectedCustomer.countryName || 'N/A'} readOnly />
                </Field>
                <Field label="Estado/Provincia" className={styles.formField}>
                  <Input value={selectedCustomer.stateProvince || 'N/A'} readOnly />
                </Field>
                <Field label="Ciudad" className={styles.formField}>
                  <Input value={selectedCustomer.city || 'N/A'} readOnly />
                </Field>
                <Field label="Teléfono" className={styles.formField}>
                  <Input value={selectedCustomer.phone || 'N/A'} readOnly />
                </Field>
                <Field label="Correo electrónico" className={styles.formField}>
                  <Input value={selectedCustomer.email || 'N/A'} readOnly />
                </Field>
                <Field label="Estado" className={styles.formField}>
                  <div>
                    {selectedCustomer.isSuspended ? (
                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                    ) : selectedCustomer.isActive ? (
                      <Badge appearance="filled" color="success">Activo</Badge>
                    ) : (
                      <Badge appearance="outline">Inactivo</Badge>
                    )}
                  </div>
                </Field>
                <Field label="Tenants" className={styles.formField}>
                  <Input value={String(selectedCustomer.tenantCount || 0)} readOnly />
                </Field>
                <Field label="Usuarios" className={styles.formField}>
                  <Input value={String(selectedCustomer.userCount || 0)} readOnly />
                </Field>
                <Field label="Creado" className={styles.formField}>
                  <Input value={new Date(selectedCustomer.createdAt).toLocaleString()} readOnly />
                </Field>
                <Field label="Actualizado" className={styles.formField}>
                  <Input value={new Date(selectedCustomer.updatedAt).toLocaleString()} readOnly />
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button appearance="primary" onClick={() => setIsCustomerDetailsDialogOpen(false)}>
                    Cerrar
                  </Button>
                </div>
              </>
            )}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Dialog de cambiar tenant */}
      <Dialog open={isChangeTenantDialogOpen} onOpenChange={(_, data) => setIsChangeTenantDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Cambiar Tenant de la Sede</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                Seleccione un nuevo tenant para la sede "{selectedOffice?.name}".
              </Text>
              <Field label="Tenant" required className={styles.formField}>
                <Combobox
                  value={allTenants.find(t => t.id === selectedNewTenantId)?.name || ''}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      setSelectedNewTenantId(data.optionValue);
                    }
                  }}
                >
                  {allTenants.map((tenant) => (
                    <Option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </Option>
                  ))}
                </Combobox>
              </Field>
              {selectedOffice?.tenants && selectedOffice.tenants.length > 0 && (
                <Text>
                  Tenants actuales: {selectedOffice.tenants.map(t => t.name).join(', ')}
                </Text>
              )}
            </DialogContent>
            <DialogActions>
              <Button 
                appearance="secondary" 
                onClick={() => {
                  setIsChangeTenantDialogOpen(false);
                  setSelectedNewTenantId('');
                }}
                disabled={isChangingTenant}
              >
                Cancelar
              </Button>
              <Button 
                appearance="primary" 
                onClick={handleConfirmChangeTenant}
                disabled={isChangingTenant || !selectedNewTenantId}
              >
                {isChangingTenant ? 'Cambiando...' : 'Cambiar Tenant'}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Dialog de ubicación en mapa */}
      {officeForLocation && (
        <OfficeLocationMap
          isOpen={isLocationDialogOpen}
          onClose={() => {
            setIsLocationDialogOpen(false);
            setOfficeForLocation(null);
          }}
          onSave={handleSaveLocation}
          initialLatitude={officeForLocation.latitude ?? null}
          initialLongitude={officeForLocation.longitude ?? null}
          initialFullAddress={officeForLocation.fullAddress ?? null}
          officeName={officeForLocation.name}
        />
      )}
    </div>
  );
};

