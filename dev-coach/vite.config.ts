import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  base: '/dev-coach/',
  root: resolve(__dirname),
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5178,
    host: true,
    strictPort: false,
  },
  build: {
    outDir: resolve(__dirname, '../dist-dev-coach'),
    emptyOutDir: true
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom', 'react-i18next'],
  },
  optimizeDeps: {
    include: ['monaco-editor']
  }
});

