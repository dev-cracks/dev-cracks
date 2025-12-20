import { apiBaseUrl } from '../config/env';

export interface ApiError {
  message: string;
  statusCode?: number;
}

export class ApiService {
  private baseUrl: string;
  private retryAttempts: Map<string, number> = new Map();
  private readonly MAX_RETRIES = 2; // Máximo 2 intentos (primero + 1 reintento)

  constructor(baseUrl: string = apiBaseUrl) {
    this.baseUrl = baseUrl;
  }

  private getRetryKey(endpoint: string, options: RequestInit): string {
    return `${options.method || 'GET'}:${endpoint}`;
  }

  private shouldRetry(statusCode?: number, attempt: number): boolean {
    if (attempt >= this.MAX_RETRIES) {
      return false;
    }
    // Solo reintentar en errores de red o timeouts (sin statusCode) o errores 5xx
    return statusCode === undefined || (statusCode >= 500 && statusCode < 600);
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount: number = 0
  ): Promise<T> {
    // Logging para depuración - mostrar stack trace para identificar origen
    const stackTrace = new Error().stack;
    const callerInfo = stackTrace?.split('\n')[2]?.trim() || 'unknown';
    console.log(`[apiService] Request: ${options.method || 'GET'} ${endpoint}`, {
      caller: callerInfo,
      timestamp: new Date().toISOString()
    });
    
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
      // Timeout más largo en desarrollo para depuración (10 minutos), 10 segundos en producción
      const timeoutMs = import.meta.env.DEV ? 600000 : 10000; // 10 minutos en dev, 10 segundos en prod
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      let response: Response;
      try {
        const startTime = Date.now();
        response = await fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          headers,
          credentials: 'include',
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        const duration = Date.now() - startTime;
        console.log(`[apiService] Response: ${response.status} ${endpoint} (${duration}ms)`);
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
      // Si es un error de ApiError, verificar si debemos reintentar
      if (error.statusCode !== undefined || error.message) {
        const apiError = error as ApiError;
        
        // Verificar si debemos reintentar
        if (this.shouldRetry(apiError.statusCode, retryCount)) {
          const retryKey = this.getRetryKey(endpoint, options);
          const currentAttempts = this.retryAttempts.get(retryKey) || 0;
          
          if (currentAttempts < this.MAX_RETRIES) {
            this.retryAttempts.set(retryKey, currentAttempts + 1);
            console.log(`[apiService] Reintentando ${endpoint} (intento ${currentAttempts + 1}/${this.MAX_RETRIES})`);
            
            // Esperar un poco antes de reintentar (backoff exponencial)
            await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, currentAttempts), 5000)));
            
            // Limpiar el contador después de un tiempo para evitar acumulación
            setTimeout(() => {
              this.retryAttempts.delete(retryKey);
            }, 60000); // Limpiar después de 1 minuto
            
            // Reintentar
            return this.request<T>(endpoint, options, retryCount + 1);
          }
        }
        
        // Limpiar el contador de intentos
        const retryKey = this.getRetryKey(endpoint, options);
        this.retryAttempts.delete(retryKey);
        
        throw error;
      }
      
      // Para otros errores, convertirlos en ApiError
      const apiError: ApiError = {
        message: error.message || 'Unknown error occurred',
        statusCode: undefined,
      };
      
      // Verificar si debemos reintentar errores desconocidos (probablemente de red)
      if (this.shouldRetry(undefined, retryCount)) {
        const retryKey = this.getRetryKey(endpoint, options);
        const currentAttempts = this.retryAttempts.get(retryKey) || 0;
        
        if (currentAttempts < this.MAX_RETRIES) {
          this.retryAttempts.set(retryKey, currentAttempts + 1);
          console.log(`[apiService] Reintentando ${endpoint} (intento ${currentAttempts + 1}/${this.MAX_RETRIES})`);
          
          // Esperar un poco antes de reintentar
          await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, currentAttempts), 5000)));
          
          // Limpiar el contador después de un tiempo
          setTimeout(() => {
            this.retryAttempts.delete(retryKey);
          }, 60000);
          
          // Reintentar
          return this.request<T>(endpoint, options, retryCount + 1);
        }
      }
      
      // Limpiar el contador de intentos
      const retryKey = this.getRetryKey(endpoint, options);
      this.retryAttempts.delete(retryKey);
      
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

