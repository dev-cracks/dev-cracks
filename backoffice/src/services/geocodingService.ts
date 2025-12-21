// Servicio de geocodificación usando Nominatim API (OpenStreetMap)

export interface GeocodeResult {
  lat: number;
  lng: number;
  fullAddress: string;
  displayName: string;
}

export interface AddressSuggestion {
  displayName: string;
  lat: number;
  lng: number;
  fullAddress: string;
}

// Rate limiting: máximo 1 request por segundo
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 segundo

async function rateLimitedRequest(url: string): Promise<Response> {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
  return fetch(url);
}

/**
 * Geocodifica una dirección y retorna las coordenadas
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  if (!address || address.trim().length === 0) {
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(address.trim());
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&addressdetails=1`;
    
    const response = await rateLimitedRequest(url);
    
    if (!response.ok) {
      throw new Error(`Error en geocodificación: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || data.length === 0) {
      return null;
    }

    const result = data[0];
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    const fullAddress = result.display_name || address;

    return {
      lat,
      lng,
      fullAddress,
      displayName: result.display_name || address,
    };
  } catch (error) {
    console.error('[geocodingService] Error en geocodeAddress:', error);
    throw error;
  }
}

/**
 * Geocodificación inversa: convierte coordenadas en dirección
 */
export async function reverseGeocode(lat: number, lng: number): Promise<GeocodeResult | null> {
  if (isNaN(lat) || isNaN(lng)) {
    return null;
  }

  // Validar rango de coordenadas
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    throw new Error('Coordenadas fuera de rango válido');
  }

  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
    
    const response = await rateLimitedRequest(url);
    
    if (!response.ok) {
      throw new Error(`Error en geocodificación inversa: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || !data.address) {
      return null;
    }

    const fullAddress = data.display_name || `${lat}, ${lng}`;

    return {
      lat,
      lng,
      fullAddress,
      displayName: data.display_name || fullAddress,
    };
  } catch (error) {
    console.error('[geocodingService] Error en reverseGeocode:', error);
    throw error;
  }
}

/**
 * Busca sugerencias de direcciones para autocompletado
 */
export async function searchAddresses(query: string): Promise<AddressSuggestion[]> {
  if (!query || query.trim().length < 3) {
    return [];
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=5&addressdetails=1`;
    
    const response = await rateLimitedRequest(url);
    
    if (!response.ok) {
      throw new Error(`Error en búsqueda de direcciones: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => ({
      displayName: item.display_name,
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      fullAddress: item.display_name,
    }));
  } catch (error) {
    console.error('[geocodingService] Error en searchAddresses:', error);
    return [];
  }
}

