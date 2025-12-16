import { useState, useEffect } from 'react';
import { getUserContactData, updateUserContactData, UserData } from '../services/userDataApiService';
import { useAuth } from '../hooks/useAuth';

interface UserDataEditorProps {
  userId: string;
  initialEmail: string;
  onUpdate: (data: { contactEmail: string | null; phone: string | null }) => void;
}

export const UserDataEditor = ({ userId, initialEmail, onUpdate }: UserDataEditorProps) => {
  const { getAccessToken } = useAuth();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        const token = await getAccessToken();
        const data = await getUserContactData(token);
        
        if (data) {
          setEmail(data.contactEmail || initialEmail);
          setPhone(data.phone || '');
        } else {
          setEmail(initialEmail);
          setPhone('');
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
        // En caso de error, usar valores por defecto
        setEmail(initialEmail);
        setPhone('');
      }
    };
    
    loadData();
  }, [userId, initialEmail]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    // Permitir números, espacios, guiones, paréntesis y el símbolo +
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 8;
  };

  const handleSave = async () => {
    setError(null);

    // Validar email
    if (!email.trim()) {
      setError('El correo electrónico es requerido');
      return;
    }

    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido');
      return;
    }

    // Validar teléfono si está presente
    if (phone && !validatePhone(phone)) {
      setError('El número de teléfono no es válido');
      return;
    }

    setIsSaving(true);

    try {
      const token = await getAccessToken();
      const updated = await updateUserContactData({
        contactEmail: email.trim(),
        phone: phone.trim()
      }, token);

      setEmail(updated.contactEmail || initialEmail);
      setPhone(updated.phone || '');
      onUpdate(updated);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar los datos. Por favor, intenta de nuevo.';
      setError(errorMessage);
      console.error('Error al guardar datos:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = async () => {
    // Restaurar valores originales
    try {
      const token = await getAccessToken();
      const data = await getUserContactData(token);
      
      if (data) {
        setEmail(data.contactEmail || initialEmail);
        setPhone(data.phone || '');
      } else {
        setEmail(initialEmail);
        setPhone('');
      }
    } catch (error) {
      // En caso de error, usar valores por defecto
      setEmail(initialEmail);
      setPhone('');
    }
    
    setIsEditing(false);
    setError(null);
  };

  if (!isEditing) {
    return (
      <div className="user-data-editor">
        <div className="user-data-editor__fields">
          <div className="user-data-editor__field">
            <label className="user-data-editor__label">Correo Electrónico</label>
            <div className="user-data-editor__value">{email || 'No especificado'}</div>
          </div>
          <div className="user-data-editor__field">
            <label className="user-data-editor__label">Número de Móvil</label>
            <div className="user-data-editor__value">{phone || 'No especificado'}</div>
          </div>
        </div>
        <button
          className="user-data-editor__edit-btn"
          onClick={() => setIsEditing(true)}
        >
          Editar Datos
        </button>
      </div>
    );
  }

  return (
    <div className="user-data-editor">
      {error && (
        <div className="user-data-editor__error">
          {error}
        </div>
      )}
      <div className="user-data-editor__fields">
        <div className="user-data-editor__field">
          <label className="user-data-editor__label" htmlFor="email">
            Correo Electrónico *
          </label>
          <input
            id="email"
            type="email"
            className="user-data-editor__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            disabled={isSaving}
          />
        </div>
        <div className="user-data-editor__field">
          <label className="user-data-editor__label" htmlFor="phone">
            Número de Móvil
          </label>
          <input
            id="phone"
            type="tel"
            className="user-data-editor__input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+34 600 000 000"
            disabled={isSaving}
          />
        </div>
      </div>
      <div className="user-data-editor__actions">
        <button
          className="user-data-editor__btn user-data-editor__btn--cancel"
          onClick={handleCancel}
          disabled={isSaving}
        >
          Cancelar
        </button>
        <button
          className="user-data-editor__btn user-data-editor__btn--save"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </div>
  );
};

