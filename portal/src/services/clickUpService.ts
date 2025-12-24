import { env } from '../config/env';

export interface ClickUpDashboardData {
  teamCount: number;
  spaceCount: number;
  folderCount: number;
  totalTasks: number;
  tasks: ClickUpTask[];
}

export interface ClickUpTask {
  id: string;
  name: string;
  description: string | null;
  status: ClickUpStatus;
  dueDate: string | null;
  priority: string | null;
  listName: string | null;
  folderName: string | null;
  spaceName: string | null;
  url: string;
  assignees: ClickUpAssignee[];
}

export interface ClickUpStatus {
  status: string;
  id: string;
  color: string;
  type: string;
}

export interface ClickUpAssignee {
  id: number;
  username: string;
  email: string | null;
}

const getAuthHeaders = async (accessToken?: string): Promise<HeadersInit> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  
  return headers;
};

export const getDashboardData = async (accessToken?: string): Promise<ClickUpDashboardData | null> => {
  try {
    const headers = await getAuthHeaders(accessToken);
    const response = await fetch(`${env.apiBaseUrl}/dashboard/clickup`, {
      method: 'GET',
      credentials: 'include',
      headers
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado');
      }
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error al obtener datos del dashboard: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener datos del dashboard de ClickUp:', error);
    throw error;
  }
};

