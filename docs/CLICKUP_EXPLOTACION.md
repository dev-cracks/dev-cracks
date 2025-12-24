# Cómo Explotar la API de ClickUp en el Proyecto

Este documento describe estrategias y casos de uso específicos para explotar los endpoints de ClickUp en el proyecto Fractalize Email Service.

## Resumen Ejecutivo

La API de ClickUp ofrece **135 endpoints** que pueden ser explotados para:

1. **Automatización de workflows** de gestión de proyectos
2. **Sincronización bidireccional** entre sistemas
3. **Dashboards y reportes** personalizados
4. **Integración con el Email Service** para crear tareas automáticamente
5. **Seguimiento de tiempo** para facturación
6. **Gestión de clientes y proyectos** de manera centralizada

---

## Arquitectura de Integración

### Estructura Actual

```
Fractalize.EmailService.Api
├── Endpoints/
│   └── DashboardEndpoints.cs (✅ Ya implementado)
├── Application/
│   └── ClickUp/
│       └── IClickUpService.cs (✅ Expandido con todos los métodos)
└── Infrastructure/
    └── ClickUp/
        ├── ClickUpService.cs (✅ Implementación base)
        └── ClickUpServiceExtended.cs (✅ Helpers genéricos)
```

### Flujo de Datos

```
Email Service → ClickUpService → ClickUp API
                ↓
         Dashboard/Reports
                ↓
         Frontend (Backoffice)
```

---

## Casos de Uso por Categoría

### 1. Gestión de Tareas (Tasks)

#### Caso de Uso: Creación Automática de Tareas desde Emails
**Endpoints necesarios**:
- `POST /v2/list/{list_id}/task` ✅ (Ya implementado)
- `POST /v2/task/{task_id}/tag/{tag_name}` - Categorizar automáticamente
- `POST /v2/task/{task_id}/field/{field_id}` - Agregar campos personalizados

**Implementación**:
```csharp
// Cuando se recibe un email de consultoría
public async Task HandleConsultationEmail(EmailMessage message)
{
    var taskRequest = new CreateTaskRequest(
        Name: $"Consulta: {message.Subject}",
        Description: message.Body,
        Email: message.From,
        Company: ExtractCompany(message),
        ConsultationType: ClassifyConsultation(message)
    );
    
    var task = await _clickUpService.CreateTaskAsync(taskRequest);
    
    // Categorizar según tipo de consultoría
    await _clickUpService.AddTagToTaskAsync(task.TaskId, ClassifyConsultation(message));
    
    // Agregar campos personalizados
    await _clickUpService.SetCustomFieldValueAsync(
        task.TaskId, 
        "customer_email_field_id",
        new SetCustomFieldValueRequest(message.From)
    );
}
```

#### Caso de Uso: Dashboard de Tareas por Cliente
**Endpoints necesarios**:
- `GET /v2/team/{team_id}/task` - Tareas filtradas
- `GET /v2/task/{task_id}` - Detalles de tarea
- `GET /v2/task/{task_id}/comment` - Comentarios

**Implementación**:
```csharp
public async Task<CustomerTasksDto> GetCustomerTasks(string customerEmail)
{
    // Obtener tareas filtradas por campos personalizados
    var tasks = await _clickUpService.GetFilteredTeamTasksAsync(
        teamId,
        new GetFilteredTeamTasksRequest
        {
            CustomFields = new[] { $"customer_email={customerEmail}" }
        }
    );
    
    // Enriquecer con comentarios
    var enrichedTasks = new List<EnrichedTaskDto>();
    foreach (var task in tasks)
    {
        var comments = await _clickUpService.GetTaskCommentsAsync(task.Id);
        enrichedTasks.Add(new EnrichedTaskDto(task, comments));
    }
    
    return new CustomerTasksDto(enrichedTasks);
}
```

#### Caso de Uso: Actualización Automática de Estado
**Endpoints necesarios**:
- `PUT /v2/task/{task_id}` - Actualizar tarea
- `POST /v2/task/{task_id}/comment` - Agregar comentario de cambio

