import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import { I18nProvider } from './components/I18nProvider';
import './i18n/config'; // Inicializa i18n
import './styles/global.css';
import { auth0Config } from './config/env';

// Asegurar que i18n esté inicializado antes de renderizar
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <I18nProvider>
        <Auth0Provider
          domain={auth0Config.domain}
          clientId={auth0Config.clientId}
          authorizationParams={auth0Config.authorizationParams}
          cacheLocation="localstorage"
          useRefreshTokens={true}
        >
          <App />
        </Auth0Provider>
      </I18nProvider>
    </React.StrictMode>
  );
}
