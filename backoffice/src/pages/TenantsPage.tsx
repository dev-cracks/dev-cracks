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
  Textarea,
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
} from '@fluentui/react-icons';
import { tenantService, TenantDto, UpdateTenantRequest } from '../services/tenantService';
import { UserDto } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { notificationService } from '../services/notificationService';

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
  usersList: {
    maxHeight: '300px',
    overflowY: 'auto',
    ...shorthands.padding(tokens.spacingVerticalM),
  },
});

export const TenantsPage = () => {
  const styles = useStyles();
  const { userDetails } = useAuth();
  const [tenants, setTenants] = useState<TenantDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTenant, setSelectedTenant] = useState<TenantDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para los diálogos
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isNotifyUsersDialogOpen, setIsNotifyUsersDialogOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  
  // Estados para formularios y datos adicionales
  const [editFormData, setEditFormData] = useState<UpdateTenantRequest>({ name: '' });
  const [tenantDetails, setTenantDetails] = useState<TenantDto | null>(null);
  const [tenantUsers, setTenantUsers] = useState<UserDto[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  const loadTenants = useCallback(async () => {
    // Protección contra llamadas simultáneas
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

  useEffect(() => {
    // Evitar múltiples llamadas simultáneas y en React StrictMode
    if (!isLoadingRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadTenants();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar una vez al montar

  const handleEdit = async () => {
    if (!selectedTenant || !editFormData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    try {
      setError(null);
      await tenantService.updateTenant(selectedTenant.id, editFormData);
      setIsEditDialogOpen(false);
      setSelectedTenant(null);
      setEditFormData({ name: '' });
      await loadTenants();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar tenant');
    }
  };

  const handleDelete = async () => {
    if (!selectedTenant) return;

    try {
      setError(null);
      await tenantService.deleteTenant(selectedTenant.id);
      setIsDeleteDialogOpen(false);
      setSelectedTenant(null);
      await loadTenants();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar tenant');
    }
  };

  const handleSuspend = async () => {
    if (!selectedTenant) return;

    try {
      setError(null);
      if (selectedTenant.isSuspended) {
        await tenantService.activateTenant(selectedTenant.id);
      } else {
        await tenantService.suspendTenant(selectedTenant.id);
      }
      setIsSuspendDialogOpen(false);
      setSelectedTenant(null);
      await loadTenants();
    } catch (err: any) {
      setError(err.message || 'Error al cambiar estado del tenant');
    }
  };

  const handleViewDetails = async (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setIsLoadingDetails(true);
    setIsDetailsDialogOpen(true);
    
    try {
      setError(null);
      const details = await tenantService.getTenantById(tenant.id);
      setTenantDetails(details);
    } catch (err: any) {
      setError(err.message || 'Error al cargar detalles del tenant');
    } finally {
      setIsLoadingDetails(false);
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

  const openEditDialog = (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setEditFormData({ name: tenant.name });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setIsDeleteDialogOpen(true);
  };

  const openSuspendDialog = (tenant: TenantDto) => {
    setSelectedTenant(tenant);
    setIsSuspendDialogOpen(true);
  };

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      {error && (
        <MessageBar intent="error">
          <MessageBarBody>{error}</MessageBarBody>
        </MessageBar>
      )}

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <BuildingRegular fontSize={32} />
          <h1 className={styles.title}>Gestión de Tenants</h1>
        </div>
      </div>

      <Card>
        <CardHeader header={<Text weight="semibold">Lista de Tenants</Text>} />
        <div className={styles.toolbar}>
          <Input
            placeholder="Buscar tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            contentBefore={<SearchRegular />}
            style={{ flex: 1 }}
          />
        </div>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Spinner size="large" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
                <TableHeaderCell>Fecha de Creación</TableHeaderCell>
                <TableHeaderCell>Última Actualización</TableHeaderCell>
                <TableHeaderCell className={styles.actionsCell}>Acciones</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} style={{ textAlign: 'center' }}>
                    <Text>No hay tenants disponibles</Text>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <Text weight="semibold">{tenant.name}</Text>
                    </TableCell>
                    <TableCell>
                      {tenant.isSuspended ? (
                        <Badge appearance="filled" color="danger">
                          Suspendido
                        </Badge>
                      ) : tenant.isActive === false ? (
                        <Badge appearance="outline">
                          Inactivo
                        </Badge>
                      ) : (
                        <Badge appearance="filled" color="success">
                          Activo
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(tenant.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      {new Date(tenant.updatedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className={styles.actionsCell}>
                      <Menu>
                        <MenuTrigger disableButtonEnhancement>
                          <Button
                            appearance="subtle"
                            icon={<MoreHorizontalRegular />}
                            aria-label="Acciones"
                          />
                        </MenuTrigger>
                        <MenuPopover>
                          <MenuList>
                            <MenuItem
                              icon={<EyeRegular />}
                              onClick={() => handleViewDetails(tenant)}
                            >
                              Ver Detalles
                            </MenuItem>
                            <MenuItem
                              icon={<PeopleRegular />}
                              onClick={() => handleViewUsers(tenant)}
                            >
                              Ver Usuarios
                            </MenuItem>
                            <MenuItem
                              icon={<PeopleRegular />}
                              onClick={() => handleNotifyUsers(tenant)}
                            >
                              Enviar notificación
                            </MenuItem>
                            <MenuItem
                              icon={<EditRegular />}
                              onClick={() => openEditDialog(tenant)}
                            >
                              Editar
                            </MenuItem>
                            <MenuItem
                              icon={tenant.isSuspended ? <PlayRegular /> : <PauseRegular />}
                              onClick={() => openSuspendDialog(tenant)}
                            >
                              {tenant.isSuspended ? 'Activar' : 'Suspender'}
                            </MenuItem>
                            <MenuItem
                              icon={<DeleteRegular />}
                              onClick={() => openDeleteDialog(tenant)}
                            >
                              Eliminar
                            </MenuItem>
                          </MenuList>
                        </MenuPopover>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Dialog para editar tenant */}
      <Dialog open={isEditDialogOpen} onOpenChange={(_, data) => setIsEditDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Editar Tenant</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Field label="Nombre" required>
                <Input
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ name: e.target.value })}
                  placeholder="Nombre del tenant"
                />
              </Field>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button appearance="primary" onClick={handleEdit}>
                Guardar
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Dialog para confirmar eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(_, data) => setIsDeleteDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                ¿Estás seguro de que deseas eliminar el tenant{' '}
                <strong>{selectedTenant?.name}</strong>?
                <br />
                <br />
                Esta acción no se puede deshacer y eliminará todos los datos asociados.
              </Text>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button appearance="primary" onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Dialog para confirmar suspensión/activación */}
      <Dialog open={isSuspendDialogOpen} onOpenChange={(_, data) => setIsSuspendDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>
            {selectedTenant?.isSuspended ? 'Activar Tenant' : 'Suspender Tenant'}
          </DialogTitle>
          <DialogBody>
            <DialogContent>
              <Text>
                ¿Estás seguro de que deseas{' '}
                {selectedTenant?.isSuspended ? 'activar' : 'suspender'} el tenant{' '}
                <strong>{selectedTenant?.name}</strong>?
              </Text>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsSuspendDialogOpen(false)}>
                Cancelar
              </Button>
              <Button appearance="primary" onClick={handleSuspend}>
                {selectedTenant?.isSuspended ? 'Activar' : 'Suspender'}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Dialog para ver detalles */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={(_, data) => setIsDetailsDialogOpen(data.open)}>
        <DialogSurface style={{ maxWidth: '600px' }}>
          <DialogTitle>Detalles del Tenant</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingDetails ? (
                <div className={styles.loadingContainer}>
                  <Spinner size="large" />
                </div>
              ) : tenantDetails ? (
                <div className={styles.detailsContent}>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>ID:</span>
                    <Text>{tenantDetails.id}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Nombre:</span>
                    <Text weight="semibold">{tenantDetails.name}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Estado:</span>
                    {tenantDetails.isSuspended ? (
                      <Badge appearance="filled" color="danger">
                        Suspendido
                      </Badge>
                    ) : tenantDetails.isActive === false ? (
                      <Badge appearance="outline">
                        Inactivo
                      </Badge>
                    ) : (
                      <Badge appearance="filled" color="success">
                        Activo
                      </Badge>
                    )}
                  </div>
                  {tenantDetails.userCount !== undefined && (
                    <div className={styles.detailsRow}>
                      <span className={styles.detailsLabel}>Usuarios:</span>
                      <Text>{tenantDetails.userCount}</Text>
                    </div>
                  )}
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Fecha de Creación:</span>
                    <Text>
                      {new Date(tenantDetails.createdAt).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <span className={styles.detailsLabel}>Última Actualización:</span>
                    <Text>
                      {new Date(tenantDetails.updatedAt).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </div>
                </div>
              ) : (
                <Text>No se pudieron cargar los detalles</Text>
              )}
            </DialogContent>
            <DialogActions>
              <Button appearance="primary" onClick={() => setIsDetailsDialogOpen(false)}>
                Cerrar
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Dialog para ver usuarios */}
      <Dialog open={isUsersDialogOpen} onOpenChange={(_, data) => setIsUsersDialogOpen(data.open)}>
        <DialogSurface style={{ maxWidth: '700px' }}>
          <DialogTitle>Usuarios del Tenant: {selectedTenant?.name}</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingUsers ? (
                <div className={styles.loadingContainer}>
                  <Spinner size="large" />
                </div>
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

