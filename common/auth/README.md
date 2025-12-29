# Módulo de Autenticación Común

Este módulo contiene la lógica de autenticación reutilizable para todas las aplicaciones del proyecto.

## Estructura

```
common/auth/
├── services/
│   ├── authService.ts      # Mapeo de usuarios de Auth0
│   └── imageCache.ts       # Caché de imágenes de perfil
├── hooks/
│   └── useAuth.ts          # Hook de autenticación reutilizable
├── index.ts                 # Exportaciones principales
└── README.md               # Esta documentación
```

## Uso

### 1. Configurar Auth0 en tu proyecto

Crea un archivo de configuración en tu proyecto (ej: `src/config/env.ts`):

```typescript
export const auth0Config = {
  domain: 'dev-cracks.eu.auth0.com',
  clientId: 'tu-client-id',
  authorizationParams: {
    redirect_uri: `${window.location.origin}/tu-app`,
    audience: 'fractalize-services-api',
    scope: 'openid profile email offline_access'
  }
};
```

### 2. Crear el hook de autenticación

En tu proyecto, crea `src/hooks/useAuth.ts`:

```typescript
import { createUseAuth } from '../../common/auth';
import { auth0Config } from '../config/env';

export const useAuth = createUseAuth(auth0Config);
```

### 3. Configurar Auth0Provider

En tu `main.tsx`:

```typescript
import { Auth0Provider } from '@auth0/auth0-react';
import { auth0Config } from './config/env';

<Auth0Provider
  domain={auth0Config.domain}
  clientId={auth0Config.clientId}
  authorizationParams={auth0Config.authorizationParams}
  cacheLocation="localstorage"
  useRefreshTokens={true}
>
  <App />
</Auth0Provider>
```

### 4. Usar el hook

```typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, getAccessToken, login, logout } = useAuth();
  
  // Usar el hook...
}
```

## Servicios

### authService

- `mapAuth0User(auth0User)`: Mapea un usuario de Auth0 al formato común

### imageCache

- `cacheUserImage(userId, imageUrl)`: Cachea la imagen de un usuario
- `getCachedUserImage(userId)`: Obtiene la imagen cacheada
- `clearUserImageCache(userId)`: Limpia el caché de un usuario
- `clearAllImageCache()`: Limpia todo el caché

## Proyectos que usan este módulo

- `landing/` - Landing page
- `signatures/` - Aplicación de firmas digitales

