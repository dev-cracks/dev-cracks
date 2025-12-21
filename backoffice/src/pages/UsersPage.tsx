import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Card,
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
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Combobox,
  Option,
  Input,
  Select,
  Persona,
} from '@fluentui/react-components';
import {
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverBody,
  TeachingPopoverFooter,
} from '@fluentui/react-teaching-popover';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-drawer';
import {
  useRestoreFocusSource,
} from '@fluentui/react-components';
import {
  PeopleRegular,
  SearchRegular,
  MoreHorizontalRegular,
  EditRegular,
  DeleteRegular,
  PauseRegular,
  PlayRegular,
  EyeRegular,
  AddRegular,
  DismissRegular,
  ArrowClockwiseRegular,
  ArrowSwapRegular,
  LinkRegular,
  SparkleRegular,
} from '@fluentui/react-icons';
import { userService, UserDto, CreateUserRequest, UpdateUserRequest } from '../services/userService';
import { tenantService, TenantDto } from '../services/tenantService';
import { customerService, CustomerDto, countryService } from '../services/customerService';
import { officeService, OfficeDto } from '../services/officeService';
import { TableSkeleton } from '../components/TableSkeleton';
import { DetailsSkeleton } from '../components/DetailsSkeleton';
import { useRibbonMenu } from '../contexts/RibbonMenuContext';
import { RibbonMenu } from '../components/RibbonMenu';
import { useAuth } from '../hooks/useAuth';

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
  detailsContent: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  formField: {
    marginBottom: tokens.spacingVerticalM,
  },
});

