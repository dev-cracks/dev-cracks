import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
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
import { UserDetailsView } from '../components/UserDetailsView';

// Helper to convert role to text in English
function getRoleLabel(role: 'Admin' | 'User'): string {
  return role === 'Admin' ? 'Administrator' : 'User';
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
  const { t } = useTranslation('backoffice');
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
  const [isUserDetailsViewOpen, setIsUserDetailsViewOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
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
  const [createAvailableOffices, setCreateAvailableOffices] = useState<OfficeDto[]>([]);

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
      console.error('[UsersPage] Error loading tenants:', err);
    }
  }, []);

  const loadCustomers = useCallback(async () => {
    try {
      const data = await customerService.getAllCustomers();
      setCustomers(data);
      // Create a map of customerId to customerName
      const namesMap: Record<string, string> = {};
      data.forEach((customer) => {
        namesMap[customer.id] = customer.name;
      });
      setCustomerNames(namesMap);
    } catch (err: any) {
      console.error('[UsersPage] Error loading customers:', err);
    }
  }, []);

  const loadUserAssociations = useCallback(async (userId: string) => {
    try {
      // Load offices and tenants directly associated with user through user_offices and user_tenants tables
      const [offices, tenants] = await Promise.all([
        userService.getUserOffices(userId),
        userService.getUserTenants(userId),
      ]);

      // Transform offices to OfficeDto format
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

      // Transform tenants to TenantDto format
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
      console.error('[UsersPage] Error loading user associations:', err);
      // If there's an error, set empty arrays to avoid UI errors
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

  // Load associations when users are loaded
  useEffect(() => {
    if (users.length > 0) {
      users.forEach((user) => {
        loadUserAssociations(user.id);
      });
    }
  }, [users, loadUserAssociations]);

  // Register actions in RibbonMenu
  useEffect(() => {
    addGroup({
      id: 'users',
      label: 'Users',
      icon: <PeopleRegular />,
      items: [
        {
          id: 'create',
          label: t('ribbonBar.new'),
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

  // Filter users only if there's a search term
  const filteredUsers = searchTerm.trim() === '' 
    ? users 
    : users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const handleEdit = async (user: UserDto) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsUserDetailsViewOpen(true);
  };

  const handleCreate = async () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }

    try {
      setError(null);
      setIsCreating(true);
      // If auth0Id is not provided, backend will create it automatically in Auth0
      const userRequest = {
        ...formData,
        auth0Id: formData.auth0Id?.trim() || undefined,
      };
      await userService.createUser(userRequest);
      setIsCreateDialogOpen(false);
      setIsCreating(false);
      setCreateAvailableOffices([]);
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
      setError(err.message || 'Error creating user');
      setIsCreating(false);
    }
  };

  const handleSave = async () => {
    if (!selectedUser || !formData.email.trim()) {
      setError('Email is required');
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
      setError(err.message || 'Error saving user');
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
      setError(err.message || 'Error deleting user');
    }
  };

  const handleSuspend = async (user: UserDto) => {
    try {
      await userService.suspendUser(user.id);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error suspending user');
    }
  };

  const handleActivate = async (user: UserDto) => {
    try {
      await userService.activateUser(user.id);
      await loadUsers();
    } catch (err: any) {
      setError(err.message || 'Error activating user');
    }
  };

  const handleViewDetails = (user: UserDto) => {
    setSelectedUser(user);
    setIsEditMode(false);
    setIsUserDetailsViewOpen(true);
  };

  const handleViewCustomerDetails = async (customerId: string) => {
    try {
      const customer = await customerService.getCustomerById(customerId);
      setSelectedCustomer(customer);
      setIsCustomerDetailsDialogOpen(true);
    } catch (err: any) {
      setError(err.message || 'Error loading customer details');
    }
  };

  const handleChangeCustomer = async (user: UserDto) => {
    setSelectedUser(user);
    setSelectedNewCustomerId(user.customerId || '');
    try {
      setIsChangeCustomerDialogOpen(true);
    } catch (err: any) {
      setError(err.message || 'Error opening change customer dialog');
    }
  };

  const handleConfirmChangeCustomer = async () => {
    if (!selectedUser || !selectedNewCustomerId) {
      setError('Must select a customer');
      return;
    }

    if (selectedNewCustomerId === selectedUser.customerId) {
      setError('Selected customer is the same as the current one');
      return;
    }

    try {
      setError(null);
      setIsChangingCustomer(true);
      
      // Get first tenant from new customer
      const customerTenants = await customerService.getCustomerTenants(selectedNewCustomerId);
      const newTenantId = customerTenants.length > 0 ? customerTenants[0].id : '';

      // Get first office from new customer if it exists
      const customerOffices = await officeService.getOfficesByCustomer(selectedNewCustomerId);
      // If there are offices, use tenant from first office
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
      setError(err.message || 'Error changing user customer');
      setIsChangingCustomer(false);
    }
  };

  // Load offices when a tenant is selected
  const handleTenantSelect = async (tenantId: string) => {
    setSelectedTenantId(tenantId);
    setSelectedOfficeId('');
    try {
      const offices = await officeService.getOfficesByTenant(tenantId);
      setAvailableOffices(offices);
    } catch (err: any) {
      console.error('[UsersPage] Error loading offices:', err);
      setAvailableOffices([]);
    }
  };

  // Save tenant and office assignment
  const handleAssignTenantAndOffice = async () => {
    if (!selectedUserForAssign || !selectedTenantId) {
      setError('Must select a tenant');
      return;
    }

    try {
      setError(null);
      setIsAssigning(true);

      // Get selected tenant to obtain customerId
      const selectedTenant = tenants.find(t => t.id === selectedTenantId);
      if (!selectedTenant) {
        setError('Tenant not found');
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
      setError(err.message || 'Error assigning tenant and office');
      setIsAssigning(false);
    }
  };

  // Initialize default: create default customer, tenant and office and assign to user
  const handleInitializeDefault = async () => {
    if (!selectedUserForAssign) {
      setError('No user selected');
      return;
    }

    try {
      setError(null);
      setIsInitializing(true);

      // Get countries to use first available
      const countries = await countryService.getAllCountries();
      if (countries.length === 0) {
        setError('No countries available. Please contact administrator.');
        setIsInitializing(false);
        return;
      }

      const defaultCountry = countries[0];

      // Create customer name based on user
      const customerName = selectedUserForAssign.name || selectedUserForAssign.email.split('@')[0];
      const customerIdentification = `USER-${selectedUserForAssign.id.substring(0, 8).toUpperCase()}`;

      // Create customer (this automatically creates a default tenant and office)
      const response = await customerService.createCustomer({
        name: `${customerName} - Default Customer`,
        identification: customerIdentification,
        countryId: defaultCountry.id,
        email: selectedUserForAssign.contactEmail || selectedUserForAssign.email,
        phone: selectedUserForAssign.phone,
      });

      // Backend returns { customer, tenant, office }, but service only types CustomerDto
      // Verify if response has correct structure and extract customer
      let newCustomer: CustomerDto;
      
      if (response && typeof response === 'object' && 'customer' in response) {
        // Response has structure { customer, tenant, office }
        newCustomer = (response as any).customer;
      } else if (response && typeof response === 'object' && 'id' in response) {
        // Response is directly CustomerDto
        newCustomer = response as CustomerDto;
      } else {
        setError('Error creating customer: invalid server response');
        setIsInitializing(false);
        return;
      }
      
      if (!newCustomer || !newCustomer.id) {
        setError('Error creating customer: no valid ID received');
        setIsInitializing(false);
        return;
      }

      // Backend already created tenant, try to get it from response or query it
      let defaultTenant: TenantDto | null = null;
      
      // Try to get tenant from response
      if ((response as any)?.tenant?.id) {
        defaultTenant = (response as any).tenant;
      } else {
        // If not in response, get customer tenants
        const customerTenants = await customerService.getCustomerTenants(newCustomer.id);
        if (customerTenants.length === 0) {
          setError('Could not create default tenant');
          setIsInitializing(false);
          return;
        }
        defaultTenant = customerTenants[0];
      }

      // Assign user to created tenant
      if (!defaultTenant || !defaultTenant.id) {
        setError('Could not get created tenant');
        setIsInitializing(false);
        return;
      }

      // Get default created office
      let defaultOffice: OfficeDto | null = null;
      
      // Try to get office from response
      if ((response as any)?.office?.id) {
        defaultOffice = (response as any).office;
      } else {
        // If not in response, get tenant offices
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

      // Save user ID before reloading to reload associations afterwards
      const userIdToReload = selectedUserForAssign.id;

      // Reload data
      await loadUsers();
      await loadTenants();
      await loadCustomers();

      // Reload updated user associations after users have been loaded
      // useEffect will automatically load associations, but we force reload
      // to ensure they update immediately
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

  // Handle loading of details drawer
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

  // Handle loading of create drawer
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

  // Handle loading of edit drawer
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
          <h1 className={styles.title}>{t('users.title')}</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
          <div style={{ flex: 1 }}>
            <SearchBox
              placeholder={t('users.searchPlaceholder')}
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
        <h1 className={styles.title}>{t('users.title')}</h1>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
        <div style={{ flex: 1 }}>
          <SearchBox
            placeholder={t('users.searchPlaceholder')}
            value={searchTerm}
            onChange={(e, data) => setSearchTerm(data.value)}
            size="large"
            style={{ width: '100%' }}
          />
        </div>
        <Button
          appearance="default"
          icon={<ArrowClockwiseRegular />}
          onClick={loadUsers}
          disabled={isLoading}
          title={t('users.refreshTitle')}
        >
          {t('users.refresh')}
        </Button>
      </div>

      <Card>
        <CardPreview>
          <div style={{ padding: tokens.spacingVerticalXL }}>
            {error && (
              <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{error.startsWith('common.') || error.startsWith('users.') || error.startsWith('customers.') || error.startsWith('offices.') || error.startsWith('subscriptions.') ? t(error as any) : error}</MessageBarBody>
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
                  <Spinner size="large" label={t('users.loadingUsers')} />
                </div>
              )}
              {filteredUsers.length === 0 ? (
                <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                  <Text>{t('users.noUsersFound')}</Text>
                </div>
              ) : (
                <Table style={{ tableLayout: 'auto', width: '100%' }}>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>{t('users.name')}</TableHeaderCell>
                      <TableHeaderCell>{t('users.phone')}</TableHeaderCell>
                      <TableHeaderCell>{t('users.tenants')}</TableHeaderCell>
                      <TableHeaderCell>{t('users.offices')}</TableHeaderCell>
                      <TableHeaderCell>{t('users.role')}</TableHeaderCell>
                      <TableHeaderCell>{t('users.status')}</TableHeaderCell>
                      <TableHeaderCell>{t('users.auth0Id')}</TableHeaderCell>
                      <TableHeaderCell>{t('users.creationDate')}</TableHeaderCell>
                      <TableHeaderCell>{t('users.actions')}</TableHeaderCell>
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
                          <TableCell>{user.phone || t('common.notAvailable')}</TableCell>
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
                                  <TeachingPopoverHeader>{t('users.associatedTenants')}</TeachingPopoverHeader>
                                  <TeachingPopoverBody>
                                    <div style={{ maxWidth: '600px', maxHeight: '400px', overflowY: 'auto' }}>
                                      <Table size="small">
                                        <TableHeader>
                                          <TableRow>
                                            <TableHeaderCell>{t('users.name')}</TableHeaderCell>
                                            <TableHeaderCell>{t('users.customerDetails')}</TableHeaderCell>
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
                                title="Assign office and tenant"
                              />
                            )}
                          </TableCell>
                          {/* Offices */}
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
                                  <TeachingPopoverHeader>{t('users.associatedOffices')}</TeachingPopoverHeader>
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
                                title="Assign office and tenant"
                              />
                            )}
                          </TableCell>
                          {/* Role */}
                          <TableCell>
                            <Badge
                              appearance={user.role === 'Admin' ? 'filled' : 'outline'}
                              color={user.role === 'Admin' ? 'brand' : 'neutral'}
                            >
                              {getRoleLabel(user.role)}
                            </Badge>
                          </TableCell>
                          {/* Status */}
                          <TableCell>
                            {user.isSuspended ? (
                              <Badge appearance="filled" color="danger">Suspended</Badge>
                            ) : user.isActive ? (
                              <Badge appearance="filled" color="success">Active</Badge>
                            ) : (
                              <Badge appearance="outline">Inactive</Badge>
                            )}
                          </TableCell>
                          {/* Auth0 ID */}
                          <TableCell>{user.auth0Id || 'N/A'}</TableCell>
                          {/* Creation Date */}
                          <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                          {/* Actions */}
                          <TableCell>
                            <Menu>
                              <MenuTrigger disableButtonEnhancement>
                                <Button
                                  appearance="subtle"
                                  icon={<MoreHorizontalRegular />}
                                  aria-label="More actions"
                                />
                              </MenuTrigger>
                              <MenuPopover>
                                <MenuList>
                                  <MenuItem icon={<EyeRegular />} onClick={() => handleViewDetails(user)}>
                                    {t('users.viewDetails')}
                                  </MenuItem>
                                  <MenuItem icon={<EditRegular />} onClick={() => handleEdit(user)}>
                                    Edit
                                  </MenuItem>
                                  {user.isSuspended ? (
                                    <MenuItem icon={<PlayRegular />} onClick={() => handleActivate(user)}>
                                      Activate
                                    </MenuItem>
                                  ) : (
                                    <MenuItem icon={<PauseRegular />} onClick={() => handleSuspend(user)}>
                                      Suspend
                                    </MenuItem>
                                  )}
                                  {user.id !== userDetails?.id && (
                                    <MenuItem icon={<DeleteRegular />} onClick={() => handleDelete(user)}>
                                      Delete
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
        onOpenChange={(_, data) => {
          setIsCreateDialogOpen(data.open);
          if (!data.open) {
            setCreateAvailableOffices([]);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => setIsCreateDialogOpen(false)}
              />
            }
          >
            {t('users.newUser')}
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
                <Field label="Name" className={styles.formField}>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Field>
                <Field label="Role" className={styles.formField}>
                  <Select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Admin' | 'User' })}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Administrator</option>
                  </Select>
                </Field>
                <Field label="Tenant" className={styles.formField}>
                  <Combobox
                    value={formData.tenantId ? tenants.find((t) => t.id === formData.tenantId)?.name || '' : ''}
                    onOptionSelect={async (_, data) => {
                      const tenant = tenants.find((t) => t.name === data.optionValue);
                      if (tenant) {
                        setFormData({ ...formData, tenantId: tenant.id, officeId: '' });
                        // Load offices from selected tenant
                        try {
                          const offices = await officeService.getOfficesByTenant(tenant.id);
                          setCreateAvailableOffices(offices);
                        } catch (err: any) {
                          console.error('[UsersPage] Error loading offices:', err);
                          setCreateAvailableOffices([]);
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
                  <Field label="Office" className={styles.formField}>
                    <Combobox
                      value={formData.officeId ? createAvailableOffices.find((o) => o.id === formData.officeId)?.name || '' : ''}
                      onOptionSelect={(_, data) => {
                        const office = createAvailableOffices.find((o) => o.name === data.optionValue);
                        if (office) {
                          setFormData({ ...formData, officeId: office.id });
                        }
                      }}
                    >
                      {createAvailableOffices.length > 0 ? (
                        createAvailableOffices.map((office) => (
                          <Option key={office.id} value={office.name}>
                            {office.name} {office.city ? `- ${office.city}` : ''}
                          </Option>
                        ))
                      ) : (
                        <Option value="" disabled>
                          No offices available for this tenant
                        </Option>
                      )}
                    </Combobox>
                  </Field>
                )}
                <Field label="Contact Email" className={styles.formField}>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </Field>
                <Field label="Auth0 ID (optional)" className={styles.formField}>
                  <Input
                    value={formData.auth0Id}
                    onChange={(e) => setFormData({ ...formData, auth0Id: e.target.value })}
                    placeholder="Will be generated automatically if left empty"
                  />
                </Field>
                <Field label="Phone" className={styles.formField}>
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
                    Cancel
                  </Button>
                  <Button appearance="primary" onClick={handleCreate} disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create'}
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
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => setIsEditDialogOpen(false)}
              />
            }
          >
            Edit User
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
                <Field label="Name" className={styles.formField}>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Field>
                <Field label="Role" className={styles.formField}>
                  <Select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as 'Admin' | 'User' })}
                  >
                    <option value="User">User</option>
                    <option value="Admin">Administrator</option>
                  </Select>
                </Field>
                <Field label="Tenant" className={styles.formField}>
                  <Combobox
                    value={formData.tenantId ? tenants.find((t) => t.id === formData.tenantId)?.name || '' : ''}
                    onOptionSelect={async (_, data) => {
                      const tenant = tenants.find((t) => t.name === data.optionValue);
                      if (tenant) {
                        setFormData({ ...formData, tenantId: tenant.id, officeId: '' });
                        // Load offices from selected tenant
                        try {
                          const offices = await officeService.getOfficesByTenant(tenant.id);
                          setEditAvailableOffices(offices);
                          // Set first office by default if exists
                          if (offices.length > 0) {
                            setFormData(prev => ({ ...prev, tenantId: tenant.id, officeId: offices[0].id }));
                          }
                        } catch (err: any) {
                          console.error('[UsersPage] Error loading offices:', err);
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
                  <Field label="Office" className={styles.formField}>
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
                          No offices available for this tenant
                        </Option>
                      )}
                    </Combobox>
                  </Field>
                )}
                <Field label="Contact Email" className={styles.formField}>
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
                <Field label="Phone" className={styles.formField}>
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
                    Cancel
                  </Button>
                  <Button appearance="primary" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
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
          <DialogTitle>Confirm deletion</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                Are you sure you want to delete the user "{selectedUser?.name || selectedUser?.email}"? This action cannot be undone.
              </Text>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={handleConfirmDelete}>
              Delete
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
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => {
                  setIsDetailsDialogOpen(false);
                  setSelectedUser(null);
                }}
              />
            }
          >
            User Details
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
                <Field label="Name" className={styles.formField}>
                  <Input value={selectedUser.name || 'N/A'} readOnly />
                </Field>
                <Field label="Role" className={styles.formField}>
                  <Input value={getRoleLabel(selectedUser.role)} readOnly />
                </Field>
                <Field label="Status" className={styles.formField}>
                  <div>
                    {selectedUser.isSuspended ? (
                      <Badge appearance="filled" color="danger">Suspended</Badge>
                    ) : selectedUser.isActive ? (
                      <Badge appearance="filled" color="success">Active</Badge>
                    ) : (
                      <Badge appearance="outline">Inactive</Badge>
                    )}
                  </div>
                </Field>
                <Field label="Contact Email" className={styles.formField}>
                  <Input value={selectedUser.contactEmail || 'N/A'} readOnly />
                </Field>
                <Field label="Auth0 ID" className={styles.formField}>
                  <Input value={selectedUser.auth0Id || 'N/A'} readOnly />
                </Field>
                <Field label="Phone" className={styles.formField}>
                  <Input value={selectedUser.phone || 'N/A'} readOnly />
                </Field>
                <Field label="Created" className={styles.formField}>
                  <Input value={new Date(selectedUser.createdAt).toLocaleString()} readOnly />
                </Field>
                <Field label="Updated" className={styles.formField}>
                  <Input value={new Date(selectedUser.updatedAt).toLocaleString()} readOnly />
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button appearance="primary" onClick={() => setIsDetailsDialogOpen(false)}>
                    Close
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
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => {
                  setIsCustomerDetailsDialogOpen(false);
                  setSelectedCustomer(null);
                }}
              />
            }
          >
            Customer Details
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {selectedCustomer && (
              <>
                <Field label="Name" className={styles.formField}>
                  <Input value={selectedCustomer.name} readOnly />
                </Field>
                <Field label="Identification" className={styles.formField}>
                  <Input value={selectedCustomer.identification} readOnly />
                </Field>
                <Field label="Country" className={styles.formField}>
                  <Input value={selectedCustomer.countryName || 'N/A'} readOnly />
                </Field>
                <Field label="State/Province" className={styles.formField}>
                  <Input value={selectedCustomer.stateProvince || 'N/A'} readOnly />
                </Field>
                <Field label="City" className={styles.formField}>
                  <Input value={selectedCustomer.city || 'N/A'} readOnly />
                </Field>
                <Field label="Phone" className={styles.formField}>
                  <Input value={selectedCustomer.phone || 'N/A'} readOnly />
                </Field>
                <Field label="Email" className={styles.formField}>
                  <Input value={selectedCustomer.email || 'N/A'} readOnly />
                </Field>
                <Field label="Status" className={styles.formField}>
                  <div>
                    {selectedCustomer.isSuspended ? (
                      <Badge appearance="filled" color="danger">Suspended</Badge>
                    ) : selectedCustomer.isActive ? (
                      <Badge appearance="filled" color="success">Active</Badge>
                    ) : (
                      <Badge appearance="outline">Inactive</Badge>
                    )}
                  </div>
                </Field>
                <Field label="Tenants" className={styles.formField}>
                  <Input value={String(selectedCustomer.tenantCount || 0)} readOnly />
                </Field>
                <Field label="Users" className={styles.formField}>
                  <Input value={String(selectedCustomer.userCount || 0)} readOnly />
                </Field>
                <Field label="Created" className={styles.formField}>
                  <Input value={new Date(selectedCustomer.createdAt).toLocaleString()} readOnly />
                </Field>
                <Field label="Updated" className={styles.formField}>
                  <Input value={new Date(selectedCustomer.updatedAt).toLocaleString()} readOnly />
                </Field>
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button appearance="primary" onClick={() => setIsCustomerDetailsDialogOpen(false)}>
                    Close
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
          <DialogTitle>Change User Customer</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                Select a new customer for user "{selectedUser?.name || selectedUser?.email}".
                When changing the customer, the associated office and tenant will also be updated.
              </Text>
              <Field label="Customer" required className={styles.formField} style={{ marginTop: tokens.spacingVerticalM }}>
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
                  Current customer: {customerNames[selectedUser.customerId]}
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
              Cancel
            </Button>
            <Button 
              appearance="primary" 
              onClick={handleConfirmChangeCustomer}
              disabled={isChangingCustomer || !selectedNewCustomerId}
            >
              {isChangingCustomer ? 'Changing...' : 'Change Customer'}
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
                aria-label="Close"
                icon={<DismissRegular />}
                onClick={() => setIsAssignDrawerOpen(false)}
              />
            }
          >
            Assign Tenant and Office
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {error && (
              <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{error.startsWith('common.') || error.startsWith('users.') || error.startsWith('customers.') || error.startsWith('offices.') || error.startsWith('subscriptions.') ? t(error as any) : error}</MessageBarBody>
              </MessageBar>
            )}
            {selectedUserForAssign && (
              <>
                <Field label="User" className={styles.formField}>
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
                    {isInitializing ? 'Initializing...' : 'Initialize Default'}
                  </Button>
                  <Text size={300} style={{ marginTop: tokens.spacingVerticalS, color: tokens.colorNeutralForeground3, display: 'block' }}>
                    Creates a default customer, tenant and office and assigns them to this user
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
                  <Field label="Office" className={styles.formField}>
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
                          No offices available for this tenant
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
                    Cancel
                  </Button>
                  <Button 
                    appearance="primary" 
                    onClick={handleAssignTenantAndOffice}
                    disabled={isAssigning || isInitializing || !selectedTenantId}
                  >
                    {isAssigning ? 'Assigning...' : 'Assign'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Vista de detalles/edición con tabs */}
      <UserDetailsView
        user={selectedUser}
        isOpen={isUserDetailsViewOpen}
        onClose={() => {
          setIsUserDetailsViewOpen(false);
          setSelectedUser(null);
          setIsEditMode(false);
        }}
        onUserUpdated={async () => {
          await loadUsers();
          // Recargar asociaciones del usuario si está seleccionado
          if (selectedUser) {
            await loadUserAssociations(selectedUser.id);
          }
        }}
        isEditMode={isEditMode}
      />
    </div>
  );
};
