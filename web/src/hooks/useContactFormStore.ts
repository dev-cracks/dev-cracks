import { create } from 'zustand';
import { sendContactEmail } from '../services/emailService';

type ContactStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  position: string;
  consultationType: string;
  message: string;
  status: ContactStatus;
  error?: string;
  setField: (field: 'name' | 'email' | 'company' | 'position' | 'consultationType' | 'message', value: string) => void;
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
      company: '',
      position: '',
      consultationType: '',
      message: '',
      status: 'idle',
      error: undefined
    }),
  submit: async () => {
    const { name, email, message } = get();

    if (!name || !email || !message) {
      set({
        status: 'error',
        error: 'Completa todos los campos obligatorios antes de enviar.'
      });
      return;
    }

    set({ status: 'loading', error: undefined });

    try {
      const { company, position, consultationType } = get();
      const fullMessage = `Empresa: ${company || 'No especificada'}\nCargo: ${position || 'No especificado'}\nTipo de Consultoría: ${consultationType || 'No especificado'}\n\nMensaje:\n${message}`;
      await sendContactEmail({ name, email, message: fullMessage });
      set({
        name: '',
        email: '',
        company: '',
        position: '',
        consultationType: '',
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
            : 'An unexpected error occurred. Please try again.'
      });
    }
  }
}));

