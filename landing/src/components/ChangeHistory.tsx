import { useState, useEffect, useRef } from 'react';
import { getChangeHistory, ChangeHistoryEntry } from '../services/userDataApiService';
import { useAuth } from '../hooks/useAuth';

interface ChangeHistoryProps {
  userId: string;
  refreshTrigger?: number; // Trigger to refresh the history
}

const MAX_RETRY_ATTEMPTS = 5;

export const ChangeHistory = ({ userId, refreshTrigger }: ChangeHistoryProps) => {
  const { getAccessToken } = useAuth();
  const [history, setHistory] = useState<ChangeHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const failedAttemptsRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const loadHistory = async () => {
      // Si ya alcanzamos el límite de intentos, no intentar más
      if (failedAttemptsRef.current >= MAX_RETRY_ATTEMPTS) {
        return;
      }

      try {
        console.log('[ChangeHistory] Loading history, getting access token...');
        const token = await getAccessToken();
        console.log('[ChangeHistory] Token obtained:', token ? 'Yes' : 'No');
        const entries = await getChangeHistory(token);
        console.log('[ChangeHistory] History loaded, entries:', entries.length);
        
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
    
    return () => {
      isMounted = false;
    };
  }, [userId, getAccessToken, refreshTrigger]);

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

