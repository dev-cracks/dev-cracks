# ClickUp API - Lista Completa de Endpoints

Este documento contiene la lista completa de todos los endpoints disponibles en la API de ClickUp v2, organizados por categorías, junto con sus posibles usos y cómo pueden ser explotados en el proyecto.

## Resumen Ejecutivo

La API de ClickUp v2 proporciona **135 endpoints** organizados en las siguientes categorías principales:

- **Tareas (Tasks)**: 10 endpoints
- **Listas (Lists)**: 9 endpoints
- **Espacios (Spaces)**: 5 endpoints
- **Carpetas (Folders)**: 6 endpoints
- **Equipos/Workspaces (Teams)**: 3 endpoints
- **Comentarios (Comments)**: 10 endpoints
- **Checklists**: 6 endpoints
- **Adjuntos (Attachments)**: 1 endpoint
- **Etiquetas (Tags)**: 5 endpoints
- **Campos Personalizados (Custom Fields)**: 6 endpoints
- **Relaciones de Tareas (Task Relationships)**: 4 endpoints
- **Usuarios (Users)**: 5 endpoints
- **Invitados (Guests)**: 9 endpoints
- **Miembros (Members)**: 2 endpoints
- **Vistas (Views)**: 10 endpoints
- **Seguimiento de Tiempo (Time Tracking)**: 13 endpoints
- **Objetivos (Goals)**: 7 endpoints
- **Webhooks**: 4 endpoints
- **Plantillas (Templates)**: 4 endpoints
- **Grupos de Usuarios (User Groups)**: 4 endpoints
- **Roles Personalizados (Custom Roles)**: 1 endpoint
- **Tipos de Tareas Personalizados (Custom Task Types)**: 1 endpoint
- **Jerarquía Compartida (Shared Hierarchy)**: 1 endpoint
- **Autorización (Authorization)**: 2 endpoints

---

## 1. TAREAS (TASKS) - 10 endpoints

### 1.1. `GET /v2/list/{list_id}/task` - Get Tasks
**Uso**: Obtener todas las tareas de una lista específica
**Aplicación en el proyecto**:
- Dashboard de tareas pendientes
- Listado de tareas por cliente o proyecto
- Filtrado y búsqueda de tareas

**Parámetros importantes**:
- `archived`: Incluir tareas archivadas
- `page`: Paginación
- `order_by`: Ordenar por (id, created, updated, due_date)
- `statuses[]`: Filtrar por estados
- `assignees[]`: Filtrar por asignados
- `tags[]`: Filtrar por etiquetas

### 1.2. `POST /v2/list/{list_id}/task` - Create Task
**Uso**: Crear una nueva tarea en una lista
**Aplicación en el proyecto**:
- ✅ **Ya implementado**: Creación de tareas desde formularios de contacto
- Creación automática de tareas desde otros sistemas
- Sincronización de tareas desde fuentes externas

### 1.3. `GET /v2/task/{task_id}` - Get Task
**Uso**: Obtener detalles completos de una tarea específica
**Aplicación en el proyecto**:
- Vista detallada de tarea
- Sincronización de datos de tarea
- Validación de estado de tarea

### 1.4. `PUT /v2/task/{task_id}` - Update Task
**Uso**: Actualizar una tarea existente
**Aplicación en el proyecto**:
- Actualización de estado de tarea
- Cambio de asignados
- Actualización de prioridad
- Modificación de fechas de vencimiento

### 1.5. `DELETE /v2/task/{task_id}` - Delete Task
**Uso**: Eliminar una tarea
**Aplicación en el proyecto**:
- Limpieza de tareas obsoletas
- Eliminación masiva de tareas
- Gestión de ciclo de vida de tareas

### 1.6. `GET /v2/team/{team_id}/task` - Get Filtered Team Tasks
**Uso**: Obtener tareas filtradas de todo el equipo
**Aplicación en el proyecto**:
- Dashboard ejecutivo con todas las tareas del equipo
- Reportes consolidados
- Análisis de carga de trabajo del equipo

### 1.7. `POST /v2/task/{task_id}/merge` - Merge Tasks
**Uso**: Fusionar dos tareas
**Aplicación en el proyecto**:
- Consolidación de tareas duplicadas
- Unificación de información relacionada

### 1.8. `GET /v2/task/{task_id}/time_in_status` - Get Task's Time in Status
**Uso**: Obtener tiempo que una tarea ha estado en cada estado
**Aplicación en el proyecto**:
- Análisis de tiempos de ciclo
- Métricas de eficiencia
- Identificación de cuellos de botella

### 1.9. `GET /v2/task/bulk_time_in_status/task_ids` - Get Bulk Tasks' Time in Status
**Uso**: Obtener tiempo en estado para múltiples tareas
**Aplicación en el proyecto**:
- Reportes de rendimiento masivos
- Análisis de múltiples proyectos
- Dashboards de métricas

