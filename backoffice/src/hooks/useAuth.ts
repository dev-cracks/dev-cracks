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

  // Configurar el provider de token para apiService
  useEffect(() => {
    apiService.setAccessTokenProvider(getAccessToken);
  }, []);

  // Cargar detalles del usuario cuando se autentica
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserDetails();
    } else {
      setUserDetails(null);
    }
  }, [isAuthenticated, user?.id]);

  const loadUserDetails = async () => {
    if (!isAuthenticated) return;
    
    setIsLoadingDetails(true);
    try {
      const token = await getAccessToken();
      if (!token) return;

      const response = await fetch(`${apiBaseUrl}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data: UserDto = await response.json();
        setUserDetails(data);
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

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
  }, []);

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

