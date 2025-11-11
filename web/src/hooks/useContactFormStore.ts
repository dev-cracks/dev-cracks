import { create } from 'zustand';
import { sendContactEmail } from '../services/emailService';

type ContactStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactFormState {
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  error?: string;
  setField: (field: 'name' | 'email' | 'message', value: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}

export const useContactFormStore = create<ContactFormState>((set, get) => ({
  name: '',
  email: '',
  message: '',
  status: 'idle',
  error: undefined,
  setField: (field, value) =>
    set((state) => {
      const nextState: ContactFormState = {
        ...state,
        [field]: value,
        ...(state.status !== 'idle'
          ? {
              status: 'idle' as ContactStatus,
              error: undefined
            }
          : {})
      };
      return nextState;
    }),
  reset: () =>
    set({
      name: '',
      email: '',
      message: '',
      status: 'idle',
      error: undefined
    }),
  submit: async () => {
    const { name, email, message } = get();

    if (!name || !email || !message) {
      set({
        status: 'error',
        error: 'Completa todos los campos antes de enviar.'
      });
      return;
    }

    set({ status: 'loading', error: undefined });

    try {
      await sendContactEmail({ name, email, message });
      set({
        name: '',
        email: '',
        message: '',
        status: 'success',
        error: undefined
      });
    } catch (error) {
      set({
        status: 'error',
        error:
          error instanceof Error
            ? error.message
            : 'Ocurrió un error inesperado. Intenta nuevamente.'
      });
    }
  }
}));

