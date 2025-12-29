// Exportaciones principales del módulo de autenticación común
export { mapAuth0User, type User } from './services/authService';
export {
  cacheUserImage,
  getCachedUserImage,
  clearUserImageCache,
  clearAllImageCache,
  getUserImageUrl
} from './services/imageCache';
export { createUseAuth, type Auth0Config } from './hooks/useAuth';

