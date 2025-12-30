import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

export default function RequestSignature() {
  const { t } = useTranslation();
  const { isAuthenticated, getAccessToken } = useAuth();
  
  const steps = [
    t('requestSignature.steps.identifier'),
    t('requestSignature.steps.workspaceTemplate'),
    t('requestSignature.steps.recipients'),
    t('requestSignature.steps.updateFields'),
  ];
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
      setError(`${t('requestSignature.errors.loadWorkspaces')}: ${err.message}`);
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
        console.warn(t('requestSignature.errors.loadTemplates'), err);
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
      console.warn(t('requestSignature.errors.loadTemplateFields'), err);
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
        designation: t('requestSignature.step3.designationSigner'),
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

      // Generar JWT para el editor usando el ID de Firma.dev directamente
      try {
        // Usar el ID de la respuesta de Firma.dev para generar el JWT
        if (response.id) {
          const jwtData = await firmaApi.generateSigningRequestJwt(response.id);
          setEditorJwtToken(jwtData.jwt);
        }
      } catch (err) {
        console.warn(t('requestSignature.errors.generateJwt'), err);
      }

      // Avanzar al paso 4 después de crear la solicitud
      setActiveStep(3);
      setSuccessMessage(t('requestSignature.step4.requestCreated'));
    } catch (err: any) {
      setError(`${t('requestSignature.step4.createError')}: ${err.message}`);
    } finally {
      setCreatingRequest(false);
    }
  };

  const handleUpdateFields = async () => {
    if (!selectedWorkspaceId || !firmaSigningRequestId) {
      setError(t('requestSignature.step4.noRequestCreated'));
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

      setSuccessMessage(t('requestSignature.step4.fieldsUpdated'));
      setError(null);
    } catch (err: any) {
      console.error('Error al actualizar campos:', err);
      const errorMessage = err.message || t('requestSignature.step4.updateError');
      setError(`${t('requestSignature.step4.updateError')}: ${errorMessage}`);
    } finally {
      setUpdatingRequest(false);
    }
  };

  const handleSendRequest = async () => {
    if (!selectedWorkspaceId || !firmaSigningRequestId) {
      setError(t('requestSignature.step4.noRequestCreated'));
      return;
    }

    setSendingRequest(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await firmaApi.sendFirmaSigningRequest(selectedWorkspaceId, firmaSigningRequestId, {
        custom_message: t('requestSignature.step4.sendRequest'),
      });

      setSuccessMessage(t('requestSignature.step4.requestSent'));
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
      setError(`${t('requestSignature.step4.sendError')}: ${err.message}`);
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
      setError(t('requestSignature.step1.enterIdentifier'));
      return;
    }

    setValidatingIdentificador(true);
    setError(null);
    setIdentificadorValidated(false);

    try {
      const result = await firmaApi.validateIdentificador(identificador.trim());
      if (result.isValid) {
        setIdentificadorValidated(true);
        setSuccessMessage(t('requestSignature.step1.available'));
        setActiveStep(1);
      } else {
        setError(t('requestSignature.step1.identifierExists'));
        setIdentificadorValidated(false);
      }
    } catch (err: any) {
      setError(`${t('requestSignature.step1.validateError')}: ${err.message}`);
      setIdentificadorValidated(false);
    } finally {
      setValidatingIdentificador(false);
    }
  };

  const handleContinueToStep3 = () => {
    if (!selectedWorkspaceId || !selectedTemplateId) {
      setError(t('requestSignature.step2.selectWorkspaceTemplate'));
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
        {t('requestSignature.title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t('requestSignature.subtitle')}
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
              <Typography variant="h6">{t('requestSignature.step1.title')}</Typography>
              {identificadorValidated && <CheckCircleIcon color="success" />}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                label={t('requestSignature.step1.label')}
                value={identificador}
                onChange={(e) => {
                  setIdentificador(e.target.value);
                  setIdentificadorValidated(false);
                }}
                placeholder={t('requestSignature.step1.placeholder')}
                disabled={validatingIdentificador || requestSent}
                error={identificadorValidated === false && identificador.trim() !== '' && !validatingIdentificador}
                helperText={identificadorValidated ? t('requestSignature.step1.available') : identificador.trim() !== '' && !validatingIdentificador ? t('requestSignature.step1.mustValidate') : ''}
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
                    {t('requestSignature.step1.validating')}
                  </>
                ) : (
                  t('requestSignature.step1.validate')
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
              <Typography variant="h6">{t('requestSignature.step2.title')}</Typography>
              {selectedWorkspaceId && selectedTemplateId && <CheckCircleIcon color="success" />}
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <FormControl fullWidth sx={{ mb: 2 }} disabled={loadingWorkspaces || requestSent}>
              <InputLabel>{t('requestSignature.step2.workspace')}</InputLabel>
              <Select
                value={selectedWorkspaceId}
                label={t('requestSignature.step2.workspace')}
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
              <InputLabel>{t('requestSignature.step2.template')}</InputLabel>
              <Select
                value={selectedTemplateId}
                label={t('requestSignature.step2.template')}
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
              {t('requestSignature.step2.continue')}
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
              <Typography variant="h6">{t('requestSignature.step3.title')}</Typography>
              {createdSigningRequest && <CheckCircleIcon color="success" />}
            </Box>
          </AccordionSummary>
          <AccordionDetails>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {t('requestSignature.step3.recipients')}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddRecipient}
                disabled={requestSent}
              >
                {t('requestSignature.step3.addRecipient')}
              </Button>
            </Box>

            {recipients.map((recipient, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="subtitle2">{t('requestSignature.step3.recipient')} {index + 1}</Typography>
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
                      label={`${t('requestSignature.step3.firstName')} *`}
                      value={recipient.first_name}
                      onChange={(e) => handleRecipientChange(index, 'first_name', e.target.value)}
                      size="small"
                      disabled={requestSent}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label={`${t('requestSignature.step3.lastName')} *`}
                      value={recipient.last_name}
                      onChange={(e) => handleRecipientChange(index, 'last_name', e.target.value)}
                      size="small"
                      disabled={requestSent}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={`${t('requestSignature.step3.email')} *`}
                      type="email"
                      value={recipient.email}
                      onChange={(e) => handleRecipientChange(index, 'email', e.target.value)}
                      size="small"
                      disabled={requestSent}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <FormControl fullWidth size="small" disabled={requestSent}>
                      <InputLabel>{t('requestSignature.step3.designation')}</InputLabel>
                      <Select
                        value={recipient.designation}
                        label={t('requestSignature.step3.designation')}
                        onChange={(e) => handleRecipientChange(index, 'designation', e.target.value)}
                      >
                        <MenuItem value="Signer">{t('requestSignature.step3.designationSigner')}</MenuItem>
                        <MenuItem value="CC">{t('requestSignature.step3.designationCC')}</MenuItem>
                        <MenuItem value="Approver">{t('requestSignature.step3.designationApprover')}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label={t('requestSignature.step3.order')}
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
                {t('requestSignature.step3.noRecipients')}
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
                  {t('requestSignature.step3.creating')}
                </>
              ) : (
                t('requestSignature.step3.createRequest')
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
                <Typography variant="h6">{t('requestSignature.step4.title')}</Typography>
                {requestSent && <CheckCircleIcon color="success" />}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography component="span" variant="body1">
                    <strong>{t('requestSignature.step4.id')}:</strong> {createdSigningRequest.id}
                  </Typography>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Typography component="span" variant="body1">
                    <strong>{t('requestSignature.step4.name')}:</strong> {createdSigningRequest.name}
                </Typography>
                </Box>
                <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography component="span" variant="body1">
                    <strong>{t('requestSignature.step4.status')}:</strong>
                  </Typography>
                  <Chip label={createdSigningRequest.status} size="small" />
                </Box>
                {createdSigningRequest.document_url && (
                  <Box sx={{ mb: 1 }}>
                    <Typography component="span" variant="body1">
                      <strong>{t('requestSignature.step4.document')}:</strong>{' '}
                      <a href={createdSigningRequest.document_url} target="_blank" rel="noopener noreferrer">
                        {t('requestSignature.step4.viewDocument')}
                      </a>
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Campos del Template - Formulario Editable */}
              {templateFields.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 2, 
                      mb: 2, 
                      bgcolor: 'primary.light', 
                      background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
                      border: '2px solid',
                      borderColor: 'primary.main',
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                      {t('requestSignature.step4.templateFields')}
                    </Typography>
                  </Paper>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {templateFields
                      .sort((a, b) => {
                        // Ordenar: campos signature/initial al final
                        const aType = (a.type || a.fieldType || a.FieldType || 'text').toLowerCase();
                        const bType = (b.type || b.fieldType || b.FieldType || 'text').toLowerCase();
                        const aIsSignature = aType === 'signature' || aType === 'initial';
                        const bIsSignature = bType === 'signature' || bType === 'initial';
                        if (aIsSignature && !bIsSignature) return 1;
                        if (!aIsSignature && bIsSignature) return -1;
                        return 0;
                      })
                      .map((field, index) => {
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
                                  {fieldName} ({fieldType}) - {t('requestSignature.step4.page')} {pageNumber}
                                  {isRequired && <span style={{ color: 'red' }}> {t('requestSignature.step4.required')}</span>}
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
                                  value={currentValue || `[${t('requestSignature.step4.signatureRequired')}]`}
                                  disabled
                                  helperText={t('requestSignature.step4.signatureRequired')}
                                />
                              ) : (
                                <TextField
                                  fullWidth
                                  size="small"
                                  value={currentValue}
                                  onChange={(e) => handleFieldValueChange(fieldId, e.target.value)}
                                  disabled={isReadOnly || requestSent}
                                  placeholder={`${t('requestSignature.step4.enterValue')} ${fieldName}`}
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
                  setError(`${t('requestSignature.step4.editorError')}: ${error?.message || t('requestSignature.step4.editorError')}`);
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
                    {t('requestSignature.step4.updating')}
                  </>
                ) : (
                  t('requestSignature.step4.updateFields')
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
                  {t('requestSignature.step4.sending')}
                </>
              ) : (
                t('requestSignature.step4.sendRequest')
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
              {t('requestSignature.step4.newRequest')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
