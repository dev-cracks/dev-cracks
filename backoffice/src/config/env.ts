// Usar la misma configuración que el web principal
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

// Determinar el redirect URI correcto basado en si estamos en modo proxy o standalone
const getRedirectUri = () => {
  if (typeof window !== 'undefined') {
    // Si estamos accediendo a través del servidor unificado, usar la URL completa con /backoffice
    const base = import.meta.env.VITE_BACKOFFICE_BASE || '/backoffice';
    return `${window.location.origin}${base}/login`;
  }
  // Fallback para desarrollo standalone (aunque ya no se usa)
  return 'http://localhost:5173/backoffice/login';
};

export const auth0Config = {
  domain: (import.meta.env.VITE_AUTH0_DOMAIN as string | undefined) || 'dev-cracks.eu.auth0.com',
  clientId: (import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined) || 'puVivGd9KVmrSyVu8hCytE1juOlFLdht',
  authorizationParams: {
    redirect_uri: getRedirectUri(),
    audience: apiAudience,
    scope: 'openid profile email'
  }
};

export { apiBaseUrl };

