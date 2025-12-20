import {
  Card,
  CardHeader,
  CardPreview,
  Skeleton,
  SkeletonItem,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  card: {
    height: '100%',
  },
  headerSkeleton: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
  titleSkeleton: {
    width: '60%',
    marginBottom: tokens.spacingVerticalXS,
  },
  descriptionSkeleton: {
    width: '80%',
  },
  previewSkeleton: {
    ...shorthands.padding(tokens.spacingVerticalXL, tokens.spacingHorizontalL),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberSkeleton: {
    width: '80px',
    height: '48px',
  },
});

export const StatsCardSkeleton = () => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <div className={styles.headerSkeleton}>
            <Skeleton className={styles.titleSkeleton}>
              <SkeletonItem size={20} />
            </Skeleton>
            <Skeleton className={styles.descriptionSkeleton}>
              <SkeletonItem size={14} />
            </Skeleton>
          </div>
        }
      />
      <CardPreview>
        <div className={styles.previewSkeleton}>
          <Skeleton className={styles.numberSkeleton}>
            <SkeletonItem size={48} />
          </Skeleton>
        </div>
      </CardPreview>
    </Card>
  );
};

