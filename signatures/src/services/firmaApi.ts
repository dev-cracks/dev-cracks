import { API_BASE_URL } from '../config/env';
import { useAuth } from '../hooks/useAuth';

export interface Workspace {
  firmaWorkspaceId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  firmaTemplateId: string;
  name: string;
  documentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JwtToken {
  jwt: string;
  expiresAt: string;
  jwtId: string;
}

class FirmaApiService {
  private baseUrl: string;
  private getAccessToken: (() => Promise<string | undefined>) | null = null;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/firma`;
  }

  // Método para establecer el proveedor de tokens (debe ser llamado desde un componente React)
  setAccessTokenProvider(provider: () => Promise<string | undefined>) {
    this.getAccessToken = provider;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.getAccessToken) {
      const token = await this.getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async listWorkspaces(): Promise<Workspace[]> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/workspaces`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error al listar workspaces: ${response.statusText}`);
    }

    return await response.json();
  }

  async listTemplatesByWorkspace(workspaceId: string): Promise<Template[]> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/workspaces/${workspaceId}/templates`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error al listar templates: ${response.statusText}`);
    }

    return await response.json();
  }

  async generateTemplateJwt(firmaTemplateId: string, workspaceId: string): Promise<JwtToken> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${this.baseUrl}/templates/firma/${firmaTemplateId}/jwt?workspaceId=${encodeURIComponent(workspaceId)}`,
      {
        method: 'POST',
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Error al generar JWT: ${response.statusText}`);
    }

    return await response.json();
  }
}

export const firmaApi = new FirmaApiService();

