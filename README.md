# Dev Cracks - Aplicación Multi-Tenant

Este proyecto incluye dos aplicaciones React:
- **Web**: Aplicación principal de Dev Cracks (puerto 5173)
- **Backoffice**: Panel de administración con Fluent UI (puerto 5174)

## Requisitos Previos

- Node.js 18+ 
- npm o yarn
- .NET 9.0 (para el backend)

## Instalación

### Instalar todas las dependencias

```bash
npm run install:all
```

Esto instalará las dependencias en:
- Raíz del proyecto (aplicación principal)
- `backoffice/`
- `landing/`
- `portal/`
- `dev-coach/`
- `route-on/`
- `signatures/`

### Instalación manual

Si prefieres instalar manualmente:

```bash
npm install
## Desarrollo

```

## Desarrollo

### Ejecutar ambas aplicaciones simultáneamente

```bash
npm run dev
```

Esto iniciará:

```bash
# Solo Web
npm run dev:web

# Solo Backoffice
npm run dev:backoffice
```

## Build

### Build de ambas aplicaciones

```bash
npm run build
```

### Build individual

```bash
# Build Web
npm run build:web

# Build Backoffice
npm run build:backoffice
```

## Configuración

### Variables de Entorno

Crea archivos `.env` en cada aplicación si necesitas configuraciones personalizadas:

#### `web/.env`
```
VITE_EMAIL_API_BASE_URL=http://localhost:5020
VITE_AUTH0_DOMAIN=dev-cracks.eu.auth0.com
VITE_AUTH0_CLIENT_ID=tu-client-id
VITE_AUTH0_API_AUDIENCE=fractalize-services-api
VITE_BACKOFFICE_URL=http://localhost:5174
```

#### `backoffice/.env`
```
VITE_API_BASE_URL=http://localhost:5020
VITE_AUTH0_DOMAIN=dev-cracks.eu.auth0.com
VITE_AUTH0_CLIENT_ID=tu-client-id
VITE_AUTH0_AUDIENCE=fractalize-services-api
```

## Estructura del Proyecto

```
dev-cracks/
├── web/              # Aplicación principal
│   ├── src/
│   ├── public/
│   └── package.json
├── backoffice/       # Panel de administración
│   ├── src/
│   ├── public/
│   └── package.json
└── package.json      # Scripts para ejecutar ambas apps
```

## Backend

```

## Backend

El backend está en `../fractalize-services/`. Asegúrate de que esté corriendo en el puerto 5020 antes de usar las aplicaciones.

## Características Multi-Tenant

- Cada usuario puede crear su propio tenant
- Los usuarios pueden ser Admin o User
- Solo los Admins pueden acceder al backoffice
- Si un usuario no tiene tenant, puede inicializarlo desde el backoffice
