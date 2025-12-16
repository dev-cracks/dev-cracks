import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { basePathPlugin } from './vite-plugin-base-path.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  base: '/backoffice/', // Configurar base path directamente en Vite
  root: resolve(__dirname),
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5174,
    host: true,
    strictPort: false,
    cors: true,
  },
  build: {
    outDir: resolve(__dirname, '../dist-backoffice'),
    emptyOutDir: true
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    'import.meta.env.VITE_BACKOFFICE_BASE': JSON.stringify('/backoffice'),
  },
});

