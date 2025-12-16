import { useCallback, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { mapAuth0User, User, UserDto } from '../services/authService';
import { apiService } from '../services/apiService';
import { auth0Config, apiBaseUrl } from '../config/env';

interface UseAuthReturn {
  user: User | null;
  userDetails: UserDto | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  getAccessToken: () => Promise<string | undefined>;
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
    logout: auth0Logout,
    getAccessTokenSilently
  } = useAuth0();

  const [userDetails, setUserDetails] = useState<UserDto | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const user = mapAuth0User(auth0User);

  const getAccessToken = useCallback(async (): Promise<string | undefined> => {
    if (!isAuthenticated) {
      return undefined;
    }
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: auth0Config.authorizationParams.audience
        }
      });
      return token;
    } catch (error) {
      console.error('[useAuth] Error getting access token:', error);
      return undefined;
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  // Configurar el provider de token para apiService
  useEffect(() => {
    apiService.setAccessTokenProvider(getAccessToken);
  }, [getAccessToken]);

  const loadUserDetails = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoadingDetails(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        setIsLoadingDetails(false);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

      try {
        const response = await fetch(`${apiBaseUrl}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data: UserDto = await response.json();
          setUserDetails(data);
        } else if (response.status === 401 || response.status === 403) {
          // Si no está autorizado, limpiar detalles del usuario
          setUserDetails(null);
        }
      } catch (error: any) {
        clearTimeout(timeoutId);
        // Ignorar errores de abort (solicitud cancelada) y errores de red
        if (error.name !== 'AbortError' && error.name !== 'TypeError') {
          console.error('Error loading user details:', error);
        } else if (error.name === 'TypeError' && import.meta.env.DEV) {
          // En desarrollo, solo mostrar un warning silencioso si la API no está disponible
          console.warn('[Dev] API server not available. User details will not be loaded.');
        }
      }
    } catch (error) {
      console.error('Error getting access token:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  }, [isAuthenticated, getAccessToken]);

  // Cargar detalles del usuario cuando se autentica
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserDetails();
    } else {
      setUserDetails(null);
    }
  }, [isAuthenticated, user?.id, loadUserDetails]);


  const login = useCallback((returnUrl?: string) => {
    // Asegurar que el returnUrl incluya el base path si no lo tiene
    const basePath = '/backoffice';
    let finalReturnUrl = returnUrl || window.location.pathname;
    
    // Si el returnUrl no empieza con el base path, agregarlo
    if (finalReturnUrl && !finalReturnUrl.startsWith(basePath)) {
      // Si es una ruta relativa, agregar el base path
      if (finalReturnUrl.startsWith('/')) {
        finalReturnUrl = `${basePath}${finalReturnUrl}`;
      } else {
        finalReturnUrl = `${basePath}/${finalReturnUrl}`;
      }
    }
    
    loginWithRedirect({
      appState: {
        returnTo: finalReturnUrl
      }
    });
  }, [loginWithRedirect]);

  const logout = useCallback(async () => {
    await auth0Logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }, [auth0Logout]);

  const refreshUser = useCallback(async () => {
    await loadUserDetails();
  }, [loadUserDetails]);

  // TODO: WORKAROUND - Hardcodeado para testing. Revertir después del testing
  // const isAdmin = userDetails?.role === 'Admin';
  const isAdmin = isAuthenticated; // Todos los usuarios autenticados son Admin temporalmente

  return {
    user,
    userDetails,
    isLoading: isLoading || isLoadingDetails,
    isAuthenticated,
    isAdmin,
    getAccessToken,
    login,
    logout,
    refreshUser
  };
};

