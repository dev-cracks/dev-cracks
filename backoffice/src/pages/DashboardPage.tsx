import {
  Card,
  CardHeader,
  CardPreview,
  Text,
  Skeleton,
  SkeletonItem,
  makeStyles,
  shorthands,
  tokens,
  Button,
  Tree,
  TreeItem,
  TreeItemLayout,
  Persona,
  Spinner,
} from '@fluentui/react-components';
import { HomeRegular, ArrowClockwiseRegular, BuildingRegular, PeopleRegular, BriefcaseRegular, LocationRegular } from '@fluentui/react-icons';
import { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { backofficeService } from '../services/backofficeService';
import { tenantService } from '../services/tenantService';
import { customerService, CustomerDto } from '../services/customerService';
import { officeService, OfficeDto } from '../services/officeService';
import { userService, UserDto } from '../services/userService';
import { TenantDto } from '../services/tenantService';
import { StatsCardSkeleton } from '../components/StatsCardSkeleton';
import { DetailsSkeleton } from '../components/DetailsSkeleton';
import { OfficesMap } from '../components/OfficesMap';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXL),
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
  welcomeMessage: {
    fontSize: '48px',
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalL,
    textAlign: 'center',
    padding: tokens.spacingVerticalXL,
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  card: {
    height: '100%',
  },
  numberSkeleton: {
    width: '80px',
    height: '48px',
    marginTop: tokens.spacingVerticalM,
  },
  previewContent: {
    padding: '20px',
    fontSize: '32px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60px',
  },
  treeCard: {
    minHeight: '400px',
  },
  treeContainer: {
    padding: tokens.spacingVerticalL,
    maxHeight: '600px',
    overflowY: 'auto',
  },
  personaContainer: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
});

interface TreeData {
  customers: CustomerDto[];
  tenants: TenantDto[];
  offices: OfficeDto[];
  users: UserDto[];
  officeUsersMap: Map<string, UserDto[]>;
}

interface OfficeNode {
  office: OfficeDto;
  users: UserDto[];
}

interface TenantNode {
  tenant: TenantDto;
  offices: OfficeNode[];
}

interface CustomerNode {
  customer: CustomerDto;
  children: CustomerNode[];
  tenants: TenantNode[];
}

