import { useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// Declaración de tipos para Pendo en window
declare global {
  interface Window {
    pendo?: {
      initialize: (options: {
        visitor: {
          id: string;
          email: string;
          nickname: string;
        };
        account: {
          id: string;
          nickname: string;
        };
      }) => void;
      [key: string]: any;
    };
  }
}

/**
 * Hook para inicializar Pendo cuando el usuario está autenticado
 */
export const usePendo = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const MAX_RETRIES = 50; // Máximo 5 segundos de reintentos (50 * 100ms)

  useEffect(() => {
    // Limpiar timeout si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    retryCountRef.current = 0;

    // Solo inicializar si el usuario está autenticado y Pendo está disponible
    if (!isAuthenticated || isLoading || !user) {
      return;
    }

    // Función para inicializar Pendo
    const initializePendo = () => {
      // Verificar que Pendo esté disponible
      if (!window.pendo || typeof window.pendo.initialize !== 'function') {
        // Limitar reintentos para evitar loops infinitos
        if (retryCountRef.current >= MAX_RETRIES) {
          console.warn('Pendo no está disponible después de múltiples intentos');
          return;
        }

        // Si Pendo aún no está disponible, intentar de nuevo después de un breve delay
        retryCountRef.current += 1;
        timeoutRef.current = setTimeout(initializePendo, 100);
        return;
      }

      // Obtener información del usuario de Auth0
      const visitorId = user.sub || user.email || '';
      const visitorEmail = user.email || '';
      const visitorNickname = user.name || user.nickname || user.email || '';

      // Por ahora, el account usa la misma información que el visitor
      // Esto puede extenderse en el futuro para usar tenantId si se implementa
      const accountId = user.sub || user.email || '';
      const accountNickname = user.name || user.email || '';

      // Inicializar Pendo con la información del usuario
      try {
        window.pendo.initialize({
          visitor: {
            id: visitorId,
            email: visitorEmail,
            nickname: visitorNickname,
          },
          account: {
            id: accountId,
            nickname: accountNickname,
          },
        });
      } catch (error) {
        console.error('Error al inicializar Pendo:', error);
      }
    };

    // Inicializar Pendo
    initializePendo();

    // Cleanup: limpiar timeout si el componente se desmonta o cambian las dependencias
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [user, isAuthenticated, isLoading]);
};