### 1.10. `POST /v2/list/{list_id}/taskTemplate/{template_id}` - Create Task From Template
**Uso**: Crear tarea desde una plantilla
**Aplicación en el proyecto**:
- Creación estandarizada de tareas
- Plantillas para diferentes tipos de proyectos
- Automatización de workflows

---

## 2. LISTAS (LISTS) - 9 endpoints

### 2.1. `GET /v2/list/{list_id}` - Get List
**Uso**: Obtener información de una lista
**Aplicación en el proyecto**:
- Visualización de estructura de proyecto
- Validación de configuración de listas

### 2.2. `PUT /v2/list/{list_id}` - Update List
**Uso**: Actualizar configuración de lista
**Aplicación en el proyecto**:
- Reorganización de proyectos
- Actualización de nombres y descripciones

### 2.3. `DELETE /v2/list/{list_id}` - Delete List
**Uso**: Eliminar una lista
**Aplicación en el proyecto**:
- Limpieza de proyectos finalizados
- Reorganización de estructura

### 2.4. `GET /v2/folder/{folder_id}/list` - Get Lists
**Uso**: Obtener todas las listas de una carpeta
**Aplicación en el proyecto**:
- ✅ **Ya implementado**: Obtención de estructura de proyectos
- Navegación de jerarquía de proyectos

### 2.5. `POST /v2/folder/{folder_id}/list` - Create List
**Uso**: Crear nueva lista en una carpeta
**Aplicación en el proyecto**:
- Creación automática de proyectos
- Setup inicial de nuevos clientes

### 2.6. `GET /v2/space/{space_id}/list` - Get Folderless Lists
**Uso**: Obtener listas sin carpeta (directamente en espacio)
**Aplicación en el proyecto**:
- Gestión de listas especiales
- Proyectos de nivel superior

### 2.7. `POST /v2/space/{space_id}/list` - Create Folderless List
**Uso**: Crear lista directamente en espacio
**Aplicación en el proyecto**:
- Creación de proyectos de alto nivel
- Listas de referencia compartidas

### 2.8. `POST /v2/list/{list_id}/task/{task_id}` - Add Task To List
**Uso**: Agregar tarea existente a una lista
**Aplicación en el proyecto**:
- Movimiento de tareas entre proyectos
- Duplicación de tareas en múltiples listas

### 2.9. `DELETE /v2/list/{list_id}/task/{task_id}` - Remove Task From List
**Uso**: Remover tarea de una lista
**Aplicación en el proyecto**:
- Limpieza de tareas de listas
- Reorganización de tareas

---

## 3. ESPACIOS (SPACES) - 5 endpoints

### 3.1. `GET /v2/team/{team_id}/space` - Get Spaces
**Uso**: Obtener todos los espacios de un equipo
**Aplicación en el proyecto**:
- ✅ **Ya implementado**: Obtención de estructura organizacional
- Navegación de espacios de trabajo
- Dashboard de espacios

### 3.2. `POST /v2/team/{team_id}/space` - Create Space
**Uso**: Crear nuevo espacio
**Aplicación en el proyecto**:
- Setup inicial de nuevos departamentos
- Creación de espacios para nuevos clientes grandes

### 3.3. `GET /v2/space/{space_id}` - Get Space
**Uso**: Obtener detalles de un espacio
**Aplicación en el proyecto**:
- Vista detallada de espacio
- Validación de configuración

### 3.4. `PUT /v2/space/{space_id}` - Update Space
**Uso**: Actualizar configuración de espacio
**Aplicación en el proyecto**:
- Reorganización de estructura
- Actualización de permisos y configuración

### 3.5. `DELETE /v2/space/{space_id}` - Delete Space
**Uso**: Eliminar espacio
**Aplicación en el proyecto**:
- Limpieza de espacios obsoletos
- Reorganización mayor

---

## 4. CARPETAS (FOLDERS) - 6 endpoints

### 4.1. `GET /v2/space/{space_id}/folder` - Get Folders
**Uso**: Obtener todas las carpetas de un espacio
**Aplicación en el proyecto**:
- ✅ **Ya implementado**: Obtención de estructura de proyectos
- Navegación jerárquica

### 4.2. `POST /v2/space/{space_id}/folder` - Create Folder
**Uso**: Crear nueva carpeta
**Aplicación en el proyecto**:
- Organización de proyectos por categorías
- Setup de estructura de cliente

### 4.3. `GET /v2/folder/{folder_id}` - Get Folder
**Uso**: Obtener detalles de carpeta
**Aplicación en el proyecto**:
- Vista detallada de carpeta
- Validación de estructura

### 4.4. `PUT /v2/folder/{folder_id}` - Update Folder
**Uso**: Actualizar carpeta
**Aplicación en el proyecto**:
- Reorganización de proyectos
- Actualización de nombres

### 4.5. `DELETE /v2/folder/{folder_id}` - Delete Folder
**Uso**: Eliminar carpeta
**Aplicación en el proyecto**:
- Limpieza de proyectos finalizados
- Reorganización

