const normalizeUrl = (url: string) => url.replace(/\/+$/, '');

const apiBaseUrl = (() => {
  const raw = import.meta.env.VITE_EMAIL_API_BASE_URL as string | undefined;
  return raw ? normalizeUrl(raw) : 'http://localhost:5020';
})();

const contactRecipient = (import.meta.env.VITE_CONTACT_RECIPIENT as string | undefined) ?? 'contacto@devcracks.com';
const contactRecipientName =
  (import.meta.env.VITE_CONTACT_RECIPIENT_NAME as string | undefined) ?? 'Equipo Dev Cracks';

export const env = {
  apiBaseUrl,
  contactRecipient,
  contactRecipientName
};

