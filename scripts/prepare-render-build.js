import { cpSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Directorio de salida para Render (usar dist que es el default)
const renderDistDir = resolve(rootDir, 'dist');

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

