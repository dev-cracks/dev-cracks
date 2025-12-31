import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: resolve(__dirname),
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5173,
    host: true,
    strictPort: false,
  },
  build: {
    outDir: resolve(__dirname, '../dist'),
    emptyOutDir: true
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@common/not-found': resolve(__dirname, '../common/not-found'),
    },
    dedupe: ['react', 'react-dom', 'react-i18next'],
  }
});

