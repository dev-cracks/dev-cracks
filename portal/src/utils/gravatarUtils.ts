/**
 * Utilidades para trabajar con Gravatar
 * Genera hashes SHA256 de emails y construye URLs de avatares
 */

/**
 * Genera el hash SHA256 de un email para usar con Gravatar
 * El email debe estar en minúsculas y sin espacios según la especificación de Gravatar
 * @param email - Email del usuario
 * @returns Hash SHA256 en hexadecimal
 */
export async function getGravatarHash(email: string): Promise<string> {
  if (!email) {
    throw new Error('Email is required');
  }

  // Normalizar email: trim y lowercase (ambos pasos son requeridos por Gravatar)
  const normalizedEmail = email.trim().toLowerCase();

  // Convertir el email a bytes usando TextEncoder
  const encoder = new TextEncoder();
  const data = encoder.encode(normalizedEmail);

  // Generar hash SHA256 usando Web Crypto API
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // Convertir el buffer a array de bytes
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // Convertir a string hexadecimal
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

/**
 * Construye la URL del avatar de Gravatar
 * @param email - Email del usuario
 * @param size - Tamaño opcional del avatar (por defecto 80)
 * @returns URL del avatar de Gravatar
 */
export async function getGravatarAvatarUrl(email: string, size: number = 80): Promise<string> {
  const hash = await getGravatarHash(email);
  return `https://0.gravatar.com/avatar/${hash}?s=${size}&d=404`;
}

/**
 * Versión síncrona usando caché en localStorage para evitar recalcular hashes
 * Útil cuando ya se tiene el hash cacheado
 * @param email - Email del usuario
 * @param size - Tamaño opcional del avatar (por defecto 80)
 * @returns URL del avatar de Gravatar o null si no se puede generar
 */
export function getGravatarAvatarUrlSync(email: string, size: number = 80): string | null {
  if (!email) {
    return null;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const cacheKey = `gravatar_hash_${normalizedEmail}`;

  // Intentar obtener del caché
  try {
    const cachedHash = localStorage.getItem(cacheKey);
    if (cachedHash) {
      return `https://0.gravatar.com/avatar/${cachedHash}?s=${size}&d=404`;
    }
  } catch {
    // Si localStorage no está disponible, continuar sin caché
  }

  // Si no hay caché, retornar null (el componente deberá usar la versión async)
  return null;
}

/**
 * Guarda el hash en caché para uso futuro
 * @param email - Email del usuario
 * @param hash - Hash SHA256 del email
 */
export function cacheGravatarHash(email: string, hash: string): void {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const cacheKey = `gravatar_hash_${normalizedEmail}`;
    localStorage.setItem(cacheKey, hash);
  } catch {
    // Silenciar errores de localStorage (puede estar deshabilitado)
  }
}

