import { apiBaseUrl } from '../config/env';

export interface ApiError {
  message: string;
  statusCode?: number;
}

export class ApiService {
  private baseUrl: string;
  private retryAttempts: Map<string, number> = new Map();
  private readonly MAX_RETRIES = 2; // Maximum 2 attempts (first + 1 retry)

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
    // Only retry on network errors or timeouts (without statusCode) or 5xx errors
    return statusCode === undefined || (statusCode >= 500 && statusCode < 600);
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    retryCount: number = 0
  ): Promise<T> {
    // Logging for debugging - show stack trace to identify origin
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
      // Longer timeout in development for debugging (10 minutes), 10 seconds in production
      const timeoutMs = import.meta.env.DEV ? 600000 : 10000; // 10 minutes in dev, 10 seconds in prod
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
        
        // Handle network errors (server unavailable, CORS, etc.)
        if (fetchError.name === 'AbortError') {
          const error: ApiError = {
            message: 'Request timeout',
            statusCode: 408,
          };
          throw error;
        }
        
        // Network error (server unavailable)
        const error: ApiError = {
          message: 'Network error: Unable to connect to the server',
          statusCode: undefined,
        };
        throw error;
      }

      if (!response.ok) {
        // Try to get error message from response body
        let errorMessage = `HTTP error! status: ${response.status}`;
        let errorData: any = null;
        
        try {
          errorData = await response.json();
          if (errorData?.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // If JSON cannot be parsed, use default message
        }

        const error: ApiError = {
          message: errorMessage,
          statusCode: response.status,
        };
        
        throw error;
      }

      // If response has no content, return void
      if (response.status === 204) {
        return undefined as T;
      }

      return response.json();
      } catch (error: any) {
      // If it's an ApiError, check if we should retry
      if (error.statusCode !== undefined || error.message) {
        const apiError = error as ApiError;
        
        // Check if we should retry
        if (this.shouldRetry(apiError.statusCode, retryCount)) {
          const retryKey = this.getRetryKey(endpoint, options);
          const currentAttempts = this.retryAttempts.get(retryKey) || 0;
          
          if (currentAttempts < this.MAX_RETRIES) {
            this.retryAttempts.set(retryKey, currentAttempts + 1);
            console.log(`[apiService] Retrying ${endpoint} (attempt ${currentAttempts + 1}/${this.MAX_RETRIES})`);
            
            // Wait a bit before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, currentAttempts), 5000)));
            
            // Clean up counter after some time to avoid accumulation
            setTimeout(() => {
              this.retryAttempts.delete(retryKey);
            }, 60000); // Clean up after 1 minute
            
            // Retry
            return this.request<T>(endpoint, options, retryCount + 1);
          }
        }
        
        // Clean up retry counter
        const retryKey = this.getRetryKey(endpoint, options);
        this.retryAttempts.delete(retryKey);
        
        throw error;
      }
      
      // For other errors, convert them to ApiError
      const apiError: ApiError = {
        message: error.message || 'Unknown error occurred',
        statusCode: undefined,
      };
      
      // Check if we should retry unknown errors (probably network errors)
      if (this.shouldRetry(undefined, retryCount)) {
        const retryKey = this.getRetryKey(endpoint, options);
        const currentAttempts = this.retryAttempts.get(retryKey) || 0;
        
        if (currentAttempts < this.MAX_RETRIES) {
          this.retryAttempts.set(retryKey, currentAttempts + 1);
          console.log(`[apiService] Retrying ${endpoint} (attempt ${currentAttempts + 1}/${this.MAX_RETRIES})`);
          
          // Wait a bit before retrying
          await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, currentAttempts), 5000)));
          
          // Clean up counter after some time
          setTimeout(() => {
            this.retryAttempts.delete(retryKey);
          }, 60000);
          
          // Retry
          return this.request<T>(endpoint, options, retryCount + 1);
        }
      }
      
      // Clean up retry counter
      const retryKey = this.getRetryKey(endpoint, options);
      this.retryAttempts.delete(retryKey);
      
      throw apiError;
    }
  }

  async getAccessToken(): Promise<string | null> {
    // This method will be overridden by the useAuth hook
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

