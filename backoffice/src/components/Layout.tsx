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
} from '@fluentui/react-components';
import {
  Navigation,
  NavigationList,
  NavigationItem,
  NavigationGroup,
  NavigationGroupHeader,
} from '@fluentui/react-components';
import {
  Home24Regular,
  People24Regular,
  Settings24Regular,
  PanelLeft24Regular,
  SignOut24Regular,
  Person24Regular,
  Building24Regular,
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
      icon: <Home24Regular />,
      path: '/dashboard',
    },
    ...(isAdmin
      ? [
          {
            name: 'Usuarios',
            icon: <People24Regular />,
            path: '/users',
          },
        ]
      : []),
    {
      name: 'Configuración',
      icon: <Settings24Regular />,
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
            icon={<PanelLeft24Regular />}
            onClick={toggleSidebar}
          />
        </div>

        <Navigation>
          <NavigationList>
            <NavigationGroup>
              <NavigationGroupHeader>Menú Principal</NavigationGroupHeader>
              {navigationItems.map((item) => (
                <NavigationItem
                  key={item.path}
                  icon={item.icon}
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarCollapsed(true);
                  }}
                  value={item.path}
                  selected={location.pathname === item.path}
                >
                  {!isSidebarCollapsed && item.name}
                </NavigationItem>
              ))}
            </NavigationGroup>
          </NavigationList>
        </Navigation>
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
            icon={<PanelLeft24Regular />}
            onClick={toggleSidebar}
          />
          <div style={{ flex: 1 }} />
          {tenant && (
            <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS, marginRight: tokens.spacingHorizontalM }}>
              <Building24Regular />
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
                    icon={<Person24Regular />}
                    onClick={() => navigate('/settings')}
                  >
                    Mi Perfil
                  </MenuItem>
                  <MenuItem
                    icon={<SignOut24Regular />}
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

