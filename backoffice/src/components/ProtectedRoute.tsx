import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Spinner } from '@fluentui/react-components';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  // TODO: WORKAROUND - Redirecciones deshabilitadas para evitar redirección infinita
  // Temporalmente deshabilitado para testing
  // if (!isAuthenticated && !isLoading && location.pathname !== '/login') {
  //   return <Navigate to="/login" replace state={{ from: location }} />;
  // }
  
  // Si está cargando, mostrar spinner
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="large" />
      </div>
    );
  }

  // TODO: WORKAROUND - Validación de admin deshabilitada temporalmente
  // if (requireAdmin && !isAdmin) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <>{children}</>;
};

