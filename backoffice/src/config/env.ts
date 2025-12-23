// Use the same configuration as the main web
const normalizeUrl = (url: string) => url.replace(/\/+$/, '');

const apiBaseUrl = (() => {
  const raw = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (raw) {
    return normalizeUrl(raw);
  }

  if (typeof window !== 'undefined') {
    const origin = normalizeUrl(window.location.origin.toLowerCase());

    const mappedOrigin =
      {
        'https://www.dev-cracks.com': 'https://dev-cracks.onrender.com',
        'https://dev-cracks.com': 'https://dev-cracks.onrender.com',
        'https://dev-cracks.onrender.com': 'https://dev-cracks.onrender.com'
      }[origin];

    if (mappedOrigin) {
      return mappedOrigin;
    }
  }

  return 'http://localhost:5020';
})();

const apiAudience = (import.meta.env.VITE_AUTH0_API_AUDIENCE as string | undefined) || 
  'fractalize-services-api';

// Determine the correct redirect URI based on whether we're in proxy or standalone mode
// El redirect_uri debe ser la URL base donde se renderiza la aplicación React
// Auth0Provider manejará el callback automáticamente en cualquier ruta
const getRedirectUri = () => {
  if (typeof window !== 'undefined') {
    // If accessing through unified server, use full URL with /backoffice (sin /login)
    const base = import.meta.env.VITE_BACKOFFICE_BASE || '/backoffice';
    return `${window.location.origin}${base}`;
  }
  // Fallback for standalone development (though not used anymore)
  return 'http://localhost:5173/backoffice';
};

export const auth0Config = {
  domain: (import.meta.env.VITE_AUTH0_DOMAIN as string | undefined) || 'dev-cracks.eu.auth0.com',
  clientId: (import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined) || 'puVivGd9KVmrSyVu8hCytE1juOlFLdht',
  authorizationParams: {
    redirect_uri: getRedirectUri(),
    audience: apiAudience,
    scope: 'openid profile email offline_access'
  }
};

export { apiBaseUrl };

