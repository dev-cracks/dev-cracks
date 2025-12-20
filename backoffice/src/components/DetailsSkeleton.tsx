import {
  Skeleton,
  SkeletonItem,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalS),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  label: {
    width: '40%',
  },
  value: {
    width: '55%',
  },
});

interface DetailsSkeletonProps {
  rows?: number;
}

export const DetailsSkeleton = ({ rows = 8 }: DetailsSkeletonProps) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className={styles.row}>
          <Skeleton className={styles.label}>
            <SkeletonItem size={16} />
          </Skeleton>
          <Skeleton className={styles.value}>
            <SkeletonItem size={16} />
          </Skeleton>
        </div>
      ))}
    </div>
  );
};

