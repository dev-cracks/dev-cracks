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
  Button,
} from '@mui/material';
import { firmaApi, Template, Workspace } from '../services/firmaApi';
import { useAuth } from '../hooks/useAuth';
import SigningRequestEditor from '../components/SigningRequestEditor';

export default function RequestSignature() {
  const { isAuthenticated, getAccessToken } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [loadingEditor, setLoadingEditor] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editorJwtToken, setEditorJwtToken] = useState<string | null>(null);
  const [firmaSigningRequestId, setFirmaSigningRequestId] = useState<string>('');

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
      // Obtener todas las plantillas de Firma.dev
      const allTemplates = await firmaApi.listAllTemplates();
      
      // Obtener plantillas con Id local del tenant
      let templatesWithId: Template[] = [];
      try {
        templatesWithId = await firmaApi.listTemplates();
      } catch (err) {
        // Si falla, continuar sin templates con Id local
        console.warn('No se pudieron cargar templates con Id local:', err);
      }

      // Combinar: usar templates con Id local si existen, sino usar todos
      // Mapear templates con Id local por firmaTemplateId para fácil búsqueda
      const templatesWithIdMap = new Map(
        templatesWithId.map(t => [t.firmaTemplateId, t])
      );

      // Enriquecer todas las plantillas con Id local si existe
      const enrichedTemplates = allTemplates.map(template => {
        const templateWithId = templatesWithIdMap.get(template.firmaTemplateId);
        return templateWithId ? { ...template, id: templateWithId.id } : template;
      });

      setTemplates(enrichedTemplates);
    } catch (err: any) {
      setError(`Error al cargar plantillas: ${err.message}`);
      setTemplates([]);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleLoadTemplate = async () => {
    if (!selectedWorkspaceId || !selectedTemplateId) {
      setError('Por favor selecciona un workspace y una plantilla');
      return;
    }

    setLoadingEditor(true);
    setError(null);
    setEditorJwtToken(null);
    setFirmaSigningRequestId('');

    try {
      // Buscar el template para obtener el ID local (Guid)
      const selectedTemplate = templates.find((t) => t.firmaTemplateId === selectedTemplateId);
      if (!selectedTemplate) {
        throw new Error('Plantilla no encontrada');
      }

      // El templateId es opcional, pero si existe el Id local, lo usamos
      const requestBody: any = {
        sendEmail: false, // No enviar email automáticamente
      };

      // Si la plantilla tiene Id local válido (no vacío), lo usamos
      if (selectedTemplate.id && selectedTemplate.id !== '00000000-0000-0000-0000-000000000000' && selectedTemplate.id.trim() !== '') {
        requestBody.templateId = selectedTemplate.id;
      }
      // Si no tiene Id local válido, no enviamos templateId (el backend lo manejará como opcional)

      console.log('Creating signing request with body:', requestBody);
      console.log('Selected template:', selectedTemplate);

      // Crear el signing request
      const signingRequest = await firmaApi.createSigningRequest(requestBody);

      setFirmaSigningRequestId(signingRequest.firmaSigningRequestId);

      // Generar JWT para el editor de signing request
      const jwtData = await firmaApi.generateSigningRequestJwt(signingRequest.id);
      setEditorJwtToken(jwtData.jwt);
    } catch (err: any) {
      setError(`Error al cargar la plantilla: ${err.message}`);
      setEditorJwtToken(null);
      setFirmaSigningRequestId('');
    } finally {
      setLoadingEditor(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Solicitar Firma de Documentos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Selecciona un workspace y una plantilla para crear una solicitud de firma
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
              disabled={loadingWorkspaces}
            >
              <InputLabel>Workspace</InputLabel>
              <Select
                value={selectedWorkspaceId}
                label="Workspace"
                onChange={(e) => {
                  setSelectedWorkspaceId(e.target.value);
                  setEditorJwtToken(null);
                  setFirmaSigningRequestId('');
                }}
              >
                {workspaces.map((workspace) => (
                  <MenuItem key={workspace.firmaWorkspaceId} value={workspace.firmaWorkspaceId}>
                    {workspace.name}
                  </MenuItem>
                ))}
              </Select>
              {loadingWorkspaces && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
              {!loadingWorkspaces && workspaces.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  No hay workspaces disponibles
                </Typography>
              )}
            </FormControl>

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
                  setFirmaSigningRequestId('');
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

            <Button
              variant="contained"
              fullWidth
              onClick={handleLoadTemplate}
              disabled={!selectedWorkspaceId || !selectedTemplateId || loadingEditor}
              sx={{ mt: 2 }}
            >
              {loadingEditor ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Cargando...
                </>
              ) : (
                'Cargar Plantilla'
              )}
            </Button>
          </Paper>
        </Grid>

        {/* Editor de solicitudes de firma */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Editor de Solicitud de Firma
            </Typography>

            {!editorJwtToken || !firmaSigningRequestId ? (
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
                {loadingEditor ? (
                  <>
                <CircularProgress />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                  Cargando editor...
                </Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Selecciona un workspace y una plantilla, luego haz clic en "Cargar Plantilla"
                  </Typography>
                )}
              </Box>
            ) : (
              <SigningRequestEditor
                signingRequestId={firmaSigningRequestId}
                jwt={editorJwtToken}
                theme="light"
                readOnly={false}
                height="600px"
                width="100%"
                onSave={(data) => {
                  console.log('Signing request saved:', data);
                }}
                onSend={(data) => {
                  console.log('Signing request sent:', data);
                }}
                onError={(error) => {
                  console.error('Editor error:', error);
                  setError(`Error en el editor: ${error?.message || 'Error desconocido'}`);
                }}
                onLoad={(signingRequest) => {
                  console.log('Editor loaded successfully:', signingRequest);
                }}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