export const UsersPage = () => {
  const styles = useStyles();
  const { addGroup, removeGroup } = useRibbonMenu();
  const { userDetails } = useAuth();
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  
  const [users, setUsers] = useState<UserDto[]>([]);
  const [tenants, setTenants] = useState<TenantDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [customerNames, setCustomerNames] = useState<Record<string, string>>({});
  const [userOffices, setUserOffices] = useState<Record<string, OfficeDto[]>>({});
  const [userTenants, setUserTenants] = useState<Record<string, TenantDto[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isCreateDrawerLoading, setIsCreateDrawerLoading] = useState(false);
  const [isEditDrawerLoading, setIsEditDrawerLoading] = useState(false);
  const [isCustomerDetailsDialogOpen, setIsCustomerDetailsDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null);
  const [isChangeCustomerDialogOpen, setIsChangeCustomerDialogOpen] = useState(false);
  const [selectedNewCustomerId, setSelectedNewCustomerId] = useState<string>('');
  const [isChangingCustomer, setIsChangingCustomer] = useState(false);
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
  const [selectedUserForAssign, setSelectedUserForAssign] = useState<UserDto | null>(null);
  const [selectedTenantId, setSelectedTenantId] = useState<string>('');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('');
  const [availableOffices, setAvailableOffices] = useState<OfficeDto[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [editAvailableOffices, setEditAvailableOffices] = useState<OfficeDto[]>([]);

  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  const loadUsers = useCallback(async () => {
    if (isLoadingRef.current) return;
    try {
      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err: any) {
      console.error('[UsersPage] Error cargando usuarios:', err);
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  const loadTenants = useCallback(async () => {
    try {
      const data = await tenantService.getAllTenants();
      setTenants(data);
    } catch (err: any) {
      console.error('[UsersPage] Error cargando tenants:', err);
    }
  }, []);

  const loadCustomers = useCallback(async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      // Crear un mapa de customerId a customerName
      const namesMap: Record<string, string> = {};
      data.forEach((customer) => {
        namesMap[customer.id] = customer.name;
      });
      setCustomerNames(namesMap);
    } catch (err: any) {
      console.error('[UsersPage] Error cargando clientes:', err);
    }
  }, []);

  const loadUserAssociations = useCallback(async (userId: string) => {
    try {
      // Cargar sedes y tenants asociados directamente al usuario a través de las tablas user_offices y user_tenants
      const [offices, tenants] = await Promise.all([
        userService.getUserOffices(userId),
        userService.getUserTenants(userId),
      ]);

      // Transformar las oficinas al formato OfficeDto
      const officesDto: OfficeDto[] = offices.map((office: any) => ({
        id: office.id,
        name: office.name,
        tenantId: office.tenantId,
        tenantName: office.tenantName,
        customerId: office.customerId,
        customerName: office.customerName,
        address: office.address,
        city: office.city,
        stateProvince: office.stateProvince,
        postalCode: office.postalCode,
        phone: office.phone,
        email: office.email,
        createdAt: office.createdAt,
        updatedAt: office.updatedAt,
        isActive: office.isActive,
        isSuspended: office.isSuspended,
      }));

      // Transformar los tenants al formato TenantDto
      const tenantsDto: TenantDto[] = tenants.map((tenant: any) => ({
        id: tenant.id,
        name: tenant.name,
        customerId: tenant.customerId,
        customerName: tenant.customerName,
        createdAt: tenant.createdAt,
        updatedAt: tenant.updatedAt,
        isActive: tenant.isActive,
        isSuspended: tenant.isSuspended,
      }));

      setUserOffices((prev) => ({ ...prev, [userId]: officesDto }));
      setUserTenants((prev) => ({ ...prev, [userId]: tenantsDto }));
    } catch (err: any) {
      console.error('[UsersPage] Error cargando asociaciones del usuario:', err);
      // Si hay error, establecer arrays vacíos para evitar errores en la UI
      setUserOffices((prev) => ({ ...prev, [userId]: [] }));
      setUserTenants((prev) => ({ ...prev, [userId]: [] }));
    }
  }, []);

  useEffect(() => {
    if (!isLoadingRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadUsers();
      loadTenants();
      loadCustomers();
    }
  }, [loadUsers, loadTenants, loadCustomers]);

  // Cargar asociaciones cuando se cargan los usuarios
  useEffect(() => {
    if (users.length > 0) {
      users.forEach((user) => {
        loadUserAssociations(user.id);
      });
    }
  }, [users, loadUserAssociations]);

  // Registrar acciones en el RibbonMenu
  useEffect(() => {
    addGroup({
      id: 'users',
      label: 'Usuarios',
      icon: <PeopleRegular />,
      items: [
        {
          id: 'create',
          label: 'Nuevo',
          icon: <AddRegular />,
          action: () => {
            setFormData({
              email: '',
              name: '',
              role: 'User',
              tenantId: '',
              customerId: '',
              officeId: '',
              contactEmail: '',
              phone: '',
              auth0Id: '',
            });
            setIsCreateDialogOpen(true);
          },
        },
      ],
    });

    return () => {
      removeGroup('users');
    };
  }, [addGroup, removeGroup]);

  const [formData, setFormData] = useState<CreateUserRequest>({
    email: '',
    name: '',
    role: 'User',
    tenantId: '',
    customerId: '',
    officeId: '',
    contactEmail: '',
    phone: '',
    auth0Id: '',
  });

  // Filtrar usuarios solo si hay un término de búsqueda
  const filteredUsers = searchTerm.trim() === '' 
    ? users 
    : users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleEdit = async (user: UserDto) => {
    setSelectedUser(user);
    
    // Obtener la primera sede del usuario si tiene sedes asociadas
    let initialOfficeId = '';
    const userOfficesList = userOffices[user.id] || [];
    if (userOfficesList.length > 0) {
      initialOfficeId = userOfficesList[0].id;
    }
    
    setFormData({
      email: user.email,
      name: user.name || '',
      role: user.role,
      tenantId: user.tenantId || '',
      customerId: user.customerId || '',
      officeId: initialOfficeId,
      contactEmail: user.contactEmail || '',
      phone: user.phone || '',
      auth0Id: user.auth0Id || '',
    });
    
    // Cargar sedes del tenant actual si existe
    if (user.tenantId) {
      try {
        const offices = await officeService.getOfficesByTenant(user.tenantId);
        setEditAvailableOffices(offices);
      } catch (err: any) {
        console.error('[UsersPage] Error cargando sedes:', err);
        setEditAvailableOffices([]);
      }
    } else {
      setEditAvailableOffices([]);
    }
    
    setIsEditDialogOpen(true);
  };

  const handleCreate = async () => {
    if (!formData.email.trim()) {
      setError('El email es requerido');
      return;
    }

    if (!formData.auth0Id.trim()) {
      setError('El Auth0 ID es requerido');
      return;
    }

    try {
      setError(null);
      setIsCreating(true);
      await userService.createUser(formData);
      setIsCreateDialogOpen(false);
      setIsCreating(false);
      setFormData({
        email: '',
        name: '',
        role: 'User',
        tenantId: '',
        customerId: '',
        officeId: '',
        contactEmail: '',
        phone: '',
        auth0Id: '',
      });
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error al crear usuario');
      setIsCreating(false);
    }
  };

  const handleSave = async () => {
    if (!selectedUser || !formData.email.trim()) {
      setError('El email es requerido');
      return;
    }

    try {
      setError(null);
      setIsSaving(true);
      await userService.updateUser(selectedUser.id, {
        ...formData,
        officeId: formData.officeId || undefined,
      });
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      setIsSaving(false);
      setEditAvailableOffices([]);
      setFormData({
        email: '',
        name: '',
        role: 'User',
        tenantId: '',
        customerId: '',
        officeId: '',
        contactEmail: '',
        phone: '',
        auth0Id: '',
      });
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error al guardar usuario');
      setIsSaving(false);
    }
  };

  const handleDelete = (user: UserDto) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await userService.deleteUser(selectedUser.id);
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar usuario');
    }
  };

  const handleSuspend = async (user: UserDto) => {
    try {
      await userService.suspendUser(user.id);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error al suspender usuario');
    }
  };

  const handleActivate = async (user: UserDto) => {
    try {
      await userService.activateUser(user.id);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error al activar usuario');
    }
  };

  const handleViewDetails = (user: UserDto) => {
    setSelectedUser(user);
    setIsDetailsDialogOpen(true);
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

  const handleChangeCustomer = async (user: UserDto) => {
    setSelectedUser(user);
    setSelectedNewCustomerId(user.customerId || '');
    try {
      setIsChangeCustomerDialogOpen(true);
    } catch (err: any) {
      setError(err.message || 'Error al abrir diálogo de cambio de cliente');
    }
  };

  const handleConfirmChangeCustomer = async () => {
    if (!selectedUser || !selectedNewCustomerId) {
      setError('Debe seleccionar un cliente');
      return;
    }

    if (selectedNewCustomerId === selectedUser.customerId) {
      setError('El cliente seleccionado es el mismo que el actual');
      return;
    }

    try {
      setError(null);
      setIsChangingCustomer(true);
      
      // Obtener el primer tenant del nuevo cliente
      const customerTenants = await customerService.getCustomerTenants(selectedNewCustomerId);
      const newTenantId = customerTenants.length > 0 ? customerTenants[0].id : '';

      // Obtener la primera sede del nuevo cliente si existe
      const customerOffices = await officeService.getOfficesByCustomer(selectedNewCustomerId);
      // Si hay sedes, usar el tenant de la primera sede
      const finalTenantId = customerOffices.length > 0 && customerOffices[0].tenantId 
        ? customerOffices[0].tenantId 
        : newTenantId;

      await userService.updateUser(selectedUser.id, {
        email: selectedUser.email,
        name: selectedUser.name || '',
        role: selectedUser.role,
        customerId: selectedNewCustomerId,
        tenantId: finalTenantId,
        contactEmail: selectedUser.contactEmail || '',
        phone: selectedUser.phone || '',
      });
      
      setIsChangeCustomerDialogOpen(false);
      setSelectedUser(null);
      setSelectedNewCustomerId('');
      await loadUsers();
      setIsChangingCustomer(false);
    } catch (err: any) {
      setError(err.message || 'Error al cambiar cliente del usuario');
      setIsChangingCustomer(false);
    }
  };

  // Cargar sedes cuando se selecciona un tenant
  const handleTenantSelect = async (tenantId: string) => {
    setSelectedTenantId(tenantId);
    setSelectedOfficeId('');
    try {
      const offices = await officeService.getOfficesByTenant(tenantId);
      setAvailableOffices(offices);
    } catch (err: any) {
      console.error('[UsersPage] Error cargando sedes:', err);
      setAvailableOffices([]);
    }
  };

  // Guardar asignación de tenant y sede
  const handleAssignTenantAndOffice = async () => {
    if (!selectedUserForAssign || !selectedTenantId) {
      setError('Debe seleccionar un tenant');
      return;
    }

    try {
      setError(null);
      setIsAssigning(true);

      // Obtener el tenant seleccionado para obtener el customerId
      const selectedTenant = tenants.find(t => t.id === selectedTenantId);
      if (!selectedTenant) {
        setError('Tenant no encontrado');
        setIsAssigning(false);
        return;
      }

      await userService.updateUser(selectedUserForAssign.id, {
        email: selectedUserForAssign.email,
        name: selectedUserForAssign.name || '',
        role: selectedUserForAssign.role,
        tenantId: selectedTenantId,
        customerId: selectedTenant.customerId || selectedUserForAssign.customerId || '',
        officeId: selectedOfficeId || undefined,
        contactEmail: selectedUserForAssign.contactEmail || '',
        phone: selectedUserForAssign.phone || '',
      });

      setIsAssignDrawerOpen(false);
      setSelectedUserForAssign(null);
      setSelectedTenantId('');
      setSelectedOfficeId('');
      setAvailableOffices([]);
      await loadUsers();
      setIsAssigning(false);
    } catch (err: any) {
      setError(err.message || 'Error al asignar tenant y sede');
      setIsAssigning(false);
    }
  };

  // Inicializar por defecto: crear cliente, tenant y sede por defecto y asignar al usuario
  const handleInitializeDefault = async () => {
    if (!selectedUserForAssign) {
      setError('No hay usuario seleccionado');
      return;
    }

    try {
      setError(null);
      setIsInitializing(true);

      // Obtener países para usar el primero disponible
      const countries = await countryService.getAllCountries();
      if (countries.length === 0) {
        setError('No hay países disponibles. Por favor, contacte al administrador.');
        setIsInitializing(false);
        return;
      }

      const defaultCountry = countries[0];

      // Crear nombre del cliente basado en el usuario
      const customerName = selectedUserForAssign.name || selectedUserForAssign.email.split('@')[0];
      const customerIdentification = `USER-${selectedUserForAssign.id.substring(0, 8).toUpperCase()}`;

      // Crear cliente (esto automáticamente crea un tenant y una oficina por defecto)
      const response = await customerService.createCustomer({
        name: `${customerName} - Cliente por Defecto`,
        identification: customerIdentification,
        countryId: defaultCountry.id,
        email: selectedUserForAssign.contactEmail || selectedUserForAssign.email,
        phone: selectedUserForAssign.phone,
      });

      // El backend retorna { customer, tenant, office }, pero el servicio tipa solo CustomerDto
      // Verificar si la respuesta tiene la estructura correcta y extraer el customer
      let newCustomer: CustomerDto;
      
      if (response && typeof response === 'object' && 'customer' in response) {
        // La respuesta tiene la estructura { customer, tenant, office }
        newCustomer = (response as any).customer;
      } else if (response && typeof response === 'object' && 'id' in response) {
        // La respuesta es directamente el CustomerDto
        newCustomer = response as CustomerDto;
      } else {
        setError('Error al crear cliente: respuesta inválida del servidor');
        setIsInitializing(false);
        return;
      }
      
      if (!newCustomer || !newCustomer.id) {
        setError('Error al crear cliente: no se recibió un ID válido');
        setIsInitializing(false);
        return;
      }

      // El backend ya creó el tenant, intentar obtenerlo de la respuesta o consultarlo
      let defaultTenant: TenantDto | null = null;
      
      // Intentar obtener el tenant de la respuesta
      if ((response as any)?.tenant?.id) {
        defaultTenant = (response as any).tenant;
      } else {
        // Si no está en la respuesta, obtener los tenants del cliente
        const customerTenants = await customerService.getCustomerTenants(newCustomer.id);
        if (customerTenants.length === 0) {
          setError('No se pudo crear el tenant por defecto');
          setIsInitializing(false);
          return;
        }
        defaultTenant = customerTenants[0];
      }

      // Asignar el usuario al tenant creado
      if (!defaultTenant || !defaultTenant.id) {
        setError('No se pudo obtener el tenant creado');
        setIsInitializing(false);
        return;
      }

      // Obtener la oficina por defecto creada
      let defaultOffice: OfficeDto | null = null;
      
      // Intentar obtener la oficina de la respuesta
      if ((response as any)?.office?.id) {
        defaultOffice = (response as any).office;
      } else {
        // Si no está en la respuesta, obtener las oficinas del tenant
        const tenantOffices = await officeService.getOfficesByTenant(defaultTenant.id);
        if (tenantOffices.length > 0) {
          defaultOffice = tenantOffices[0];
        }
      }

      await userService.updateUser(selectedUserForAssign.id, {
        email: selectedUserForAssign.email,
        name: selectedUserForAssign.name || '',
        role: selectedUserForAssign.role,
        tenantId: defaultTenant.id,
        customerId: newCustomer.id,
        officeId: defaultOffice?.id || undefined,
        contactEmail: selectedUserForAssign.contactEmail || '',
        phone: selectedUserForAssign.phone || '',
      });

      // Guardar el ID del usuario antes de recargar para poder recargar sus asociaciones después
      const userIdToReload = selectedUserForAssign.id;

      // Recargar datos
      await loadUsers();
      await loadTenants();
      await loadCustomers();

      // Recargar asociaciones del usuario actualizado después de que se hayan cargado los usuarios
      // El useEffect se encargará de cargar las asociaciones automáticamente, pero forzamos la recarga
      // para asegurarnos de que se actualicen inmediatamente
      await loadUserAssociations(userIdToReload);

      setIsAssignDrawerOpen(false);
      setSelectedUserForAssign(null);
      setSelectedTenantId('');
      setSelectedOfficeId('');
      setAvailableOffices([]);
      setIsInitializing(false);
    } catch (err: any) {
      setError(err.message || 'Error al inicializar por defecto');
      setIsInitializing(false);
    }
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

  if (isLoading && users.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <PeopleRegular fontSize={32} />
          <h1 className={styles.title}>Usuarios</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
          <div style={{ flex: 1 }}>
            <SearchBox
              placeholder="Buscar por email, nombre o rol..."
              disabled
              size="large"
              style={{ width: '100%' }}
            />
          </div>
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
        <PeopleRegular fontSize={32} />
        <h1 className={styles.title}>Usuarios</h1>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
        <div style={{ flex: 1 }}>
          <SearchBox
            placeholder="Buscar por email, nombre o rol..."
            value={searchTerm}
            onChange={(e, data) => setSearchTerm(data.value)}
            size="large"
            style={{ width: '100%' }}
          />
        </div>
        <Button
          appearance="primary"
          icon={<ArrowClockwiseRegular />}
          onClick={loadUsers}
          disabled={isLoading}
          title="Actualizar lista de usuarios"
        >
          Actualizar
        </Button>
      </div>

      <Card>
        <CardPreview>
          <div style={{ padding: tokens.spacingVerticalXL }}>
            {error && (
              <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{error}</MessageBarBody>
              </MessageBar>
            )}

            <div style={{ position: 'relative' }}>
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
                  <Spinner size="large" label="Cargando usuarios..." />
                </div>
              )}
              {filteredUsers.length === 0 ? (
                <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                  <Text>No se encontraron usuarios</Text>
                </div>
              ) : (
                <Table style={{ tableLayout: 'auto', width: '100%' }}>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Nombre</TableHeaderCell>
                      <TableHeaderCell>Teléfono</TableHeaderCell>
                      <TableHeaderCell>Sedes</TableHeaderCell>
                      <TableHeaderCell>Tenants</TableHeaderCell>
                      <TableHeaderCell>Rol</TableHeaderCell>
                      <TableHeaderCell>Estado</TableHeaderCell>
                      <TableHeaderCell>Auth0 ID</TableHeaderCell>
                      <TableHeaderCell>Fecha de Creación</TableHeaderCell>
                      <TableHeaderCell>Acciones</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const offices = userOffices[user.id] || [];
                      const associatedTenants = userTenants[user.id] || [];

                      return (
                        <TableRow key={user.id}>
                          {/* Nombre */}
                          <TableCell>
                            <Persona
                              name={user.name || user.email}
                              secondaryText={user.contactEmail || undefined}
                            />
                          </TableCell>
                          {/* Teléfono */}
                          <TableCell>{user.phone || 'N/A'}</TableCell>
                          {/* Sedes */}
                          <TableCell>
                            {offices.length > 0 ? (
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
                                      count={offices.length} 
                                      size="medium" 
                                      appearance="filled" 
                                      color={offices.length === 0 ? 'informative' : 'brand'} 
                                    />
                                  </Button>
                                </TeachingPopoverTrigger>
                                <TeachingPopoverSurface>
                                  <TeachingPopoverHeader>Sedes Asociadas</TeachingPopoverHeader>
                                  <TeachingPopoverBody>
                                    <div style={{ maxWidth: '600px', maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                                      {offices.map((office) => (
                                        <div key={office.id} style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS }}>
                                          <Text weight="semibold">{office.name}</Text>
                                          <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                                            {office.city || 'N/A'} • {office.tenantName || 'N/A'}
                                          </Text>
                                        </div>
                                      ))}
                                    </div>
                                  </TeachingPopoverBody>
                                  <TeachingPopoverFooter primaryButton={{ text: 'Cerrar' }} />
                                </TeachingPopoverSurface>
                              </TeachingPopover>
                            ) : (
                              <Button
                                appearance="subtle"
                                icon={<LinkRegular />}
                                onClick={() => {
                                  setError(null);
                                  setSelectedUserForAssign(user);
                                  setSelectedTenantId('');
                                  setSelectedOfficeId('');
                                  setAvailableOffices([]);
                                  setIsAssignDrawerOpen(true);
                                }}
                                title="Asignar sede y tenant"
                              />
                            )}
                          </TableCell>
                          {/* Tenants */}
                          <TableCell>
                            {associatedTenants.length > 0 ? (
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
                                      count={associatedTenants.length} 
                                      size="medium" 
                                      appearance="filled" 
                                      color={associatedTenants.length === 0 ? 'informative' : 'brand'} 
                                    />
                                  </Button>
                                </TeachingPopoverTrigger>
                                <TeachingPopoverSurface>
                                  <TeachingPopoverHeader>Tenants Asociados</TeachingPopoverHeader>
                                  <TeachingPopoverBody>
                                    <div style={{ maxWidth: '600px', maxHeight: '400px', overflowY: 'auto' }}>
                                      <Table size="small">
                                        <TableHeader>
                                          <TableRow>
                                            <TableHeaderCell>Nombre</TableHeaderCell>
                                            <TableHeaderCell>Cliente</TableHeaderCell>
                                          </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                          {associatedTenants.map((tenant) => (
                                            <TableRow key={tenant.id}>
                                              <TableCell>{tenant.name}</TableCell>
                                              <TableCell>{tenant.customerName || 'N/A'}</TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </div>
                                  </TeachingPopoverBody>
                                  <TeachingPopoverFooter primaryButton={{ text: 'Cerrar' }} />
                                </TeachingPopoverSurface>
                              </TeachingPopover>
                            ) : (
                              <Button
                                appearance="subtle"
                                icon={<LinkRegular />}
                                onClick={() => {
                                  setError(null);
                                  setSelectedUserForAssign(user);
                                  setSelectedTenantId('');
                                  setSelectedOfficeId('');
                                  setAvailableOffices([]);
                                  setIsAssignDrawerOpen(true);
                                }}
                                title="Asignar sede y tenant"
                              />
                            )}
                          </TableCell>
                          {/* Rol */}
                          <TableCell>
                            <Badge
                              appearance={user.role === 'Admin' ? 'filled' : 'outline'}
                              color={user.role === 'Admin' ? 'brand' : 'neutral'}
                            >
                              {getRoleLabel(user.role)}
                            </Badge>
                          </TableCell>
                          {/* Estado */}
                          <TableCell>
                            {user.isSuspended ? (
                              <Badge appearance="filled" color="danger">Suspendido</Badge>
                            ) : user.isActive ? (
                              <Badge appearance="filled" color="success">Activo</Badge>
                            ) : (
                              <Badge appearance="outline">Inactivo</Badge>
                            )}
                          </TableCell>
                          {/* Auth0 ID */}
                          <TableCell>{user.auth0Id || 'N/A'}</TableCell>
                          {/* Fecha de Creación */}
                          <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                          {/* Acciones */}
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
                                  <MenuItem icon={<EyeRegular />} onClick={() => handleViewDetails(user)}>
                                    Ver detalles
                                  </MenuItem>
                                  <MenuItem icon={<EditRegular />} onClick={() => handleEdit(user)}>
                                    Editar
                                  </MenuItem>
                                  {user.isSuspended ? (
                                    <MenuItem icon={<PlayRegular />} onClick={() => handleActivate(user)}>
                                      Activar
                                    </MenuItem>
                                  ) : (
                                    <MenuItem icon={<PauseRegular />} onClick={() => handleSuspend(user)}>
                                      Suspender
                                    </MenuItem>
                                  )}
                                  {user.id !== userDetails?.id && (
                                    <MenuItem icon={<DeleteRegular />} onClick={() => handleDelete(user)}>
                                      Eliminar
                                    </MenuItem>
                                  )}
                                </MenuList>
                              </MenuPopover>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </div>
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
        onOpenChange={(_, data) => setIsCreateDialogOpen(data.open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label="Cerrar"
                icon={<DismissRegular />}
                onClick={() => setIsCreateDialogOpen(false)}
              />
            }
          >
            Nuevo Usuario
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isCreateDrawerLoading || isCreating ? (
              <DetailsSkeleton rows={8} />
            ) : (
              <>
                <Field label="Email" required className={styles.formField}>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Field>
                <Field label="Nombre" className={styles.formField}>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Field>
                <Field label="Rol" className={styles.formField}>
                  <Select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Admin' | 'User' })}
                  >
                    <option value="User">Usuario</option>
                    <option value="Admin">Administrador</option>
                  </Select>
                </Field>
                <Field label="Tenant" className={styles.formField}>
                  <Combobox
                    value={formData.tenantId ? tenants.find((t) => t.id === formData.tenantId)?.name || '' : ''}
                    onOptionSelect={(_, data) => {
                      const tenant = tenants.find((t) => t.name === data.optionValue);
                      if (tenant) {
                        setFormData({ ...formData, tenantId: tenant.id });
                      }
                    }}
                  >
                    {tenants.map((tenant) => (
                      <Option key={tenant.id} value={tenant.name}>
                        {tenant.name}
                      </Option>
                    ))}
                  </Combobox>
                </Field>
                <Field label="Email de Contacto" className={styles.formField}>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </Field>
                <Field label="Auth0 ID" required className={styles.formField}>
                  <Input
                    value={formData.auth0Id}
                    onChange={(e) => setFormData({ ...formData, auth0Id: e.target.value })}
                    placeholder="auth0|..."
                  />
                </Field>
                <Field label="Teléfono" className={styles.formField}>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => setIsCreateDialogOpen(false)}
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
        onOpenChange={(_, data) => {
          setIsEditDialogOpen(data.open);
          if (!data.open) {
            setEditAvailableOffices([]);
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
                onClick={() => setIsEditDialogOpen(false)}
              />
            }
          >
            Editar Usuario
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isEditDrawerLoading || isSaving ? (
              <DetailsSkeleton rows={8} />
            ) : (
              <>
                <Field label="Email" required className={styles.formField}>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </Field>
                <Field label="Nombre" className={styles.formField}>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Field>
                <Field label="Rol" className={styles.formField}>
                  <Select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Admin' | 'User' })}
                  >
                    <option value="User">Usuario</option>
                    <option value="Admin">Administrador</option>
                  </Select>
                </Field>
                <Field label="Tenant" className={styles.formField}>
                  <Combobox
                    value={formData.tenantId ? tenants.find((t) => t.id === formData.tenantId)?.name || '' : ''}
                    onOptionSelect={async (_, data) => {
                      const tenant = tenants.find((t) => t.name === data.optionValue);
                      if (tenant) {
                        setFormData({ ...formData, tenantId: tenant.id, officeId: '' });
                        // Cargar sedes del tenant seleccionado
                        try {
                          const offices = await officeService.getOfficesByTenant(tenant.id);
                          setEditAvailableOffices(offices);
                          // Establecer la primera sede por defecto si existe
                          if (offices.length > 0) {
                            setFormData(prev => ({ ...prev, tenantId: tenant.id, officeId: offices[0].id }));
                          }
                        } catch (err: any) {
                          console.error('[UsersPage] Error cargando sedes:', err);
                          setEditAvailableOffices([]);
                        }
                      }
                    }}
                  >
                    {tenants.map((tenant) => (
                      <Option key={tenant.id} value={tenant.name}>
                        {tenant.name}
                      </Option>
                    ))}
                  </Combobox>
                </Field>
                {formData.tenantId && (
                  <Field label="Sede" className={styles.formField}>
                    <Combobox
                      value={formData.officeId ? editAvailableOffices.find((o) => o.id === formData.officeId)?.name || '' : ''}
                      onOptionSelect={(_, data) => {
                        const office = editAvailableOffices.find((o) => o.name === data.optionValue);
                        if (office) {
                          setFormData({ ...formData, officeId: office.id });
                        }
                      }}
                    >
                      {editAvailableOffices.length > 0 ? (
                        editAvailableOffices.map((office) => (
                          <Option key={office.id} value={office.name}>
                            {office.name} {office.city ? `- ${office.city}` : ''}
                          </Option>
                        ))
                      ) : (
                        <Option value="" disabled>
                          No hay sedes disponibles para este tenant
                        </Option>
                      )}
                    </Combobox>
                  </Field>
                )}
                <Field label="Email de Contacto" className={styles.formField}>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </Field>
                <Field label="Auth0 ID" className={styles.formField}>
                  <Input
                    value={formData.auth0Id}
                    readOnly
                    placeholder="auth0|..."
                  />
                </Field>
                <Field label="Teléfono" className={styles.formField}>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => setIsEditDialogOpen(false)}
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
                ¿Está seguro de que desea eliminar el usuario "{selectedUser?.name || selectedUser?.email}"? Esta acción no se puede deshacer.
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
        onOpenChange={(_, data) => setIsDetailsDialogOpen(data.open)}
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
                  setSelectedUser(null);
                }}
              />
            }
          >
            Detalles del Usuario
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isDetailsLoading ? (
              <DetailsSkeleton rows={8} />
            ) : selectedUser ? (
              <>
                <Field label="Email" className={styles.formField}>
                  <Input value={selectedUser.email} readOnly />
                </Field>
                <Field label="Nombre" className={styles.formField}>
                  <Input value={selectedUser.name || 'N/A'} readOnly />
                </Field>
                <Field label="Rol" className={styles.formField}>
                  <Input value={getRoleLabel(selectedUser.role)} readOnly />
                </Field>
                <Field label="Estado" className={styles.formField}>
                  <div>
                    {selectedUser.isSuspended ? (
                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                    ) : selectedUser.isActive ? (
                      <Badge appearance="filled" color="success">Activo</Badge>
                    ) : (
                      <Badge appearance="outline">Inactivo</Badge>
                    )}
                  </div>
                </Field>
                <Field label="Email de Contacto" className={styles.formField}>
                  <Input value={selectedUser.contactEmail || 'N/A'} readOnly />
                </Field>
                <Field label="Auth0 ID" className={styles.formField}>
                  <Input value={selectedUser.auth0Id || 'N/A'} readOnly />
                </Field>
                <Field label="Teléfono" className={styles.formField}>
                  <Input value={selectedUser.phone || 'N/A'} readOnly />
                </Field>
                <Field label="Creado" className={styles.formField}>
                  <Input value={new Date(selectedUser.createdAt).toLocaleString()} readOnly />
                </Field>
                <Field label="Actualizado" className={styles.formField}>
                  <Input value={new Date(selectedUser.updatedAt).toLocaleString()} readOnly />
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

      {/* Dialog de cambiar cliente */}
      <Dialog open={isChangeCustomerDialogOpen} onOpenChange={(_, data) => setIsChangeCustomerDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Cambiar Cliente del Usuario</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                Seleccione un nuevo cliente para el usuario "{selectedUser?.name || selectedUser?.email}".
                Al cambiar el cliente, también se actualizarán la sede y el tenant asociados.
              </Text>
              <Field label="Cliente" required className={styles.formField} style={{ marginTop: tokens.spacingVerticalM }}>
                <Combobox
                  value={customers.find(c => c.id === selectedNewCustomerId)?.name || ''}
                  onOptionSelect={(_, data) => {
                    const customer = customers.find((c) => c.name === data.optionValue);
                    if (customer) {
                      setSelectedNewCustomerId(customer.id);
                    }
                  }}
                >
                  {customers.map((customer) => (
                    <Option key={customer.id} value={customer.name}>
                      {customer.name}
                    </Option>
                  ))}
                </Combobox>
              </Field>
              {selectedUser?.customerId && customerNames[selectedUser.customerId] && (
                <Text size={300} style={{ marginTop: tokens.spacingVerticalS, color: tokens.colorNeutralForeground3 }}>
                  Cliente actual: {customerNames[selectedUser.customerId]}
                </Text>
              )}
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button 
              appearance="secondary" 
              onClick={() => {
                setIsChangeCustomerDialogOpen(false);
                setSelectedNewCustomerId('');
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

      {/* Drawer para asignar tenant y sede */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isAssignDrawerOpen}
        modalType="alert"
        onOpenChange={(_, data) => {
          setIsAssignDrawerOpen(data.open);
          if (!data.open) {
            setSelectedUserForAssign(null);
            setSelectedTenantId('');
            setSelectedOfficeId('');
            setAvailableOffices([]);
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
                onClick={() => setIsAssignDrawerOpen(false)}
              />
            }
          >
            Asignar Tenant y Sede
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {error && (
              <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{error}</MessageBarBody>
              </MessageBar>
            )}
            {selectedUserForAssign && (
              <>
                <Field label="Usuario" className={styles.formField}>
                  <Input 
                    value={selectedUserForAssign.name || selectedUserForAssign.email} 
                    readOnly 
                  />
                </Field>
                <div style={{ marginBottom: tokens.spacingVerticalM }}>
                  <Button
                    appearance="secondary"
                    icon={<SparkleRegular />}
                    onClick={handleInitializeDefault}
                    disabled={isInitializing || isAssigning}
                    style={{ width: '100%' }}
                  >
                    {isInitializing ? 'Inicializando...' : 'Inicializar por Defecto'}
                  </Button>
                  <Text size={300} style={{ marginTop: tokens.spacingVerticalS, color: tokens.colorNeutralForeground3, display: 'block' }}>
                    Crea un cliente, tenant y sede por defecto y los asigna a este usuario
                  </Text>
                </div>
                <Field label="Tenant" required className={styles.formField}>
                  <Combobox
                    value={selectedTenantId ? tenants.find((t) => t.id === selectedTenantId)?.name || '' : ''}
                    onOptionSelect={(_, data) => {
                      const tenant = tenants.find((t) => t.name === data.optionValue);
                      if (tenant) {
                        handleTenantSelect(tenant.id);
                      }
                    }}
                  >
                    {tenants.map((tenant) => (
                      <Option key={tenant.id} value={tenant.name}>
                        {tenant.name}
                      </Option>
                    ))}
                  </Combobox>
                </Field>
                {selectedTenantId && (
                  <Field label="Sede" className={styles.formField}>
                    <Combobox
                      value={selectedOfficeId ? availableOffices.find((o) => o.id === selectedOfficeId)?.name || '' : ''}
                      onOptionSelect={(_, data) => {
                        const office = availableOffices.find((o) => o.name === data.optionValue);
                        if (office) {
                          setSelectedOfficeId(office.id);
                        }
                      }}
                    >
                      {availableOffices.length > 0 ? (
                        availableOffices.map((office) => (
                          <Option key={office.id} value={office.name}>
                            {office.name} {office.city ? `- ${office.city}` : ''}
                          </Option>
                        ))
                      ) : (
                        <Option value="" disabled>
                          No hay sedes disponibles para este tenant
                        </Option>
                      )}
                    </Combobox>
                  </Field>
                )}
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => setIsAssignDrawerOpen(false)}
                    disabled={isAssigning || isInitializing}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    appearance="primary" 
                    onClick={handleAssignTenantAndOffice}
                    disabled={isAssigning || isInitializing || !selectedTenantId}
                  >
                    {isAssigning ? 'Asignando...' : 'Asignar'}
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
