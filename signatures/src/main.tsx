import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import { auth0Config } from './config/env';
import i18n from './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Auth0Provider
        domain={auth0Config.domain}
        clientId={auth0Config.clientId}
        authorizationParams={auth0Config.authorizationParams}
        cacheLocation="localstorage"
        useRefreshTokens={true}
        onRedirectCallback={(appState) => {
          console.log('Auth0 redirect callback', appState);
        }}
        skipRedirectCallback={false}
      >
        <BrowserRouter basename="/signatures">
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </I18nextProvider>
  </React.StrictMode>
);
