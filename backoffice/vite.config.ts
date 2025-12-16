import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5174,
    host: true,
    strictPort: false,
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
});

