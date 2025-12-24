import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CodeEditor, type ProjectFile } from '../components/CodeEditor';
import { Preview } from '../components/Preview';
import { projectService } from '../services/projectService';
import './ChallengePage.css';

// Plantilla base para los archivos iniciales
const getInitialFiles = (): ProjectFile[] => [
  {
    filename: 'index.html',
    content: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Proyecto</title>
</head>
<body>
  <h1>¡Hola Mundo!</h1>
  <p>Comienza a escribir tu código aquí.</p>
</body>
</html>`
  },
  {
    filename: 'style.css',
    content: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background: #f5f5f5;
}

h1 {
  color: #333;
}
`
  },
  {
    filename: 'main.ts',
    content: `// Tu código TypeScript aquí
console.log('¡Hola desde TypeScript!');
`
  }
];

export const ChallengePage = () => {
  const { id } = useParams<{ id: string }>();
  const [files, setFiles] = useState<ProjectFile[]>(getInitialFiles());
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [projectId, setProjectId] = useState<string | null>(id || null);

  // Cargar proyecto si hay un ID
  useEffect(() => {
    if (id && id !== 'new') {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    try {
      const project = await projectService.getProject(projectId);
      if (project && project.files) {
        setFiles(project.files);
        setProjectId(projectId);
      }
    } catch (error) {
      console.error('Error al cargar el proyecto:', error);
      // Si falla, usar archivos iniciales
      setFiles(getInitialFiles());
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage(null);

    try {
      const savedProject = await projectService.saveProject({
        id: projectId || undefined,
        files
      });

      setProjectId(savedProject.id);
      setSaveMessage('Proyecto guardado exitosamente');
      
      // Actualizar la URL sin recargar la página
      window.history.replaceState({}, '', `/dev-coach/challenge/${savedProject.id}`);

      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      setSaveMessage('Error al guardar el proyecto');
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="challenge-page">
      <div className="challenge-editor">
        <CodeEditor
          files={files}
          onFilesChange={setFiles}
          onSave={handleSave}
        />
      </div>
      <div className="challenge-preview">
        <Preview files={files} />
      </div>
      {saveMessage && (
        <div className={`save-message ${saveMessage.includes('Error') ? 'error' : 'success'}`}>
          {saveMessage}
        </div>
      )}
      {isSaving && (
        <div className="save-message saving">
          Guardando...
        </div>
      )}
    </div>
  );
};

