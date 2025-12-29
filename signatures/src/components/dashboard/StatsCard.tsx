import { Card, CardContent, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

export default function StatsCard({ title, value, icon, color, change }: StatsCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            {change && (
              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  color: change.isPositive ? 'success.main' : 'error.main',
                }}
              >
                {change.isPositive ? '+' : ''}
                {change.value}% desde el mes pasado
              </Typography>
            )}
          </Box>
          {icon && (
            <Box
              sx={{
                color: color || 'primary.main',
                opacity: 0.8,
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

