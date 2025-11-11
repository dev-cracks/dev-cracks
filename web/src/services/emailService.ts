import { env } from '../config/env';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildHtmlMessage = ({ name, email, message }: ContactPayload) => `
  <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
  <p><strong>Email:</strong> ${escapeHtml(email)}</p>
  <p><strong>Mensaje:</strong></p>
  <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
`;

const buildTextMessage = ({ name, email, message }: ContactPayload) =>
  [
    `Nombre: ${name}`,
    `Email: ${email}`,
    'Mensaje:',
    message
  ].join('\n\n');

export const sendContactEmail = async (payload: ContactPayload) => {
  const response = await fetch(`${env.apiBaseUrl}/emails/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      to: [
        {
          email: env.contactRecipient,
          name: env.contactRecipientName
        }
      ],
      subject: `Nuevo mensaje desde dev-cracks.com - ${payload.name}`,
      htmlContent: buildHtmlMessage(payload),
      textContent: buildTextMessage(payload),
      replyTo: {
        email: payload.email,
        name: payload.name
      }
    })
  });

  if (!response.ok) {
    let detail = 'No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos.';

    try {
      const data = await response.json();
      detail = data?.detail ?? data?.message ?? detail;
    } catch {
      // Ignoramos errores de parseo para mantener un mensaje amigable.
    }

    throw new Error(detail);
  }
};

