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
  Textarea,
} from '@fluentui/react-components';
import {
  HomeRegular,
  SearchRegular,
  MoreHorizontalRegular,
  EditRegular,
  DeleteRegular,
  PauseRegular,
  PlayRegular,
  EyeRegular,
  AddRegular,
  BuildingRegular,
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
} from '../services/customerService';
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
  formField: {
    marginBottom: tokens.spacingVerticalM,
  },
});

export const OfficesPage = () => {
  const styles = useStyles();
  const [offices, setOffices] = useState<OfficeDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<OfficeDto | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isNotifyUsersDialogOpen, setIsNotifyUsersDialogOpen] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSendingNotification, setIsSendingNotification] = useState(false);

  // Form state
  const [formData, setFormData] = useState<CreateOfficeRequest>({
    customerId: '',
    name: '',
    address: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    phone: '',
    email: '',
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

  useEffect(() => {
    if (!isLoadingRef.current && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadOffices();
      loadCustomers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredOffices = offices.filter((office) =>
    office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    office.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    office.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    office.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async () => {
    if (!formData.name || !formData.customerId) {
      setError('El nombre y el cliente son requeridos');
      return;
    }

    try {
      setError(null);
      await officeService.createOffice(formData);
      setIsCreateDialogOpen(false);
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
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al crear sede');
    }
  };

  const handleEdit = async (office: OfficeDto) => {
    setSelectedOffice(office);
    setFormData({
      customerId: office.customerId,
      name: office.name,
      address: office.address || '',
      city: office.city || '',
      stateProvince: office.stateProvince || '',
      postalCode: office.postalCode || '',
      phone: office.phone || '',
      email: office.email || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedOffice || !formData.name) {
      setError('El nombre es requerido');
      return;
    }

    try {
      setError(null);
      const updateData: UpdateOfficeRequest = {
        name: formData.name,
        address: formData.address || undefined,
        city: formData.city || undefined,
        stateProvince: formData.stateProvince || undefined,
        postalCode: formData.postalCode || undefined,
        phone: formData.phone || undefined,
        email: formData.email || undefined,
      };
      await officeService.updateOffice(selectedOffice.id, updateData);
      setIsEditDialogOpen(false);
      setSelectedOffice(null);
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar sede');
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

  const handleDeactivate = async (office: OfficeDto) => {
    try {
      await officeService.deactivateOffice(office.id);
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al desactivar sede');
    }
  };

  if (isLoading && offices.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Cargando sedes..." />
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
                <HomeRegular fontSize={24} />
                <Text className={styles.title}>Gestión de Sedes</Text>
              </div>
              <Button
                appearance="primary"
                icon={<AddRegular />}
                onClick={() => {
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
                  setIsCreateDialogOpen(true);
                }}
              >
                Nueva Sede
              </Button>
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
            placeholder="Buscar por nombre, cliente, dirección o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            contentBefore={<SearchRegular />}
            style={{ width: '400px' }}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Cliente</TableHeaderCell>
              <TableHeaderCell>Dirección</TableHeaderCell>
              <TableHeaderCell>Ciudad</TableHeaderCell>
              <TableHeaderCell>Teléfono</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Estado</TableHeaderCell>
              <TableHeaderCell>Tenants</TableHeaderCell>
              <TableHeaderCell>Acciones</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: 'center', padding: tokens.spacingVerticalXXL }}>
                  <Text>No se encontraron sedes</Text>
                </TableCell>
              </TableRow>
            ) : (
              filteredOffices.map((office) => (
                <TableRow key={office.id}>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
                      <HomeRegular fontSize={16} />
                      {office.name}
                    </div>
                  </TableCell>
                  <TableCell>{office.customerName || 'N/A'}</TableCell>
                  <TableCell>{office.address || 'N/A'}</TableCell>
                  <TableCell>{office.city || 'N/A'}</TableCell>
                  <TableCell>{office.phone || 'N/A'}</TableCell>
                  <TableCell>{office.email || 'N/A'}</TableCell>
                  <TableCell>
                    {office.isActive ? (
                      <Badge appearance="filled" color="success">Activo</Badge>
                    ) : (
                      <Badge appearance="outline">Inactivo</Badge>
                    )}
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{office.tenantCount || 0}</TableCell>
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
                          {office.isActive ? (
                            <MenuItem icon={<PauseRegular />} onClick={() => handleDeactivate(office)}>
                              Desactivar
                            </MenuItem>
                          ) : (
                            <MenuItem icon={<PlayRegular />} onClick={() => handleActivate(office)}>
                              Activar
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
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Dialog de Crear */}
      <Dialog open={isCreateDialogOpen} onOpenChange={(_, data) => setIsCreateDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Nueva Sede</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Field label="Cliente" required className={styles.formField}>
                <Combobox
                  value={customers.find(c => c.id === formData.customerId)?.name || ''}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      setFormData({ ...formData, customerId: data.optionValue });
                    }
                  }}
                >
                  {customers.map((customer) => (
                    <Option key={customer.id} value={customer.id}>
                      {customer.name}
                    </Option>
                  ))}
                </Combobox>
              </Field>
              <Field label="Nombre" required className={styles.formField}>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre de la sede"
                />
              </Field>
              <Field label="Dirección" className={styles.formField}>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Dirección"
                />
              </Field>
              <Field label="Ciudad" className={styles.formField}>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ciudad"
                />
              </Field>
              <Field label="Estado/Provincia" className={styles.formField}>
                <Input
                  value={formData.stateProvince}
                  onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                  placeholder="Estado/Provincia"
                />
              </Field>
              <Field label="Código Postal" className={styles.formField}>
                <Input
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="Código Postal"
                />
              </Field>
              <Field label="Teléfono" className={styles.formField}>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Teléfono"
                />
              </Field>
              <Field label="Email" className={styles.formField}>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                />
              </Field>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button appearance="primary" onClick={handleCreate}>
                Crear
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      {/* Dialog de Editar */}
      <Dialog open={isEditDialogOpen} onOpenChange={(_, data) => setIsEditDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Editar Sede</DialogTitle>
          <DialogBody>
            <DialogContent>
              <Field label="Cliente" required className={styles.formField}>
                <Combobox
                  value={customers.find(c => c.id === formData.customerId)?.name || ''}
                  disabled
                >
                  {customers.map((customer) => (
                    <Option key={customer.id} value={customer.id}>
                      {customer.name}
                    </Option>
                  ))}
                </Combobox>
              </Field>
              <Field label="Nombre" required className={styles.formField}>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nombre de la sede"
                />
              </Field>
              <Field label="Dirección" className={styles.formField}>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Dirección"
                />
              </Field>
              <Field label="Ciudad" className={styles.formField}>
                <Input
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Ciudad"
                />
              </Field>
              <Field label="Estado/Provincia" className={styles.formField}>
                <Input
                  value={formData.stateProvince}
                  onChange={(e) => setFormData({ ...formData, stateProvince: e.target.value })}
                  placeholder="Estado/Provincia"
                />
              </Field>
              <Field label="Código Postal" className={styles.formField}>
                <Input
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="Código Postal"
                />
              </Field>
              <Field label="Teléfono" className={styles.formField}>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Teléfono"
                />
              </Field>
              <Field label="Email" className={styles.formField}>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                />
              </Field>
            </DialogContent>
            <DialogActions>
              <Button appearance="secondary" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button appearance="primary" onClick={handleUpdate}>
                Actualizar
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

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

      {/* Dialog de Detalles */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={(_, data) => setIsDetailsDialogOpen(data.open)}>
        <DialogSurface>
          <DialogTitle>Detalles de la Sede</DialogTitle>
          <DialogBody>
            <DialogContent>
              {selectedOffice && (
                <div className={styles.detailsContent}>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Nombre:</Text>
                    <Text>{selectedOffice.name}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Cliente:</Text>
                    <Text>{selectedOffice.customerName || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Dirección:</Text>
                    <Text>{selectedOffice.address || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Ciudad:</Text>
                    <Text>{selectedOffice.city || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Estado/Provincia:</Text>
                    <Text>{selectedOffice.stateProvince || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Código Postal:</Text>
                    <Text>{selectedOffice.postalCode || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Teléfono:</Text>
                    <Text>{selectedOffice.phone || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Email:</Text>
                    <Text>{selectedOffice.email || 'N/A'}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Estado:</Text>
                    {selectedOffice.isActive ? (
                      <Badge appearance="filled" color="success">Activo</Badge>
                    ) : (
                      <Badge appearance="outline">Inactivo</Badge>
                    )}
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Tenants:</Text>
                    <Text>{selectedOffice.tenantCount || 0}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Creado:</Text>
                    <Text>{new Date(selectedOffice.createdAt).toLocaleString()}</Text>
                  </div>
                  <div className={styles.detailsRow}>
                    <Text className={styles.detailsLabel}>Actualizado:</Text>
                    <Text>{new Date(selectedOffice.updatedAt).toLocaleString()}</Text>
                  </div>
                </div>
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
    </div>
  );
};