**Implementación**:
```csharp
public async Task UpdateTaskStatus(string taskId, string newStatus, string reason)
{
    await _clickUpService.UpdateTaskAsync(
        taskId,
        new UpdateTaskRequest(Status: newStatus)
    );
    
    // Documentar el cambio
    await _clickUpService.CreateTaskCommentAsync(
        taskId,
        new CreateCommentRequest($"Estado cambiado a: {newStatus}. Razón: {reason}")
    );
}
```

---

### 2. Seguimiento de Tiempo (Time Tracking)

#### Caso de Uso: Facturación por Horas
**Endpoints necesarios**:
- `GET /v2/team/{team_id}/time_entries` - Obtener entradas de tiempo
- `POST /v2/team/{team_id}/time_entries` - Crear entrada de tiempo
- `GET /v2/task/{task_id}/time_in_status` - Tiempo en estados

**Implementación**:
```csharp
public async Task<BillingReportDto> GenerateBillingReport(
    string teamId, 
    DateTime startDate, 
    DateTime endDate,
    string? customerEmail = null)
{
    var timeEntries = await _clickUpService.GetTimeEntriesAsync(
        teamId,
        new GetTimeEntriesRequest(
            StartDate: ToUnixTimestamp(startDate),
            EndDate: ToUnixTimestamp(endDate)
        )
    );
    
    // Filtrar por cliente si se especifica
    var filteredEntries = customerEmail != null
        ? timeEntries.Where(e => IsTaskForCustomer(e.TaskId, customerEmail))
        : timeEntries;
    
    // Calcular totales
    var totalHours = filteredEntries
        .Sum(e => e.Duration / 3600000.0); // Convertir de ms a horas
    
    return new BillingReportDto
    {
        TotalHours = totalHours,
        TotalAmount = totalHours * HourlyRate,
        Entries = filteredEntries.Select(e => MapToBillingEntry(e))
    };
}
```

#### Caso de Uso: Timer Automático
**Endpoints necesarios**:
- `POST /v2/team/{team_id}/time_entries/start` - Iniciar timer
- `POST /v2/team/{team_id}/time_entries/stop` - Detener timer
- `GET /v2/team/{team_id}/time_entries/current` - Timer actual

**Implementación**:
```csharp
public async Task StartWorkTimer(string teamId, string taskId, string description)
{
    await _clickUpService.StartTimeEntryAsync(
        teamId,
        new StartTimeEntryRequest(
            Tid: long.Parse(taskId),
            Description: description,
            Tags: new[] { "consulting", "active" }
        )
    );
}

public async Task<TimeEntryDto> StopWorkTimer(string teamId)
{
    return await _clickUpService.StopTimeEntryAsync(teamId);
}
```

---

### 3. Comentarios y Comunicación

#### Caso de Uso: Sincronización de Comentarios con Email
**Endpoints necesarios**:
- `GET /v2/task/{task_id}/comment` - Obtener comentarios
- `POST /v2/task/{task_id}/comment` - Crear comentario

**Implementación**:
```csharp
public async Task SyncEmailToTaskComment(string taskId, EmailMessage email)
{
    // Verificar si el comentario ya existe (por ID de email)
    var existingComments = await _clickUpService.GetTaskCommentsAsync(taskId);
    var emailId = ExtractEmailId(email);
    
    if (existingComments.Any(c => c.Comment.Contains(emailId)))
    {
        return; // Ya sincronizado
    }
    
    // Crear comentario desde email
    await _clickUpService.CreateTaskCommentAsync(
        taskId,
        new CreateCommentRequest(
            CommentText: $"[Email] {email.Subject}\n\n{email.Body}\n\nDe: {email.From}"
        )
    );
}
```

---

### 4. Webhooks y Sincronización

#### Caso de Uso: Webhook para Actualizaciones en Tiempo Real
**Endpoints necesarios**:
- `POST /v2/team/{team_id}/webhook` - Crear webhook
- `GET /v2/team/{team_id}/webhook` - Listar webhooks

