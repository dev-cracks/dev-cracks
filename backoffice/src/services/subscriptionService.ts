import { apiService } from './apiService';

export interface SubscriptionTypeDto {
  id: string;
  name: string;
  allowedModel: string;
  maxTokensPerMonth?: number;
  maxMessagesPerMonth?: number;
  maxTokensPerMessage: number;
  pricePerMonth: number;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionDto {
  id: string;
  customerId: string;
  subscriptionTypeId: string;
  subscriptionTypeName: string;
  allowedModel: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  monthlyUsageTokens: number;
  monthlyUsageMessages: number;
  maxTokensPerMonth?: number;
  maxMessagesPerMonth?: number;
  maxTokensPerMessage: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSubscriptionRequest {
  customerId: string;
  subscriptionTypeId: string;
  startDate?: string;
}

export interface CreateSubscriptionTypeRequest {
  name: string;
  allowedModel: string;
  maxTokensPerMonth?: number;
  maxMessagesPerMonth?: number;
  maxTokensPerMessage: number;
  pricePerMonth: number;
  features?: string[];
}

export interface UpdateSubscriptionTypeRequest extends CreateSubscriptionTypeRequest {}

export const subscriptionService = {
  // Subscription Types
  async getAllSubscriptionTypes(): Promise<SubscriptionTypeDto[]> {
    return apiService.request<SubscriptionTypeDto[]>('/subscriptions/types');
  },

  async getSubscriptionTypeById(id: string): Promise<SubscriptionTypeDto> {
    return apiService.request<SubscriptionTypeDto>(`/subscriptions/types/${id}`);
  },

  async createSubscriptionType(request: CreateSubscriptionTypeRequest): Promise<SubscriptionTypeDto> {
    return apiService.request<SubscriptionTypeDto>('/subscriptions/types', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  async updateSubscriptionType(id: string, request: UpdateSubscriptionTypeRequest): Promise<SubscriptionTypeDto> {
    return apiService.request<SubscriptionTypeDto>(`/subscriptions/types/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request),
    });
  },

  // Subscriptions
  async getAllSubscriptions(): Promise<SubscriptionDto[]> {
    return apiService.request<SubscriptionDto[]>('/subscriptions');
  },

  async getCustomerSubscriptions(customerId: string): Promise<SubscriptionDto[]> {
    return apiService.request<SubscriptionDto[]>(`/subscriptions/customer/${customerId}`);
  },

  async getActiveCustomerSubscription(customerId: string): Promise<SubscriptionDto | null> {
    try {
      return await apiService.request<SubscriptionDto>(`/subscriptions/customer/${customerId}/active`);
    } catch (error: any) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async getSubscriptionById(id: string): Promise<SubscriptionDto> {
    return apiService.request<SubscriptionDto>(`/subscriptions/${id}`);
  },

  async createSubscription(request: CreateSubscriptionRequest): Promise<SubscriptionDto> {
    return apiService.request<SubscriptionDto>('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  async deactivateSubscription(id: string): Promise<SubscriptionDto> {
    return apiService.request<SubscriptionDto>(`/subscriptions/${id}/deactivate`, {
      method: 'POST',
    });
  },

  async activateSubscription(id: string): Promise<SubscriptionDto> {
    return apiService.request<SubscriptionDto>(`/subscriptions/${id}/activate`, {
      method: 'POST',
    });
  },

  async resetSubscriptionUsage(id: string): Promise<void> {
    return apiService.request<void>(`/subscriptions/${id}/reset-usage`, {
      method: 'POST',
    });
  },
};

