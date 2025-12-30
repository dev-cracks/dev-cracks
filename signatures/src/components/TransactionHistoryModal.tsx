import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { firmaApi } from '../services/firmaApi';

interface HistoryItem {
  id: string;
  status: string;
  eventType: string;
  createdAt: string;
  changedFields?: Record<string, any>;
  metadata?: Record<string, any>;
  changedByUserId?: string;
}

interface TransactionHistoryModalProps {
  open: boolean;
  onClose: () => void;
  signingRequestId: string;
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

export default function TransactionHistoryModal({
  open,
  onClose,
  signingRequestId,
}: TransactionHistoryModalProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && signingRequestId) {
      loadHistory();
    }
  }, [open, signingRequestId]);

  const loadHistory = async () => {
    if (!signingRequestId) return;

    setLoading(true);
    setError(null);
    try {
      const data = await firmaApi.getSigningRequestHistory(signingRequestId);
      setHistory(data);
    } catch (err: any) {
      setError(`Error al cargar historial: ${err.message}`);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Historial de Solicitud de Firma</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : history.length === 0 ? (
          <Typography>No hay historial disponible</Typography>
        ) : (
          <Box>
            {history.map((item, index) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 0.5 }}>
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: 16,
                        color: (theme) => {
                          const colorMap: Record<string, string> = {
                            Draft: theme.palette.grey[500],
                            Sent: theme.palette.primary.main,
                            Completed: theme.palette.success.main,
                            Declined: theme.palette.error.main,
                            Expired: theme.palette.warning.main,
                            Viewed: theme.palette.info.main,
                            Signed: theme.palette.info.main,
                          };
                          return colorMap[item.status] || theme.palette.grey[500];
                        },
                      }}
                    />
                    {index < history.length - 1 && (
                      <Box
                        sx={{
                          width: 2,
                          flex: 1,
                          bgcolor: 'divider',
                          minHeight: 40,
                          my: 0.5,
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                          <Chip
                            label={item.status}
                            color={statusColors[item.status] || 'default'}
                            size="small"
                          />
                          <Typography variant="body2" color="text.secondary">
                            {item.eventType}
                          </Typography>
                          <Typography variant="caption" sx={{ ml: 'auto' }}>
                            {new Date(item.createdAt).toLocaleString()}
                          </Typography>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        {item.changedFields && Object.keys(item.changedFields).length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                              Campos Modificados:
                            </Typography>
                            <Box component="pre" sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1, fontSize: '0.875rem' }}>
                              {JSON.stringify(item.changedFields, null, 2)}
                            </Box>
                          </Box>
                        )}
                        {item.metadata && Object.keys(item.metadata).length > 0 && (
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Metadata:
                            </Typography>
                            <Box component="pre" sx={{ bgcolor: 'grey.100', p: 1, borderRadius: 1, fontSize: '0.875rem' }}>
                              {JSON.stringify(item.metadata, null, 2)}
                            </Box>
                          </Box>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </Box>
                {index < history.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