**Implementación**:
```csharp
public async Task SetupWebhooks(string teamId, string webhookUrl)
{
    // Crear webhook para eventos de tareas
    await _clickUpService.CreateWebhookAsync(
        teamId,
        new CreateWebhookRequest(
            Webhook: webhookUrl,
            Events: new[]
            {
                1L, // taskCreated
                2L, // taskUpdated
                3L, // taskDeleted
                4L, // taskStatusUpdated
                5L  // taskAssigneeUpdated
            }
        )
    );
}

// Endpoint para recibir webhooks
[HttpPost("/api/webhooks/clickup")]
public async Task<IActionResult> HandleClickUpWebhook(ClickUpWebhookPayload payload)
{
    switch (payload.Event)
    {
        case "taskCreated":
            await HandleTaskCreated(payload.Task);
            break;
        case "taskUpdated":
            await HandleTaskUpdated(payload.Task);
            break;
        // ... otros eventos
    }
    
    return Ok();
}
```

---

### 5. Gestión de Proyectos y Estructura

#### Caso de Uso: Setup Automático de Proyecto para Nuevo Cliente
**Endpoints necesarios**:
- `POST /v2/team/{team_id}/space` - Crear espacio
- `POST /v2/space/{space_id}/folder` - Crear carpeta
- `POST /v2/folder/{folder_id}/list` - Crear lista
- `POST /v2/space/{space_id}/tag` - Crear etiquetas

**Implementación**:
```csharp
public async Task<ProjectSetupResult> SetupCustomerProject(Customer customer)
{
    // 1. Crear espacio para el cliente
    var space = await _clickUpService.CreateSpaceAsync(
        teamId,
        new CreateSpaceRequest($"Cliente: {customer.Name}")
    );
    
    // 2. Crear carpetas por tipo de proyecto
    var folders = new List<ClickUpFolderDto>();
    foreach (var projectType in customer.ProjectTypes)
    {
        var folder = await _clickUpService.CreateFolderAsync(
            space.Id,
            new CreateFolderRequest(projectType)
        );
        folders.Add(folder);
    }
    
    // 3. Crear listas en cada carpeta
    foreach (var folder in folders)
    {
        await _clickUpService.CreateListAsync(
            folder.Id,
            new CreateListRequest("Tareas Pendientes")
        );
        await _clickUpService.CreateListAsync(
            folder.Id,
            new CreateListRequest("En Progreso")
        );
        await _clickUpService.CreateListAsync(
            folder.Id,
            new CreateListRequest("Completadas")
        );
    }
    
    // 4. Crear etiquetas específicas del cliente
    await _clickUpService.CreateSpaceTagAsync(
        space.Id,
        new CreateTagRequest(customer.Name, TagFg: "#FFFFFF", TagBg: customer.BrandColor)
    );
    
    return new ProjectSetupResult(space, folders);
}
```

---

### 6. Objetivos y OKRs

#### Caso de Uso: Seguimiento de Objetivos Trimestrales
**Endpoints necesarios**:
- `GET /v2/team/{team_id}/goal` - Obtener objetivos
- `POST /v2/team/{team_id}/goal` - Crear objetivo
- `POST /v2/goal/{goal_id}/key_result` - Crear resultado clave

**Implementación**:
```csharp
public async Task<GoalDto> CreateQuarterlyGoal(
    string teamId,
    string goalName,
    string description,
    KeyResultDto[] keyResults)
{
    var goal = await _clickUpService.CreateGoalAsync(
        teamId,
        new CreateGoalRequest(
            Name: goalName,
            Description: description,
            DueDate: GetQuarterEndDate().ToString("yyyy-MM-dd"),
            MultipleOwners: true,
            Owners: GetTeamOwnerIds()
        )
    );
    
    // Agregar resultados clave
    foreach (var kr in keyResults)
    {
        await _clickUpService.CreateKeyResultAsync(
            goal.Id,
            new CreateKeyResultRequest(
                Name: kr.Name,
                Type: kr.Type,
                StepsStart: kr.Start,
                StepsEnd: kr.End,
                TaskIds: kr.TaskIds
            )
        );
    }
    
    return goal;
}
```

---

### 7. Vistas y Dashboards

