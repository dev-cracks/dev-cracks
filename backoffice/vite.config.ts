import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(__dirname),
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5174,
    host: true,
    strictPort: false,
    // Configurar para que funcione como servidor backend para el proxy
    cors: true,
  },
  build: {
    outDir: resolve(__dirname, '../dist-backoffice'),
    emptyOutDir: true
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // Definir variable de entorno para el base path
  define: {
    'import.meta.env.VITE_BACKOFFICE_BASE': JSON.stringify('/backoffice'),
  },
});

