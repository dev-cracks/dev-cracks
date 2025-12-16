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
import { useAuth } from '../hooks/useAuth';
import { useNotificationContext } from '../contexts/NotificationContext';
import { useSettings } from '../contexts/SettingsContext';
import { UserAccountMenu } from './UserAccountMenu';
import { NotificationPanel } from './NotificationPanel';

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
  logoText: {
    color: 'white',
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
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

export const RibbonBar = ({ onMenuToggle }: RibbonBarProps) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotificationContext();
  const { openSettings } = useSettings();

  return (
    <div className={styles.ribbonBar}>
      {/* Sección del logo */}
      <div className={styles.logoSection}>
        <GridRegular className={styles.logoIcon} />
        <span className={styles.logoText}>Dev Cracks</span>
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
        <NotificationPanel
          trigger={
            <div className={styles.badgeContainer}>
              <Button
                appearance="subtle"
                icon={<AlertRegular />}
                className={styles.actionButton}
                title="Notifications"
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
          }
        />
        <Button
          appearance="subtle"
          icon={<SettingsRegular />}
          className={styles.actionButton}
          title="Settings"
          onClick={openSettings}
        />
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

