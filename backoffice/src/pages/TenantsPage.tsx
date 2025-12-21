import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  TabList,
  Tab,
} from '@fluentui/react-components';
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
import {
  BuildingRegular,
  SearchRegular,
  MoreHorizontalRegular,
  EditRegular,
  DeleteRegular,
  PauseRegular,
  PlayRegular,
  EyeRegular,
  PeopleRegular,
  AddRegular,
  TableRegular,
  FlowchartRegular,
  DismissRegular,
  ArrowSwapRegular,
  BriefcaseRegular,
  ArrowClockwiseRegular,
  LinkRegular,
} from '@fluentui/react-icons';
import {
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverBody,
} from '@fluentui/react-teaching-popover';
import { tenantService, TenantDto, UpdateTenantRequest, CreateTenantRequest } from '../services/tenantService';
import { UserDto } from '../services/authService';
import { customerService, CustomerDto } from '../services/customerService';
import { officeService, OfficeDto } from '../services/officeService';
import { notificationService } from '../services/notificationService';
import { userService } from '../services/userService';
import { TableSkeleton } from '../components/TableSkeleton';
import { DetailsSkeleton } from '../components/DetailsSkeleton';
import { FlowSkeleton } from '../components/FlowSkeleton';
import { useRibbonMenu } from '../contexts/RibbonMenuContext';
import { RibbonMenu } from '../components/RibbonMenu';

// Helper para convertir rol a texto en español
function getRoleLabel(role: 'Admin' | 'User'): string {
  return role === 'Admin' ? 'Administrador' : 'Usuario';
}

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
  flowNodeTenant: {
    backgroundColor: tokens.colorPaletteBlueBackground2,
    borderTop: `2px solid ${tokens.colorPaletteBlueForeground1}`,
    borderRight: `2px solid ${tokens.colorPaletteBlueForeground1}`,
    borderBottom: `2px solid ${tokens.colorPaletteBlueForeground1}`,
    borderLeft: `2px solid ${tokens.colorPaletteBlueForeground1}`,
  },
  flowNodeUser: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    borderTop: `2px solid ${tokens.colorPaletteGreenForeground1}`,
    borderRight: `2px solid ${tokens.colorPaletteGreenForeground1}`,
    borderBottom: `2px solid ${tokens.colorPaletteGreenForeground1}`,
    borderLeft: `2px solid ${tokens.colorPaletteGreenForeground1}`,
  },
  usersList: {
    maxHeight: '300px',
    overflowY: 'auto',
    ...shorthands.padding(tokens.spacingVerticalM),
  },
});

