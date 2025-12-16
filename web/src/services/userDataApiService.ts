import { env } from '../config/env';

export interface UserData {
  contactEmail: string | null;
  phone: string | null;
}

export interface ChangeHistoryEntry {
  id: string;
  userId: string;
  field: string;
  oldValue: string | null;
  newValue: string | null;
  changedAt: string;
}

/**
 * Helper to get headers with Auth0 token
 */
const getAuthHeaders = async (accessToken?: string): Promise<HeadersInit> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
    console.log('[userDataApiService] Token present, Authorization header set:', 
      `Bearer ${accessToken.substring(0, 20)}...`);
  } else {
    console.warn('[userDataApiService] No access token provided!');
  }
  
  return headers;
};

/**
 * Obtiene los datos de contacto del usuario actual
 */
export const getUserContactData = async (accessToken?: string): Promise<UserData | null> => {
  try {
    const headers = await getAuthHeaders(accessToken);
    const response = await fetch(`${env.apiBaseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado');
      }
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }

    const user = await response.json();
    return {
      contactEmail: user.contactEmail || null,
      phone: user.phone || null
    };
  } catch (error) {
    console.error('Error al obtener datos de contacto:', error);
    throw error;
  }
};

/**
 * Actualiza los datos de contacto del usuario
 */
export const updateUserContactData = async (data: UserData, accessToken?: string): Promise<UserData> => {
  try {
    const headers = await getAuthHeaders(accessToken);
    const response = await fetch(`${env.apiBaseUrl}/users/me/contact-data`, {
      method: 'PUT',
      credentials: 'include',
      headers,
      body: JSON.stringify({
        contactEmail: data.contactEmail || null,
        phone: data.phone || null
      })
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado');
      }
      if (response.status === 404) {
        throw new Error('Usuario no encontrado');
      }
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || `Error al actualizar datos: ${response.statusText}`);
    }

    const updated = await response.json();
    return {
      contactEmail: updated.contactEmail || null,
      phone: updated.phone || null
    };
  } catch (error) {
    console.error('Error al actualizar datos de contacto:', error);
    throw error;
  }
};

/**
 * Obtiene el historial de cambios del usuario
 */
export const getChangeHistory = async (accessToken?: string): Promise<ChangeHistoryEntry[]> => {
  try {
    const headers = await getAuthHeaders(accessToken);
    const response = await fetch(`${env.apiBaseUrl}/users/me/change-history`, {
      method: 'GET',
      credentials: 'include',
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado');
      }
      throw new Error(`Error al obtener historial: ${response.statusText}`);
    }

    const history = await response.json();
    return history.map((entry: any) => ({
      id: entry.id,
      userId: entry.userId,
      field: entry.field,
      oldValue: entry.oldValue || null,
      newValue: entry.newValue || null,
      changedAt: entry.changedAt
    }));
  } catch (error) {
    console.error('Error al obtener historial:', error);
    throw error;
  }
};

