import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Box,
} from '@mui/material';

interface Document {
  id: string;
  name: string;
  status: 'pending' | 'signed' | 'rejected';
  signer: string;
  date: string;
}

interface RecentDocumentsProps {
  documents: Document[];
}

export default function RecentDocuments({ documents }: RecentDocumentsProps) {
  const { t } = useTranslation();
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'signed':
        return t('dashboard.signed');
      case 'pending':
        return t('dashboard.pendingStatus');
      case 'rejected':
        return t('dashboard.rejected');
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {t('dashboard.recentDocuments')}
        </Typography>
        <Box sx={{ overflowX: 'auto', mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('dashboard.document')}</TableCell>
                <TableCell>{t('dashboard.signer')}</TableCell>
                <TableCell>{t('dashboard.date')}</TableCell>
                <TableCell align="right">{t('dashboard.status')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body2" color="text.secondary">
                      {t('dashboard.noRecentDocuments')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => (
                  <TableRow key={doc.id} hover>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell>{doc.signer}</TableCell>
                    <TableCell>{doc.date}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={getStatusLabel(doc.status)}
                        color={getStatusColor(doc.status) as any}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}

