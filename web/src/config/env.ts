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

const contactRecipient = (import.meta.env.VITE_CONTACT_RECIPIENT as string | undefined) ?? 'contacto@devcracks.com';
const contactRecipientName =
  (import.meta.env.VITE_CONTACT_RECIPIENT_NAME as string | undefined) ?? 'Equipo Dev Cracks';

export const env = {
  apiBaseUrl,
  contactRecipient,
  contactRecipientName
};

