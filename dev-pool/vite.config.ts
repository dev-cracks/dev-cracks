import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  base: '/dev-pool/',
  root: resolve(__dirname),
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5179,
    host: true,
    strictPort: false,
  },
  build: {
    outDir: resolve(__dirname, '../dist-dev-pool'),
    emptyOutDir: true
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  }
});

