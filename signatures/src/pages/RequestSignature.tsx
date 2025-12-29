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
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem as MuiMenuItem,
} from '@mui/material';
import { firmaApi, Template, Workspace, TemplateField, getFieldDisplayName } from '../services/firmaApi';
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
  const { isAuthenticated, getAccessToken } = useAuth();
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateFields, setTemplateFields] = useState<TemplateField[]>([]);
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [loadingFields, setLoadingFields] = useState(false);
  const [loadingJwt, setLoadingJwt] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Cargar campos cuando se selecciona una plantilla
  useEffect(() => {
    if (selectedTemplateId) {
      loadTemplateFields(selectedTemplateId);
    } else {
      setTemplateFields([]);
      setFieldValues({});
    }
  }, [selectedTemplateId]);

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

  const loadTemplateFields = async (templateId: string) => {
    setLoadingFields(true);
    setError(null);
    try {
      const fields = await firmaApi.getTemplateFields(templateId);
      setTemplateFields(fields);
      // Inicializar valores de campos
      const initialValues: Record<string, any> = {};
      fields.forEach((field) => {
        if (field.readOnly && field.readOnlyValue) {
          initialValues[field.id] = field.readOnlyValue;
        } else if (field.fieldType === 'checkbox') {
          initialValues[field.id] = false;
        } else if (field.fieldType === 'date' && field.dateSigningDefault) {
          initialValues[field.id] = new Date().toISOString().split('T')[0];
        } else {
          initialValues[field.id] = '';
        }
      });
      setFieldValues(initialValues);
    } catch (err: any) {
      setError(`Error al cargar campos de la plantilla: ${err.message}`);
      setTemplateFields([]);
    } finally {
      setLoadingFields(false);
    }
  };

  const handleGenerateJwt = async () => {
    if (!selectedTemplateId) {
      setError('Por favor, selecciona una plantilla');
      return;
    }

    if (!selectedWorkspaceId) {
      setError('Por favor, selecciona un workspace');
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
          },
          onError: (err) => {
            console.error('Signing error:', err);
            setError(`Error al inicializar el componente de firma: ${err?.message || 'Error desconocido'}`);
          },
        });
      }
    } catch (err: any) {
      console.error('Error loading Firma script:', err);
      setError(`Error al cargar el script de firma: ${err.message}`);
    }
  };

  const renderField = (field: TemplateField) => {
    const value = fieldValues[field.id] ?? '';
    const isReadOnly = field.readOnly;

    switch (field.fieldType) {
      case 'text':
      case 'text_area':
        return (
          <TextField
            fullWidth
            label={getFieldDisplayName(field)}
            value={value}
            onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
            required={field.required}
            disabled={isReadOnly}
            multiline={field.fieldType === 'text_area'}
            rows={field.fieldType === 'text_area' ? 4 : 1}
            variant="outlined"
          />
        );

      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            label={getFieldDisplayName(field)}
            value={value}
            onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
            required={field.required}
            disabled={isReadOnly}
            variant="outlined"
          />
        );

      case 'date':
        return (
          <TextField
            fullWidth
            type="date"
            label={getFieldDisplayName(field)}
            value={value}
            onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
            required={field.required}
            disabled={isReadOnly || field.dateSigningDefault}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        );

      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={value || false}
                onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.checked })}
                disabled={isReadOnly}
              />
            }
            label={getFieldDisplayName(field)}
            required={field.required}
          />
        );

      case 'dropdown':
        return (
          <FormControl fullWidth required={field.required}>
            <InputLabel>{getFieldDisplayName(field)}</InputLabel>
            <Select
              value={value}
              label={getFieldDisplayName(field)}
              onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
              disabled={isReadOnly}
            >
              {field.dropdownOptions?.map((option) => (
                <MuiMenuItem key={option} value={option}>
                  {option}
                </MuiMenuItem>
              ))}
            </Select>
          </FormControl>
        );

      case 'radio_buttons':
        return (
          <FormControl component="fieldset" required={field.required}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {getFieldDisplayName(field)}
            </Typography>
            <RadioGroup
              value={value}
              onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
            >
              {field.dropdownOptions?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio disabled={isReadOnly} />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case 'signature':
      case 'initial':
        return (
          <Box
            sx={{
              p: 2,
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {getFieldDisplayName(field)} (Se completará durante la firma)
            </Typography>
          </Box>
        );

      case 'file':
        return (
          <TextField
            fullWidth
            type="file"
            label={getFieldDisplayName(field)}
            required={field.required}
            disabled={isReadOnly}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            onChange={(e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                setFieldValues({ ...fieldValues, [field.id]: file.name });
              }
            }}
          />
        );

      default:
        return (
          <TextField
            fullWidth
            label={getFieldDisplayName(field)}
            value={value}
            onChange={(e) => setFieldValues({ ...fieldValues, [field.id]: e.target.value })}
            required={field.required}
            disabled={isReadOnly}
            variant="outlined"
          />
        );
    }
  };

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
                  setSelectedTemplateId(''); // Reset template selection
                  setJwtToken(null); // Reset JWT token
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
              disabled={loadingTemplates || !selectedWorkspaceId}
            >
              <InputLabel>Plantilla</InputLabel>
              <Select
                value={selectedTemplateId}
                label="Plantilla"
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                  setJwtToken(null); // Reset JWT token cuando se cambia la plantilla
                  setTemplateFields([]); // Reset campos
                  setFieldValues({}); // Reset valores
                }}
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
              {!loadingTemplates && templates.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  No hay plantillas disponibles
                </Typography>
              )}
            </FormControl>

            {/* Formulario dinámico de campos */}
            {selectedTemplateId && templateFields.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, mb: 2 }}>
                  Campos de la Plantilla
                </Typography>
                {templateFields.map((field) => (
                  <Box key={field.id} sx={{ mb: 2 }}>
                    {renderField(field)}
                  </Box>
                ))}
              </Box>
            )}

            {loadingFields && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleGenerateJwt}
              disabled={!selectedWorkspaceId || !selectedTemplateId || loadingJwt}
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
