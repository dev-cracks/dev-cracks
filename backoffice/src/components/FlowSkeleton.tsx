import {
  Skeleton,
  SkeletonItem,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: 'calc(100vh - 300px)',
    minHeight: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  node: {
    width: '200px',
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground2,
  },
});

export const FlowSkeleton = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Skeleton>
          <SkeletonItem size={24} />
        </Skeleton>
        <div className={styles.node}>
          <Skeleton>
            <SkeletonItem size={20} />
          </Skeleton>
          <Skeleton>
            <SkeletonItem size={16} />
          </Skeleton>
          <Skeleton>
            <SkeletonItem size={16} />
          </Skeleton>
        </div>
        <Skeleton>
          <SkeletonItem size={24} />
        </Skeleton>
      </div>
    </div>
  );
};