#### Caso de Uso: Dashboard Personalizado por Rol
**Endpoints necesarios**:
- `POST /v2/team/{team_id}/view` - Crear vista
- `GET /v2/view/{view_id}/task` - Obtener tareas de vista

**Implementación**:
```csharp
public async Task<ClickUpViewDto> CreateExecutiveDashboard(string teamId)
{
    return await _clickUpService.CreateTeamViewAsync(
        teamId,
        new CreateViewRequest(
            Name: "Dashboard Ejecutivo",
            Type: "board",
            ViewSettings: new Dictionary<string, object>
            {
                ["group_by"] = "status",
                ["filter"] = new
                {
                    statuses = new[] { "in progress", "review" },
                    assignees = GetExecutiveTeamIds()
                }
            }
        )
    );
}

public async Task<DashboardDataDto> GetDashboardData(string viewId)
{
    var tasks = await _clickUpService.GetViewTasksAsync(viewId);
    
    // Agregar métricas
    var metrics = new DashboardMetricsDto
    {
        TotalTasks = tasks.Count,
        InProgress = tasks.Count(t => t.Status.Type == "in_progress"),
        Completed = tasks.Count(t => t.Status.Type == "closed"),
        Overdue = tasks.Count(t => IsOverdue(t.DueDate))
    };
    
    return new DashboardDataDto(tasks, metrics);
}
```

---

### 8. Invitados y Colaboración

#### Caso de Uso: Invitar Cliente como Guest
**Endpoints necesarios**:
- `POST /v2/team/{team_id}/guest` - Invitar guest
- `POST /v2/task/{task_id}/guest/{guest_id}` - Agregar guest a tarea

**Implementación**:
```csharp
public async Task<ClickUpGuestDto> InviteCustomerAsGuest(
    string teamId,
    Customer customer,
    string[] taskIds)
{
    // Invitar cliente como guest con permisos limitados
    var guest = await _clickUpService.InviteGuestToWorkspaceAsync(
        teamId,
        new InviteGuestRequest(
            Email: customer.Email,
            CanSeeTeamDashboards: false,
            CanSeeTeamWorkspaces: false,
            CanSeeOtherUsers: false,
            CanEditTags: false,
            CanSeeTimeTracking: false,
            CanSeeTimeEstimates: false,
            CanSeePoints: false,
            CanCreateViews: false,
            CanEditCustomFields: false
        )
    );
    
    // Agregar guest solo a tareas específicas
    foreach (var taskId in taskIds)
    {
        await _clickUpService.AddGuestToTaskAsync(taskId, guest.Id.ToString());
    }
    
    return guest;
}
```

---

## Estrategias de Implementación

### Fase 1: Fundamentos (Ya Completado ✅)
- ✅ Interfaz expandida con todos los métodos
- ✅ Helpers genéricos para llamadas HTTP
- ✅ Documentación completa de endpoints

### Fase 2: Endpoints Críticos (Prioridad Alta)
1. **Gestión de Tareas Avanzada**
   - Implementar `GetTaskAsync`, `UpdateTaskAsync`, `DeleteTaskAsync`
   - Agregar filtros avanzados en `GetFilteredTeamTasksAsync`

2. **Comentarios**
   - Implementar todos los métodos de comentarios
   - Sincronización con Email Service

3. **Time Tracking**
   - Implementar métodos de time tracking
   - Integración con sistema de facturación

### Fase 3: Automatización (Prioridad Media)
1. **Webhooks**
   - Setup de webhooks
   - Endpoints para recibir eventos

2. **Campos Personalizados**
   - Gestión de campos personalizados
   - Sincronización con datos de clientes

3. **Etiquetas y Categorización**
   - Categorización automática de tareas
   - Etiquetas por cliente/proyecto

### Fase 4: Dashboards y Reportes (Prioridad Baja)
1. **Vistas Personalizadas**
   - Creación de vistas por rol
   - Dashboards ejecutivos

2. **Objetivos y OKRs**
   - Sistema de objetivos
   - Seguimiento de métricas

---

## Mejores Prácticas

