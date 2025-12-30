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

// Recipient interface para el nuevo formato de firma.dev
export interface Recipient {
  id?: string; // Para actualizaciones
  first_name: string;
  last_name: string;
  email: string;
  designation: 'Signer' | 'CC' | 'Approver';
  order?: number;
  phone_number?: string;
  street_address?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country?: string;
  title?: string;
  company?: string;
  custom_fields?: Record<string, any>;
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

// Request para crear signing request directamente en firma.dev
export interface CreateFirmaSigningRequestRequest {
  template_id: string;
  identificador: string;
  creation_source?: string;
  recipients: Recipient[];
}

// Response de firma.dev al crear signing request
export interface FirmaSigningRequestResponse {
  id: string;
  document_url?: string;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
  recipients?: Recipient[];
}

// Field interface para actualizar campos
export interface SigningRequestField {
  id?: string; // Para actualizaciones
  type: string;
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  page_number: number;
  required: boolean;
  recipient_id: string;
  value?: string; // Valor del campo (para campos de texto, etc.)
}

// Request para actualizar signing request
export interface UpdateSigningRequestRequest {
  signing_request_properties?: {
    name?: string;
    expiration_hours?: number;
  };
  recipients?: Recipient[];
  deleted_recipients?: string[];
  fields?: SigningRequestField[];
  reminders?: any[];
}

// Request para enviar signing request
export interface SendSigningRequestRequest {
  custom_message?: string;
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
    
    // Filtrar campos undefined para evitar enviar valores vacíos
    const cleanRequest: any = {
      sendEmail: request.sendEmail ?? false,
    };
    
    // Solo incluir templateId si tiene un valor válido
    if (request.templateId && 
        typeof request.templateId === 'string' && 
        request.templateId !== '00000000-0000-0000-0000-000000000000' && 
        request.templateId.trim() !== '') {
      cleanRequest.templateId = request.templateId;
    }
    
    if (request.message) {
      cleanRequest.message = request.message;
    }
    
    if (request.expirationDate) {
      cleanRequest.expirationDate = request.expirationDate;
    }
    
    if (request.signers && request.signers.length > 0) {
      cleanRequest.signers = request.signers;
    }
    
    const response = await fetch(`${this.baseUrl}/signing-requests`, {
      method: 'POST',
      headers,
      body: JSON.stringify(cleanRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear signing request: ${response.statusText} - ${errorText}`);
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

  // Crear signing request directamente en firma.dev (a través del backend)
  async createFirmaSigningRequest(
    workspaceId: string,
    request: CreateFirmaSigningRequestRequest
  ): Promise<FirmaSigningRequestResponse> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${this.baseUrl}/workspaces/${workspaceId}/signing-requests/firma`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear signing request en firma.dev: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  }

  // Actualizar signing request en firma.dev (a través del backend)
  async updateFirmaSigningRequest(
    workspaceId: string,
    signingRequestId: string,
    request: UpdateSigningRequestRequest
  ): Promise<FirmaSigningRequestResponse> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${this.baseUrl}/workspaces/${workspaceId}/signing-requests/${signingRequestId}/firma`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      let errorText = '';
      try {
        const errorJson = await response.json();
        errorText = typeof errorJson === 'string' ? errorJson : JSON.stringify(errorJson);
      } catch {
        errorText = await response.text();
      }
      throw new Error(`Error al actualizar signing request (${response.status}): ${errorText}`);
    }

    return await response.json();
  }

  // Enviar signing request en firma.dev (a través del backend)
  async sendFirmaSigningRequest(
    workspaceId: string,
    signingRequestId: string,
    request?: SendSigningRequestRequest
  ): Promise<FirmaSigningRequestResponse> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${this.baseUrl}/workspaces/${workspaceId}/signing-requests/${signingRequestId}/send`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(request || {}),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al enviar signing request: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  }

  // Obtener campos de un template desde firma.dev (a través del backend)
  async getFirmaTemplateFields(workspaceId: string, templateId: string): Promise<any[]> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${this.baseUrl}/workspaces/${workspaceId}/templates/${templateId}/fields/firma`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener campos del template: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  }

  // Obtener historial de una solicitud de firma
  async getSigningRequestHistory(signingRequestId: string): Promise<any[]> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${this.baseUrl}/signing-requests/${signingRequestId}/history`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al obtener historial: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  }

  // Listar transacciones con filtros y paginación
  async listTransactions(params?: {
    search?: string;
    status?: string;
    fromDate?: string;
    toDate?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: any[]; totalCount: number; page: number; pageSize: number; totalPages: number }> {
    const headers = await this.getAuthHeaders();
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.status) queryParams.append('status', params.status);
    if (params?.fromDate) queryParams.append('fromDate', params.fromDate);
    if (params?.toDate) queryParams.append('toDate', params.toDate);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());

    const response = await fetch(
      `${this.baseUrl}/signing-requests/transactions?${queryParams.toString()}`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al listar transacciones: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  }

  // Validar identificador único por tenant
  async validateIdentificador(identificador: string): Promise<{ isValid: boolean; message: string }> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(
      `${this.baseUrl}/signing-requests/validate-identificador?identificador=${encodeURIComponent(identificador)}`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al validar identificador: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  }
}

export const firmaApi = new FirmaApiService();

