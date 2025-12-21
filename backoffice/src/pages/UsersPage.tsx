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
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Combobox,
  Option,
  Input,
  Select,
} from '@fluentui/react-components';
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
} from '@fluentui/react-icons';
import { userService, UserDto, CreateUserRequest, UpdateUserRequest } from '../services/userService';
import { tenantService, TenantDto } from '../services/tenantService';
import { TableSkeleton } from '../components/TableSkeleton';
import { DetailsSkeleton } from '../components/DetailsSkeleton';
import { useRibbonMenu } from '../contexts/RibbonMenuContext';
import { RibbonMenu } from '../components/RibbonMenu';
import { useAuth } from '../hooks/useAuth';

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

  useEffect(() => {
    if (!isLoadingRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadUsers();
      loadTenants();
    }
  }, [loadUsers, loadTenants]);

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
              contactEmail: '',
              phone: '',
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
    contactEmail: '',
    phone: '',
  });

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user: UserDto) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      name: user.name || '',
      role: user.role,
      tenantId: user.tenantId || '',
      customerId: user.customerId || '',
      contactEmail: user.contactEmail || '',
      phone: user.phone || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleCreate = async () => {
    if (!formData.email.trim()) {
      setError('El email es requerido');
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
        contactEmail: '',
        phone: '',
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
      await userService.updateUser(selectedUser.id, formData);
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      setIsSaving(false);
      setFormData({
        email: '',
        name: '',
        role: 'User',
        tenantId: '',
        customerId: '',
        contactEmail: '',
        phone: '',
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
                      <TableHeaderCell>Email</TableHeaderCell>
                      <TableHeaderCell>Nombre</TableHeaderCell>
                      <TableHeaderCell>Rol</TableHeaderCell>
                      <TableHeaderCell>Estado</TableHeaderCell>
                      <TableHeaderCell>Teléfono</TableHeaderCell>
                      <TableHeaderCell>Fecha de Creación</TableHeaderCell>
                      <TableHeaderCell>Acciones</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.name || 'Sin nombre'}</TableCell>
                        <TableCell>
                          <Badge
                            appearance={user.role === 'Admin' ? 'filled' : 'outline'}
                            color={user.role === 'Admin' ? 'brand' : 'neutral'}
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.isSuspended ? (
                            <Badge appearance="filled" color="danger">Suspendido</Badge>
                          ) : user.isActive ? (
                            <Badge appearance="filled" color="success">Activo</Badge>
                          ) : (
                            <Badge appearance="outline">Inactivo</Badge>
                          )}
                        </TableCell>
                        <TableCell>{user.phone || 'N/A'}</TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
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
                    ))}
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
        onOpenChange={(_, data) => setIsEditDialogOpen(data.open)}
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
                  <Input value={selectedUser.role} readOnly />
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
    </div>
  );
};
