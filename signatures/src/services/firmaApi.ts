import { API_BASE_URL } from '../config/env';

export interface Workspace {
  firmaWorkspaceId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  tenantId: string;
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

export interface SigningRequestJwtToken {
  jwt: string;
  jwt_id: string;
  expires_at: string;
  signing_request_id: string;
  created_at: string;
}

export interface SigningRequest {
  id: string;
  tenantId: string;
  firmaSigningRequestId: string;
  templateId?: string;
  status: string;
  envelopeId?: string;
  signedDocumentUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignerDto {
  name: string;
  email: string;
  role: string;
}

export interface CreateSigningRequestRequest {
  templateId?: string;
  documentUrl?: string;
  documentFile?: string;
  fileName?: string;
  signers?: SignerDto[];
  message?: string;
  expirationDate?: string;
  sendEmail?: boolean;
}

export interface TemplateField {
  id: string;
  fieldName: string;
  fieldType: string;
  required: boolean;
  positionX?: number;
  positionY?: number;
  pageNumber: number;
  width?: number;
  height?: number;
  variableName?: string;
  dropdownOptions?: string[];
  dateDefault?: string;
  dateSigningDefault: boolean;
  multiGroupId?: string;
  formatRules?: Record<string, any>;
  validationRules?: Record<string, any>;
  recipientId?: string;
  readOnly: boolean;
  readOnlyValue?: string;
  prefilledData?: string;
}

// Helper para obtener el nombre del campo
export function getFieldDisplayName(field: TemplateField): string {
  return field.fieldName || field.variableName || field.id;
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
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/templates/all`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error al listar todas las plantillas: ${response.statusText}`);
    }

    return await response.json();
  }

  async listTemplates(): Promise<Template[]> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/templates`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error al listar plantillas: ${response.statusText}`);
    }

    return await response.json();
  }

  async getTemplateFields(templateId: string): Promise<TemplateField[]> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/templates/${templateId}/fields`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error al obtener campos de la plantilla: ${response.statusText}`);
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

  async listSigningRequests(): Promise<SigningRequest[]> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/signing-requests`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error al listar signing requests: ${response.statusText}`);
    }

    return await response.json();
  }

  async getSigningRequest(signingRequestId: string): Promise<SigningRequest> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/signing-requests/${signingRequestId}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error al obtener signing request: ${response.statusText}`);
    }

    return await response.json();
  }

  async createSigningRequest(request: CreateSigningRequestRequest): Promise<SigningRequest> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/signing-requests`, {
      method: 'POST',
      headers,
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Error al crear signing request: ${response.statusText}`);
    }

    return await response.json();
  }

  async generateSigningRequestJwt(signingRequestId: string): Promise<SigningRequestJwtToken> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseUrl}/signing-requests/${signingRequestId}/jwt/editor`, {
      method: 'POST',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error al generar JWT para signing request: ${response.statusText}`);
    }

    const data = await response.json();
    // Convertir la respuesta del backend al formato esperado
    return {
      jwt: data.jwt,
      jwt_id: data.jwtId || '',
      expires_at: data.expiresAt || new Date().toISOString(),
      signing_request_id: signingRequestId,
      created_at: new Date().toISOString(),
    };
  }
}

export const firmaApi = new FirmaApiService();

