import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  Input,
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
  Textarea,
  TabList,
  Tab,
  Switch,
  Label,
  Persona,
  Checkbox,
} from '@fluentui/react-components';
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
} from '@fluentui/react-drawer';
import {
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverBody,
} from '@fluentui/react-teaching-popover';
import {
  useRestoreFocusSource,
  useRestoreFocusTarget,
  useToastController,
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
  DismissRegular,
  BriefcaseRegular,
  LocationRegular,
  ArrowClockwiseRegular,
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
import { userService, CreateUserRequest } from '../services/userService';
import { tenantService, TenantDto, CreateTenantRequest } from '../services/tenantService';
import { officeService, OfficeDto, CreateOfficeRequest } from '../services/officeService';
import { notificationService } from '../services/notificationService';
import { TableSkeleton } from '../components/TableSkeleton';
import { TreeSkeleton } from '../components/TreeSkeleton';
import { DetailsSkeleton } from '../components/DetailsSkeleton';
import { FlowSkeleton } from '../components/FlowSkeleton';
import { useRibbonMenu } from '../contexts/RibbonMenuContext';
import { RibbonMenu } from '../components/RibbonMenu';

// Helper para convertir rol a texto en español
function getRoleLabel(role: 'Admin' | 'User'): string {
  return role === 'Admin' ? 'Administrador' : 'Usuario';
}

// Componente helper para mostrar usuarios agrupados por tenant y sede
const UsersListByTenantAndOffice = ({ users }: { users: UserDto[] }) => {
  const [tenantsMap, setTenantsMap] = useState<Map<string, TenantDto>>(new Map());
  const [officesMap, setOfficesMap] = useState<Map<string, OfficeDto[]>>(new Map());
  const [userTenantsMap, setUserTenantsMap] = useState<Map<string, string[]>>(new Map()); // userId -> tenantIds[]
  const [userOfficesMap, setUserOfficesMap] = useState<Map<string, string[]>>(new Map()); // userId -> officeIds[]
  const [isLoading, setIsLoading] = useState(true);
  const [openPopoverOfficeId, setOpenPopoverOfficeId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Obtener tenants y sedes relacionados mediante las tablas de relación
        const userTenantsPromises = users.map(user => userService.getUserTenants(user.id));
        const userTenantsArrays = await Promise.all(userTenantsPromises);
        
        // Crear mapa de usuario -> tenantIds
        const newUserTenantsMap = new Map<string, string[]>();
        const allTenantIds = new Set<string>();
        userTenantsArrays.forEach((tenants: any[], index: number) => {
          const userId = users[index].id;
          const tenantIds = tenants.map((t: any) => t.id || t.tenantId);
          newUserTenantsMap.set(userId, tenantIds);
          tenantIds.forEach((id: string) => allTenantIds.add(id));
        });
        setUserTenantsMap(newUserTenantsMap);
        
        // Obtener sedes relacionadas mediante las tablas de relación
        const userOfficesPromises = users.map(user => userService.getUserOffices(user.id));
        const userOfficesArrays = await Promise.all(userOfficesPromises);
        
        // Crear mapa de usuario -> officeIds
        const newUserOfficesMap = new Map<string, string[]>();
        const allOfficeIds = new Set<string>();
        userOfficesArrays.forEach((offices: any[], index: number) => {
          const userId = users[index].id;
          const officeIds = offices.map((o: any) => o.id || o.officeId);
          newUserOfficesMap.set(userId, officeIds);
          officeIds.forEach((id: string) => allOfficeIds.add(id));
        });
        setUserOfficesMap(newUserOfficesMap);
        
        // Cargar información de tenants
        const tenantIdsArray = Array.from(allTenantIds);
        const tenantsPromises = tenantIdsArray.map(id => tenantService.getTenantById(id));
        const tenants = await Promise.all(tenantsPromises);
        
        const tenantsMapData = new Map<string, TenantDto>();
        tenants.forEach(tenant => {
          if (tenant) tenantsMapData.set(tenant.id, tenant);
        });

        // Cargar información de sedes
        const officesPromises = tenantIdsArray.map(id => officeService.getOfficesByTenant(id));
        const officesArrays = await Promise.all(officesPromises);
        
        const officesMapData = new Map<string, OfficeDto[]>();
        tenantIdsArray.forEach((id, index) => {
          officesMapData.set(id, officesArrays[index] || []);
        });

        setTenantsMap(tenantsMapData);
        setOfficesMap(officesMapData);
      } catch (err) {
        console.error('Error cargando datos de tenants y sedes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (users.length > 0) {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, [users]);

  if (isLoading) {
    return <Spinner size="small" label="Cargando información..." />;
  }

  if (users.length === 0) {
    return <Text>No hay usuarios asociados a este cliente.</Text>;
  }

  // Agrupar usuarios por tenant usando las relaciones
  const usersByTenant = new Map<string, UserDto[]>();
  users.forEach(user => {
    const tenantIds = userTenantsMap.get(user.id) || [];
    if (tenantIds.length === 0) {
      // Si no tiene tenants relacionados, ponerlo en "sin-tenant"
      const tenantId = 'sin-tenant';
      if (!usersByTenant.has(tenantId)) {
        usersByTenant.set(tenantId, []);
      }
      usersByTenant.get(tenantId)!.push(user);
    } else {
      // Agregar el usuario a cada tenant relacionado
      tenantIds.forEach(tenantId => {
        if (!usersByTenant.has(tenantId)) {
          usersByTenant.set(tenantId, []);
        }
        usersByTenant.get(tenantId)!.push(user);
      });
    }
  });

  // Agrupar usuarios por officeId usando las relaciones
  const usersByOffice = new Map<string, UserDto[]>();
  users.forEach(user => {
    const officeIds = userOfficesMap.get(user.id) || [];
    officeIds.forEach(officeId => {
      if (!usersByOffice.has(officeId)) {
        usersByOffice.set(officeId, []);
      }
      usersByOffice.get(officeId)!.push(user);
    });
  });

  return (
    <div style={{ maxWidth: '600px', maxHeight: '300px', overflowY: 'auto' }}>
      {Array.from(usersByTenant.entries()).map(([tenantId, tenantUsers]) => {
        const tenant = tenantId !== 'sin-tenant' ? tenantsMap.get(tenantId) : null;
        const offices = tenantId !== 'sin-tenant' ? officesMap.get(tenantId) || [] : [];

        return (
          <div key={tenantId} style={{ marginBottom: tokens.spacingVerticalL }}>
            <Text weight="semibold" style={{ marginBottom: tokens.spacingVerticalS }}>
              {tenant ? `Tenant: ${tenant.name}` : 'Sin Tenant'}
            </Text>
            
            {offices.length > 0 && (
              <div style={{ marginLeft: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalS }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, marginBottom: tokens.spacingVerticalXS }}>
                  <Text size={200}>
                    Sedes:
                  </Text>
                  <CounterBadge count={offices.length} />
                </div>
                {offices.map(office => {
                  const officeUsers = usersByOffice.get(office.id) || [];
                  const hasUsers = officeUsers.length > 0;

                  return (
                    <div key={office.id} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS, marginLeft: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalXXS }}>
                      <Text size={200}>
                        • {office.name} {office.city ? `(${office.city})` : ''}
                      </Text>
                      {!hasUsers && (
                        <TeachingPopover
                          open={openPopoverOfficeId === office.id}
                          onOpenChange={(_, data) => {
                            setOpenPopoverOfficeId(data.open ? office.id : null);
                          }}
                        >
                          <TeachingPopoverTrigger disableButtonEnhancement>
                            <Button
                              appearance="subtle"
                              icon={<LinkRegular />}
                              size="small"
                              style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                            />
                          </TeachingPopoverTrigger>
                          <TeachingPopoverSurface>
                            <TeachingPopoverHeader>
                              Usuarios disponibles para vincular a: {office.name}
                            </TeachingPopoverHeader>
                            <TeachingPopoverBody>
                              {users.length === 0 ? (
                                <Text>No hay usuarios disponibles para vincular.</Text>
                              ) : (
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                  <Table size="small">
                                    <TableHeader>
                                      <TableRow>
                                        <TableHeaderCell style={{ width: '60%', minWidth: '200px' }}>Usuario</TableHeaderCell>
                                        <TableHeaderCell style={{ width: '20%' }}>Rol</TableHeaderCell>
                                        <TableHeaderCell style={{ width: '20%' }}>Estado</TableHeaderCell>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {users.map(user => (
                                        <TableRow key={user.id}>
                                          <TableCell style={{ width: '60%', minWidth: '200px' }}>
                                            <Persona
                                              name={user.name || user.email || 'N/A'}
                                              secondaryText={user.contactEmail || user.email || 'Sin email'}
                                              size="small"
                                            />
                                          </TableCell>
                                          <TableCell style={{ width: '20%' }}>
                                            <Badge appearance="outline" size="small">
                                              {user.role === 'Admin' ? 'Admin' : 'User'}
                                            </Badge>
                                          </TableCell>
                                          <TableCell style={{ width: '20%' }}>
                                            {user.isSuspended ? (
                                              <Badge appearance="filled" color="danger" size="small">Suspendido</Badge>
                                            ) : user.isActive ? (
                                              <Badge appearance="filled" color="success" size="small">Activo</Badge>
                                            ) : (
                                              <Badge appearance="outline" size="small">Inactivo</Badge>
                                            )}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </div>
                              )}
                            </TeachingPopoverBody>
                          </TeachingPopoverSurface>
                        </TeachingPopover>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ marginLeft: tokens.spacingHorizontalM }}>
              <Text size={200} style={{ marginBottom: tokens.spacingVerticalXS }}>
                Usuarios ({tenantUsers.length}):
              </Text>
              <Table size="small">
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell style={{ width: '60%', minWidth: '300px' }}>Usuario</TableHeaderCell>
                    <TableHeaderCell style={{ width: '20%' }}>Rol</TableHeaderCell>
                    <TableHeaderCell style={{ width: '20%' }}>Estado</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenantUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell style={{ width: '60%', minWidth: '300px' }}>
                        <Persona
                          name={user.name || user.email || 'N/A'}
                          secondaryText={user.contactEmail || user.email || 'Sin email'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell style={{ width: '20%' }}>
                        <Badge appearance="outline" size="small">
                          {user.role === 'Admin' ? 'Admin' : 'User'}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ width: '20%' }}>
                        {user.isSuspended ? (
                          <Badge appearance="filled" color="danger" size="small">Suspendido</Badge>
                        ) : user.isActive ? (
                          <Badge appearance="filled" color="success" size="small">Activo</Badge>
                        ) : (
                          <Badge appearance="outline" size="small">Inactivo</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

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
    gridTemplateColumns: '32px 60px 180px 160px 120px 120px 130px 180px 70px 70px 80px 110px 100px',
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
    gridTemplateColumns: '32px 60px 180px 160px 120px 120px 130px 180px 70px 70px 80px 110px 100px',
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
  const { dispatchToast } = useToastController();
  
  // Hooks para restauración de foco en el Drawer
  const restoreFocusTargetAttributes = useRestoreFocusTarget();
  const restoreFocusSourceAttributes = useRestoreFocusSource();
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [countries, setCountries] = useState<CountryDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createCustomerError, setCreateCustomerError] = useState<string | null>(null);
  const [createOfficeError, setCreateOfficeError] = useState<string | null>(null);
  const [createTenantError, setCreateTenantError] = useState<string | null>(null);
  const [createUserError, setCreateUserError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerDto | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
  const [isTenantsDialogOpen, setIsTenantsDialogOpen] = useState(false);
  const [isOfficesDialogOpen, setIsOfficesDialogOpen] = useState(false);
  const [isAssignTenantDialogOpen, setIsAssignTenantDialogOpen] = useState(false);
  const [isAssignParentDialogOpen, setIsAssignParentDialogOpen] = useState(false);
  const [isNotifyUsersDialogOpen, setIsNotifyUsersDialogOpen] = useState(false);
  const [isCreateOfficeDialogOpen, setIsCreateOfficeDialogOpen] = useState(false);
  const [isCreateTenantDialogOpen, setIsCreateTenantDialogOpen] = useState(false);
  const [isCreateUserDrawerOpen, setIsCreateUserDrawerOpen] = useState(false);
  const [isCreatingOffice, setIsCreatingOffice] = useState(false);
  const [isCreatingTenant, setIsCreatingTenant] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  const [customerUsers, setCustomerUsers] = useState<UserDto[]>([]);
  const [customerTenants, setCustomerTenants] = useState<TenantDto[]>([]);
  const [customerOffices, setCustomerOffices] = useState<OfficeDto[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingTenants, setIsLoadingTenants] = useState(false);
  const [isLoadingOffices, setIsLoadingOffices] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isCreateDrawerLoading, setIsCreateDrawerLoading] = useState(false);
  const [isEditDrawerLoading, setIsEditDrawerLoading] = useState(false);
  const [tenantName, setTenantName] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<string>('');
  const [hasParent, setHasParent] = useState(true);
  const [createParentId, setCreateParentId] = useState<string>('');
  const [skipDefaultStructure, setSkipDefaultStructure] = useState(false);
  const [isTenantInfoDialogOpen, setIsTenantInfoDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<TenantDto | null>(null);
  const [isLoadingTenant, setIsLoadingTenant] = useState(false);

  // Estados para el stepper de eliminación
  const [deleteStep, setDeleteStep] = useState(1);
  const [deleteConsentChecked, setDeleteConsentChecked] = useState(false);
  const [deleteTenants, setDeleteTenants] = useState<Set<string>>(new Set());
  const [deleteOffices, setDeleteOffices] = useState<Set<string>>(new Set());
  const [deleteUsers, setDeleteUsers] = useState<Set<string>>(new Set());
  const [deleteRelatedTenants, setDeleteRelatedTenants] = useState<TenantDto[]>([]);
  const [deleteRelatedOffices, setDeleteRelatedOffices] = useState<OfficeDto[]>([]);
  const [deleteRelatedUsers, setDeleteRelatedUsers] = useState<UserDto[]>([]);
  const [isLoadingDeleteData, setIsLoadingDeleteData] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAssigningTenant, setIsAssigningTenant] = useState(false);
  const [isAssigningParent, setIsAssigningParent] = useState(false);

  // Search states for Combobox
  const [countrySearchText, setCountrySearchText] = useState('');
  const [parentCustomerSearchText, setParentCustomerSearchText] = useState('');
  const [editCountrySearchText, setEditCountrySearchText] = useState('');
  const [assignParentSearchText, setAssignParentSearchText] = useState('');
  const [tenantSearchText, setTenantSearchText] = useState('');
  const [userTenantSearchText, setUserTenantSearchText] = useState('');
  const [officeSearchText, setOfficeSearchText] = useState('');
  const [roleSearchText, setRoleSearchText] = useState('');

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

  // Form state for office
  const [officeFormData, setOfficeFormData] = useState<CreateOfficeRequest>({
    tenantId: '',
    name: '',
    address: '',
    city: '',
    stateProvince: '',
    postalCode: '',
    phone: '',
    email: '',
  });

  // Form state for tenant
  const [tenantFormData, setTenantFormData] = useState<CreateTenantRequest>({
    name: '',
    customerId: '',
  });

  // Form state for user
  const [userFormData, setUserFormData] = useState<CreateUserRequest>({
    email: '',
    name: '',
    role: 'User',
    tenantId: '',
    customerId: '',
    contactEmail: '',
    phone: '',
    auth0Id: '',
  });
  const [availableOffices, setAvailableOffices] = useState<OfficeDto[]>([]);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>('');
  const [usersForPopover, setUsersForPopover] = useState<UserDto[]>([]);
  const [isLoadingUsersForPopover, setIsLoadingUsersForPopover] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState<string | null>(null);
  const [contactPopoverOpen, setContactPopoverOpen] = useState<string | null>(null);
  const [officeContactPopoverOpen, setOfficeContactPopoverOpen] = useState<string | null>(null);

  // Estados para tabs en detalles y edición
  const [detailsActiveTab, setDetailsActiveTab] = useState<'details' | 'tenants' | 'offices' | 'users'>('details');
  const [editActiveTab, setEditActiveTab] = useState<'details' | 'tenants' | 'offices' | 'users'>('details');
  
  // Estados para asignación de tenants, sedes y usuarios
  const [allTenantsForAssign, setAllTenantsForAssign] = useState<TenantDto[]>([]);
  const [allUsersForAssign, setAllUsersForAssign] = useState<UserDto[]>([]);
  const [selectedTenantIdsForAssign, setSelectedTenantIdsForAssign] = useState<Set<string>>(new Set());
  const [selectedOfficeIdsForAssign, setSelectedOfficeIdsForAssign] = useState<Set<string>>(new Set());
  const [selectedUserIdsForAssign, setSelectedUserIdsForAssign] = useState<Set<string>>(new Set());
  const [selectedTenantToAdd, setSelectedTenantToAdd] = useState<string>('');
  const [selectedOfficeToAdd, setSelectedOfficeToAdd] = useState<string>('');
  const [selectedUserToAdd, setSelectedUserToAdd] = useState<string>('');
  const [selectedTenantForOffice, setSelectedTenantForOffice] = useState<string>('');
  const [isAssigningTenantToCustomer, setIsAssigningTenantToCustomer] = useState(false);
  const [isAssigningOfficeToCustomer, setIsAssigningOfficeToCustomer] = useState(false);
  const [isAssigningUserToCustomer, setIsAssigningUserToCustomer] = useState(false);
  const [isLoadingAllTenants, setIsLoadingAllTenants] = useState(false);
  const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(false);
  const [isCreatingOfficeFromTab, setIsCreatingOfficeFromTab] = useState(false);
  const [availableOfficesFromTenants, setAvailableOfficesFromTenants] = useState<OfficeDto[]>([]);
  const [isLoadingAvailableOffices, setIsLoadingAvailableOffices] = useState(false);

  const isLoadingRef = useRef(false);
  const hasLoadedRef = useRef(false);

  // Función para calcular los conteos de tenants, sedes y usuarios para cada cliente
  const calculateCustomerCounts = useCallback(async (customers: CustomerDto[]): Promise<CustomerDto[]> => {
    try {
      // Calcular conteos para todos los clientes en paralelo
      const customersWithCounts = await Promise.all(
        customers.map(async (customer) => {
          try {
            // Obtener tenants, sedes y usuarios del cliente en paralelo
            const [tenants, offices, users] = await Promise.allSettled([
              customerService.getCustomerTenants(customer.id),
              officeService.getOfficesByCustomer(customer.id),
              customerService.getCustomerUsers(customer.id),
            ]);

            // Extraer los valores o usar arrays vacíos si falló
            const tenantCount = tenants.status === 'fulfilled' ? tenants.value.length : 0;
            const officeCount = offices.status === 'fulfilled' ? offices.value.length : 0;
            const userCount = users.status === 'fulfilled' ? users.value.length : 0;

            // Retornar el cliente con los conteos actualizados
            return {
              ...customer,
              tenantCount,
              officeCount,
              userCount,
            };
          } catch (err) {
            console.error(`[CustomersPage] Error calculando conteos para cliente ${customer.id}:`, err);
            // Si hay error, retornar el cliente con conteos en 0
            return {
              ...customer,
              tenantCount: 0,
              officeCount: 0,
              userCount: 0,
            };
          }
        })
      );

      return customersWithCounts;
    } catch (err) {
      console.error('[CustomersPage] Error calculando conteos de clientes:', err);
      return customers;
    }
  }, []);

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
      console.log('[CustomersPage] Clientes cargados:', data.length);
      
      // Calcular los conteos de tenants, sedes y usuarios
      console.log('[CustomersPage] Calculando conteos de tenants, sedes y usuarios...');
      const customersWithCounts = await calculateCustomerCounts(data);
      setCustomers(customersWithCounts);
      console.log('[CustomersPage] Conteos calculados correctamente');
    } catch (err: any) {
      console.error('[CustomersPage] Error cargando clientes:', err);
      setError(err.message || 'Error al cargar clientes');
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [calculateCustomerCounts]);

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
          label: 'Nuevo',
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
            setHasParent(true);
            setCreateParentId('');
            setSkipDefaultStructure(false);
            setCountrySearchText('');
            setParentCustomerSearchText('');
            setCreateCustomerError(null);
            setIsCreateDialogOpen(true);
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

  // Filtrar países para el Combobox de crear cliente
  const filteredCountries = useMemo(() => {
    if (!countrySearchText.trim()) return countries;
    const searchLower = countrySearchText.toLowerCase();
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchLower) ||
      country.isoCode.toLowerCase().includes(searchLower)
    );
  }, [countries, countrySearchText]);

  // Filtrar clientes para el Combobox de cliente padre (crear)
  const filteredParentCustomers = useMemo(() => {
    if (!parentCustomerSearchText.trim()) return customers;
    const searchLower = parentCustomerSearchText.toLowerCase();
    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchLower) ||
      customer.identification.toLowerCase().includes(searchLower)
    );
  }, [customers, parentCustomerSearchText]);

  // Filtrar países para el Combobox de editar cliente
  const filteredEditCountries = useMemo(() => {
    if (!editCountrySearchText.trim()) return countries;
    const searchLower = editCountrySearchText.toLowerCase();
    return countries.filter((country) =>
      country.name.toLowerCase().includes(searchLower) ||
      country.isoCode.toLowerCase().includes(searchLower)
    );
  }, [countries, editCountrySearchText]);

  // Filtrar clientes para el Combobox de asignar padre
  const filteredAssignParentCustomers = useMemo(() => {
    if (!assignParentSearchText.trim()) return customers.filter((c) => c.id !== selectedCustomer?.id);
    const searchLower = assignParentSearchText.toLowerCase();
    return customers
      .filter((c) => c.id !== selectedCustomer?.id)
      .filter((customer) =>
        customer.name.toLowerCase().includes(searchLower) ||
        customer.identification.toLowerCase().includes(searchLower)
      );
  }, [customers, assignParentSearchText, selectedCustomer]);

  // Filtrar tenants para el Combobox de crear sede
  const filteredTenants = useMemo(() => {
    if (!tenantSearchText.trim()) return customerTenants;
    const searchLower = tenantSearchText.toLowerCase();
    return customerTenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(searchLower)
    );
  }, [customerTenants, tenantSearchText]);

  // Filtrar tenants para el Combobox de crear usuario
  const filteredUserTenants = useMemo(() => {
    if (!userTenantSearchText.trim()) return customerTenants;
    const searchLower = userTenantSearchText.toLowerCase();
    return customerTenants.filter((tenant) =>
      tenant.name.toLowerCase().includes(searchLower)
    );
  }, [customerTenants, userTenantSearchText]);

  // Filtrar sedes para el Combobox de crear usuario
  const filteredOffices = useMemo(() => {
    const officesForTenant = availableOffices.filter(o => o.tenantId === userFormData.tenantId);
    if (!officeSearchText.trim()) return officesForTenant;
    const searchLower = officeSearchText.toLowerCase();
    return officesForTenant.filter((office) =>
      office.name.toLowerCase().includes(searchLower)
    );
  }, [availableOffices, userFormData.tenantId, officeSearchText]);

  // Filtrar roles para el Combobox de crear usuario
  const filteredRoles = useMemo(() => {
    const roles = [
      { value: 'User', label: 'Usuario' },
      { value: 'Admin', label: 'Administrador' }
    ];
    if (!roleSearchText.trim()) return roles;
    const searchLower = roleSearchText.toLowerCase();
    return roles.filter((role) =>
      role.label.toLowerCase().includes(searchLower)
    );
  }, [roleSearchText]);

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

  // Función para aplanar el árbol en una lista plana para la tabla
  const flattenCustomerTree = useCallback((nodes: CustomerNode[]): CustomerNode[] => {
    const result: CustomerNode[] = [];
    const flatten = (nodeList: CustomerNode[]) => {
      nodeList.forEach((node) => {
        result.push(node);
        if (expandedNodes.has(node.id) && node.children.length > 0) {
          flatten(node.children);
        }
      });
    };
    flatten(nodes);
    return result;
  }, [expandedNodes]);

  const flattenedCustomers = flattenCustomerTree(customerTree);

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
            <div className={styles.treeCell} style={{ justifyContent: 'center', minWidth: '70px' }}>
              {(() => {
                const tenantCount = node.tenantCount ?? 0;
                
                if (tenantCount === 0) {
                  // Si no hay tenants, mostrar botón para crear
                  return (
                    <Button
                      appearance="subtle"
                      onClick={() => handleOpenCreateTenant(node)}
                      style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                    >
                      <Badge 
                        size="medium" 
                        appearance="filled" 
                        color="informative"
                        style={{ minWidth: '24px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        0
                      </Badge>
                    </Button>
                  );
                }
                
                // Si hay tenants, mostrar botón para ver
                return (
                  <Button
                    appearance="subtle"
                    onClick={() => handleViewTenants(node)}
                    style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                  >
                    <CounterBadge 
                      count={tenantCount} 
                      size="medium" 
                      appearance="filled" 
                      color="brand"
                    />
                  </Button>
                );
              })()}
            </div>
            <div className={styles.treeCell} style={{ justifyContent: 'center', minWidth: '70px' }}>
              {(() => {
                const officeCount = node.officeCount ?? 0;
                
                if (officeCount === 0) {
                  // Si no hay sedes, mostrar botón para crear
                  return (
                    <Button
                      appearance="subtle"
                      onClick={() => handleOpenCreateOffice(node)}
                      style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                    >
                      <Badge 
                        size="medium" 
                        appearance="filled" 
                        color="informative"
                        style={{ minWidth: '24px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        0
                      </Badge>
                    </Button>
                  );
                }
                
                // Si hay sedes, mostrar botón para ver
                return (
                  <Button
                    appearance="subtle"
                    onClick={() => handleViewOffices(node)}
                    style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                  >
                    <CounterBadge 
                      count={officeCount} 
                      size="medium" 
                      appearance="filled" 
                      color="brand"
                    />
                  </Button>
                );
              })()}
            </div>
            <div className={styles.treeCell} style={{ justifyContent: 'center', minWidth: '80px' }}>
              {(() => {
                const userCount = node.userCount ?? 0;
                
                if (userCount === 0) {
                  // Si no hay usuarios, mostrar botón para crear
                  return (
                    <Button
                      appearance="subtle"
                      onClick={() => handleOpenCreateUser(node)}
                      style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                    >
                      <Badge 
                        size="medium" 
                        appearance="filled" 
                        color="informative"
                        style={{ minWidth: '24px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        0
                      </Badge>
                    </Button>
                  );
                }
                
                // Si hay usuarios, mostrar CounterBadge
                return (
                  <CounterBadge 
                    count={userCount} 
                    size="medium" 
                    appearance="filled" 
                    color="brand"
                  />
                );
              })()}
            </div>
            <div className={styles.treeCell} style={{ justifyContent: 'center', minWidth: '110px' }}>
              {node.isSuspended ? (
                <Badge appearance="filled" color="danger">Suspendido</Badge>
              ) : node.isActive ? (
                <Badge appearance="filled" color="success">Activo</Badge>
              ) : (
                <Badge appearance="outline">Inactivo</Badge>
              )}
            </div>
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
                    <MenuItem icon={<LocationRegular />} onClick={() => handleOpenCreateOffice(node)}>
                      Agregar Sede
                    </MenuItem>
                    <MenuItem icon={<BriefcaseRegular />} onClick={() => handleOpenCreateTenant(node)}>
                      Agregar Tenant
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
    setEditActiveTab('details');
    setFormData({
      name: customer.name,
      identification: customer.identification,
      countryId: customer.countryId,
      stateProvince: customer.stateProvince || '',
      city: customer.city || '',
      phone: customer.phone || '',
      email: customer.email || '',
    });
    setEditCountrySearchText('');
    
    // Cargar datos relacionados
    try {
      setIsLoadingTenants(true);
      setIsLoadingOffices(true);
      setIsLoadingUsers(true);
      
      const [tenants, offices, users] = await Promise.all([
        customerService.getCustomerTenants(customer.id),
        officeService.getOfficesByCustomer(customer.id),
        customerService.getCustomerUsers(customer.id),
      ]);
      
      setCustomerTenants(tenants);
      setCustomerOffices(offices);
      setCustomerUsers(users);
      
      // Cargar sedes disponibles después de cargar los tenants
      if (tenants.length > 0) {
        // Esperar un momento para que los estados se actualicen
        setTimeout(() => {
          loadAvailableOfficesFromTenants();
        }, 100);
      }
    } catch (err: any) {
      console.error('[CustomersPage] Error cargando datos del cliente:', err);
      setCustomerTenants([]);
      setCustomerOffices([]);
      setCustomerUsers([]);
    } finally {
      setIsLoadingTenants(false);
      setIsLoadingOffices(false);
      setIsLoadingUsers(false);
    }
    
    setIsEditDialogOpen(true);
  };

  const handleCreate = async () => {
    if (!formData.name.trim() || !formData.identification.trim() || !formData.countryId) {
      setCreateCustomerError('Nombre, identificación y país son requeridos');
      return;
    }

    if (hasParent && !createParentId) {
      setCreateCustomerError('Debe seleccionar un cliente padre');
      return;
    }

    try {
      setCreateCustomerError(null);
      setIsCreating(true);
      const createData: CreateCustomerRequest = {
        ...formData,
        parentId: hasParent && createParentId ? createParentId : undefined,
        skipDefaultStructure: skipDefaultStructure,
      };
      await customerService.createCustomer(createData);
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
      setHasParent(false);
      setCreateParentId('');
      setSkipDefaultStructure(false);
      setCountrySearchText('');
      setParentCustomerSearchText('');
      setCreateCustomerError(null);
      await loadCustomers();
    } catch (err: any) {
      setCreateCustomerError(err.message || 'Error al crear cliente');
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
      
      if (hasData || hasParent || createParentId) {
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
          setHasParent(false);
          setCreateParentId('');
          setSkipDefaultStructure(false);
          setCountrySearchText('');
          setParentCustomerSearchText('');
          setCreateCustomerError(null);
        }
        // Si el usuario cancela, no actualizamos el estado (mantiene el Drawer abierto)
        return;
      }
    }
    
    // Permitir abrir normalmente o cerrar si no hay datos
    setIsCreateDialogOpen(data.open);
  };

  const handleEditDrawerOpenChange = (event: any, data: { open: boolean }) => {
    // Con modalType="alert", el Drawer no se puede cerrar con clic fuera o ESC
    // Solo se puede cerrar programáticamente, así que solo necesitamos manejar la confirmación
    if (data.open === false) {
      // Prevenir el cierre si está guardando
      if (isSaving) {
        return;
      }
      
      // Verificar si hay datos modificados en el formulario
      if (!selectedCustomer) {
        setIsEditDialogOpen(false);
        setCustomerTenants([]);
        setSelectedCustomer(null);
        setFormData({
          name: '',
          identification: '',
          countryId: '',
          stateProvince: '',
          city: '',
          phone: '',
          email: '',
        });
        setEditCountrySearchText('');
        return;
      }

      const hasChanges = 
        formData.name !== selectedCustomer.name ||
        formData.identification !== selectedCustomer.identification ||
        formData.countryId !== selectedCustomer.countryId ||
        formData.stateProvince !== (selectedCustomer.stateProvince || '') ||
        formData.city !== (selectedCustomer.city || '') ||
        formData.phone !== (selectedCustomer.phone || '') ||
        formData.email !== (selectedCustomer.email || '');
      
      if (hasChanges) {
        // Si hay cambios y se intenta cerrar, mostrar confirmación
        if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los cambios no guardados.')) {
          setIsEditDialogOpen(false);
          setCustomerTenants([]);
          setSelectedCustomer(null);
          setFormData({
            name: '',
            identification: '',
            countryId: '',
            stateProvince: '',
            city: '',
            phone: '',
            email: '',
          });
          setEditCountrySearchText('');
          setError(null);
        }
        // Si el usuario cancela, no actualizamos el estado (mantiene el Drawer abierto)
        return;
      } else {
        // Si no hay cambios, cerrar y limpiar estado
        setIsEditDialogOpen(false);
        setCustomerTenants([]);
        setSelectedCustomer(null);
        setFormData({
          name: '',
          identification: '',
          countryId: '',
          stateProvince: '',
          city: '',
          phone: '',
          email: '',
        });
        setEditCountrySearchText('');
        setError(null);
      }
    }
    
    // Permitir abrir normalmente
    if (data.open === true) {
      setIsEditDialogOpen(true);
    }
  };

  const handleDetailsDrawerOpenChange = (event: any, data: { open: boolean }) => {
    // El drawer de detalles es solo lectura, se puede cerrar sin confirmación
    if (data.open === false) {
      setIsDetailsDialogOpen(false);
      setSelectedCustomer(null);
    } else {
      setIsDetailsDialogOpen(true);
    }
  };

  const handleAssignTenant = async () => {
    if (!selectedCustomer) return;

    try {
      setError(null);
      setIsAssigningTenant(true);
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
    } finally {
      setIsAssigningTenant(false);
    }
  };

  const handleDelete = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
    setDeleteStep(1);
    setDeleteConsentChecked(false);
    setDeleteTenants(new Set());
    setDeleteOffices(new Set());
    setDeleteUsers(new Set());
    setIsLoadingDeleteData(true);
    
    try {
      // Cargar todos los datos relacionados
      const [tenants, offices, directUsers] = await Promise.all([
        customerService.getCustomerTenants(customer.id),
        officeService.getOfficesByCustomer(customer.id),
        customerService.getCustomerUsers(customer.id),
      ]);
      
      setDeleteRelatedTenants(tenants);
      setDeleteRelatedOffices(offices);
      
      // Seleccionar todos los tenants por defecto
      const defaultTenantIds = new Set<string>(tenants.map((t: TenantDto) => t.id));
      setDeleteTenants(defaultTenantIds);
      
      // Seleccionar todas las sedes por defecto (ya que todos los tenants están seleccionados)
      const defaultOfficeIds = new Set<string>(offices.map((o: OfficeDto) => o.id));
      setDeleteOffices(defaultOfficeIds);
      
      // Obtener usuarios de todos los tenants relacionados
      const tenantUsersPromises = tenants.map((tenant: TenantDto) => 
        userService.getUsersByTenantId(tenant.id).catch(() => [] as UserDto[])
      );
      const tenantUsersArrays = await Promise.all(tenantUsersPromises);
      const tenantUsers = tenantUsersArrays.flat();
      
      // Obtener usuarios de todas las sedes relacionadas
      const officeUsersPromises = offices.map((office: OfficeDto) => 
        officeService.getOfficeUsers(office.id).catch(() => [] as any[])
      );
      const officeUsersArrays = await Promise.all(officeUsersPromises);
      const officeUsersRaw = officeUsersArrays.flat();
      // Transformar usuarios de sedes al formato UserDto si es necesario
      const officeUsers = officeUsersRaw.map((user: any): UserDto | null => {
        if (user.id && user.email) {
          return {
            id: user.id,
            email: user.email,
            name: user.name || null,
            tenantId: user.tenantId || null,
            customerId: user.customerId || null,
            role: user.role === 1 || user.role === 'Admin' ? 'Admin' : 'User',
            contactEmail: user.contactEmail || null,
            phone: user.phone || null,
            auth0Id: user.auth0Id || null,
            createdAt: user.createdAt || '',
            updatedAt: user.updatedAt || '',
            isActive: user.isActive ?? user.IsActive ?? true,
            isSuspended: user.isSuspended ?? user.IsSuspended ?? false,
          } as UserDto;
        }
        return null;
      }).filter((user): user is UserDto => user !== null);
      
      // Consolidar todos los usuarios y eliminar duplicados por ID
      const allUsers = [...directUsers, ...tenantUsers, ...officeUsers];
      const uniqueUsersMap = new Map<string, UserDto>();
      allUsers.forEach((user: UserDto) => {
        if (!uniqueUsersMap.has(user.id)) {
          uniqueUsersMap.set(user.id, user);
        }
      });
      const uniqueUsers = Array.from(uniqueUsersMap.values());
      
      setDeleteRelatedUsers(uniqueUsers);
      
      // Seleccionar todos los usuarios por defecto
      const defaultUserIds = new Set<string>(uniqueUsers.map((u: UserDto) => u.id));
      setDeleteUsers(defaultUserIds);
    } catch (err: any) {
      setError(err.message || 'Error al cargar datos relacionados');
    } finally {
      setIsLoadingDeleteData(false);
    }
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
    setDetailsActiveTab('details');
    setIsDetailsDialogOpen(true);
    
    // Cargar datos relacionados
    try {
      setIsLoadingTenants(true);
      setIsLoadingOffices(true);
      setIsLoadingUsers(true);
      
      const [tenants, offices, users] = await Promise.all([
        customerService.getCustomerTenants(customer.id),
        officeService.getOfficesByCustomer(customer.id),
        customerService.getCustomerUsers(customer.id),
      ]);
      
      setCustomerTenants(tenants);
      setCustomerOffices(offices);
      setCustomerUsers(users);
      
      // Cargar sedes disponibles después de cargar los tenants
      // El useEffect se encargará de cargar las sedes cuando cambien los estados
    } catch (err: any) {
      console.error('[CustomersPage] Error cargando datos del cliente:', err);
    } finally {
      setIsLoadingTenants(false);
      setIsLoadingOffices(false);
      setIsLoadingUsers(false);
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

  const handleViewTenants = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setIsLoadingTenants(true);
    setIsTenantsDialogOpen(true);
    try {
      const tenants = await customerService.getCustomerTenants(customer.id);
      setCustomerTenants(tenants);
    } catch (err: any) {
      setError(err.message || 'Error al cargar tenants');
    } finally {
      setIsLoadingTenants(false);
    }
  };

  const handleViewOffices = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setIsLoadingOffices(true);
    setIsOfficesDialogOpen(true);
    try {
      const offices = await officeService.getOfficesByCustomer(customer.id);
      setCustomerOffices(offices);
    } catch (err: any) {
      setError(err.message || 'Error al cargar sedes');
    } finally {
      setIsLoadingOffices(false);
    }
  };

  const handleViewTenantInfo = async (tenantId: string) => {
    setIsLoadingTenant(true);
    setIsTenantInfoDialogOpen(true);
    try {
      const tenant = await tenantService.getTenantById(tenantId);
      setSelectedTenant(tenant);
    } catch (err: any) {
      setError(err.message || 'Error al cargar información del tenant');
      setSelectedTenant(null);
    } finally {
      setIsLoadingTenant(false);
    }
  };

  // Funciones para asignar/desasignar tenants
  const loadAllTenantsForAssign = useCallback(async () => {
    if (!selectedCustomer) return;
    try {
      setIsLoadingAllTenants(true);
      const allTenants = await tenantService.getAllTenants();
      // Filtrar tenants que no pertenecen al cliente
      const availableTenants = allTenants.filter(
        (tenant) => tenant.customerId !== selectedCustomer.id
      );
      setAllTenantsForAssign(availableTenants);
    } catch (err: any) {
      console.error('[CustomersPage] Error cargando todos los tenants:', err);
    } finally {
      setIsLoadingAllTenants(false);
    }
  }, [selectedCustomer]);

  // Funciones para asignar/desasignar usuarios
  const loadAllUsersForAssign = useCallback(async () => {
    if (!selectedCustomer) return;
    try {
      setIsLoadingAllUsers(true);
      const allUsers = await userService.getAllUsers();
      // Filtrar usuarios que no pertenecen al cliente
      const customerUserIds = new Set(customerUsers.map(u => u.id));
      const availableUsers = allUsers.filter(
        (user) => !customerUserIds.has(user.id)
      );
      setAllUsersForAssign(availableUsers);
    } catch (err: any) {
      console.error('[CustomersPage] Error cargando todos los usuarios:', err);
    } finally {
      setIsLoadingAllUsers(false);
    }
  }, [selectedCustomer, customerUsers]);

  // Función para cargar sedes disponibles de los tenants del cliente
  const loadAvailableOfficesFromTenants = useCallback(async () => {
    if (!selectedCustomer || customerTenants.length === 0) {
      setAvailableOfficesFromTenants([]);
      return;
    }
    
    try {
      setIsLoadingAvailableOffices(true);
      console.log('[CustomersPage] Cargando sedes de tenants:', customerTenants.length);
      
      // Obtener todas las sedes de todos los tenants del cliente
      const officePromises = customerTenants.map(tenant => 
        officeService.getOfficesByTenant(tenant.id).catch(err => {
          console.error(`[CustomersPage] Error cargando sedes del tenant ${tenant.id}:`, err);
          return [];
        })
      );
      const officesArrays = await Promise.all(officePromises);
      const allTenantOffices = officesArrays.flat();
      
      console.log('[CustomersPage] Sedes de todos los tenants:', allTenantOffices.length);
      console.log('[CustomersPage] Sedes del cliente actuales:', customerOffices.length);
      
      // Filtrar las sedes que ya están en customerOffices
      // Usar un Set para comparación más eficiente
      const customerOfficeIds = new Set(customerOffices.map(o => o.id));
      const availableOffices = allTenantOffices.filter(
        (office) => !customerOfficeIds.has(office.id)
      );
      
      console.log('[CustomersPage] Sedes disponibles para agregar:', availableOffices.length);
      console.log('[CustomersPage] IDs de sedes del cliente:', Array.from(customerOfficeIds));
      console.log('[CustomersPage] IDs de sedes de tenants:', allTenantOffices.map(o => o.id));
      console.log('[CustomersPage] Sedes disponibles:', availableOffices.map(o => ({ id: o.id, name: o.name })));
      
      setAvailableOfficesFromTenants(availableOffices);
    } catch (err: any) {
      console.error('[CustomersPage] Error cargando sedes disponibles de tenants:', err);
      setAvailableOfficesFromTenants([]);
    } finally {
      setIsLoadingAvailableOffices(false);
    }
  }, [selectedCustomer, customerTenants, customerOffices]);

  // Cargar todos los tenants y usuarios cuando se abre el drawer de detalles
  useEffect(() => {
    if (isDetailsDialogOpen && selectedCustomer) {
      loadAllTenantsForAssign();
      loadAllUsersForAssign();
    }
  }, [isDetailsDialogOpen, selectedCustomer, loadAllTenantsForAssign, loadAllUsersForAssign]);

  // Cargar todos los tenants y usuarios cuando se abre el drawer de edición
  useEffect(() => {
    if (isEditDialogOpen && selectedCustomer) {
      loadAllTenantsForAssign();
      loadAllUsersForAssign();
    }
  }, [isEditDialogOpen, selectedCustomer, loadAllTenantsForAssign, loadAllUsersForAssign]);

  // Cargar sedes disponibles cuando cambian los tenants o las sedes del cliente
  useEffect(() => {
    if ((isDetailsDialogOpen || isEditDialogOpen) && selectedCustomer && customerTenants.length > 0) {
      console.log('[CustomersPage] useEffect: Cargando sedes disponibles, tenants:', customerTenants.length, 'sedes actuales:', customerOffices.length);
      console.log('[CustomersPage] useEffect: IDs de tenants:', customerTenants.map(t => t.id));
      // Cargar inmediatamente cuando cambian los tenants o las sedes
      loadAvailableOfficesFromTenants();
    } else if ((isDetailsDialogOpen || isEditDialogOpen) && selectedCustomer && customerTenants.length === 0) {
      // Si no hay tenants, limpiar las sedes disponibles
      console.log('[CustomersPage] useEffect: No hay tenants, limpiando sedes disponibles');
      setAvailableOfficesFromTenants([]);
    }
  }, [isDetailsDialogOpen, isEditDialogOpen, selectedCustomer?.id, customerTenants, customerOffices, loadAvailableOfficesFromTenants]);

  const handleAssignTenantToCustomer = async () => {
    if (!selectedCustomer || !selectedTenantToAdd) return;
    
    try {
      setIsAssigningTenantToCustomer(true);
      setError(null);
      // Obtener el nombre del tenant para asignarlo
      const tenant = allTenantsForAssign.find(t => t.id === selectedTenantToAdd);
      if (tenant) {
        await tenantService.updateTenant(selectedTenantToAdd, {
          name: tenant.name,
          customerId: selectedCustomer.id,
        });
      }
      setSelectedTenantToAdd('');
      // Recargar tenants del cliente
      const tenants = await customerService.getCustomerTenants(selectedCustomer.id);
      setCustomerTenants(tenants);
      // Recargar sedes del cliente (pueden haber cambiado)
      const offices = await officeService.getOfficesByCustomer(selectedCustomer.id);
      setCustomerOffices(offices);
      await loadAllTenantsForAssign();
      await loadAvailableOfficesFromTenants();
      await loadCustomers();
      
      // Actualizar el cliente seleccionado
      const updatedCustomer = await customerService.getCustomerById(selectedCustomer.id);
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
    } catch (err: any) {
      setError(err.message || 'Error al asignar tenant');
    } finally {
      setIsAssigningTenantToCustomer(false);
    }
  };

  const handleRemoveTenantFromCustomer = async (tenantId: string) => {
    if (!selectedCustomer) return;
    
    try {
      setIsAssigningTenantToCustomer(true);
      setError(null);
      const tenant = customerTenants.find(t => t.id === tenantId);
      if (tenant) {
        // Enviar un GUID vacío para desasignar el tenant
        // El backend elimina la relación cuando CustomerId es Guid.Empty
        await tenantService.updateTenant(tenantId, {
          name: tenant.name,
          customerId: '00000000-0000-0000-0000-000000000000', // GUID vacío para desasignar
        });
      }
      // Recargar tenants del cliente
      const tenants = await customerService.getCustomerTenants(selectedCustomer.id);
      setCustomerTenants(tenants);
      // Recargar sedes del cliente (pueden haber cambiado si se desasignó un tenant)
      const offices = await officeService.getOfficesByCustomer(selectedCustomer.id);
      setCustomerOffices(offices);
      await loadAllTenantsForAssign();
      await loadAvailableOfficesFromTenants();
      await loadCustomers();
      
      // Actualizar el cliente seleccionado
      const updatedCustomer = await customerService.getCustomerById(selectedCustomer.id);
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
    } catch (err: any) {
      console.error('[CustomersPage] Error al desasignar tenant:', err);
      setError(err.message || 'Error al desasignar tenant');
    } finally {
      setIsAssigningTenantToCustomer(false);
    }
  };

  const handleAssignUserToCustomer = async () => {
    if (!selectedCustomer || !selectedUserToAdd || !selectedTenantToAdd) return;
    
    try {
      setIsAssigningUserToCustomer(true);
      setError(null);
      // Asignar usuario al tenant del cliente
      await userService.assignTenantToUser(selectedUserToAdd, selectedTenantToAdd);
      setSelectedUserToAdd('');
      setSelectedTenantToAdd('');
      // Recargar usuarios del cliente
      const users = await customerService.getCustomerUsers(selectedCustomer.id);
      setCustomerUsers(users);
      await loadAllUsersForAssign();
      await loadCustomers();
      
      // Actualizar el cliente seleccionado
      const updatedCustomer = await customerService.getCustomerById(selectedCustomer.id);
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
    } catch (err: any) {
      setError(err.message || 'Error al asignar usuario');
    } finally {
      setIsAssigningUserToCustomer(false);
    }
  };

  const handleRemoveUserFromCustomer = async (userId: string) => {
    if (!selectedCustomer) return;
    
    try {
      setIsAssigningUserToCustomer(true);
      setError(null);
      // Obtener los tenants del usuario
      const userTenants = await userService.getUserTenants(userId);
      // Desasignar de todos los tenants del cliente
      const customerTenantIds = new Set(customerTenants.map(t => t.id));
      const removePromises = userTenants
        .filter((ut: any) => customerTenantIds.has(ut.id || ut.tenantId))
        .map((ut: any) => userService.removeTenantFromUser(userId, ut.id || ut.tenantId));
      
      await Promise.all(removePromises);
      // Recargar usuarios del cliente
      const users = await customerService.getCustomerUsers(selectedCustomer.id);
      setCustomerUsers(users);
      await loadAllUsersForAssign();
      await loadCustomers();
      
      // Actualizar el cliente seleccionado
      const updatedCustomer = await customerService.getCustomerById(selectedCustomer.id);
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
    } catch (err: any) {
      setError(err.message || 'Error al desasignar usuario');
    } finally {
      setIsAssigningUserToCustomer(false);
    }
  };

  // Función para crear una sede desde el tab
  const handleCreateOfficeFromTab = async () => {
    if (!selectedCustomer || !selectedTenantForOffice || !officeFormData.name.trim()) {
      setError('El nombre de la sede y el tenant son requeridos');
      return;
    }

    try {
      setIsCreatingOfficeFromTab(true);
      setError(null);
      await officeService.createOffice({
        ...officeFormData,
        tenantId: selectedTenantForOffice,
      });
      
      // Limpiar formulario
      setOfficeFormData({
        tenantId: '',
        name: '',
        address: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        phone: '',
        email: '',
      });
      setSelectedTenantForOffice('');
      setSelectedOfficeToAdd('');
      
      // Recargar sedes del cliente
      const offices = await officeService.getOfficesByCustomer(selectedCustomer.id);
      setCustomerOffices(offices);
      await loadAvailableOfficesFromTenants();
      await loadCustomers();
      
      // Actualizar el cliente seleccionado para reflejar los nuevos conteos
      if (selectedCustomer) {
        const updatedCustomer = await customerService.getCustomerById(selectedCustomer.id);
        if (updatedCustomer) {
          setSelectedCustomer(updatedCustomer);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error al crear sede');
    } finally {
      setIsCreatingOfficeFromTab(false);
    }
  };

  // Función para agregar una sede existente desde los tenants
  const handleAddExistingOffice = async () => {
    if (!selectedCustomer || !selectedOfficeToAdd) return;

    try {
      setIsAssigningOfficeToCustomer(true);
      setError(null);
      
      // La sede ya pertenece a un tenant del cliente, solo necesitamos recargar
      // Recargar sedes del cliente para actualizar la lista
      const offices = await officeService.getOfficesByCustomer(selectedCustomer.id);
      setCustomerOffices(offices);
      await loadAvailableOfficesFromTenants();
      await loadCustomers();
      
      // Actualizar el cliente seleccionado
      const updatedCustomer = await customerService.getCustomerById(selectedCustomer.id);
      if (updatedCustomer) {
        setSelectedCustomer(updatedCustomer);
      }
      
      setSelectedOfficeToAdd('');
    } catch (err: any) {
      console.error('[CustomersPage] Error al agregar sede existente:', err);
      setError(err.message || 'Error al agregar sede');
    } finally {
      setIsAssigningOfficeToCustomer(false);
    }
  };

  const handleOpenCreateOffice = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setCreateOfficeError(null);
    setIsCreateOfficeDialogOpen(true);
    
    // Cargar tenants del cliente
    try {
      const tenants = await customerService.getCustomerTenants(customer.id);
      setCustomerTenants(tenants);
      
      // Establecer el primer tenant por defecto si existe
      const defaultTenantId = tenants.length > 0 ? tenants[0].id : '';
      setOfficeFormData({
        tenantId: defaultTenantId,
        name: '',
        address: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        phone: '',
        email: '',
      });
      setTenantSearchText('');
    } catch (err: any) {
      console.error('Error cargando tenants:', err);
      setCustomerTenants([]);
      setOfficeFormData({
        tenantId: '',
        name: '',
        address: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        phone: '',
        email: '',
      });
      setTenantSearchText('');
    }
  };

  const handleOpenCreateTenant = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    setCreateTenantError(null);
    setTenantFormData({
      name: '',
      customerId: customer.id,
    });
    setSelectedTenantToAdd('');
    
    // Si el cliente no tiene tenants, cargar todos los tenants disponibles para asignar
    const tenantCount = customer.tenantCount ?? 0;
    if (tenantCount === 0) {
      try {
        setIsLoadingAllTenants(true);
        const allTenants = await tenantService.getAllTenants();
        // Filtrar tenants que no pertenecen al cliente
        const availableTenants = allTenants.filter(
          (tenant) => tenant.customerId !== customer.id
        );
        setAllTenantsForAssign(availableTenants);
      } catch (err: any) {
        console.error('[CustomersPage] Error cargando todos los tenants:', err);
      } finally {
        setIsLoadingAllTenants(false);
      }
    }
    
    setIsCreateTenantDialogOpen(true);
  };

  const handleOpenCreateUser = async (customer: CustomerDto) => {
    setSelectedCustomer(customer);
    
    try {
      // Cargar tenants y sedes del cliente
      const [tenants, offices] = await Promise.all([
        customerService.getCustomerTenants(customer.id),
        officeService.getOfficesByCustomer(customer.id),
      ]);

      // Validar si el cliente tiene al menos un tenant y una sede
      if (tenants.length === 0 || offices.length === 0) {
        dispatchToast(
          'No se puede crear un usuario para un cliente que no tiene tenants y sedes',
          { intent: 'warning' }
        );
        return;
      }

      // Si tiene tenants y sedes, abrir el drawer
      setCustomerTenants(tenants);
      setAvailableOffices(offices);
      
      // Establecer el primer tenant por defecto si existe
      const defaultTenantId = tenants.length > 0 ? tenants[0].id : '';
      // Establecer la primera sede del tenant por defecto si existe
      const defaultOfficeId = offices.filter(o => o.tenantId === defaultTenantId).length > 0 
        ? offices.filter(o => o.tenantId === defaultTenantId)[0].id 
        : '';
      
      setUserFormData({
        email: '',
        name: '',
        role: 'User',
        tenantId: defaultTenantId,
        customerId: customer.id,
        contactEmail: '',
        phone: '',
        auth0Id: '',
      });
      setSelectedOfficeId(defaultOfficeId);
      setUserTenantSearchText('');
      setOfficeSearchText('');
      setRoleSearchText('');
      setCreateUserError(null);
      
      setIsCreateUserDrawerOpen(true);
    } catch (err: any) {
      console.error('Error cargando datos del cliente:', err);
      dispatchToast(
        'Error al cargar la información del cliente',
        { intent: 'error' }
      );
    }
  };

  const handleViewUsersInPopover = async (customer: CustomerDto) => {
    try {
      setIsLoadingUsersForPopover(true);
      // Abrir el popover primero
      setPopoverOpen(customer.id);
      
      // Cargar usuarios del cliente
      const users = await customerService.getCustomerUsers(customer.id);
      setUsersForPopover(users);
    } catch (err: any) {
      console.error('Error cargando usuarios:', err);
      dispatchToast(
        'Error al cargar los usuarios del cliente',
        { intent: 'error' }
      );
      setPopoverOpen(null);
    } finally {
      setIsLoadingUsersForPopover(false);
    }
  };

  const handleUserBadgeClick = (customer: CustomerDto) => {
    const userCount = customer.userCount ?? 0;
    
    if (userCount > 0) {
      // Si hay usuarios, mostrar el popover con la lista
      handleViewUsersInPopover(customer);
    } else {
      // Si no hay usuarios, abrir el drawer para crear uno
      handleOpenCreateUser(customer);
    }
  };

  const handleCreateOffice = async () => {
    if (!selectedCustomer || !officeFormData.name.trim()) {
      setCreateOfficeError('El nombre de la sede es requerido');
      return;
    }
    
    if (!officeFormData.tenantId) {
      setCreateOfficeError('El tenant es requerido');
      return;
    }

    try {
      setCreateOfficeError(null);
      setIsCreatingOffice(true);
      await officeService.createOffice(officeFormData);
      setIsCreateOfficeDialogOpen(false);
      setOfficeFormData({
        tenantId: '',
        name: '',
        address: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        phone: '',
        email: '',
      });
      setTenantSearchText('');
      setCreateOfficeError(null);
      await loadCustomers();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setCreateOfficeError(err.message || 'Error al crear sede');
    } finally {
      setIsCreatingOffice(false);
    }
  };

  const handleCreateTenant = async () => {
    if (!selectedCustomer || !tenantFormData.name.trim()) {
      setCreateTenantError('El nombre del tenant es requerido');
      return;
    }

    try {
      setCreateTenantError(null);
      setIsCreatingTenant(true);
      await tenantService.createTenant(tenantFormData);
      setIsCreateTenantDialogOpen(false);
      setTenantFormData({
        name: '',
        customerId: '',
      });
      setCreateTenantError(null);
      await loadCustomers();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setCreateTenantError(err.message || 'Error al crear tenant');
    } finally {
      setIsCreatingTenant(false);
    }
  };

  const handleAssignTenantFromDialog = async () => {
    if (!selectedCustomer || !selectedTenantToAdd) {
      setCreateTenantError('Debe seleccionar un tenant');
      return;
    }
    
    try {
      setCreateTenantError(null);
      setIsCreatingTenant(true);
      // Obtener el nombre del tenant para asignarlo
      const tenant = allTenantsForAssign.find(t => t.id === selectedTenantToAdd);
      if (tenant) {
        await tenantService.updateTenant(selectedTenantToAdd, {
          name: tenant.name,
          customerId: selectedCustomer.id,
        });
      }
      setIsCreateTenantDialogOpen(false);
      setSelectedTenantToAdd('');
      setCreateTenantError(null);
      await loadCustomers();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setCreateTenantError(err.message || 'Error al asignar tenant');
    } finally {
      setIsCreatingTenant(false);
    }
  };

  const handleCreateUser = async () => {
    if (!selectedCustomer || !userFormData.email.trim()) {
      setCreateUserError('El email es requerido');
      return;
    }

    if (!userFormData.tenantId) {
      setCreateUserError('El tenant es requerido');
      return;
    }

    try {
      setCreateUserError(null);
      setIsCreatingUser(true);
      // Incluir el officeId seleccionado en el request
      // Si no se proporciona auth0Id, el backend lo creará automáticamente en Auth0
      const userRequest = {
        ...userFormData,
        officeId: selectedOfficeId || undefined,
        auth0Id: userFormData.auth0Id?.trim() || undefined,
      };
      await userService.createUser(userRequest);
      setIsCreateUserDrawerOpen(false);
      setUserFormData({
        email: '',
        name: '',
        role: 'User',
        tenantId: '',
        customerId: '',
        contactEmail: '',
        phone: '',
        auth0Id: '',
      });
      setSelectedOfficeId('');
      setUserTenantSearchText('');
      setOfficeSearchText('');
      setRoleSearchText('');
      setCreateUserError(null);
      await loadCustomers();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setCreateUserError(err.message || 'Error al crear usuario');
    } finally {
      setIsCreatingUser(false);
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
    setAssignParentSearchText('');
    setIsAssignParentDialogOpen(true);
  };

  const handleConfirmAssignParent = async () => {
    if (!selectedCustomer) return;

    try {
      setError(null);
      setIsAssigningParent(true);
      await customerService.assignParentToCustomer(
        selectedCustomer.id,
        selectedParentId || undefined
      );
      setIsAssignParentDialogOpen(false);
      setSelectedParentId('');
      setAssignParentSearchText('');
      await loadCustomers();
      if (selectedView === 'flow') {
        await loadFlowData();
      }
    } catch (err: any) {
      setError(err.message || 'Error al asignar cliente padre');
    } finally {
      setIsAssigningParent(false);
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
                    <div className={styles.flowNodeContent}>Rol: {getRoleLabel(user.role)}</div>
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

    if (!formData.name.trim() || !formData.identification.trim() || !formData.countryId) {
      setError('Nombre, identificación y país son requeridos');
      return;
    }

    try {
      setError(null);
      setIsSaving(true);
      await customerService.updateCustomer(selectedCustomer.id, formData);
      setIsEditDialogOpen(false);
      setSelectedCustomer(null);
      setCustomerTenants([]);
      setFormData({
        name: '',
        identification: '',
        countryId: '',
        stateProvince: '',
        city: '',
        phone: '',
        email: '',
      });
      setEditCountrySearchText('');
      await loadCustomers();
      setIsSaving(false);
    } catch (err: any) {
      setError(err.message || 'Error al guardar cliente');
      setIsSaving(false);
    }
  };

  const handleDeleteNext = () => {
    if (deleteStep === 1 && !deleteConsentChecked) {
      setError('Debe confirmar que es consciente de las consecuencias');
      return;
    }
    if (deleteStep < 4) {
      setDeleteStep(deleteStep + 1);
      setError(null);
    }
  };

  const handleDeleteBack = () => {
    if (deleteStep > 1) {
      setDeleteStep(deleteStep - 1);
      setError(null);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setSelectedCustomer(null);
    setDeleteStep(1);
    setDeleteConsentChecked(false);
    setDeleteTenants(new Set());
    setDeleteOffices(new Set());
    setDeleteUsers(new Set());
    setError(null);
  };

  const handleToggleTenant = (tenantId: string) => {
    const newSet = new Set(deleteTenants);
    if (newSet.has(tenantId)) {
      newSet.delete(tenantId);
      // Si se deselecciona un tenant, también deseleccionar sus sedes relacionadas por defecto
      // pero permitir que el usuario las seleccione manualmente si lo desea
      const relatedOffices = deleteRelatedOffices.filter(office => office.tenantId === tenantId);
      const newOfficesSet = new Set(deleteOffices);
      relatedOffices.forEach(office => {
        newOfficesSet.delete(office.id);
      });
      setDeleteOffices(newOfficesSet);
    } else {
      newSet.add(tenantId);
      // Si se selecciona un tenant, marcar sus sedes por defecto pero sin deshabilitarlas
      const relatedOffices = deleteRelatedOffices.filter(office => office.tenantId === tenantId);
      const newOfficesSet = new Set(deleteOffices);
      relatedOffices.forEach(office => {
        newOfficesSet.add(office.id);
      });
      setDeleteOffices(newOfficesSet);
    }
    setDeleteTenants(newSet);
  };

  const handleToggleOffice = (officeId: string) => {
    const office = deleteRelatedOffices.find(o => o.id === officeId);
    if (!office) return;
    
    // Permitir seleccionar/deseleccionar sedes libremente, incluso si su tenant está seleccionado
    // Esto permite dejar registros huérfanos
    const newSet = new Set(deleteOffices);
    if (newSet.has(officeId)) {
      newSet.delete(officeId);
    } else {
      newSet.add(officeId);
    }
    setDeleteOffices(newSet);
  };

  const handleToggleUser = (userId: string) => {
    const newSet = new Set(deleteUsers);
    if (newSet.has(userId)) {
      newSet.delete(userId);
    } else {
      newSet.add(userId);
    }
    setDeleteUsers(newSet);
  };

  const handleToggleAllTenants = () => {
    const allSelected = deleteRelatedTenants.every(tenant => deleteTenants.has(tenant.id));
    if (allSelected) {
      // Deseleccionar todos
      setDeleteTenants(new Set());
      // También deseleccionar todas las sedes relacionadas
      setDeleteOffices(new Set());
    } else {
      // Seleccionar todos
      const allTenantIds = new Set(deleteRelatedTenants.map(tenant => tenant.id));
      setDeleteTenants(allTenantIds);
      // También seleccionar todas las sedes
      const allOfficeIds = new Set(deleteRelatedOffices.map(office => office.id));
      setDeleteOffices(allOfficeIds);
    }
  };

  const handleToggleAllOffices = () => {
    const allSelected = deleteRelatedOffices.every(office => deleteOffices.has(office.id));
    if (allSelected) {
      setDeleteOffices(new Set());
    } else {
      const allOfficeIds = new Set(deleteRelatedOffices.map(office => office.id));
      setDeleteOffices(allOfficeIds);
    }
  };

  const handleToggleAllUsers = () => {
    const allSelected = deleteRelatedUsers.every(user => deleteUsers.has(user.id));
    if (allSelected) {
      setDeleteUsers(new Set());
    } else {
      const allUserIds = new Set(deleteRelatedUsers.map(user => user.id));
      setDeleteUsers(allUserIds);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedCustomer) return;

    setIsDeleting(true);
    try {
      // Paso 1: Eliminar usuarios seleccionados
      const deleteUserPromises = Array.from(deleteUsers).map(userId => 
        userService.deleteUser(userId)
      );
      await Promise.all(deleteUserPromises);

      // Paso 2: Para usuarios no seleccionados, eliminar relaciones con tenants/sedes del cliente
      const usersToUnlink = deleteRelatedUsers.filter(user => !deleteUsers.has(user.id));
      
      // Obtener relaciones de cada usuario
      const userRelationsPromises = usersToUnlink.map(async (user) => {
        try {
          const [userTenants, userOffices] = await Promise.all([
            userService.getUserTenants(user.id).catch(() => []),
            userService.getUserOffices(user.id).catch(() => [])
          ]);
          return { user, userTenants, userOffices };
        } catch {
          return { user, userTenants: [], userOffices: [] };
        }
      });
      const userRelations = await Promise.all(userRelationsPromises);

      // Eliminar relaciones UserTenant con tenants del cliente (seleccionados o no)
      const tenantIdsToUnlink = new Set([
        ...Array.from(deleteTenants),
        ...deleteRelatedTenants.filter(t => !deleteTenants.has(t.id)).map(t => t.id)
      ]);

      const unlinkUserTenantPromises: Promise<void>[] = [];
      userRelations.forEach(({ user, userTenants }) => {
        userTenants.forEach((ut: any) => {
          if (tenantIdsToUnlink.has(ut.id || ut.tenantId)) {
            const tenantId = ut.id || ut.tenantId;
            unlinkUserTenantPromises.push(
              userService.removeTenantFromUser(user.id, tenantId).catch(() => {})
            );
          }
        });
      });

      // Eliminar relaciones UserOffice con sedes del cliente (seleccionadas o no)
      const officeIdsToUnlink = new Set([
        ...Array.from(deleteOffices),
        ...deleteRelatedOffices.filter(o => !deleteOffices.has(o.id)).map(o => o.id)
      ]);

      userRelations.forEach(({ user, userOffices }) => {
        userOffices.forEach((uo: any) => {
          if (officeIdsToUnlink.has(uo.id || uo.officeId)) {
            const officeId = uo.id || uo.officeId;
            unlinkUserTenantPromises.push(
              userService.removeOfficeFromUser(user.id, officeId).catch(() => {})
            );
          }
        });
      });

      await Promise.all(unlinkUserTenantPromises);

      // Actualizar usuarios no seleccionados para desvincular customerId
      const unlinkUserPromises = usersToUnlink.map(user => 
        userService.updateUser(user.id, {
          email: user.email,
          customerId: undefined,
          tenantId: undefined, // Desvincular también el tenantId si estaba relacionado
        }).catch(() => {})
      );
      await Promise.all(unlinkUserPromises);

      // Paso 3: Eliminar sedes seleccionadas
      const deleteOfficePromises = Array.from(deleteOffices).map(officeId => 
        officeService.deleteOffice(officeId)
      );
      await Promise.all(deleteOfficePromises);

      // Paso 4: Eliminar tenants seleccionados (esto eliminará automáticamente sus oficinas y usuarios)
      const deleteTenantPromises = Array.from(deleteTenants).map(tenantId => 
        tenantService.deleteTenant(tenantId)
      );
      await Promise.all(deleteTenantPromises);

      // Paso 5: Desvincular tenants no seleccionados (eliminar relación con el cliente)
      const unlinkTenantPromises = deleteRelatedTenants
        .filter(tenant => !deleteTenants.has(tenant.id))
        .map(tenant => 
          tenantService.updateTenant(tenant.id, {
            name: tenant.name,
            customerId: undefined,
          }).catch(() => {})
        );
      await Promise.all(unlinkTenantPromises);

      // Paso 6: Finalmente, eliminar el cliente
      await customerService.deleteCustomer(selectedCustomer.id);
      
      setIsDeleteDialogOpen(false);
      setSelectedCustomer(null);
      setDeleteStep(1);
      setDeleteConsentChecked(false);
      setDeleteTenants(new Set());
      setDeleteOffices(new Set());
      setDeleteUsers(new Set());
      await loadCustomers();
    } catch (err: any) {
      setError(err.message || 'Error al eliminar cliente');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading && customers.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <BuildingRegular fontSize={32} />
          <h1 className={styles.title}>Clientes</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
          <div style={{ flex: 1 }}>
            <SearchBox
              placeholder="Buscar por nombre, identificación o país..."
              disabled
              size="large"
              style={{ width: '100%' }}
            />
          </div>
          <TabList selectedValue="table" disabled>
            <Tab value="table" icon={<TableRegular />}>
              Vista de Tabla
            </Tab>
            <Tab value="flow" icon={<FlowchartRegular />}>
              Vista Interactiva
            </Tab>
          </TabList>
        </div>
        <Card>
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
      
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalM }}>
        <div style={{ flex: 1 }}>
          <SearchBox
            placeholder="Buscar por nombre, identificación o país..."
            value={searchTerm}
            onChange={(e, data) => setSearchTerm(data.value)}
            size="large"
            style={{ width: '100%' }}
          />
        </div>
        <Button
          appearance="secondary"
          icon={!isRefreshing ? <ArrowClockwiseRegular /> : undefined}
          onClick={async () => {
            setIsRefreshing(true);
            try {
              await loadCustomers();
              if (selectedView === 'flow') {
                await loadFlowData();
              }
            } finally {
              setIsRefreshing(false);
            }
          }}
          disabled={isRefreshing}
          disabledFocusable={isRefreshing}
          loading={isRefreshing}
          title="Actualizar lista de clientes"
        >
          Actualizar
        </Button>
        <TabList
          selectedValue={selectedTabValue}
          onTabSelect={(_, data) => {
            const value = data.value as 'table' | 'flow';
            setSelectedTabValue(value);
            setSelectedView(value);
          }}
        >
          <Tab value="table" icon={<TableRegular />}>
            Vista de Tabla
          </Tab>
          <Tab value="flow" icon={<FlowchartRegular />}>
            Vista Interactiva
          </Tab>
        </TabList>
      </div>

      <Card>
        <CardPreview>
          <div style={{ padding: tokens.spacingVerticalXL }}>
            {error && (
              <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{error}</MessageBarBody>
              </MessageBar>
            )}

            {selectedView === 'table' && (
              <>
        {/* Vista de tabla */}
        <div style={{ position: 'relative' }}>
          {(isLoading || isReordering) && (
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
              <Spinner size="large" label={isReordering ? 'Reubicando cliente...' : 'Cargando clientes...'} />
            </div>
          )}
          {flattenedCustomers.length === 0 ? (
            <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
              <Text>No se encontraron clientes</Text>
            </div>
          ) : (
            <Table style={{ tableLayout: 'auto', width: '100%' }}>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell style={{ width: '40px', minWidth: '40px' }}></TableHeaderCell>
                  <TableHeaderCell style={{ width: '80px', minWidth: '80px' }}>Nivel</TableHeaderCell>
                  <TableHeaderCell style={{ width: 'auto', minWidth: '150px' }}>Nombre</TableHeaderCell>
                  <TableHeaderCell style={{ width: 'auto', minWidth: '150px' }}>Identificación</TableHeaderCell>
                  <TableHeaderCell style={{ width: 'auto', minWidth: '120px' }}>País</TableHeaderCell>
                  <TableHeaderCell style={{ width: 'auto', minWidth: '120px' }}>Ciudad</TableHeaderCell>
                  <TableHeaderCell style={{ width: 'auto', minWidth: '130px' }}>Teléfono</TableHeaderCell>
                  <TableHeaderCell style={{ width: 'auto', minWidth: '180px' }}>Email</TableHeaderCell>
                  <TableHeaderCell style={{ width: '80px', minWidth: '80px' }}>Tenants</TableHeaderCell>
                  <TableHeaderCell style={{ width: '80px', minWidth: '80px' }}>Sedes</TableHeaderCell>
                  <TableHeaderCell style={{ width: '80px', minWidth: '80px' }}>Usuarios</TableHeaderCell>
                  <TableHeaderCell style={{ width: 'auto', minWidth: '110px' }}>Estado</TableHeaderCell>
                  <TableHeaderCell style={{ width: '120px', minWidth: '120px' }}>Acciones</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flattenedCustomers.map((customer) => {
                  const hasChildren = customer.children.length > 0;
                  const isExpanded = expandedNodes.has(customer.id);
                  const isRoot = !customer.parentId;
                  
                  return (
                    <TableRow
                      key={customer.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, customer.id)}
                      onDragOver={(e) => handleDragOver(e, customer.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, customer.id)}
                    >
                      <TableCell>
                        {hasChildren ? (
                          <button
                            onClick={() => toggleExpand(customer.id)}
                            type="button"
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              padding: tokens.spacingVerticalXS,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            {isExpanded ? (
                              <ChevronDownRegular fontSize={16} />
                            ) : (
                              <ChevronRightRegular fontSize={16} />
                            )}
                          </button>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        {isRoot ? (
                          <StarRegular fontSize={16} title="Cliente raíz" />
                        ) : (
                          <Badge appearance="outline" size="small">
                            {customer.level}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.identification}</TableCell>
                      <TableCell>{customer.countryName || 'N/A'}</TableCell>
                      <TableCell>{customer.city || 'N/A'}</TableCell>
                      <TableCell>
                        {customer.phone ? (
                          <TeachingPopover
                            open={contactPopoverOpen === `${customer.id}-phone`}
                            onOpenChange={(_, data) => {
                              setContactPopoverOpen(data.open ? `${customer.id}-phone` : null);
                            }}
                          >
                            <TeachingPopoverTrigger disableButtonEnhancement>
                              <Button
                                appearance="subtle"
                                style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto', textDecoration: 'underline' }}
                              >
                                {customer.phone}
                              </Button>
                            </TeachingPopoverTrigger>
                            <TeachingPopoverSurface>
                              <TeachingPopoverHeader>
                                Datos de Contacto: {customer.name}
                              </TeachingPopoverHeader>
                              <TeachingPopoverBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                                  <div>
                                    <Text weight="semibold">Teléfono:</Text>
                                    <Text>{customer.phone || 'N/A'}</Text>
                                  </div>
                                  <div>
                                    <Text weight="semibold">Email:</Text>
                                    <Text>{customer.email || 'N/A'}</Text>
                                  </div>
                                  <div>
                                    <Text weight="semibold">Ciudad:</Text>
                                    <Text>{customer.city || 'N/A'}</Text>
                                  </div>
                                  <div>
                                    <Text weight="semibold">Dirección:</Text>
                                    <Text>N/A</Text>
                                  </div>
                                </div>
                              </TeachingPopoverBody>
                            </TeachingPopoverSurface>
                          </TeachingPopover>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>
                        {customer.email ? (
                          <TeachingPopover
                            open={contactPopoverOpen === `${customer.id}-email`}
                            onOpenChange={(_, data) => {
                              setContactPopoverOpen(data.open ? `${customer.id}-email` : null);
                            }}
                          >
                            <TeachingPopoverTrigger disableButtonEnhancement>
                              <Button
                                appearance="subtle"
                                style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto', textDecoration: 'underline' }}
                              >
                                {customer.email}
                              </Button>
                            </TeachingPopoverTrigger>
                            <TeachingPopoverSurface>
                              <TeachingPopoverHeader>
                                Datos de Contacto: {customer.name}
                              </TeachingPopoverHeader>
                              <TeachingPopoverBody>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                                  <div>
                                    <Text weight="semibold">Teléfono:</Text>
                                    <Text>{customer.phone || 'N/A'}</Text>
                                  </div>
                                  <div>
                                    <Text weight="semibold">Email:</Text>
                                    <Text>{customer.email || 'N/A'}</Text>
                                  </div>
                                  <div>
                                    <Text weight="semibold">Ciudad:</Text>
                                    <Text>{customer.city || 'N/A'}</Text>
                                  </div>
                                  <div>
                                    <Text weight="semibold">Dirección:</Text>
                                    <Text>N/A</Text>
                                  </div>
                                </div>
                              </TeachingPopoverBody>
                            </TeachingPopoverSurface>
                          </TeachingPopover>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const tenantCount = customer.tenantCount ?? 0;
                          
                          if (tenantCount === 0) {
                            // Si no hay tenants, mostrar botón para crear
                            return (
                              <Button
                                appearance="subtle"
                                onClick={() => handleOpenCreateTenant(customer)}
                                style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                              >
                                <Badge 
                                  size="medium" 
                                  appearance="filled" 
                                  color="informative"
                                  style={{ minWidth: '24px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                  0
                                </Badge>
                              </Button>
                            );
                          }
                          
                          // Si hay tenants, mostrar botón para ver
                          return (
                            <Button
                              appearance="subtle"
                              onClick={() => handleViewTenants(customer)}
                              style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                            >
                              <CounterBadge 
                                count={tenantCount} 
                                size="medium" 
                                appearance="filled" 
                                color="brand"
                              />
                            </Button>
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const officeCount = customer.officeCount ?? 0;
                          
                          if (officeCount === 0) {
                            // Si no hay sedes, mostrar botón para crear
                            return (
                              <Button
                                appearance="subtle"
                                onClick={() => handleOpenCreateOffice(customer)}
                                style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                              >
                                <Badge 
                                  size="medium" 
                                  appearance="filled" 
                                  color="informative"
                                  style={{ minWidth: '24px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                  0
                                </Badge>
                              </Button>
                            );
                          }
                          
                          // Si hay sedes, mostrar botón para ver
                          return (
                            <Button
                              appearance="subtle"
                              onClick={() => handleViewOffices(customer)}
                              style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                            >
                              <CounterBadge 
                                count={officeCount} 
                                size="medium" 
                                appearance="filled" 
                                color="brand"
                              />
                            </Button>
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const userCount = customer.userCount ?? 0;
                          
                          if (userCount === 0) {
                            // Si no hay usuarios, mostrar botón para crear
                            return (
                              <Button
                                appearance="subtle"
                                onClick={() => handleOpenCreateUser(customer)}
                                style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                              >
                                <Badge 
                                  size="medium" 
                                  appearance="filled" 
                                  color="informative"
                                  style={{ minWidth: '24px', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                  0
                                </Badge>
                              </Button>
                            );
                          }
                          
                          // Si hay usuarios, mostrar TeachingPopover
                          return (
                            <TeachingPopover
                              open={popoverOpen === customer.id}
                              onOpenChange={(_, data) => {
                                setPopoverOpen(data.open ? customer.id : null);
                              }}
                            >
                              <TeachingPopoverTrigger disableButtonEnhancement>
                                <Button
                                  appearance="subtle"
                                  onClick={() => handleUserBadgeClick(customer)}
                                  style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto' }}
                                >
                                  <CounterBadge 
                                    count={userCount} 
                                    size="medium" 
                                    appearance="filled" 
                                    color="brand"
                                  />
                                </Button>
                              </TeachingPopoverTrigger>
                              <TeachingPopoverSurface>
                                <TeachingPopoverHeader>
                                  Usuarios del Cliente: {customer.name}
                                </TeachingPopoverHeader>
                                <TeachingPopoverBody>
                                  {isLoadingUsersForPopover ? (
                                    <Spinner size="small" label="Cargando usuarios..." />
                                  ) : (
                                    <UsersListByTenantAndOffice users={usersForPopover} />
                                  )}
                                </TeachingPopoverBody>
                              </TeachingPopoverSurface>
                            </TeachingPopover>
                          );
                        })()}
                      </TableCell>
                      <TableCell>
                        {customer.isSuspended ? (
                          <Badge appearance="filled" color="danger">Suspendido</Badge>
                        ) : customer.isActive ? (
                          <Badge appearance="filled" color="success">Activo</Badge>
                        ) : (
                          <Badge appearance="outline">Inactivo</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalXS }}>
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
                                <MenuItem icon={<LocationRegular />} onClick={() => handleOpenCreateOffice(customer)}>
                                  Agregar Sede
                                </MenuItem>
                                <MenuItem icon={<BriefcaseRegular />} onClick={() => handleOpenCreateTenant(customer)}>
                                  Agregar Tenant
                                </MenuItem>
                                <MenuItem icon={<PeopleRegular />} onClick={() => handleViewUsers(customer)}>
                                  Ver usuarios
                                </MenuItem>
                                <MenuItem icon={<PeopleRegular />} onClick={() => handleNotifyUsers(customer)}>
                                  Enviar notificación
                                </MenuItem>
                                <MenuItem icon={<LinkRegular />} onClick={() => handleAssignParent(customer)}>
                                  Asignar a otro cliente
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
                          <ArrowMoveRegular fontSize={16} style={{ cursor: 'grab' }} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
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
              <div className={styles.flowContainer} style={{ position: 'relative' }}>
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
                    <Spinner size="large" label="Cargando clientes..." />
                  </div>
                )}
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
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label="Cerrar"
                icon={<DismissRegular />}
                onClick={() => {
                  handleDrawerOpenChange({} as any, { open: false });
                }}
              />
            }
          >
            Nuevo
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isCreateDrawerLoading || isCreating ? (
              <DetailsSkeleton rows={8} />
            ) : (
              <>
            {skipDefaultStructure ? (
              <MessageBar intent="warning" style={{ marginTop: 0, marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>
                  No se creará el tenant sede ni usuario por defecto.
                </MessageBarBody>
              </MessageBar>
            ) : (
              <MessageBar intent="info" style={{ marginTop: 0, marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>
                  Se creará automáticamente un tenant para este cliente.
                </MessageBarBody>
              </MessageBar>
            )}
            <div className={styles.formField} style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
              <Switch
                checked={skipDefaultStructure}
                onChange={(_, data) => {
                  setSkipDefaultStructure(data.checked);
                }}
                label="Omitir creación de estructura por defecto"
              />
            </div>
            <div className={styles.formField} style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
              <Switch
                checked={hasParent}
                onChange={(_, data) => {
                  setHasParent(data.checked);
                  if (!data.checked) {
                    setCreateParentId('');
                  }
                }}
                label="El nuevo cliente será hijo de otro cliente"
              />
            </div>
            {hasParent && (
              <Field label="Cliente Padre" required className={styles.formField}>
                <Combobox
                  value={parentCustomerSearchText || (createParentId ? customers.find((c) => c.id === createParentId)?.name || '' : '')}
                  onOptionSelect={(_, data) => {
                    const customer = customers.find((c) => c.name === data.optionValue);
                    if (customer) {
                      setCreateParentId(customer.id);
                      setParentCustomerSearchText('');
                    } else {
                      setCreateParentId('');
                      setParentCustomerSearchText('');
                    }
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    setParentCustomerSearchText(target.value);
                    if (!target.value) {
                      setCreateParentId('');
                    }
                  }}
                >
                  {filteredParentCustomers.map((customer) => (
                    <Option key={customer.id} value={customer.name}>
                      {customer.name} ({customer.identification})
                    </Option>
                  ))}
                </Combobox>
              </Field>
            )}
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
                value={countrySearchText || countries.find((c) => c.id === formData.countryId)?.name || ''}
                onOptionSelect={(_, data) => {
                  const country = countries.find((c) => c.name === data.optionValue);
                  if (country) {
                    setFormData({ ...formData, countryId: country.id });
                    setCountrySearchText('');
                  }
                }}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  setCountrySearchText(target.value);
                }}
              >
                {filteredCountries.map((country) => (
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
            {createCustomerError && (
              <MessageBar intent="error" style={{ marginTop: tokens.spacingVerticalXL, marginBottom: tokens.spacingVerticalM }}>
                <MessageBarBody>{createCustomerError}</MessageBarBody>
              </MessageBar>
            )}
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
                      setHasParent(false);
                      setCreateParentId('');
                      setSkipDefaultStructure(false);
                      setCountrySearchText('');
                      setParentCustomerSearchText('');
                      setCreateCustomerError(null);
                    }
                  } else {
                    setIsCreateDialogOpen(false);
                  }
                }}
                disabled={isCreating}
              >
                Cancelar
              </Button>
              <Button appearance="primary" onClick={handleCreate} disabled={isCreating} loading={isCreating}>
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
        onOpenChange={handleEditDrawerOpenChange}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label="Cerrar"
                icon={<DismissRegular />}
                onClick={() => {
                  handleEditDrawerOpenChange({} as any, { open: false });
                }}
              />
            }
          >
            Editar Cliente
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isEditDrawerLoading || isSaving ? (
              <DetailsSkeleton rows={8} />
            ) : isLoadingTenants ? (
              <DetailsSkeleton rows={3} />
            ) : (
              <>
                {error && (
                  <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                    <MessageBarBody>{error}</MessageBarBody>
                  </MessageBar>
                )}

                <TabList
                  selectedValue={editActiveTab}
                  onTabSelect={(_, data) => setEditActiveTab(data.value as any)}
                >
                  <Tab value="details">Detalles</Tab>
                  <Tab value="tenants">Tenants</Tab>
                  <Tab value="offices">Sedes</Tab>
                  <Tab value="users">Usuarios</Tab>
                </TabList>

                {/* Tab de Detalles */}
                {editActiveTab === 'details' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
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
                        value={editCountrySearchText || countries.find((c) => c.id === formData.countryId)?.name || ''}
                        onOptionSelect={(_, data) => {
                          const country = countries.find((c) => c.name === data.optionValue);
                          if (country) {
                            setFormData({ ...formData, countryId: country.id });
                            setEditCountrySearchText('');
                          }
                        }}
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          setEditCountrySearchText(target.value);
                        }}
                      >
                        {filteredEditCountries.map((country) => (
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
                    <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                      <Button 
                        appearance="secondary" 
                        onClick={() => {
                          if (!selectedCustomer) {
                            setIsEditDialogOpen(false);
                            setCustomerTenants([]);
                            setSelectedCustomer(null);
                            setFormData({
                              name: '',
                              identification: '',
                              countryId: '',
                              stateProvince: '',
                              city: '',
                              phone: '',
                              email: '',
                            });
                            setEditCountrySearchText('');
                            return;
                          }

                          const hasChanges = 
                            formData.name !== selectedCustomer.name ||
                            formData.identification !== selectedCustomer.identification ||
                            formData.countryId !== selectedCustomer.countryId ||
                            formData.stateProvince !== (selectedCustomer.stateProvince || '') ||
                            formData.city !== (selectedCustomer.city || '') ||
                            formData.phone !== (selectedCustomer.phone || '') ||
                            formData.email !== (selectedCustomer.email || '');
                          
                          if (hasChanges) {
                            if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los cambios no guardados.')) {
                              setIsEditDialogOpen(false);
                              setCustomerTenants([]);
                              setSelectedCustomer(null);
                              setFormData({
                                name: '',
                                identification: '',
                                countryId: '',
                                stateProvince: '',
                                city: '',
                                phone: '',
                                email: '',
                              });
                              setEditCountrySearchText('');
                              setError(null);
                            }
                          } else {
                            setIsEditDialogOpen(false);
                            setCustomerTenants([]);
                            setSelectedCustomer(null);
                            setFormData({
                              name: '',
                              identification: '',
                              countryId: '',
                              stateProvince: '',
                              city: '',
                              phone: '',
                              email: '',
                            });
                            setEditCountrySearchText('');
                            setError(null);
                          }
                        }}
                        disabled={isSaving}
                      >
                        Cancelar
                      </Button>
                      <Button appearance="primary" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Guardando...' : 'Guardar'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tab de Tenants - Mismo contenido que en detalles */}
                {editActiveTab === 'tenants' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalM }}>
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center' }}>
                        <Combobox
                          placeholder="Seleccionar tenant para asignar"
                          value={
                            selectedTenantToAdd
                              ? allTenantsForAssign.find((t) => t.id === selectedTenantToAdd)?.name || ''
                              : ''
                          }
                          onOptionSelect={(_, data) => {
                            const tenant = allTenantsForAssign.find((t) => t.name === data.optionValue);
                            if (tenant) {
                              setSelectedTenantToAdd(tenant.id);
                            }
                          }}
                          style={{ width: '300px' }}
                        >
                          {allTenantsForAssign.map((tenant) => (
                            <Option key={tenant.id} value={tenant.name}>
                              {tenant.name} {tenant.customerName ? `(${tenant.customerName})` : ''}
                            </Option>
                          ))}
                        </Combobox>
                        <Button
                          appearance="primary"
                          icon={<AddRegular />}
                          onClick={handleAssignTenantToCustomer}
                          disabled={!selectedTenantToAdd || isAssigningTenantToCustomer || isLoadingAllTenants}
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>

                    {isLoadingTenants ? (
                      <Spinner label="Cargando tenants..." />
                    ) : (
                      <div>
                        {customerTenants.length === 0 ? (
                          <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                            <Text>No hay tenants asignados</Text>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell>Nombre</TableHeaderCell>
                                <TableHeaderCell>Estado</TableHeaderCell>
                                <TableHeaderCell>Acciones</TableHeaderCell>
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
                                  <TableCell>
                                    <Button
                                      appearance="subtle"
                                      icon={<DeleteRegular />}
                                      onClick={() => handleRemoveTenantFromCustomer(tenant.id)}
                                      disabled={isAssigningTenantToCustomer}
                                    >
                                      Desasignar
                                    </Button>
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

                {/* Tab de Sedes - Mismo contenido que en detalles */}
                {editActiveTab === 'offices' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, marginBottom: tokens.spacingVerticalM }}>
                      {/* Sección para agregar sedes existentes */}
                      {customerTenants.length > 0 && (
                        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center', flexWrap: 'wrap', padding: tokens.spacingVerticalM, backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusMedium }}>
                          <Text weight="semibold" style={{ width: '100%' }}>Agregar Sede Existente</Text>
                          <Combobox
                            placeholder="Seleccionar sede de los tenants asignados"
                            value={
                              selectedOfficeToAdd
                                ? availableOfficesFromTenants.find((o) => o.id === selectedOfficeToAdd)?.name || ''
                                : ''
                            }
                            onOptionSelect={(_, data) => {
                              const office = availableOfficesFromTenants.find((o) => o.name === data.optionValue);
                              if (office) {
                                setSelectedOfficeToAdd(office.id);
                              }
                            }}
                            style={{ width: '300px' }}
                            disabled={isLoadingAvailableOffices || availableOfficesFromTenants.length === 0}
                          >
                            {availableOfficesFromTenants.map((office) => (
                              <Option key={office.id} value={office.name}>
                                {office.name} {office.city ? `(${office.city})` : ''} - {office.tenantName || 'N/A'}
                              </Option>
                            ))}
                          </Combobox>
                          <Button
                            appearance="primary"
                            icon={<AddRegular />}
                            onClick={handleAddExistingOffice}
                            disabled={!selectedOfficeToAdd || isAssigningOfficeToCustomer || isLoadingAvailableOffices || availableOfficesFromTenants.length === 0}
                          >
                            Agregar Sede
                          </Button>
                          {isLoadingAvailableOffices && (
                            <Spinner size="small" label="Cargando sedes..." />
                          )}
                          {!isLoadingAvailableOffices && availableOfficesFromTenants.length === 0 && customerTenants.length > 0 && (
                            <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
                              No hay sedes disponibles para agregar
                            </Text>
                          )}
                        </div>
                      )}

                      {/* Sección para crear nuevas sedes */}
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center', flexWrap: 'wrap', padding: tokens.spacingVerticalM, backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusMedium }}>
                        <Text weight="semibold" style={{ width: '100%' }}>Crear Nueva Sede</Text>
                        <Combobox
                          placeholder="Seleccionar tenant"
                          value={
                            selectedTenantForOffice
                              ? customerTenants.find((t) => t.id === selectedTenantForOffice)?.name || ''
                              : ''
                          }
                          onOptionSelect={(_, data) => {
                            const tenant = customerTenants.find((t) => t.name === data.optionValue);
                            if (tenant) {
                              setSelectedTenantForOffice(tenant.id);
                            }
                          }}
                          style={{ width: '200px' }}
                          disabled={customerTenants.length === 0}
                        >
                          {customerTenants.map((tenant) => (
                            <Option key={tenant.id} value={tenant.name}>
                              {tenant.name}
                            </Option>
                          ))}
                        </Combobox>
                        <Input
                          placeholder="Nombre de la sede"
                          value={officeFormData.name}
                          onChange={(e) => setOfficeFormData({ ...officeFormData, name: e.target.value })}
                          style={{ width: '200px' }}
                          disabled={!selectedTenantForOffice || customerTenants.length === 0}
                        />
                        <Button
                          appearance="primary"
                          icon={<AddRegular />}
                          onClick={handleCreateOfficeFromTab}
                          disabled={!selectedTenantForOffice || !officeFormData.name.trim() || isCreatingOfficeFromTab || customerTenants.length === 0}
                        >
                          Crear Sede
                        </Button>
                      </div>
                      {customerTenants.length === 0 && (
                        <MessageBar intent="warning">
                          <MessageBarBody>
                            Debe asignar al menos un tenant al cliente antes de poder crear o agregar sedes.
                          </MessageBarBody>
                        </MessageBar>
                      )}
                    </div>

                    {isLoadingOffices ? (
                      <Spinner label="Cargando sedes..." />
                    ) : (
                      <div>
                        {customerOffices.length === 0 ? (
                          <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                            <Text>No hay sedes asignadas</Text>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell>Nombre</TableHeaderCell>
                                <TableHeaderCell>Ciudad</TableHeaderCell>
                                <TableHeaderCell>Tenant</TableHeaderCell>
                                <TableHeaderCell>Estado</TableHeaderCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {customerOffices.map((office) => (
                                <TableRow key={office.id}>
                                  <TableCell>{office.name}</TableCell>
                                  <TableCell>{office.city || 'N/A'}</TableCell>
                                  <TableCell>{office.tenantName || 'N/A'}</TableCell>
                                  <TableCell>
                                    {office.isSuspended ? (
                                      <Badge appearance="filled" color="danger">Suspendida</Badge>
                                    ) : office.isActive ? (
                                      <Badge appearance="filled" color="success">Activa</Badge>
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

                {/* Tab de Usuarios - Mismo contenido que en detalles */}
                {editActiveTab === 'users' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalM }}>
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Combobox
                          placeholder="Seleccionar tenant"
                          value={
                            selectedTenantToAdd
                              ? customerTenants.find((t) => t.id === selectedTenantToAdd)?.name || ''
                              : ''
                          }
                          onOptionSelect={(_, data) => {
                            const tenant = customerTenants.find((t) => t.name === data.optionValue);
                            if (tenant) {
                              setSelectedTenantToAdd(tenant.id);
                            }
                          }}
                          style={{ width: '200px' }}
                          disabled={customerTenants.length === 0}
                        >
                          {customerTenants.map((tenant) => (
                            <Option key={tenant.id} value={tenant.name}>
                              {tenant.name}
                            </Option>
                          ))}
                        </Combobox>
                        <Combobox
                          placeholder="Seleccionar usuario para asignar"
                          value={
                            selectedUserToAdd
                              ? allUsersForAssign.find((u) => u.id === selectedUserToAdd)?.name || allUsersForAssign.find((u) => u.id === selectedUserToAdd)?.email || ''
                              : ''
                          }
                          onOptionSelect={(_, data) => {
                            const user = allUsersForAssign.find((u) => u.email === data.optionValue || u.name === data.optionValue);
                            if (user) {
                              setSelectedUserToAdd(user.id);
                            }
                          }}
                          style={{ width: '300px' }}
                          disabled={!selectedTenantToAdd || customerTenants.length === 0}
                        >
                          {allUsersForAssign.map((user) => (
                            <Option key={user.id} value={user.email}>
                              {user.name || user.email} {user.email !== user.name ? `(${user.email})` : ''}
                            </Option>
                          ))}
                        </Combobox>
                        <Button
                          appearance="primary"
                          icon={<AddRegular />}
                          onClick={handleAssignUserToCustomer}
                          disabled={!selectedUserToAdd || !selectedTenantToAdd || isAssigningUserToCustomer || isLoadingAllUsers || customerTenants.length === 0}
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>

                    {isLoadingUsers ? (
                      <Spinner label="Cargando usuarios..." />
                    ) : (
                      <div>
                        {customerUsers.length === 0 ? (
                          <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                            <Text>No hay usuarios asignados</Text>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell>Nombre</TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>Rol</TableHeaderCell>
                                <TableHeaderCell>Estado</TableHeaderCell>
                                <TableHeaderCell>Acciones</TableHeaderCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {customerUsers.map((user) => (
                                <TableRow key={user.id}>
                                  <TableCell>{user.name || 'N/A'}</TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell>{getRoleLabel(user.role)}</TableCell>
                                  <TableCell>
                                    {user.isSuspended ? (
                                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                                    ) : user.isActive ? (
                                      <Badge appearance="filled" color="success">Activo</Badge>
                                    ) : (
                                      <Badge appearance="outline">Inactivo</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      appearance="subtle"
                                      icon={<DeleteRegular />}
                                      onClick={() => handleRemoveUserFromCustomer(user.id)}
                                      disabled={isAssigningUserToCustomer}
                                    >
                                      Desasignar
                                    </Button>
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
              </>
            )}
          </div>
        </DrawerBody>
      </OverlayDrawer>

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
            <Button appearance="primary" onClick={handleAssignTenant} disabled={isAssigningTenant} loading={isAssigningTenant}>
              Asignar Tenant
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Dialog de eliminación con stepper */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={(_, data) => {
        if (!data.open) {
          handleDeleteCancel();
        }
      }}>
        <DialogSurface style={{ minWidth: '600px', maxWidth: '800px' }}>
          <DialogTitle>Confirmar eliminación de cliente</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingDeleteData ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: tokens.spacingVerticalXL }}>
                  <Spinner size="large" />
                </div>
              ) : (
                <>
                  {/* Indicador de pasos */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: tokens.spacingVerticalL,
                    padding: tokens.spacingVerticalM,
                    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`
                  }}>
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} style={{ 
                        flex: 1, 
                        textAlign: 'center',
                        position: 'relative'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: deleteStep >= step ? tokens.colorBrandBackground : tokens.colorNeutralBackground3,
                          color: deleteStep >= step ? tokens.colorNeutralForegroundOnBrand : tokens.colorNeutralForeground3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          fontWeight: 'bold'
                        }}>
                          {step}
                        </div>
                        <Text size={200} style={{ 
                          marginTop: tokens.spacingVerticalXS,
                          color: deleteStep >= step ? tokens.colorNeutralForeground1 : tokens.colorNeutralForeground3
                        }}>
                          {step === 1 && 'Confirmación'}
                          {step === 2 && 'Tenants'}
                          {step === 3 && 'Sedes'}
                          {step === 4 && 'Usuarios'}
                        </Text>
                        {step < 4 && (
                          <div style={{
                            position: 'absolute',
                            top: '16px',
                            left: 'calc(50% + 16px)',
                            width: 'calc(100% - 32px)',
                            height: '2px',
                            backgroundColor: deleteStep > step ? tokens.colorBrandBackground : tokens.colorNeutralStroke2,
                            zIndex: -1
                          }} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Paso 1: Confirmación inicial */}
                  {deleteStep === 1 && (
                    <div>
                      <Text size={400} weight="semibold" style={{ marginBottom: tokens.spacingVerticalM }}>
                        ¿Está seguro de que desea eliminar el cliente "{selectedCustomer?.name}"?
                      </Text>
                      <Text style={{ marginBottom: tokens.spacingVerticalL }}>
                        Esta acción eliminará:
                      </Text>
                      <ul style={{ marginLeft: tokens.spacingHorizontalL, marginBottom: tokens.spacingVerticalL }}>
                        <li><Text>{deleteRelatedTenants.length} tenant(s)</Text></li>
                        <li><Text>{deleteRelatedOffices.length} sede(s)</Text></li>
                        <li><Text>{deleteRelatedUsers.length} usuario(s)</Text></li>
                      </ul>
                      <div style={{ marginTop: tokens.spacingVerticalL }}>
                        <Checkbox
                          checked={deleteConsentChecked}
                          onChange={(_, data) => setDeleteConsentChecked(data.checked || false)}
                          label="Soy consciente de las consecuencias de borrar este cliente y entiendo que se eliminarán los elementos seleccionados y se desvincularán los no seleccionados"
                        />
                      </div>
                    </div>
                  )}

                  {/* Paso 2: Selección de tenants */}
                  {deleteStep === 2 && (
                    <div>
                      <Text size={400} weight="semibold" style={{ marginBottom: tokens.spacingVerticalM }}>
                        Seleccione los tenants a eliminar
                      </Text>
                      <Text style={{ marginBottom: tokens.spacingVerticalM, color: tokens.colorNeutralForeground2 }}>
                        Los tenants no seleccionados serán desvinculados del cliente y quedarán huérfanos.
                      </Text>
                      {deleteRelatedTenants.length === 0 ? (
                        <Text style={{ color: tokens.colorNeutralForeground3, fontStyle: 'italic' }}>
                          No hay tenants asociados a este cliente.
                        </Text>
                      ) : (
                        <div style={{ maxHeight: '400px', overflowY: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium }}>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell style={{ width: '50px' }}>
                                  <Checkbox
                                    checked={deleteRelatedTenants.length > 0 && deleteRelatedTenants.every(tenant => deleteTenants.has(tenant.id))}
                                    onChange={handleToggleAllTenants}
                                  />
                                </TableHeaderCell>
                                <TableHeaderCell>Nombre</TableHeaderCell>
                                <TableHeaderCell>Estado</TableHeaderCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {deleteRelatedTenants.map((tenant) => (
                                <TableRow key={tenant.id}>
                                  <TableCell>
                                    <Checkbox
                                      checked={deleteTenants.has(tenant.id)}
                                      onChange={() => handleToggleTenant(tenant.id)}
                                    />
                                  </TableCell>
                                  <TableCell>{tenant.name}</TableCell>
                                  <TableCell>
                                    <Badge appearance={tenant.isActive ? 'filled' : 'outline'} color={tenant.isActive ? 'success' : 'danger'}>
                                      {tenant.isActive ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Paso 3: Selección de sedes */}
                  {deleteStep === 3 && (
                    <div>
                      <Text size={400} weight="semibold" style={{ marginBottom: tokens.spacingVerticalM }}>
                        Seleccione las sedes a eliminar
                      </Text>
                      <Text style={{ marginBottom: tokens.spacingVerticalM, color: tokens.colorNeutralForeground2 }}>
                        Las sedes de los tenants seleccionados aparecerán marcadas por defecto, pero puedes deseleccionarlas para dejarlas huérfanas. Las sedes no seleccionadas serán desvinculadas.
                      </Text>
                      {deleteRelatedOffices.length === 0 ? (
                        <Text style={{ color: tokens.colorNeutralForeground3, fontStyle: 'italic' }}>
                          No hay sedes asociadas a este cliente.
                        </Text>
                      ) : (
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                          {/* Mostrar sedes agrupadas por tenant */}
                          {deleteRelatedTenants.map((tenant) => {
                            // Filtrar oficinas que pertenecen a este tenant
                            // Pueden estar en tenantId (legacy) o en el array tenants (muchos a muchos)
                            const tenantOffices = deleteRelatedOffices.filter(office => 
                              office.tenantId === tenant.id || 
                              (office.tenants && office.tenants.some(t => t.id === tenant.id))
                            );
                            if (tenantOffices.length === 0) return null;
                            
                            const isTenantSelected = deleteTenants.has(tenant.id);
                            
                            return (
                              <div key={tenant.id} style={{ marginBottom: tokens.spacingVerticalL }}>
                                <Text size={300} weight="semibold" style={{ 
                                  marginBottom: tokens.spacingVerticalS,
                                  padding: tokens.spacingVerticalS,
                                  backgroundColor: tokens.colorNeutralBackground2,
                                  borderRadius: tokens.borderRadiusSmall
                                }}>
                                  Tenant: {tenant.name}
                                  {isTenantSelected && (
                                    <Badge appearance="filled" color="brand" style={{ marginLeft: tokens.spacingHorizontalS }}>
                                      Se eliminará
                                    </Badge>
                                  )}
                                </Text>
                                <div style={{ border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium }}>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHeaderCell style={{ width: '50px' }}>
                                          <Checkbox
                                            checked={tenantOffices.length > 0 && tenantOffices.every(office => deleteOffices.has(office.id))}
                                            onChange={() => {
                                              const allSelected = tenantOffices.every(office => deleteOffices.has(office.id));
                                              const newSet = new Set(deleteOffices);
                                              if (allSelected) {
                                                tenantOffices.forEach(office => newSet.delete(office.id));
                                              } else {
                                                tenantOffices.forEach(office => newSet.add(office.id));
                                              }
                                              setDeleteOffices(newSet);
                                            }}
                                          />
                                        </TableHeaderCell>
                                        <TableHeaderCell>Nombre</TableHeaderCell>
                                        <TableHeaderCell>Dirección</TableHeaderCell>
                                        <TableHeaderCell>Estado</TableHeaderCell>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {tenantOffices.map((office) => {
                                        const isChecked = deleteOffices.has(office.id);
                                        
                                        return (
                                          <TableRow key={office.id}>
                                            <TableCell>
                                              <Checkbox
                                                checked={isChecked}
                                                onChange={() => handleToggleOffice(office.id)}
                                              />
                                            </TableCell>
                                            <TableCell>{office.name}</TableCell>
                                            <TableCell>{office.address || '-'}</TableCell>
                                            <TableCell>
                                              <Badge appearance={office.isActive ? 'filled' : 'outline'} color={office.isActive ? 'success' : 'danger'}>
                                                {office.isActive ? 'Activa' : 'Inactiva'}
                                              </Badge>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            );
                          })}
                          
                          {/* Mostrar sedes que no están asociadas a ningún tenant (solo al cliente) */}
                          {(() => {
                            const officesWithoutTenant = deleteRelatedOffices.filter(office => {
                              // Oficina sin tenantId y sin tenants
                              if (!office.tenantId && (!office.tenants || office.tenants.length === 0)) {
                                return true;
                              }
                              // Oficina que no está en ningún tenant de deleteRelatedTenants
                              const hasMatchingTenant = deleteRelatedTenants.some(tenant => 
                                office.tenantId === tenant.id || 
                                (office.tenants && office.tenants.some(t => t.id === tenant.id))
                              );
                              return !hasMatchingTenant;
                            });
                            
                            if (officesWithoutTenant.length === 0) return null;
                            
                            return (
                              <div style={{ marginBottom: tokens.spacingVerticalL }}>
                                <Text size={300} weight="semibold" style={{ 
                                  marginBottom: tokens.spacingVerticalS,
                                  padding: tokens.spacingVerticalS,
                                  backgroundColor: tokens.colorNeutralBackground2,
                                  borderRadius: tokens.borderRadiusSmall
                                }}>
                                  Sedes sin Tenant asignado
                                </Text>
                                <div style={{ border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium }}>
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHeaderCell style={{ width: '50px' }}>
                                          <Checkbox
                                            checked={officesWithoutTenant.length > 0 && officesWithoutTenant.every(office => deleteOffices.has(office.id))}
                                            onChange={() => {
                                              const allSelected = officesWithoutTenant.every(office => deleteOffices.has(office.id));
                                              const newSet = new Set(deleteOffices);
                                              if (allSelected) {
                                                officesWithoutTenant.forEach(office => newSet.delete(office.id));
                                              } else {
                                                officesWithoutTenant.forEach(office => newSet.add(office.id));
                                              }
                                              setDeleteOffices(newSet);
                                            }}
                                          />
                                        </TableHeaderCell>
                                        <TableHeaderCell>Nombre</TableHeaderCell>
                                        <TableHeaderCell>Dirección</TableHeaderCell>
                                        <TableHeaderCell>Estado</TableHeaderCell>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {officesWithoutTenant.map((office) => {
                                        const isChecked = deleteOffices.has(office.id);
                                        
                                        return (
                                          <TableRow key={office.id}>
                                            <TableCell>
                                              <Checkbox
                                                checked={isChecked}
                                                onChange={() => handleToggleOffice(office.id)}
                                              />
                                            </TableCell>
                                            <TableCell>{office.name}</TableCell>
                                            <TableCell>{office.address || '-'}</TableCell>
                                            <TableCell>
                                              <Badge appearance={office.isActive ? 'filled' : 'outline'} color={office.isActive ? 'success' : 'danger'}>
                                                {office.isActive ? 'Activa' : 'Inactiva'}
                                              </Badge>
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Paso 4: Selección de usuarios */}
                  {deleteStep === 4 && (
                    <div>
                      <Text size={400} weight="semibold" style={{ marginBottom: tokens.spacingVerticalM }}>
                        Seleccione los usuarios a eliminar
                      </Text>
                      <Text style={{ marginBottom: tokens.spacingVerticalM, color: tokens.colorNeutralForeground2 }}>
                        Los usuarios no seleccionados serán desvinculados del cliente y quedarán huérfanos.
                      </Text>
                      {deleteRelatedUsers.length === 0 ? (
                        <Text style={{ color: tokens.colorNeutralForeground3, fontStyle: 'italic' }}>
                          No hay usuarios asociados a este cliente.
                        </Text>
                      ) : (
                        <div style={{ maxHeight: '400px', overflowY: 'auto', border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: tokens.borderRadiusMedium }}>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell style={{ width: '50px' }}>
                                  <Checkbox
                                    checked={deleteRelatedUsers.length > 0 && deleteRelatedUsers.every(user => deleteUsers.has(user.id))}
                                    onChange={handleToggleAllUsers}
                                  />
                                </TableHeaderCell>
                                <TableHeaderCell>Nombre</TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>Rol</TableHeaderCell>
                                <TableHeaderCell>Estado</TableHeaderCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {deleteRelatedUsers.map((user) => (
                                <TableRow key={user.id}>
                                  <TableCell>
                                    <Checkbox
                                      checked={deleteUsers.has(user.id)}
                                      onChange={() => handleToggleUser(user.id)}
                                    />
                                  </TableCell>
                                  <TableCell>{user.name || '-'}</TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell>
                                    <Badge appearance="outline">
                                      {getRoleLabel(user.role)}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <Badge appearance={user.isActive ? 'filled' : 'outline'} color={user.isActive ? 'success' : 'danger'}>
                                      {user.isActive ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button 
              appearance="secondary" 
              onClick={deleteStep === 1 ? handleDeleteCancel : handleDeleteBack}
              disabled={isDeleting || isLoadingDeleteData}
            >
              {deleteStep === 1 ? 'Cancelar' : 'Atrás'}
            </Button>
            {deleteStep < 4 ? (
              <Button 
                appearance="primary" 
                onClick={handleDeleteNext}
                disabled={isLoadingDeleteData}
              >
                Continuar
              </Button>
            ) : (
              <Button 
                appearance="primary" 
                onClick={handleConfirmDelete}
                disabled={isDeleting || isLoadingDeleteData}
                loading={isDeleting}
              >
                {isDeleting ? 'Eliminando...' : 'Confirmar eliminación'}
              </Button>
            )}
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
        onOpenChange={handleDetailsDrawerOpenChange}
      >
        <DrawerHeader>
          <DrawerHeaderTitle 
            action={
              <Button
                appearance="subtle"
                aria-label="Cerrar"
                icon={<DismissRegular />}
                onClick={() => {
                  handleDetailsDrawerOpenChange({} as any, { open: false });
                }}
              />
            }
          >
            Detalles del Cliente
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isDetailsLoading ? (
              <DetailsSkeleton rows={12} />
            ) : selectedCustomer ? (
              <>
                {error && (
                  <MessageBar intent="error" style={{ marginBottom: tokens.spacingVerticalM }}>
                    <MessageBarBody>{error}</MessageBarBody>
                  </MessageBar>
                )}

                <TabList
                  selectedValue={detailsActiveTab}
                  onTabSelect={(_, data) => setDetailsActiveTab(data.value as any)}
                >
                  <Tab value="details">Detalles</Tab>
                  <Tab value="tenants">Tenants</Tab>
                  <Tab value="offices">Sedes</Tab>
                  <Tab value="users">Usuarios</Tab>
                </TabList>

                {/* Tab de Detalles */}
                {detailsActiveTab === 'details' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
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
                    <Field label="Sedes" className={styles.formField}>
                      <Input value={String(selectedCustomer.officeCount || 0)} readOnly />
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
                      <Button appearance="primary" onClick={() => setIsDetailsDialogOpen(false)}>
                        Cerrar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Tab de Tenants */}
                {detailsActiveTab === 'tenants' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalM }}>
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center' }}>
                        <Combobox
                          placeholder="Seleccionar tenant para asignar"
                          value={
                            selectedTenantToAdd
                              ? allTenantsForAssign.find((t) => t.id === selectedTenantToAdd)?.name || ''
                              : ''
                          }
                          onOptionSelect={(_, data) => {
                            const tenant = allTenantsForAssign.find((t) => t.name === data.optionValue);
                            if (tenant) {
                              setSelectedTenantToAdd(tenant.id);
                            }
                          }}
                          style={{ width: '300px' }}
                        >
                          {allTenantsForAssign.map((tenant) => (
                            <Option key={tenant.id} value={tenant.name}>
                              {tenant.name} {tenant.customerName ? `(${tenant.customerName})` : ''}
                            </Option>
                          ))}
                        </Combobox>
                        <Button
                          appearance="primary"
                          icon={<AddRegular />}
                          onClick={handleAssignTenantToCustomer}
                          disabled={!selectedTenantToAdd || isAssigningTenantToCustomer || isLoadingAllTenants}
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>

                    {isLoadingTenants ? (
                      <Spinner label="Cargando tenants..." />
                    ) : (
                      <div>
                        {customerTenants.length === 0 ? (
                          <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                            <Text>No hay tenants asignados</Text>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell>Nombre</TableHeaderCell>
                                <TableHeaderCell>Estado</TableHeaderCell>
                                <TableHeaderCell>Acciones</TableHeaderCell>
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
                                  <TableCell>
                                    <Button
                                      appearance="subtle"
                                      icon={<DeleteRegular />}
                                      onClick={() => handleRemoveTenantFromCustomer(tenant.id)}
                                      disabled={isAssigningTenantToCustomer}
                                    >
                                      Desasignar
                                    </Button>
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
                {detailsActiveTab === 'offices' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, marginBottom: tokens.spacingVerticalM }}>
                      {/* Sección para agregar sedes existentes */}
                      {customerTenants.length > 0 && (
                        <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center', flexWrap: 'wrap', padding: tokens.spacingVerticalM, backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusMedium }}>
                          <Text weight="semibold" style={{ width: '100%' }}>Agregar Sede Existente</Text>
                          <Combobox
                            placeholder="Seleccionar sede de los tenants asignados"
                            value={
                              selectedOfficeToAdd
                                ? availableOfficesFromTenants.find((o) => o.id === selectedOfficeToAdd)?.name || ''
                                : ''
                            }
                            onOptionSelect={(_, data) => {
                              const office = availableOfficesFromTenants.find((o) => o.name === data.optionValue);
                              if (office) {
                                setSelectedOfficeToAdd(office.id);
                              }
                            }}
                            style={{ width: '300px' }}
                            disabled={isLoadingAvailableOffices || availableOfficesFromTenants.length === 0}
                          >
                            {availableOfficesFromTenants.map((office) => (
                              <Option key={office.id} value={office.name}>
                                {office.name} {office.city ? `(${office.city})` : ''} - {office.tenantName || 'N/A'}
                              </Option>
                            ))}
                          </Combobox>
                          <Button
                            appearance="primary"
                            icon={<AddRegular />}
                            onClick={handleAddExistingOffice}
                            disabled={!selectedOfficeToAdd || isAssigningOfficeToCustomer || isLoadingAvailableOffices || availableOfficesFromTenants.length === 0}
                          >
                            Agregar Sede
                          </Button>
                          {isLoadingAvailableOffices && (
                            <Spinner size="small" label="Cargando sedes..." />
                          )}
                          {!isLoadingAvailableOffices && availableOfficesFromTenants.length === 0 && customerTenants.length > 0 && (
                            <Text size={300} style={{ color: tokens.colorNeutralForeground3 }}>
                              No hay sedes disponibles para agregar
                            </Text>
                          )}
                        </div>
                      )}

                      {/* Sección para crear nuevas sedes */}
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center', flexWrap: 'wrap', padding: tokens.spacingVerticalM, backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusMedium }}>
                        <Text weight="semibold" style={{ width: '100%' }}>Crear Nueva Sede</Text>
                        <Combobox
                          placeholder="Seleccionar tenant"
                          value={
                            selectedTenantForOffice
                              ? customerTenants.find((t) => t.id === selectedTenantForOffice)?.name || ''
                              : ''
                          }
                          onOptionSelect={(_, data) => {
                            const tenant = customerTenants.find((t) => t.name === data.optionValue);
                            if (tenant) {
                              setSelectedTenantForOffice(tenant.id);
                            }
                          }}
                          style={{ width: '200px' }}
                          disabled={customerTenants.length === 0}
                        >
                          {customerTenants.map((tenant) => (
                            <Option key={tenant.id} value={tenant.name}>
                              {tenant.name}
                            </Option>
                          ))}
                        </Combobox>
                        <Input
                          placeholder="Nombre de la sede"
                          value={officeFormData.name}
                          onChange={(e) => setOfficeFormData({ ...officeFormData, name: e.target.value })}
                          style={{ width: '200px' }}
                          disabled={!selectedTenantForOffice || customerTenants.length === 0}
                        />
                        <Button
                          appearance="primary"
                          icon={<AddRegular />}
                          onClick={handleCreateOfficeFromTab}
                          disabled={!selectedTenantForOffice || !officeFormData.name.trim() || isCreatingOfficeFromTab || customerTenants.length === 0}
                        >
                          Crear Sede
                        </Button>
                      </div>
                      {customerTenants.length === 0 && (
                        <MessageBar intent="warning">
                          <MessageBarBody>
                            Debe asignar al menos un tenant al cliente antes de poder crear o agregar sedes.
                          </MessageBarBody>
                        </MessageBar>
                      )}
                    </div>

                    {isLoadingOffices ? (
                      <Spinner label="Cargando sedes..." />
                    ) : (
                      <div>
                        {customerOffices.length === 0 ? (
                          <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                            <Text>No hay sedes asignadas</Text>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell>Nombre</TableHeaderCell>
                                <TableHeaderCell>Ciudad</TableHeaderCell>
                                <TableHeaderCell>Tenant</TableHeaderCell>
                                <TableHeaderCell>Estado</TableHeaderCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {customerOffices.map((office) => (
                                <TableRow key={office.id}>
                                  <TableCell>{office.name}</TableCell>
                                  <TableCell>{office.city || 'N/A'}</TableCell>
                                  <TableCell>{office.tenantName || 'N/A'}</TableCell>
                                  <TableCell>
                                    {office.isSuspended ? (
                                      <Badge appearance="filled" color="danger">Suspendida</Badge>
                                    ) : office.isActive ? (
                                      <Badge appearance="filled" color="success">Activa</Badge>
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

                {/* Tab de Usuarios */}
                {detailsActiveTab === 'users' && (
                  <div style={{ marginTop: tokens.spacingVerticalL }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacingVerticalM }}>
                      <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, alignItems: 'center', flexWrap: 'wrap' }}>
                        <Combobox
                          placeholder="Seleccionar tenant"
                          value={
                            selectedTenantToAdd
                              ? customerTenants.find((t) => t.id === selectedTenantToAdd)?.name || ''
                              : ''
                          }
                          onOptionSelect={(_, data) => {
                            const tenant = customerTenants.find((t) => t.name === data.optionValue);
                            if (tenant) {
                              setSelectedTenantToAdd(tenant.id);
                            }
                          }}
                          style={{ width: '200px' }}
                          disabled={customerTenants.length === 0}
                        >
                          {customerTenants.map((tenant) => (
                            <Option key={tenant.id} value={tenant.name}>
                              {tenant.name}
                            </Option>
                          ))}
                        </Combobox>
                        <Combobox
                          placeholder="Seleccionar usuario para asignar"
                          value={
                            selectedUserToAdd
                              ? allUsersForAssign.find((u) => u.id === selectedUserToAdd)?.name || allUsersForAssign.find((u) => u.id === selectedUserToAdd)?.email || ''
                              : ''
                          }
                          onOptionSelect={(_, data) => {
                            const user = allUsersForAssign.find((u) => u.email === data.optionValue || u.name === data.optionValue);
                            if (user) {
                              setSelectedUserToAdd(user.id);
                            }
                          }}
                          style={{ width: '300px' }}
                          disabled={!selectedTenantToAdd || customerTenants.length === 0}
                        >
                          {allUsersForAssign.map((user) => (
                            <Option key={user.id} value={user.email}>
                              {user.name || user.email} {user.email !== user.name ? `(${user.email})` : ''}
                            </Option>
                          ))}
                        </Combobox>
                        <Button
                          appearance="primary"
                          icon={<AddRegular />}
                          onClick={handleAssignUserToCustomer}
                          disabled={!selectedUserToAdd || !selectedTenantToAdd || isAssigningUserToCustomer || isLoadingAllUsers || customerTenants.length === 0}
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>

                    {isLoadingUsers ? (
                      <Spinner label="Cargando usuarios..." />
                    ) : (
                      <div>
                        {customerUsers.length === 0 ? (
                          <div style={{ padding: tokens.spacingVerticalXXL, textAlign: 'center' }}>
                            <Text>No hay usuarios asignados</Text>
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHeaderCell>Nombre</TableHeaderCell>
                                <TableHeaderCell>Email</TableHeaderCell>
                                <TableHeaderCell>Rol</TableHeaderCell>
                                <TableHeaderCell>Estado</TableHeaderCell>
                                <TableHeaderCell>Acciones</TableHeaderCell>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {customerUsers.map((user) => (
                                <TableRow key={user.id}>
                                  <TableCell>{user.name || 'N/A'}</TableCell>
                                  <TableCell>{user.email}</TableCell>
                                  <TableCell>{getRoleLabel(user.role)}</TableCell>
                                  <TableCell>
                                    {user.isSuspended ? (
                                      <Badge appearance="filled" color="danger">Suspendido</Badge>
                                    ) : user.isActive ? (
                                      <Badge appearance="filled" color="success">Activo</Badge>
                                    ) : (
                                      <Badge appearance="outline">Inactivo</Badge>
                                    )}
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      appearance="subtle"
                                      icon={<DeleteRegular />}
                                      onClick={() => handleRemoveUserFromCustomer(user.id)}
                                      disabled={isAssigningUserToCustomer}
                                    >
                                      Desasignar
                                    </Button>
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
              </>
            ) : null}
          </div>
        </DrawerBody>
      </OverlayDrawer>

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
                      <TableHeaderCell>Nombre</TableHeaderCell>
                      <TableHeaderCell>Contact Email</TableHeaderCell>
                      <TableHeaderCell>Rol</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name || 'N/A'}</TableCell>
                        <TableCell>{user.contactEmail || user.email || 'N/A'}</TableCell>
                        <TableCell>{getRoleLabel(user.role)}</TableCell>
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
                <TableSkeleton rows={5} columns={4} />
              ) : customerTenants.length === 0 ? (
                <Text>No hay tenants asociados a este cliente.</Text>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Nombre</TableHeaderCell>
                      <TableHeaderCell>Creado</TableHeaderCell>
                      <TableHeaderCell>Estado</TableHeaderCell>
                      <TableHeaderCell>Acciones</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerTenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell>{tenant.name}</TableCell>
                        <TableCell>{new Date(tenant.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {tenant.isSuspended ? (
                            <Badge appearance="filled" color="danger">Suspendido</Badge>
                          ) : tenant.isActive ? (
                            <Badge appearance="filled" color="success">Activo</Badge>
                          ) : (
                            <Badge appearance="outline">Inactivo</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            appearance="subtle"
                            icon={<EyeRegular />}
                            onClick={() => handleViewTenantInfo(tenant.id)}
                            style={{ cursor: 'pointer' }}
                          >
                            Ver detalles
                          </Button>
                        </TableCell>
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

      {/* Dialog de información del tenant */}
      <Dialog open={isTenantInfoDialogOpen} onOpenChange={(_, data) => setIsTenantInfoDialogOpen(data.open)}>
        <DialogSurface style={{ minWidth: '500px' }}>
          <DialogTitle>Información del Tenant</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingTenant ? (
                <DetailsSkeleton rows={8} />
              ) : selectedTenant ? (
                <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
                  <Field label="Nombre" className={styles.formField}>
                    <Input value={selectedTenant.name} readOnly />
                  </Field>
                  <Field label="Cliente" className={styles.formField}>
                    <Input value={selectedTenant.customerName || 'N/A'} readOnly />
                  </Field>
                  {selectedTenant.officeName && (
                    <Field label="Sede" className={styles.formField}>
                      <Input value={selectedTenant.officeName} readOnly />
                    </Field>
                  )}
                  <Field label="Estado" className={styles.formField}>
                    <div>
                      {selectedTenant.isSuspended ? (
                        <Badge appearance="filled" color="danger">Suspendido</Badge>
                      ) : selectedTenant.isActive ? (
                        <Badge appearance="filled" color="success">Activo</Badge>
                      ) : (
                        <Badge appearance="outline">Inactivo</Badge>
                      )}
                    </div>
                  </Field>
                  {selectedTenant.userCount !== undefined && (
                    <Field label="Usuarios" className={styles.formField}>
                      <Input value={selectedTenant.userCount.toString()} readOnly />
                    </Field>
                  )}
                  <Field label="Creado" className={styles.formField}>
                    <Input value={new Date(selectedTenant.createdAt).toLocaleString()} readOnly />
                  </Field>
                  <Field label="Actualizado" className={styles.formField}>
                    <Input value={new Date(selectedTenant.updatedAt).toLocaleString()} readOnly />
                  </Field>
                </div>
              ) : (
                <Text>No se pudo cargar la información del tenant.</Text>
              )}
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="primary" onClick={() => setIsTenantInfoDialogOpen(false)}>
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
                    value={assignParentSearchText || (selectedParentId ? customers.find((c) => c.id === selectedParentId)?.name || '' : '')}
                    onOptionSelect={(_, data) => {
                      if (data.optionValue === '') {
                        setSelectedParentId('');
                        setAssignParentSearchText('');
                      } else {
                        const customer = customers.find((c) => c.name === data.optionValue);
                        if (customer) {
                          setSelectedParentId(customer.id);
                          setAssignParentSearchText('');
                        } else {
                          setSelectedParentId('');
                          setAssignParentSearchText('');
                        }
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      setAssignParentSearchText(target.value);
                      if (!target.value) {
                        setSelectedParentId('');
                      }
                    }}
                  >
                    <Option value="">(Cliente raíz - sin padre)</Option>
                    {filteredAssignParentCustomers.map((customer) => (
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
              setAssignParentSearchText('');
            }}>
              Cancelar
            </Button>
            <Button appearance="primary" onClick={handleConfirmAssignParent} disabled={isAssigningParent} loading={isAssigningParent}>
              Asignar
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Dialog de sedes */}
      <Dialog open={isOfficesDialogOpen} onOpenChange={(_, data) => setIsOfficesDialogOpen(data.open)}>
        <DialogSurface style={{ minWidth: '600px' }}>
          <DialogTitle>Sedes del Cliente</DialogTitle>
          <DialogBody>
            <DialogContent>
              {isLoadingOffices ? (
                <TableSkeleton rows={5} columns={6} />
              ) : customerOffices.length === 0 ? (
                <Text>No hay sedes asociadas a este cliente.</Text>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Nombre</TableHeaderCell>
                      <TableHeaderCell>Dirección</TableHeaderCell>
                      <TableHeaderCell>Ciudad</TableHeaderCell>
                      <TableHeaderCell>Teléfono</TableHeaderCell>
                      <TableHeaderCell>Email</TableHeaderCell>
                      <TableHeaderCell>Estado</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerOffices.map((office) => (
                      <TableRow key={office.id}>
                        <TableCell>{office.name}</TableCell>
                        <TableCell>{office.address || 'N/A'}</TableCell>
                        <TableCell>{office.city || 'N/A'}</TableCell>
                        <TableCell>
                          {office.phone ? (
                            <TeachingPopover
                              open={officeContactPopoverOpen === `${office.id}-phone`}
                              onOpenChange={(_, data) => {
                                setOfficeContactPopoverOpen(data.open ? `${office.id}-phone` : null);
                              }}
                            >
                              <TeachingPopoverTrigger disableButtonEnhancement>
                                <Button
                                  appearance="subtle"
                                  style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto', textDecoration: 'underline' }}
                                >
                                  {office.phone}
                                </Button>
                              </TeachingPopoverTrigger>
                              <TeachingPopoverSurface>
                                <TeachingPopoverHeader>
                                  Datos de Contacto: {office.name}
                                </TeachingPopoverHeader>
                                <TeachingPopoverBody>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                                    <div>
                                      <Text weight="semibold">Teléfono:</Text>
                                      <Text>{office.phone || 'N/A'}</Text>
                                    </div>
                                    <div>
                                      <Text weight="semibold">Email:</Text>
                                      <Text>{office.email || 'N/A'}</Text>
                                    </div>
                                    <div>
                                      <Text weight="semibold">Ciudad:</Text>
                                      <Text>{office.city || 'N/A'}</Text>
                                    </div>
                                    <div>
                                      <Text weight="semibold">Dirección:</Text>
                                      <Text>{office.address || 'N/A'}</Text>
                                    </div>
                                  </div>
                                </TeachingPopoverBody>
                              </TeachingPopoverSurface>
                            </TeachingPopover>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {office.email ? (
                            <TeachingPopover
                              open={officeContactPopoverOpen === `${office.id}-email`}
                              onOpenChange={(_, data) => {
                                setOfficeContactPopoverOpen(data.open ? `${office.id}-email` : null);
                              }}
                            >
                              <TeachingPopoverTrigger disableButtonEnhancement>
                                <Button
                                  appearance="subtle"
                                  style={{ cursor: 'pointer', padding: 0, minWidth: 'auto', height: 'auto', textDecoration: 'underline' }}
                                >
                                  {office.email}
                                </Button>
                              </TeachingPopoverTrigger>
                              <TeachingPopoverSurface>
                                <TeachingPopoverHeader>
                                  Datos de Contacto: {office.name}
                                </TeachingPopoverHeader>
                                <TeachingPopoverBody>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM }}>
                                    <div>
                                      <Text weight="semibold">Teléfono:</Text>
                                      <Text>{office.phone || 'N/A'}</Text>
                                    </div>
                                    <div>
                                      <Text weight="semibold">Email:</Text>
                                      <Text>{office.email || 'N/A'}</Text>
                                    </div>
                                    <div>
                                      <Text weight="semibold">Ciudad:</Text>
                                      <Text>{office.city || 'N/A'}</Text>
                                    </div>
                                    <div>
                                      <Text weight="semibold">Dirección:</Text>
                                      <Text>{office.address || 'N/A'}</Text>
                                    </div>
                                  </div>
                                </TeachingPopoverBody>
                              </TeachingPopoverSurface>
                            </TeachingPopover>
                          ) : (
                            'N/A'
                          )}
                        </TableCell>
                        <TableCell>
                          {office.isSuspended ? (
                            <Badge appearance="filled" color="danger">Suspendido</Badge>
                          ) : office.isActive ? (
                            <Badge appearance="filled" color="success">Activo</Badge>
                          ) : (
                            <Badge appearance="outline">Inactivo</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button appearance="primary" onClick={() => setIsOfficesDialogOpen(false)}>
              Cerrar
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
              loading={isSendingNotification}
            >
              {isSendingNotification ? 'Enviando...' : 'Enviar Notificación'}
            </Button>
          </DialogActions>
        </DialogSurface>
      </Dialog>

      {/* Drawer de crear sede */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isCreateOfficeDialogOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            if (isCreatingOffice) {
              return;
            }
            const hasData = officeFormData.name.trim() || 
                            officeFormData.tenantId ||
                            officeFormData.address.trim() || 
                            officeFormData.city.trim() || 
                            officeFormData.stateProvince.trim() || 
                            officeFormData.postalCode.trim() || 
                            officeFormData.phone.trim() || 
                            officeFormData.email.trim();
            if (hasData) {
              if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
                setIsCreateOfficeDialogOpen(false);
                setOfficeFormData({
                  tenantId: '',
                  name: '',
                  address: '',
                  city: '',
                  stateProvince: '',
                  postalCode: '',
                  phone: '',
                  email: '',
                });
                setTenantSearchText('');
                setCreateOfficeError(null);
              }
              return;
            } else {
              setIsCreateOfficeDialogOpen(false);
              setCreateOfficeError(null);
            }
          } else {
            setIsCreateOfficeDialogOpen(data.open);
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
                  if (isCreatingOffice) {
                    return;
                  }
                  const hasData = officeFormData.name.trim() || 
                                  officeFormData.address.trim() || 
                                  officeFormData.city.trim() || 
                                  officeFormData.stateProvince.trim() || 
                                  officeFormData.postalCode.trim() || 
                                  officeFormData.phone.trim() || 
                                  officeFormData.email.trim();
                  if (hasData) {
                    if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
                      setIsCreateOfficeDialogOpen(false);
                      setOfficeFormData({
                        tenantId: '',
                        name: '',
                        address: '',
                        city: '',
                        stateProvince: '',
                        postalCode: '',
                        phone: '',
                        email: '',
                      });
                      setTenantSearchText('');
                      setCreateOfficeError(null);
                    }
                  } else {
                    setIsCreateOfficeDialogOpen(false);
                    setCreateOfficeError(null);
                  }
                }}
              />
            }
          >
            Nueva Sede
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isCreatingOffice ? (
              <DetailsSkeleton rows={8} />
            ) : (
              <>
                <Field label="Cliente" className={styles.formField}>
                  <Input
                    value={selectedCustomer?.name || ''}
                    readOnly
                  />
                </Field>
                <Field label="Tenant" required className={styles.formField}>
                  {customerTenants.length === 0 ? (
                    <Input
                      value=""
                      placeholder="No hay tenants disponibles"
                      readOnly
                      disabled
                    />
                  ) : (
                    <Combobox
                      value={tenantSearchText || customerTenants.find(t => t.id === officeFormData.tenantId)?.name || ''}
                      onOptionSelect={(_, data) => {
                        if (data.optionValue) {
                          setOfficeFormData({ ...officeFormData, tenantId: data.optionValue });
                          setTenantSearchText('');
                        }
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        setTenantSearchText(target.value);
                      }}
                    >
                      {filteredTenants.map((tenant) => (
                        <Option key={tenant.id} value={tenant.id}>
                          {tenant.name}
                        </Option>
                      ))}
                    </Combobox>
                  )}
                </Field>
                <Field label="Nombre" required className={styles.formField}>
                  <Input
                    value={officeFormData.name}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, name: e.target.value })}
                    placeholder="Nombre de la sede"
                  />
                </Field>
                <Field label="Dirección" className={styles.formField}>
                  <Input
                    value={officeFormData.address}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, address: e.target.value })}
                    placeholder="Dirección"
                  />
                </Field>
                <Field label="Ciudad" className={styles.formField}>
                  <Input
                    value={officeFormData.city}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, city: e.target.value })}
                    placeholder="Ciudad"
                  />
                </Field>
                <Field label="Estado/Provincia" className={styles.formField}>
                  <Input
                    value={officeFormData.stateProvince}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, stateProvince: e.target.value })}
                    placeholder="Estado/Provincia"
                  />
                </Field>
                <Field label="Código Postal" className={styles.formField}>
                  <Input
                    value={officeFormData.postalCode}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, postalCode: e.target.value })}
                    placeholder="Código Postal"
                  />
                </Field>
                <Field label="Teléfono" className={styles.formField}>
                  <Input
                    value={officeFormData.phone}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, phone: e.target.value })}
                    placeholder="Teléfono"
                  />
                </Field>
                <Field label="Email" className={styles.formField}>
                  <Input
                    type="email"
                    value={officeFormData.email}
                    onChange={(e) => setOfficeFormData({ ...officeFormData, email: e.target.value })}
                    placeholder="Email"
                  />
                </Field>
                {createOfficeError && (
                  <MessageBar intent="error" style={{ marginTop: tokens.spacingVerticalXL, marginBottom: tokens.spacingVerticalM }}>
                    <MessageBarBody>{createOfficeError}</MessageBarBody>
                  </MessageBar>
                )}
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => {
                      const hasData = officeFormData.name.trim() || 
                                      officeFormData.address.trim() || 
                                      officeFormData.city.trim() || 
                                      officeFormData.stateProvince.trim() || 
                                      officeFormData.postalCode.trim() || 
                                      officeFormData.phone.trim() || 
                                      officeFormData.email.trim();
                      if (hasData) {
                        if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los datos no guardados.')) {
                          setIsCreateOfficeDialogOpen(false);
                          setOfficeFormData({
                            tenantId: '',
                            name: '',
                            address: '',
                            city: '',
                            stateProvince: '',
                            postalCode: '',
                            phone: '',
                            email: '',
                          });
                          setTenantSearchText('');
                          setCreateOfficeError(null);
                        }
                      } else {
                        setIsCreateOfficeDialogOpen(false);
                        setCreateOfficeError(null);
                      }
                    }}
                    disabled={isCreatingOffice}
                  >
                    Cancelar
                  </Button>
                  <Button appearance="primary" onClick={handleCreateOffice} disabled={isCreatingOffice} loading={isCreatingOffice}>
                    {isCreatingOffice ? 'Creando...' : 'Crear'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Drawer de crear tenant */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="medium"
        open={isCreateTenantDialogOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            if (isCreatingTenant) {
              return;
            }
            const tenantCount = selectedCustomer?.tenantCount ?? 0;
            const hasData = tenantCount === 0 
              ? selectedTenantToAdd.trim() 
              : tenantFormData.name.trim();
            if (hasData) {
              if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
                setIsCreateTenantDialogOpen(false);
                setTenantFormData({
                  name: '',
                  customerId: '',
                });
                setSelectedTenantToAdd('');
                setCreateTenantError(null);
              }
              return;
            } else {
              setIsCreateTenantDialogOpen(false);
              setSelectedTenantToAdd('');
              setCreateTenantError(null);
            }
          } else {
            setIsCreateTenantDialogOpen(data.open);
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
                  if (isCreatingTenant) {
                    return;
                  }
                  const tenantCount = selectedCustomer?.tenantCount ?? 0;
                  const hasData = tenantCount === 0 
                    ? selectedTenantToAdd.trim() 
                    : tenantFormData.name.trim();
                  if (hasData) {
                    if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
                      setIsCreateTenantDialogOpen(false);
                      setTenantFormData({
                        name: '',
                        customerId: '',
                      });
                      setSelectedTenantToAdd('');
                      setCreateTenantError(null);
                    }
                  } else {
                    setIsCreateTenantDialogOpen(false);
                    setSelectedTenantToAdd('');
                    setCreateTenantError(null);
                  }
                }}
              />
            }
          >
            {(() => {
              const tenantCount = selectedCustomer?.tenantCount ?? 0;
              return tenantCount === 0 ? 'Asignar Tenant' : 'Nuevo Tenant';
            })()}
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isCreatingTenant ? (
              <DetailsSkeleton rows={3} />
            ) : (
              <>
                <Field label="Cliente" className={styles.formField}>
                  <Input
                    value={selectedCustomer?.name || ''}
                    readOnly
                  />
                </Field>
                {(() => {
                  const tenantCount = selectedCustomer?.tenantCount ?? 0;
                  
                  // Si el cliente no tiene tenants, mostrar Combobox para asignar uno existente
                  if (tenantCount === 0) {
                    return (
                      <Field label="Seleccionar Tenant" required className={styles.formField}>
                        {isLoadingAllTenants ? (
                          <Spinner size="small" label="Cargando tenants..." />
                        ) : (
                          <Combobox
                            value={selectedTenantToAdd
                              ? allTenantsForAssign.find((t) => t.id === selectedTenantToAdd)?.name || ''
                              : ''}
                            onOptionSelect={(_, data) => {
                              if (data.optionValue) {
                                const tenant = allTenantsForAssign.find((t) => t.name === data.optionValue);
                                if (tenant) {
                                  setSelectedTenantToAdd(tenant.id);
                                }
                              } else {
                                setSelectedTenantToAdd('');
                              }
                            }}
                            placeholder="Seleccione un tenant"
                          >
                            {allTenantsForAssign.map((tenant) => (
                              <Option key={tenant.id} value={tenant.name}>
                                {tenant.name}
                              </Option>
                            ))}
                          </Combobox>
                        )}
                        {allTenantsForAssign.length === 0 && !isLoadingAllTenants && (
                          <MessageBar intent="informative" style={{ marginTop: tokens.spacingVerticalS }}>
                            <MessageBarBody>
                              No hay tenants disponibles para asignar. Todos los tenants existentes ya están asignados a otros clientes.
                            </MessageBarBody>
                          </MessageBar>
                        )}
                      </Field>
                    );
                  }
                  
                  // Si el cliente ya tiene tenants, mostrar Input para crear uno nuevo
                  return (
                    <Field label="Nombre" required className={styles.formField}>
                      <Input
                        value={tenantFormData.name}
                        onChange={(e) => setTenantFormData({ ...tenantFormData, name: e.target.value })}
                        placeholder="Nombre del tenant"
                      />
                    </Field>
                  );
                })()}
                {createTenantError && (
                  <MessageBar intent="error" style={{ marginTop: tokens.spacingVerticalXL, marginBottom: tokens.spacingVerticalM }}>
                    <MessageBarBody>{createTenantError}</MessageBarBody>
                  </MessageBar>
                )}
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => {
                      const tenantCount = selectedCustomer?.tenantCount ?? 0;
                      const hasData = tenantCount === 0 
                        ? selectedTenantToAdd.trim() 
                        : tenantFormData.name.trim();
                      if (hasData) {
                        if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los datos no guardados.')) {
                          setIsCreateTenantDialogOpen(false);
                          setTenantFormData({
                            name: '',
                            customerId: '',
                          });
                          setSelectedTenantToAdd('');
                          setCreateTenantError(null);
                        }
                      } else {
                        setIsCreateTenantDialogOpen(false);
                        setSelectedTenantToAdd('');
                        setCreateTenantError(null);
                      }
                    }}
                    disabled={isCreatingTenant}
                  >
                    Cancelar
                  </Button>
                  {(() => {
                    const tenantCount = selectedCustomer?.tenantCount ?? 0;
                    if (tenantCount === 0) {
                      return (
                        <Button 
                          appearance="primary" 
                          onClick={handleAssignTenantFromDialog} 
                          disabled={isCreatingTenant || !selectedTenantToAdd || isLoadingAllTenants || allTenantsForAssign.length === 0} 
                          loading={isCreatingTenant}
                        >
                          {isCreatingTenant ? 'Asignando...' : 'Asignar'}
                        </Button>
                      );
                    }
                    return (
                      <Button 
                        appearance="primary" 
                        onClick={handleCreateTenant} 
                        disabled={isCreatingTenant} 
                        loading={isCreatingTenant}
                      >
                        {isCreatingTenant ? 'Creando...' : 'Crear'}
                      </Button>
                    );
                  })()}
                </div>
              </>
            )}
          </div>
        </DrawerBody>
      </OverlayDrawer>

      {/* Drawer de crear usuario */}
      <OverlayDrawer
        {...restoreFocusSourceAttributes}
        position="end"
        size="large"
        open={isCreateUserDrawerOpen}
        modalType="alert"
        onOpenChange={(event: any, data: { open: boolean }) => {
          if (data.open === false) {
            if (isCreatingUser) {
              return;
            }
            const hasData = userFormData.email.trim() || 
                            userFormData.name.trim() || 
                            userFormData.tenantId ||
                            userFormData.contactEmail.trim() || 
                            userFormData.phone.trim() || 
                            userFormData.auth0Id.trim();
            if (hasData) {
              if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
                setIsCreateUserDrawerOpen(false);
                setUserFormData({
                  email: '',
                  name: '',
                  role: 'User',
                  tenantId: '',
                  customerId: '',
                  contactEmail: '',
                  phone: '',
                  auth0Id: '',
                });
                setSelectedOfficeId('');
                setUserTenantSearchText('');
                setOfficeSearchText('');
                setRoleSearchText('');
                setCreateUserError(null);
              }
              return;
            } else {
              setIsCreateUserDrawerOpen(false);
              setCreateUserError(null);
            }
          } else {
            setIsCreateUserDrawerOpen(data.open);
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
                  if (isCreatingUser) {
                    return;
                  }
                  const hasData = userFormData.email.trim() || 
                                  userFormData.name.trim() || 
                                  userFormData.tenantId ||
                                  userFormData.contactEmail.trim() || 
                                  userFormData.phone.trim() || 
                                  userFormData.auth0Id.trim();
                  if (hasData) {
                    if (window.confirm('¿Está seguro de que desea cerrar? Se perderán los datos no guardados.')) {
                      setIsCreateUserDrawerOpen(false);
                      setUserFormData({
                        email: '',
                        name: '',
                        role: 'User',
                        tenantId: '',
                        customerId: '',
                        contactEmail: '',
                        phone: '',
                        auth0Id: '',
                      });
                      setCreateUserError(null);
                    }
                  } else {
                    setIsCreateUserDrawerOpen(false);
                    setCreateUserError(null);
                  }
                }}
              />
            }
          >
            Nuevo Usuario
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          <div className={styles.detailsContent} style={{ padding: tokens.spacingVerticalXL }}>
            {isCreatingUser ? (
              <DetailsSkeleton rows={8} />
            ) : (
              <>
                <Field label="Cliente" className={styles.formField}>
                  <Input
                    value={selectedCustomer?.name || ''}
                    readOnly
                  />
                </Field>
                <Field label="Tenant" required className={styles.formField}>
                  {customerTenants.length === 0 ? (
                    <Input
                      value=""
                      placeholder="No hay tenants disponibles"
                      readOnly
                      disabled
                    />
                  ) : (
                    <Combobox
                      value={userTenantSearchText || customerTenants.find(t => t.id === userFormData.tenantId)?.name || ''}
                      onOptionSelect={(_, data) => {
                        if (data.optionValue) {
                      setUserFormData({ ...userFormData, tenantId: data.optionValue });
                      // Filtrar sedes del tenant seleccionado y establecer la primera por defecto
                      const tenantOffices = availableOffices.filter(o => o.tenantId === data.optionValue);
                      if (tenantOffices.length > 0) {
                        setSelectedOfficeId(tenantOffices[0].id);
                      } else {
                        setSelectedOfficeId('');
                      }
                      setUserTenantSearchText('');
                      setOfficeSearchText(''); // Limpiar búsqueda de sede cuando cambia el tenant
                        }
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        setUserTenantSearchText(target.value);
                      }}
                    >
                      {filteredUserTenants.map((tenant) => (
                        <Option key={tenant.id} value={tenant.id}>
                          {tenant.name}
                        </Option>
                      ))}
                    </Combobox>
                  )}
                </Field>
                <Field label="Sede" className={styles.formField}>
                  {availableOffices.length === 0 ? (
                    <Input
                      value=""
                      placeholder="No hay sedes disponibles"
                      readOnly
                      disabled
                    />
                  ) : (
                    <Combobox
                      value={officeSearchText || availableOffices
                        .filter(o => o.tenantId === userFormData.tenantId)
                        .find(o => o.id === selectedOfficeId)?.name || ''}
                      onOptionSelect={(_, data) => {
                        if (data.optionValue) {
                          setSelectedOfficeId(data.optionValue);
                          setOfficeSearchText('');
                        }
                      }}
                      onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        setOfficeSearchText(target.value);
                      }}
                    >
                      {filteredOffices.map((office) => (
                        <Option key={office.id} value={office.id}>
                          {office.name}
                        </Option>
                      ))}
                    </Combobox>
                  )}
                </Field>
                <Field label="Email" required className={styles.formField}>
                  <Input
                    type="email"
                    value={userFormData.email}
                    onChange={(e) => {
                      const emailValue = e.target.value;
                      setUserFormData({ 
                        ...userFormData, 
                        email: emailValue,
                        contactEmail: emailValue // Actualizar contactEmail automáticamente con el mismo valor
                      });
                    }}
                    placeholder="Email del usuario"
                  />
                </Field>
                <Field label="Nombre" className={styles.formField}>
                  <Input
                    value={userFormData.name}
                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                    placeholder="Nombre del usuario"
                  />
                </Field>
                <Field label="Rol" className={styles.formField}>
                  <Combobox
                    value={roleSearchText || (userFormData.role === 'Admin' ? 'Administrador' : 'Usuario')}
                    onOptionSelect={(_, data) => {
                      if (data.optionValue) {
                        setUserFormData({ ...userFormData, role: data.optionValue as 'Admin' | 'User' });
                        setRoleSearchText('');
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      setRoleSearchText(target.value);
                    }}
                  >
                    {filteredRoles.map((role) => (
                      <Option key={role.value} value={role.value}>
                        {role.label}
                      </Option>
                    ))}
                  </Combobox>
                </Field>
                <Field label="Email de Contacto" className={styles.formField}>
                  <Input
                    type="email"
                    value={userFormData.contactEmail}
                    onChange={(e) => setUserFormData({ ...userFormData, contactEmail: e.target.value })}
                    placeholder="Email de contacto"
                  />
                </Field>
                <Field label="Teléfono" className={styles.formField}>
                  <Input
                    value={userFormData.phone}
                    onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                    placeholder="Teléfono"
                  />
                </Field>
                <Field label="Auth0 ID (opcional)" className={styles.formField}>
                  <Input
                    value={userFormData.auth0Id}
                    onChange={(e) => setUserFormData({ ...userFormData, auth0Id: e.target.value })}
                    placeholder="Se generará automáticamente si se deja vacío"
                  />
                </Field>
                {createUserError && (
                  <MessageBar intent="error" style={{ marginTop: tokens.spacingVerticalXL, marginBottom: tokens.spacingVerticalM }}>
                    <MessageBarBody>{createUserError}</MessageBarBody>
                  </MessageBar>
                )}
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalM, marginTop: tokens.spacingVerticalXL, justifyContent: 'flex-end' }}>
                  <Button 
                    appearance="secondary" 
                    onClick={() => {
                      const hasData = userFormData.email.trim() || 
                                      userFormData.name.trim() || 
                                      userFormData.tenantId ||
                                      userFormData.contactEmail.trim() || 
                                      userFormData.phone.trim() || 
                                      userFormData.auth0Id.trim();
                      if (hasData) {
                        if (window.confirm('¿Está seguro de que desea cancelar? Se perderán los datos no guardados.')) {
                          setIsCreateUserDrawerOpen(false);
                          setUserFormData({
                            email: '',
                            name: '',
                            role: 'User',
                            tenantId: '',
                            customerId: '',
                            contactEmail: '',
                            phone: '',
                            auth0Id: '',
                          });
                          setSelectedOfficeId('');
                          setUserTenantSearchText('');
                          setOfficeSearchText('');
                          setRoleSearchText('');
                          setCreateUserError(null);
                        }
                      } else {
                        setIsCreateUserDrawerOpen(false);
                        setCreateUserError(null);
                      }
                    }}
                    disabled={isCreatingUser}
                  >
                    Cancelar
                  </Button>
                  <Button appearance="primary" onClick={handleCreateUser} disabled={isCreatingUser} loading={isCreatingUser}>
                    {isCreatingUser ? 'Creando...' : 'Crear'}
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

