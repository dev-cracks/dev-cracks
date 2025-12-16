import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { useAuth } from '../hooks/useAuth';
import { Avatar } from '../components/Avatar';
import { UserDataEditor } from '../components/UserDataEditor';
import { ChangeHistory } from '../components/ChangeHistory';

export const AccountPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [historyRefreshTrigger, setHistoryRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <div className="container" style={{ paddingTop: '40px', textAlign: 'center' }}>
            <p>Cargando...</p>
          </div>
        </main>
      </>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <>
      <Header />
      <main>
        <div className="account-page">
          <div className="container">
            <div className="account-page__header">
              <button className="account-page__back" onClick={() => navigate('/')}>
                ← Volver
              </button>
              <h1>Mi Cuenta</h1>
              <p>Información de tu perfil</p>
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
                      {user.name || 'Usuario'}
                    </h2>
                    <p className="account-page__profile-email">{user.email}</p>
                  </div>
                </div>
              </div>

              <div className="account-page__card">
                <h3 className="account-page__card-title">Información Personal</h3>
                <div className="account-page__info-grid">
                  <div className="account-page__info-item">
                    <label className="account-page__info-label">Nombre</label>
                    <div className="account-page__info-value">
                      {user.name || 'No especificado'}
                    </div>
                  </div>

                  <div className="account-page__info-item">
                    <label className="account-page__info-label">Email</label>
                    <div className="account-page__info-value">
                      {user.email}
                    </div>
                  </div>

                  <div className="account-page__info-item">
                    <label className="account-page__info-label">ID de Usuario</label>
                    <div className="account-page__info-value account-page__info-value--mono">
                      {user.id}
                    </div>
                  </div>
                </div>
                
                <div className="account-page__section-divider"></div>
                
                <div className="account-page__section-subtitle">Datos de Contacto</div>
                <UserDataEditor
                  userId={user.id}
                  initialEmail={user.email}
                  onUpdate={() => {
                    // Refrescar el historial de cambios cuando se actualizan los datos
                    setHistoryRefreshTrigger(prev => prev + 1);
                  }}
                />
              </div>

              <div className="account-page__card">
                <h3 className="account-page__card-title">Información de Autenticación</h3>
                <div className="account-page__info-grid">
                  <div className="account-page__info-item">
                    <label className="account-page__info-label">Estado</label>
                    <div className="account-page__info-value">
                      <span className="account-page__status account-page__status--active">
                        Autenticado
                      </span>
                    </div>
                  </div>

                  <div className="account-page__info-item">
                    <label className="account-page__info-label">Proveedor</label>
                    <div className="account-page__info-value">Auth0</div>
                  </div>

                  <div className="account-page__info-item">
                    <label className="account-page__info-label">Auth0 Sub</label>
                    <div className="account-page__info-value account-page__info-value--mono">
                      {user.sub}
                    </div>
                  </div>
                </div>
                
                <div className="account-page__section-divider"></div>
                
                <div className="account-page__section-subtitle">Foto de Perfil</div>
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
                      ? 'Foto de perfil proporcionada por Auth0' 
                      : 'No hay foto de perfil disponible'}
                  </p>
                </div>
              </div>

              <div className="account-page__card">
                <h3 className="account-page__card-title">Historial de Cambios</h3>
                <ChangeHistory userId={user.id} refreshTrigger={historyRefreshTrigger} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

