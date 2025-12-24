import { env } from '../config/env';

export interface GravatarProfile {
  hash: string;
  requestHash?: string | null;
  profileUrl?: string | null;
  preferredUsername?: string | null;
  thumbnailUrl?: string | null;
  name?: string | null;
  displayName?: string | null;
  aboutMe?: string | null;
  currentLocation?: string | null;
  urls: GravatarUrl[];
  accounts: GravatarAccount[];
  photos: GravatarPhoto[];
  nameDetails: GravatarName[];
}

export interface GravatarUrl {
  value: string;
  title: string;
}

export interface GravatarAccount {
  domain: string;
  display?: string | null;
  url?: string | null;
  username?: string | null;
  verified?: boolean | null;
}

export interface GravatarPhoto {
  value: string;
  type: string;
}

export interface GravatarName {
  givenName: string;
  familyName: string;
  formatted: string;
}

const getAuthHeaders = async (accessToken?: string): Promise<HeadersInit> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  return headers;
};

/**
 * Obtiene el perfil de Gravatar del usuario actual
 * @param accessToken - Token de acceso opcional
 * @returns Perfil de Gravatar o null si no se encuentra
 */
export const getGravatarProfile = async (accessToken?: string): Promise<GravatarProfile | null> => {
  try {
    const headers = await getAuthHeaders(accessToken);
    const response = await fetch(`${env.apiBaseUrl}/users/me/gravatar-profile`, {
      method: 'GET',
      credentials: 'include',
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado');
      }
      if (response.status === 404) {
        return null; // Perfil no encontrado, no es un error
      }
      throw new Error(`Error al obtener perfil de Gravatar: ${response.statusText}`);
    }

    const profile = await response.json();
    return {
      hash: profile.hash || '',
      requestHash: profile.requestHash || null,
      profileUrl: profile.profileUrl || null,
      preferredUsername: profile.preferredUsername || null,
      thumbnailUrl: profile.thumbnailUrl || null,
      name: profile.name || null,
      displayName: profile.displayName || null,
      aboutMe: profile.aboutMe || null,
      currentLocation: profile.currentLocation || null,
      urls: profile.urls || [],
      accounts: profile.accounts || [],
      photos: profile.photos || [],
      nameDetails: profile.nameDetails || []
    };
  } catch (error) {
    console.error('Error al obtener perfil de Gravatar:', error);
    throw error;
  }
};

