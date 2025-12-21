import { apiService } from './apiService';
import { TenantDto } from './tenantService';

export interface UserDto {
  id: string;
  email: string;
  name: string | null;
  tenantId: string | null;
  customerId: string | null;
  role: 'Admin' | 'User';
  contactEmail?: string | null;
  phone?: string | null;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
  isSuspended?: boolean;
}

export interface CreateUserRequest {
  email: string;
  name?: string;
  tenantId?: string;
  customerId?: string;
  role?: 'Admin' | 'User';
  contactEmail?: string;
  phone?: string;
}

export interface UpdateUserRequest {
  email: string;
  name?: string;
  tenantId?: string;
  customerId?: string;
  role?: 'Admin' | 'User';
  contactEmail?: string;
  phone?: string;
}

export const userService = {
  async getAllUsers(): Promise<UserDto[]> {
    return apiService.request<UserDto[]>('/users');
  },

  async getUserById(id: string): Promise<UserDto> {
    return apiService.request<UserDto>(`/users/${id}`);
  },

  async createUser(data: CreateUserRequest): Promise<UserDto> {
    return apiService.request<UserDto>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<UserDto> {
    return apiService.request<UserDto>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteUser(id: string): Promise<void> {
    return apiService.request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  async suspendUser(id: string): Promise<UserDto> {
    return apiService.request<UserDto>(`/users/${id}/suspend`, {
      method: 'POST',
    });
  },

  async activateUser(id: string): Promise<UserDto> {
    return apiService.request<UserDto>(`/users/${id}/activate`, {
      method: 'POST',
    });
  },

  async getUsersByTenantId(tenantId: string): Promise<UserDto[]> {
    return apiService.request<UserDto[]>(`/tenants/${tenantId}/users`);
  },

  async getUsersByCustomerId(customerId: string): Promise<UserDto[]> {
    return apiService.request<UserDto[]>(`/customers/${customerId}/users`);
  },
};

