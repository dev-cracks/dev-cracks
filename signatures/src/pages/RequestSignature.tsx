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
  TextField,
  IconButton,
  Card,
  CardContent,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { firmaApi, Template, Workspace, Recipient, CreateFirmaSigningRequestRequest, FirmaSigningRequestResponse, UpdateSigningRequestRequest, SigningRequestField } from '../services/firmaApi';
import { useAuth } from '../hooks/useAuth';
import SigningRequestEditor from '../components/SigningRequestEditor';

const steps = [
  'Identificador',
  'Workspace y Template',
  'Recipientes',
  'Actualizar Campos',
];

export default function RequestSignature() {
  const { isAuthenticated, getAccessToken } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [identificador, setIdentificador] = useState<string>('');
  const [identificadorValidated, setIdentificadorValidated] = useState(false);
  const [validatingIdentificador, setValidatingIdentificador] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [templateFields, setTemplateFields] = useState<any[]>([]);
  const [fieldValues, setFieldValues] = useState<Record<string, any>>({});
  const [createdSigningRequest, setCreatedSigningRequest] = useState<FirmaSigningRequestResponse | null>(null);
  
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(false);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [creatingRequest, setCreatingRequest] = useState(false);
  const [updatingRequest, setUpdatingRequest] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editorJwtToken, setEditorJwtToken] = useState<string | null>(null);
  const [firmaSigningRequestId, setFirmaSigningRequestId] = useState<string>('');
  const [requestSent, setRequestSent] = useState(false);

  // Configurar el proveedor de tokens y cargar workspaces y plantillas cuando el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated && getAccessToken) {
      firmaApi.setAccessTokenProvider(getAccessToken);
      loadWorkspaces();
      loadAllTemplates();
    }
  }, [isAuthenticated, getAccessToken]);

  // Cargar campos del template cuando se selecciona un template
  useEffect(() => {
    if (selectedWorkspaceId && selectedTemplateId) {
      loadTemplateFields();
    } else {
      setTemplateFields([]);
    }
  }, [selectedWorkspaceId, selectedTemplateId]);


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
      const allTemplates = await firmaApi.listAllTemplates();
      let templatesWithId: Template[] = [];
      try {
        templatesWithId = await firmaApi.listTemplates();
      } catch (err) {
        console.warn('No se pudieron cargar templates con Id local:', err);
      }

      const templatesWithIdMap = new Map(
        templatesWithId.map(t => [t.firmaTemplateId, t])
      );

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

  const loadTemplateFields = async () => {
    if (!selectedWorkspaceId || !selectedTemplateId) return;
    
    setError(null);
    try {
      const fields = await firmaApi.getFirmaTemplateFields(selectedWorkspaceId, selectedTemplateId);
      setTemplateFields(fields);
      // Inicializar valores de campos vacíos
      const initialValues: Record<string, any> = {};
      fields.forEach((field: any) => {
        initialValues[field.id || field.Id] = field.prefilledData || field.readOnlyValue || '';
      });
      setFieldValues(initialValues);
    } catch (err: any) {
      console.warn('Error al cargar campos del template:', err);
      setTemplateFields([]);
      setFieldValues({});
    }
  };

  const handleFieldValueChange = (fieldId: string, value: any) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleAddRecipient = () => {
    setRecipients([
      ...recipients,
      {
        first_name: '',
        last_name: '',
        email: '',
        designation: 'Signer',
        order: recipients.length + 1,
      },
    ]);
  };

  const handleRemoveRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const handleRecipientChange = (index: number, field: keyof Recipient, value: any) => {
    const updated = [...recipients];
    updated[index] = { ...updated[index], [field]: value };
    setRecipients(updated);
  };

  const validateRecipients = (): boolean => {
    for (const recipient of recipients) {
      if (!recipient.first_name.trim() || !recipient.last_name.trim() || !recipient.email.trim()) {
        setError('Todos los recipients deben tener first_name, last_name y email');
        return false;
      }
      // Validar email básico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(recipient.email)) {
        setError(`El email ${recipient.email} no es válido`);
        return false;
      }
    }
    return true;
  };

  const handleCreateSigningRequest = async () => {
    if (!selectedWorkspaceId || !selectedTemplateId) {
      setError('Por favor selecciona un workspace y una plantilla');
      return;
    }

    if (!identificador.trim() || !identificadorValidated) {
      setError('Por favor valida el identificador primero');
      return;
    }

    if (recipients.length === 0) {
      setError('Por favor agrega al menos un recipient');
      return;
    }

    if (!validateRecipients()) {
      return;
    }

    setCreatingRequest(true);
    setError(null);

    try {
      const request: CreateFirmaSigningRequestRequest = {
        template_id: selectedTemplateId,
        identificador: identificador.trim(),
        creation_source: 'Manual',
        recipients: recipients.map((r, index) => ({
          ...r,
          order: r.order || index + 1,
        })),
      };

      const response = await firmaApi.createFirmaSigningRequest(selectedWorkspaceId, request);
      setCreatedSigningRequest(response);
      setFirmaSigningRequestId(response.id);

      // Actualizar recipients con los IDs de la respuesta si están disponibles
      if (response.recipients && Array.isArray(response.recipients)) {
        const updatedRecipients = recipients.map((recipient, index) => {
          const responseRecipient = response.recipients![index];
          return {
            ...recipient,
            id: responseRecipient?.id || recipient.id,
          };
        });
        setRecipients(updatedRecipients);
      }

      // Generar JWT para el editor
      try {
        // Buscar el template para obtener el ID local
      const selectedTemplate = templates.find((t) => t.firmaTemplateId === selectedTemplateId);
        if (selectedTemplate?.id) {
          // Crear signing request local para obtener el ID
          const localRequest = await firmaApi.createSigningRequest({
            templateId: selectedTemplate.id,
            sendEmail: false,
          });
          const jwtData = await firmaApi.generateSigningRequestJwt(localRequest.id);
          setEditorJwtToken(jwtData.jwt);
        }
      } catch (err) {
        console.warn('No se pudo generar JWT para el editor:', err);
      }

      // Avanzar al paso 4 después de crear la solicitud
      setActiveStep(3);
      setSuccessMessage('Signing request creada exitosamente');
    } catch (err: any) {
      setError(`Error al crear signing request: ${err.message}`);
    } finally {
      setCreatingRequest(false);
    }
  };

  const handleUpdateFields = async () => {
    if (!selectedWorkspaceId || !firmaSigningRequestId) {
      setError('No hay signing request creada');
      return;
    }

    setUpdatingRequest(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Obtener recipients de la signing request creada si están disponibles
      const requestRecipients = (createdSigningRequest as any)?.recipients || recipients;
      
      // Convertir templateFields a SigningRequestField con los valores editados
      const fields: SigningRequestField[] = templateFields
        .map((field, index) => {
          const fieldId = field.id || field.Id || `field-${index}`;
          // Asignar campos a recipients según el orden
          const recipientIndex = index % requestRecipients.length;
          const recipient = requestRecipients[recipientIndex];
          
          // Obtener el valor del campo desde fieldValues
          const fieldValue = fieldValues[fieldId];
          let fieldType = field.type || field.fieldType || field.FieldType || 'text';
          
          // Mapear tipos no válidos a tipos válidos para firma.dev
          // firma.dev no acepta "number", se mapea a "text"
          if (fieldType === 'number') {
            fieldType = 'text';
          }
          
          // Usar el recipient_id del campo original si existe, sino usar el del recipient asignado
          const recipientId = field.recipientId || field.RecipientId || recipient?.id || '';
          
          // Construir el objeto del campo
          const fieldObj: SigningRequestField = {
            id: fieldId, // Incluir ID si existe para actualizar campos existentes
            type: fieldType,
            position: {
              x: field.position?.x || field.positionX || field.PositionX || 15,
              y: field.position?.y || field.positionY || field.PositionY || 85,
              width: field.position?.width || field.width || field.Width || 30,
              height: field.position?.height || field.height || field.Height || 10,
            },
            page_number: field.page_number || field.pageNumber || field.PageNumber || 1,
            required: field.required ?? field.Required ?? true,
            recipient_id: recipientId,
          };

          // Solo agregar value para campos que no son signature o initial, y que tienen un valor
          if (fieldType !== 'signature' && fieldType !== 'initial') {
            if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
              let processedValue = String(fieldValue);
              
              // Validar y corregir formato de fechas
              if (fieldType === 'date') {
                // Verificar que la fecha tenga un formato válido (YYYY-MM-DD)
                const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
                if (!dateRegex.test(processedValue)) {
                  // Intentar parsear la fecha y reformatearla
                  const date = new Date(processedValue);
                  if (!isNaN(date.getTime())) {
                    // Formatear como YYYY-MM-DD
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    processedValue = `${year}-${month}-${day}`;
                  } else {
                    // Si no se puede parsear, usar la fecha actual
                    const today = new Date();
                    const year = today.getFullYear();
                    const month = String(today.getMonth() + 1).padStart(2, '0');
                    const day = String(today.getDate()).padStart(2, '0');
                    processedValue = `${year}-${month}-${day}`;
                  }
                }
              }
              
              fieldObj.value = processedValue;
            }
          }

          return fieldObj;
        });

      const updateRequest: UpdateSigningRequestRequest = {
        fields: fields,
      };

      // Log para depuración
      console.log('Actualizando campos:', {
        workspaceId: selectedWorkspaceId,
        signingRequestId: firmaSigningRequestId,
        fieldsCount: fields.length,
        request: updateRequest,
      });

      await firmaApi.updateFirmaSigningRequest(selectedWorkspaceId, firmaSigningRequestId, updateRequest);

      setSuccessMessage('Campos actualizados exitosamente');
      setError(null);
    } catch (err: any) {
      console.error('Error al actualizar campos:', err);
      const errorMessage = err.message || 'Error desconocido al actualizar campos';
      setError(`Error al actualizar campos: ${errorMessage}`);
    } finally {
      setUpdatingRequest(false);
    }
  };

  const handleSendRequest = async () => {
    if (!selectedWorkspaceId || !firmaSigningRequestId) {
      setError('No hay signing request creada');
      return;
    }

    setSendingRequest(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await firmaApi.sendFirmaSigningRequest(selectedWorkspaceId, firmaSigningRequestId, {
        custom_message: 'Por favor firma este documento',
      });

      setSuccessMessage('Signing request enviada exitosamente');
      setError(null);
      setRequestSent(true);
      
      // Actualizar el estado de la signing request
      if (createdSigningRequest) {
        setCreatedSigningRequest({
          ...createdSigningRequest,
          status: 'sent',
        });
      }
    } catch (err: any) {
      setError(`Error al enviar signing request: ${err.message}`);
    } finally {
      setSendingRequest(false);
    }
  };

  const handleNewRequest = () => {
    // Limpiar todos los estados para un nuevo envío
    setActiveStep(0);
    setIdentificador('');
    setIdentificadorValidated(false);
    setSelectedWorkspaceId('');
    setSelectedTemplateId('');
    setRecipients([]);
    setTemplateFields([]);
    setFieldValues({});
    setCreatedSigningRequest(null);
    setEditorJwtToken(null);
    setFirmaSigningRequestId('');
    setRequestSent(false);
    setError(null);
    setSuccessMessage(null);
  };

  const handleValidateIdentificador = async () => {
    if (!identificador.trim()) {
      setError('Por favor ingresa un identificador');
      return;
    }

    setValidatingIdentificador(true);
    setError(null);
    setIdentificadorValidated(false);

    try {
      const result = await firmaApi.validateIdentificador(identificador.trim());
      if (result.isValid) {
        setIdentificadorValidated(true);
        setSuccessMessage('Identificador disponible');
        setActiveStep(1);
      } else {
        setError('Este identificador ya existe para tu tenant. Por favor usa otro.');
        setIdentificadorValidated(false);
      }
    } catch (err: any) {
      setError(`Error al validar identificador: ${err.message}`);
      setIdentificadorValidated(false);
    } finally {
      setValidatingIdentificador(false);
    }
  };

  const handleContinueToStep3 = () => {
    if (!selectedWorkspaceId || !selectedTemplateId) {
      setError('Por favor selecciona un workspace y una plantilla');
      return;
    }
    setActiveStep(2);
  };

  const handleStepChange = (step: number) => {
    // Bloquear cambios si la solicitud ya fue enviada
    if (requestSent) {
      return;
    }
    // Permitir retroceder siempre, avanzar solo si se cumplen las condiciones
    if (step < activeStep) {
      setActiveStep(step);
    } else if (step === 0 && identificadorValidated) {
      setActiveStep(step);
    } else if (step === 1 && identificadorValidated && selectedWorkspaceId && selectedTemplateId) {
      setActiveStep(step);
    } else if (step === 2 && selectedWorkspaceId && selectedTemplateId) {
      setActiveStep(step);
    } else if (step === 3 && createdSigningRequest) {
      setActiveStep(step);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Solicitar Firma de Documentos
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Crea y envía solicitudes de firma a recipients
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      {/* Stepper */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={requestSent ? steps.length : activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={requestSent ? index < steps.length : false}>
              <StepLabel
                onClick={() => handleStepChange(index)}
                sx={{ cursor: requestSent ? 'default' : 'pointer' }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Accordion con los pasos */}
      <Box>
        {/* Paso 1: Identificador */}
        <Accordion 
          expanded={activeStep === 0 && !requestSent} 
          onChange={() => handleStepChange(0)} 
          disabled={requestSent}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Typography variant="h6">1. Identificador</Typography>
              {identificadorValidated && <CheckCircleIcon color="success" />}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                label="Identificador"
                value={identificador}
                onChange={(e) => {
                  setIdentificador(e.target.value);
                  setIdentificadorValidated(false);
                }}
                placeholder="Ingresa el identificador único"
                disabled={validatingIdentificador || requestSent}
                error={identificadorValidated === false && identificador.trim() !== '' && !validatingIdentificador}
                helperText={identificadorValidated ? 'Identificador disponible' : identificador.trim() !== '' && !validatingIdentificador ? 'Debe validar el identificador' : ''}
              />
              <Button
                variant="contained"
                onClick={handleValidateIdentificador}
                disabled={validatingIdentificador || !identificador.trim() || requestSent}
                sx={{ mt: 1 }}
              >
                {validatingIdentificador ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Validando...
                  </>
                ) : (
                  'Validar'
                )}
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Paso 2: Workspace y Template */}
        <Accordion 
          expanded={activeStep === 1 && !requestSent} 
          onChange={() => handleStepChange(1)} 
          disabled={requestSent || !identificadorValidated}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Typography variant="h6">2. Workspace y Template</Typography>
              {selectedWorkspaceId && selectedTemplateId && <CheckCircleIcon color="success" />}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth sx={{ mb: 2 }} disabled={loadingWorkspaces || requestSent}>
              <InputLabel>Workspace</InputLabel>
              <Select
                value={selectedWorkspaceId}
                label="Workspace"
                onChange={(e) => {
                  setSelectedWorkspaceId(e.target.value);
                  setSelectedTemplateId('');
                  setCreatedSigningRequest(null);
                  setFirmaSigningRequestId('');
                  setEditorJwtToken(null);
                }}
              >
                {workspaces.map((workspace) => (
                  <MenuItem key={workspace.firmaWorkspaceId} value={workspace.firmaWorkspaceId}>
                    {workspace.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }} disabled={loadingTemplates || !selectedWorkspaceId || requestSent}>
              <InputLabel>Template</InputLabel>
              <Select
                value={selectedTemplateId}
                label="Template"
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                  setCreatedSigningRequest(null);
                  setFirmaSigningRequestId('');
                  setEditorJwtToken(null);
                }}
              >
                {templates.map((template) => (
                  <MenuItem key={template.firmaTemplateId} value={template.firmaTemplateId}>
                    {template.name} {template.workspaceName && `(${template.workspaceName})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              onClick={handleContinueToStep3}
              disabled={!selectedWorkspaceId || !selectedTemplateId || requestSent}
            >
              Continuar
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* Paso 3: Recipientes */}
        <Accordion 
          expanded={activeStep === 2 && !requestSent} 
          onChange={() => handleStepChange(2)} 
          disabled={requestSent}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Typography variant="h6">3. Agregar Recipientes</Typography>
              {createdSigningRequest && <CheckCircleIcon color="success" />}
            </Box>
          </AccordionSummary>
          <AccordionDetails>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Recipients
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddRecipient}
                disabled={requestSent}
              >
                Agregar Recipient
              </Button>
            </Box>

            {recipients.map((recipient, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2">Recipient {index + 1}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveRecipient(index)}
                    color="error"
                    disabled={requestSent}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="First Name *"
                      value={recipient.first_name}
                      onChange={(e) => handleRecipientChange(index, 'first_name', e.target.value)}
                      size="small"
                      disabled={requestSent}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Last Name *"
                      value={recipient.last_name}
                      onChange={(e) => handleRecipientChange(index, 'last_name', e.target.value)}
                      size="small"
                      disabled={requestSent}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email *"
                      type="email"
                      value={recipient.email}
                      onChange={(e) => handleRecipientChange(index, 'email', e.target.value)}
                      size="small"
                      disabled={requestSent}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth size="small" disabled={requestSent}>
                      <InputLabel>Designation</InputLabel>
                      <Select
                        value={recipient.designation}
                        label="Designation"
                        onChange={(e) => handleRecipientChange(index, 'designation', e.target.value)}
                      >
                        <MenuItem value="Signer">Signer</MenuItem>
                        <MenuItem value="CC">CC</MenuItem>
                        <MenuItem value="Approver">Approver</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Order"
                      type="number"
                      value={recipient.order || index + 1}
                      onChange={(e) => handleRecipientChange(index, 'order', parseInt(e.target.value) || index + 1)}
                      size="small"
                      disabled={requestSent}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            ))}

            {recipients.length === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                No hay recipients agregados. Haz clic en "Agregar Recipient" para agregar uno.
                </Typography>
              )}

            <Button
              variant="contained"
              fullWidth
              onClick={handleCreateSigningRequest}
              disabled={!selectedWorkspaceId || !selectedTemplateId || !identificadorValidated || recipients.length === 0 || creatingRequest || requestSent}
              sx={{ mt: 2 }}
            >
              {creatingRequest ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Creando...
                </>
              ) : (
                'Crear Request'
              )}
            </Button>
          </AccordionDetails>
        </Accordion>

        {/* Paso 4: Actualizar Campos */}
        {createdSigningRequest && (
          <Accordion 
            expanded={activeStep === 3 && !requestSent} 
            onChange={() => handleStepChange(3)} 
            disabled={requestSent}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <Typography variant="h6">4. Actualizar los Campos</Typography>
                {requestSent && <CheckCircleIcon color="success" />}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography component="span" variant="body1">
                    <strong>ID:</strong> {createdSigningRequest.id}
                  </Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography component="span" variant="body1">
                    <strong>Nombre:</strong> {createdSigningRequest.name}
                </Typography>
                </Box>
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography component="span" variant="body1">
                    <strong>Estado:</strong>
                  </Typography>
                  <Chip label={createdSigningRequest.status} size="small" />
                </Box>
                {createdSigningRequest.document_url && (
                  <Box sx={{ mb: 1 }}>
                    <Typography component="span" variant="body1">
                      <strong>Documento:</strong>{' '}
                      <a href={createdSigningRequest.document_url} target="_blank" rel="noopener noreferrer">
                        Ver documento
                      </a>
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Campos del Template - Formulario Editable */}
              {templateFields.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Campos del Template - Editar Valores:
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {templateFields.map((field, index) => {
                      const fieldId = field.id || field.Id || `field-${index}`;
                      const fieldType = field.type || field.fieldType || field.FieldType || 'text';
                      const fieldName = field.fieldName || field.variableName || field.FieldName || field.VariableName || `Campo ${index + 1}`;
                      const pageNumber = field.page_number || field.pageNumber || field.PageNumber || 1;
                      const isRequired = field.required || field.Required || false;
                      const isReadOnly = field.readOnly || field.ReadOnly || false;
                      const currentValue = fieldValues[fieldId] || '';

                      return (
                        <Grid item xs={12} sm={6} md={4} key={fieldId}>
                          <Card variant="outlined">
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                              <Box sx={{ mb: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                  {fieldName} ({fieldType}) - Página {pageNumber}
                                  {isRequired && <span style={{ color: 'red' }}> *</span>}
                                </Typography>
                              </Box>
                              {fieldType === 'dropdown' && field.dropdownOptions ? (
                                <FormControl fullWidth size="small">
                                  <Select
                                    value={currentValue}
                                    onChange={(e) => handleFieldValueChange(fieldId, e.target.value)}
                                    disabled={isReadOnly || requestSent}
                                  >
                                    {field.dropdownOptions.map((option: string, optIndex: number) => (
                                      <MenuItem key={optIndex} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ) : fieldType === 'date' ? (
                                <TextField
                                  fullWidth
                                  type="date"
                                  size="small"
                                  value={currentValue}
                                  onChange={(e) => handleFieldValueChange(fieldId, e.target.value)}
                                  disabled={isReadOnly || requestSent}
                                  InputLabelProps={{ shrink: true }}
                                />
                              ) : fieldType === 'signature' || fieldType === 'initial' ? (
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={currentValue || '[Firma requerida]'}
                                  disabled
                                  helperText="Este campo se completará al firmar"
                                />
                              ) : (
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={currentValue}
                                  onChange={(e) => handleFieldValueChange(fieldId, e.target.value)}
                                  disabled={isReadOnly || requestSent}
                                  placeholder={`Ingrese valor para ${fieldName}`}
                                  multiline={fieldType === 'textarea' || fieldType === 'text'}
                                  rows={fieldType === 'textarea' ? 3 : 1}
                                />
                              )}
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              )}

              {/* Editor de Signing Request */}
              {editorJwtToken && firmaSigningRequestId && (
                <Box sx={{ mb: 2 }}>
              <SigningRequestEditor
                signingRequestId={firmaSigningRequestId}
                jwt={editorJwtToken}
                theme="light"
                readOnly={requestSent}
                    height="400px"
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
                </Box>
              )}

              {/* Botón para actualizar campos */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleUpdateFields}
                  disabled={updatingRequest || sendingRequest || requestSent}
                fullWidth
                sx={{ mt: 2 }}
              >
                {updatingRequest ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Actualizando...
                  </>
                ) : (
                  'Actualizar Campos'
                )}
              </Button>
            </AccordionDetails>
          </Accordion>
        )}

        {/* Botón de enviar solicitud fuera del accordion */}
        {createdSigningRequest && !requestSent && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSendRequest}
              disabled={sendingRequest || updatingRequest}
              sx={{ minWidth: 200 }}
            >
              {sendingRequest ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Enviando...
                </>
              ) : (
                'Enviar Solicitud'
              )}
            </Button>
          </Box>
        )}

        {/* Botón para enviar otra solicitud cuando se envía exitosamente */}
        {requestSent && (
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleNewRequest}
              sx={{ minWidth: 200 }}
            >
              Enviar Otra Solicitud
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
