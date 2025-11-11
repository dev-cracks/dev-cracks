import { FormEvent } from 'react';
import { useContactFormStore } from '../hooks/useContactFormStore';

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
        <h2>¡Hablemos de tu Próximo Gran Proyecto!</h2>
        <p>¿Listo para llevar tu idea al siguiente nivel? Contáctanos y descubre cómo Dev Cracks puede ayudarte a construir el futuro.</p>

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
      </div>
    </section>
  );
};

