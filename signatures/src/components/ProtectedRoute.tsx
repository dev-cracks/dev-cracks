import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { firmaApi } from '../services/firmaApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, getAccessToken, login } = useAuth();
  const location = useLocation();

  // Configurar el proveedor de tokens en el servicio API cuando el componente se monta
  useEffect(() => {
    if (isAuthenticated) {
      firmaApi.setAccessTokenProvider(getAccessToken);
    }
  }, [isAuthenticated, getAccessToken]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Guardar la ruta actual para redirigir después del login
    login(location.pathname);
    return null;
  }

  return <>{children}</>;
}

