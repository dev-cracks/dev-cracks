# Integración con Firma.dev - Documentación Completa

## Índice

1. [Introducción](#introducción)
2. [Arquitectura General](#arquitectura-general)
3. [Backend - API Integration](#backend---api-integration)
4. [Backend - Endpoints](#backend---endpoints)
5. [Backend - Webhooks](#backend---webhooks)
6. [Frontend - Backoffice (Gestión)](#frontend---backoffice-gestión)
7. [Frontend - Signatures (Usuarios Finales)](#frontend---signatures-usuarios-finales)
8. [Flujos de Uso](#flujos-de-uso)
9. [Configuración](#configuración)
10. [Seguridad](#seguridad)
11. [Troubleshooting](#troubleshooting)

---

## Introducción

Esta documentación describe la integración completa con Firma.dev para proporcionar funcionalidad de firmas electrónicas en la plataforma. La solución está dividida en dos partes principales:

- **Backoffice**: Gestión y configuración de templates, workspace settings, webhooks y monitoreo
- **Signatures**: Aplicación para usuarios finales donde se realiza el proceso de firma

### Características Principales

- ✅ Multi-tenant: Cada tenant/cliente tiene su propio workspace en Firma.dev
- ✅ Creación automática de workspace al crear un tenant
- ✅ Gestión completa de templates (plantillas de documentos)
- ✅ Envío de solicitudes de firma con múltiples firmantes
- ✅ Firma embebida para usuarios finales
- ✅ Webhooks para actualización automática de estados
- ✅ Workspace settings personalizables por cliente
- ✅ JWT tokens para editores embebidos
- ✅ Acceso desde portal principal (GhostCursorPage)

---

## Arquitectura General

### Separación de Responsabilidades

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND                                 │
├──────────────────────────┬──────────────────────────────────┤
│   BACKOFFICE             │   SIGNATURES                     │
│   (Gestión)              │   (Usuarios Finales)             │
├──────────────────────────┼──────────────────────────────────┤
│ - Templates CRUD         │ - Página de firma                │
│ - Workspace Settings     │ - Vista de documento             │
│ - Webhooks Management    │ - Componente de firma embebido   │
│ - Signing Requests List  │ - Descarga de documento          │
│ - Monitoreo y Analytics  │                                   │
│ - Configuración          │                                   │
└──────────────────────────┴──────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API                               │
├─────────────────────────────────────────────────────────────┤
│ - FirmaEndpoints (/firma/*)                                 │
│ - FirmaWebhookEndpoints (/firma/webhooks/receive)          │
│ - Integración con Firma.dev API                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              FIRMA.DEV API                                   │
│  https://api.firma.dev/functions/v1/signing-request-api     │
└─────────────────────────────────────────────────────────────┘
```

### Modelo de Datos

#### Entidades Principales

**FirmaWorkspace**
- Vinculado a un Tenant
- Almacena `firma_workspace_id` y `firma_api_key` (encriptado)
- Contiene configuración del workspace (settings JSON)

**FirmaTemplate**
- Vinculado a un Tenant
- Almacena `firma_template_id` y metadata del template
- Referencia al documento PDF

**FirmaSigningRequest**
- Vinculado a un Tenant y opcionalmente a un Template
- Almacena `firma_signing_request_id` y `envelope_id`
- Estado: Draft, Sent, Completed, Declined, Expired
- URL del documento firmado cuando está completado

**FirmaWebhook**
- Vinculado a un Tenant
- Almacena `firma_webhook_id` y `secret` (encriptado)
- Configuración de eventos suscritos

---

## Backend - API Integration

### Base URL

```
https://api.firma.dev/functions/v1/signing-request-api
```

### Autenticación

Todas las peticiones requieren el header:
```
Authorization: {apiKey}
```

O formato Bearer (opcional):
```
Authorization: Bearer {apiKey}
```

### FirmaService

Cliente HTTP que implementa `IFirmaService` para comunicarse con Firma.dev API.

**Configuración:**
- Base URL: Configurable en `FirmaOptions`
- API Key: Del workspace protegido (para operaciones de compañía) o del workspace específico
- Timeout: 30 segundos
- Retry: 3 intentos para operaciones críticas

### Endpoints de Firma.dev Utilizados

#### Workspaces
- `POST /workspaces` - Crear workspace
- `GET /workspaces` - Listar workspaces
- `GET /workspaces/{id}` - Obtener workspace
- `PUT /workspaces/{id}` - Actualizar workspace
- `GET /workspaces/{id}/settings` - Obtener configuración
- `PUT /workspaces/{id}/settings` - Actualizar configuración
- `POST /workspaces/{id}/api-key/regenerate` - Regenerar API key

#### Templates
- `POST /templates` - Crear template
- `GET /templates` - Listar templates
- `GET /templates/{id}` - Obtener template
- `PUT /templates/{id}` - Actualizar template
- `DELETE /templates/{id}` - Eliminar template

#### Signing Requests
- `POST /signing-requests` - Crear y enviar solicitud
- `GET /signing-requests` - Listar solicitudes
- `GET /signing-requests/{id}` - Obtener solicitud
- `GET /signing-requests/{id}/document` - Descargar documento firmado

#### JWT Tokens
- `POST /generate-template-token` - Generar JWT para editor de template
- `POST /generate-signing-request-token` - Generar JWT para editor de signing request
- `POST /generate-signing-token` - Generar JWT para firma embebida
- `POST /revoke-template-token` - Revocar token de template
- `POST /revoke-signing-request-token` - Revocar token de signing request

#### Webhooks
- `POST /webhooks` - Crear webhook
- `GET /webhooks` - Listar webhooks
- `GET /webhooks/{id}` - Obtener webhook
- `PUT /webhooks/{id}` - Actualizar webhook
- `DELETE /webhooks/{id}` - Eliminar webhook

#### Company
- `GET /company` - Obtener información de la compañía (créditos)

---

## Backend - Endpoints

### FirmaEndpoints

Todos los endpoints están bajo el prefijo `/firma` y requieren autenticación.

#### Workspace

**GET /firma/workspace**
- Obtiene el workspace del tenant actual
- Response: `FirmaWorkspaceDto`

**GET /firma/workspace/settings**
- Obtiene la configuración del workspace
- Response: `FirmaWorkspaceSettingsDto`

**PUT /firma/workspace/settings**
- Actualiza la configuración del workspace
- Request: `UpdateWorkspaceSettingsRequest`
- Response: `FirmaWorkspaceSettingsDto`

**POST /firma/workspace/regenerate-api-key**
- Regenera la API key del workspace
- Requiere rol: `root`
- Response: Nueva API key (encriptada y guardada)

#### Templates

**POST /firma/templates**
- Crea un nuevo template
- Request: `CreateTemplateRequest` (name, document file/URL)
- Response: `FirmaTemplateDto`

**GET /firma/templates**
- Lista todos los templates del tenant
- Query params: `page`, `limit`, `search`
- Response: `IEnumerable<FirmaTemplateDto>`

**GET /firma/templates/{id}**
- Obtiene un template específico
- Response: `FirmaTemplateDto`

**PUT /firma/templates/{id}**
- Actualiza un template
- Request: `UpdateTemplateRequest`
- Response: `FirmaTemplateDto`

**DELETE /firma/templates/{id}**
- Elimina un template
- Response: `204 No Content`

**POST /firma/templates/{id}/jwt-token**
- Genera JWT token para editor embebido de template
- Response: `JwtTokenDto` (jwt, jwt_id, expires_at)

#### Signing Requests

**POST /firma/signing-requests**
- Crea y envía una solicitud de firma
- Request: `CreateSigningRequestRequest`
  - `template_id` (opcional) o `document` (file/URL)
  - `signers`: Array de `SignerDto` (name, email, role)
  - `message` (opcional)
  - `expiration_date` (opcional)
  - `send_email` (default: true)
- Response: `FirmaSigningRequestDto`

**GET /firma/signing-requests**
- Lista solicitudes del tenant
- Query params: `status`, `template_id`, `page`, `limit`
- Response: `IEnumerable<FirmaSigningRequestDto>`

**GET /firma/signing-requests/{id}**
- Obtiene detalles de una solicitud
- Response: `FirmaSigningRequestDto` con información completa

**GET /firma/signing-requests/{id}/document**
- Descarga el documento firmado
- Response: `FileResult` (PDF)

**POST /firma/signing-requests/{id}/jwt-token**
- Genera JWT para editor embebido de signing request
- Response: `JwtTokenDto`

**POST /firma/signing-requests/{id}/signing-jwt-token**
- Genera JWT para página de firma embebida
- Response: `JwtTokenDto`

**POST /firma/signing-requests/{id}/resend**
- Reenvía una solicitud de firma
- Response: `FirmaSigningRequestDto`

**POST /firma/signing-requests/{id}/cancel**
- Cancela una solicitud de firma
- Response: `FirmaSigningRequestDto`

#### Webhooks

**POST /firma/webhooks**
- Crea un webhook
- Request: `CreateWebhookRequest` (url, events[])
- Response: `FirmaWebhookDto`

**GET /firma/webhooks**
- Lista webhooks del tenant
- Response: `IEnumerable<FirmaWebhookDto>`

**GET /firma/webhooks/{id}**
- Obtiene un webhook específico
- Response: `FirmaWebhookDto`

**PUT /firma/webhooks/{id}**
- Actualiza un webhook
- Request: `UpdateWebhookRequest`
- Response: `FirmaWebhookDto`

**DELETE /firma/webhooks/{id}**
- Elimina un webhook
- Response: `204 No Content`

#### Company

**GET /firma/credits**
- Obtiene créditos disponibles de la compañía
- Requiere rol: `root`
- Response: `{ credits: number }`

---

## Backend - Webhooks

### FirmaWebhookEndpoints

**POST /firma/webhooks/receive**
- Endpoint público para recibir eventos de Firma.dev
- No requiere autenticación (solo validación de signature)
- Valida signature usando HMAC-SHA256
- Procesa eventos y actualiza estado en base de datos

### Eventos Soportados

- `signing_request.sent` - Solicitud enviada
- `signing_request.viewed` - Documento visto por firmante
- `signing_request.signed` - Documento firmado (parcial si hay múltiples firmantes)
- `signing_request.completed` - Proceso completo (todos los firmantes)
- `signing_request.declined` - Firma rechazada
- `signing_request.expired` - Solicitud expirada

### Validación de Webhook

1. Obtener signature del header `X-Firma-Signature`
2. Obtener secret del webhook desde base de datos
3. Calcular HMAC-SHA256 del body con el secret
4. Comparar con signature recibida
5. Si coincide, procesar evento; si no, rechazar (401)

### Procesamiento de Eventos

```csharp
// Pseudocódigo
var signingRequest = await GetSigningRequestByFirmaId(event.signing_request_id);
if (signingRequest == null) return;

switch (event.type) {
    case "signing_request.completed":
        signingRequest.Status = FirmaSigningRequestStatus.Completed;
        signingRequest.SignedDocumentUrl = event.signed_document_url;
        break;
    case "signing_request.declined":
        signingRequest.Status = FirmaSigningRequestStatus.Declined;
        break;
    // ... otros casos
}

await UpdateSigningRequest(signingRequest);
```

---

## Frontend - Backoffice (Gestión)

### Ubicación
- Ruta base: `/backoffice`
- Módulo: Nuevas páginas dentro del backoffice existente

### Páginas Implementadas

#### 1. Templates Management (`/backoffice/firma/templates`)

**Funcionalidades:**
- Lista de templates con DataGrid de Fluent UI
- Crear nuevo template (upload PDF + formulario)
- Editar template (usando editor embebido de Firma.dev)
- Eliminar template
- Duplicar template
- Búsqueda y filtros
- Vista previa de templates
- Estadísticas de uso

**Componentes:**
- `TemplatesList.tsx` - Lista con acciones
- `TemplateForm.tsx` - Formulario de creación/edición
- `TemplateEditor.tsx` - Editor embebido de Firma.dev
- `DocumentUpload.tsx` - Componente de upload de PDF

#### 2. Signing Requests Management (`/backoffice/firma/signing-requests`)

**Funcionalidades:**
- Lista de solicitudes con filtros avanzados
- Crear nueva solicitud de firma
- Ver detalles y auditoría de solicitud
- Descargar documentos firmados
- Reenviar solicitudes
- Cancelar solicitudes
- Filtros: estado, fecha, template, firmante
- Búsqueda

**Componentes:**
- `SigningRequestsList.tsx` - Lista con filtros
- `SigningRequestForm.tsx` - Formulario de creación
- `SigningRequestDetail.tsx` - Vista detallada con timeline
- `SignerList.tsx` - Lista de firmantes con estados
- `StatusBadge.tsx` - Badge de estado
- `Timeline.tsx` - Timeline de eventos

#### 3. Workspace Settings (`/backoffice/firma/workspace/settings`)

**Funcionalidades:**
- Configuración de email templates (subject, body)
- Selector de timezone (IANA format)
- Configuración de información del equipo
- Preview de plantillas de email
- Guardado de configuración

**Componentes:**
- `WorkspaceSettingsForm.tsx` - Formulario de configuración
- `EmailTemplateEditor.tsx` - Editor de plantillas
- `TimezoneSelector.tsx` - Selector de timezone

#### 4. Webhooks Management (`/backoffice/firma/webhooks`)

**Funcionalidades:**
- Lista de webhooks configurados
- Crear nuevo webhook
- Editar webhook
- Eliminar webhook
- Ver historial de eventos recibidos
- Estado de webhook (activo/inactivo)

**Componentes:**
- `WebhooksList.tsx` - Lista de webhooks
- `WebhookForm.tsx` - Formulario de creación/edición
- `WebhookEventsLog.tsx` - Log de eventos recibidos

#### 5. Dashboard (`/backoffice/firma/dashboard`)

**Funcionalidades:**
- Estadísticas generales
- Templates recientes
- Solicitudes pendientes
- Gráficos de uso
- Enlaces rápidos

**Componentes:**
- `FirmaDashboard.tsx` - Dashboard principal
- `StatsCards.tsx` - Tarjetas de estadísticas
- `RecentTemplates.tsx` - Lista de templates recientes
- `PendingRequests.tsx` - Lista de solicitudes pendientes

### Integración con Backoffice Existente

- Agregar menú "Firmas Electrónicas" en la navegación del backoffice
- Usar componentes de Fluent UI 9 consistentes con el resto del backoffice
- Mantener el mismo patrón de autenticación y autorización
- Integrar con el sistema de notificaciones existente

### Integración con Portal

**Modificar `portal/src/pages/GhostCursorPage.tsx`:**

Agregar icono "Signatures" en el array `navItems`:

```tsx
const SignaturesIcon = () => (
  <svg stroke="#ffffff" fill="#ffffff" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.5 2.02h-17c-1.24 0-2.25 1.01-2.25 2.25v15.5c0 1.24 1.01 2.25 2.25 2.25h17c1.24 0 2.25-1.01 2.25-2.25V4.27c0-1.24-1.01-2.25-2.25-2.25zm.75 17.75c0 .41-.34.75-.75.75h-17c-.41 0-.75-.34-.75-.75V4.27c0-.41.34-.75.75-.75h17c.41 0 .75.34.75.75v15.5z" strokeWidth="0"></path>
    <path d="M5.5 8h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h4c.55 0 1-.45 1-1s-.45-1-1-1h-4c-.55 0-1 .45-1 1s.45 1 1 1zm0 4h7c.55 0 1-.45 1-1s-.45-1-1-1h-7c-.55 0-1 .45-1 1s.45 1 1 1zm11.5-3.5c.28 0 .5-.22.5-.5v-5c0-.28-.22-.5-.5-.5s-.5.22-.5.5v5c0 .28.22.5.5.5zm1.5 1.5c-.28 0-.5.22-.5.5s.22.5.5.5h1.5c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5s-.5.22-.5.5v2.5h-1z" strokeWidth="0"></path>
  </svg>
);

const navItems = [
  // ... items existentes
  { path: '/signatures', label: 'Signatures', icon: <SignaturesIcon />, absolute: true }
];
```

- Icono SVG relacionado con firmas/documentos (lápiz/firma)
- Ruta absoluta: `/signatures` (redirige a la aplicación signatures)
- Aparece junto con otras aplicaciones (Dashboard, Backoffice, Dev-coach, etc.)
- Acceso directo desde la raíz del portal

---

## Frontend - Signatures (Usuarios Finales)

### Ubicación
- Ruta base: `/signatures`
- Aplicación independiente con Material-UI
- Acceso desde portal: Icono en GhostCursorPage que redirige a `/signatures`

### Páginas Implementadas

#### 1. Signing Page (`/signatures/sign/{jwt-token}`)

**Funcionalidades:**
- Página pública para que los firmantes completen la firma
- Accesible mediante URL única con JWT token
- Vista del documento completo
- Componente de firma embebido de Firma.dev
- Instrucciones claras para el firmante
- Confirmación visual después de firmar
- Descarga del documento firmado
- Actualización de estado en tiempo real

**Componentes:**
- `SigningPage.tsx` - Página principal
- `SigningViewer.tsx` - Componente embebido de Firma.dev
- `DocumentViewer.tsx` - Vista del documento
- `SigningInstructions.tsx` - Instrucciones para el firmante
- `SigningConfirmation.tsx` - Confirmación después de firmar

**Flujo:**
1. Firmante recibe email con link único
2. Accede a `/signatures/sign/{jwt-token}`
3. Ve el documento y las instrucciones
4. Completa la firma usando el componente embebido
5. Confirma y descarga el documento firmado
6. Estado se actualiza automáticamente vía webhook

### Características de la Aplicación Signatures

- **Material-UI**: Diseño moderno y responsive
- **Pública**: No requiere autenticación (solo JWT token válido)
- **Optimizada**: Carga rápida, mínimo JavaScript
- **Accesible**: Cumple estándares de accesibilidad
- **Multi-idioma**: Soporte para es, en, de, fr, zh

---

## Flujos de Uso

### Flujo 1: Crear Template y Enviar Solicitud (Backoffice)

1. **Admin accede a Backoffice**
   - Navega a `/backoffice/firma/templates`
   - Ve lista de templates existentes

2. **Crear nuevo Template**
   - Clic en "Crear Template"
   - Sube PDF o selecciona documento
   - Opción: Usa editor embebido para colocar campos visualmente
   - Guarda template con nombre descriptivo

3. **Enviar Solicitud de Firma**
   - Desde TemplatesPage: Selecciona template y clic en "Enviar para Firma"
   - O desde SigningRequestsPage: Clic en "Nueva Solicitud"
   - Selecciona el template o sube nuevo documento
   - Configura firmantes (nombre, email, rol)
   - Personaliza mensaje y fecha de expiración
   - Opción: Usa editor embebido para personalización avanzada
   - Envía solicitud

4. **Monitoreo**
   - En SigningRequestsPage ve estado de solicitudes
   - Recibe actualizaciones automáticas vía webhooks
   - Accede a detalles para ver timeline completo
   - Descarga documentos firmados cuando estén completos

### Flujo 2: Firmante Completa Firma (Signatures)

1. **Firmante Recibe Email**
   - Email con link único: `https://tudominio.com/signatures/sign/{jwt-token}`
   - Mensaje personalizado del remitente

2. **Accede a Página de Firma**
   - Clic en link del email
   - Página carga con documento visible
   - Ve instrucciones claras

3. **Completa Firma**
   - Interactúa con componente embebido de Firma.dev
   - Ve documento completo
   - Completa campos requeridos (firma, iniciales, fecha, etc.)
   - Confirma firma

4. **Confirmación**
   - Ve confirmación visual
   - Opción de descargar documento firmado
   - Estado se actualiza automáticamente en backoffice

### Flujo 3: Configuración de Workspace (Backoffice)

1. **Admin accede a Settings**
   - Navega a `/backoffice/firma/workspace/settings`

2. **Configura Email Templates**
   - Edita subject y body de emails
   - Usa variables disponibles: `{signer_name}`, `{document_name}`, etc.
   - Preview de plantilla

3. **Configura Timezone**
   - Selecciona timezone del workspace
   - Afecta fechas y horas en emails y notificaciones

4. **Configura Información del Equipo**
   - Team name y team email
   - Aparece en emails enviados

5. **Guarda Configuración**
   - Cambios se aplican inmediatamente
   - Se sincronizan con Firma.dev

---

## Configuración

### Backend (appsettings.json)

```json
{
  "Firma": {
    "ApiKey": "firma_api_...", // API key del workspace protegido
    "BaseUrl": "https://api.firma.dev/functions/v1/signing-request-api",
    "WebhookBaseUrl": "https://api.tudominio.com/firma/webhooks/receive",
    "TimeoutSeconds": 30,
    "RetryAttempts": 3
  }
}
```

### Frontend - Backoffice

No requiere configuración adicional, usa la misma configuración del backoffice existente.

### Frontend - Signatures

**vite.config.ts:**
```typescript
export default defineConfig({
  base: '/signatures',
  // ... otras configuraciones
});
```

**env.ts:**
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.tudominio.com';
```

### Variables de Entorno

**Backend:**
- `Firma__ApiKey`: API key de Firma.dev
- `Firma__BaseUrl`: Base URL de API (opcional, tiene default)
- `Firma__WebhookBaseUrl`: URL base para webhooks

**Frontend:**
- `VITE_API_BASE_URL`: URL del backend API

---

## Seguridad

### Encriptación

- **API Keys**: Almacenadas encriptadas en base de datos
- **Webhook Secrets**: Almacenados encriptados
- **JWT Tokens**: Generados en backend, nunca expuestos en frontend

### Validación

- **Webhooks**: Validación de signature usando HMAC-SHA256
- **Tenant Isolation**: Cada tenant solo accede a sus recursos
- **Autorización**: Endpoints requieren roles apropiados
- **JWT Expiration**: Tokens expiran en 24 horas

### Mejores Prácticas

1. ✅ Nunca exponer API keys en frontend
2. ✅ Validar todos los webhooks recibidos
3. ✅ Usar HTTPS para todas las comunicaciones
4. ✅ Implementar rate limiting
5. ✅ Logging de todas las operaciones críticas
6. ✅ Rotación periódica de API keys
7. ✅ Validar permisos en cada endpoint

---

## Troubleshooting

### Problemas Comunes

#### 1. Error al crear workspace

**Síntoma**: Error 401 o 403 al crear workspace para nuevo tenant

**Solución**:
- Verificar que la API key del workspace protegido sea válida
- Verificar permisos de la API key
- Revisar logs del backend para detalles del error

#### 2. Webhooks no se reciben

**Síntoma**: Estados no se actualizan automáticamente

**Solución**:
- Verificar que el webhook esté activo en Firma.dev
- Verificar que la URL del webhook sea accesible públicamente
- Verificar validación de signature en logs
- Probar webhook manualmente desde dashboard de Firma.dev

#### 3. JWT token expirado

**Síntoma**: Editor embebido no carga o muestra error

**Solución**:
- Generar nuevo JWT token desde backend
- Verificar expiración del token (24 horas)
- Implementar refresh de token si es necesario

#### 4. Documento no se descarga

**Síntoma**: Error al descargar documento firmado

**Solución**:
- Verificar que el estado sea "Completed"
- Verificar que `SignedDocumentUrl` esté disponible
- Verificar permisos del workspace API key
- Revisar logs del backend

### Logs Importantes

**Backend:**
- Creación de workspace: `FirmaApplicationService.CreateWorkspaceForTenantAsync`
- Recepción de webhooks: `FirmaWebhookHandler.HandleEventAsync`
- Errores de API: `FirmaService` (todos los métodos)

**Frontend:**
- Errores de carga de scripts embebidos: Console del navegador
- Errores de API: Network tab en DevTools

---

## Referencias

### Documentación Externa

- [Firma.dev Complete Setup Guide](https://docs.firma.dev/guides/complete-setup-guide)
- [Firma.dev API Authentication](https://docs.firma.dev/guides/authentication)
- [Firma.dev Workspace Settings](https://docs.firma.dev/guides/workspace-settings)
- [Firma.dev Sending Signing Request](https://docs.firma.dev/guides/sending-signing-request)
- [Firma.dev Embeddable Template Editor](https://docs.firma.dev/guides/embeddable-template-editor)
- [Firma.dev Embeddable Signing Request Editor](https://docs.firma.dev/guides/embeddable-signing-request-editor)
- [Firma.dev Embeddable Signing](https://docs.firma.dev/guides/embeddable-signing)
- [Firma.dev Webhooks](https://docs.firma.dev/guides/webhooks)
- [Firma.dev API Reference](https://docs.firma.dev/api-reference/v01.00.01/workspaces/list-workspaces)

### Endpoints Internos

- Backend API: `/firma/*`
- Backoffice: `/backoffice/firma/*`
- Signatures: `/signatures/sign/{jwt-token}`

---

## Changelog

### v1.0.0 (Planificado)
- Integración inicial con Firma.dev
- Gestión de templates en backoffice
- Envío de solicitudes de firma
- Página de firma para usuarios finales
- Webhooks para actualización automática
- Workspace settings configurables

---

**Última actualización**: 2024-12-19
**Mantenido por**: Equipo de Desarrollo

