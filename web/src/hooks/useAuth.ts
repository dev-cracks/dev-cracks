import { useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { mapAuth0User, User } from '../services/authService';

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

  const login = useCallback((returnUrl?: string) => {
    loginWithRedirect({
      appState: {
        returnTo: returnUrl || window.location.pathname
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