### 4.6. `POST /v2/space/{space_id}/folder_template/{template_id}` - Create Folder from Template
**Uso**: Crear carpeta desde plantilla
**Aplicación en el proyecto**:
- Setup estandarizado de proyectos
- Plantillas para diferentes tipos de clientes

---

## 5. EQUIPOS/WORKSPACES (TEAMS) - 3 endpoints

### 5.1. `GET /v2/team` - Get Authorized Workspaces
**Uso**: Obtener todos los workspaces accesibles
**Aplicación en el proyecto**:
- ✅ **Ya implementado**: Obtención de equipos
- Selección de workspace
- Validación de acceso

### 5.2. `GET /v2/team/{team_id}/seats` - Get Workspace seats
**Uso**: Obtener información de asientos del workspace
**Aplicación en el proyecto**:
- Gestión de licencias
- Monitoreo de uso de workspace

### 5.3. `GET /v2/team/{team_id}/plan` - Get Workspace Plan
**Uso**: Obtener plan del workspace
**Aplicación en el proyecto**:
- Validación de características disponibles
- Gestión de suscripciones

---

## 6. COMENTARIOS (COMMENTS) - 10 endpoints

### 6.1. `GET /v2/task/{task_id}/comment` - Get Task Comments
**Uso**: Obtener comentarios de una tarea
**Aplicación en el proyecto**:
- Visualización de historial de conversaciones
- Sincronización de comentarios
- Integración con sistemas de comunicación

### 6.2. `POST /v2/task/{task_id}/comment` - Create Task Comment
**Uso**: Crear comentario en tarea
**Aplicación en el proyecto**:
- Notificaciones automáticas
- Actualizaciones de estado desde otros sistemas
- Comentarios programáticos

### 6.3. `GET /v2/list/{list_id}/comment` - Get List Comments
**Uso**: Obtener comentarios de lista
**Aplicación en el proyecto**:
- Comentarios a nivel de proyecto
- Notas generales de proyecto

### 6.4. `POST /v2/list/{list_id}/comment` - Create List Comment
**Uso**: Crear comentario en lista
**Aplicación en el proyecto**:
- Notificaciones de proyecto
- Actualizaciones generales

### 6.5. `GET /v2/view/{view_id}/comment` - Get Chat View Comments
**Uso**: Obtener comentarios de vista de chat
**Aplicación en el proyecto**:
- Integración con canales de comunicación
- Historial de conversaciones

### 6.6. `POST /v2/view/{view_id}/comment` - Create Chat View Comment
**Uso**: Crear comentario en vista de chat
**Aplicación en el proyecto**:
- Mensajes automáticos
- Notificaciones en tiempo real

### 6.7. `PUT /v2/comment/{comment_id}` - Update Comment
**Uso**: Actualizar comentario
**Aplicación en el proyecto**:
- Corrección de comentarios
- Edición de mensajes

### 6.8. `DELETE /v2/comment/{comment_id}` - Delete Comment
**Uso**: Eliminar comentario
**Aplicación en el proyecto**:
- Limpieza de comentarios
- Moderación de contenido

### 6.9. `GET /v2/comment/{comment_id}/reply` - Get Threaded Comments
**Uso**: Obtener respuestas de comentario (hilo)
**Aplicación en el proyecto**:
- Visualización de conversaciones anidadas
- Hilos de discusión

### 6.10. `POST /v2/comment/{comment_id}/reply` - Create Threaded Comment
**Uso**: Responder a comentario (crear hilo)
**Aplicación en el proyecto**:
- Conversaciones estructuradas
- Respuestas a comentarios específicos

---

## 7. CHECKLISTS - 6 endpoints

### 7.1. `POST /v2/task/{task_id}/checklist` - Create Checklist
**Uso**: Crear checklist en tarea
**Aplicación en el proyecto**:
- Listas de verificación para procesos
- Tareas con pasos múltiples
- Workflows estructurados

### 7.2. `PUT /v2/checklist/{checklist_id}` - Edit Checklist
**Uso**: Editar checklist
**Aplicación en el proyecto**:
- Actualización de procesos
- Modificación de pasos

### 7.3. `DELETE /v2/checklist/{checklist_id}` - Delete Checklist
**Uso**: Eliminar checklist
**Aplicación en el proyecto**:
- Limpieza de checklists obsoletos
- Reorganización

### 7.4. `POST /v2/checklist/{checklist_id}/checklist_item` - Create Checklist Item
**Uso**: Agregar item a checklist
**Aplicación en el proyecto**:
- Agregar pasos a procesos
- Actualización dinámica de checklists

### 7.5. `PUT /v2/checklist/{checklist_id}/checklist_item/{checklist_item_id}` - Edit Checklist Item
**Uso**: Editar item de checklist
**Aplicación en el proyecto**:
- Actualización de pasos individuales
- Modificación de descripciones

### 7.6. `DELETE /v2/checklist/{checklist_id}/checklist_item/{checklist_item_id}` - Delete Checklist Item
**Uso**: Eliminar item de checklist
**Aplicación en el proyecto**:
- Remover pasos obsoletos
- Simplificación de procesos

