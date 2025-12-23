import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import App from './App';
import { auth0Config } from './config/env';
import { NotificationProvider } from './contexts/NotificationContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { RibbonMenuProvider } from './contexts/RibbonMenuContext';
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
        // Auth0Provider will handle redirection automatically using appState.returnTo
        // We don't need to do manual redirections here to avoid cycles
      }}
      skipRedirectCallback={false}
    >
      <FluentProvider theme={webLightTheme}>
        <NotificationProvider>
          <SettingsProvider>
            <RibbonMenuProvider>
              <App />
            </RibbonMenuProvider>
          </SettingsProvider>
        </NotificationProvider>
      </FluentProvider>
    </Auth0Provider>
  </React.StrictMode>
);

