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

  // Si está cargando, mostrar spinner
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner size="large" />
      </div>
    );
  }

  // Redirigir a login si no está autenticado (evitar loop verificando que no estemos ya en /login)
  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Si requiere admin y no es admin, redirigir a dashboard
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

