import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { firmaApi } from '../services/firmaApi';
import { useAuth } from '../hooks/useAuth';
import TransactionHistoryModal from '../components/TransactionHistoryModal';

interface Transaction {
  id: string;
  firmaSigningRequestId: string;
  status: string;
  eventType: string;
  createdAt: string;
  changedFields?: Record<string, any>;
  metadata?: Record<string, any>;
}

const statusColors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'error'> = {
  Draft: 'default',
  Sent: 'primary',
  Completed: 'success',
  Declined: 'error',
  Expired: 'warning',
  Viewed: 'info',
  Signed: 'info',
};

export default function Transactions() {
  const { t } = useTranslation();
  const { isAuthenticated, getAccessToken } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && getAccessToken) {
      firmaApi.setAccessTokenProvider(getAccessToken);
      loadTransactions();
    }
  }, [isAuthenticated, getAccessToken, page, rowsPerPage, searchTerm, statusFilter, fromDate, toDate]);

  const loadTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await firmaApi.listTransactions({
        search: searchTerm || undefined,
        status: statusFilter || undefined,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
        page: page + 1,
        pageSize: rowsPerPage,
      });
      setTransactions(result.items);
      setTotalCount(result.totalCount);
    } catch (err: any) {
      setError(`${t('transactions.loadError')}: ${err.message}`);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    loadTransactions();
  };

  const handleExportToExcel = async () => {
    setExporting(true);
    setError(null);
    try {
      // Obtener todas las transacciones iterando todas las páginas
      const allTransactions: Transaction[] = [];
      let currentPage = 1;
      let hasMore = true;

      while (hasMore) {
        const result = await firmaApi.listTransactions({
          search: searchTerm || undefined,
          status: statusFilter || undefined,
          fromDate: fromDate || undefined,
          toDate: toDate || undefined,
          page: currentPage,
          pageSize: 1000, // Obtener muchas por página
        });

        allTransactions.push(...result.items);

        if (result.items.length < result.pageSize || currentPage >= result.totalPages) {
          hasMore = false;
        } else {
          currentPage++;
        }
      }

      // Convertir a CSV
      const headers = [
        t('transactions.csvHeaders.id'),
        t('transactions.csvHeaders.firmaSigningRequestId'),
        t('transactions.csvHeaders.status'),
        t('transactions.csvHeaders.eventType'),
        t('transactions.csvHeaders.date'),
        t('transactions.csvHeaders.changedFields'),
        t('transactions.csvHeaders.metadata')
      ];
      const rows = allTransactions.map(t => [
        t.id,
        t.firmaSigningRequestId,
        t.status,
        t.eventType,
        new Date(t.createdAt).toLocaleString(),
        JSON.stringify(t.changedFields || {}),
        JSON.stringify(t.metadata || {}),
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      // Descargar archivo
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `transacciones_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err: any) {
      setError(`${t('transactions.exportError')}: ${err.message}`);
    } finally {
      setExporting(false);
    }
  };

  const handleViewHistory = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setHistoryModalOpen(true);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('transactions.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t('transactions.subtitle')}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
          <TextField
            label={t('transactions.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            size="small"
            sx={{ minWidth: 200 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>{t('transactions.status')}</InputLabel>
            <Select
              value={statusFilter}
              label={t('transactions.status')}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">{t('transactions.all')}</MenuItem>
              <MenuItem value="Draft">{t('transactions.draft')}</MenuItem>
              <MenuItem value="Sent">{t('transactions.sent')}</MenuItem>
              <MenuItem value="Completed">{t('transactions.completed')}</MenuItem>
              <MenuItem value="Declined">{t('transactions.declined')}</MenuItem>
              <MenuItem value="Expired">{t('transactions.expired')}</MenuItem>
              <MenuItem value="Viewed">{t('transactions.viewed')}</MenuItem>
              <MenuItem value="Signed">{t('transactions.signed')}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label={t('transactions.from')}
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label={t('transactions.to')}
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={handleSearch} disabled={loading}>
            {t('transactions.search')}
          </Button>
          <Button
            variant="outlined"
            startIcon={exporting ? <CircularProgress size={20} /> : <FileDownloadIcon />}
            onClick={handleExportToExcel}
            disabled={exporting || loading}
          >
            {t('transactions.exportExcel')}
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('transactions.id')}</TableCell>
                <TableCell>{t('transactions.firmaSigningRequestId')}</TableCell>
                <TableCell>{t('transactions.status')}</TableCell>
                <TableCell>{t('transactions.eventType')}</TableCell>
                <TableCell>{t('transactions.date')}</TableCell>
                <TableCell align="right">{t('transactions.actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {t('transactions.noTransactions')}
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id.substring(0, 8)}...</TableCell>
                    <TableCell>{transaction.firmaSigningRequestId}</TableCell>
                    <TableCell>
                      <Chip
                        label={transaction.status}
                        color={statusColors[transaction.status] || 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{transaction.eventType}</TableCell>
                    <TableCell>{new Date(transaction.createdAt).toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleViewHistory(transaction)}
                        color="primary"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Paper>

      <TransactionHistoryModal
        open={historyModalOpen}
        onClose={() => {
          setHistoryModalOpen(false);
          setSelectedTransaction(null);
        }}
        signingRequestId={selectedTransaction?.firmaSigningRequestId || ''}
      />
    </Box>
  );
}

