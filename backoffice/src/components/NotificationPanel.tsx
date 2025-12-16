import {
  makeStyles,
  tokens,
  Text,
  MenuPopover,
  Menu,
  MenuTrigger,
  Button,
  Badge,
} from '@fluentui/react-components';
import {
  AlertRegular,
  CheckmarkCircleRegular,
  InfoRegular,
  WarningRegular,
  DismissCircleRegular,
  DismissRegular,
} from '@fluentui/react-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../hooks/useNotifications';
import { useNotificationContext } from '../contexts/NotificationContext';
import { NotificationDrawer } from './NotificationDrawer';

interface NotificationPanelProps {
  trigger: React.ReactElement;
}

const useStyles = makeStyles({
  menuPopover: {
    padding: 0,
    minWidth: '380px',
    maxWidth: '420px',
    maxHeight: '600px',
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  headerActions: {
    display: 'flex',
    gap: tokens.spacingHorizontalXS,
  },
  markAllReadButton: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    textDecoration: 'none',
    cursor: 'pointer',
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    maxHeight: '500px',
  },
  emptyState: {
    padding: tokens.spacingVerticalXXL,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground3,
  },
  emptyStateIcon: {
    fontSize: '48px',
    color: tokens.colorNeutralForeground4,
  },
  emptyStateText: {
    fontSize: tokens.fontSizeBase300,
    textAlign: 'center',
  },
  notificationItem: {
    display: 'flex',
    padding: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: 'pointer',
    position: 'relative',
    gap: tokens.spacingHorizontalM,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    ':last-child': {
      borderBottom: 'none',
    },
  },
  notificationItemUnread: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  notificationIcon: {
    flexShrink: 0,
    marginTop: tokens.spacingVerticalXXS,
  },
  notificationContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
  },
  notificationTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  notificationMessage: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  notificationTime: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXXS,
  },
  notificationActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    alignItems: 'flex-end',
  },
  dismissButton: {
    minWidth: 'auto',
    padding: tokens.spacingHorizontalXXS,
    color: tokens.colorNeutralForeground3,
    ':hover': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  unreadIndicator: {
    position: 'absolute',
    left: tokens.spacingHorizontalS,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: tokens.colorBrandForeground1,
  },
  footer: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    justifyContent: 'center',
  },
  viewAllButton: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
});

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return <CheckmarkCircleRegular style={{ color: tokens.colorPaletteGreenForeground1 }} />;
    case 'warning':
      return <WarningRegular style={{ color: tokens.colorPaletteYellowForeground1 }} />;
    case 'error':
      return <DismissCircleRegular style={{ color: tokens.colorPaletteRedForeground1 }} />;
    case 'info':
    default:
      return <InfoRegular style={{ color: tokens.colorBrandForeground1 }} />;
  }
};

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Hace unos momentos';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} ${diffInMinutes === 1 ? 'minuto' : 'minutos'}`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `Hace ${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `Hace ${diffInDays} ${diffInDays === 1 ? 'día' : 'días'}`;
  }

  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
};

export const NotificationPanel = ({ trigger }: NotificationPanelProps) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotificationContext();

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  const handleDismiss = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    removeNotification(notificationId);
  };

  return (
    <>
      <Menu>
        <MenuTrigger disableButtonEnhancement>{trigger}</MenuTrigger>
        <MenuPopover className={styles.menuPopover}>
          {/* Header */}
          <div className={styles.header}>
            <Text className={styles.headerTitle}>Notificaciones</Text>
            {unreadCount > 0 && (
              <div className={styles.headerActions}>
                <a
                  className={styles.markAllReadButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    markAllAsRead();
                  }}
                >
                  Marcar todas como leídas
                </a>
              </div>
            )}
          </div>

          {/* Lista de notificaciones */}
          <div className={styles.notificationsList}>
            {notifications.length === 0 ? (
              <div className={styles.emptyState}>
                <AlertRegular className={styles.emptyStateIcon} />
                <Text className={styles.emptyStateText}>
                  No hay notificaciones
                </Text>
              </div>
            ) : (
              notifications.map((notification: Notification) => (
                <div
                  key={notification.id}
                  className={`${styles.notificationItem} ${
                    !notification.read ? styles.notificationItemUnread : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  {!notification.read && (
                    <div className={styles.unreadIndicator} />
                  )}
                  <div className={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className={styles.notificationContent}>
                    <Text className={styles.notificationTitle}>
                      {notification.title}
                    </Text>
                    <Text className={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    <Text className={styles.notificationTime}>
                      {formatTimeAgo(notification.timestamp)}
                    </Text>
                  </div>
                  <div className={styles.notificationActions}>
                    <Button
                      appearance="subtle"
                      icon={<DismissRegular />}
                      className={styles.dismissButton}
                      onClick={(e) => handleDismiss(e, notification.id)}
                      title="Descartar"
                    />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className={styles.footer}>
              <a
                className={styles.viewAllButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDrawerOpen(true);
                }}
              >
                Ver todas las notificaciones
              </a>
            </div>
          )}
        </MenuPopover>
      </Menu>
      <NotificationDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen} 
      />
    </>
  );
};