export const DashboardPage = () => {
  const styles = useStyles();
  const { userDetails, user } = useAuth();
  const [userCount, setUserCount] = useState<number | null>(null);
  const [tenantCount, setTenantCount] = useState<number | null>(null);
  const [customerCount, setCustomerCount] = useState<number | null>(null);
  const [officeCount, setOfficeCount] = useState<number | null>(null);
  const [offices, setOffices] = useState<OfficeDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [treeData, setTreeData] = useState<TreeData | null>(null);
  const [isLoadingTree, setIsLoadingTree] = useState(false);

  useEffect(() => {
    // Solo cargar stats si userDetails está disponible
    if (userDetails) {
      loadStats();
      loadTreeData();
    } else {
      setIsLoading(false);
    }
  }, [userDetails]);

  const loadStats = async () => {
    try {
      // Cargar todas las estadísticas en paralelo
      const [users, tenants, customers, offices] = await Promise.allSettled([
        backofficeService.getUsers(),
        tenantService.getAllTenants(),
        customerService.getAllCustomers(),
        officeService.getAllOffices(),
      ]);

      // Procesar usuarios
      if (users.status === 'fulfilled') {
        setUserCount(users.value.length);
      } else {
        handleError(users.reason, 'usuarios');
        setUserCount(0);
      }

      // Procesar tenants
      if (tenants.status === 'fulfilled') {
        setTenantCount(tenants.value.length);
      } else {
        handleError(tenants.reason, 'tenants');
        setTenantCount(0);
      }

      // Procesar clientes
      if (customers.status === 'fulfilled') {
        setCustomerCount(customers.value.length);
      } else {
        handleError(customers.reason, 'clientes');
        setCustomerCount(0);
      }

      // Procesar sedes
      if (offices.status === 'fulfilled') {
        setOfficeCount(offices.value.length);
        setOffices(offices.value);
      } else {
        handleError(offices.reason, 'sedes');
        setOfficeCount(0);
        setOffices([]);
      }
    } catch (error: any) {
      // Si es un error de red (API no disponible), solo mostrar warning en desarrollo
      if (error?.statusCode === undefined && import.meta.env.DEV) {
        console.warn('[Dev] API server not available. Stats will show 0.');
      } else {
        console.error('Error loading stats:', error);
      }
      // Para todos los errores, mostrar 0
      setUserCount(0);
      setTenantCount(0);
      setCustomerCount(0);
      setOfficeCount(0);
      setOffices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: any, resource: string) => {
    if (error?.statusCode === undefined && import.meta.env.DEV) {
      console.warn(`[Dev] API server not available for ${resource}. Stats will show 0.`);
    } else if (error?.statusCode === 403) {
      console.warn(`Acceso denegado a ${resource}. Mostrando 0.`);
    } else {
      console.error(`Error loading ${resource}:`, error);
    }
  };

  // Cargar datos para el árbol jerárquico
  const loadTreeData = async () => {
    try {
      setIsLoadingTree(true);
      const [customers, tenants, offices, users] = await Promise.allSettled([
        customerService.getAllCustomers(),
        tenantService.getAllTenants(),
        officeService.getAllOffices(),
        userService.getAllUsers(),
      ]);

      const customersData = customers.status === 'fulfilled' ? customers.value : [];
      const tenantsData = tenants.status === 'fulfilled' ? tenants.value : [];
      const officesData = offices.status === 'fulfilled' ? offices.value : [];
      const usersData = users.status === 'fulfilled' ? users.value : [];

      // Cargar usuarios por sede de forma paralela
      const officeUsersMap = new Map<string, UserDto[]>();
      const officeUsersPromises = officesData.map(async (office) => {
        try {
          const officeUsers = await officeService.getOfficeUsers(office.id);
          // Transformar los usuarios al formato UserDto si es necesario
          const transformedUsers = officeUsers.map((u: any) => ({
            id: u.id,
            email: u.email,
            name: u.name || null,
            tenantId: u.tenantId || null,
            customerId: u.customerId || null,
            role: (u.role === 1 || u.role === 'Admin') ? 'Admin' : 'User',
            contactEmail: u.contactEmail || null,
            phone: u.phone || null,
            auth0Id: u.auth0Id || null,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
            isActive: u.isActive ?? true,
            isSuspended: u.isSuspended ?? false,
          }));
          officeUsersMap.set(office.id, transformedUsers);
        } catch (error) {
          console.warn(`Error loading users for office ${office.id}:`, error);
          officeUsersMap.set(office.id, []);
        }
      });

      await Promise.allSettled(officeUsersPromises);

      const treeDataResult: TreeData = {
        customers: customersData,
        tenants: tenantsData,
        offices: officesData,
        users: usersData,
        officeUsersMap,
      };

      setTreeData(treeDataResult);
    } catch (error: any) {
      console.error('Error loading tree data:', error);
      setTreeData({
        customers: [],
        tenants: [],
        offices: [],
        users: [],
        officeUsersMap: new Map(),
      });
    } finally {
      setIsLoadingTree(false);
    }
  };

  // Construir árbol jerárquico de clientes con todos sus niveles
  const buildCustomerTree = useMemo(() => {
    if (!treeData) return [];

    const { customers, tenants, offices, officeUsersMap } = treeData;

    // Función recursiva para construir el árbol de clientes
    const buildCustomerNode = (customer: CustomerDto) => {
      // Obtener clientes hijos directos
      const childCustomers = customers.filter(c => c.parentId === customer.id);

      // Obtener tenants de este cliente específico
      const customerTenants = tenants.filter(t => t.customerId === customer.id);

      // Construir estructura de tenants con sus sedes y usuarios
      const tenantNodes = customerTenants.map(tenant => {
        // Obtener sedes del tenant
        const tenantOffices = offices.filter(o => o.tenantId === tenant.id);

        // Construir estructura de sedes con sus usuarios
        const officeNodes = tenantOffices.map(office => {
          // Obtener usuarios de la sede desde el mapa
          const officeUsers = officeUsersMap.get(office.id) || [];

          return {
            office,
            users: officeUsers,
          };
        });

        return {
          tenant,
          offices: officeNodes,
        };
      });

      return {
        customer,
        children: childCustomers.map(buildCustomerNode),
        tenants: tenantNodes,
      };
    };

    // Obtener clientes raíz (sin padre)
    const rootCustomers = customers.filter(c => !c.parentId || c.parentId === null);

    return rootCustomers.map(buildCustomerNode);
  }, [treeData]);

  // Renderizar el árbol
  const renderTree = () => {
    if (isLoadingTree) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: tokens.spacingVerticalXL }}>
          <Spinner size="large" label="Cargando estructura jerárquica..." />
        </div>
      );
    }

    if (!treeData || buildCustomerTree.length === 0) {
      return (
        <div style={{ padding: tokens.spacingVerticalXL, textAlign: 'center' }}>
          <Text>No hay datos disponibles para mostrar</Text>
        </div>
      );
    }

    // Función recursiva para renderizar un nodo de cliente
    const renderCustomerNode = (customerNode: CustomerNode, depth: number = 0): JSX.Element => {
      return (
        <TreeItem
          key={`customer-${customerNode.customer.id}-${depth}`}
          itemType="branch"
        >
          <TreeItemLayout
            iconBefore={<BuildingRegular />}
            aside={<Text size={300}>{customerNode.customer.name}</Text>}
          >
            <Text weight={depth === 0 ? "semibold" : "regular"}>{customerNode.customer.name}</Text>
          </TreeItemLayout>
          {/* Renderizar clientes hijos recursivamente */}
          {customerNode.children.map((childNode) => renderCustomerNode(childNode, depth + 1))}
          {/* Renderizar tenants del cliente */}
          {customerNode.tenants.map((tenantNode, tenantIdx) => (
            <TreeItem
              key={`tenant-${tenantNode.tenant.id}-${tenantIdx}`}
              itemType="branch"
            >
              <TreeItemLayout
                iconBefore={<BriefcaseRegular />}
                aside={<Text size={300}>{tenantNode.tenant.name}</Text>}
              >
                <Text>{tenantNode.tenant.name}</Text>
              </TreeItemLayout>
              {/* Sedes del tenant */}
              {tenantNode.offices.map((officeNode, officeIdx) => (
                <TreeItem
                  key={`office-${officeNode.office.id}-${officeIdx}`}
                  itemType="branch"
                >
                  <TreeItemLayout
                    iconBefore={<LocationRegular />}
                    aside={<Text size={300}>{officeNode.office.name}</Text>}
                  >
                    <Text>{officeNode.office.name}</Text>
                  </TreeItemLayout>
                  {/* Usuarios de la sede */}
                  {officeNode.users.map((user, userIdx) => (
                    <TreeItem
                      key={`user-${user.id}-${userIdx}`}
                      itemType="leaf"
                    >
                      <TreeItemLayout
                        iconBefore={<PeopleRegular />}
                      >
                        <div className={styles.personaContainer}>
                          <Persona
                            name={user.name || user.email}
                            secondaryText={user.email}
                            size="extra-small"
                          />
                          {user.role && (
                            <Text size={200} style={{ marginLeft: tokens.spacingHorizontalS }}>
                              ({user.role})
                            </Text>
                          )}
                        </div>
                      </TreeItemLayout>
                    </TreeItem>
                  ))}
                </TreeItem>
              ))}
            </TreeItem>
          ))}
        </TreeItem>
      );
    };

    return (
      <Tree aria-label="Estructura jerárquica de clientes, tenants, sedes y usuarios">
        {buildCustomerTree.map((customerNode, customerIdx) => 
          renderCustomerNode(customerNode, 0)
        )}
      </Tree>
    );
  };

  // Obtener el nombre del usuario para el mensaje de bienvenida
  // El nombre viene de la base de datos y se almacena en el state del usuario
  const getUserDisplayName = () => {
    // El objeto user ahora incluye el nombre de la base de datos si está disponible
    const name = user?.name;
    if (name) return name;
    
    // Si no hay nombre, extraer la parte antes del @ del email y capitalizarla
    const email = user?.email || userDetails?.email;
    if (email) {
      const emailName = email.split('@')[0];
      // Capitalizar la primera letra
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    
    // Último recurso
    return 'Usuario';
  };
  
  const userName = getUserDisplayName();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HomeRegular fontSize={32} />
        <h1 className={styles.title}>Dashboard</h1>
        <Button
          appearance="default"
          icon={<ArrowClockwiseRegular />}
          onClick={loadStats}
          disabled={isLoading}
          title="Actualizar estadísticas del dashboard"
        >
          Actualizar
        </Button>
        <Button
          appearance="default"
          icon={<ArrowClockwiseRegular />}
          onClick={loadTreeData}
          disabled={isLoadingTree}
          title="Actualizar estructura jerárquica"
        >
          Actualizar Árbol
        </Button>
      </div>

      <div className={styles.welcomeMessage}>
        ¡Bienvenido, {userName}!
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">Clientes</Text>}
            description="Total de clientes en el sistema"
          />
          <CardPreview>
            <div className={styles.previewContent}>
              {isLoading || customerCount === null ? (
                <Skeleton className={styles.numberSkeleton}>
                  <SkeletonItem size={48} />
                </Skeleton>
              ) : (
                customerCount
              )}
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">Tenants</Text>}
            description="Total de tenants en el sistema"
          />
          <CardPreview>
            <div className={styles.previewContent}>
              {isLoading || tenantCount === null ? (
                <Skeleton className={styles.numberSkeleton}>
                  <SkeletonItem size={48} />
                </Skeleton>
              ) : (
                tenantCount
              )}
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">Usuarios</Text>}
            description="Total de usuarios en el sistema"
          />
          <CardPreview>
            <div className={styles.previewContent}>
              {isLoading || userCount === null ? (
                <Skeleton className={styles.numberSkeleton}>
                  <SkeletonItem size={48} />
                </Skeleton>
              ) : (
                userCount
              )}
            </div>
          </CardPreview>
        </Card>

        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">Sedes</Text>}
            description="Total de sedes en el sistema"
          />
          <CardPreview>
            <div className={styles.previewContent}>
              {isLoading || officeCount === null ? (
                <Skeleton className={styles.numberSkeleton}>
                  <SkeletonItem size={48} />
                </Skeleton>
              ) : (
                officeCount
              )}
            </div>
          </CardPreview>
        </Card>
      </div>

      <Card>
        <CardHeader
          header={<Text weight="semibold">Mapa de Sedes</Text>}
          description="Ubicación de todas las sedes en el mapa"
        />
        <CardPreview>
          <div style={{ padding: '20px' }}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: tokens.spacingVerticalXL }}>
                <Spinner size="large" label="Cargando mapa..." />
              </div>
            ) : offices.length === 0 ? (
              <Text>No hay sedes disponibles para mostrar en el mapa</Text>
            ) : (
              <OfficesMap offices={offices} />
            )}
          </div>
        </CardPreview>
      </Card>

      <Card className={styles.treeCard}>
        <CardHeader
          header={<Text weight="semibold">Estructura Jerárquica</Text>}
          description="Clientes, tenants, sedes y usuarios organizados jerárquicamente"
        />
        <CardPreview>
          <div className={styles.treeContainer}>
            {renderTree()}
          </div>
        </CardPreview>
      </Card>

      <Card>
        <CardHeader
          header={<Text weight="semibold">Actividad Reciente</Text>}
          description="Últimas actividades del sistema"
        />
        <CardPreview>
          <div style={{ padding: '20px' }}>
            {isLoading ? (
              <DetailsSkeleton rows={5} />
            ) : (
              <Text>Aquí irá la actividad reciente...</Text>
            )}
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};

