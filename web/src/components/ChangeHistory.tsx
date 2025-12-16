import { useState, useEffect, useRef } from 'react';
import { getChangeHistory, ChangeHistoryEntry } from '../services/userDataApiService';
import { useAuth } from '../hooks/useAuth';

interface ChangeHistoryProps {
  userId: string;
}

const MAX_RETRY_ATTEMPTS = 5;

export const ChangeHistory = ({ userId }: ChangeHistoryProps) => {
  const { getAccessToken } = useAuth();
  const [history, setHistory] = useState<ChangeHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const failedAttemptsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadHistory = async () => {
      // Si ya alcanzamos el límite de intentos, no intentar más
      if (failedAttemptsRef.current >= MAX_RETRY_ATTEMPTS) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      try {
        const token = await getAccessToken();
        const entries = await getChangeHistory(token);
        
        if (isMounted) {
          setHistory(entries);
          setError(null);
          // Resetear contador de intentos fallidos en caso de éxito
          failedAttemptsRef.current = 0;
        }
      } catch (error) {
        console.error('Error al cargar historial:', error);
        
        if (isMounted) {
          failedAttemptsRef.current += 1;
          
          if (failedAttemptsRef.current >= MAX_RETRY_ATTEMPTS) {
            // Detener el intervalo si alcanzamos el límite
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setError('No se pudo cargar el historial de cambios después de varios intentos. Por favor, recarga la página.');
          } else {
            setHistory([]);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadHistory();
    
    // Recargar historial periódicamente para detectar cambios
    // Solo crear el intervalo si no hemos alcanzado el límite
    if (failedAttemptsRef.current < MAX_RETRY_ATTEMPTS) {
      intervalRef.current = setInterval(() => {
        loadHistory();
      }, 5000);
    }
    
    return () => {
      isMounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [userId, getAccessToken]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getFieldLabel = (field: string): string => {
    if (field === 'contact_email') {
      return 'Correo Electrónico';
    }
    if (field === 'phone') {
      return 'Número de Móvil';
    }
    return field;
  };

  if (isLoading) {
    return (
      <div className="change-history">
        <p>Cargando historial...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="change-history">
        <div className="change-history__error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="change-history">
        <div className="change-history__empty">
          <p>No hay cambios registrados aún.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="change-history">
      <div className="change-history__list">
        {history.map((entry) => (
          <div key={entry.id} className="change-history__entry">
            <div className="change-history__entry-header">
              <span className="change-history__field-badge">
                {getFieldLabel(entry.field)}
              </span>
              <span className="change-history__date">
                {formatDate(entry.changedAt)}
              </span>
            </div>
            <div className="change-history__entry-content">
              <div className="change-history__change">
                <span className="change-history__change-label">Valor anterior:</span>
                <span className="change-history__change-value change-history__change-value--old">
                  {entry.oldValue || '(vacío)'}
                </span>
              </div>
              <div className="change-history__arrow">→</div>
              <div className="change-history__change">
                <span className="change-history__change-label">Nuevo valor:</span>
                <span className="change-history__change-value change-history__change-value--new">
                  {entry.newValue || '(vacío)'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

