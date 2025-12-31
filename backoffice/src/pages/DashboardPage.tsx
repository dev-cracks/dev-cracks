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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('backoffice');
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
    // Only load stats if userDetails is available
    if (userDetails) {
      loadStats();
      loadTreeData();
    } else {
      setIsLoading(false);
    }
  }, [userDetails]);

  const loadStats = async () => {
    try {
      // Load all statistics in parallel
      const [users, tenants, customers, offices] = await Promise.allSettled([
        backofficeService.getUsers(),
        tenantService.getAllTenants(),
        customerService.getAllCustomers(),
        officeService.getAllOffices(),
      ]);

      // Process users
      if (users.status === 'fulfilled') {
        setUserCount(users.value.length);
      } else {
        handleError(users.reason, 'users');
        setUserCount(0);
      }

      // Process tenants
      if (tenants.status === 'fulfilled') {
        setTenantCount(tenants.value.length);
      } else {
        handleError(tenants.reason, 'tenants');
        setTenantCount(0);
      }

      // Process customers
      if (customers.status === 'fulfilled') {
        setCustomerCount(customers.value.length);
      } else {
        handleError(customers.reason, 'customers');
        setCustomerCount(0);
      }

      // Process offices
      if (offices.status === 'fulfilled') {
        setOfficeCount(offices.value.length);
        setOffices(offices.value);
      } else {
        handleError(offices.reason, 'offices');
        setOfficeCount(0);
        setOffices([]);
      }
    } catch (error: any) {
      // If it's a network error (API not available), only show warning in development
      if (error?.statusCode === undefined && import.meta.env.DEV) {
        console.warn('[Dev] API server not available. Stats will show 0.');
      } else {
        console.error('Error loading stats:', error);
      }
      // For all errors, show 0
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
      console.warn(`Access denied to ${resource}. Showing 0.`);
    } else {
      console.error(`Error loading ${resource}:`, error);
    }
  };

  // Load data for hierarchical tree
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

      // Load users by office in parallel
      const officeUsersMap = new Map<string, UserDto[]>();
      const officeUsersPromises = officesData.map(async (office) => {
        try {
          const officeUsers = await officeService.getOfficeUsers(office.id);
          // Transform users to UserDto format if necessary
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

  // Build hierarchical customer tree with all levels
  const buildCustomerTree = useMemo(() => {
    if (!treeData) return [];

    const { customers, tenants, offices, officeUsersMap } = treeData;

    // Recursive function to build customer tree
    const buildCustomerNode = (customer: CustomerDto) => {
      // Get direct child customers
      const childCustomers = customers.filter(c => c.parentId === customer.id);

      // Get tenants from this specific customer
      const customerTenants = tenants.filter(t => t.customerId === customer.id);

      // Build tenant structure with their offices and users
      const tenantNodes = customerTenants.map(tenant => {
        // Get offices from tenant
        const tenantOffices = offices.filter(o => o.tenantId === tenant.id);

        // Build office structure with their users
        const officeNodes = tenantOffices.map(office => {
          // Get users from office from map
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

    // Get root customers (without parent)
    const rootCustomers = customers.filter(c => !c.parentId || c.parentId === null);

    return rootCustomers.map(buildCustomerNode);
  }, [treeData]);

  // Render tree
  const renderTree = () => {
    if (isLoadingTree) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: tokens.spacingVerticalXL }}>
          <Spinner size="large" label={t('dashboard.loadingHierarchicalStructure')} />
        </div>
      );
    }

    if (!treeData || buildCustomerTree.length === 0) {
      return (
        <div style={{ padding: tokens.spacingVerticalXL, textAlign: 'center' }}>
          <Text>{t('dashboard.noDataAvailable')}</Text>
        </div>
      );
    }

    // Recursive function to render a customer node
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
          {/* Render child customers recursively */}
          {customerNode.children.map((childNode) => renderCustomerNode(childNode, depth + 1))}
          {/* Render customer tenants */}
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
              {/* Tenant offices */}
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
                  {/* Office users */}
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
      <Tree aria-label="Hierarchical structure of customers, tenants, offices and users">
        {buildCustomerTree.map((customerNode, customerIdx) => 
          renderCustomerNode(customerNode, 0)
        )}
      </Tree>
    );
  };

  // Get user name for welcome message
  // Name comes from database and is stored in user state
  const getUserDisplayName = () => {
    // User object now includes database name if available
    const name = user?.name;
    if (name) return name;
    
    // If no name, extract part before @ from email and capitalize it
    const email = user?.email || userDetails?.email;
    if (email) {
      const emailName = email.split('@')[0];
      // Capitalize first letter
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    
    // Last resort
    return 'User';
  };
  
  const userName = getUserDisplayName();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HomeRegular fontSize={32} />
        <h1 className={styles.title}>{t('dashboard.title')}</h1>
        <Button
          appearance="default"
          icon={<ArrowClockwiseRegular />}
          onClick={loadStats}
          disabled={isLoading}
          title={t('dashboard.refresh')}
        >
          {t('dashboard.refresh')}
        </Button>
        <Button
          appearance="default"
          icon={<ArrowClockwiseRegular />}
          onClick={loadTreeData}
          disabled={isLoadingTree}
          title={t('dashboard.refreshTree')}
        >
          {t('dashboard.refreshTree')}
        </Button>
      </div>

      <div className={styles.welcomeMessage}>
        {t('dashboard.welcome', { name: userName })}
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.card}>
          <CardHeader
            header={<Text weight="semibold">{t('dashboard.customers')}</Text>}
            description={t('dashboard.customersDescription')}
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
            header={<Text weight="semibold">{t('dashboard.tenants')}</Text>}
            description={t('dashboard.tenantsDescription')}
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
            header={<Text weight="semibold">{t('dashboard.users')}</Text>}
            description={t('dashboard.usersDescription')}
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
            header={<Text weight="semibold">{t('dashboard.offices')}</Text>}
            description={t('dashboard.officesDescription')}
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
          header={<Text weight="semibold">{t('dashboard.officeMap')}</Text>}
          description={t('dashboard.officeMapDescription')}
        />
        <CardPreview>
          <div style={{ padding: '20px' }}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: tokens.spacingVerticalXL }}>
                <Spinner size="large" label={t('dashboard.loadingMap')} />
              </div>
            ) : offices.length === 0 ? (
              <Text>{t('dashboard.noOfficesAvailable')}</Text>
            ) : (
              <OfficesMap offices={offices} />
            )}
          </div>
        </CardPreview>
      </Card>

      <Card className={styles.treeCard}>
        <CardHeader
          header={<Text weight="semibold">{t('dashboard.hierarchicalStructure')}</Text>}
          description={t('dashboard.hierarchicalStructureDescription')}
        />
        <CardPreview>
          <div className={styles.treeContainer}>
            {renderTree()}
          </div>
        </CardPreview>
      </Card>

      <Card>
        <CardHeader
          header={<Text weight="semibold">{t('dashboard.recentActivity')}</Text>}
          description={t('dashboard.recentActivityDescription')}
        />
        <CardPreview>
          <div style={{ padding: '20px' }}>
            {isLoading ? (
              <DetailsSkeleton rows={5} />
            ) : (
              <Text>{t('dashboard.recentActivityEmpty')}</Text>
            )}
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};

