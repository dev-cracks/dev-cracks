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
  LinkRegular,
  ChevronRightRegular,
  ChevronDownRegular,
  ArrowMoveRegular,
  StarRegular,
  HomeRegular,
  TableRegular,
  FlowchartRegular,
} from '@fluentui/react-icons';
import {
  customerService,
  CustomerDto,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CountryDto,
  countryService,
} from '../services/customerService';
import { UserDto } from '../services/authService';
import { tenantService, TenantDto } from '../services/tenantService';
import { officeService, OfficeDto } from '../services/officeService';
import { notificationService } from '../services/notificationService';
import { TableSkeleton } from '../components/TableSkeleton';
import { TreeSkeleton } from '../components/TreeSkeleton';
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
  treeContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  treeRow: {
    display: 'flex',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  treeRowRoot: {
    backgroundColor: tokens.colorPaletteBlueBackground1,
    '&:hover': {
      backgroundColor: tokens.colorPaletteBlueBackground2,
    },
  },
  treeRowLevel1: {
    backgroundColor: tokens.colorPaletteTealBackground1,
    '&:hover': {
      backgroundColor: tokens.colorPaletteTealBackground2,
    },
  },
  treeRowLevel2: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    '&:hover': {
      backgroundColor: tokens.colorPaletteGreenBackground2,
    },
  },
  treeRowLevel3Plus: {
    backgroundColor: tokens.colorPaletteLavenderBackground1,
    '&:hover': {
      backgroundColor: tokens.colorPaletteLavenderBackground2,
    },
  },
  treeRowDragging: {
    opacity: 0.5,
  },
  treeRowDragOver: {
    backgroundColor: tokens.colorBrandBackground2,
    borderTop: `2px solid ${tokens.colorBrandForeground1}`,
  },
  treeIndent: {
    width: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  treeExpandButton: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  treeContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 120px 80px 80px 100px',
    alignItems: 'center',
    flex: 1,
    ...shorthands.gap(tokens.spacingHorizontalM),
    width: '100%',
  },
  treeCell: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${tokens.spacingHorizontalS}`,
  },
  treeHeaderContent: {
    display: 'grid',
    gridTemplateColumns: '32px 60px 180px 160px 120px 120px 130px 180px 110px 70px 70px 80px 100px',
    alignItems: 'center',
    width: '100%',
    ...shorthands.gap(tokens.spacingHorizontalS),
    padding: `${tokens.spacingVerticalS} 0`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontWeight: tokens.fontWeightSemibold,
  },
  treeRowContent: {
    display: 'grid',
    gridTemplateColumns: '32px 60px 180px 160px 120px 120px 130px 180px 110px 70px 70px 80px 100px',
    alignItems: 'center',
    width: '100%',
    ...shorthands.gap(tokens.spacingHorizontalS),
    padding: `${tokens.spacingVerticalS} 0`,
  },
  expandColumn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '32px',
    minWidth: '32px',
    maxWidth: '32px',
    flexShrink: 0,
  },
  levelBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    ...shorthands.padding('0'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    flexShrink: 0,
  },
  rootIcon: {
    color: tokens.colorPaletteGoldForeground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    flexShrink: 0,
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
  flowNodeCustomer: {
    backgroundColor: tokens.colorBrandBackground2,
    borderTop: `2px solid ${tokens.colorBrandForeground1}`,
    borderRight: `2px solid ${tokens.colorBrandForeground1}`,
    borderBottom: `2px solid ${tokens.colorBrandForeground1}`,
    borderLeft: `2px solid ${tokens.colorBrandForeground1}`,
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
  dragHandle: {
    cursor: 'grab',
    padding: tokens.spacingVerticalXS,
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground3,
    },
    '&:active': {
      cursor: 'grabbing',
    },
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
});

export const CustomersPage = () => {
  const styles = useStyles();
  const { addGroup, removeGroup } = useRibbonMenu();
  
  // Hooks para restauración de foco en el Drawer
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isTenantsDialogOpen, setIsTenantsDialogOpen] = useState(false);
  const [isAssignTenantDialogOpen, setIsAssignTenantDialogOpen] = useState(false);
  const [isAssignParentDialogOpen, setIsAssignParentDialogOpen] = useState(false);
  const [isNotifyUsersDialogOpen, setIsNotifyUsersDialogOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  const [customerUsers, setCustomerUsers] = useState<UserDto[]>([]);
  const [customerTenants, setCustomerTenants] = useState<TenantDto[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingTenants, setIsLoadingTenants] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [tenantName, setTenantName] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<string>('');

  // Form state
  const [formData, setFormData] = useState<CreateCustomerRequest>({
    name: '',
    identification: '',
    countryId: '',
    stateProvince: '',
    city: '',
    phone: '',
    email: '',
  });

  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  const loadCustomers = useCallback(async () => {
    if (isLoadingRef.current) {
      console.log('[CustomersPage] loadCustomers ya está en ejecución, ignorando llamada duplicada');
      return;
    }
    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);
      console.log('[CustomersPage] Cargando clientes...');
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      console.log('[CustomersPage] Clientes cargados:', data.length);
    } catch (err: any) {
      console.error('[CustomersPage] Error cargando clientes:', err);
      setError(err.message || 'Error al cargar clientes');
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  const loadCountries = useCallback(async () => {
    try {
      const data = await countryService.getAllCountries();
      setCountries(data);
    } catch (err: any) {
      console.error('[CustomersPage] Error cargando países:', err);
    }
  }, []);

  useEffect(() => {
    if (!isLoadingRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadCustomers();
      loadCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Registrar acciones en el RibbonMenu
  useEffect(() => {
    addGroup({
      id: 'customers',
      label: 'Clientes',
      icon: <BuildingRegular />,
      items: [
        {
          id: 'create',
          label: 'Crear Cliente',
          icon: <AddRegular />,
          action: () => {
            setFormData({
              name: '',
              identification: '',
              countryId: '',
              stateProvince: '',
              city: '',
              phone: '',
              email: '',
            });
            setIsCreateDialogOpen(true);
          },
        },
        {
          id: 'search',
          label: 'Buscar',
          icon: <SearchRegular />,
          action: () => {
            // Focus en el campo de búsqueda
            setTimeout(() => {
              const searchInput = document.querySelector('input[placeholder*="Buscar"]') as HTMLInputElement;
              if (searchInput) {
                searchInput.focus();
              }
            }, 100);
          },
        },
        {
          id: 'view-table',
          label: 'Vista de Tabla',
          icon: <TableRegular />,
          action: () => {
            setSelectedView('table');
            setSelectedTabValue('table');
          },
        },
        {
          id: 'view-flow',
          label: 'Vista Interactiva',
          icon: <FlowchartRegular />,
          action: () => {
            setSelectedView('flow');
            setSelectedTabValue('flow');
          },
        },
      ],
    });

    // Limpiar al desmontar
    return () => {
      removeGroup('customers');
    };
  }, [addGroup, removeGroup]);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.identification.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.countryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estado para controlar qué nodos están expandidos y drag and drop
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [draggedCustomerId, setDraggedCustomerId] = useState<string | null>(null);
  const [dragOverCustomerId, setDragOverCustomerId] = useState<string | null>(null);
  
  // Estado para la vista de React Flow
  const [selectedView, setSelectedView] = useState<'table' | 'flow'>('table');
  
  // Valor del tab seleccionado
  const [selectedTabValue, setSelectedTabValue] = useState<'table' | 'flow'>('table');
  const [flowNodes, setFlowNodes] = useState<Node[]>([]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const [flowLoading, setFlowLoading] = useState(false);
  const flowLoadingRef = useRef(false);
  const [customerTenantsMap, setCustomerTenantsMap] = useState<Map<string, TenantDto[]>>(new Map());
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

  // Organizar clientes en estructura jerárquica
  interface CustomerNode extends CustomerDto {
    children: CustomerNode[];
    level: number;
  }

  const buildCustomerTree = useCallback((customerList: CustomerDto[]): CustomerNode[] => {
    const customerMap = new Map<string, CustomerNode>();
    const rootNodes: CustomerNode[] = [];

    // Primero, crear todos los nodos
    customerList.forEach((customer) => {
      customerMap.set(customer.id, {
        ...customer,
        children: [],
        level: 0,
      });
    });

    // Luego, construir el árbol
    customerList.forEach((customer) => {
      const node = customerMap.get(customer.id)!;
      if (customer.parentId) {
        const parent = customerMap.get(customer.parentId);
        if (parent) {
          parent.children.push(node);
        } else {
          // Si el padre no existe, tratarlo como raíz
          rootNodes.push(node);
        }
      } else {
        rootNodes.push(node);
      }
    });

    // Calcular niveles recursivamente después de construir el árbol
    const calculateLevels = (node: CustomerNode, currentLevel: number) => {
      node.level = currentLevel;
      node.children.forEach((child) => {
        calculateLevels(child, currentLevel + 1);
      });
    };

    rootNodes.forEach((root) => {
      calculateLevels(root, 0);
    });

    return rootNodes;
  }, []);

  const customerTree = buildCustomerTree(filteredCustomers);

  // Función recursiva para renderizar el árbol
  const toggleExpand = (customerId: string) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(customerId)) {
        newSet.delete(customerId);
      } else {
        newSet.add(customerId);
      }
      return newSet;
    });
  };

  const handleDragStart = (e: React.DragEvent, customerId: string) => {
    setDraggedCustomerId(customerId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', customerId);
  };

  const handleDragOver = (e: React.DragEvent, customerId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedCustomerId && draggedCustomerId !== customerId) {
      setDragOverCustomerId(customerId);
    }
  };

  const handleDragLeave = () => {
    setDragOverCustomerId(null);
  };

  const handleDrop = async (e: React.DragEvent, targetCustomerId: string) => {
    e.preventDefault();
    setDragOverCustomerId(null);

    if (!draggedCustomerId || draggedCustomerId === targetCustomerId) {
      setDraggedCustomerId(null);
      return;
    }

    // Verificar que no se está intentando asignar un cliente como padre de sí mismo o de su descendiente
    const draggedCustomer = customers.find((c) => c.id === draggedCustomerId);
    if (!draggedCustomer) {
      setDraggedCustomerId(null);
      return;
    }

    // Verificar que el cliente objetivo no es descendiente del cliente arrastrado
    const isDescendant = (parentId: string, childId: string): boolean => {
      const child = customers.find((c) => c.id === childId);
      if (!child || !child.parentId) return false;
      if (child.parentId === parentId) return true;
      return isDescendant(parentId, child.parentId);
    };

    if (isDescendant(draggedCustomerId, targetCustomerId)) {
      setError('No se puede asignar un cliente como padre de su descendiente');
      setDraggedCustomerId(null);
      return;
    }

    try {
      setError(null);
      setIsReordering(true);
      await customerService.assignParentToCustomer(draggedCustomerId, targetCustomerId);
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al reasignar cliente');
    } finally {
      setIsReordering(false);
      setDraggedCustomerId(null);
    }
  };

  const handleDropOnRoot = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverCustomerId(null);

    if (!draggedCustomerId) return;

    try {
      setError(null);
      setIsReordering(true);
      await customerService.assignParentToCustomer(draggedCustomerId, undefined);
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al convertir cliente en raíz');
    } finally {
      setIsReordering(false);
      setDraggedCustomerId(null);
    }
  };

  const renderCustomerNode = (node: CustomerNode): React.ReactNode => {
    const hasChildren = node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isDragging = draggedCustomerId === node.id;
    const isDragOver = dragOverCustomerId === node.id;
    const isRoot = !node.parentId;

    // Determinar la clase de estilo según el nivel
    let levelClass = '';
    if (isRoot) {
      levelClass = styles.treeRowRoot;
    } else if (node.level === 1) {
      levelClass = styles.treeRowLevel1;
    } else if (node.level === 2) {
      levelClass = styles.treeRowLevel2;
    } else {
      levelClass = styles.treeRowLevel3Plus;
    }

    return (
      <div key={node.id}>
        <div
          className={`${styles.treeRow} ${levelClass} ${isDragging ? styles.treeRowDragging : ''} ${isDragOver ? styles.treeRowDragOver : ''}`}
          draggable
          onDragStart={(e) => handleDragStart(e, node.id)}
          onDragOver={(e) => handleDragOver(e, node.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, node.id)}
        >
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative', paddingLeft: isRoot ? '0px' : `${node.level * 24}px` }}>
            <div className={styles.expandColumn}>
              {hasChildren ? (
                <button
                  className={styles.treeExpandButton}
                  onClick={() => toggleExpand(node.id)}
                  type="button"
                >
                  {isExpanded ? (
                    <ChevronDownRegular fontSize={16} />
                  ) : (
                    <ChevronRightRegular fontSize={16} />
                  )}
                </button>
              ) : (
                <div style={{ width: '24px' }} />
              )}
            </div>
            <div className={styles.treeRowContent}>
              <div className={styles.dragHandle} style={{ justifyContent: 'center' }}>
                <ArrowMoveRegular fontSize={16} />
              </div>
              <div className={styles.treeCell} style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {isRoot ? (
                  <StarRegular fontSize={16} className={styles.rootIcon} title="Cliente raíz" />
                ) : (
                  <span className={styles.levelBadge} title={`Nivel ${node.level}`}>
                    {node.level}
                  </span>
                )}
              </div>
            <div className={styles.treeCell} style={{ minWidth: '180px' }}>{node.name}</div>
            <div className={styles.treeCell} style={{ minWidth: '160px' }}>{node.identification}</div>
            <div className={styles.treeCell} style={{ minWidth: '120px' }}>{node.countryName || 'N/A'}</div>
            <div className={styles.treeCell} style={{ minWidth: '120px' }}>{node.city || 'N/A'}</div>
            <div className={styles.treeCell} style={{ minWidth: '130px' }}>{node.phone || 'N/A'}</div>
            <div className={styles.treeCell} style={{ minWidth: '180px' }}>{node.email || 'N/A'}</div>
            <div className={styles.treeCell} style={{ justifyContent: 'center', minWidth: '110px' }}>
              {node.isSuspended ? (
                <Badge appearance="filled" color="danger">Suspendido</Badge>
              ) : node.isActive ? (
                <Badge appearance="filled" color="success">Activo</Badge>
              ) : (
                <Badge appearance="outline">Inactivo</Badge>
              )}
            </div>
            <div className={styles.treeCell} style={{ justifyContent: 'center', minWidth: '70px' }}>{node.officeCount || 0}</div>
            <div className={styles.treeCell} style={{ justifyContent: 'center', minWidth: '70px' }}>{node.tenantCount || 0}</div>
            <div className={styles.treeCell} style={{ justifyContent: 'center', minWidth: '80px' }}>{node.userCount || 0}</div>
            <div className={styles.treeCell}>
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
                    <MenuItem icon={<EyeRegular />} onClick={() => handleViewDetails(node)}>
                      Ver detalles
                    </MenuItem>
                    <MenuItem icon={<EditRegular />} onClick={() => handleEdit(node)}>
                      Editar
                    </MenuItem>
                    <MenuItem icon={<HomeRegular />} onClick={() => handleViewOffices(node)}>
                      Ver Sedes
                    </MenuItem>
                    <MenuItem icon={<BuildingRegular />} onClick={() => handleViewTenants(node)}>
                      Ver Tenants
                    </MenuItem>
                    <MenuItem icon={<PeopleRegular />} onClick={() => handleViewUsers(node)}>
                      Ver usuarios
                    </MenuItem>
                    <MenuItem icon={<PeopleRegular />} onClick={() => handleNotifyUsers(node)}>
                      Enviar notificación
                    </MenuItem>
                    <MenuItem icon={<LinkRegular />} onClick={() => handleAssignParent(node)}>
                      Asignar a otro cliente
                    </MenuItem>
                    {node.isSuspended ? (
                      <MenuItem icon={<PlayRegular />} onClick={() => handleActivate(node)}>
                        Activar
                      </MenuItem>
                    ) : (
                      <MenuItem icon={<PauseRegular />} onClick={() => handleSuspend(node)}>
                        Suspender
                      </MenuItem>
                    )}
                    <MenuItem icon={<DeleteRegular />} onClick={() => handleDelete(node)}>
                      Eliminar
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </div>
            </div>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child) => renderCustomerNode(child))}
          </div>
        )}
      </div>
    );
  };

  const handleEdit = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      identification: customer.identification,
      countryId: customer.countryId,
      stateProvince: customer.stateProvince || '',
      city: customer.city || '',
      phone: customer.phone || '',
      email: customer.email || '',
    });
    
    // Cargar tenants del cliente para verificar si tiene
    setIsLoadingTenants(true);
    try {
      const tenants = await customerService.getCustomerTenants(customer.id);
      setCustomerTenants(tenants);
    } catch (err: any) {
      console.error('Error cargando tenants:', err);
      setCustomerTenants([]);
    } finally {
      setIsLoadingTenants(false);
    }
    
    setIsEditDialogOpen(true);
  };

  const handleCreate = async () => {
    if (!formData.name.trim() || !formData.identification.trim() || !formData.countryId) {
      setError('Nombre, identificación y país son requeridos');
      return;
    }

    try {
      setError(null);
      setIsCreating(true);
      await customerService.createCustomer(formData);
      setIsCreateDialogOpen(false);
      setIsCreating(false);
      setFormData({
        name: '',
        identification: '',
        countryId: '',
        stateProvince: '',
        city: '',
        phone: '',
        email: '',
      });
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al crear cliente');
      setIsCreating(false);
    }
  };

  const handleDrawerOpenChange = (event: any, data: { open: boolean }) => {
    // Con modalType="alert", el Drawer no se puede cerrar con clic fuera o ESC
    // Solo se puede cerrar programáticamente, así que solo necesitamos manejar la confirmación
    if (data.open === false) {
      // Prevenir el cierre si está creando
      if (isCreating) {
        return;
      }
      
      // Verificar si hay datos en el formulario
      const hasData = formData.name.trim() || 
                      formData.identification.trim() || 
                      formData.countryId || 
                      formData.stateProvince.trim() || 
                      formData.city.trim() || 
                      formData.phone.trim() || 
                      formData.email.trim();
      
      if (hasData) {
        // Si hay datos y se intenta cerrar, mostrar confirmación
        if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
          setIsCreateDialogOpen(false);
          setFormData({
            name: '',
            identification: '',
            countryId: '',
            stateProvince: '',
            city: '',
            phone: '',
            email: '',
          });
          setError(null);
        }
        // Si el usuario cancela, no actualizamos el estado (mantiene el Drawer abierto)
        return;
      }
    }
    
    // Permitir abrir normalmente o cerrar si no hay datos
    setIsCreateDialogOpen(data.open);
  };

  const handleAssignTenant = async () => {
    if (!selectedCustomer) return;

    try {
      setError(null);
      await customerService.assignTenantToCustomer(selectedCustomer.id, tenantName || undefined);
      setIsAssignTenantDialogOpen(false);
      setTenantName('');
      // Recargar tenants del cliente
      const tenants = await customerService.getCustomerTenants(selectedCustomer.id);
      setCustomerTenants(tenants);
      // Actualizar el cliente seleccionado
      const updatedCustomer = await customerService.getCustomerById(selectedCustomer.id);
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al asignar tenant');
    }
  };

  const handleDelete = (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleSuspend = async (customer: CustomerDto) => {
    try {
      await customerService.suspendCustomer(customer.id);
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al suspender cliente');
    }
  };

  const handleActivate = async (customer: CustomerDto) => {
    try {
      await customerService.activateCustomer(customer.id);
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al activar cliente');
    }
  };

  const handleViewDetails = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };

  const handleViewUsers = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setIsLoadingUsers(true);
    setIsUsersDialogOpen(true);
    try {
      const users = await customerService.getCustomerUsers(customer.id);
      setCustomerUsers(users);
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleNotifyUsers = (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setNotificationTitle('');
    setNotificationMessage('');
    setIsNotifyUsersDialogOpen(true);
  };

  const handleSendNotification = async () => {
    if (!selectedCustomer || !notificationTitle.trim() || !notificationMessage.trim()) {
      setError('El título y el mensaje son requeridos');
      return;
    }

    try {
      setError(null);
      setIsSendingNotification(true);
      const response = await notificationService.notifyCustomerUsers(selectedCustomer.id, {
        title: notificationTitle,
        message: notificationMessage,
      });
      setIsNotifyUsersDialogOpen(false);
      setNotificationTitle('');
      setNotificationMessage('');
      // Mostrar mensaje de éxito
      setError(null);
      // Aquí podrías usar el contexto de notificaciones si lo prefieres
      alert(response.message);
    } catch (err: any) {
      setError(err.message || 'Error al enviar notificaciones');
    } finally {
      setIsSendingNotification(false);
    }
  };

  const handleAssignParent = (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setSelectedParentId(customer.parentId || '');
    setIsAssignParentDialogOpen(true);
  };

  const handleConfirmAssignParent = async () => {
    if (!selectedCustomer) return;

    try {
      setError(null);
      await customerService.assignParentToCustomer(
        selectedCustomer.id,
        selectedParentId || undefined
      );
      setIsAssignParentDialogOpen(false);
      setSelectedParentId('');
      await loadCustomers();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setError(err.message || 'Error al asignar cliente padre');
    }
  };

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

  // Recalcular layout cuando cambia el tamaño de ventana (con debounce)
  const layoutRecalcRef = useRef(false);
  useEffect(() => {
    if (selectedView === 'flow' && flowNodes.length > 0 && !layoutRecalcRef.current) {
      layoutRecalcRef.current = true;
      const timeoutId = setTimeout(() => {
        // Obtener los nodos y edges actuales sin posiciones calculadas
        const nodesWithoutLayout = flowNodes.map(node => ({
          ...node,
          position: { x: 0, y: 0 }
        }));
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodesWithoutLayout, flowEdges, 'TB');
        setFlowNodes(layoutedNodes);
        setFlowEdges(layoutedEdges);
        layoutRecalcRef.current = false;
      }, 300); // Debounce de 300ms

      return () => {
        clearTimeout(timeoutId);
        layoutRecalcRef.current = false;
      };
    }
  }, [windowSize.width, selectedView, getLayoutedElements]);

  // Función para cargar datos del flow
  const loadFlowData = useCallback(async () => {
    if (filteredCustomers.length === 0) {
      setFlowNodes([]);
      setFlowEdges([]);
      return;
    }

    // Prevenir múltiples cargas simultáneas
    if (flowLoadingRef.current) {
      console.log('[CustomersPage] loadFlowData ya está en ejecución, ignorando llamada duplicada');
      return;
    }

    flowLoadingRef.current = true;
    setFlowLoading(true);
    try {
      const newCustomerTenantsMap = new Map<string, TenantDto[]>();
      const newTenantUsersMap = new Map<string, UserDto[]>();
      
      // Cargar tenants para cada cliente
      for (const customer of filteredCustomers) {
        try {
          const tenants = await customerService.getCustomerTenants(customer.id);
          newCustomerTenantsMap.set(customer.id, tenants);
          
          // Cargar usuarios para cada tenant
          for (const tenant of tenants) {
            try {
              const users = await tenantService.getTenantUsers(tenant.id);
              newTenantUsersMap.set(tenant.id, users);
            } catch (err) {
              console.error(`Error cargando usuarios del tenant ${tenant.id}:`, err);
              newTenantUsersMap.set(tenant.id, []);
            }
          }
        } catch (err) {
          console.error(`Error cargando tenants del cliente ${customer.id}:`, err);
          newCustomerTenantsMap.set(customer.id, []);
        }
      }

      setCustomerTenantsMap(newCustomerTenantsMap);
      setTenantUsersMap(newTenantUsersMap);

      // Crear nodos y edges (sin posiciones, Dagre las calculará)
      const nodes: Node[] = [];
      const edges: Edge[] = [];
      
      // Crear nodos de clientes
      filteredCustomers.forEach((customer) => {
        const customerNodeId = `customer-${customer.id}`;
        
        nodes.push({
          id: customerNodeId,
          type: 'default',
          position: { x: 0, y: 0 }, // Posición temporal, Dagre la calculará
          data: {
            label: (
              <div className={`${styles.flowNode} ${styles.flowNodeCustomer}`}>
                <div className={styles.flowNodeHeader}>{customer.name}</div>
                <div className={styles.flowNodeContent}>ID: {customer.identification}</div>
                <div className={styles.flowNodeContent}>País: {customer.countryName || 'N/A'}</div>
                {customer.email && (
                  <div className={styles.flowNodeContent}>Email: {customer.email}</div>
                )}
              </div>
            ),
          },
        });

        // Crear nodos de tenants para este cliente
        const tenants = newCustomerTenantsMap.get(customer.id) || [];
        tenants.forEach((tenant) => {
          const tenantNodeId = `tenant-${tenant.id}`;
          
          nodes.push({
            id: tenantNodeId,
            type: 'default',
            position: { x: 0, y: 0 }, // Posición temporal, Dagre la calculará
            data: {
              label: (
                <div className={`${styles.flowNode} ${styles.flowNodeTenant}`}>
                  <div className={styles.flowNodeHeader}>{tenant.name}</div>
                  <div className={styles.flowNodeContent}>
                    {tenant.isSuspended ? 'Suspendido' : tenant.isActive ? 'Activo' : 'Inactivo'}
                  </div>
                </div>
              ),
            },
          });

          // Edge de cliente a tenant
          edges.push({
            id: `edge-${customerNodeId}-${tenantNodeId}`,
            source: customerNodeId,
            target: tenantNodeId,
            type: 'smoothstep',
          });

          // Crear nodos de usuarios para este tenant
          const users = newTenantUsersMap.get(tenant.id) || [];
          users.forEach((user) => {
            const userNodeId = `user-${user.id}`;
            
            nodes.push({
              id: userNodeId,
              type: 'default',
              position: { x: 0, y: 0 }, // Posición temporal, Dagre la calculará
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
  }, [filteredCustomers, styles]);

  // Cargar datos del flow cuando cambia la vista o los clientes
  const flowLoadAttemptsRef = useRef(0);
  useEffect(() => {
    if (selectedView === 'flow' && filteredCustomers.length > 0) {
      // Resetear contador cuando cambian las dependencias válidas
      flowLoadAttemptsRef.current = 0;
      loadFlowData().catch((err) => {
        console.error('[CustomersPage] Error en loadFlowData:', err);
        // No reintentar automáticamente, el usuario puede cambiar de vista
      });
    }
  }, [selectedView, filteredCustomers.length]); // Solo dependencias esenciales, no loadFlowData

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

  const handleSave = async () => {
    if (!selectedCustomer) return;

    // Verificar que tiene tenants antes de permitir edición
    if (customerTenants.length === 0) {
      setError('El cliente debe tener al menos un tenant asociado para poder ser editado.');
      return;
    }

    try {
      setError(null);
      await customerService.updateCustomer(selectedCustomer.id, formData);
      setIsEditDialogOpen(false);
      setSelectedCustomer(null);
      setCustomerTenants([]);
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al guardar cliente');
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCustomer) return;

    try {
      await customerService.deleteCustomer(selectedCustomer.id);
      setIsDeleteDialogOpen(false);
      setSelectedCustomer(null);
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar cliente');
    }
  };

  if (isLoading && customers.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <BuildingRegular fontSize={32} />
          <h1 className={styles.title}>Clientes</h1>
        </div>
        <Card>
          <div className={styles.toolbar}>
            <Input
              placeholder="Buscar por nombre, identificación o país..."
              disabled
              contentBefore={<SearchRegular />}
              style={{ flex: 1 }}
            />
            <Button appearance="primary" icon={<AddRegular />} disabled>
              Crear Cliente
            </Button>
          </div>
          <TreeSkeleton rows={8} />
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
        <h1 className={styles.title}>Clientes</h1>
      </div>
      <Card>
        <CardPreview>
          <div style={{ padding: tokens.spacingVerticalXL }}>
            {error && (
              <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{error}</MessageBarBody>
              </MessageBar>
            )}

            <TabList
              selectedValue={selectedTabValue}
              onTabSelect={(_, data) => {
                const value = data.value as 'table' | 'flow';
                setSelectedTabValue(value);
                setSelectedView(value);
              }}
              style={{ marginBottom: tokens.spacingVerticalM }}
            >
              <Tab value="table" icon={<TableRegular />}>
                Vista de Tabla
              </Tab>
              <Tab value="flow" icon={<FlowchartRegular />}>
                Vista Interactiva
              </Tab>
            </TabList>

            {selectedView === 'table' && (
              <>
            <div className={styles.toolbar}>
          <Input
            placeholder="Buscar por nombre, identificación o país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            contentBefore={<SearchRegular />}
            style={{ flex: 1 }}
          />
          <Button
            appearance="primary"
            icon={<AddRegular />}
            onClick={() => {
      setFormData({
        name: '',
        identification: '',
        countryId: '',
        stateProvince: '',
        city: '',
        phone: '',
        email: '',
      });
      setIsCreateDialogOpen(true);
            }}
          >
            Crear Cliente
          </Button>
        </div>

        {/* Vista jerárquica con drag and drop */}
        <div className={styles.treeContainer} style={{ position: 'relative' }}>
          {isReordering && (
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
              <Spinner size="large" label="Reubicando cliente..." />
            </div>
          )}
          <div style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '0px' }}>
              <div className={styles.expandColumn}></div>
              <div className={styles.treeHeaderContent}>
                <div style={{ textAlign: 'center' }}></div>
                <div style={{ textAlign: 'center' }}>Nivel</div>
                <div>Nombre</div>
                <div>Identificación</div>
                <div>País</div>
                <div>Ciudad</div>
                <div>Teléfono</div>
                <div>Email</div>
                <div style={{ textAlign: 'center' }}>Estado</div>
                <div style={{ textAlign: 'center' }}>Sedes</div>
                <div style={{ textAlign: 'center' }}>Tenants</div>
                <div style={{ textAlign: 'center' }}>Usuarios</div>
                <div style={{ textAlign: 'center' }}>Acciones</div>
              </div>
            </div>
          </div>
          <div>
            {customerTree.length === 0 ? (
              <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                <Text>No se encontraron clientes</Text>
              </div>
            ) : (
              customerTree.map((node) => renderCustomerNode(node))
            )}
          </div>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={handleDropOnRoot}
            style={{
              minHeight: '50px',
              padding: tokens.spacingVerticalM,
              border: `2px dashed ${tokens.colorNeutralStroke2}`,
              ...shorthands.borderRadius(tokens.borderRadiusMedium),
              marginTop: tokens.spacingVerticalM,
              textAlign: 'center',
              color: tokens.colorNeutralForeground3,
            }}
          >
            <Text>Arrastra aquí para convertir en cliente raíz (sin padre)</Text>
          </div>
        </div>
          </>
        )}

            {selectedView === 'flow' && (
              <div className={styles.flowContainer}>
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
                          <Text weight="semibold">Vista Interactiva: Clientes → Tenants → Usuarios</Text>
                          <div style={{ marginTop: tokens.spacingVerticalXS }}>
                            <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                              Nivel: Clientes (1) → Tenants (2) → Usuarios (3)
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
        onOpenChange={handleDrawerOpenChange}
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Crear Cliente</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            <Field label="Nombre" required className={styles.formField}>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Field>
            <Field label="Identificación" required className={styles.formField}>
              <Input
                value={formData.identification}
                onChange={(e) => setFormData({ ...formData, identification: e.target.value })}
              />
            </Field>
            <Field label="País" required className={styles.formField}>
              <Combobox
                value={countries.find((c) => c.id === formData.countryId)?.name || ''}
                onOptionSelect={(_, data) => {
                  const country = countries.find((c) => c.name === data.optionValue);
                  if (country) {
                    setFormData({ ...formData, countryId: country.id });
                  }
                }}
              >
                {countries.map((country) => (
                  <Option key={country.id} value={country.name}>
                    {country.name} ({country.isoCode})
                  </Option>
                ))}
              </Combobox>
            </Field>
            <Field label="Estado/Provincia" className={styles.formField}>
              <Input
                value={formData.stateProvince}
                onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
              />
            </Field>
            <Field label="Ciudad" className={styles.formField}>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </Field>
            <Field label="Teléfono" className={styles.formField}>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Field>
            <Field label="Correo electrónico" className={styles.formField}>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Field>
            <MessageBar intent="info" style={{ marginTop: tokens.spacingVerticalM }}>
              <MessageBarBody>
                Se creará automáticamente un tenant para este cliente.
              </MessageBarBody>
            </MessageBar>
            <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
              <Button 
                appearance="secondary" 
                onClick={() => {
                  const hasData = formData.name.trim() || 
                                  formData.identification.trim() || 
                                  formData.countryId || 
                                  formData.stateProvince.trim() || 
                                  formData.city.trim() || 
                                  formData.phone.trim() || 
                                  formData.email.trim();
                  
                  if (hasData) {
                    if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los datos no guardados.')) {
                      setIsCreateDialogOpen(false);
                      setFormData({
                        name: '',
                        identification: '',
                        countryId: '',
                        stateProvince: '',
                        city: '',
                        phone: '',
                        email: '',
                      });
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
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Dialog de edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={(_, data) => setIsEditDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingTenants ? (
                <DetailsSkeleton rows={3} />
              ) : customerTenants.length === 0 ? (
                <div className={styles.detailsContent}>
                  <MessageBar intent="warning">
                    <MessageBarBody>
                      Este cliente no tiene tenants asociados. Debe asignar un tenant antes de poder editar el cliente.
                    </MessageBarBody>
                  </MessageBar>
                  <div style={{ marginTop: tokens.spacingVerticalM }}>
                    <Button
                      appearance="primary"
                      icon={<AddRegular />}
                      onClick={() => setIsAssignTenantDialogOpen(true)}
                    >
                      Asignar Tenant
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={styles.detailsContent}>
                  <Field label="Nombre" required className={styles.formField}>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={customerTenants.length === 0}
                    />
                  </Field>
                  <Field label="Identificación" required className={styles.formField}>
                    <Input
                      value={formData.identification}
                      onChange={(e) => setFormData({ ...formData, identification: e.target.value })}
                      disabled={customerTenants.length === 0}
                    />
                  </Field>
                  <Field label="País" required className={styles.formField}>
                    <Combobox
                      value={countries.find((c) => c.id === formData.countryId)?.name || ''}
                      onOptionSelect={(_, data) => {
                        const country = countries.find((c) => c.name === data.optionValue);
                        if (country) {
                          setFormData({ ...formData, countryId: country.id });
                        }
                      }}
                      disabled={customerTenants.length === 0}
                    >
                      {countries.map((country) => (
                        <Option key={country.id} value={country.name}>
                          {country.name} ({country.isoCode})
                        </Option>
                      ))}
                    </Combobox>
                  </Field>
                  <Field label="Estado/Provincia" className={styles.formField}>
                    <Input
                      value={formData.stateProvince}
                      onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                      disabled={customerTenants.length === 0}
                    />
                  </Field>
                  <Field label="Ciudad" className={styles.formField}>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      disabled={customerTenants.length === 0}
                    />
                  </Field>
                  <Field label="Teléfono" className={styles.formField}>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={customerTenants.length === 0}
                    />
                  </Field>
                  <Field label="Correo electrónico" className={styles.formField}>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={customerTenants.length === 0}
                    />
                  </Field>
                </div>
              )}
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => {
              setIsEditDialogOpen(false);
              setCustomerTenants([]);
              setSelectedCustomer(null);
            }}>
              {customerTenants.length === 0 ? 'Cerrar' : 'Cancelar'}
            </Button>
            {customerTenants.length > 0 && (
              <Button appearance="primary" onClick={handleSave}>
                Guardar
              </Button>
            )}
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Dialog de asignar tenant */}
      <Dialog open={isAssignTenantDialogOpen} onOpenChange={(_, data) => setIsAssignTenantDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Asignar Tenant</DialogTitle>
          <DialogBody>
            <DialogContent>
              <div className={styles.detailsContent}>
                <MessageBar intent="info">
                  <MessageBarBody>
                    Se creará un nuevo tenant para el cliente "{selectedCustomer?.name}".
                  </MessageBarBody>
                </MessageBar>
                <Field label="Nombre del Tenant (opcional)" className={styles.formField}>
                  <Input
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    placeholder="Si se deja vacío, se generará automáticamente"
                  />
                </Field>
              </div>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => {
              setIsAssignTenantDialogOpen(false);
              setTenantName('');
            }}>
              Cancelar
            </Button>
            <Button appearance="primary" onClick={handleAssignTenant}>
              Asignar Tenant
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Dialog de eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(_, data) => setIsDeleteDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                ¿Está seguro de que desea eliminar el cliente "{selectedCustomer?.name}"? Esta acción no se puede deshacer.
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

      {/* Dialog de detalles */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={(_, data) => setIsDetailsDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Detalles del Cliente</DialogTitle>
          <DialogBody>
            <DialogContent>
              {selectedCustomer && (
                <div className={styles.detailsContent}>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Nombre:</Text>
                    <Text>{selectedCustomer.name}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Identificación:</Text>
                    <Text>{selectedCustomer.identification}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>País:</Text>
                    <Text>{selectedCustomer.countryName || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Estado/Provincia:</Text>
                    <Text>{selectedCustomer.stateProvince || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Ciudad:</Text>
                    <Text>{selectedCustomer.city || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Teléfono:</Text>
                    <Text>{selectedCustomer.phone || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Correo electrónico:</Text>
                    <Text>{selectedCustomer.email || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Estado:</Text>
                    {selectedCustomer.isSuspended ? (
                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                    ) : selectedCustomer.isActive ? (
                      <Badge appearance="filled" color="success">Activo</Badge>
                    ) : (
                      <Badge appearance="outline">Inactivo</Badge>
                    )}
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Tenants:</Text>
                    <Text>{selectedCustomer.tenantCount || 0}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Usuarios:</Text>
                    <Text>{selectedCustomer.userCount || 0}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Creado:</Text>
                    <Text>{new Date(selectedCustomer.createdAt).toLocaleString()}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Actualizado:</Text>
                    <Text>{new Date(selectedCustomer.updatedAt).toLocaleString()}</Text>
                  </div>
                </div>
              )}
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="primary" onClick={() => setIsDetailsDialogOpen(false)}>
              Cerrar
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Dialog de usuarios */}
      <Dialog open={isUsersDialogOpen} onOpenChange={(_, data) => setIsUsersDialogOpen(data.open)}>
        <DialogSurface style={{ minWidth: '600px' }}>
          <DialogTitle>Usuarios del Cliente</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingUsers ? (
                <TableSkeleton rows={5} columns={3} />
              ) : customerUsers.length === 0 ? (
                <Text>No hay usuarios asociados a este cliente.</Text>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Email</TableHeaderCell>
                      <TableHeaderCell>Nombre</TableHeaderCell>
                      <TableHeaderCell>Rol</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.name || 'N/A'}</TableCell>
                        <TableCell>{user.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="primary" onClick={() => setIsUsersDialogOpen(false)}>
              Cerrar
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Dialog de tenants */}
      <Dialog open={isTenantsDialogOpen} onOpenChange={(_, data) => setIsTenantsDialogOpen(data.open)}>
        <DialogSurface style={{ minWidth: '600px' }}>
          <DialogTitle>Tenants del Cliente</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingTenants ? (
                <TableSkeleton rows={5} columns={3} />
              ) : customerTenants.length === 0 ? (
                <Text>No hay tenants asociados a este cliente.</Text>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Nombre</TableHeaderCell>
                      <TableHeaderCell>Estado</TableHeaderCell>
                      <TableHeaderCell>Creado</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerTenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell>{tenant.name}</TableCell>
                        <TableCell>
                          {tenant.isSuspended ? (
                            <Badge appearance="filled" color="danger">Suspendido</Badge>
                          ) : tenant.isActive ? (
                            <Badge appearance="filled" color="success">Activo</Badge>
                          ) : (
                            <Badge appearance="outline">Inactivo</Badge>
                          )}
                        </TableCell>
                        <TableCell>{new Date(tenant.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="primary" onClick={() => setIsTenantsDialogOpen(false)}>
              Cerrar
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Dialog de asignar cliente padre */}
      <Dialog open={isAssignParentDialogOpen} onOpenChange={(_, data) => setIsAssignParentDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Asignar Cliente Padre</DialogTitle>
          <DialogBody>
            <DialogContent>
              <div className={styles.detailsContent}>
                <MessageBar intent="info">
                  <MessageBarBody>
                    Seleccione un cliente padre para "{selectedCustomer?.name}". 
                    Si no selecciona ninguno, el cliente será un cliente raíz.
                  </MessageBarBody>
                </MessageBar>
                <Field label="Cliente Padre" className={styles.formField}>
                  <Combobox
                    value={selectedParentId ? customers.find((c) => c.id === selectedParentId)?.name || '' : ''}
                    onOptionSelect={(_, data) => {
                      const customer = customers.find((c) => c.name === data.optionValue);
                      if (customer) {
                        setSelectedParentId(customer.id);
                      } else {
                        setSelectedParentId('');
                      }
                    }}
                    onInput={(e) => {
                      if (!e.target.value) {
                        setSelectedParentId('');
                      }
                    }}
                  >
                    <Option value="">(Cliente raíz - sin padre)</Option>
                    {customers
                      .filter((c) => c.id !== selectedCustomer?.id) // Excluir el cliente actual
                      .map((customer) => (
                        <Option key={customer.id} value={customer.name}>
                          {customer.name} ({customer.identification})
                        </Option>
                      ))}
                  </Combobox>
                </Field>
                {selectedCustomer?.parentName && (
                  <MessageBar intent="warning">
                    <MessageBarBody>
                      Cliente padre actual: {selectedCustomer.parentName}
                    </MessageBarBody>
                  </MessageBar>
                )}
              </div>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => {
              setIsAssignParentDialogOpen(false);
              setSelectedParentId('');
            }}>
              Cancelar
            </Button>
            <Button appearance="primary" onClick={handleConfirmAssignParent}>
              Asignar
            </Button>
          </DialogActions>
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
                    Se enviará una notificación por email a todos los usuarios del cliente "{selectedCustomer?.name}".
                  </MessageBarBody>
                </MessageBar>
                <Field label="Título" required className={styles.formField}>
                  <Input
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    placeholder="Título de la notificación"
                  />
                </Field>
                <Field label="Mensaje" required className={styles.formField}>
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