---

## 8. ADJUNTOS (ATTACHMENTS) - 1 endpoint

### 8.1. `POST /v2/task/{task_id}/attachment` - Create Task Attachment
**Uso**: Subir archivo adjunto a tarea
**Aplicación en el proyecto**:
- Adjuntar documentos a tareas
- Subida de archivos desde formularios
- Sincronización de documentos

---

## 9. ETIQUETAS (TAGS) - 5 endpoints

### 9.1. `GET /v2/space/{space_id}/tag` - Get Space Tags
**Uso**: Obtener todas las etiquetas de un espacio
**Aplicación en el proyecto**:
- Visualización de categorías disponibles
- Filtrado por etiquetas

### 9.2. `POST /v2/space/{space_id}/tag` - Create Space Tag
**Uso**: Crear nueva etiqueta en espacio
**Aplicación en el proyecto**:
- Organización por categorías
- Etiquetas personalizadas para clientes

### 9.3. `PUT /v2/space/{space_id}/tag/{tag_name}` - Edit Space Tag
**Uso**: Editar etiqueta
**Aplicación en el proyecto**:
- Renombrar categorías
- Actualización de colores

### 9.4. `DELETE /v2/space/{space_id}/tag/{tag_name}` - Delete Space Tag
**Uso**: Eliminar etiqueta
**Aplicación en el proyecto**:
- Limpieza de etiquetas no utilizadas
- Reorganización

### 9.5. `POST /v2/task/{task_id}/tag/{tag_name}` - Add Tag To Task
**Uso**: Agregar etiqueta a tarea
**Aplicación en el proyecto**:
- Categorización automática
- Organización de tareas

### 9.6. `DELETE /v2/task/{task_id}/tag/{tag_name}` - Remove Tag From Task
**Uso**: Remover etiqueta de tarea
**Aplicación en el proyecto**:
- Actualización de categorías
- Reorganización de tareas

---

## 10. CAMPOS PERSONALIZADOS (CUSTOM FIELDS) - 6 endpoints

### 10.1. `GET /v2/list/{list_id}/field` - Get List Custom Fields
**Uso**: Obtener campos personalizados de lista
**Aplicación en el proyecto**:
- Visualización de campos disponibles
- Validación de estructura de datos

### 10.2. `GET /v2/folder/{folder_id}/field` - Get Folder Custom Fields
**Uso**: Obtener campos personalizados de carpeta
**Aplicación en el proyecto**:
- Campos a nivel de proyecto
- Configuración de proyectos

### 10.3. `GET /v2/space/{space_id}/field` - Get Space Custom Fields
**Uso**: Obtener campos personalizados de espacio
**Aplicación en el proyecto**:
- Campos organizacionales
- Configuración global

### 10.4. `GET /v2/team/{team_id}/field` - Get Workspace Custom Fields
**Uso**: Obtener campos personalizados de workspace
**Aplicación en el proyecto**:
- Campos a nivel de empresa
- Configuración global

### 10.5. `POST /v2/task/{task_id}/field/{field_id}` - Set Custom Field Value
**Uso**: Establecer valor de campo personalizado
**Aplicación en el proyecto**:
- Actualización de datos personalizados
- Sincronización con otros sistemas
- Campos específicos del negocio

### 10.6. `DELETE /v2/task/{task_id}/field/{field_id}` - Remove Custom Field Value
**Uso**: Remover valor de campo personalizado
**Aplicación en el proyecto**:
- Limpieza de datos
- Reset de campos

---

## 11. RELACIONES DE TAREAS (TASK RELATIONSHIPS) - 4 endpoints

### 11.1. `POST /v2/task/{task_id}/dependency` - Add Dependency
**Uso**: Agregar dependencia entre tareas
**Aplicación en el proyecto**:
- Gestión de dependencias de proyecto
- Orden de ejecución
- Bloqueos de tareas

### 11.2. `DELETE /v2/task/{task_id}/dependency` - Delete Dependency
**Uso**: Eliminar dependencia
**Aplicación en el proyecto**:
- Actualización de relaciones
- Reorganización de dependencias

### 11.3. `POST /v2/task/{task_id}/link/{links_to}` - Add Task Link
**Uso**: Vincular tareas
**Aplicación en el proyecto**:
- Relaciones entre tareas relacionadas
- Referencias cruzadas
- Tareas relacionadas

### 11.4. `DELETE /v2/task/{task_id}/link/{links_to}` - Delete Task Link
**Uso**: Eliminar vínculo entre tareas
**Aplicación en el proyecto**:
- Actualización de relaciones
- Limpieza de vínculos

---

## 12. USUARIOS (USERS) - 5 endpoints

### 12.1. `GET /v2/user` - Get Authorized User
**Uso**: Obtener información del usuario autenticado
**Aplicación en el proyecto**:
- Validación de sesión
- Información de perfil
- Configuración de usuario

