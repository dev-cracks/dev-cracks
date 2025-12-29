import { createUseAuth } from '@common/auth';
import { auth0Config } from '../config/env';

// Crear el hook de autenticación usando la configuración del proyecto
export const useAuth = createUseAuth(auth0Config);

