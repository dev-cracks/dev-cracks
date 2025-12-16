import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface UserDetails {
  id: string;
  email: string;
  name: string | null;
  contactEmail: string | null;
  phone: string | null;
  tenantId: string;
  role: 'Admin' | 'User';
  createdAt: string;
  updatedAt: string;
}

export const useUserDetails = () => {
  const { isAuthenticated, getAccessToken } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadUserDetails();
    } else {
      setUserDetails(null);
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const loadUserDetails = async () => {
    try {
      setIsLoading(true);
      const token = await getAccessToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_EMAIL_API_BASE_URL || 'http://localhost:5020'}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data: UserDetails = await response.json();
        setUserDetails(data);
      }
    } catch (error) {
      console.error('Error loading user details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = userDetails?.role === 'Admin';
  
  // Verificar si el usuario tiene un tenant válido (no es el GUID vacío)
  const hasValidTenant = userDetails?.tenantId && userDetails.tenantId !== '00000000-0000-0000-0000-000000000000';
  
  // Mostrar botón de backoffice si es admin O si no tiene tenant válido
  const canAccessBackoffice = isAdmin || !hasValidTenant;

  return {
    userDetails,
    isLoading,
    isAdmin,
    hasValidTenant: !!hasValidTenant,
    canAccessBackoffice,
    refreshUserDetails: loadUserDetails,
  };
};

