import { cpSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Directorio de salida para Render (usar dist que es el default)
const renderDistDir = resolve(rootDir, 'dist');

// Copiar archivos de la landing a /landing dentro de dist
const landingDistDir = resolve(rootDir, 'dist-landing');
if (existsSync(landingDistDir)) {
  console.log('📦 Copiando archivos de la landing a dist/landing...');
  const landingTargetDir = resolve(renderDistDir, 'landing');
  if (!existsSync(landingTargetDir)) {
    mkdirSync(landingTargetDir, { recursive: true });
  }
  cpSync(landingDistDir, landingTargetDir, { recursive: true });
  console.log('✅ Landing copiado correctamente');
} else {
  console.warn('⚠️  dist-landing no existe. Asegúrate de ejecutar npm run build:landing primero.');
}

// Copiar archivos del portal a /portal dentro de dist
const portalDistDir = resolve(rootDir, 'dist-portal');
if (existsSync(portalDistDir)) {
  console.log('📦 Copiando archivos del portal a dist/portal...');
  const portalTargetDir = resolve(renderDistDir, 'portal');
  if (!existsSync(portalTargetDir)) {
    mkdirSync(portalTargetDir, { recursive: true });
  }
  cpSync(portalDistDir, portalTargetDir, { recursive: true });
  console.log('✅ Portal copiado correctamente');
} else {
  console.warn('⚠️  dist-portal no existe. Asegúrate de ejecutar npm run build:portal primero.');
}

// Copiar archivos del backoffice a /backoffice dentro de dist
const backofficeDistDir = resolve(rootDir, 'dist-backoffice');
if (existsSync(backofficeDistDir)) {
  console.log('📦 Copiando archivos del backoffice a dist/backoffice...');
  const backofficeTargetDir = resolve(renderDistDir, 'backoffice');
  if (!existsSync(backofficeTargetDir)) {
    mkdirSync(backofficeTargetDir, { recursive: true });
  }
  cpSync(backofficeDistDir, backofficeTargetDir, { recursive: true });
  console.log('✅ Backoffice copiado correctamente');
} else {
  console.warn('⚠️  dist-backoffice no existe. Asegúrate de ejecutar npm run build:backoffice primero.');
}

// Copiar archivos de dev-coach a /dev-coach dentro de dist
const devCoachDistDir = resolve(rootDir, 'dist-dev-coach');
if (existsSync(devCoachDistDir)) {
  console.log('📦 Copiando archivos de dev-coach a dist/dev-coach...');
  const devCoachTargetDir = resolve(renderDistDir, 'dev-coach');
  if (!existsSync(devCoachTargetDir)) {
    mkdirSync(devCoachTargetDir, { recursive: true });
  }
  cpSync(devCoachDistDir, devCoachTargetDir, { recursive: true });
  console.log('✅ Dev Coach copiado correctamente');
} else {
  console.warn('⚠️  dist-dev-coach no existe. Asegúrate de ejecutar npm run build:dev-coach primero.');
}

// Copiar archivos de route-on a /route-on dentro de dist
const routeOnDistDir = resolve(rootDir, 'dist-route-on');
if (existsSync(routeOnDistDir)) {
  console.log('📦 Copiando archivos de route-on a dist/route-on...');
  const routeOnTargetDir = resolve(renderDistDir, 'route-on');
  if (!existsSync(routeOnTargetDir)) {
    mkdirSync(routeOnTargetDir, { recursive: true });
  }
  cpSync(routeOnDistDir, routeOnTargetDir, { recursive: true });
  console.log('✅ Route On copiado correctamente');
} else {
  console.warn('⚠️  dist-route-on no existe. Asegúrate de ejecutar npm run build:route-on primero.');
}

// Copiar archivos de signatures a /signatures dentro de dist
const signaturesDistDir = resolve(rootDir, 'signatures/dist');
if (existsSync(signaturesDistDir)) {
  console.log('📦 Copiando archivos de signatures a dist/signatures...');
  const signaturesTargetDir = resolve(renderDistDir, 'signatures');
  if (!existsSync(signaturesTargetDir)) {
    mkdirSync(signaturesTargetDir, { recursive: true });
  }
  cpSync(signaturesDistDir, signaturesTargetDir, { recursive: true });
  console.log('✅ Signatures copiado correctamente');
} else {
  console.warn('⚠️  signatures/dist no existe. Asegúrate de ejecutar npm run build:signatures primero.');
}

// Copiar archivo _redirects a dist
const redirectsFile = resolve(rootDir, '_redirects');
if (existsSync(redirectsFile)) {
  console.log('📦 Copiando archivo _redirects a dist...');
  cpSync(redirectsFile, resolve(renderDistDir, '_redirects'));
  console.log('✅ _redirects copiado correctamente');
} else {
  console.warn('⚠️  _redirects no existe en la raíz del proyecto.');
}

console.log('✅ Build preparado para Render en:', renderDistDir);