### 12.2. `POST /v2/team/{team_id}/user` - Invite User To Workspace
**Uso**: Invitar usuario a workspace
**Aplicación en el proyecto**:
- Onboarding de nuevos miembros
- Gestión de acceso
- Automatización de invitaciones

### 12.3. `GET /v2/team/{team_id}/user/{user_id}` - Get User
**Uso**: Obtener información de usuario
**Aplicación en el proyecto**:
- Perfiles de usuario
- Validación de permisos
- Información de contacto

### 12.4. `PUT /v2/team/{team_id}/user/{user_id}` - Edit User On Workspace
**Uso**: Editar usuario en workspace
**Aplicación en el proyecto**:
- Actualización de permisos
- Cambio de roles
- Actualización de información

### 12.5. `DELETE /v2/team/{team_id}/user/{user_id}` - Remove User From Workspace
**Uso**: Remover usuario de workspace
**Aplicación en el proyecto**:
- Desactivación de usuarios
- Gestión de bajas
- Limpieza de accesos

---

## 13. INVITADOS (GUESTS) - 9 endpoints

### 13.1. `POST /v2/team/{team_id}/guest` - Invite Guest To Workspace
**Uso**: Invitar invitado a workspace
**Aplicación en el proyecto**:
- Acceso temporal para clientes
- Colaboración externa
- Permisos limitados

### 13.2. `GET /v2/team/{team_id}/guest/{guest_id}` - Get Guest
**Uso**: Obtener información de invitado
**Aplicación en el proyecto**:
- Validación de acceso
- Perfiles de invitados

### 13.3. `PUT /v2/team/{team_id}/guest/{guest_id}` - Edit Guest On Workspace
**Uso**: Editar invitado
**Aplicación en el proyecto**:
- Actualización de permisos
- Cambio de acceso

### 13.4. `DELETE /v2/team/{team_id}/guest/{guest_id}` - Remove Guest From Workspace
**Uso**: Remover invitado de workspace
**Aplicación en el proyecto**:
- Finalización de acceso temporal
- Limpieza de invitados

### 13.5. `POST /v2/task/{task_id}/guest/{guest_id}` - Add Guest To Task
**Uso**: Agregar invitado a tarea específica
**Aplicación en el proyecto**:
- Colaboración en tareas específicas
- Acceso granular

### 13.6. `DELETE /v2/task/{task_id}/guest/{guest_id}` - Remove Guest From Task
**Uso**: Remover invitado de tarea
**Aplicación en el proyecto**:
- Finalización de colaboración
- Actualización de acceso

### 13.7. `POST /v2/list/{list_id}/guest/{guest_id}` - Add Guest To List
**Uso**: Agregar invitado a lista
**Aplicación en el proyecto**:
- Acceso a proyectos específicos
- Colaboración en listas

### 13.8. `DELETE /v2/list/{list_id}/guest/{guest_id}` - Remove Guest From List
**Uso**: Remover invitado de lista
**Aplicación en el proyecto**:
- Finalización de acceso a proyecto
- Actualización de permisos

### 13.9. `POST /v2/folder/{folder_id}/guest/{guest_id}` - Add Guest To Folder
**Uso**: Agregar invitado a carpeta
**Aplicación en el proyecto**:
- Acceso a grupos de proyectos
- Colaboración ampliada

### 13.10. `DELETE /v2/folder/{folder_id}/guest/{guest_id}` - Remove Guest From Folder
**Uso**: Remover invitado de carpeta
**Aplicación en el proyecto**:
- Finalización de acceso
- Actualización de permisos

---

## 14. MIEMBROS (MEMBERS) - 2 endpoints

### 14.1. `GET /v2/task/{task_id}/member` - Get Task Members
**Uso**: Obtener miembros de una tarea
**Aplicación en el proyecto**:
- Visualización de equipo asignado
- Notificaciones a miembros
- Gestión de asignaciones

### 14.2. `GET /v2/list/{list_id}/member` - Get List Members
**Uso**: Obtener miembros de una lista
**Aplicación en el proyecto**:
- Equipo de proyecto
- Permisos de lista
- Gestión de acceso

---

## 15. VISTAS (VIEWS) - 10 endpoints

### 15.1. `GET /v2/team/{team_id}/view` - Get Workspace Views
**Uso**: Obtener vistas de workspace
**Aplicación en el proyecto**:
- Dashboards personalizados
- Vistas ejecutivas
- Reportes consolidados

### 15.2. `POST /v2/team/{team_id}/view` - Create Workspace View
**Uso**: Crear vista de workspace
**Aplicación en el proyecto**:
- Dashboards personalizados
- Vistas para diferentes roles
- Automatización de vistas

### 15.3. `GET /v2/space/{space_id}/view` - Get Space Views
**Uso**: Obtener vistas de espacio
**Aplicación en el proyecto**:
- Vistas por departamento
- Filtros específicos de espacio

