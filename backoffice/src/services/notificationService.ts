import { apiService } from './apiService';

export interface NotifyUsersRequest {
  title: string;
  message: string;
}

export interface NotifyUsersResponse {
  message: string;
  messageId?: string;
}

class NotificationService {
  async notifyCustomerUsers(customerId: string, request: NotifyUsersRequest): Promise<NotifyUsersResponse> {
    return apiService.request<NotifyUsersResponse>(
      `/customers/${customerId}/notify-users`,
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
  }

  async notifyTenantUsers(tenantId: string, request: NotifyUsersRequest): Promise<NotifyUsersResponse> {
    return apiService.request<NotifyUsersResponse>(
      `/tenants/${tenantId}/notify-users`,
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
  }

  async notifyOfficeUsers(officeId: string, request: NotifyUsersRequest): Promise<NotifyUsersResponse> {
    return apiService.request<NotifyUsersResponse>(
      `/offices/${officeId}/notify-users`,
      {
        method: 'POST',
        body: JSON.stringify(request),
      }
    );
  }
}

export const notificationService = new NotificationService();

