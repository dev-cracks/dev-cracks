import { apiBaseUrl } from '../config/env';

export interface ApiError {
  message: string;
  statusCode?: number;
}

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAccessToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      // Intentar obtener el mensaje de error del cuerpo de la respuesta
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData: any = null;
      
      try {
        errorData = await response.json();
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Si no se puede parsear JSON, usar el mensaje por defecto
      }

      const error: ApiError = {
        message: errorMessage,
        statusCode: response.status,
      };
      
      throw error;
    }

    // Si la respuesta no tiene contenido, retornar void
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  async getAccessToken(): Promise<string | null> {
    // Este método será sobrescrito por el hook useAuth
    return null;
  }

  setAccessTokenProvider(provider: () => Promise<string | undefined>) {
    this.getAccessToken = async () => {
      const token = await provider();
      return token || null;
    };
  }
}

export const apiService = new ApiService();

