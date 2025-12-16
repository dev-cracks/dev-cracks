import { cpSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

// Directorio de salida para Render
const renderDistDir = resolve(rootDir, 'dist-render');

// Crear directorio de salida si no existe
if (!existsSync(renderDistDir)) {
  mkdirSync(renderDistDir, { recursive: true });
}

// Copiar archivos de la web principal
const webDistDir = resolve(rootDir, 'dist');
if (existsSync(webDistDir)) {
  console.log('📦 Copiando archivos de la web principal...');
  cpSync(webDistDir, renderDistDir, { recursive: true });
}

// Copiar archivos del backoffice a /backoffice
const backofficeDistDir = resolve(rootDir, 'dist-backoffice');
if (existsSync(backofficeDistDir)) {
  console.log('📦 Copiando archivos del backoffice...');
  const backofficeTargetDir = resolve(renderDistDir, 'backoffice');
  mkdirSync(backofficeTargetDir, { recursive: true });
  cpSync(backofficeDistDir, backofficeTargetDir, { recursive: true });
}

// Copiar archivo _redirects
const redirectsFile = resolve(rootDir, '_redirects');
if (existsSync(redirectsFile)) {
  console.log('📦 Copiando archivo _redirects...');
  cpSync(redirectsFile, resolve(renderDistDir, '_redirects'));
}

console.log('✅ Build preparado para Render en:', renderDistDir);

