import { apiService } from './apiService.js';

export interface OpenAiModelDto {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const openAiModelService = {
  async getAllModels(): Promise<OpenAiModelDto[]> {
    return apiService.request<OpenAiModelDto[]>('/ai/models');
  },

  async getActiveModels(): Promise<OpenAiModelDto[]> {
    return apiService.request<OpenAiModelDto[]>('/ai/models/active');
  },

  async getModelById(id: string): Promise<OpenAiModelDto> {
    return apiService.request<OpenAiModelDto>(`/ai/models/${id}`);
  },

  async getModelByName(name: string): Promise<OpenAiModelDto> {
    return apiService.request<OpenAiModelDto>(`/ai/models/name/${encodeURIComponent(name)}`);
  },

  async syncModels(): Promise<string[]> {
    return apiService.request<string[]>('/ai/models/sync', {
      method: 'POST',
    });
  },

  async activateModel(id: string): Promise<OpenAiModelDto> {
    return apiService.request<OpenAiModelDto>(`/ai/models/${id}/activate`, {
      method: 'POST',
    });
  },

  async deactivateModel(id: string): Promise<OpenAiModelDto> {
    return apiService.request<OpenAiModelDto>(`/ai/models/${id}/deactivate`, {
      method: 'POST',
    });
  },
};



