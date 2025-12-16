import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

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
    // Cuando se usa el servidor unificado (server.js), el HMR se maneja allí
    // Cuando se ejecuta standalone, usar el puerto 5174
    hmr: {
      clientPort: 5174,
    },
  },
  build: {
    outDir: resolve(__dirname, '../dist-backoffice'),
    emptyOutDir: true
  },
  plugins: [
    react(), // Fast Refresh está habilitado por defecto
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