### 15.4. `POST /v2/space/{space_id}/view` - Create Space View
**Uso**: Crear vista de espacio
**Aplicación en el proyecto**:
- Vistas departamentales
- Filtros personalizados

### 15.5. `GET /v2/folder/{folder_id}/view` - Get Folder Views
**Uso**: Obtener vistas de carpeta
**Aplicación en el proyecto**:
- Vistas de proyecto
- Filtros de carpeta

### 15.6. `POST /v2/folder/{folder_id}/view` - Create Folder View
**Uso**: Crear vista de carpeta
**Aplicación en el proyecto**:
- Vistas de proyecto específico
- Filtros personalizados

### 15.7. `GET /v2/list/{list_id}/view` - Get List Views
**Uso**: Obtener vistas de lista
**Aplicación en el proyecto**:
- Vistas de lista específica
- Filtros de lista

### 15.8. `POST /v2/list/{list_id}/view` - Create List View
**Uso**: Crear vista de lista
**Aplicación en el proyecto**:
- Vistas personalizadas de lista
- Filtros específicos

### 15.9. `GET /v2/view/{view_id}` - Get View
**Uso**: Obtener detalles de vista
**Aplicación en el proyecto**:
- Configuración de vista
- Validación de filtros

### 15.10. `PUT /v2/view/{view_id}` - Update View
**Uso**: Actualizar vista
**Aplicación en el proyecto**:
- Modificación de filtros
- Actualización de configuración

### 15.11. `DELETE /v2/view/{view_id}` - Delete View
**Uso**: Eliminar vista
**Aplicación en el proyecto**:
- Limpieza de vistas obsoletas
- Reorganización

### 15.12. `GET /v2/view/{view_id}/task` - Get View Tasks
**Uso**: Obtener tareas de una vista
**Aplicación en el proyecto**:
- Tareas filtradas según vista
- Dashboards dinámicos
- Reportes personalizados

---

## 16. SEGUIMIENTO DE TIEMPO (TIME TRACKING) - 13 endpoints

### 16.1. `GET /v2/team/{team_id}/time_entries` - Get time entries within a date range
**Uso**: Obtener entradas de tiempo en un rango de fechas
**Aplicación en el proyecto**:
- Reportes de tiempo trabajado
- Facturación por horas
- Análisis de productividad

### 16.2. `POST /v2/team/{team_id}/time_entries` - Create a time entry
**Uso**: Crear entrada de tiempo
**Aplicación en el proyecto**:
- Registro de tiempo trabajado
- Integración con sistemas de facturación
- Tracking automático

### 16.3. `GET /v2/team/{team_id}/time_entries/{timer_id}` - Get singular time entry
**Uso**: Obtener entrada de tiempo específica
**Aplicación en el proyecto**:
- Detalles de tiempo registrado
- Validación de entradas

### 16.4. `PUT /v2/team/{team_id}/time_entries/{timer_id}` - Update a time Entry
**Uso**: Actualizar entrada de tiempo
**Aplicación en el proyecto**:
- Corrección de tiempos
- Actualización de descripciones

### 16.5. `DELETE /v2/team/{team_id}/time_entries/{timer_id}` - Delete a time Entry
**Uso**: Eliminar entrada de tiempo
**Aplicación en el proyecto**:
- Eliminación de entradas incorrectas
- Limpieza de datos

### 16.6. `GET /v2/team/{team_id}/time_entries/{timer_id}/history` - Get time entry history
**Uso**: Obtener historial de entrada de tiempo
**Aplicación en el proyecto**:
- Auditoría de cambios
- Trazabilidad de tiempos

### 16.7. `GET /v2/team/{team_id}/time_entries/current` - Get running time entry
**Uso**: Obtener entrada de tiempo en curso
**Aplicación en el proyecto**:
- Timer activo
- Tiempo actual trabajando

### 16.8. `GET /v2/team/{team_id}/time_entries/tags` - Get all tags from time entries
**Uso**: Obtener todas las etiquetas de entradas de tiempo
**Aplicación en el proyecto**:
- Categorización de tiempo
- Análisis por etiquetas

### 16.9. `POST /v2/team/{team_id}/time_entries/tags` - Add tags from time entries
**Uso**: Agregar etiquetas a entradas de tiempo
**Aplicación en el proyecto**:
- Categorización masiva
- Organización de tiempos

### 16.10. `PUT /v2/team/{team_id}/time_entries/tags` - Change tag names from time entries
**Uso**: Cambiar nombres de etiquetas
**Aplicación en el proyecto**:
- Renombrar categorías
- Estandarización de etiquetas

### 16.11. `DELETE /v2/team/{team_id}/time_entries/tags` - Remove tags from time entries
**Uso**: Remover etiquetas de entradas de tiempo
**Aplicación en el proyecto**:
- Limpieza de etiquetas
- Reorganización

### 16.12. `POST /v2/team/{team_id}/time_entries/start` - Start a time Entry
**Uso**: Iniciar timer
**Aplicación en el proyecto**:
- Inicio de trabajo
- Tracking en tiempo real

