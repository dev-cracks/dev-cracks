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
  auth0Id?: string | null;
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
  officeId?: string;
  role?: 'Admin' | 'User';
  contactEmail?: string;
  phone?: string;
  auth0Id: string;
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

// Helper para convertir rol numérico a texto
function transformRole(role: number | string | 'Admin' | 'User'): 'Admin' | 'User' {
  if (typeof role === 'string') {
    // Si ya es string, verificar que sea válido
    if (role === 'Admin' || role === 'User') {
      return role;
    }
    // Si es string pero no válido, intentar convertir
    return role.toLowerCase() === 'admin' ? 'Admin' : 'User';
  }
  // Si es número, convertir: 0 = User, 1 = Admin
  return role === 1 ? 'Admin' : 'User';
}

// Helper para transformar un UserDto
function transformUserDto(user: any): UserDto {
  return {
    ...user,
    role: transformRole(user.role),
    // Asegurar que isActive se mapee correctamente (puede venir como IsActive o isActive)
    isActive: user.isActive ?? user.IsActive ?? true,
    isSuspended: user.isSuspended ?? user.IsSuspended ?? false,
  };
}

export const userService = {
  async getAllUsers(): Promise<UserDto[]> {
    const users = await apiService.request<any[]>('/backoffice/users');
    return users.map(transformUserDto);
  },

  async getUserById(id: string): Promise<UserDto> {
    const user = await apiService.request<any>(`/backoffice/users/${id}`);
    return transformUserDto(user);
  },

  async createUser(data: CreateUserRequest): Promise<UserDto> {
    // Convertir el rol de string a número para el backend
    const requestData = {
      ...data,
      role: data.role === 'Admin' ? 1 : (data.role === 'User' ? 0 : undefined),
    };
    const user = await apiService.request<any>('/backoffice/users', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
    return transformUserDto(user);
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<UserDto> {
    // Si se está actualizando tenantId o customerId, usar el endpoint /users que requiere rol root
    // De lo contrario, usar /backoffice/users
    const isAdminUpdate = data.tenantId !== undefined || data.customerId !== undefined;
    
    const endpoint = isAdminUpdate ? `/users/${id}` : `/backoffice/users/${id}`;
    
    // Convertir el rol de string a número para el backend
    const requestData = {
      ...data,
      role: data.role === 'Admin' ? 1 : (data.role === 'User' ? 0 : undefined),
    };
    
    const user = await apiService.request<any>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(requestData),
    });
    return transformUserDto(user);
  },

  async deleteUser(id: string): Promise<void> {
    return apiService.request<void>(`/backoffice/users/${id}`, {
      method: 'DELETE',
    });
  },

  async suspendUser(id: string): Promise<UserDto> {
    const user = await apiService.request<any>(`/backoffice/users/${id}/suspend`, {
      method: 'POST',
    });
    return transformUserDto(user);
  },

  async activateUser(id: string): Promise<UserDto> {
    const user = await apiService.request<any>(`/backoffice/users/${id}/activate`, {
      method: 'POST',
    });
    return transformUserDto(user);
  },

  async getUsersByTenantId(tenantId: string): Promise<UserDto[]> {
    const users = await apiService.request<any[]>(`/tenants/${tenantId}/users`);
    return users.map(transformUserDto);
  },

  async getUsersByCustomerId(customerId: string): Promise<UserDto[]> {
    const users = await apiService.request<any[]>(`/customers/${customerId}/users`);
    return users.map(transformUserDto);
  },
};

