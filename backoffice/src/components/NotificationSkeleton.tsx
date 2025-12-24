import {
  Skeleton,
  SkeletonItem,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: tokens.spacingVerticalM,
  },
  notificationItem: {
    display: 'flex',
    padding: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    gap: tokens.spacingHorizontalM,
    ':last-child': {
      borderBottom: 'none',
    },
  },
  icon: {
    flexShrink: 0,
    width: '24px',
    height: '24px',
    marginTop: tokens.spacingVerticalXXS,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
  },
  title: {
    width: '60%',
    height: '16px',
  },
  message: {
    width: '100%',
    height: '14px',
  },
  time: {
    width: '40%',
    height: '12px',
    marginTop: tokens.spacingVerticalXXS,
  },
  dismissButton: {
    flexShrink: 0,
    width: '24px',
    height: '24px',
  },
});

interface NotificationSkeletonProps {
  count?: number;
}

export const NotificationSkeleton = ({ count = 5 }: NotificationSkeletonProps) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.notificationItem}>
          <Skeleton className={styles.icon}>
            <SkeletonItem size={24} shape="circle" />
          </Skeleton>
          <div className={styles.content}>
            <Skeleton className={styles.title}>
              <SkeletonItem size={16} />
            </Skeleton>
            <Skeleton className={styles.message}>
              <SkeletonItem size={14} />
            </Skeleton>
            <Skeleton className={styles.time}>
              <SkeletonItem size={12} />
            </Skeleton>
          </div>
          <Skeleton className={styles.dismissButton}>
            <SkeletonItem size={24} shape="circle" />
          </Skeleton>
        </div>
      ))}
    </div>
  );
};






