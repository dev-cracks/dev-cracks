import { useAuth } from './useAuth';

interface UseUserDetailsReturn {
  canAccessBackoffice: boolean;
  canAccessPortal: boolean;
}

export const useUserDetails = (): UseUserDetailsReturn => {
  const { user } = useAuth();

  // Verificar si el usuario tiene permisos para acceder al backoffice
  // Esto se puede hacer verificando roles o permisos en el token de Auth0
  const canAccessBackoffice = (() => {
    if (!user) return false;
    
    // Verificar si el usuario tiene el rol de admin o backoffice
    // Esto depende de cómo esté configurado Auth0
    const userRoles = (user as any).roles || [];
    const userPermissions = (user as any).permissions || [];
    
    return userRoles.includes('admin') || 
           userRoles.includes('backoffice') ||
           userPermissions.includes('access:backoffice');
  })();

  // Todos los usuarios autenticados pueden acceder al portal
  const canAccessPortal = !!user;

  return {
    canAccessBackoffice,
    canAccessPortal
  };
};

