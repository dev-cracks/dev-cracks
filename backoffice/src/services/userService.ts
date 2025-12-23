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
  auth0Id?: string;
}

export interface UpdateUserRequest {
  email: string;
  name?: string;
  tenantId?: string;
  customerId?: string;
  officeId?: string;
  role?: 'Admin' | 'User';
  contactEmail?: string;
  phone?: string;
}

// Helper to convert numeric role to text
function transformRole(role: number | string | 'Admin' | 'User'): 'Admin' | 'User' {
  if (typeof role === 'string') {
    // If already string, verify it's valid
    if (role === 'Admin' || role === 'User') {
      return role;
    }
    // If string but not valid, try to convert
    return role.toLowerCase() === 'admin' ? 'Admin' : 'User';
  }
  // If number, convert: 0 = User, 1 = Admin
  return role === 1 ? 'Admin' : 'User';
}

// Helper to transform a UserDto
function transformUserDto(user: any): UserDto {
  return {
    ...user,
    role: transformRole(user.role),
    // Ensure isActive is mapped correctly (may come as IsActive or isActive)
    isActive: user.isActive ?? user.IsActive ?? true,
    isSuspended: user.isSuspended ?? user.IsSuspended ?? false,
  };
}

export const userService = {
  async getAllUsers(): Promise<UserDto[]> {
    // Use /users endpoint which requires root role and returns all users
    // instead of /backoffice/users which only returns users from current tenant
    try {
      const users = await apiService.request<any[]>('/users');
      return users.map(transformUserDto);
    } catch (error: any) {
      // If fails due to permissions, try backoffice endpoint as fallback
      if (error?.statusCode === 403 || error?.statusCode === 401) {
        const users = await apiService.request<any[]>('/backoffice/users');
        return users.map(transformUserDto);
      }
      throw error;
    }
  },

  async getUserById(id: string): Promise<UserDto> {
    // Use /users endpoint which requires root role
    const user = await apiService.request<any>(`/users/${id}`);
    return transformUserDto(user);
  },

  async createUser(data: CreateUserRequest): Promise<UserDto> {
    // Convert role from string to number for backend
    // Filter empty fields so they're not sent as empty strings
    const requestData: any = {
      email: data.email,
      role: data.role === 'Admin' ? 1 : (data.role === 'User' ? 0 : undefined),
    };
    
    // Only include optional fields if they have valid values
    if (data.name?.trim()) requestData.name = data.name.trim();
    if (data.tenantId?.trim()) requestData.tenantId = data.tenantId.trim();
    if (data.customerId?.trim()) requestData.customerId = data.customerId.trim();
    if (data.officeId?.trim()) requestData.officeId = data.officeId.trim();
    if (data.contactEmail?.trim()) requestData.contactEmail = data.contactEmail.trim();
    if (data.phone?.trim()) requestData.phone = data.phone.trim();
    if (data.auth0Id?.trim()) requestData.auth0Id = data.auth0Id.trim();
    
    const user = await apiService.request<any>('/backoffice/users', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
    return transformUserDto(user);
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<UserDto> {
    // If updating tenantId or customerId, use /users endpoint which requires root role
    // Otherwise, use /backoffice/users
    const isAdminUpdate = data.tenantId !== undefined || data.customerId !== undefined;
    
    const endpoint = isAdminUpdate ? `/users/${id}` : `/backoffice/users/${id}`;
    
    // Convert role from string to number for backend
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
    try {
      // Try first with backoffice endpoint (only works for users from same tenant)
      return await apiService.request<void>(`/backoffice/users/${id}`, {
        method: 'DELETE',
      });
    } catch (error: any) {
      // If fails with 403 (Forbidden), user probably belongs to another tenant
      // Try with admin endpoint which requires root role
      if (error?.statusCode === 403 || error?.status === 403) {
        return await apiService.request<void>(`/users/${id}`, {
          method: 'DELETE',
        });
      }
      // If it's another error, rethrow it
      throw error;
    }
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

  async getUserOffices(userId: string): Promise<any[]> {
    return apiService.request<any[]>(`/users/${userId}/offices`);
  },

  async getUserTenants(userId: string): Promise<any[]> {
    return apiService.request<any[]>(`/users/${userId}/tenants`);
  },

  // Assign tenant to user
  async assignTenantToUser(userId: string, tenantId: string): Promise<void> {
    return apiService.request<void>(`/users/${userId}/tenants/${tenantId}`, {
      method: 'POST',
    });
  },

  // Unassign tenant from user
  async removeTenantFromUser(userId: string, tenantId: string): Promise<void> {
    return apiService.request<void>(`/users/${userId}/tenants/${tenantId}`, {
      method: 'DELETE',
    });
  },

  // Assign office to user
  async assignOfficeToUser(userId: string, officeId: string): Promise<void> {
    return apiService.request<void>(`/users/${userId}/offices/${officeId}`, {
      method: 'POST',
    });
  },

  // Unassign office from user
  async removeOfficeFromUser(userId: string, officeId: string): Promise<void> {
    return apiService.request<void>(`/users/${userId}/offices/${officeId}`, {
      method: 'DELETE',
    });
  },
};