### 16.13. `POST /v2/team/{team_id}/time_entries/stop` - Stop a time Entry
**Uso**: Detener timer
**Aplicación en el proyecto**:
- Finalización de trabajo
- Cierre de timer

---

## 17. OBJETIVOS (GOALS) - 7 endpoints

### 17.1. `GET /v2/team/{team_id}/goal` - Get Goals
**Uso**: Obtener objetivos del equipo
**Aplicación en el proyecto**:
- Dashboard de objetivos
- Seguimiento de metas
- OKRs (Objectives and Key Results)

### 17.2. `POST /v2/team/{team_id}/goal` - Create Goal
**Uso**: Crear objetivo
**Aplicación en el proyecto**:
- Definición de metas
- OKRs trimestrales
- Objetivos estratégicos

### 17.3. `GET /v2/goal/{goal_id}` - Get Goal
**Uso**: Obtener detalles de objetivo
**Aplicación en el proyecto**:
- Vista detallada de objetivo
- Progreso de meta

### 17.4. `PUT /v2/goal/{goal_id}` - Update Goal
**Uso**: Actualizar objetivo
**Aplicación en el proyecto**:
- Ajuste de metas
- Actualización de progreso

### 17.5. `DELETE /v2/goal/{goal_id}` - Delete Goal
**Uso**: Eliminar objetivo
**Aplicación en el proyecto**:
- Limpieza de objetivos obsoletos
- Reorganización

### 17.6. `POST /v2/goal/{goal_id}/key_result` - Create Key Result
**Uso**: Crear resultado clave
**Aplicación en el proyecto**:
- Métricas de objetivo
- KPIs asociados
- Indicadores de éxito

### 17.7. `PUT /v2/key_result/{key_result_id}` - Edit Key Result
**Uso**: Editar resultado clave
**Aplicación en el proyecto**:
- Actualización de métricas
- Ajuste de KPIs

### 17.8. `DELETE /v2/key_result/{key_result_id}` - Delete Key Result
**Uso**: Eliminar resultado clave
**Aplicación en el proyecto**:
- Limpieza de métricas
- Reorganización

---

## 18. WEBHOOKS - 4 endpoints

### 18.1. `GET /v2/team/{team_id}/webhook` - Get Webhooks
**Uso**: Obtener webhooks configurados
**Aplicación en el proyecto**:
- Listado de integraciones
- Validación de configuración

### 18.2. `POST /v2/team/{team_id}/webhook` - Create Webhook
**Uso**: Crear webhook
**Aplicación en el proyecto**:
- Integración con sistemas externos
- Notificaciones en tiempo real
- Sincronización automática

### 18.3. `PUT /v2/webhook/{webhook_id}` - Update Webhook
**Uso**: Actualizar webhook
**Aplicación en el proyecto**:
- Modificación de URL
- Actualización de eventos

### 18.4. `DELETE /v2/webhook/{webhook_id}` - Delete Webhook
**Uso**: Eliminar webhook
**Aplicación en el proyecto**:
- Desactivación de integraciones
- Limpieza de webhooks

---

## 19. PLANTILLAS (TEMPLATES) - 4 endpoints

### 19.1. `GET /v2/team/{team_id}/taskTemplate` - Get Task Templates
**Uso**: Obtener plantillas de tareas
**Aplicación en el proyecto**:
- Listado de plantillas disponibles
- Selección de plantilla

### 19.2. `POST /v2/list/{list_id}/taskTemplate/{template_id}` - Create Task From Template
**Uso**: Crear tarea desde plantilla
**Aplicación en el proyecto**:
- Tareas estandarizadas
- Procesos repetibles
- Automatización

### 19.3. `POST /v2/folder/{folder_id}/list_template/{template_id}` - Create List From Template in Folder
**Uso**: Crear lista desde plantilla en carpeta
**Aplicación en el proyecto**:
- Proyectos estandarizados
- Setup rápido de proyectos

### 19.4. `POST /v2/space/{space_id}/list_template/{template_id}` - Create List From Template in Space
**Uso**: Crear lista desde plantilla en espacio
**Aplicación en el proyecto**:
- Proyectos de alto nivel estandarizados
- Setup rápido

---

## 20. GRUPOS DE USUARIOS (USER GROUPS) - 4 endpoints

### 20.1. `GET /v2/group` - Get Groups
**Uso**: Obtener todos los grupos
**Aplicación en el proyecto**:
- Listado de equipos
- Organización de usuarios

### 20.2. `POST /v2/team/{team_id}/group` - Create Group
**Uso**: Crear grupo de usuarios
**Aplicación en el proyecto**:
- Organización de equipos
- Gestión de permisos por grupo

### 20.3. `PUT /v2/group/{group_id}` - Update Group
**Uso**: Actualizar grupo
**Aplicación en el proyecto**:
- Modificación de miembros
- Actualización de nombre

