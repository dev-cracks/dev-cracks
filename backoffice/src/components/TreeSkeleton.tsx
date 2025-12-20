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
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.padding(tokens.spacingVerticalS, 0),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  expandColumn: {
    width: '32px',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '60px 180px 160px 120px 120px 130px 180px 110px 70px 70px 80px 100px',
    alignItems: 'center',
    width: '100%',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  cell: {
    ...shorthands.padding(0, tokens.spacingHorizontalS),
  },
});

interface TreeSkeletonProps {
  rows?: number;
}

export const TreeSkeleton = ({ rows = 5 }: TreeSkeletonProps) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.expandColumn}>
            <Skeleton>
              <SkeletonItem size={16} shape="circle" />
            </Skeleton>
          </div>
          <div className={styles.content}>
            {Array.from({ length: 12 }).map((_, colIndex) => (
              <div key={colIndex} className={styles.cell}>
                <Skeleton>
                  <SkeletonItem size={16} />
                </Skeleton>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

