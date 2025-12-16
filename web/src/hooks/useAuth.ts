import { useCallback, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { mapAuth0User, User } from '../services/authService';
import { cacheUserImage, clearUserImageCache } from '../services/imageCache';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (returnUrl?: string) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const {
    user: auth0User,
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    logout: auth0Logout
  } = useAuth0();

  const user = mapAuth0User(auth0User);

  // Cachear la imagen del usuario cuando se autentica
  useEffect(() => {
    if (user && user.picture && user.id) {
      // Esperar un momento para asegurar que la sesión esté establecida
      const timeoutId = setTimeout(() => {
        // Cachear la imagen en segundo plano sin bloquear la UI
        cacheUserImage(user.id, user.picture).catch((error) => {
          // Silenciar el error, solo loguear en desarrollo
          if (process.env.NODE_ENV === 'development') {
            console.warn('Error al cachear imagen del usuario:', error);
          }
        });
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [user?.id, user?.picture]);

  const login = useCallback((returnUrl?: string) => {
    loginWithRedirect({
      appState: {
        returnTo: returnUrl || window.location.pathname
      }
    });
  }, [loginWithRedirect]);

  const logout = useCallback(async () => {
    // Limpiar el cache de imagen antes de cerrar sesión
    if (user?.id) {
      clearUserImageCache(user.id);
    }
    
    await auth0Logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }, [auth0Logout, user?.id]);

  const refreshUser = useCallback(async () => {
    // Auth0 automatically refreshes the user, no action needed
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    refreshUser
  };
};

