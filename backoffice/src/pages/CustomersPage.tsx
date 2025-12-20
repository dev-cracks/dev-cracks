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
  const [customerUsers, setCustomerUsers] = useState<UserDto[]>([]);
  const [customerTenants, setCustomerTenants] = useState<TenantDto[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingTenants, setIsLoadingTenants] = useState(false);
  const [tenantName, setTenantName] = useState('');

  // Form state
  const [formData, setFormData] = useState<CreateCustomerRequest>({
    name: '',
    identification: '',
    countryId: '',
    stateProvince: '',
    city: '',
    phone: '',
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

  const handleEdit = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      identification: customer.identification,
      countryId: customer.countryId,
      stateProvince: customer.stateProvince || '',
      city: customer.city || '',
      phone: customer.phone || '',
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
              });
              setIsCreateDialogOpen(true);
            }}
          >
            Crear Cliente
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Identificación</TableHeaderCell>
              <TableHeaderCell>País</TableHeaderCell>
              <TableHeaderCell>Ciudad</TableHeaderCell>
              <TableHeaderCell>Teléfono</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Tenants</TableHeaderCell>
              <TableHeaderCell>Usuarios</TableHeaderCell>
              <TableHeaderCell className={styles.actionsCell}>Acciones</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.identification}</TableCell>
                <TableCell>{customer.countryName || 'N/A'}</TableCell>
                <TableCell>{customer.city || 'N/A'}</TableCell>
                <TableCell>{customer.phone || 'N/A'}</TableCell>
                <TableCell>
                  {customer.isSuspended ? (
                    <Badge appearance="filled" color="danger">Suspendido</Badge>
                  ) : customer.isActive ? (
                    <Badge appearance="filled" color="success">Activo</Badge>
                  ) : (
                    <Badge appearance="outline">Inactivo</Badge>
                  )}
                </TableCell>
                <TableCell>{customer.tenantCount || 0}</TableCell>
                <TableCell>{customer.userCount || 0}</TableCell>
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
                        <MenuItem icon={<EyeRegular />} onClick={() => handleViewDetails(customer)}>
                          Ver detalles
                        </MenuItem>
                        <MenuItem icon={<EditRegular />} onClick={() => handleEdit(customer)}>
                          Editar
                        </MenuItem>
                        <MenuItem icon={<PeopleRegular />} onClick={() => handleViewUsers(customer)}>
                          Ver usuarios
                        </MenuItem>
                        {customer.isSuspended ? (
                          <MenuItem icon={<PlayRegular />} onClick={() => handleActivate(customer)}>
                            Activar
                          </MenuItem>
                        ) : (
                          <MenuItem icon={<PauseRegular />} onClick={() => handleSuspend(customer)}>
                            Suspender
                          </MenuItem>
                        )}
                        <MenuItem icon={<DeleteRegular />} onClick={() => handleDelete(customer)}>
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

        {filteredCustomers.length === 0 && !isLoading && (
          <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
            <Text>No se encontraron clientes</Text>
          </div>
        )}
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
    </div>
  );
};

