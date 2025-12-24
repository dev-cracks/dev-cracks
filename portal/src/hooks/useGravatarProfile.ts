import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { getGravatarProfile, GravatarProfile } from '../services/gravatarService';

interface UseGravatarProfileReturn {
  profile: GravatarProfile | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

/**
 * Hook para obtener y gestionar el perfil de Gravatar del usuario actual
 */
export const useGravatarProfile = (): UseGravatarProfileReturn => {
  const { isAuthenticated, getAccessToken } = useAuth();
  const [profile, setProfile] = useState<GravatarProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadProfile = useCallback(async () => {
    if (!isAuthenticated) {
      setProfile(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = await getAccessToken();
      const gravatarProfile = await getGravatarProfile(token);
      setProfile(gravatarProfile);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error desconocido al cargar perfil de Gravatar');
      setError(error);
      setProfile(null);
      console.error('[useGravatarProfile] Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, getAccessToken]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const refresh = useCallback(async () => {
    await loadProfile();
  }, [loadProfile]);

  return {
    profile,
    isLoading,
    error,
    refresh
  };
};

