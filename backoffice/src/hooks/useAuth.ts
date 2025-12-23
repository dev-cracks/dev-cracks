import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
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

  // Map Auth0 user
  const auth0MappedUser = mapAuth0User(auth0User);

  // Combine Auth0 information with database information
  // Prioritize database name if available
  const user = useMemo((): User | null => {
    if (!auth0MappedUser) return null;
    
    return {
      ...auth0MappedUser,
      // Use database name if available, otherwise use Auth0 name
      name: userDetails?.name || auth0MappedUser.name,
      // Also update other relevant database fields
      tenantId: userDetails?.tenantId || auth0MappedUser.tenantId,
      role: userDetails?.role || auth0MappedUser.role,
    };
  }, [auth0MappedUser, userDetails]);

  const getAccessToken = useCallback(async (): Promise<string | undefined> => {
    if (!isAuthenticated) {
      return undefined;
    }
    
    // Avoid multiple simultaneous redirections
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
      // Detect if error is due to missing refresh token
      // Error can come in different formats from Auth0
      const errorMessage = 
        error?.message || 
        error?.error_description || 
        error?.name ||
        error?.toString() || 
        String(error);
      const errorCode = error?.error || error?.code;
      const errorStack = error?.stack || '';
      
      // Try to serialize error safely
      let errorString = errorMessage + ' ' + String(error) + ' ' + errorStack;
      try {
        errorString += ' ' + JSON.stringify(error);
      } catch {
        // If JSON.stringify fails, continue without it
      }
      
      const errorStringLower = errorString.toLowerCase();
      
      // Check multiple forms of missing refresh token error
      // Look for common patterns: "vl:", "_y:", "Missing Refresh Token", etc.
      const isMissingRefreshToken = 
        errorStringLower.includes('missing refresh token') ||
        errorStringLower.includes('missing_refresh_token') ||
        errorStringLower.includes('missingrefreshtoken') ||
        errorCode === 'missing_refresh_token' ||
        errorCode === 'login_required' ||
        errorCode === 'consent_required' ||
        (error?.name && error.name.toLowerCase().includes('refresh')) ||
        (error?.name && error.name.toLowerCase().includes('missing')) ||
        // Also check in stack trace
        errorStack.toLowerCase().includes('missing refresh token') ||
        errorStack.toLowerCase().includes('_gettokenusingrefreshtoken');
      
      if (isMissingRefreshToken && !isRedirectingRef.current) {
        isRedirectingRef.current = true;
        console.warn('[useAuth] Refresh token missing or expired, redirecting to login...');
        
        // Redirect to login to get new refresh token
        // Use setTimeout to avoid React state issues during render
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
      
      // Only log other errors if not a refresh token error
      if (!isMissingRefreshToken) {
        console.error('[useAuth] Error getting access token:', error);
      }
      
      return undefined;
    }
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect]);

  // Configure token provider for apiService
  useEffect(() => {
    apiService.setAccessTokenProvider(getAccessToken);
  }, [getAccessToken]);

  const loadUserDetails = useCallback(async () => {
    if (!isAuthenticated) return;
    
    // Don't try to load details if already redirecting
    if (isRedirectingRef.current) {
      return;
    }
    
    setIsLoadingDetails(true);
    try {
      const token = await getAccessToken();
      if (!token) {
        // If no token and redirecting, don't do anything else
        if (isRedirectingRef.current) {
          setIsLoadingDetails(false);
          return;
        }
        setIsLoadingDetails(false);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

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
          // If not authorized, clear user details
          setUserDetails(null);
        }
      } catch (error: any) {
        clearTimeout(timeoutId);
        // Ignore abort errors (cancelled request) and network errors
        if (error.name !== 'AbortError' && error.name !== 'TypeError') {
          console.error('Error loading user details:', error);
        } else if (error.name === 'TypeError' && import.meta.env.DEV) {
          // In development, only show silent warning if API is not available
          console.warn('[Dev] API server not available. User details will not be loaded.');
        }
      }
    } catch (error) {
      // Don't log error here if already handled in getAccessToken
      // Refresh token error is already handled in getAccessToken and redirects to login
      if (!isRedirectingRef.current) {
        console.error('Error getting access token:', error);
      }
    } finally {
      setIsLoadingDetails(false);
    }
  }, [isAuthenticated, getAccessToken]);

  // Reset redirect flag when user authenticates
  useEffect(() => {
    if (isAuthenticated) {
      isRedirectingRef.current = false;
    }
  }, [isAuthenticated]);

  // Load user details when authenticated
  useEffect(() => {
    if (isAuthenticated && user && !isRedirectingRef.current) {
      loadUserDetails();
    } else {
      setUserDetails(null);
    }
  }, [isAuthenticated, user?.id, loadUserDetails]);


  const login = useCallback((returnUrl?: string) => {
    // Ensure returnUrl includes base path if it doesn't have it
    const basePath = '/backoffice';
    let finalReturnUrl = returnUrl || window.location.pathname;
    
    // If returnUrl doesn't start with base path, add it
    if (finalReturnUrl && !finalReturnUrl.startsWith(basePath)) {
      // If it's a relative route, add base path
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

  // TODO: WORKAROUND - Hardcoded for testing. Revert after testing
  // const isAdmin = userDetails?.role === 'Admin';
  const isAdmin = isAuthenticated; // All authenticated users are Admin temporarily

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

