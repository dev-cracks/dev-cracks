const normalizeUrl = (url: string) => url.replace(/\/+$/, '');

const apiBaseUrl = (() => {
  const raw = import.meta.env.VITE_EMAIL_API_BASE_URL as string | undefined;
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

// Auth0 Configuration
export const auth0Config = {
  domain: (import.meta.env.VITE_AUTH0_DOMAIN as string | undefined) || 'dev-cracks.eu.auth0.com',
  clientId: (import.meta.env.VITE_AUTH0_CLIENT_ID as string | undefined) || 'puVivGd9KVmrSyVu8hCytE1juOlFLdht',
  authorizationParams: {
    redirect_uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173',
    audience: undefined, // Optional: add if you have an API
    scope: 'openid profile email'
  }
};

const contactRecipient = (import.meta.env.VITE_CONTACT_RECIPIENT as string | undefined) ?? 'contacto@devcracks.com';
const contactRecipientName =
  (import.meta.env.VITE_CONTACT_RECIPIENT_NAME as string | undefined) ?? 'Equipo Dev Cracks';

export const env = {
  apiBaseUrl,
  contactRecipient,
  contactRecipientName
};

// Also export the base URL for use in other services
export { apiBaseUrl };

