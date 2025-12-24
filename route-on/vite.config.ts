import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  base: '/route-on/',
  root: resolve(__dirname),
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5177,
    host: true,
    strictPort: false,
  },
  build: {
    outDir: resolve(__dirname, '../dist-route-on'),
    emptyOutDir: true
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom', 'react-i18next'],
  },
});

