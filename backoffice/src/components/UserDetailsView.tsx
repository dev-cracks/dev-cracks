import { useState, useEffect } from 'react';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
  TabList,
  Tab,
  Field,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell,
  Checkbox,
  Combobox,
  Option,
  MessageBar,
  MessageBarBody,
  Spinner,
  Badge,
  Switch,
  Label,
  Text,
  makeStyles,
  tokens,
  shorthands,
} from '@fluentui/react-components';
import {
  DismissRegular,
  EditRegular,
  DeleteRegular,
  AddRegular,
  CheckmarkRegular,
} from '@fluentui/react-icons';
import { UserDto, userService } from '../services/userService';
import { TenantDto, tenantService } from '../services/tenantService';
import { OfficeDto, officeService } from '../services/officeService';
import { DetailsSkeleton } from './DetailsSkeleton';

const useStyles = makeStyles({
  detailsContent: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  formField: {
    marginBottom: tokens.spacingVerticalM,
  },
  tabContent: {
    padding: tokens.spacingVerticalL,
  },
  tableContainer: {
    marginTop: tokens.spacingVerticalM,
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacingVerticalM,
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  selectedCount: {
    color: tokens.colorNeutralForeground2,
  },
});

interface UserDetailsViewProps {
  user: UserDto | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  isEditMode?: boolean;
}

// Helper para convertir rol a texto en español
function getRoleLabel(role: 'Admin' | 'User'): string {
  return role === 'Admin' ? 'Administrador' : 'Usuario';
}

export const UserDetailsView = ({
  user,
  isOpen,
  onClose,
  onUserUpdated,
  isEditMode = false,
}: UserDetailsViewProps) => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<'details' | 'tenants' | 'offices'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Estados para detalles
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'User' as 'Admin' | 'User',
    contactEmail: '',
    phone: '',
  });
  const [isActive, setIsActive] = useState(false);
  const [createdAt, setCreatedAt] = useState<string>('');
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [isUpdatingActive, setIsUpdatingActive] = useState(false);

  // Estados para tenants
  const [userTenants, setUserTenants] = useState<TenantDto[]>([]);
  const [allTenants, setAllTenants] = useState<TenantDto[]>([]);
  const [selectedTenantIds, setSelectedTenantIds] = useState<Set<string>>(new Set());
  const [isLoadingTenants, setIsLoadingTenants] = useState(false);
  const [isAssigningTenant, setIsAssigningTenant] = useState(false);
  const [selectedTenantToAdd, setSelectedTenantToAdd] = useState<string>('');

  // Estados para oficinas
  const [userOffices, setUserOffices] = useState<OfficeDto[]>([]);
  const [allOffices, setAllOffices] = useState<OfficeDto[]>([]);
  const [selectedOfficeIds, setSelectedOfficeIds] = useState<Set<string>>(new Set());
  const [isLoadingOffices, setIsLoadingOffices] = useState(false);
  const [isAssigningOffice, setIsAssigningOffice] = useState(false);
  const [selectedOfficeToAdd, setSelectedOfficeToAdd] = useState<string>('');

  // Cargar datos cuando se abre el drawer
  useEffect(() => {
    if (isOpen && user) {
      loadUserData();
    }
  }, [isOpen, user]);

  // Cambiar a otra tab si el usuario está en la tab de sedes y no tiene tenants
  useEffect(() => {
    if (activeTab === 'offices' && userTenants.length === 0) {
      setActiveTab('details');
    }
  }, [userTenants.length, activeTab]);

  const loadUserData = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Cargar datos del usuario
      const userData = await userService.getUserById(user.id);
      setFormData({
        email: userData.email,
        name: userData.name || '',
        role: userData.role,
        contactEmail: userData.contactEmail || '',
        phone: userData.phone || '',
      });
      setIsActive(userData.isActive ?? false);
      setCreatedAt(userData.createdAt);
      setUpdatedAt(userData.updatedAt);

      // Cargar tenants y oficinas del usuario
      // Primero cargar los tenants del usuario para poder filtrar las oficinas
      const loadedTenants = await loadUserTenants();
      await loadUserOffices();
      await loadAllTenants();
      // Cargar oficinas después de tener los tenants del usuario, pasando los tenants cargados
      await loadAllOffices(loadedTenants);
    } catch (err: any) {
      console.error('[UserDetailsView] Error cargando datos:', err);
      setError(err.message || 'Error al cargar datos del usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserTenants = async (): Promise<TenantDto[]> => {
    if (!user) return [];

    setIsLoadingTenants(true);
    try {
      const tenants = await userService.getUserTenants(user.id);
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
      setUserTenants(tenantsDto);
      return tenantsDto;
    } catch (err: any) {
      console.error('[UserDetailsView] Error cargando tenants:', err);
      setError(err.message || 'Error al cargar tenants');
      return [];
    } finally {
      setIsLoadingTenants(false);
    }
  };

  const loadUserOffices = async () => {
    if (!user) return;

    setIsLoadingOffices(true);
    try {
      const offices = await userService.getUserOffices(user.id);
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
      setUserOffices(officesDto);
    } catch (err: any) {
      console.error('[UserDetailsView] Error cargando oficinas:', err);
      setError(err.message || 'Error al cargar oficinas');
    } finally {
      setIsLoadingOffices(false);
    }
  };

  const loadAllTenants = async () => {
    try {
      const tenants = await tenantService.getAllTenants();
      setAllTenants(tenants);
    } catch (err: any) {
      console.error('[UserDetailsView] Error cargando todos los tenants:', err);
    }
  };

  const loadAllOffices = async (tenantsToUse?: TenantDto[]) => {
    try {
      // Usar los tenants proporcionados o los del estado
      const tenants = tenantsToUse || userTenants;
      
      // Solo cargar oficinas de los tenants asignados al usuario
      if (tenants.length === 0) {
        setAllOffices([]);
        return;
      }

      // Cargar oficinas de todos los tenants del usuario
      const officePromises = tenants.map((tenant) =>
        officeService.getOfficesByTenant(tenant.id)
      );
      const officesArrays = await Promise.all(officePromises);
      // Aplanar el array de arrays en un solo array
      const allOffices = officesArrays.flat();
      setAllOffices(allOffices);
    } catch (err: any) {
      console.error('[UserDetailsView] Error cargando oficinas de los tenants del usuario:', err);
      setAllOffices([]);
    }
  };

  const handleSaveDetails = async () => {
    if (!user) return;

    try {
      setError(null);
      setIsSaving(true);
      await userService.updateUser(user.id, {
        email: formData.email,
        name: formData.name || undefined,
        role: formData.role,
        contactEmail: formData.contactEmail || undefined,
        phone: formData.phone || undefined,
      });
      await onUserUpdated();
    } catch (err: any) {
      setError(err.message || 'Error al guardar cambios');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (checked: boolean) => {
    if (!user) return;

    try {
      setError(null);
      setIsUpdatingActive(true);
      if (checked) {
        await userService.activateUser(user.id);
      } else {
        await userService.suspendUser(user.id);
      }
      setIsActive(checked);
      await onUserUpdated();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar estado');
      // Revertir el cambio si falla
      setIsActive(!checked);
    } finally {
      setIsUpdatingActive(false);
    }
  };

  const handleToggleTenantSelection = (tenantId: string) => {
    setSelectedTenantIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tenantId)) {
        newSet.delete(tenantId);
      } else {
        newSet.add(tenantId);
      }
      return newSet;
    });
  };

  const handleToggleAllTenants = () => {
    if (selectedTenantIds.size === userTenants.length) {
      setSelectedTenantIds(new Set());
    } else {
      setSelectedTenantIds(new Set(userTenants.map((t) => t.id)));
    }
  };

  const handleRemoveSelectedTenants = async () => {
    if (!user || selectedTenantIds.size === 0) return;

    try {
      setError(null);
      setIsAssigningTenant(true);
      
      // Identificar las sedes que pertenecen a los tenants que se van a desasignar
      const tenantIdsToRemove = Array.from(selectedTenantIds);
      const officesToRemove = userOffices.filter((office) =>
        tenantIdsToRemove.includes(office.tenantId)
      );

      // Desasignar las sedes que pertenecen a los tenants que se van a desasignar
      const removeOfficePromises = officesToRemove.map((office) =>
        userService.removeOfficeFromUser(user.id, office.id)
      );

      // Desasignar los tenants
      const removeTenantPromises = tenantIdsToRemove.map((tenantId) =>
        userService.removeTenantFromUser(user.id, tenantId)
      );

      // Ejecutar ambas operaciones en paralelo
      await Promise.all([...removeOfficePromises, ...removeTenantPromises]);
      
      setSelectedTenantIds(new Set());
      // Recargar tenants y oficinas
      const updatedTenants = await loadUserTenants();
      await loadUserOffices();
      await loadAllOffices(updatedTenants);
      await onUserUpdated();
    } catch (err: any) {
      setError(err.message || 'Error al desasignar tenants');
    } finally {
      setIsAssigningTenant(false);
    }
  };

  const handleAssignTenant = async () => {
    if (!user || !selectedTenantToAdd) return;

    try {
      setError(null);
      setIsAssigningTenant(true);
      await userService.assignTenantToUser(user.id, selectedTenantToAdd);
      setSelectedTenantToAdd('');
      // Recargar tenants y usar el resultado para recargar oficinas
      const updatedTenants = await loadUserTenants();
      await loadAllOffices(updatedTenants);
      await onUserUpdated();
    } catch (err: any) {
      setError(err.message || 'Error al asignar tenant');
    } finally {
      setIsAssigningTenant(false);
    }
  };

  const handleToggleOfficeSelection = (officeId: string) => {
    setSelectedOfficeIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(officeId)) {
        newSet.delete(officeId);
      } else {
        newSet.add(officeId);
      }
      return newSet;
    });
  };

  const handleToggleAllOffices = () => {
    if (selectedOfficeIds.size === userOffices.length) {
      setSelectedOfficeIds(new Set());
    } else {
      setSelectedOfficeIds(new Set(userOffices.map((o) => o.id)));
    }
  };

  const handleRemoveSelectedOffices = async () => {
    if (!user || selectedOfficeIds.size === 0) return;

    try {
      setError(null);
      setIsAssigningOffice(true);
      const promises = Array.from(selectedOfficeIds).map((officeId) =>
        userService.removeOfficeFromUser(user.id, officeId)
      );
      await Promise.all(promises);
      setSelectedOfficeIds(new Set());
      await loadUserOffices();
      await onUserUpdated();
    } catch (err: any) {
      setError(err.message || 'Error al desasignar oficinas');
    } finally {
      setIsAssigningOffice(false);
    }
  };

  const handleAssignOffice = async () => {
    if (!user || !selectedOfficeToAdd) return;

    try {
      setError(null);
      setIsAssigningOffice(true);
      await userService.assignOfficeToUser(user.id, selectedOfficeToAdd);
      setSelectedOfficeToAdd('');
      await loadUserOffices();
      await onUserUpdated();
    } catch (err: any) {
      setError(err.message || 'Error al asignar oficina');
    } finally {
      setIsAssigningOffice(false);
    }
  };

  // Filtrar tenants disponibles (excluir los ya asignados)
  const availableTenants = allTenants.filter(
    (tenant) => !userTenants.some((ut) => ut.id === tenant.id)
  );

  // Filtrar oficinas disponibles: solo las que pertenecen a los tenants del usuario y que no estén ya asignadas
  const userTenantIds = new Set(userTenants.map((t) => t.id));
  const availableOffices = allOffices.filter(
    (office) => 
      userTenantIds.has(office.tenantId) && 
      !userOffices.some((uo) => uo.id === office.id)
  );

  if (!user) return null;

  return (
    <OverlayDrawer
      position="end"
      size="large"
      open={isOpen}
      modalType="alert"
      onOpenChange={(_, data) => {
        if (!data.open) {
          onClose();
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
              onClick={onClose}
            />
          }
        >
          {isEditMode ? 'Editar Usuario' : 'Detalles del Usuario'}
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody>
        {isLoading ? (
          <DetailsSkeleton rows={8} />
        ) : (
          <div className={styles.detailsContent}>
            {error && (
              <MessageBar intent="error">
                <MessageBarBody>{error}</MessageBarBody>
              </MessageBar>
            )}

            <TabList
              selectedValue={activeTab}
              onTabSelect={(_, data) => setActiveTab(data.value as any)}
            >
              <Tab value="details">Detalles</Tab>
              <Tab value="tenants">Tenants</Tab>
              {userTenants.length > 0 && <Tab value="offices">Sedes</Tab>}
            </TabList>

            {/* Tab de Detalles */}
            {activeTab === 'details' && (
              <div className={styles.tabContent}>
                <Field label="Nombre" className={styles.formField}>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    readOnly={!isEditMode}
                  />
                </Field>
                <Field label="Email de Contacto" className={styles.formField}>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    readOnly={!isEditMode}
                  />
                </Field>
                <Field label="Teléfono" className={styles.formField}>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    readOnly={!isEditMode}
                  />
                </Field>
                <Field label="Rol" className={styles.formField}>
                  {isEditMode ? (
                    <Select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value as 'Admin' | 'User' })
                      }
                    >
                      <option value="User">Usuario</option>
                      <option value="Admin">Administrador</option>
                    </Select>
                  ) : (
                    <Input value={getRoleLabel(formData.role)} readOnly />
                  )}
                </Field>
                <Field label="Email" required className={styles.formField}>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    readOnly={!isEditMode}
                  />
                </Field>
                
                {/* Fecha de creación - solo lectura */}
                {createdAt && (
                  <div style={{ marginBottom: tokens.spacingVerticalM }}>
                    <Text size={300} style={{ color: tokens.colorNeutralForeground3, marginBottom: tokens.spacingVerticalXS }}>
                      Fecha de Creación
                    </Text>
                    <Text>{new Date(createdAt).toLocaleString('es-ES')}</Text>
                  </div>
                )}

                {/* Fecha de actualización - solo lectura */}
                {updatedAt && (
                  <div style={{ marginBottom: tokens.spacingVerticalM }}>
                    <Text size={300} style={{ color: tokens.colorNeutralForeground3, marginBottom: tokens.spacingVerticalXS }}>
                      Fecha de Actualización
                    </Text>
                    <Text>{new Date(updatedAt).toLocaleString('es-ES')}</Text>
                  </div>
                )}

                {/* Switch para activo/inactivo */}
                <div className={styles.formField}>
                  <Label>Estado</Label>
                  <Switch
                    checked={isActive}
                    onChange={(_, data) => handleToggleActive(data.checked ?? false)}
                    disabled={isUpdatingActive}
                    label={isActive ? 'Activo' : 'Inactivo'}
                  />
                </div>

                {isEditMode && (
                  <div
                    style={{
                      display: 'flex',
                      gap: tokens.spacingHorizontalM,
                      marginTop: tokens.spacingVerticalXL,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button appearance="secondary" onClick={onClose} disabled={isSaving}>
                      Cancelar
                    </Button>
                    <Button appearance="primary" onClick={handleSaveDetails} disabled={isSaving}>
                      {isSaving ? 'Guardando...' : 'Guardar'}
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Tab de Tenants */}
            {activeTab === 'tenants' && (
              <div className={styles.tabContent}>
                <div className={styles.actionBar}>
                  <div>
                    <Combobox
                      placeholder="Seleccionar tenant para agregar"
                      value={
                        selectedTenantToAdd
                          ? availableTenants.find((t) => t.id === selectedTenantToAdd)?.name || ''
                          : ''
                      }
                      onOptionSelect={(_, data) => {
                        const tenant = availableTenants.find((t) => t.name === data.optionValue);
                        if (tenant) {
                          setSelectedTenantToAdd(tenant.id);
                        }
                      }}
                      style={{ width: '300px' }}
                    >
                      {availableTenants.map((tenant) => (
                        <Option key={tenant.id} value={tenant.name}>
                          {tenant.name} {tenant.customerName ? `(${tenant.customerName})` : ''}
                        </Option>
                      ))}
                    </Combobox>
                    <Button
                      appearance="primary"
                      icon={<AddRegular />}
                      onClick={handleAssignTenant}
                      disabled={!selectedTenantToAdd || isAssigningTenant}
                      style={{ marginLeft: tokens.spacingHorizontalM }}
                    >
                      Agregar
                    </Button>
                  </div>
                  {selectedTenantIds.size > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
                      <span className={styles.selectedCount}>
                        {selectedTenantIds.size} seleccionado(s)
                      </span>
                      <Button
                        appearance="secondary"
                        icon={<DeleteRegular />}
                        onClick={handleRemoveSelectedTenants}
                        disabled={isAssigningTenant}
                      >
                        Desasignar Seleccionados
                      </Button>
                    </div>
                  )}
                </div>

                {isLoadingTenants ? (
                  <Spinner label="Cargando tenants..." />
                ) : (
                  <div className={styles.tableContainer}>
                    {userTenants.length === 0 ? (
                      <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                        <p>No hay tenants asignados</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHeaderCell style={{ width: '50px' }}>
                              <Checkbox
                                checked={selectedTenantIds.size === userTenants.length && userTenants.length > 0}
                                onChange={handleToggleAllTenants}
                              />
                            </TableHeaderCell>
                            <TableHeaderCell>Nombre</TableHeaderCell>
                            <TableHeaderCell>Cliente</TableHeaderCell>
                            <TableHeaderCell>Estado</TableHeaderCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userTenants.map((tenant) => (
                            <TableRow key={tenant.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedTenantIds.has(tenant.id)}
                                  onChange={() => handleToggleTenantSelection(tenant.id)}
                                />
                              </TableCell>
                              <TableCell>{tenant.name}</TableCell>
                              <TableCell>{tenant.customerName || 'N/A'}</TableCell>
                              <TableCell>
                                {tenant.isSuspended ? (
                                  <Badge appearance="filled" color="danger">
                                    Suspendido
                                  </Badge>
                                ) : tenant.isActive ? (
                                  <Badge appearance="filled" color="success">
                                    Activo
                                  </Badge>
                                ) : (
                                  <Badge appearance="outline">Inactivo</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tab de Sedes */}
            {activeTab === 'offices' && (
              <div className={styles.tabContent}>
                <div className={styles.actionBar}>
                  <div>
                    <Combobox
                      placeholder="Seleccionar sede para agregar"
                      value={
                        selectedOfficeToAdd
                          ? availableOffices.find((o) => o.id === selectedOfficeToAdd)?.name || ''
                          : ''
                      }
                      onOptionSelect={(_, data) => {
                        const office = availableOffices.find((o) => o.name === data.optionValue);
                        if (office) {
                          setSelectedOfficeToAdd(office.id);
                        }
                      }}
                      style={{ width: '300px' }}
                    >
                      {availableOffices.map((office) => (
                        <Option key={office.id} value={office.name}>
                          {office.name} {office.city ? `(${office.city})` : ''} - {office.tenantName || 'N/A'}
                        </Option>
                      ))}
                    </Combobox>
                    <Button
                      appearance="primary"
                      icon={<AddRegular />}
                      onClick={handleAssignOffice}
                      disabled={!selectedOfficeToAdd || isAssigningOffice}
                      style={{ marginLeft: tokens.spacingHorizontalM }}
                    >
                      Agregar
                    </Button>
                  </div>
                  {selectedOfficeIds.size > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
                      <span className={styles.selectedCount}>
                        {selectedOfficeIds.size} seleccionada(s)
                      </span>
                      <Button
                        appearance="secondary"
                        icon={<DeleteRegular />}
                        onClick={handleRemoveSelectedOffices}
                        disabled={isAssigningOffice}
                      >
                        Desasignar Seleccionadas
                      </Button>
                    </div>
                  )}
                </div>

                {isLoadingOffices ? (
                  <Spinner label="Cargando sedes..." />
                ) : (
                  <div className={styles.tableContainer}>
                    {userOffices.length === 0 ? (
                      <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                        <p>No hay sedes asignadas</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHeaderCell style={{ width: '50px' }}>
                              <Checkbox
                                checked={selectedOfficeIds.size === userOffices.length && userOffices.length > 0}
                                onChange={handleToggleAllOffices}
                              />
                            </TableHeaderCell>
                            <TableHeaderCell>Nombre</TableHeaderCell>
                            <TableHeaderCell>Ciudad</TableHeaderCell>
                            <TableHeaderCell>Tenant</TableHeaderCell>
                            <TableHeaderCell>Estado</TableHeaderCell>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {userOffices.map((office) => (
                            <TableRow key={office.id}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedOfficeIds.has(office.id)}
                                  onChange={() => handleToggleOfficeSelection(office.id)}
                                />
                              </TableCell>
                              <TableCell>{office.name}</TableCell>
                              <TableCell>{office.city || 'N/A'}</TableCell>
                              <TableCell>{office.tenantName || 'N/A'}</TableCell>
                              <TableCell>
                                {office.isSuspended ? (
                                  <Badge appearance="filled" color="danger">
                                    Suspendida
                                  </Badge>
                                ) : office.isActive ? (
                                  <Badge appearance="filled" color="success">
                                    Activa
                                  </Badge>
                                ) : (
                                  <Badge appearance="outline">Inactiva</Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </DrawerBody>
    </OverlayDrawer>
  );
};

