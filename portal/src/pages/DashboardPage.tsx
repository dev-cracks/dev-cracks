import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PillNav } from '../components/PillNav';
import DarkVeil from '../components/DarkVeil';
import MagicBento from '../components/MagicBento';
import { useAuth } from '../hooks/useAuth';
import { getDashboardData, ClickUpDashboardData, ClickUpTask, ClickUpStatus } from '../services/clickUpService';
import './DashboardPage.css';

export const DashboardPage = () => {
  const { t } = useTranslation('portal');
  const { getAccessToken, isAuthenticated, isLoading: authLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<ClickUpDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!isAuthenticated || authLoading) {
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const token = await getAccessToken();
        const data = await getDashboardData(token);
        setDashboardData(data);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError(err instanceof Error ? err.message : t('dashboard.error'));
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, [isAuthenticated, authLoading, getAccessToken]);

  const getStatusColor = (status: ClickUpStatus | null | undefined) => {
    return status?.color || '#87909e';
  };

  const getPriorityLabel = (priority: string | null) => {
    if (!priority) return t('dashboard.normal');
    const priorityMap: Record<string, string> = {
      '1': t('dashboard.urgent'),
      '2': t('dashboard.high'),
      '3': t('dashboard.normal'),
      '4': t('dashboard.low')
    };
    return priorityMap[priority] || priority;
  };

  return (
    <div className="dashboard-page">
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
      <PillNav />
      <main className="dashboard-page__content">
        <div className="dashboard-page__container">
          <h1 className="dashboard-page__title">{t('dashboard.title')}</h1>
          <p className="dashboard-page__subtitle">{t('dashboard.subtitle')}</p>
          
          {isLoading && (
            <div className="dashboard-page__loading">
              <p>{t('dashboard.loading')}</p>
            </div>
          )}

          {error && (
            <div className="dashboard-page__error">
              <p>{t('dashboard.error')}: {error}</p>
            </div>
          )}

          {!isLoading && !error && dashboardData && (
            <>
              <div className="dashboard-page__grid">
                <div className="dashboard-page__card">
                  <h2>{t('dashboard.summary')}</h2>
                  <div className="dashboard-page__stats">
                    <div className="dashboard-page__stat-item">
                      <span className="dashboard-page__stat-label">{t('dashboard.teams')}:</span>
                      <span className="dashboard-page__stat-value">{dashboardData.teamCount}</span>
                    </div>
                    <div className="dashboard-page__stat-item">
                      <span className="dashboard-page__stat-label">{t('dashboard.spaces')}:</span>
                      <span className="dashboard-page__stat-value">{dashboardData.spaceCount}</span>
                    </div>
                    <div className="dashboard-page__stat-item">
                      <span className="dashboard-page__stat-label">{t('dashboard.folders')}:</span>
                      <span className="dashboard-page__stat-value">{dashboardData.folderCount}</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-page__card">
                  <h2>{t('dashboard.totalTasks')}</h2>
                  <div className="dashboard-page__stat-item">
                    <span className="dashboard-page__stat-value dashboard-page__stat-value--large">
                      {dashboardData.totalTasks}
                    </span>
                  </div>
                  <p>{t('dashboard.tasksInClickUp')}</p>
                </div>
                <div className="dashboard-page__card">
                  <h2>{t('dashboard.statistics')}</h2>
                  <div className="dashboard-page__stats">
                    <div className="dashboard-page__stat-item">
                      <span className="dashboard-page__stat-label">{t('dashboard.activeSpaces')}:</span>
                      <span className="dashboard-page__stat-value">{dashboardData.spaceCount}</span>
                    </div>
                    <div className="dashboard-page__stat-item">
                      <span className="dashboard-page__stat-label">{t('dashboard.activeFolders')}:</span>
                      <span className="dashboard-page__stat-value">{dashboardData.folderCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-page__tasks-section">
                <h2 className="dashboard-page__tasks-title">{t('dashboard.tasks')}</h2>
                {dashboardData.tasks.length === 0 ? (
                  <p className="dashboard-page__no-tasks">{t('dashboard.noTasks')}</p>
                ) : (
                  <div className="dashboard-page__tasks-list">
                    {dashboardData.tasks.map((task) => (
                      <div key={task.id} className="dashboard-page__task-card">
                        <div className="dashboard-page__task-header">
                          <h3 className="dashboard-page__task-name">
                            <a 
                              href={task.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="dashboard-page__task-link"
                            >
                              {task.name}
                            </a>
                          </h3>
                          <span 
                            className="dashboard-page__task-status"
                            style={{ 
                              backgroundColor: getStatusColor(task.status),
                              color: '#fff',
                              padding: '4px 12px',
                              borderRadius: '12px',
                              fontSize: '0.875rem',
                              fontWeight: '500'
                            }}
                          >
                            {task.status?.status || t('dashboard.noStatus')}
                          </span>
                        </div>
                        {task.description && (
                          <p className="dashboard-page__task-description">{task.description}</p>
                        )}
                        <div className="dashboard-page__task-meta">
                          {task.priority && (
                            <span className="dashboard-page__task-priority">
                              {t('dashboard.priority')}: {getPriorityLabel(task.priority)}
                            </span>
                          )}
                          {task.listName && (
                            <span className="dashboard-page__task-list">
                              {t('dashboard.list')}: {task.listName}
                            </span>
                          )}
                          {task.folderName && (
                            <span className="dashboard-page__task-folder">
                              {t('dashboard.folder')}: {task.folderName}
                            </span>
                          )}
                          {task.spaceName && (
                            <span className="dashboard-page__task-space">
                              {t('dashboard.space')}: {task.spaceName}
                            </span>
                          )}
                        </div>
                        {task.assignees.length > 0 && (
                          <div className="dashboard-page__task-assignees">
                            <span className="dashboard-page__task-assignees-label">{t('dashboard.assigned')}:</span>
                            {task.assignees.map((assignee) => (
                              <span key={assignee.id} className="dashboard-page__task-assignee">
                                {assignee.username}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </main>
    </div>
  );
};

