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
    try {
      const token = await this.getAccessToken();
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout de 10 segundos

      let response: Response;
      try {
        response = await fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          headers,
          credentials: 'include',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        
        // Manejar errores de red (servidor no disponible, CORS, etc.)
        if (fetchError.name === 'AbortError') {
          const error: ApiError = {
            message: 'Request timeout',
            statusCode: 408,
          };
          throw error;
        }
        
        // Error de red (servidor no disponible)
        const error: ApiError = {
          message: 'Network error: Unable to connect to the server',
          statusCode: undefined,
        };
        throw error;
      }

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
    } catch (error: any) {
      // Si es un error de ApiError, re-lanzarlo
      if (error.statusCode !== undefined || error.message) {
        throw error;
      }
      
      // Para otros errores, convertirlos en ApiError
      const apiError: ApiError = {
        message: error.message || 'Unknown error occurred',
        statusCode: undefined,
      };
      throw apiError;
    }
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

