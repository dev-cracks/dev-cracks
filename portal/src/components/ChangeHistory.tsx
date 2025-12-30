import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { getChangeHistory, ChangeHistoryEntry } from '../services/userDataApiService';
import { useAuth } from '../hooks/useAuth';
import './ChangeHistory.css';

interface ChangeHistoryProps {
  userId: string;
  refreshTrigger?: number;
}

const MAX_RETRY_ATTEMPTS = 5;

export const ChangeHistory = ({ userId, refreshTrigger }: ChangeHistoryProps) => {
  const { t } = useTranslation('portal');
  const { getAccessToken } = useAuth();
  const [history, setHistory] = useState<ChangeHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const failedAttemptsRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const loadHistory = async () => {
      if (failedAttemptsRef.current >= MAX_RETRY_ATTEMPTS) {
        return;
      }

      try {
        const token = await getAccessToken();
        const entries = await getChangeHistory(token);
        
        if (isMounted) {
          setHistory(entries);
          setError(null);
          failedAttemptsRef.current = 0;
        }
      } catch (error) {
        console.error('Error al cargar historial:', error);
        
        if (isMounted) {
          failedAttemptsRef.current += 1;
          
          if (failedAttemptsRef.current >= MAX_RETRY_ATTEMPTS) {
            setError(t('changeHistory.error'));
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
      return t('changeHistory.email');
    }
    if (field === 'phone') {
      return t('changeHistory.phone');
    }
    return field;
  };

  if (isLoading) {
    return (
      <div className="change-history">
        <p>{t('changeHistory.loading')}</p>
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
          <p>{t('changeHistory.empty')}</p>
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
                <span className="change-history__change-label">{t('changeHistory.oldValue')}</span>
                <span className="change-history__change-value change-history__change-value--old">
                  {entry.oldValue || t('changeHistory.emptyValue')}
                </span>
              </div>
              <div className="change-history__arrow">→</div>
              <div className="change-history__change">
                <span className="change-history__change-label">{t('changeHistory.newValue')}</span>
                <span className="change-history__change-value change-history__change-value--new">
                  {entry.newValue || t('changeHistory.emptyValue')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

