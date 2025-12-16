import { apiService } from './apiService';
import { UserDto } from './authService';

export interface CreateUserRequest {
  auth0Id: string;
  email: string;
  name?: string;
  role?: 'Admin' | 'User';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface UpdateUserRoleRequest {
  role: 'Admin' | 'User';
}

export const backofficeService = {
  async getUsers(): Promise<UserDto[]> {
    return apiService.request<UserDto[]>('/backoffice/users');
  },

  async createUser(user: CreateUserRequest): Promise<UserDto> {
    return apiService.request<UserDto>('/backoffice/users', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  },

  async updateUser(id: string, user: UpdateUserRequest): Promise<UserDto> {
    return apiService.request<UserDto>(`/backoffice/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });
  },

  async deleteUser(id: string): Promise<void> {
    return apiService.request<void>(`/backoffice/users/${id}`, {
      method: 'DELETE',
    });
  },

  async updateUserRole(id: string, role: 'Admin' | 'User'): Promise<UserDto> {
    return apiService.request<UserDto>(`/backoffice/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  },
};

