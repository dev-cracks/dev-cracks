import {
  Skeleton,
  SkeletonItem,
  makeStyles,
  shorthands,
  tokens,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableHeaderCell,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  skeletonRow: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
});

interface TableSkeletonProps {
  rows?: number;
  columns: number;
  showHeader?: boolean;
}

export const TableSkeleton = ({ rows = 5, columns, showHeader = true }: TableSkeletonProps) => {
  const styles = useStyles();

  return (
    <Table>
      {showHeader && (
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }).map((_, index) => (
              <TableHeaderCell key={index}>
                <Skeleton>
                  <SkeletonItem size={16} />
                </Skeleton>
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <TableCell key={colIndex} className={styles.skeletonRow}>
                <Skeleton>
                  <SkeletonItem size={16} />
                </Skeleton>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

