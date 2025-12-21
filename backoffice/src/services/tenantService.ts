import { apiService } from './apiService';
import { UserDto } from './authService';

export interface TenantDto {
  id: string;
  name: string;
  customerId: string;
  customerName?: string;
  officeId?: string;
  officeName?: string;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
  isSuspended?: boolean;
  userCount?: number;
}

export interface InitializeTenantResponse {
  tenant: TenantDto;
  message: string;
}

export interface CreateTenantRequest {
  name: string;
  customerId: string;
}

export interface UpdateTenantRequest {
  name: string;
  customerId?: string;
}

export interface TenantDetailsDto extends TenantDto {
  userCount?: number;
}

export const tenantService = {
  async getCurrentTenant(): Promise<TenantDto | null> {
    try {
      return await apiService.request<TenantDto>('/tenants/me');
    } catch (error: any) {
      // Si el usuario no tiene tenant (404), retornar null silenciosamente
      if (error?.statusCode === 404) {
        return null;
      }
      // Para otros errores, lanzar la excepción
      throw error;
    }
  },

  async initializeTenant(): Promise<InitializeTenantResponse> {
    return apiService.request<InitializeTenantResponse>('/tenants/initialize', {
      method: 'POST',
    });
  },

  async getAllTenants(): Promise<TenantDto[]> {
    return apiService.request<TenantDto[]>('/tenants');
  },

  async createTenant(data: CreateTenantRequest): Promise<TenantDto> {
    return apiService.request<TenantDto>('/tenants', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getTenantById(id: string): Promise<TenantDetailsDto> {
    return apiService.request<TenantDetailsDto>(`/tenants/${id}`);
  },

  async updateTenant(id: string, data: UpdateTenantRequest): Promise<TenantDto> {
    return apiService.request<TenantDto>(`/tenants/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteTenant(id: string): Promise<void> {
    return apiService.request<void>(`/tenants/${id}`, {
      method: 'DELETE',
    });
  },

  async suspendTenant(id: string): Promise<TenantDto> {
    return apiService.request<TenantDto>(`/tenants/${id}/suspend`, {
      method: 'POST',
    });
  },

  async activateTenant(id: string): Promise<TenantDto> {
    return apiService.request<TenantDto>(`/tenants/${id}/activate`, {
      method: 'POST',
    });
  },

  async getTenantUsers(id: string): Promise<UserDto[]> {
    return apiService.request<UserDto[]>(`/tenants/${id}/users`);
  },

  async getTenantsByOffice(officeId: string): Promise<TenantDto[]> {
    return apiService.request<TenantDto[]>(`/tenants/office/${officeId}`);
  },
};

