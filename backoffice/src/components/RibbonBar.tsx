import {
  Button,
  Input,
  makeStyles,
  tokens,
  Avatar,
  Badge,
} from '@fluentui/react-components';
import {
  GridRegular,
  SearchRegular,
  DocumentRegular,
  CalendarRegular,
  AlertRegular,
  SettingsRegular,
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotificationContext } from '../contexts/NotificationContext';
import { useSettings } from '../contexts/SettingsContext';
import { UserAccountMenu } from './UserAccountMenu';
import { NotificationPanel } from './NotificationPanel';
import { LanguageSelector } from './LanguageSelector';
import { tenantService } from '../services/tenantService';
import { customerParameterService } from '../services/customerService';

const useStyles = makeStyles({
  ribbonBar: {
    height: '48px',
    backgroundColor: '#0078d4', // Azul de Outlook
    display: 'flex',
    alignItems: 'center',
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    gap: tokens.spacingHorizontalM,
    position: 'relative',
    zIndex: 100,
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
  },
  logoIcon: {
    color: 'white',
    fontSize: '20px',
  },
  logoImage: {
    height: '24px',
    width: 'auto',
    objectFit: 'contain',
  },
  logoText: {
    color: 'white',
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  searchSection: {
    flex: 1,
    maxWidth: '600px',
    marginLeft: tokens.spacingHorizontalXL,
    marginRight: tokens.spacingHorizontalXL,
  },
  searchInput: {
    width: '100%',
    backgroundColor: 'white',
    '&::placeholder': {
      color: tokens.colorNeutralForeground3,
    },
  },
  actionsSection: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
    marginLeft: 'auto', // Empuja los iconos hacia la derecha
  },
  actionButton: {
    color: 'white',
    minWidth: 'auto',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  badgeContainer: {
    position: 'relative',
    display: 'inline-flex',
  },
  badge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    zIndex: 1,
  },
  avatarButton: {
    color: 'white',
    minWidth: 'auto',
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalXS,
  },
});

interface RibbonBarProps {
  onMenuToggle?: () => void;
}

const PARAM_KEYS = {
  SITE_NAME: 'SiteName',
  SITE_URL: 'SiteUrl',
  SITE_LOGO: 'SiteLogo',
} as const;

export const RibbonBar = ({ onMenuToggle }: RibbonBarProps) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotificationContext();
  const { openSettings } = useSettings();
  const [siteName, setSiteName] = useState('Dev Cracks');
  const [siteUrl, setSiteUrl] = useState('');
  const [siteLogo, setSiteLogo] = useState('');

  useEffect(() => {
    loadSiteSettings();

    // Escuchar evento personalizado para actualizar el logo inmediatamente (con cada cambio)
    const handleLogoUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ logoUrl: string }>;
      if (customEvent.detail?.logoUrl !== undefined) {
        setSiteLogo(customEvent.detail.logoUrl);
      }
    };

    // Escuchar evento personalizado para recargar configuración cuando se actualiza (guardado completo)
    const handleSettingsUpdate = () => {
      loadSiteSettings();
    };

    window.addEventListener('siteLogoUpdated', handleLogoUpdate);
    window.addEventListener('siteSettingsUpdated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('siteLogoUpdated', handleLogoUpdate);
      window.removeEventListener('siteSettingsUpdated', handleSettingsUpdate);
    };
  }, []);

  const loadSiteSettings = async () => {
    try {
      const tenant = await tenantService.getCurrentTenant();
      if (!tenant?.customerId) {
        return;
      }

      const parameters = await customerParameterService.getByCustomerId(tenant.customerId);
      const paramMap = new Map(parameters.map(p => [p.key, p.value]));
      
      setSiteName(paramMap.get(PARAM_KEYS.SITE_NAME) || 'Dev Cracks');
      setSiteUrl(paramMap.get(PARAM_KEYS.SITE_URL) || '');
      setSiteLogo(paramMap.get(PARAM_KEYS.SITE_LOGO) || '');
    } catch (error) {
      console.error('Error cargando configuración del sitio:', error);
    }
  };


  return (
    <div className={styles.ribbonBar}>
      {/* Sección del logo */}
      <div className={styles.logoSection}>
        {siteLogo ? (
          <img 
            src={siteLogo} 
            alt={siteName}
            className={styles.logoImage}
            onError={(e) => {
              // Si falla la carga de la imagen, mostrar el ícono por defecto
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <GridRegular className={styles.logoIcon} />
        )}
        {siteUrl ? (
          <a 
            href={siteUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.logoText}
          >
            {siteName}
          </a>
        ) : (
          <span className={styles.logoText}>{siteName}</span>
        )}
      </div>

      {/* Barra de búsqueda */}
      <div className={styles.searchSection}>
        <Input
          className={styles.searchInput}
          placeholder="Search"
          contentBefore={<SearchRegular />}
          appearance="filled-darker"
        />
      </div>

      {/* Sección de acciones */}
      <div className={styles.actionsSection}>
        <Button
          appearance="subtle"
          icon={<DocumentRegular />}
          className={styles.actionButton}
          title="New"
        />
        <Button
          appearance="subtle"
          icon={<CalendarRegular />}
          className={styles.actionButton}
          title="Calendar"
        />
        <div className={styles.badgeContainer}>
          <NotificationPanel
            trigger={
              <Button
                appearance="subtle"
                icon={<AlertRegular />}
                className={styles.actionButton}
                title="Notifications"
              />
            }
          />
          {unreadCount > 0 && (
            <Badge
              appearance="filled"
              color="important"
              size="small"
              className={styles.badge}
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </div>
        <Button
          appearance="subtle"
          icon={<SettingsRegular />}
          className={styles.actionButton}
          title="Settings"
          onClick={openSettings}
        />
        <LanguageSelector />
        {user && (
          <UserAccountMenu
            trigger={
              <Button
                appearance="subtle"
                icon={
                  <Avatar
                    name={user.name || user.email}
                    image={user.picture}
                    size={24}
                  />
                }
                className={styles.avatarButton}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

