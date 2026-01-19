import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import JSZip from 'jszip';
import { useContactFormStore } from '../hooks/useContactFormStore.js';
import { env } from '../config/env.js';

async function sha256(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export const ContactSection = () => {
  const { t } = useTranslation('landing');
  const { name, email, company, position, consultationType, message, status, error, setField, submit } = useContactFormStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  const isSubmitting = status === 'loading';
  const isSuccess = status === 'success';

  const downloadWalletCard = () => {
    // Generar contenido vCard
    const vCardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${env.contactRecipientName}`,
      `ORG:Dev Cracks`,
      `TEL;TYPE=CELL:+34647007280`,
      `EMAIL:${env.contactRecipient}`,
      `URL:https://www.dev-cracks.com`,
      `NOTE:${t('contact.wallet.descriptionValue')}`,
      'END:VCARD'
    ].join('\n');

    // Crear blob y descargar
    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dev-cracks-contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadWalletPass = async () => {
    // Generar el JSON del pass para Apple Wallet / Google Wallet
    const passJson = {
      formatVersion: 1,
      passTypeIdentifier: 'pass.com.devcracks.contact',
      serialNumber: `dev-cracks-${Date.now()}`,
      teamIdentifier: 'DEVCracks',
      organizationName: 'Dev Cracks',
      description: t('contact.wallet.cardDescription'),
      logoText: 'Dev Cracks',
      foregroundColor: 'rgb(88, 166, 255)',
      backgroundColor: 'rgb(13, 17, 23)',
      labelColor: 'rgb(200, 209, 217)',
      generic: {
        primaryFields: [
          {
            key: 'name',
            label: t('contact.wallet.nameLabel'),
            value: env.contactRecipientName
          }
        ],
        secondaryFields: [
          {
            key: 'phone',
            label: t('contact.wallet.phoneLabel'),
            value: '+34 647 007 280'
          },
          {
            key: 'email',
            label: t('contact.wallet.emailLabel'),
            value: env.contactRecipient
          }
        ],
        auxiliaryFields: [
          {
            key: 'website',
            label: t('contact.wallet.websiteLabel'),
            value: 'www.dev-cracks.com'
          }
        ],
        backFields: [
          {
            key: 'description',
            label: t('contact.wallet.descriptionLabel'),
            value: t('contact.wallet.descriptionValue')
          },
          {
            key: 'contact',
            label: t('contact.wallet.contactLabel'),
            value: `${env.contactRecipient}\n+34 647 007 280`
          }
        ]
      },
      barcodes: [
        {
          message: `https://www.dev-cracks.com`,
          format: 'PKBarcodeFormatQR',
          messageEncoding: 'iso-8859-1'
        }
      ]
    };

    // Crear el contenido del manifest (para .pkpass)
    const manifestContent = JSON.stringify({
      'pass.json': await sha256(JSON.stringify(passJson))
    });

    // Crear un ZIP con los archivos necesarios
    const zip = new JSZip();

    // Agregar pass.json
    zip.file('pass.json', JSON.stringify(passJson, null, 2));

    // Agregar manifest.json
    zip.file('manifest.json', manifestContent);

    // Generar el ZIP y descargar
    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dev-cracks-wallet.pkpass';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadiPhoneWalletPass = async () => {
    try {
      // Llamar al endpoint del servidor para generar el pass firmado
      const response = await fetch('/api/wallet-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: env.contactRecipientName,
          email: env.contactRecipient,
          phone: '+34 647 007 280',
          website: 'https://www.dev-cracks.com',
          description: t('contact.wallet.descriptionValue')
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: t('contact.wallet.unknownError') }));
        if (response.status === 503) {
          alert(t('contact.wallet.certificatesNotConfigured'));
        } else {
          alert(`${t('contact.wallet.errorGenerating')}: ${errorData.message || t('contact.wallet.unknownError')}`);
        }
        return;
      }

      // Obtener el blob del pass
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Para iPhone, intentar abrir directamente en Wallet si es posible
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      if (isIOS) {
        // En iOS, abrir directamente
        window.location.href = url;
      } else {
        // En otros dispositivos, descargar normalmente
        const link = document.createElement('a');
        link.href = url;
        link.download = 'dev-cracks-iphone.pkpass';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      // Limpiar después de un tiempo
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    } catch (error) {
      console.error('Error generando pass para iPhone:', error);
      alert(`${t('contact.wallet.errorGenerating')}.`);
    }
  };


  return (
    <section id="contacto" className="contact">
      <div className="container">
        <div className="contact-header">
          <div className="contact-logo">
            <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="crackGradientContact" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0080" />
                  <stop offset="100%" stopColor="#7928CA" />
                </linearGradient>
                <filter id="glowContact" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>
              <g transform="translate(106, 120)">
                <path d="M60 40 L10 100 L60 160" stroke="url(#crackGradientContact)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M240 40 L290 100 L240 160" stroke="url(#crackGradientContact)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" filter="url(#glowContact)" />
                <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <text x="256" y="400" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="58" fill="white" letterSpacing="-2">
                DEV<tspan fill="url(#crackGradientContact)">CRACKS</tspan>
              </text>
              <text x="256" y="440" textAnchor="middle" fontFamily="Courier New, monospace" fontWeight="bold" fontSize="20" fill="#888" letterSpacing="5">
                {t('hero.subtitle')}
              </text>
            </svg>
          </div>
          <h2>{t('contact.header.title')}</h2>
          <p>{t('contact.header.text')}</p>
          <div className="contact-header__promise">
            <span className="contact-header__promise-icon">⚡</span>
            <strong>{t('contact.header.promiseTitle')}</strong>
            <span className="contact-header__promise-text">{t('contact.header.promiseText')}</span>
          </div>
        </div>

        <div className="contact-content">
          <div className="contact-form">
            <form onSubmit={handleSubmit} noValidate>
              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="name">{t('contact.form.name')} *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setField('name', event.target.value)}
                    required
                    disabled={isSubmitting}
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="email">{t('contact.form.email')} *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setField('email', event.target.value)}
                    required
                    disabled={isSubmitting}
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__field">
                  <label htmlFor="company">{t('contact.form.company')}</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(event) => setField('company', event.target.value)}
                    disabled={isSubmitting}
                    placeholder={t('contact.form.companyPlaceholder')}
                  />
                </div>

                <div className="contact-form__field">
                  <label htmlFor="position">{t('contact.form.position')}</label>
                  <input
                    id="position"
                    name="position"
                    type="text"
                    value={position}
                    onChange={(event) => setField('position', event.target.value)}
                    disabled={isSubmitting}
                    placeholder={t('contact.form.positionPlaceholder')}
                  />
                </div>
              </div>

              <div className="contact-form__field">
                <label htmlFor="consultationType">{t('contact.form.consultationType')}</label>
                <select
                  id="consultationType"
                  name="consultationType"
                  value={consultationType}
                  onChange={(event) => setField('consultationType', event.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="">{t('contact.form.selectOption')}</option>
                  <option value="consultoria-estrategica">{t('contact.form.strategicConsulting')}</option>
                  <option value="desarrollo-medida">{t('contact.form.customDevelopment')}</option>
                  <option value="data-ml">{t('contact.form.dataMl')}</option>
                  <option value="integracion-legacy">{t('contact.form.legacyIntegration')}</option>
                  <option value="automatizacion">{t('contact.form.automation')}</option>
                  <option value="agentes-ia">{t('contact.form.aiAgents')}</option>
                  <option value="cloud-devops">{t('contact.form.cloudDevops')}</option>
                  <option value="seguridad">{t('contact.form.security')}</option>
                  <option value="routeon">{t('contact.form.routeon')}</option>
                  <option value="dev-coach">{t('contact.form.devCoach')}</option>
                  <option value="otro">{t('contact.form.other')}</option>
                </select>
              </div>

              <div className="contact-form__field">
                <label htmlFor="message">{t('contact.form.message')} *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={message}
                  onChange={(event) => setField('message', event.target.value)}
                  required
                  disabled={isSubmitting}
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>
            </form>

            <div className="contact-form__feedback" role="status" aria-live="polite">
              {isSuccess && (
                <p className="contact-form__success">
                  {t('contact.form.success')}
                </p>
              )}
              {status === 'error' && error && <p className="contact-form__error">{error}</p>}
            </div>
          </div>

          <div className="contact-info">
            <h3>{t('contact.info.title')}</h3>
            <div className="contact-info__item">
              <a href="tel:+34647007280" className="contact-info__link">
                <span className="contact-info__icon">📞</span>
                <span className="contact-info__text">+34 647 007 280</span>
              </a>
            </div>
            <div className="contact-info__item">
              <a href={`mailto:${env.contactRecipient}`} className="contact-info__link">
                <span className="contact-info__icon">✉️</span>
                <span className="contact-info__text">{env.contactRecipient}</span>
              </a>
            </div>
            <div className="contact-info__item">
              <a href="https://wa.me/34647007280" target="_blank" rel="noreferrer" className="contact-info__link">
                <span className="contact-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="contact-info__text">{t('contact.info.whatsapp')}</span>
              </a>
            </div>
            <div className="contact-info__item">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  downloadWalletCard();
                }}
                className="contact-info__link"
              >
                <span className="contact-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4H4V6h16v2zm-1 8H5v-6h14v6z" fill="currentColor" />
                    <circle cx="8" cy="13" r="1.5" fill="currentColor" />
                    <path d="M11 12h5v1.5h-5V12z" fill="currentColor" />
                  </svg>
                </span>
                <span className="contact-info__text">{t('contact.info.downloadCard')}</span>
              </a>
            </div>
            <div className="contact-info__item">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  downloadWalletPass();
                }}
                className="contact-info__link"
              >
                <span className="contact-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 6h-2V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h4v2H9V4zm9 14H6V9h12v9z" fill="currentColor" />
                    <path d="M8 11h8v2H8v-2zm0 4h5v2H8v-2z" fill="currentColor" opacity="0.6" />
                  </svg>
                </span>
                <span className="contact-info__text">{t('contact.info.downloadWallet')}</span>
              </a>
            </div>
            <div className="contact-info__item">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  downloadiPhoneWalletPass();
                }}
                className="contact-info__link"
              >
                <span className="contact-info__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor" />
                  </svg>
                </span>
                <span className="contact-info__text">{t('contact.info.downloadWallet')}</span>
              </a>
            </div>
            <div className="contact-info__item">
              <a
                href="https://calendly.com/dev-cracks"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info__link"
              >
                <span className="contact-info__icon">📅</span>
                <span className="contact-info__text">{t('contact.info.title')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