### 20.4. `DELETE /v2/group/{group_id}` - Delete Group
**Uso**: Eliminar grupo
**Aplicación en el proyecto**:
- Reorganización de equipos
- Limpieza

---

## 21. ROLES PERSONALIZADOS (CUSTOM ROLES) - 1 endpoint

### 21.1. `GET /v2/team/{team_id}/customroles` - Get Custom Roles
**Uso**: Obtener roles personalizados
**Aplicación en el proyecto**:
- Gestión de permisos
- Roles específicos del negocio
- Control de acceso granular

---

## 22. TIPOS DE TAREAS PERSONALIZADOS (CUSTOM TASK TYPES) - 1 endpoint

### 22.1. `GET /v2/team/{team_id}/custom_item` - Get Custom Task Types
**Uso**: Obtener tipos de tareas personalizados
**Aplicación en el proyecto**:
- Tipos de tareas específicos del negocio
- Categorización avanzada
- Workflows especializados

---

## 23. JERARQUÍA COMPARTIDA (SHARED HIERARCHY) - 1 endpoint

### 23.1. `GET /v2/team/{team_id}/shared` - Shared Hierarchy
**Uso**: Obtener jerarquía compartida
**Aplicación en el proyecto**:
- Visualización de estructura compartida
- Navegación de recursos compartidos
- Gestión de permisos compartidos

---

## 24. AUTORIZACIÓN (AUTHORIZATION) - 2 endpoints

### 24.1. `POST /v2/oauth/token` - Get Access Token
**Uso**: Obtener token de acceso OAuth
**Aplicación en el proyecto**:
- Autenticación OAuth
- Integración con aplicaciones externas
- Tokens de acceso para terceros

### 24.2. `GET /v2/user` - Get Authorized User
**Uso**: Obtener usuario autorizado
**Aplicación en el proyecto**:
- Validación de sesión
- Información de usuario actual
- Perfil de usuario

---

## Resumen de Aplicación en el Proyecto

### Endpoints Ya Implementados ✅
1. `GET /v2/team` - Get Teams
2. `GET /v2/team/{team_id}/space` - Get Spaces
3. `GET /v2/space/{space_id}/folder` - Get Folders
4. `GET /v2/list/{list_id}/task` - Get Tasks
5. `POST /v2/list/{list_id}/task` - Create Task

### Endpoints de Alta Prioridad para Implementar 🔥

#### Gestión de Tareas
- `GET /v2/task/{task_id}` - Obtener detalles de tarea
- `PUT /v2/task/{task_id}` - Actualizar tarea
- `GET /v2/team/{team_id}/task` - Tareas filtradas del equipo

#### Comentarios y Comunicación
- `GET /v2/task/{task_id}/comment` - Comentarios de tarea
- `POST /v2/task/{task_id}/comment` - Crear comentario

#### Seguimiento de Tiempo
- `GET /v2/team/{team_id}/time_entries` - Entradas de tiempo
- `POST /v2/team/{team_id}/time_entries` - Crear entrada de tiempo
- `POST /v2/team/{team_id}/time_entries/start` - Iniciar timer
- `POST /v2/team/{team_id}/time_entries/stop` - Detener timer

#### Webhooks
- `POST /v2/team/{team_id}/webhook` - Crear webhook para integraciones

#### Campos Personalizados
- `GET /v2/list/{list_id}/field` - Campos personalizados
- `POST /v2/task/{task_id}/field/{field_id}` - Establecer valor de campo

### Casos de Uso Específicos del Proyecto

1. **Dashboard de Clientes**: Usar endpoints de tareas, espacios y listas para crear dashboards personalizados por cliente
2. **Seguimiento de Consultorías**: Implementar time tracking para facturación por horas
3. **Notificaciones Automáticas**: Usar webhooks para notificar cambios importantes
4. **Reportes de Proyecto**: Combinar endpoints de tareas, tiempo y objetivos para reportes ejecutivos
5. **Integración con Email Service**: Sincronizar tareas creadas desde emails con ClickUp
6. **Gestión de Invitados**: Invitar clientes como guests para colaboración específica
7. **Objetivos y OKRs**: Implementar sistema de objetivos para seguimiento estratégico

---

## Notas Técnicas

- Todos los endpoints requieren autenticación mediante token en el header `Authorization`
- La mayoría de endpoints soportan paginación mediante parámetros `page`
- Los endpoints de creación/actualización aceptan objetos JSON en el body
- Los endpoints de eliminación generalmente retornan 204 No Content
- Algunos endpoints soportan filtros avanzados mediante query parameters

---

## Próximos Pasos

1. Implementar métodos helper genéricos en `ClickUpService` (✅ Ya creado en `ClickUpServiceExtended.cs`)
2. Expandir `ClickUpService` con métodos para endpoints de alta prioridad
3. Crear endpoints en la API para exponer funcionalidades de ClickUp
4. Implementar webhooks para sincronización bidireccional
5. Crear dashboards que consuman múltiples endpoints de ClickUp
6. Implementar sistema de time tracking para facturación


