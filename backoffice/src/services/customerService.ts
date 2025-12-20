import { apiService } from './apiService';

export interface CountryDto {
  id: string;
  name: string;
  phoneCode: string;
  isoCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerDto {
  id: string;
  name: string;
  identification: string;
  countryId: string;
  countryName?: string;
  stateProvince?: string;
  city?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
  isSuspended?: boolean;
  tenantCount?: number;
  userCount?: number;
}

export interface CreateCustomerRequest {
  name: string;
  identification: string;
  countryId: string;
  stateProvince?: string;
  city?: string;
  phone?: string;
}

export interface UpdateCustomerRequest {
  name: string;
  identification: string;
  countryId: string;
  stateProvince?: string;
  city?: string;
  phone?: string;
}

export const customerService = {
  async getAllCustomers(): Promise<CustomerDto[]> {
    return apiService.request<CustomerDto[]>('/customers');
  },

  async getCustomerById(id: string): Promise<CustomerDto> {
    return apiService.request<CustomerDto>(`/customers/${id}`);
  },

  async createCustomer(data: CreateCustomerRequest): Promise<CustomerDto> {
    return apiService.request<CustomerDto>('/customers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateCustomer(id: string, data: UpdateCustomerRequest): Promise<CustomerDto> {
    return apiService.request<CustomerDto>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteCustomer(id: string): Promise<void> {
    return apiService.request<void>(`/customers/${id}`, {
      method: 'DELETE',
    });
  },

  async suspendCustomer(id: string): Promise<CustomerDto> {
    return apiService.request<CustomerDto>(`/customers/${id}/suspend`, {
      method: 'POST',
    });
  },

  async activateCustomer(id: string): Promise<CustomerDto> {
    return apiService.request<CustomerDto>(`/customers/${id}/activate`, {
      method: 'POST',
    });
  },

  async getCustomerTenants(id: string): Promise<any[]> {
    return apiService.request<any[]>(`/customers/${id}/tenants`);
  },

  async getCustomerUsers(id: string): Promise<any[]> {
    return apiService.request<any[]>(`/customers/${id}/users`);
  },
};

export const countryService = {
  async getAllCountries(): Promise<CountryDto[]> {
    return apiService.request<CountryDto[]>('/countries');
  },
};

