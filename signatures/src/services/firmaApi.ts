import { API_BASE_URL } from '../config/env';

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
  workspaceId?: string;
  workspaceName?: string;
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

  // Método para verificar si el proveedor de tokens está configurado
  isAccessTokenProviderReady(): boolean {
    return this.getAccessToken !== null;
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

  async listAllTemplates(): Promise<Template[]> {
    // Primero obtener todos los workspaces
    const workspaces = await this.listWorkspaces();
    
    // Luego obtener todas las plantillas de cada workspace
    const allTemplatesPromises = workspaces.map(async (workspace) => {
      try {
        const templates = await this.listTemplatesByWorkspace(workspace.firmaWorkspaceId);
        // Agregar información del workspace a cada plantilla
        return templates.map(template => ({
          ...template,
          workspaceId: workspace.firmaWorkspaceId,
          workspaceName: workspace.name,
        }));
      } catch (error) {
        // Si falla al obtener plantillas de un workspace, continuar con los demás
        console.warn(`Error al obtener plantillas del workspace ${workspace.name}:`, error);
        return [];
      }
    });

    const allTemplatesArrays = await Promise.all(allTemplatesPromises);
    // Aplanar el array de arrays en un solo array
    return allTemplatesArrays.flat();
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

