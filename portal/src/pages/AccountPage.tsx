import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PillNav } from '../components/PillNav';
import { useAuth } from '../hooks/useAuth';
import { useGravatarProfile } from '../hooks/useGravatarProfile';
import { Avatar } from '../components/Avatar';
import { UserDataEditor } from '../components/UserDataEditor';
import { ChangeHistory } from '../components/ChangeHistory';
import DarkVeil from '../components/DarkVeil';
import './AccountPage.css';

export const AccountPage = () => {
  const { t } = useTranslation('portal');
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { profile: gravatarProfile, isLoading: isLoadingGravatar } = useGravatarProfile();
  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="account-page">
        <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
          <DarkVeil />
        </div>
        <PillNav />
        <main className="account-page__content-wrapper">
          <div className="account-page__container">
            <p style={{ textAlign: 'center', color: '#fff' }}>Cargando...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="account-page">
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
      <PillNav />
      <main className="account-page__content-wrapper">
        <div className="account-page__container">
          <div className="account-page__header">
            <h1>{t('account.title')}</h1>
            <p>{t('account.subtitle')}</p>
          </div>

          <div className="account-page__content">
            <div className="account-page__card">
              <div className="account-page__profile">
                <div className="account-page__avatar">
                  <Avatar
                    picture={user.picture}
                    name={user.name}
                    email={user.email}
                    userId={user.id}
                    size="large"
                  />
                </div>
                <div className="account-page__profile-info">
                  <h2 className="account-page__profile-name">
                    {user.name || t('account.profile.name')}
                  </h2>
                  <p className="account-page__profile-email">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="account-page__card">
              <h3 className="account-page__card-title">{t('account.personalInfo.title')}</h3>
              <div className="account-page__info-grid">
                <div className="account-page__info-item">
                  <label className="account-page__info-label">{t('account.personalInfo.name')}</label>
                  <div className="account-page__info-value">
                    {user.name || t('userDataEditor.notSpecified')}
                  </div>
                </div>

                <div className="account-page__info-item">
                  <label className="account-page__info-label">{t('account.personalInfo.email')}</label>
                  <div className="account-page__info-value">
                    {user.email}
                  </div>
                </div>

                <div className="account-page__info-item">
                  <label className="account-page__info-label">{t('account.personalInfo.userId')}</label>
                  <div className="account-page__info-value account-page__info-value--mono">
                    {user.id}
                  </div>
                </div>
              </div>

              <div className="account-page__section-divider"></div>

              <div className="account-page__section-subtitle">{t('account.contactInfo.title')}</div>
              <UserDataEditor
                userId={user.id}
                initialEmail={user.email}
                onUpdate={() => {
                  setHistoryRefreshTrigger(prev => prev + 1);
                }}
              />
            </div>

            <div className="account-page__card">
              <h3 className="account-page__card-title">{t('account.authInfo.title')}</h3>
              <div className="account-page__info-grid">
                <div className="account-page__info-item">
                  <label className="account-page__info-label">{t('account.authInfo.status')}</label>
                  <div className="account-page__info-value">
                    <span className="account-page__status account-page__status--active">
                      {t('account.authInfo.authenticated')}
                    </span>
                  </div>
                </div>

                <div className="account-page__info-item">
                  <label className="account-page__info-label">{t('account.authInfo.provider')}</label>
                  <div className="account-page__info-value">Auth0</div>
                </div>

                <div className="account-page__info-item">
                  <label className="account-page__info-label">{t('account.authInfo.sub')}</label>
                  <div className="account-page__info-value account-page__info-value--mono">
                    {user.sub}
                  </div>
                </div>
              </div>

              <div className="account-page__section-divider"></div>

              <div className="account-page__section-subtitle">{t('account.picture.title')}</div>
              <div className="account-page__picture-section">
                <Avatar
                  picture={user.picture}
                  name={user.name}
                  email={user.email}
                  userId={user.id}
                  size="large"
                  className="account-page__picture-avatar"
                />
                <p className="account-page__picture-note">
                  {user.picture
                    ? t('account.picture.providedBy')
                    : t('account.picture.unavailable')}
                </p>
              </div>
            </div>

            {gravatarProfile && (
              <div className="account-page__card">
                <h3 className="account-page__card-title">{t('account.gravatar.title')}</h3>
                {isLoadingGravatar ? (
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>{t('account.gravatar.loading')}</p>
                ) : (
                  <>
                    <div className="account-page__info-grid">
                      {gravatarProfile.displayName && (
                        <div className="account-page__info-item">
                          <label className="account-page__info-label">{t('account.gravatar.displayName')}</label>
                          <div className="account-page__info-value">
                            {gravatarProfile.displayName}
                          </div>
                        </div>
                      )}

                      {gravatarProfile.currentLocation && (
                        <div className="account-page__info-item">
                          <label className="account-page__info-label">{t('account.gravatar.location')}</label>
                          <div className="account-page__info-value">
                            {gravatarProfile.currentLocation}
                          </div>
                        </div>
                      )}

                      {gravatarProfile.preferredUsername && (
                        <div className="account-page__info-item">
                          <label className="account-page__info-label">{t('account.gravatar.preferredUsername')}</label>
                          <div className="account-page__info-value">
                            {gravatarProfile.preferredUsername}
                          </div>
                        </div>
                      )}
                    </div>

                    {gravatarProfile.aboutMe && (
                      <>
                        <div className="account-page__section-divider"></div>
                        <div className="account-page__section-subtitle">{t('account.gravatar.biography')}</div>
                        <div className="account-page__info-value" style={{
                          lineHeight: '1.6',
                          padding: '1rem',
                          background: 'rgba(0, 0, 0, 0.2)',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          {gravatarProfile.aboutMe}
                        </div>
                      </>
                    )}

                    {gravatarProfile.urls && gravatarProfile.urls.length > 0 && (
                      <>
                        <div className="account-page__section-divider"></div>
                        <div className="account-page__section-subtitle">{t('account.gravatar.links')}</div>
                        <div className="account-page__info-grid">
                          {gravatarProfile.urls.map((url, index) => (
                            <div key={index} className="account-page__info-item">
                              <label className="account-page__info-label">{url.title || 'Enlace'}</label>
                              <div className="account-page__info-value">
                                <a
                                  href={url.value}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    color: '#4A90E2',
                                    textDecoration: 'none',
                                    wordBreak: 'break-all'
                                  }}
                                >
                                  {url.value}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    {gravatarProfile.accounts && gravatarProfile.accounts.length > 0 && (
                      <>
                        <div className="account-page__section-divider"></div>
                        <div className="account-page__section-subtitle">{t('account.gravatar.social')}</div>
                        <div className="account-page__info-grid">
                          {gravatarProfile.accounts
                            .filter(account => account.verified)
                            .map((account, index) => (
                              <div key={index} className="account-page__info-item">
                                <label className="account-page__info-label">
                                  {account.domain}
                                  {account.verified && (
                                    <span style={{
                                      marginLeft: '0.5rem',
                                      color: '#4A90E2',
                                      fontSize: '0.75rem'
                                    }}>✓ {t('account.gravatar.verified')}</span>
                                  )}
                                </label>
                                <div className="account-page__info-value">
                                  {account.url ? (
                                    <a
                                      href={account.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        color: '#4A90E2',
                                        textDecoration: 'none',
                                        wordBreak: 'break-all'
                                      }}
                                    >
                                      {account.display || account.username || account.url}
                                    </a>
                                  ) : (
                                    <span>{account.display || account.username || account.domain}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    )}

                    {gravatarProfile.profileUrl && (
                      <>
                        <div className="account-page__section-divider"></div>
                        <div className="account-page__section-subtitle">{t('account.gravatar.fullProfile')}</div>
                        <div className="account-page__info-value">
                          <a
                            href={gravatarProfile.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#4A90E2',
                              textDecoration: 'none',
                              wordBreak: 'break-all'
                            }}
                          >
                            {t('account.gravatar.viewProfile')}
                          </a>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            <div className="account-page__card">
              <h3 className="account-page__card-title">{t('account.history.title')}</h3>
              <ChangeHistory userId={user.id} refreshTrigger={historyRefreshTrigger} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

