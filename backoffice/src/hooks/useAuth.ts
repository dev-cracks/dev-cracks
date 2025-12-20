import { useCallback, useEffect, useState, useRef } from 'react';
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
  const isRedirectingRef = useRef(false);

  const user = mapAuth0User(auth0User);

  const getAccessToken = useCallback(async (): Promise<string | undefined> => {
    if (!isAuthenticated) {
      return undefined;
    }
    
    // Evitar múltiples redirecciones simultáneas
    if (isRedirectingRef.current) {
      return undefined;
    }
    
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: auth0Config.authorizationParams.audience,
          scope: auth0Config.authorizationParams.scope
        }
      });
      return token;
    } catch (error: any) {
      // Detectar si el error es por falta de refresh token
      // El error puede venir en diferentes formatos de Auth0
      const errorMessage = 
        error?.message || 
        error?.error_description || 
        error?.name ||
        error?.toString() || 
        String(error);
      const errorCode = error?.error || error?.code;
      const errorStack = error?.stack || '';
      
      // Intentar serializar el error de forma segura
      let errorString = errorMessage + ' ' + String(error) + ' ' + errorStack;
      try {
        errorString += ' ' + JSON.stringify(error);
      } catch {
        // Si JSON.stringify falla, continuar sin él
      }
      
      const errorStringLower = errorString.toLowerCase();
      
      // Verificar múltiples formas del error de refresh token faltante
      // Buscar patrones comunes: "vl:", "_y:", "Missing Refresh Token", etc.
      const isMissingRefreshToken = 
        errorStringLower.includes('missing refresh token') ||
        errorStringLower.includes('missing_refresh_token') ||
        errorStringLower.includes('missingrefreshtoken') ||
        errorCode === 'missing_refresh_token' ||
        errorCode === 'login_required' ||
        errorCode === 'consent_required' ||
        (error?.name && error.name.toLowerCase().includes('refresh')) ||
        (error?.name && error.name.toLowerCase().includes('missing')) ||
        // Verificar también en el stack trace
        errorStack.toLowerCase().includes('missing refresh token') ||
        errorStack.toLowerCase().includes('_gettokenusingrefreshtoken');
      
      if (isMissingRefreshToken && !isRedirectingRef.current) {
        isRedirectingRef.current = true;
        console.warn('[useAuth] Refresh token missing or expired, redirecting to login...');
        
        // Redirigir al login para obtener un nuevo refresh token
        // Usar setTimeout para evitar problemas con el estado de React durante el render
        setTimeout(() => {
          try {
            loginWithRedirect({
              appState: {
                returnTo: window.location.pathname
              },
              authorizationParams: {
                prompt: 'login',
                audience: auth0Config.authorizationParams.audience,
                scope: auth0Config.authorizationParams.scope
              }
            });
          } catch (redirectError) {
            console.error('[useAuth] Error during redirect:', redirectError);
            isRedirectingRef.current = false;
          }
        }, 100);
        
        return undefined;
      }
      
      // Solo loggear otros errores si no es un error de refresh token
      if (!isMissingRefreshToken) {
        console.error('[useAuth] Error getting access token:', error);
      }
      
      return undefined;
    }
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect]);

  // Configurar el provider de token para apiService
  useEffect(() => {
    apiService.setAccessTokenProvider(getAccessToken);
  }, [getAccessToken]);

  const loadUserDetails = useCallback(async () => {
    if (!isAuthenticated) return;
    
    // No intentar cargar detalles si ya se está redirigiendo
    if (isRedirectingRef.current) {
      return;
    }
    
    setIsLoadingDetails(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        // Si no hay token y se está redirigiendo, no hacer nada más
        if (isRedirectingRef.current) {
          setIsLoadingDetails(false);
          return;
        }
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
      // No loggear el error aquí si ya se está manejando en getAccessToken
      // El error de refresh token ya se maneja en getAccessToken y se redirige al login
      if (!isRedirectingRef.current) {
        console.error('Error getting access token:', error);
      }
    } finally {
      setIsLoadingDetails(false);
    }
  }, [isAuthenticated, getAccessToken]);

  // Resetear el flag de redirección cuando el usuario se autentica
  useEffect(() => {
    if (isAuthenticated) {
      isRedirectingRef.current = false;
    }
  }, [isAuthenticated]);

  // Cargar detalles del usuario cuando se autentica
  useEffect(() => {
    if (isAuthenticated && user && !isRedirectingRef.current) {
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

