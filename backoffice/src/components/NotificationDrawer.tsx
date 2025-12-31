import {
  Button,
  makeStyles,
  tokens,
  Text,
} from '@fluentui/react-components';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerHeaderNavigation,
} from '@fluentui/react-drawer';
import {
  DismissRegular,
  DismissCircleRegular,
  CheckmarkCircleRegular,
  WarningRegular,
  InfoRegular,
} from '@fluentui/react-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Notification } from '../hooks/useNotifications';
import { useNotificationContext } from '../contexts/NotificationContext';
import { NotificationSkeleton } from './NotificationSkeleton';

interface NotificationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const useStyles = makeStyles({
  drawerBody: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    flex: 1,
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

const formatTimeAgo = (date: Date, t: any): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return t('notifications.timeAgo.justNow');
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return t('notifications.timeAgo.minutesAgo', { count: diffInMinutes });
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return t('notifications.timeAgo.hoursAgo', { count: diffInHours });
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return t('notifications.timeAgo.daysAgo', { count: diffInDays });
  }

  return date.toLocaleDateString(t('common.locale') || 'en-US', {
    day: 'numeric',
    month: 'short',
  });
};

export const NotificationDrawer = ({ open, onOpenChange }: NotificationDrawerProps) => {
  const styles = useStyles();
  const { t } = useTranslation('backoffice');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    notifications,
    markAsRead,
    removeNotification,
  } = useNotificationContext();

  // Simular carga cuando se abre el drawer
  useEffect(() => {
    if (open) {
      setIsLoading(true);
      // Simular una carga rápida para mejorar la experiencia
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [open]);

  const handleNotificationClick = (notification: Notification) => {
    // Marcar como leída si no lo está
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Cerrar el drawer
    onOpenChange(false);
    
    // Navegar a la URL de acción si existe, o al dashboard por defecto
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    } else {
      // Si no hay actionUrl, navegar al dashboard
      navigate('/dashboard');
    }
  };

  const handleDismiss = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    removeNotification(notificationId);
  };

  return (
    <Drawer
      type="overlay"
      position="end"
      open={open}
      onOpenChange={(_, { open }) => onOpenChange(open)}
      size="medium"
    >
      <DrawerHeader>
        <DrawerHeaderNavigation>
          <Button
            appearance="subtle"
            aria-label={t('notifications.close')}
            icon={<DismissRegular />}
            onClick={() => onOpenChange(false)}
          />
        </DrawerHeaderNavigation>
        <DrawerHeaderTitle>{t('notifications.allNotifications')}</DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.drawerBody}>
        <div className={styles.notificationsList}>
          {isLoading ? (
            <NotificationSkeleton count={5} />
          ) : notifications.length === 0 ? (
            <div className={styles.emptyState}>
              <Text className={styles.emptyStateText}>
                {t('notifications.noNotifications')}
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
                      {formatTimeAgo(notification.timestamp, t)}
                    </Text>
                  </div>
                  <Button
                    appearance="subtle"
                    icon={<DismissRegular />}
                    className={styles.dismissButton}
                    onClick={(e) => handleDismiss(e, notification.id)}
                    title={t('notifications.dismiss')}
                  />
                </div>
              ))
            )}
        </div>
      </DrawerBody>
    </Drawer>
  );
};

