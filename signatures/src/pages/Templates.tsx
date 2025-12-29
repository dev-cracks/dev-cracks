import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { firmaApi, Template, Workspace } from '../services/firmaApi';
import { useAuth } from '../hooks/useAuth';
import TemplateEditor from '../components/TemplateEditor';

export default function Templates() {
  const { isAuthenticated, getAccessToken } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [loadingEditorJwt, setLoadingEditorJwt] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorJwtToken, setEditorJwtToken] = useState<string | null>(null);

  // Configurar el proveedor de tokens y cargar workspaces y plantillas cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated && getAccessToken) {
      // Configurar el provider (esto es síncrono)
      firmaApi.setAccessTokenProvider(getAccessToken);
      // Cargar workspaces y plantillas inmediatamente después de configurar el provider
      loadWorkspaces();
      loadAllTemplates();
    }
  }, [isAuthenticated, getAccessToken]);

  // Cargar JWT cuando se selecciona una plantilla
  useEffect(() => {
    if (selectedTemplateId) {
      const selectedTemplate = templates.find((t) => t.firmaTemplateId === selectedTemplateId);
      if (selectedTemplate && selectedTemplate.workspaceId) {
        loadTemplateEditor(selectedTemplateId, selectedTemplate.workspaceId);
      } else {
        setError('La plantilla seleccionada no tiene un workspace asociado');
        setEditorJwtToken(null);
      }
    } else {
      setEditorJwtToken(null);
    }
  }, [selectedTemplateId, templates]);

  const loadWorkspaces = async () => {
    setLoadingWorkspaces(true);
    setError(null);
    try {
      const data = await firmaApi.listWorkspaces();
      setWorkspaces(data);
    } catch (err: any) {
      setError(`Error al cargar workspaces: ${err.message}`);
      setWorkspaces([]);
    } finally {
      setLoadingWorkspaces(false);
    }
  };

  const loadAllTemplates = async () => {
    setLoadingTemplates(true);
    setError(null);
    try {
      const data = await firmaApi.listAllTemplates();
      setTemplates(data);
    } catch (err: any) {
      setError(`Error al cargar plantillas: ${err.message}`);
      setTemplates([]);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const loadTemplateEditor = async (templateId: string, workspaceId: string) => {
    setLoadingEditorJwt(true);
    setError(null);
    try {
      // Generar JWT para el editor de template
      const jwt = await firmaApi.generateTemplateJwt(templateId, workspaceId);
      setEditorJwtToken(jwt.jwt);
    } catch (err: any) {
      setError(`Error al generar token para el editor: ${err.message}`);
      setEditorJwtToken(null);
    } finally {
      setLoadingEditorJwt(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Editor de Plantillas
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Selecciona una plantilla para editarla
      </Typography>

      <Grid container spacing={3}>
        {/* Formulario de selección */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Configuración
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <FormControl
              fullWidth
              sx={{ mb: 2 }}
              disabled={loadingTemplates}
            >
              <InputLabel>Plantilla</InputLabel>
              <Select
                value={selectedTemplateId}
                label="Plantilla"
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                  setEditorJwtToken(null);
                }}
              >
                {templates.map((template) => (
                  <MenuItem key={template.firmaTemplateId} value={template.firmaTemplateId}>
                    {template.name} {template.workspaceName && `(${template.workspaceName})`}
                  </MenuItem>
                ))}
              </Select>
              {loadingTemplates && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
              {!loadingTemplates && templates.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  No hay plantillas disponibles
                </Typography>
              )}
            </FormControl>
          </Paper>
        </Grid>

        {/* Editor de plantillas */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Editor de Plantilla
            </Typography>

            {!selectedTemplateId ? (
              <Box
                sx={{
                  minHeight: '600px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Selecciona una plantilla para editar
                </Typography>
              </Box>
            ) : !editorJwtToken ? (
              <Box
                sx={{
                  minHeight: '600px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                {loadingEditorJwt ? (
                  <>
                    <CircularProgress />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                      Cargando editor...
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Error al cargar el editor
                  </Typography>
                )}
              </Box>
            ) : (
              <TemplateEditor
                templateId={selectedTemplateId}
                jwt={editorJwtToken}
                theme="light"
                readOnly={false}
                height="600px"
                width="100%"
                onSave={(data) => {
                  console.log('Template saved:', data);
                }}
                onError={(error) => {
                  console.error('Editor error:', error);
                  setError(`Error en el editor: ${error?.message || 'Error desconocido'}`);
                }}
                onLoad={(template) => {
                  console.log('Editor loaded successfully:', template);
                }}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

