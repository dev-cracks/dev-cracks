import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { firmaApi, Workspace, Template } from '../services/firmaApi';
import { useAuth } from '../hooks/useAuth';

declare global {
  interface Window {
    FirmaSigning?: {
      init: (config: {
        container: string;
        jwt: string;
        onSigningComplete?: () => void;
        onError?: (error: any) => void;
      }) => void;
    };
  }
}

export default function RequestSignature() {
  const { getAccessToken } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [loadingJwt, setLoadingJwt] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configurar el proveedor de tokens en el servicio API
  useEffect(() => {
    firmaApi.setAccessTokenProvider(getAccessToken);
  }, [getAccessToken]);

  // Cargar workspaces al montar el componente
  useEffect(() => {
    loadWorkspaces();
  }, []);

  // Cargar templates cuando se selecciona un workspace
  useEffect(() => {
    if (selectedWorkspaceId) {
      loadTemplates(selectedWorkspaceId);
      setSelectedTemplateId(''); // Reset template selection
      setJwtToken(null); // Reset JWT token
    } else {
      setTemplates([]);
    }
  }, [selectedWorkspaceId]);

  // Cargar componente de firma cuando se obtiene el JWT
  useEffect(() => {
    if (jwtToken && containerRef.current) {
      loadFirmaScript();
    }
  }, [jwtToken]);

  const loadWorkspaces = async () => {
    setLoadingWorkspaces(true);
    setError(null);
    try {
      const data = await firmaApi.listWorkspaces();
      setWorkspaces(data);
    } catch (err: any) {
      setError(`Error al cargar workspaces: ${err.message}`);
    } finally {
      setLoadingWorkspaces(false);
    }
  };

  const loadTemplates = async (workspaceId: string) => {
    setLoadingTemplates(true);
    setError(null);
    try {
      const data = await firmaApi.listTemplatesByWorkspace(workspaceId);
      setTemplates(data);
    } catch (err: any) {
      setError(`Error al cargar templates: ${err.message}`);
      setTemplates([]);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleGenerateJwt = async () => {
    if (!selectedTemplateId || !selectedWorkspaceId) {
      setError('Por favor, selecciona un workspace y una plantilla');
      return;
    }

    setLoadingJwt(true);
    setError(null);
    try {
      const jwt = await firmaApi.generateTemplateJwt(selectedTemplateId, selectedWorkspaceId);
      setJwtToken(jwt.jwt);
    } catch (err: any) {
      setError(`Error al generar token JWT: ${err.message}`);
    } finally {
      setLoadingJwt(false);
    }
  };

  const loadFirmaScript = async () => {
    if (!jwtToken || !containerRef.current) return;

    try {
      // Cargar el script de Firma.dev solo si no está ya cargado
      if (!window.FirmaSigning) {
        const script = document.createElement('script');
        script.src = 'https://cdn.firma.dev/signing.js';
        script.async = true;
        script.crossOrigin = 'anonymous';

        const scriptLoadPromise = new Promise<void>((resolve, reject) => {
          script.onload = () => {
            console.log('Firma.dev script loaded successfully');
            resolve();
          };
          script.onerror = (err) => {
            console.error('Failed to load Firma.dev script:', err);
            reject(new Error('No se pudo cargar el script de Firma.dev'));
          };
          setTimeout(() => {
            reject(new Error('Timeout al cargar el script de Firma.dev'));
          }, 10000);
        });

        document.body.appendChild(script);
        await scriptLoadPromise;
      }

      // Inicializar el componente de firma
      if (window.FirmaSigning && containerRef.current) {
        window.FirmaSigning.init({
          container: containerRef.current.id,
          jwt: jwtToken,
          onSigningComplete: () => {
            console.log('Signing completed');
            setLoading(false);
          },
          onError: (err) => {
            console.error('Signing error:', err);
            setError(`Error al inicializar el componente de firma: ${err?.message || 'Error desconocido'}`);
            setLoading(false);
          },
        });
        setLoading(false);
      }
    } catch (err: any) {
      console.error('Error loading Firma script:', err);
      setError(`Error al cargar el script de firma: ${err.message}`);
      setLoading(false);
    }
  };

  const selectedWorkspace = workspaces.find((w) => w.firmaWorkspaceId === selectedWorkspaceId);
  const selectedTemplate = templates.find((t) => t.firmaTemplateId === selectedTemplateId);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Solicitar Firma de Documentos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Selecciona un workspace y una plantilla para iniciar el proceso de firma
      </Typography>

      <Grid container spacing={3}>
        {/* Formulario de selección */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Configuración
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                {error}
              </Alert>
            )}

            <FormControl fullWidth sx={{ mb: 2 }} disabled={loadingWorkspaces}>
              <InputLabel>Workspace</InputLabel>
              <Select
                value={selectedWorkspaceId}
                label="Workspace"
                onChange={(e) => setSelectedWorkspaceId(e.target.value)}
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
            </FormControl>

            <FormControl
              fullWidth
              sx={{ mb: 2 }}
              disabled={!selectedWorkspaceId || loadingTemplates}
            >
              <InputLabel>Plantilla</InputLabel>
              <Select
                value={selectedTemplateId}
                label="Plantilla"
                onChange={(e) => setSelectedTemplateId(e.target.value)}
              >
                {templates.map((template) => (
                  <MenuItem key={template.firmaTemplateId} value={template.firmaTemplateId}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
              {loadingTemplates && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <CircularProgress size={24} />
                </Box>
              )}
              {selectedWorkspaceId && templates.length === 0 && !loadingTemplates && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  No hay plantillas disponibles en este workspace
                </Typography>
              )}
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              onClick={handleGenerateJwt}
              disabled={!selectedTemplateId || loadingJwt}
              sx={{ mb: 2 }}
            >
              {loadingJwt ? <CircularProgress size={24} /> : 'Cargar Plantilla para Firma'}
            </Button>
          </Paper>
        </Grid>

        {/* Componente de firma */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Vista Previa y Firma
            </Typography>

            {!jwtToken ? (
              <Box
                sx={{
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Selecciona un workspace y una plantilla para comenzar
                </Typography>
              </Box>
            ) : (
              <Box
                id="firma-signing-container"
                ref={containerRef}
                sx={{
                  minHeight: '400px',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 2,
                }}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
