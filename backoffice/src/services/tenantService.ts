import { apiService } from './apiService';

export interface TenantDto {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface InitializeTenantResponse {
  tenant: TenantDto;
  message: string;
}

export const tenantService = {
  async getCurrentTenant(): Promise<TenantDto | null> {
    try {
      return await apiService.request<TenantDto>('/tenants/me');
    } catch (error: any) {
      // Si el usuario no tiene tenant, retornar null
      if (error?.statusCode === 404) {
        return null;
      }
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
};

