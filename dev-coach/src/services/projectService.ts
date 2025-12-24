import { apiBaseUrl } from '../config/env';
import type { ProjectFile } from '../components/CodeEditor';

export interface Project {
  id: string;
  files: ProjectFile[];
  createdAt?: string;
  updatedAt?: string;
}

export interface SaveProjectRequest {
  id?: string;
  files: ProjectFile[];
}

// Sanitizar el contenido de los archivos antes de guardar
const sanitizeContent = (content: string): string => {
  // Eliminar caracteres peligrosos básicos
  // En producción, usar una librería de sanitización más robusta
  return content
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Eliminar scripts maliciosos
    .replace(/javascript:/gi, '') // Eliminar javascript: en URLs
    .replace(/on\w+\s*=/gi, ''); // Eliminar event handlers inline
};

const sanitizeFiles = (files: ProjectFile[]): ProjectFile[] => {
  return files.map(file => ({
    ...file,
    content: sanitizeContent(file.content)
  }));
};

export const projectService = {
  // Guardar un proyecto (crear o actualizar)
  async saveProject(request: SaveProjectRequest): Promise<Project> {
    const sanitizedFiles = sanitizeFiles(request.files);

    const response = await fetch(`${apiBaseUrl}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: request.id,
        files: sanitizedFiles
      })
    });

    if (!response.ok) {
      throw new Error(`Error al guardar el proyecto: ${response.statusText}`);
    }

    return await response.json();
  },

  // Obtener un proyecto por ID
  async getProject(id: string): Promise<Project> {
    const response = await fetch(`${apiBaseUrl}/api/projects/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Proyecto no encontrado');
      }
      throw new Error(`Error al cargar el proyecto: ${response.statusText}`);
    }

    return await response.json();
  }
};

