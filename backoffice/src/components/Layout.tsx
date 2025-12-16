import {
  Body1,
  Button,
  makeStyles,
  tokens,
  Avatar,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Text,
  shorthands,
} from '@fluentui/react-components';
import {
  HomeRegular,
  People,
  Settings,
  PanelLeft,
  SignOut,
  Person,
  Building,
} from '@fluentui/react-icons';
import { useState, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { tenantService, TenantDto } from '../services/tenantService';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100vh',
    width: '100%',
  },
  sidebar: {
    width: '250px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease, transform 0.3s ease',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1000,
    '@media (min-width: 768px)': {
      position: 'relative',
      width: '250px',
    },
  },
  sidebarCollapsed: {
    transform: 'translateX(-100%)',
    '@media (min-width: 768px)': {
      transform: 'translateX(0)',
      width: '60px',
    },
  },
  header: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  headerTitle: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginLeft: '0',
    '@media (min-width: 768px)': {
      marginLeft: '250px',
      transition: 'margin-left 0.3s ease',
    },
  },
  mainContentCollapsed: {
    '@media (min-width: 768px)': {
      marginLeft: '60px',
    },
  },
  topBar: {
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: tokens.spacingVerticalXL,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
    padding: tokens.spacingVerticalM,
    flex: 1,
    overflowY: 'auto',
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalXS),
    marginBottom: tokens.spacingVerticalL,
  },
  navGroupHeader: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  navItem: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    minHeight: '40px',
  },
  navItemSelected: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderLeft: `3px solid ${tokens.colorBrandForeground1}`,
  },
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userDetails, isAdmin, logout, refreshUser } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tenant, setTenant] = useState<TenantDto | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    if (userDetails) {
      loadTenant();
    }
  }, [userDetails]);

  const loadTenant = async () => {
    try {
      const tenantData = await tenantService.getCurrentTenant();
      if (tenantData) {
        setTenant(tenantData);
      } else if (!isInitializing) {
        // Si no tiene tenant, inicializarlo automáticamente
        await initializeTenant();
      }
    } catch (error) {
      console.error('Error loading tenant:', error);
    }
  };

  const initializeTenant = async () => {
    if (isInitializing) return;
    
    try {
      setIsInitializing(true);
      const result = await tenantService.initializeTenant();
      setTenant(result.tenant);
      // Refrescar los detalles del usuario para obtener el nuevo rol
      await refreshUser();
    } catch (error) {
      console.error('Error initializing tenant:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const navigationItems = [
    {
      name: 'Dashboard',
      icon: <HomeRegular />,
      path: '/dashboard',
    },
    ...(isAdmin
      ? [
          {
            name: 'Usuarios',
            icon: <People />,
            path: '/users',
          },
        ]
      : []),
    {
      name: 'Configuración',
      icon: <Settings />,
      path: '/settings',
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.container}>
      {/* Overlay para móviles */}
      {!isSidebarCollapsed && (
        <div
          className={styles.overlay}
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${styles.sidebar} ${
          isSidebarCollapsed ? styles.sidebarCollapsed : ''
        }`}
      >
        <div className={styles.header}>
          {!isSidebarCollapsed && (
            <Body1 className={styles.headerTitle}>Dev Cracks</Body1>
          )}
          <Button
            appearance="subtle"
            icon={<PanelLeft />}
            onClick={toggleSidebar}
          />
        </div>

        <nav className={styles.navList}>
          <div className={styles.navGroup}>
            {!isSidebarCollapsed && (
              <div className={styles.navGroupHeader}>Menú Principal</div>
            )}
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                appearance={location.pathname === item.path ? 'subtle' : 'subtle'}
                icon={item.icon}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarCollapsed(true);
                }}
                className={`${styles.navItem} ${
                  location.pathname === item.path ? styles.navItemSelected : ''
                }`}
                title={isSidebarCollapsed ? item.name : undefined}
              >
                {!isSidebarCollapsed && item.name}
              </Button>
            ))}
          </div>
        </nav>
      </div>

      {/* Contenido principal */}
      <div
        className={`${styles.mainContent} ${
          isSidebarCollapsed ? styles.mainContentCollapsed : ''
        }`}
      >
        <div className={styles.topBar}>
          <Button
            appearance="subtle"
            icon={<PanelLeft />}
            onClick={toggleSidebar}
          />
          <div style={{ flex: 1 }} />
          {tenant && (
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, marginRight: tokens.spacingHorizontalM }}>
              <Text weight="semibold">{tenant.name}</Text>
            </div>
          )}
          {user && (
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button
                  appearance="subtle"
                  icon={
                    <Avatar
                      name={user.name || user.email}
                      image={user.picture}
                      size={24}
                    />
                  }
                >
                  {user.name || user.email}
                </Button>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem
                    icon={<Person />}
                    onClick={() => navigate('/settings')}
                  >
                    Mi Perfil
                  </MenuItem>
                  <MenuItem
                    icon={<SignOut />}
                    onClick={() => logout()}
                  >
                    Cerrar Sesión
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          )}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

