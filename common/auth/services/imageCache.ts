// Servicio para cachear imágenes de perfil del usuario en el navegador

const CACHE_PREFIX = 'user_image_cache_';
const CACHE_EXPIRY_PREFIX = 'user_image_cache_expiry_';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;

const imageToBase64 = async (url: string): Promise<string> => {
  try {
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
    return new Promise((resolve, reject) => {
      const img = new Image();
      
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
        reject(new Error('No se pudo cargar la imagen'));
      };
      
      img.src = url;
    });
  }
};

const getCacheKey = (userId: string): string => {
  return `${CACHE_PREFIX}${userId}`;
};

const getExpiryKey = (userId: string): string => {
  return `${CACHE_EXPIRY_PREFIX}${userId}`;
};

const isCacheExpired = (userId: string): boolean => {
  const expiryKey = getExpiryKey(userId);
  const expiry = localStorage.getItem(expiryKey);
  
  if (!expiry) return true;
  
  const expiryTime = parseInt(expiry, 10);
  return Date.now() > expiryTime;
};

export const cacheUserImage = async (userId: string, imageUrl: string): Promise<string | null> => {
  try {
    if (!isCacheExpired(userId)) {
      const cached = getCachedUserImage(userId);
      if (cached) {
        return cached;
      }
    }
    
    const base64Image = await imageToBase64(imageUrl);
    
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

export const getCachedUserImage = (userId: string): string | null => {
  if (isCacheExpired(userId)) {
    clearUserImageCache(userId);
    return null;
  }
  
  const cacheKey = getCacheKey(userId);
  return localStorage.getItem(cacheKey);
};

export const clearUserImageCache = (userId: string): void => {
  const cacheKey = getCacheKey(userId);
  const expiryKey = getExpiryKey(userId);
  
  localStorage.removeItem(cacheKey);
  localStorage.removeItem(expiryKey);
};

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

export const getUserImageUrl = (userId: string, originalUrl?: string | null): string | null => {
  const cached = getCachedUserImage(userId);
  if (cached) {
    return cached;
  }
  
  return originalUrl || null;
};

