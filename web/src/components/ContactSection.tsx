import { FormEvent } from 'react';
import { useContactFormStore } from '../hooks/useContactFormStore';
import { env } from '../config/env';

export const ContactSection = () => {
  const { name, email, message, status, error, setField, submit } = useContactFormStore();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  const isSubmitting = status === 'loading';
  const isSuccess = status === 'success';

  return (
    <section id="contacto" className="contact">
      <div className="container">
        <div className="contact-header">
          <img src="/dev-cracks-logo.jpg" alt="Logo de Dev Cracks" className="contact-logo" />
          <h2>¡Conectemos! Estamos aquí para ayudarte</h2>
          <p>Tu idea merece convertirse en realidad. Hablemos y descubramos juntos cómo podemos hacerlo posible.</p>
        </div>

        <div className="contact-content">
          <div className="contact-form">
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="name">Nombre:</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setField('name', event.target.value)}
                required
                disabled={isSubmitting}
              />

              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setField('email', event.target.value)}
                required
                disabled={isSubmitting}
              />

              <label htmlFor="message">Mensaje:</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={message}
                onChange={(event) => setField('message', event.target.value)}
                required
                disabled={isSubmitting}
              />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando…' : 'Enviar Mensaje'}
              </button>
            </form>

            <div className="contact-form__feedback" role="status" aria-live="polite">
              {isSuccess && <p className="contact-form__success">¡Gracias! Revisaremos tu mensaje en breve.</p>}
              {status === 'error' && error && <p className="contact-form__error">{error}</p>}
            </div>
          </div>

          <div className="contact-info">
            <h3>Información de Contacto</h3>
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
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="contact-info__text">WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