export const TenantsPage = () => {
  const styles = useStyles();
  const { addGroup, removeGroup } = useRibbonMenu();
  
  // Hooks para restauración de foco en el Drawer
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  const [tenants, setTenants] = useState<TenantDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<TenantDto | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isNotifyUsersDialogOpen, setIsNotifyUsersDialogOpen] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isCreateDrawerLoading, setIsCreateDrawerLoading] = useState(false);
  const [isEditDrawerLoading, setIsEditDrawerLoading] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  const [tenantUsers, setTenantUsers] = useState<UserDto[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [tenantOffices, setTenantOffices] = useState<OfficeDto[]>([]);
  const [isLoadingOffices, setIsLoadingOffices] = useState(false);
  const [isOfficesDialogOpen, setIsOfficesDialogOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<OfficeDto | null>(null);
  const [isOfficeDetailsDialogOpen, setIsOfficeDetailsDialogOpen] = useState(false);
  const [isCustomerDetailsDialogOpen, setIsCustomerDetailsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null);
  const [isChangeCustomerDialogOpen, setIsChangeCustomerDialogOpen] = useState(false);
  const [selectedNewCustomerId, setSelectedNewCustomerId] = useState<string>('');
  const [isChangingCustomer, setIsChangingCustomer] = useState(false);
  const [tenantUsersMap, setTenantUsersMap] = useState<Record<string, UserDto[]>>({});
  const [customerUsersForPopover, setCustomerUsersForPopover] = useState<UserDto[]>([]);
  const [isLoadingCustomerUsers, setIsLoadingCustomerUsers] = useState(false);
  const [popoverOpenForTenant, setPopoverOpenForTenant] = useState<string | null>(null);
  const [isAssigningUser, setIsAssigningUser] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<CreateTenantRequest>({
    name: '',
    customerId: '',
  });
  const [editFormData, setEditFormData] = useState<UpdateTenantRequest>({ name: '', customerId: '' });

  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);
  
  // Estado para la vista de React Flow
  const [selectedView, setSelectedView] = useState<'table' | 'flow'>('table');
  const [selectedTabValue, setSelectedTabValue] = useState<'table' | 'flow'>('table');
  const [flowNodes, setFlowNodes] = useState<Node[]>([]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const [flowLoading, setFlowLoading] = useState(false);
  const flowLoadingRef = useRef(false);
  const [flowTenantUsersMap, setFlowTenantUsersMap] = useState<Map<string, UserDto[]>>(new Map());
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  
  // Detectar cambios en el tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadTenants = useCallback(async () => {
    if (isLoadingRef.current) {
      console.log('[TenantsPage] loadTenants ya está en ejecución, ignorando llamada duplicada');
      return;
    }
    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);
      console.log('[TenantsPage] Cargando tenants...');
      const data = await tenantService.getAllTenants();
      setTenants(data);
      console.log('[TenantsPage] Tenants cargados:', data.length);
    } catch (err: any) {
      console.error('[TenantsPage] Error cargando tenants:', err);
      setError(err.message || 'Error al cargar tenants');
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
      console.error('[TenantsPage] Error cargando customers:', err);
    }
  }, []);

  const loadTenantUsers = useCallback(async (tenantId: string) => {
    try {
      const users = await tenantService.getTenantUsers(tenantId);
      setTenantUsersMap((prev) => ({ ...prev, [tenantId]: users }));
    } catch (err: any) {
      console.error('[TenantsPage] Error cargando usuarios del tenant:', err);
      setTenantUsersMap((prev) => ({ ...prev, [tenantId]: [] }));
    }
  }, []);

  useEffect(() => {
    if (!isLoadingRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadTenants();
      loadCustomers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cargar usuarios de cada tenant cuando se cargan los tenants
  useEffect(() => {
    if (tenants.length > 0) {
      tenants.forEach((tenant) => {
        loadTenantUsers(tenant.id);
      });
    }
  }, [tenants, loadTenantUsers]);

  // Registrar acciones en el RibbonMenu
  useEffect(() => {
    addGroup({
      id: 'tenants',
      label: 'Tenants',
      icon: <BriefcaseRegular />,
      items: [
        {
          id: 'create',
          label: 'Nuevo',
          icon: <AddRegular />,
          action: () => {
            setFormData({
              name: '',
              customerId: '',
            });
            setIsCreateDialogOpen(true);
          },
        },
      ],
    });

    return () => {
      removeGroup('tenants');
    };
  }, [addGroup, removeGroup]);

  const handleDelete = (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTenant) return;

    try {
      await tenantService.deleteTenant(selectedTenant.id);
      setIsDeleteDialogOpen(false);
      setSelectedTenant(null);
      await loadTenants();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setError(err.message || 'Error al eliminar tenant');
    }
  };

  const handleSuspend = async (tenant: TenantDto) => {
    try {
      await tenantService.suspendTenant(tenant.id);
      await loadTenants();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setError(err.message || 'Error al suspender tenant');
    }
  };

  const handleActivate = async (tenant: TenantDto) => {
    try {
      await tenantService.activateTenant(tenant.id);
      await loadTenants();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setError(err.message || 'Error al activar tenant');
    }
  };

  const filteredTenants = useMemo(() => 
    tenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
    ), [tenants, searchTerm]
  );

  const handleCreate = async () => {
    if (!formData.name.trim() || !formData.customerId) {
      setError('Nombre y cliente son requeridos');
      return;
    }

    try {
      setError(null);
      setIsCreating(true);
      await tenantService.createTenant(formData);
      setIsCreateDialogOpen(false);
      setIsCreating(false);
      setFormData({
        name: '',
        customerId: '',
      });
      await loadTenants();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setError(err.message || 'Error al crear tenant');
      setIsCreating(false);
    }
  };

  const handleEdit = async (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setEditFormData({ name: tenant.name, customerId: tenant.customerId });
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedTenant || !editFormData.name.trim() || !editFormData.customerId) {
      setError('El nombre y el cliente son requeridos');
      return;
    }

    try {
      setError(null);
      setIsSaving(true);
      await tenantService.updateTenant(selectedTenant.id, editFormData);
      setIsEditDialogOpen(false);
      setSelectedTenant(null);
      setEditFormData({ name: '', customerId: '' });
      await loadTenants();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
      setIsSaving(false);
    } catch (err: any) {
      setError(err.message || 'Error al guardar tenant');
      setIsSaving(false);
    }
  };

  const handleViewDetails = async (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setIsDetailsDialogOpen(true);
  };

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

  const handleViewCustomerDetails = async (customerId: string) => {
    try {
      const customer = await customerService.getCustomerById(customerId);
      setSelectedCustomer(customer);
      setIsCustomerDetailsDialogOpen(true);
    } catch (err: any) {
      setError(err.message || 'Error al cargar detalles del cliente');
    }
  };

  const handleChangeCustomer = (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setSelectedNewCustomerId(tenant.customerId || '');
    setIsChangeCustomerDialogOpen(true);
  };

  const handleConfirmChangeCustomer = async () => {
    if (!selectedTenant || !selectedNewCustomerId) {
      setError('Debe seleccionar un cliente');
      return;
    }

    if (selectedNewCustomerId === selectedTenant.customerId) {
      setError('El cliente seleccionado es el mismo que el actual');
      return;
    }

    try {
      setError(null);
      setIsChangingCustomer(true);
      await tenantService.updateTenant(selectedTenant.id, {
        name: selectedTenant.name,
        customerId: selectedNewCustomerId,
      });
      setIsChangeCustomerDialogOpen(false);
      setSelectedTenant(null);
      setSelectedNewCustomerId('');
      await loadTenants();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
      setIsChangingCustomer(false);
    } catch (err: any) {
      setError(err.message || 'Error al cambiar cliente del tenant');
      setIsChangingCustomer(false);
    }
  };

  const handleViewUsers = async (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setIsLoadingUsers(true);
    setIsUsersDialogOpen(true);
    
    try {
      setError(null);
      const users = await tenantService.getTenantUsers(tenant.id);
      setTenantUsers(users);
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios del tenant');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Cargar usuarios del cliente para el popover
  const handleLoadCustomerUsers = async (tenant: TenantDto) => {
    if (!tenant.customerId) {
      setError('El tenant no tiene un cliente asociado');
      return;
    }

    try {
      setIsLoadingCustomerUsers(true);
      setError(null);
      const users = await customerService.getCustomerUsers(tenant.customerId);
      setCustomerUsersForPopover(users);
      setPopoverOpenForTenant(tenant.id);
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios del cliente');
      setPopoverOpenForTenant(null);
    } finally {
      setIsLoadingCustomerUsers(false);
    }
  };

  // Asignar usuario al tenant
  const handleAssignUserToTenant = async (user: UserDto, tenant: TenantDto) => {
    try {
      setIsAssigningUser(user.id);
      setError(null);
      
      await userService.updateUser(user.id, {
        email: user.email,
        name: user.name || '',
        role: user.role,
        tenantId: tenant.id,
        customerId: tenant.customerId || user.customerId || '',
        contactEmail: user.contactEmail || '',
        phone: user.phone || '',
      });

      // Recargar usuarios del tenant
      await loadTenantUsers(tenant.id);
      
      // Actualizar la lista de usuarios del cliente en el popover
      if (tenant.customerId) {
        const updatedUsers = await customerService.getCustomerUsers(tenant.customerId);
        setCustomerUsersForPopover(updatedUsers);
      }
    } catch (err: any) {
      setError(err.message || 'Error al asignar usuario al tenant');
    } finally {
      setIsAssigningUser(null);
    }
  };

  const handleViewOffices = async (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setIsLoadingOffices(true);
    setIsOfficesDialogOpen(true);
    
    try {
      setError(null);
      const offices = await officeService.getOfficesByTenant(tenant.id);
      setTenantOffices(offices);
    } catch (err: any) {
      setError(err.message || 'Error al cargar sedes del tenant');
    } finally {
      setIsLoadingOffices(false);
    }
  };

  const handleNotifyUsers = (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setNotificationTitle('');
    setNotificationMessage('');
    setIsNotifyUsersDialogOpen(true);
  };

  const handleSendNotification = async () => {
    if (!selectedTenant || !notificationTitle.trim() || !notificationMessage.trim()) {
      setError('El título y el mensaje son requeridos');
      return;
    }

    try {
      setError(null);
      setIsSendingNotification(true);
      const response = await notificationService.notifyTenantUsers(selectedTenant.id, {
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

  // Función para aplicar layout automático con Dagre (responsive)
  const getLayoutedElements = useCallback((nodes: Node[], edges: Edge[], direction: 'TB' | 'LR' = 'TB') => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const nodesep = isMobile ? 50 : isTablet ? 75 : 100;
    const ranksep = isMobile ? 100 : isTablet ? 120 : 150;
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
    if (filteredTenants.length === 0) {
      setFlowNodes([]);
      setFlowEdges([]);
      return;
    }

    if (flowLoadingRef.current) {
      console.log('[TenantsPage] loadFlowData ya está en ejecución, ignorando llamada duplicada');
      return;
    }

    flowLoadingRef.current = true;
    setFlowLoading(true);
    try {
      const newTenantUsersMap = new Map<string, UserDto[]>();
      
      // Cargar usuarios para cada tenant
      for (const tenant of filteredTenants) {
        try {
          const users = await tenantService.getTenantUsers(tenant.id);
          newTenantUsersMap.set(tenant.id, users);
        } catch (err) {
          console.error(`Error cargando usuarios del tenant ${tenant.id}:`, err);
          newTenantUsersMap.set(tenant.id, []);
        }
      }

      setFlowTenantUsersMap(newTenantUsersMap);

      // Crear nodos y edges
      const nodes: Node[] = [];
      const edges: Edge[] = [];
      
      // Crear nodos de tenants
      filteredTenants.forEach((tenant) => {
        const tenantNodeId = `tenant-${tenant.id}`;
        
        nodes.push({
          id: tenantNodeId,
          type: 'default',
          position: { x: 0, y: 0 },
          data: {
            label: (
              <div className={`${styles.flowNode} ${styles.flowNodeTenant}`}>
                <div className={styles.flowNodeHeader}>{tenant.name}</div>
                <div className={styles.flowNodeContent}>Cliente: {tenant.customerName || 'N/A'}</div>
                <div className={styles.flowNodeContent}>
                  {tenant.isSuspended ? 'Suspendido' : tenant.isActive ? 'Activo' : 'Inactivo'}
                </div>
              </div>
            ),
          },
        });

        // Crear nodos de usuarios para este tenant
        const users = newTenantUsersMap.get(tenant.id) || [];
        users.forEach((user) => {
          const userNodeId = `user-${user.id}`;
          
          nodes.push({
            id: userNodeId,
            type: 'default',
            position: { x: 0, y: 0 },
            data: {
              label: (
                <div className={`${styles.flowNode} ${styles.flowNodeUser}`}>
                  <div className={styles.flowNodeHeader}>{user.name || user.email}</div>
                  <div className={styles.flowNodeContent}>{user.email}</div>
                  <div className={styles.flowNodeContent}>Rol: {getRoleLabel(user.role)}</div>
                </div>
              ),
            },
          });

          // Edge de tenant a usuario
          edges.push({
            id: `edge-${tenantNodeId}-${userNodeId}`,
            source: tenantNodeId,
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
  }, [filteredTenants, getLayoutedElements]);

  // Cargar datos del flow cuando cambia la vista o los tenants
  useEffect(() => {
    if (selectedView === 'flow' && filteredTenants.length > 0 && !flowLoadingRef.current) {
      loadFlowData().catch((err) => {
        console.error('[TenantsPage] Error en loadFlowData:', err);
      });
    } else if (selectedView === 'flow' && filteredTenants.length === 0) {
      // Limpiar el flow si no hay tenants
      setFlowNodes([]);
      setFlowEdges([]);
    }
  }, [selectedView, filteredTenants.length, loadFlowData]);

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

  if (isLoading && tenants.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <BriefcaseRegular fontSize={32} />
          <h1 className={styles.title}>Tenants</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
          <div style={{ flex: 1 }}>
            <SearchBox
              placeholder="Buscar por nombre o cliente..."
              disabled
              size="large"
              style={{ width: '100%' }}
            />
          </div>
          <TabList selectedValue="table" disabled>
            <Tab value="table" icon={<TableRegular />}>
              Vista de Tabla
            </Tab>
            <Tab value="flow" icon={<FlowchartRegular />}>
              Vista Interactiva
            </Tab>
          </TabList>
        </div>
        <Card>
          <TableSkeleton rows={8} columns={6} />
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
        <BriefcaseRegular fontSize={32} />
        <h1 className={styles.title}>Tenants</h1>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
        <div style={{ flex: 1 }}>
          <SearchBox
            placeholder="Buscar por nombre o cliente..."
            value={searchTerm}
            onChange={(e, data) => setSearchTerm(data.value)}
            size="large"
            style={{ width: '100%' }}
          />
        </div>
        <Button
          appearance="default"
          icon={<ArrowClockwiseRegular />}
          onClick={async () => {
            await loadTenants();
            if (selectedView === 'flow') {
              await loadFlowData();
            }
          }}
          disabled={isLoading || flowLoading}
          title="Actualizar lista de tenants"
        >
          Actualizar
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
            Vista de Tabla
          </Tab>
          <Tab value="flow" icon={<FlowchartRegular />}>
            Vista Interactiva
          </Tab>
        </TabList>
      </div>

      <Card>
        <CardPreview>
          <div style={{ padding: tokens.spacingVerticalXL }}>
            {error && (
              <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{error}</MessageBarBody>
              </MessageBar>
            )}

            {selectedView === 'table' && (
              <>

                {(isLoading) && (
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
                    <Spinner size="large" label="Cargando tenants..." />
                  </div>
                )}
                {filteredTenants.length === 0 ? (
                  <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                    <Text>No se encontraron tenants</Text>
                  </div>
                ) : (
                  <Table style={{ tableLayout: 'auto', width: '100%' }}>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderCell style={{ width: 'auto', minWidth: '200px' }}>Nombre</TableHeaderCell>
                        <TableHeaderCell style={{ width: 'auto', minWidth: '180px' }}>Cliente</TableHeaderCell>
                        <TableHeaderCell style={{ width: 'auto', minWidth: '110px' }}>Estado</TableHeaderCell>
                        <TableHeaderCell style={{ width: 'auto', minWidth: '80px' }}>Usuarios</TableHeaderCell>
                        <TableHeaderCell style={{ width: 'auto', minWidth: '80px' }}>Sedes</TableHeaderCell>
                        <TableHeaderCell style={{ width: 'auto', minWidth: '150px' }}>Fecha de Creación</TableHeaderCell>
                        <TableHeaderCell style={{ width: 'auto', minWidth: '150px' }}>Última Actualización</TableHeaderCell>
                        <TableHeaderCell style={{ width: '120px', minWidth: '120px' }}>Acciones</TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                          <TableCell>
                            <Text weight="semibold">{tenant.name}</Text>
                          </TableCell>
                          <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
                              {tenant.customerId && tenant.customerName ? (
                                <>
                                  <Button
                                    appearance="subtle"
                                    onClick={() => handleViewCustomerDetails(tenant.customerId)}
                                    style={{ 
                                      color: tokens.colorBrandForegroundLink, 
                                      textDecoration: 'none',
                                      fontWeight: tokens.fontWeightSemibold,
                                      padding: 0,
                                      minWidth: 'auto',
                                      height: 'auto'
                                    }}
                                  >
                                    {tenant.customerName}
                                  </Button>
                                  <Button
                                    appearance="subtle"
                                    icon={<ArrowSwapRegular />}
                                    onClick={() => handleChangeCustomer(tenant)}
                                    aria-label="Cambiar cliente"
                                    title="Cambiar cliente"
                                    size="small"
                                    style={{
                                      minWidth: 'auto',
                                      padding: tokens.spacingVerticalXS,
                                    }}
                                  />
                                </>
                              ) : (
                                <>
                                  <Text>N/A</Text>
                                  <Button
                                    appearance="subtle"
                                    icon={<ArrowSwapRegular />}
                                    onClick={() => handleChangeCustomer(tenant)}
                                    aria-label="Asignar cliente"
                                    title="Asignar cliente"
                                    size="small"
                                    style={{
                                      minWidth: 'auto',
                                      padding: tokens.spacingVerticalXS,
                                    }}
                                  />
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {tenant.isSuspended ? (
                              <Badge appearance="filled" color="danger">Suspendido</Badge>
                            ) : tenant.isActive ? (
                              <Badge appearance="filled" color="success">Activo</Badge>
                            ) : (
                              <Badge appearance="outline">Inactivo</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {(() => {
                              const users = tenantUsersMap[tenant.id] || [];
                              return users.length > 0 ? (
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
                                        {users.map((user: UserDto) => (
                                          <Persona
                                            key={user.id}
                                            name={user.name || user.email}
                                            secondaryText={user.email}
                                            presence={{ status: user.isActive && !user.isSuspended ? 'available' : 'offline' }}
                                          />
                                        ))}
                                      </div>
                                    </TeachingPopoverBody>
                                  </TeachingPopoverSurface>
                                </TeachingPopover>
                              ) : tenant.customerId ? (
                                <TeachingPopover
                                  open={popoverOpenForTenant === tenant.id}
                                  onOpenChange={(_, data) => {
                                    setPopoverOpenForTenant(data.open ? tenant.id : null);
                                    if (!data.open) {
                                      setCustomerUsersForPopover([]);
                                    }
                                  }}
                                >
                                  <TeachingPopoverTrigger disableButtonEnhancement>
                                    <Button
                                      appearance="subtle"
                                      icon={<LinkRegular />}
                                      onClick={() => handleLoadCustomerUsers(tenant)}
                                      title="Asignar usuarios del cliente"
                                      style={{
                                        padding: 0,
                                        minWidth: 'auto',
                                        height: 'auto'
                                      }}
                                    />
                                  </TeachingPopoverTrigger>
                                  <TeachingPopoverSurface>
                                    <TeachingPopoverHeader>
                                      Usuarios del Cliente: {tenant.customerName || 'N/A'}
                                    </TeachingPopoverHeader>
                                    <TeachingPopoverBody>
                                      {isLoadingCustomerUsers ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', padding: tokens.spacingVerticalL }}>
                                          <Spinner size="small" label="Cargando usuarios..." />
                                        </div>
                                      ) : customerUsersForPopover.length === 0 ? (
                                        <Text>No hay usuarios disponibles en el cliente</Text>
                                      ) : (
                                        <div style={{ maxWidth: '600px', maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
                                          {customerUsersForPopover.map((user: UserDto) => {
                                            const tenantUsers = tenantUsersMap[tenant.id] || [];
                                            const isAssigned = tenantUsers.some((u: UserDto) => u.id === user.id);
                                            const isAssigning = isAssigningUser === user.id;
                                            
                                            return (
                                              <div
                                                key={user.id}
                                                style={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'space-between',
                                                  padding: tokens.spacingVerticalS,
                                                  ...shorthands.borderRadius(tokens.borderRadiusSmall),
                                                  backgroundColor: isAssigned ? tokens.colorNeutralBackground2 : 'transparent',
                                                  cursor: isAssigned ? 'default' : 'pointer',
                                                }}
                                                onMouseEnter={(e) => {
                                                  if (!isAssigned) {
                                                    e.currentTarget.style.backgroundColor = tokens.colorNeutralBackground2;
                                                  }
                                                }}
                                                onMouseLeave={(e) => {
                                                  if (!isAssigned) {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                  }
                                                }}
                                              >
                                                <Persona
                                                  name={user.name || user.email}
                                                  secondaryText={user.email}
                                                  presence={{ status: user.isActive && !user.isSuspended ? 'available' : 'offline' }}
                                                />
                                                {isAssigned ? (
                                                  <Badge appearance="filled" color="success" size="small">
                                                    Asignado
                                                  </Badge>
                                                ) : (
                                                  <Button
                                                    appearance="primary"
                                                    size="small"
                                                    onClick={() => handleAssignUserToTenant(user, tenant)}
                                                    disabled={isAssigning}
                                                  >
                                                    {isAssigning ? 'Asignando...' : 'Asignar'}
                                                  </Button>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}
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
                              );
                            })()}
                          </TableCell>
                          <TableCell>
                            <Button
                              appearance="subtle"
                              onClick={() => handleViewOffices(tenant)}
                              style={{ 
                                color: tokens.colorBrandForegroundLink, 
                                textDecoration: 'none',
                                fontWeight: tokens.fontWeightSemibold,
                                padding: 0,
                                minWidth: 'auto',
                                height: 'auto'
                              }}
                            >
                              Ver sedes
                            </Button>
                          </TableCell>
                          <TableCell>
                            {new Date(tenant.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </TableCell>
                          <TableCell>
                            {new Date(tenant.updatedAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
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
                                  <MenuItem icon={<EyeRegular />} onClick={() => handleViewDetails(tenant)}>
                                    Ver detalles
                                  </MenuItem>
                                  <MenuItem icon={<EditRegular />} onClick={() => handleEdit(tenant)}>
                                    Editar
                                  </MenuItem>
                                  <MenuItem icon={<PeopleRegular />} onClick={() => handleViewUsers(tenant)}>
                                    Ver usuarios
                                  </MenuItem>
                                  <MenuItem icon={<BuildingRegular />} onClick={() => handleViewOffices(tenant)}>
                                    Ver sedes
                                  </MenuItem>
                                  <MenuItem icon={<PeopleRegular />} onClick={() => handleNotifyUsers(tenant)}>
                                    Enviar notificación
                                  </MenuItem>
                                  {tenant.isSuspended ? (
                                    <MenuItem icon={<PlayRegular />} onClick={() => handleActivate(tenant)}>
                                      Activar
                                    </MenuItem>
                                  ) : (
                                    <MenuItem icon={<PauseRegular />} onClick={() => handleSuspend(tenant)}>
                                      Suspender
                                    </MenuItem>
                                  )}
                                  <MenuItem icon={<DeleteRegular />} onClick={() => handleDelete(tenant)}>
                                    Eliminar
                                  </MenuItem>
                                </MenuList>
                              </MenuPopover>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </>
            )}

            {selectedView === 'flow' && (
              <div className={styles.flowContainer} style={{ position: 'relative' }}>
                {isLoading && (
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
                    <Spinner size="large" label="Cargando tenants..." />
                  </div>
                )}
                {flowLoading ? (
                  <FlowSkeleton />
                ) : (
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
                          <Text weight="semibold">Vista Interactiva: Tenants → Usuarios</Text>
                          <div style={{ marginTop: tokens.spacingVerticalXS }}>
                            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                              Nivel: Tenants (1) → Usuarios (2)
                            </Text>
                          </div>
                        </div>
                      </Panel>
                    </ReactFlow>
                  </ReactFlowProvider>
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
        onOpenChange={(event, data) => {
          if (data.open === false && !isCreating) {
            const hasData = formData.name.trim() || formData.customerId;
            if (hasData) {
              if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
                setIsCreateDialogOpen(false);
                setFormData({ name: '', customerId: '' });
                setError(null);
              }
            } else {
              setIsCreateDialogOpen(false);
            }
          } else if (data.open === true) {
            setIsCreateDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label="Cerrar"
                icon={<DismissRegular />}
                onClick={() => {
                  const hasData = formData.name.trim() || formData.customerId;
                  if (hasData) {
                    if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
                      setIsCreateDialogOpen(false);
                      setFormData({ name: '', customerId: '' });
                      setError(null);
                    }
                  } else {
                    setIsCreateDialogOpen(false);
                  }
                }}
              />
            }
          >
            Nuevo Tenant
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isCreateDrawerLoading || isCreating ? (
              <DetailsSkeleton rows={3} />
            ) : (
              <>
                <Field label="Nombre" required className={styles.formField}>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Field>
                <Field label="Cliente" required className={styles.formField}>
                  <Combobox
                    value={customers.find((c) => c.id === formData.customerId)?.name || ''}
                    onOptionSelect={(_, data) => {
                      const customer = customers.find((c) => c.name === data.optionValue);
                      if (customer) {
                        setFormData({ ...formData, customerId: customer.id });
                      }
                    }}
                  >
                    {customers.map((customer) => (
                      <Option key={customer.id} value={customer.name}>
                        {customer.name} ({customer.identification})
                      </Option>
                    ))}
                  </Combobox>
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => {
                      const hasData = formData.name.trim() || formData.customerId;
                      if (hasData) {
                        if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los datos no guardados.')) {
                          setIsCreateDialogOpen(false);
                          setFormData({ name: '', customerId: '' });
                          setError(null);
                        }
                      } else {
                        setIsCreateDialogOpen(false);
                      }
                    }}
                    disabled={isCreating}
                  >
                    Cancelar
                  </Button>
                  <Button appearance="primary" onClick={handleCreate} disabled={isCreating}>
                    {isCreating ? 'Creando...' : 'Crear'}
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
        onOpenChange={(event, data) => {
          if (data.open === false && !isSaving) {
            if (!selectedTenant) {
              setIsEditDialogOpen(false);
              setSelectedTenant(null);
              setEditFormData({ name: '' });
              return;
            }

            const hasChanges = editFormData.name !== selectedTenant.name || 
                                editFormData.customerId !== selectedTenant.customerId;
            
            if (hasChanges) {
              if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los cambios no guardados.')) {
                setIsEditDialogOpen(false);
                setSelectedTenant(null);
                setEditFormData({ name: '', customerId: '' });
                setError(null);
              }
            } else {
              setIsEditDialogOpen(false);
              setSelectedTenant(null);
              setEditFormData({ name: '', customerId: '' });
              setError(null);
            }
          } else if (data.open === true) {
            setIsEditDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label="Cerrar"
                icon={<DismissRegular />}
                onClick={() => {
                  if (isSaving) {
                    return;
                  }
                  if (!selectedTenant) {
                    setIsEditDialogOpen(false);
                    setSelectedTenant(null);
                    setEditFormData({ name: '', customerId: '' });
                    return;
                  }

                  const hasChanges = editFormData.name !== selectedTenant.name || 
                                    editFormData.customerId !== selectedTenant.customerId;
                  
                  if (hasChanges) {
                    if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los cambios no guardados.')) {
                      setIsEditDialogOpen(false);
                      setSelectedTenant(null);
                      setEditFormData({ name: '', customerId: '' });
                      setError(null);
                    }
                  } else {
                    setIsEditDialogOpen(false);
                    setSelectedTenant(null);
                    setEditFormData({ name: '', customerId: '' });
                    setError(null);
                  }
                }}
              />
            }
          >
            Editar Tenant
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isEditDrawerLoading || isSaving ? (
              <DetailsSkeleton rows={2} />
            ) : (
              <>
                <Field label="Nombre" required className={styles.formField}>
                  <Input
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  />
                </Field>
                <Field label="Cliente" required className={styles.formField}>
                  <Combobox
                    value={customers.find((c) => c.id === editFormData.customerId)?.name || ''}
                    onOptionSelect={(_, data) => {
                      const customer = customers.find((c) => c.name === data.optionValue);
                      if (customer) {
                        setEditFormData({ ...editFormData, customerId: customer.id });
                      }
                    }}
                  >
                    {customers.map((customer) => (
                      <Option key={customer.id} value={customer.name}>
                        {customer.name} ({customer.identification})
                      </Option>
                    ))}
                  </Combobox>
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => {
                      if (!selectedTenant) {
                        setIsEditDialogOpen(false);
                        setSelectedTenant(null);
                        setEditFormData({ name: '', customerId: '' });
                        return;
                      }

                      const hasChanges = editFormData.name !== selectedTenant.name || 
                                        editFormData.customerId !== selectedTenant.customerId;
                      
                      if (hasChanges) {
                        if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los cambios no guardados.')) {
                          setIsEditDialogOpen(false);
                          setSelectedTenant(null);
                          setEditFormData({ name: '', customerId: '' });
                          setError(null);
                        }
                      } else {
                        setIsEditDialogOpen(false);
                        setSelectedTenant(null);
                        setEditFormData({ name: '', customerId: '' });
                        setError(null);
                      }
                    }}
                    disabled={isSaving}
                  >
                    Cancelar
                  </Button>
                  <Button appearance="primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Guardando...' : 'Guardar'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Dialog de eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(_, data) => setIsDeleteDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                ¿Está seguro de que desea eliminar el tenant "{selectedTenant?.name}"? Esta acción no se puede deshacer.
              </Text>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button appearance="primary" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Drawer de detalles */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isDetailsDialogOpen}
        modalType="alert"
        onOpenChange={(event, data) => {
          if (data.open === false) {
            setIsDetailsDialogOpen(false);
            setSelectedTenant(null);
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
                aria-label="Cerrar"
                icon={<DismissRegular />}
                onClick={() => {
                  setIsDetailsDialogOpen(false);
                  setSelectedTenant(null);
                }}
              />
            }
          >
            Detalles del Tenant
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isDetailsLoading ? (
              <DetailsSkeleton rows={10} />
            ) : selectedTenant ? (
              <>
                <Field label="Nombre" className={styles.formField}>
                  <Input value={selectedTenant.name} readOnly />
                </Field>
                <Field label="Cliente" className={styles.formField}>
                  <Input value={selectedTenant.customerName || 'N/A'} readOnly />
                </Field>
                <Field label="Estado" className={styles.formField}>
                  <div>
                    {selectedTenant.isSuspended ? (
                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                    ) : selectedTenant.isActive ? (
                      <Badge appearance="filled" color="success">Activo</Badge>
                    ) : (
                      <Badge appearance="outline">Inactivo</Badge>
                    )}
                  </div>
                </Field>
                <Field label="Usuarios" className={styles.formField}>
                  <Input value={String(selectedTenant.userCount || 0)} readOnly />
                </Field>
                <Field label="Creado" className={styles.formField}>
                  <Input value={new Date(selectedTenant.createdAt).toLocaleString()} readOnly />
                </Field>
                <Field label="Actualizado" className={styles.formField}>
                  <Input value={new Date(selectedTenant.updatedAt).toLocaleString()} readOnly />
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button appearance="primary" onClick={() => setIsDetailsDialogOpen(false)}>
                    Cerrar
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Dialog para ver usuarios */}
      <Dialog open={isUsersDialogOpen} onOpenChange={(_, data) => setIsUsersDialogOpen(data.open)}>
        <DialogSurface style={{ maxWidth: '700px' }}>
          <DialogTitle>Usuarios del Tenant: {selectedTenant?.name}</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingUsers ? (
                <TableSkeleton rows={5} columns={3} />
              ) : tenantUsers.length === 0 ? (
                <Text>No hay usuarios asociados a este tenant</Text>
              ) : (
                <div className={styles.usersList}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderCell>Nombre</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>Rol</TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tenantUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.name || 'Sin nombre'}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge
                              appearance={user.role === 'Admin' ? 'filled' : 'outline'}
                              color={user.role === 'Admin' ? 'brand' : undefined}
                            >
                              {getRoleLabel(user.role)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button appearance="primary" onClick={() => setIsUsersDialogOpen(false)}>
                Cerrar
              </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>

      {/* Dialog para ver sedes */}
      <Dialog open={isOfficesDialogOpen} onOpenChange={(_, data) => setIsOfficesDialogOpen(data.open)}>
        <DialogSurface style={{ maxWidth: '700px' }}>
          <DialogTitle>Sedes del Tenant: {selectedTenant?.name}</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingOffices ? (
                <TableSkeleton rows={5} columns={4} />
              ) : tenantOffices.length === 0 ? (
                <Text>No hay sedes asociadas a este tenant</Text>
              ) : (
                <div className={styles.usersList}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderCell>Nombre</TableHeaderCell>
                        <TableHeaderCell>Dirección</TableHeaderCell>
                        <TableHeaderCell>Ciudad</TableHeaderCell>
                        <TableHeaderCell>Estado</TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tenantOffices.map((office) => (
                        <TableRow key={office.id}>
                          <TableCell>
                            <Button
                              appearance="subtle"
                              onClick={() => {
                                setSelectedOffice(office);
                                setIsOfficeDetailsDialogOpen(true);
                              }}
                              style={{ 
                                color: tokens.colorBrandForegroundLink, 
                                textDecoration: 'none',
                                fontWeight: tokens.fontWeightSemibold,
                                padding: 0,
                                minWidth: 'auto',
                                height: 'auto'
                              }}
                            >
                              {office.name}
                            </Button>
                          </TableCell>
                          <TableCell>{office.address || 'N/A'}</TableCell>
                          <TableCell>{office.city || 'N/A'}</TableCell>
                          <TableCell>
                            {office.isSuspended ? (
                              <Badge appearance="filled" color="danger">Suspendido</Badge>
                            ) : office.isActive ? (
                              <Badge appearance="filled" color="success">Activo</Badge>
                            ) : (
                              <Badge appearance="outline">Inactivo</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button appearance="primary" onClick={() => setIsOfficesDialogOpen(false)}>
                Cerrar
              </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>

      {/* Drawer de detalles de la sede */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isOfficeDetailsDialogOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            setIsOfficeDetailsDialogOpen(false);
            setSelectedOffice(null);
          } else {
            setIsOfficeDetailsDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label="Cerrar"
                icon={<DismissRegular />}
                onClick={() => {
                  setIsOfficeDetailsDialogOpen(false);
                  setSelectedOffice(null);
                }}
              />
            }
          >
            Detalles de la Sede
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {selectedOffice && (
              <>
                <Field label="Nombre" className={styles.formField}>
                  <Input value={selectedOffice.name} readOnly />
                </Field>
                <Field label="Dirección" className={styles.formField}>
                  <Input value={selectedOffice.address || 'N/A'} readOnly />
                </Field>
                <Field label="Ciudad" className={styles.formField}>
                  <Input value={selectedOffice.city || 'N/A'} readOnly />
                </Field>
                <Field label="Estado/Provincia" className={styles.formField}>
                  <Input value={selectedOffice.stateProvince || 'N/A'} readOnly />
                </Field>
                <Field label="Código Postal" className={styles.formField}>
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
                <Field label="Tenant" className={styles.formField}>
                  <Input value={selectedOffice.tenantName || 'N/A'} readOnly />
                </Field>
                <Field label="Cliente" className={styles.formField}>
                  <Input value={selectedOffice.customerName || 'N/A'} readOnly />
                </Field>
                <Field label="Creado" className={styles.formField}>
                  <Input value={new Date(selectedOffice.createdAt).toLocaleString()} readOnly />
                </Field>
                <Field label="Actualizado" className={styles.formField}>
                  <Input value={new Date(selectedOffice.updatedAt).toLocaleString()} readOnly />
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button appearance="primary" onClick={() => setIsOfficeDetailsDialogOpen(false)}>
                    Cerrar
                  </Button>
                </div>
              </>
            )}
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
                    Se enviará una notificación por email a todos los usuarios del tenant "{selectedTenant?.name}".
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

      {/* Dialog de cambiar cliente */}
      <Dialog open={isChangeCustomerDialogOpen} onOpenChange={(_, data) => setIsChangeCustomerDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Cambiar Cliente del Tenant</DialogTitle>
          <DialogBody>
            <DialogContent>
              <div className={styles.detailsContent}>
                <MessageBar intent="info">
                  <MessageBarBody>
                    Seleccione un nuevo cliente para el tenant "{selectedTenant?.name}".
                  </MessageBarBody>
                </MessageBar>
                <Field label="Cliente" required className={styles.formField}>
                  <Combobox
                    value={selectedNewCustomerId ? customers.find((c) => c.id === selectedNewCustomerId)?.name || '' : ''}
                    onOptionSelect={(_, data) => {
                      const customer = customers.find((c) => c.name === data.optionValue);
                      if (customer) {
                        setSelectedNewCustomerId(customer.id);
                      } else {
                        setSelectedNewCustomerId('');
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (!target.value) {
                        setSelectedNewCustomerId('');
                      }
                    }}
                  >
                    {customers.map((customer) => (
                      <Option key={customer.id} value={customer.name}>
                        {customer.name} ({customer.identification})
                      </Option>
                    ))}
                  </Combobox>
                </Field>
                {selectedTenant?.customerName && (
                  <MessageBar intent="warning">
                    <MessageBarBody>
                      Cliente actual: {selectedTenant.customerName}
                    </MessageBarBody>
                  </MessageBar>
                )}
              </div>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button 
              appearance="secondary" 
              onClick={() => {
                setIsChangeCustomerDialogOpen(false);
                setSelectedNewCustomerId('');
                setSelectedTenant(null);
              }}
              disabled={isChangingCustomer}
            >
              Cancelar
            </Button>
            <Button 
              appearance="primary" 
              onClick={handleConfirmChangeCustomer}
              disabled={isChangingCustomer || !selectedNewCustomerId}
            >
              {isChangingCustomer ? 'Cambiando...' : 'Cambiar Cliente'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

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
                aria-label="Cerrar"
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
    </div>
  );
};

