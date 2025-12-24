import { apiService } from './apiService';
import { apiBaseUrl } from '../config/env';

export interface ShipmentRequestDto {
  id: string;
  customerId: string;
  customerName?: string;
  originAddress: string;
  originCity?: string;
  originStateProvince?: string;
  originPostalCode?: string;
  originCountryId: string;
  originCountryName?: string;
  originLatitude?: number;
  originLongitude?: number;
  destinationAddress: string;
  destinationCity?: string;
  destinationStateProvince?: string;
  destinationPostalCode?: string;
  destinationCountryId: string;
  destinationCountryName?: string;
  destinationLatitude?: number;
  destinationLongitude?: number;
  requestDate: string;
  contactName: string;
  contactPhone?: string;
  contactEmail?: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  categoryId: string;
  categoryName?: string;
  isFragile: boolean;
  isInsured: boolean;
  insuredValue?: number;
  rateId: string;
  rateName?: string;
  estimatedDeliveryDate?: string;
  estimatedCost?: number;
  guideNumber: string;
  clickUpTaskId?: string;
  clickUpTaskUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateShipmentRequestDto {
  customerId: string;
  originAddress: string;
  originCity?: string;
  originStateProvince?: string;
  originPostalCode?: string;
  originCountryId: string;
  destinationAddress: string;
  destinationCity?: string;
  destinationStateProvince?: string;
  destinationPostalCode?: string;
  destinationCountryId: string;
  contactName: string;
  contactPhone?: string;
  contactEmail?: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  categoryId: string;
  isFragile: boolean;
  isInsured: boolean;
  insuredValue?: number;
  rateId: string;
}

export interface ShipmentCategoryDto {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShipmentRateDto {
  id: string;
  name: string;
  description?: string;
  slaDays: number;
  baseCost: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const shipmentService = {
  async createShipmentRequest(request: CreateShipmentRequestDto): Promise<ShipmentRequestDto> {
    return apiService.request<ShipmentRequestDto>('/shipments/requests', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  },

  async getShipmentRequest(id: string): Promise<ShipmentRequestDto> {
    return apiService.request<ShipmentRequestDto>(`/shipments/requests/${id}`);
  },

  async getShipmentRequests(customerId?: string): Promise<ShipmentRequestDto[]> {
    const url = customerId ? `/shipments/requests?customerId=${customerId}` : '/shipments/requests';
    return apiService.request<ShipmentRequestDto[]>(url);
  },

  async getShipmentLabelPdf(id: string): Promise<Blob> {
    const token = await apiService.getAccessToken();
    const response = await fetch(`${apiBaseUrl}/shipments/requests/${id}/label`, {
      method: 'GET',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    return response.blob();
  },

  async getCategories(activeOnly: boolean = false): Promise<ShipmentCategoryDto[]> {
    const url = activeOnly ? '/shipments/categories?activeOnly=true' : '/shipments/categories';
    return apiService.request<ShipmentCategoryDto[]>(url);
  },

  async getRates(availableOnly: boolean = false): Promise<ShipmentRateDto[]> {
    const endpoint = availableOnly ? '/shipments/rates/available' : '/shipments/rates';
    return apiService.request<ShipmentRateDto[]>(endpoint);
  },
};

