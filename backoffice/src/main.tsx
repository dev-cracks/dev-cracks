import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import App from './App';
import { auth0Config } from './config/env';
import './styles/global.css';

console.log('Backoffice starting...', { 
  domain: auth0Config.domain, 
  clientId: auth0Config.clientId ? '***configured***' : 'missing',
  redirectUri: auth0Config.authorizationParams.redirect_uri 
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      onRedirectCallback={(appState) => {
        console.log('Auth0 redirect callback', appState);
      }}
    >
      <FluentProvider theme={webLightTheme}>
        <App />
      </FluentProvider>
    </Auth0Provider>
  </React.StrictMode>
);

