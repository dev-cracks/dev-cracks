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
} from '@fluentui/react-icons';
import { tenantService, TenantDto, UpdateTenantRequest, CreateTenantRequest } from '../services/tenantService';
import { UserDto } from '../services/authService';
import { customerService, CustomerDto } from '../services/customerService';
import { notificationService } from '../services/notificationService';
import { TableSkeleton } from '../components/TableSkeleton';
import { DetailsSkeleton } from '../components/DetailsSkeleton';
import { FlowSkeleton } from '../components/FlowSkeleton';
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
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  const [tenantUsers, setTenantUsers] = useState<UserDto[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState<CreateTenantRequest>({
    name: '',
    customerId: '',
  });
  const [editFormData, setEditFormData] = useState<UpdateTenantRequest>({ name: '' });

  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);
  
  // Estado para la vista de React Flow
  const [selectedView, setSelectedView] = useState<'table' | 'flow'>('table');
  const [selectedTabValue, setSelectedTabValue] = useState<'table' | 'flow'>('table');
  const [flowNodes, setFlowNodes] = useState<Node[]>([]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const [flowLoading, setFlowLoading] = useState(false);
  const flowLoadingRef = useRef(false);
  const [tenantUsersMap, setTenantUsersMap] = useState<Map<string, UserDto[]>>(new Map());
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

  useEffect(() => {
    if (!isLoadingRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadTenants();
      loadCustomers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Registrar acciones en el RibbonMenu
  useEffect(() => {
    addGroup({
      id: 'tenants',
      label: 'Tenants',
      icon: <BuildingRegular />,
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
    setEditFormData({ name: tenant.name });
    setIsEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!selectedTenant || !editFormData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    try {
      setError(null);
      setIsSaving(true);
      await tenantService.updateTenant(selectedTenant.id, editFormData);
      setIsEditDialogOpen(false);
      setSelectedTenant(null);
      setEditFormData({ name: '' });
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

      setTenantUsersMap(newTenantUsersMap);

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
                  <div className={styles.flowNodeContent}>Rol: {user.role}</div>
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
          <BuildingRegular fontSize={32} />
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
        <BuildingRegular fontSize={32} />
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
                          <TableCell>{tenant.customerName || 'N/A'}</TableCell>
                          <TableCell>
                            {tenant.isSuspended ? (
                              <Badge appearance="filled" color="danger">Suspendido</Badge>
                            ) : tenant.isActive ? (
                              <Badge appearance="filled" color="success">Activo</Badge>
                            ) : (
                              <Badge appearance="outline">Inactivo</Badge>
                            )}
                          </TableCell>
                          <TableCell>{tenant.userCount || 0}</TableCell>
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
          <DrawerHeaderTitle>Nuevo Tenant</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isCreating ? (
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

            const hasChanges = editFormData.name !== selectedTenant.name;
            
            if (hasChanges) {
              if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los cambios no guardados.')) {
                setIsEditDialogOpen(false);
                setSelectedTenant(null);
                setEditFormData({ name: '' });
                setError(null);
              }
            } else {
              setIsEditDialogOpen(false);
              setSelectedTenant(null);
              setEditFormData({ name: '' });
              setError(null);
            }
          } else if (data.open === true) {
            setIsEditDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Editar Tenant</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isSaving ? (
              <DetailsSkeleton rows={2} />
            ) : (
              <>
                <Field label="Nombre" required className={styles.formField}>
                  <Input
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ name: e.target.value })}
                  />
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => {
                      if (!selectedTenant) {
                        setIsEditDialogOpen(false);
                        setSelectedTenant(null);
                        setEditFormData({ name: '' });
                        return;
                      }

                      const hasChanges = editFormData.name !== selectedTenant.name;
                      
                      if (hasChanges) {
                        if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los cambios no guardados.')) {
                          setIsEditDialogOpen(false);
                          setSelectedTenant(null);
                          setEditFormData({ name: '' });
                          setError(null);
                        }
                      } else {
                        setIsEditDialogOpen(false);
                        setSelectedTenant(null);
                        setEditFormData({ name: '' });
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
          <DrawerHeaderTitle>Detalles del Tenant</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {selectedTenant && (
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
            )}
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
                              {user.role}
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
    </div>
  );
};

