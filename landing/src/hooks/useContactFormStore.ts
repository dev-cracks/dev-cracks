import { create } from 'zustand';
import { env } from '../config/env';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  position: string;
  consultationType: string;
  message: string;
  status: FormStatus;
  error: string | null;
  setField: (field: string, value: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

export const useContactFormStore = create<ContactFormState>((set, get) => ({
  name: '',
  email: '',
  company: '',
  position: '',
  consultationType: '',
  message: '',
  status: 'idle',
  error: null,

  setField: (field: string, value: string) => {
    set({ [field]: value, error: null });
  },

  reset: () => {
    set({
      name: '',
      email: '',
      company: '',
      position: '',
      consultationType: '',
      message: '',
      status: 'idle',
      error: null
    });
  },

  submit: async () => {
    const { name, email, company, position, consultationType, message } = get();

    // Validación básica
    if (!name || !email || !message) {
      set({ status: 'error', error: 'Por favor, completa todos los campos requeridos.' });
      return;
    }

    set({ status: 'loading', error: null });

    try {
      const response = await fetch(`${env.apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          company,
          position,
          consultationType,
          message
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error al enviar el mensaje' }));
        throw new Error(errorData.message || 'Error al enviar el mensaje');
      }

      set({ status: 'success', error: null });
      
      // Resetear el formulario después de 3 segundos
      setTimeout(() => {
        get().reset();
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar el mensaje';
      set({ status: 'error', error: errorMessage });
    }
  }
}));

