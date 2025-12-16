// Servicio para gestionar datos del usuario y su historial de cambios

export interface UserData {
  email: string;
  phone: string;
  updatedAt: string;
}

export interface HistoryEntry {
  id: string;
  field: 'email' | 'phone';
  oldValue: string;
  newValue: string;
  changedAt: string;
  changedBy: string; // userId
}

const USER_DATA_PREFIX = 'user_data_';
const USER_HISTORY_PREFIX = 'user_history_';

/**
 * Obtiene la clave de almacenamiento para los datos del usuario
 */
const getUserDataKey = (userId: string): string => {
  return `${USER_DATA_PREFIX}${userId}`;
};

/**
 * Obtiene la clave de almacenamiento para el historial del usuario
 */
const getUserHistoryKey = (userId: string): string => {
  return `${USER_HISTORY_PREFIX}${userId}`;
};

/**
 * Obtiene los datos del usuario
 */
export const getUserData = (userId: string): UserData | null => {
  try {
    const key = getUserDataKey(userId);
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data) as UserData;
  } catch (error) {
    console.error('Error al obtener datos del usuario:', error);
    return null;
  }
};

/**
 * Guarda los datos del usuario
 */
export const saveUserData = (userId: string, data: Partial<UserData>): UserData => {
  const existing = getUserData(userId);
  const now = new Date().toISOString();
  
  const updated: UserData = {
    email: data.email ?? existing?.email ?? '',
    phone: data.phone ?? existing?.phone ?? '',
    updatedAt: now
  };

  // Detectar cambios y crear entradas de historial
  if (existing) {
    const history: HistoryEntry[] = getHistory(userId);
    
    if (data.email && data.email !== existing.email) {
      history.push({
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        field: 'email',
        oldValue: existing.email,
        newValue: data.email,
        changedAt: now,
        changedBy: userId
      });
    }
    
    if (data.phone !== undefined && data.phone !== existing.phone) {
      history.push({
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        field: 'phone',
        oldValue: existing.phone || '',
        newValue: data.phone || '',
        changedAt: now,
        changedBy: userId
      });
    }
    
    // Guardar historial actualizado
    const historyKey = getUserHistoryKey(userId);
    localStorage.setItem(historyKey, JSON.stringify(history));
  } else {
    // Si es la primera vez, crear historial inicial
    const history: HistoryEntry[] = [];
    if (updated.email) {
      history.push({
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        field: 'email',
        oldValue: '',
        newValue: updated.email,
        changedAt: now,
        changedBy: userId
      });
    }
    if (updated.phone) {
      history.push({
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        field: 'phone',
        oldValue: '',
        newValue: updated.phone,
        changedAt: now,
        changedBy: userId
      });
    }
    const historyKey = getUserHistoryKey(userId);
    localStorage.setItem(historyKey, JSON.stringify(history));
  }

  // Guardar datos actualizados
  const key = getUserDataKey(userId);
  localStorage.setItem(key, JSON.stringify(updated));

  return updated;
};

/**
 * Obtiene el historial de cambios del usuario
 */
export const getHistory = (userId: string): HistoryEntry[] => {
  try {
    const key = getUserHistoryKey(userId);
    const data = localStorage.getItem(key);
    if (!data) return [];
    const history = JSON.parse(data) as HistoryEntry[];
    // Ordenar por fecha más reciente primero
    return history.sort((a, b) => 
      new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime()
    );
  } catch (error) {
    console.error('Error al obtener historial:', error);
    return [];
  }
};

/**
 * Inicializa los datos del usuario con el email de Auth0
 */
export const initializeUserData = (userId: string, auth0Email: string): UserData => {
  const existing = getUserData(userId);
  
  // Si ya existe, no sobrescribir
  if (existing) {
    return existing;
  }
  
  // Crear datos iniciales
  return saveUserData(userId, {
    email: auth0Email,
    phone: ''
  });
};

/**
 * Limpia los datos del usuario (al cerrar sesión)
 */
export const clearUserData = (userId: string): void => {
  const dataKey = getUserDataKey(userId);
  const historyKey = getUserHistoryKey(userId);
  
  localStorage.removeItem(dataKey);
  localStorage.removeItem(historyKey);
};

