import { apiService } from './apiService';

export interface OfficeDto {
  id: string;
  name: string;
  tenantId: string;
  tenantName?: string;
  customerId: string;
  customerName?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isSuspended?: boolean;
}

export interface CreateOfficeRequest {
  tenantId: string;
  name: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
}

export interface UpdateOfficeRequest {
  name: string;
  tenantId?: string;
  address?: string;
  city?: string;
  stateProvince?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
}

export const officeService = {
  async getAllOffices(): Promise<OfficeDto[]> {
    const response = await apiService.request<OfficeDto[]>('/offices', {
      method: 'GET',
    });
    return response;
  },

  async getOfficeById(id: string): Promise<OfficeDto> {
    const response = await apiService.request<OfficeDto>(`/offices/${id}`, {
      method: 'GET',
    });
    return response;
  },

  async getOfficesByCustomer(customerId: string): Promise<OfficeDto[]> {
    const response = await apiService.request<OfficeDto[]>(`/offices/customer/${customerId}`, {
      method: 'GET',
    });
    return response;
  },

  async getOfficesByTenant(tenantId: string): Promise<OfficeDto[]> {
    const response = await apiService.request<OfficeDto[]>(`/offices/tenant/${tenantId}`, {
      method: 'GET',
    });
    return response;
  },

  async createOffice(request: CreateOfficeRequest): Promise<OfficeDto> {
    const response = await apiService.request<{ office: OfficeDto; message: string }>('/offices', {
      method: 'POST',
      body: JSON.stringify(request),
    });
    return response.office;
  },

  async updateOffice(id: string, request: UpdateOfficeRequest): Promise<OfficeDto> {
    const response = await apiService.request<OfficeDto>(`/offices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
    return response;
  },

  async deleteOffice(id: string): Promise<void> {
    await apiService.request(`/offices/${id}`, {
      method: 'DELETE',
    });
  },

  async activateOffice(id: string): Promise<OfficeDto> {
    const response = await apiService.request<OfficeDto>(`/offices/${id}/activate`, {
      method: 'POST',
    });
    return response;
  },

  async deactivateOffice(id: string): Promise<OfficeDto> {
    const response = await apiService.request<OfficeDto>(`/offices/${id}/deactivate`, {
      method: 'POST',
    });
    return response;
  },

  async suspendOffice(id: string): Promise<OfficeDto> {
    const response = await apiService.request<OfficeDto>(`/offices/${id}/suspend`, {
      method: 'POST',
    });
    return response;
  },

  async getOfficeUsers(officeId: string): Promise<any[]> {
    return apiService.request<any[]>(`/offices/${officeId}/users`);
  },
};

