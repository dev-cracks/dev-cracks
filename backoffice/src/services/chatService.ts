import { apiService } from './apiService';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface SubscriptionUsage {
  monthlyUsageTokens: number;
  monthlyUsageMessages: number;
  maxTokensPerMonth: number | null;
  maxMessagesPerMonth: number | null;
  usagePercentageTokens: number;
  usagePercentageMessages: number;
}

export interface ChatResponse {
  content: string;
  tokensUsed: number;
  usage?: SubscriptionUsage;
}

class ChatService {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    return apiService.request<ChatResponse>('/chat/message', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getUsage(): Promise<SubscriptionUsage | null> {
    try {
      return await apiService.request<SubscriptionUsage>('/chat/usage', {
        method: 'GET',
      });
    } catch (error: any) {
      if (error.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }

  async getSubscription(): Promise<{ usage: SubscriptionUsage } | null> {
    try {
      return await apiService.request<{ usage: SubscriptionUsage }>('/chat/subscription', {
        method: 'GET',
      });
    } catch (error: any) {
      if (error.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }
}

export const chatService = new ChatService();