### 1. Manejo de Errores
```csharp
try
{
    var result = await _clickUpService.GetTaskAsync(taskId);
    return result;
}
catch (ClickUpApiException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
{
    _logger.LogWarning("Task {TaskId} not found", taskId);
    return null;
}
catch (ClickUpApiException ex)
{
    _logger.LogError(ex, "Error getting task {TaskId}", taskId);
    throw;
}
```

### 2. Rate Limiting
```csharp
// ClickUp tiene límites de rate, implementar retry con backoff
public async Task<T> CallWithRetry<T>(Func<Task<T>> operation, int maxRetries = 3)
{
    for (int i = 0; i < maxRetries; i++)
    {
        try
        {
            return await operation();
        }
        catch (ClickUpApiException ex) when (ex.StatusCode == HttpStatusCode.TooManyRequests)
        {
            var delay = TimeSpan.FromSeconds(Math.Pow(2, i));
            await Task.Delay(delay);
        }
    }
    throw new Exception("Max retries exceeded");
}
```

### 3. Caché de Datos
```csharp
// Cachear datos que no cambian frecuentemente
private readonly IMemoryCache _cache;

public async Task<IReadOnlyList<ClickUpSpaceDto>> GetSpacesCached(string teamId)
{
    var cacheKey = $"spaces_{teamId}";
    if (_cache.TryGetValue(cacheKey, out IReadOnlyList<ClickUpSpaceDto>? cached))
    {
        return cached!;
    }
    
    var spaces = await _clickUpService.GetSpacesAsync(teamId);
    _cache.Set(cacheKey, spaces, TimeSpan.FromMinutes(15));
    return spaces;
}
```

### 4. Paginación
```csharp
public async Task<IReadOnlyList<ClickUpTaskDto>> GetAllTasksPaginated(string listId)
{
    var allTasks = new List<ClickUpTaskDto>();
    int page = 0;
    bool hasMore = true;
    
    while (hasMore)
    {
        var request = new GetTasksRequest(Page: page, PageSize: 100);
        var response = await _clickUpService.GetTasksByListAsync(listId, request);
        
        allTasks.AddRange(response);
        hasMore = response.Count == 100; // Asumiendo que hay más si retornó 100
        page++;
    }
    
    return allTasks;
}
```

---

## Métricas y Monitoreo

### Endpoints para Métricas
- `GET /v2/task/{task_id}/time_in_status` - Tiempo en estados
- `GET /v2/task/bulk_time_in_status/task_ids` - Tiempo masivo
- `GET /v2/team/{team_id}/time_entries` - Entradas de tiempo

### Dashboard de Métricas
```csharp
public async Task<MetricsDto> GetTeamMetrics(string teamId, DateTime startDate, DateTime endDate)
{
    var tasks = await _clickUpService.GetFilteredTeamTasksAsync(teamId);
    var timeEntries = await _clickUpService.GetTimeEntriesAsync(
        teamId,
        new GetTimeEntriesRequest(
            StartDate: ToUnixTimestamp(startDate),
            EndDate: ToUnixTimestamp(endDate)
        )
    );
    
    return new MetricsDto
    {
        TotalTasks = tasks.Count,
        CompletedTasks = tasks.Count(t => t.Status.Type == "closed"),
        AverageCompletionTime = CalculateAverageCompletionTime(tasks),
        TotalHoursTracked = timeEntries.Sum(e => e.Duration) / 3600000.0,
        TasksByStatus = tasks.GroupBy(t => t.Status.Status).ToDictionary(g => g.Key, g => g.Count())
    };
}
```

---

## Conclusión

La API de ClickUp ofrece un conjunto completo de endpoints que pueden ser explotados para:

1. **Automatizar** la creación y gestión de tareas desde el Email Service
2. **Sincronizar** información entre sistemas
3. **Generar reportes** y dashboards personalizados
4. **Facturar** por horas trabajadas
5. **Colaborar** con clientes mediante guests
6. **Seguir objetivos** y métricas del equipo

La implementación debe ser gradual, priorizando los endpoints más críticos para el negocio y expandiendo según las necesidades.


