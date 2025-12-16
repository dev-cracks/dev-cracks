// Servicio para cachear imágenes de perfil del usuario en el navegador

const CACHE_PREFIX = 'user_image_cache_';
const CACHE_EXPIRY_PREFIX = 'user_image_cache_expiry_';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos

/**
 * Convierte una URL de imagen a base64 usando fetch (más robusto para CORS)
 */
const imageToBase64 = async (url: string): Promise<string> => {
  try {
    // Intentar con fetch primero (mejor para manejar errores)
    const response = await fetch(url, {
      mode: 'cors',
      credentials: 'omit'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64);
      };
      
      reader.onerror = () => {
        reject(new Error('Error al leer el blob'));
      };
      
      reader.readAsDataURL(blob);
    });
  } catch (fetchError) {
    // Si fetch falla (por CORS u otro error), intentar con Image
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      // Intentar sin crossOrigin primero
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto del canvas'));
          return;
        }
        
        try {
          ctx.drawImage(img, 0, 0);
          const base64 = canvas.toDataURL('image/jpeg', 0.8);
          resolve(base64);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => {
        // Si también falla con Image, rechazar
        reject(new Error('No se pudo cargar la imagen'));
      };
      
      img.src = url;
    });
  }
};

/**
 * Obtiene la clave del cache para un usuario
 */
const getCacheKey = (userId: string): string => {
  return `${CACHE_PREFIX}${userId}`;
};

/**
 * Obtiene la clave de expiración del cache para un usuario
 */
const getExpiryKey = (userId: string): string => {
  return `${CACHE_EXPIRY_PREFIX}${userId}`;
};

/**
 * Verifica si el cache está expirado
 */
const isCacheExpired = (userId: string): boolean => {
  const expiryKey = getExpiryKey(userId);
  const expiry = localStorage.getItem(expiryKey);
  
  if (!expiry) return true;
  
  const expiryTime = parseInt(expiry, 10);
  return Date.now() > expiryTime;
};

/**
 * Cachea la imagen del usuario
 */
export const cacheUserImage = async (userId: string, imageUrl: string): Promise<string | null> => {
  try {
    // Verificar si ya existe un cache válido
    if (!isCacheExpired(userId)) {
      const cached = getCachedUserImage(userId);
      if (cached) {
        return cached;
      }
    }
    
    // Intentar convertir la imagen a base64
    const base64Image = await imageToBase64(imageUrl);
    
    // Guardar en localStorage
    const cacheKey = getCacheKey(userId);
    const expiryKey = getExpiryKey(userId);
    const expiryTime = Date.now() + CACHE_DURATION;
    
    localStorage.setItem(cacheKey, base64Image);
    localStorage.setItem(expiryKey, expiryTime.toString());
    
    return base64Image;
  } catch (error) {
    console.warn('No se pudo cachear la imagen del usuario:', error);
    return null;
  }
};

/**
 * Obtiene la imagen cacheada del usuario
 */
export const getCachedUserImage = (userId: string): string | null => {
  if (isCacheExpired(userId)) {
    // Limpiar el cache expirado
    clearUserImageCache(userId);
    return null;
  }
  
  const cacheKey = getCacheKey(userId);
  return localStorage.getItem(cacheKey);
};

/**
 * Limpia el cache de imagen de un usuario
 */
export const clearUserImageCache = (userId: string): void => {
  const cacheKey = getCacheKey(userId);
  const expiryKey = getExpiryKey(userId);
  
  localStorage.removeItem(cacheKey);
  localStorage.removeItem(expiryKey);
};

/**
 * Limpia todo el cache de imágenes
 */
export const clearAllImageCache = (): void => {
  const keysToRemove: string[] = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (key.startsWith(CACHE_PREFIX) || key.startsWith(CACHE_EXPIRY_PREFIX))) {
      keysToRemove.push(key);
    }
  }
  
  keysToRemove.forEach(key => localStorage.removeItem(key));
};

/**
 * Obtiene la URL de imagen a usar (cacheada o original)
 */
export const getUserImageUrl = (userId: string, originalUrl?: string | null): string | null => {
  // Intentar obtener del cache primero
  const cached = getCachedUserImage(userId);
  if (cached) {
    return cached;
  }
  
  // Si no hay cache, devolver la URL original
  return originalUrl || null;
};

