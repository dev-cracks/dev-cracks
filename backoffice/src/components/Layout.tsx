import {
  Body1,
  Button,
  makeStyles,
  tokens,
  Text,
  shorthands,
  mergeClasses,
} from '@fluentui/react-components';
import {
  HomeRegular,
  PeopleRegular,
  SettingsRegular,
  PanelLeftRegular,
  BuildingRegular,
  LocationRegular,
  BriefcaseRegular,
  BoxArrowUpRegular,
} from '@fluentui/react-icons';
import { useState, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { tenantService, TenantDto } from '../services/tenantService';
import { RibbonBar } from './RibbonBar';
import { SettingsDialog } from './SettingsDialog';
import { Jarvis } from './Jarvis';
import { useSettings } from '../contexts/SettingsContext';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
  },
  ribbonContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  bodyContainer: {
    display: 'flex',
    flex: 1,
    marginTop: '48px', // Altura de RibbonBar (48px)
    overflow: 'hidden',
    gap: 0, // Sin espacio entre sidebar y contenido
  },
  sidebar: {
    width: '250px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    flexDirection: 'column',
    transition: 'width 0.3s ease, transform 0.3s ease',
    flexShrink: 0,
    position: 'fixed',
    left: 0,
    top: '48px', // Debajo de RibbonBar (48px)
    bottom: 0,
    zIndex: 900,
    boxSizing: 'border-box', // Incluye el border en el ancho
    '@media (min-width: 768px)': {
      position: 'relative',
      top: 0,
      width: '250px',
      flexShrink: 0, // No se encoge, mantiene su ancho
    },
  },
  sidebarCollapsed: {
    transform: 'translateX(-100%)',
    '@media (min-width: 768px)': {
      transform: 'translateX(0)',
      width: '64px', // Ancho suficiente para iconos completos
      minWidth: '64px', // Asegura que no sea menor
      maxWidth: '64px', // Asegura que no sea mayor
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
    minWidth: 0, // Permite que se ajuste cuando está colapsado
  },
  headerCollapsed: {
    justifyContent: 'center',
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalXS,
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
    minWidth: 0, // Permite que el contenido se ajuste correctamente
    marginLeft: '250px', // Para móviles cuando el sidebar está fijo
    transition: 'margin-left 0.3s ease',
    '@media (min-width: 768px)': {
      marginLeft: '0', // En desktop no necesita margin porque el sidebar es relative
      width: 'auto', // Ancho automático para que se ajuste al flex
    },
  },
  mainContentCollapsed: {
    marginLeft: '0',
    '@media (min-width: 768px)': {
      marginLeft: '0', // No necesita margin porque el sidebar colapsado es relative y ya ocupa su espacio
    },
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: tokens.spacingVerticalXL,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  overlay: {
    position: 'fixed',
    top: '48px', // Debajo de RibbonBar (48px)
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
  navListCollapsed: {
    padding: tokens.spacingVerticalS,
    alignItems: 'center',
    width: '100%', // Asegura que ocupe todo el ancho del sidebar colapsado
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
    minWidth: 0, // Permite que se ajuste cuando está colapsado
  },
  navItemCollapsed: {
    justifyContent: 'center',
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalXS,
    minWidth: '64px', // Ancho mínimo cuando está colapsado
    width: '64px', // Ancho fijo para centrar iconos
  },
  navItemSelected: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderLeft: `3px solid ${tokens.colorBrandForeground1}`,
  },
  navItemSelectedCollapsed: {
    borderLeft: 'none',
    borderTop: `3px solid ${tokens.colorBrandForeground1}`,
  },
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('backoffice');
  const { user, userDetails, isAdmin, logout, refreshUser } = useAuth();
  const { isOpen: isSettingsOpen, closeSettings } = useSettings();
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
    } catch (error: any) {
      // Si es un 404 (usuario sin tenant), es esperado y se inicializará automáticamente
      // No loguear este error ya que es parte del flujo normal
      if (error?.statusCode !== 404 && error?.statusCode !== undefined) {
        console.error('Error loading tenant:', error);
      }
      // Si no tiene tenant y no estamos inicializando, intentar inicializar
      if (!isInitializing && (error?.statusCode === 404 || !error?.statusCode)) {
        await initializeTenant();
      }
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
      name: t('layout.dashboard'),
      icon: <HomeRegular />,
      path: '/dashboard',
    },
    {
      name: t('layout.customers'),
      icon: <BuildingRegular />,
      path: '/customers',
    },
    {
      name: t('layout.tenants'),
      icon: <BriefcaseRegular />,
      path: '/tenants',
    },
    {
      name: t('layout.offices'),
      icon: <LocationRegular />,
      path: '/offices',
    },
    {
      name: t('layout.shipments'),
      icon: <BoxArrowUpRegular />,
      path: '/shipments',
    },
    {
      name: t('layout.users'),
      icon: <PeopleRegular />,
      path: '/users',
    },
    {
      name: t('layout.settings'),
      icon: <SettingsRegular />,
      path: '/settings',
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.container}>
      {/* Cinta estilo Outlook - Arriba ocupando 100% del ancho */}
      <div className={styles.ribbonContainer}>
        <RibbonBar onMenuToggle={toggleSidebar} />
      </div>

      {/* Contenedor del cuerpo: Sidebar + Contenido */}
      <div className={styles.bodyContainer}>
        {/* Overlay para móviles */}
        {!isSidebarCollapsed && (
          <div
            className={styles.overlay}
            onClick={() => setIsSidebarCollapsed(true)}
          />
        )}

        {/* Sidebar */}
        <div
          className={mergeClasses(
            styles.sidebar,
            isSidebarCollapsed && styles.sidebarCollapsed
          )}
        >
          <div className={mergeClasses(
            styles.header,
            isSidebarCollapsed && styles.headerCollapsed
          )}>
            {!isSidebarCollapsed && (
              <Body1 className={styles.headerTitle}>{t('layout.mainMenu')}</Body1>
            )}
            <Button
              appearance="subtle"
              icon={<PanelLeftRegular />}
              onClick={toggleSidebar}
            />
          </div>

          <nav className={mergeClasses(
            styles.navList,
            isSidebarCollapsed && styles.navListCollapsed
          )}>
            <div className={styles.navGroup}>
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  appearance={location.pathname === item.path ? 'subtle' : 'subtle'}
                  icon={item.icon}
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarCollapsed(true);
                  }}
                  className={mergeClasses(
                    styles.navItem,
                    isSidebarCollapsed && styles.navItemCollapsed,
                    location.pathname === item.path && styles.navItemSelected,
                    location.pathname === item.path && isSidebarCollapsed && styles.navItemSelectedCollapsed
                  )}
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
          className={mergeClasses(
            styles.mainContent,
            isSidebarCollapsed && styles.mainContentCollapsed
          )}
        >
          <div className={styles.content}>{children}</div>
        </div>
      </div>
      <SettingsDialog open={isSettingsOpen} onOpenChange={(open: boolean) => (!open && closeSettings())} />
      <Jarvis />
    </div>
  );
};

