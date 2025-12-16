import { useState, useEffect } from 'react';
import { HistoryEntry, getHistory } from '../services/userDataService';

interface ChangeHistoryProps {
  userId: string;
}

export const ChangeHistory = ({ userId }: ChangeHistoryProps) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = () => {
      const entries = getHistory(userId);
      setHistory(entries);
      setIsLoading(false);
    };

    loadHistory();
    
    // Recargar historial periódicamente para detectar cambios
    // En una app real, usarías eventos o un sistema de notificaciones
    const interval = setInterval(loadHistory, 2000);
    
    return () => clearInterval(interval);
  }, [userId]);

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

  const getFieldLabel = (field: 'email' | 'phone'): string => {
    return field === 'email' ? 'Correo Electrónico' : 'Número de Móvil';
  };

  if (isLoading) {
    return (
      <div className="change-history">
        <p>Cargando historial...</p>
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

