import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Card,
  CardHeader,
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
} from '@fluentui/react-components';
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

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    padding: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground2,
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
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  treeCell: {
    flex: '1 1 0',
    minWidth: '100px',
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
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isAssignTenantDialogOpen, setIsAssignTenantDialogOpen] = useState(false);
  const [isAssignParentDialogOpen, setIsAssignParentDialogOpen] = useState(false);
  const [customerUsers, setCustomerUsers] = useState<UserDto[]>([]);
  const [customerTenants, setCustomerTenants] = useState<TenantDto[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingTenants, setIsLoadingTenants] = useState(false);
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

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.identification.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.countryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estado para controlar qué nodos están expandidos y drag and drop
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [draggedCustomerId, setDraggedCustomerId] = useState<string | null>(null);
  const [dragOverCustomerId, setDragOverCustomerId] = useState<string | null>(null);

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
          node.level = parent.level + 1;
        } else {
          // Si el padre no existe, tratarlo como raíz
          rootNodes.push(node);
        }
      } else {
        rootNodes.push(node);
      }
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
      await customerService.assignParentToCustomer(draggedCustomerId, targetCustomerId);
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al reasignar cliente');
    } finally {
      setDraggedCustomerId(null);
    }
  };

  const handleDropOnRoot = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverCustomerId(null);

    if (!draggedCustomerId) return;

    try {
      setError(null);
      await customerService.assignParentToCustomer(draggedCustomerId, undefined);
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al convertir cliente en raíz');
    } finally {
      setDraggedCustomerId(null);
    }
  };

  const renderCustomerNode = (node: CustomerNode): React.ReactNode => {
    const hasChildren = node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isDragging = draggedCustomerId === node.id;
    const isDragOver = dragOverCustomerId === node.id;

    return (
      <div key={node.id}>
        <div
          className={`${styles.treeRow} ${isDragging ? styles.treeRowDragging : ''} ${isDragOver ? styles.treeRowDragOver : ''}`}
          style={{ paddingLeft: `${node.level * 24 + 8}px` }}
          draggable
          onDragStart={(e) => handleDragStart(e, node.id)}
          onDragOver={(e) => handleDragOver(e, node.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, node.id)}
        >
          <div className={styles.treeIndent}>
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
          <div className={styles.dragHandle}>
            <ArrowMoveRegular fontSize={16} />
          </div>
          <div className={styles.treeContent}>
            <div className={styles.treeCell}>{node.name}</div>
            <div className={styles.treeCell}>{node.identification}</div>
            <div className={styles.treeCell}>{node.countryName || 'N/A'}</div>
            <div className={styles.treeCell}>{node.city || 'N/A'}</div>
            <div className={styles.treeCell}>{node.phone || 'N/A'}</div>
            <div className={styles.treeCell}>{node.email || 'N/A'}</div>
            <div className={styles.treeCell}>
              {node.isSuspended ? (
                <Badge appearance="filled" color="danger">Suspendido</Badge>
              ) : node.isActive ? (
                <Badge appearance="filled" color="success">Activo</Badge>
              ) : (
                <Badge appearance="outline">Inactivo</Badge>
              )}
            </div>
            <div className={styles.treeCell}>{node.tenantCount || 0}</div>
            <div className={styles.treeCell}>{node.userCount || 0}</div>
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
                    <MenuItem icon={<PeopleRegular />} onClick={() => handleViewUsers(node)}>
                      Ver usuarios
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
      await customerService.createCustomer(formData);
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
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al crear cliente');
    }
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
    } catch (err: any) {
      setError(err.message || 'Error al asignar cliente padre');
    }
  };

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
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Cargando clientes..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Card>
        <CardHeader
          header={
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <BuildingRegular fontSize={24} />
                <Text className={styles.title}>Clientes</Text>
              </div>
            </div>
          }
        />

        {error && (
          <MessageBar intent="error">
            <MessageBarBody>{error}</MessageBarBody>
          </MessageBar>
        )}

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
        <div className={styles.treeContainer}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell style={{ width: '24px' }}></TableHeaderCell>
                <TableHeaderCell style={{ width: '24px' }}></TableHeaderCell>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Identificación</TableHeaderCell>
                <TableHeaderCell>País</TableHeaderCell>
                <TableHeaderCell>Ciudad</TableHeaderCell>
                <TableHeaderCell>Teléfono</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
                <TableHeaderCell>Tenants</TableHeaderCell>
                <TableHeaderCell>Usuarios</TableHeaderCell>
                <TableHeaderCell className={styles.actionsCell}>Acciones</TableHeaderCell>
              </TableRow>
            </TableHeader>
          </Table>
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
              marginBottom: tokens.spacingVerticalM,
              textAlign: 'center',
              color: tokens.colorNeutralForeground3,
            }}
          >
            <Text>Arrastra aquí para convertir en cliente raíz (sin padre)</Text>
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
        </div>
      </Card>

      {/* Dialog de creación */}
      <Dialog open={isCreateDialogOpen} onOpenChange={(_, data) => setIsCreateDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Crear Cliente</DialogTitle>
          <DialogBody>
            <DialogContent>
              <div className={styles.detailsContent}>
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
                <MessageBar intent="info">
                  <MessageBarBody>
                    Se creará automáticamente un tenant para este cliente.
                  </MessageBarBody>
                </MessageBar>
              </div>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button appearance="primary" onClick={handleCreate}>
              Crear
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Dialog de edición */}
      <Dialog open={isEditDialogOpen} onOpenChange={(_, data) => setIsEditDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Editar Cliente</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingTenants ? (
                <div className={styles.loadingContainer}>
                  <Spinner size="medium" label="Verificando tenants..." />
                </div>
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
                <div className={styles.loadingContainer}>
                  <Spinner size="medium" label="Cargando usuarios..." />
                </div>
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
    </div>
  );
};

