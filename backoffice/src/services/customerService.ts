import { apiService } from './apiService';
import { TenantDto } from './tenantService';
import { UserDto } from './authService';

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
  email?: string;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
  isSuspended?: boolean;
  parentId?: string;
  parentName?: string;
  tenantCount?: number;
  userCount?: number;
  officeCount?: number;
}

export interface CreateCustomerRequest {
  name: string;
  identification: string;
  countryId: string;
  stateProvince?: string;
  city?: string;
  phone?: string;
  email?: string;
  parentId?: string;
  skipDefaultStructure?: boolean;
}

export interface UpdateCustomerRequest {
  name: string;
  identification: string;
  countryId: string;
  stateProvince?: string;
  city?: string;
  phone?: string;
  email?: string;
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

  async getCustomerTenants(id: string): Promise<TenantDto[]> {
    return apiService.request<TenantDto[]>(`/customers/${id}/tenants`);
  },

  async getCustomerUsers(id: string): Promise<UserDto[]> {
    return apiService.request<UserDto[]>(`/customers/${id}/users`);
  },

  async assignTenantToCustomer(id: string, tenantName?: string): Promise<{ tenant: TenantDto; message: string }> {
    return apiService.request<{ tenant: TenantDto; message: string }>(`/customers/${id}/assign-tenant`, {
      method: 'POST',
      body: JSON.stringify({ tenantName }),
    });
  },

  async assignParentToCustomer(id: string, parentId?: string): Promise<{ customer: CustomerDto; message: string }> {
    return apiService.request<{ customer: CustomerDto; message: string }>(`/customers/${id}/assign-parent`, {
      method: 'POST',
      body: JSON.stringify({ parentId: parentId || null }),
    });
  },
};

export const countryService = {
  async getAllCountries(): Promise<CountryDto[]> {
    return apiService.request<CountryDto[]>('/countries');
  },
};
