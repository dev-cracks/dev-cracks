import { useState, useEffect, useRef, useCallback } from 'react';
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
  Input,
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
import { TableSkeleton } from '../components/TableSkeleton';
import { DetailsSkeleton } from '../components/DetailsSkeleton';
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
});

export const OfficesPage = () => {
  const styles = useStyles();
  const { addGroup, removeGroup } = useRibbonMenu();
  
  // Hooks para restauración de foco en el Drawer
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  const [offices, setOffices] = useState<OfficeDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOffice, setSelectedOffice] = useState<OfficeDto | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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

  // Registrar acciones en el RibbonMenu
  useEffect(() => {
    addGroup({
      id: 'offices',
      label: 'Sedes',
      icon: <HomeRegular />,
      items: [
        {
          id: 'create',
          label: 'Nuevo',
          icon: <AddRegular />,
          action: () => {
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
          },
        },
      ],
    });

    // Limpiar al desmontar
    return () => {
      removeGroup('offices');
    };
  }, [addGroup, removeGroup]);

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
      setIsCreating(true);
      await officeService.createOffice(formData);
      setIsCreateDialogOpen(false);
      setIsCreating(false);
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
      setIsCreating(false);
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
      setIsSaving(true);
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
      setIsSaving(false);
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar sede');
      setIsSaving(false);
    }
  };

  const handleSuspend = async (office: OfficeDto) => {
    try {
      await officeService.suspendOffice(office.id);
      await loadOffices();
    } catch (err: any) {
      setError(err.message || 'Error al suspender sede');
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
      <div className={styles.container}>
        <div className={styles.header}>
          <HomeRegular fontSize={32} />
          <h1 className={styles.title}>Sedes</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
          <div style={{ flex: 1 }}>
            <SearchBox
              placeholder="Buscar por nombre, cliente, dirección o ciudad..."
              disabled
              size="large"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <Card>
          <TableSkeleton rows={8} columns={9} />
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
        <HomeRegular fontSize={32} />
        <h1 className={styles.title}>Sedes</h1>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
        <div style={{ flex: 1 }}>
          <SearchBox
            placeholder="Buscar por nombre, cliente, dirección o ciudad..."
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
                    {office.isSuspended ? (
                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                    ) : office.isActive ? (
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
                          {office.isSuspended ? (
                            <MenuItem icon={<PlayRegular />} onClick={() => handleActivate(office)}>
                              Activar
                            </MenuItem>
                          ) : (
                            <MenuItem icon={<PauseRegular />} onClick={() => handleSuspend(office)}>
                              Suspender
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
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            if (isCreating) {
              return;
            }
            const hasData = formData.name.trim() || 
                            formData.customerId || 
                            formData.address.trim() || 
                            formData.city.trim() || 
                            formData.stateProvince.trim() || 
                            formData.postalCode.trim() || 
                            formData.phone.trim() || 
                            formData.email.trim();
            if (hasData) {
              if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
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
                setError(null);
              }
              return;
            } else {
              setIsCreateDialogOpen(false);
            }
          } else {
            setIsCreateDialogOpen(data.open);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Nueva Sede</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isCreating ? (
              <DetailsSkeleton rows={8} />
            ) : (
              <>
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
              <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                <Button 
                  appearance="secondary" 
                  onClick={() => {
                    const hasData = formData.name.trim() || 
                                    formData.customerId || 
                                    formData.address.trim() || 
                                    formData.city.trim() || 
                                    formData.stateProvince.trim() || 
                                    formData.postalCode.trim() || 
                                    formData.phone.trim() || 
                                    formData.email.trim();
                    if (hasData) {
                      if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los datos no guardados.')) {
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
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            if (isSaving) {
              return;
            }
            if (!selectedOffice) {
              setIsEditDialogOpen(false);
              setSelectedOffice(null);
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
              return;
            }
            const hasChanges = 
              formData.name !== selectedOffice.name ||
              formData.address !== (selectedOffice.address || '') ||
              formData.city !== (selectedOffice.city || '') ||
              formData.stateProvince !== (selectedOffice.stateProvince || '') ||
              formData.postalCode !== (selectedOffice.postalCode || '') ||
              formData.phone !== (selectedOffice.phone || '') ||
              formData.email !== (selectedOffice.email || '');
            if (hasChanges) {
              if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los cambios no guardados.')) {
                setIsEditDialogOpen(false);
                setSelectedOffice(null);
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
                setError(null);
              }
              return;
            } else {
              setIsEditDialogOpen(false);
              setSelectedOffice(null);
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
              setError(null);
            }
          }
          if (data.open === true) {
            setIsEditDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Editar Sede</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isSaving ? (
              <DetailsSkeleton rows={8} />
            ) : (
              <>
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
              <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                <Button 
                  appearance="secondary" 
                  onClick={() => {
                    if (!selectedOffice) {
                      setIsEditDialogOpen(false);
                      setSelectedOffice(null);
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
                      return;
                    }
                    const hasChanges = 
                      formData.name !== selectedOffice.name ||
                      formData.address !== (selectedOffice.address || '') ||
                      formData.city !== (selectedOffice.city || '') ||
                      formData.stateProvince !== (selectedOffice.stateProvince || '') ||
                      formData.postalCode !== (selectedOffice.postalCode || '') ||
                      formData.phone !== (selectedOffice.phone || '') ||
                      formData.email !== (selectedOffice.email || '');
                    if (hasChanges) {
                      if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los cambios no guardados.')) {
                        setIsEditDialogOpen(false);
                        setSelectedOffice(null);
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
                        setError(null);
                      }
                    } else {
                      setIsEditDialogOpen(false);
                      setSelectedOffice(null);
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
                      setError(null);
                    }
                  }}
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button appearance="primary" onClick={handleUpdate} disabled={isSaving}>
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </Button>
              </div>
              </>
            )}
          </div>
        </DrawerBody>
      </OverlayDrawer>

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

      {/* Drawer de detalles */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isDetailsDialogOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            setIsDetailsDialogOpen(false);
            setSelectedOffice(null);
          } else {
            setIsDetailsDialogOpen(true);
          }
        }}
      >
        <DrawerHeader>
          <DrawerHeaderTitle>Detalles de la Sede</DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {selectedOffice && (
              <>
                <Field label="Nombre" className={styles.formField}>
                  <Input value={selectedOffice.name} readOnly />
                </Field>
                <Field label="Cliente" className={styles.formField}>
                  <Input value={selectedOffice.customerName || 'N/A'} readOnly />
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
                <Field label="Tenants" className={styles.formField}>
                  <Input value={String(selectedOffice.tenantCount || 0)} readOnly />
                </Field>
                <Field label="Creado" className={styles.formField}>
                  <Input value={new Date(selectedOffice.createdAt).toLocaleString()} readOnly />
                </Field>
                <Field label="Actualizado" className={styles.formField}>
                  <Input value={new Date(selectedOffice.updatedAt).toLocaleString()} readOnly />
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

