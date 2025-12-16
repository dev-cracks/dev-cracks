import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { basePathPlugin } from './vite-plugin-base-path.js';
import { disableHmr } from './vite-plugin-disable-hmr.js';

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
    hmr: false, // Deshabilitar HMR completamente para evitar errores de websocket
  },
  build: {
    outDir: resolve(__dirname, '../dist-backoffice'),
    emptyOutDir: true
  },
  plugins: [
    react({
      // Deshabilitar Fast Refresh para evitar problemas con websocket
      fastRefresh: false,
    }),
    disableHmr(), // Deshabilitar completamente HMR y WebSocket
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

