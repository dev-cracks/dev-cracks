import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  base: '/landing/',
  root: resolve(__dirname),
  publicDir: resolve(__dirname, 'public'),
  server: {
    port: 5176,
    host: true,
    strictPort: false,
  },
  build: {
    outDir: resolve(__dirname, '../dist-landing'),
    emptyOutDir: true,
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@common/auth': resolve(__dirname, '../common/auth'),
      '@common/not-found': resolve(__dirname, '../common/not-found'),
    },
    preserveSymlinks: false,
    dedupe: ['react', 'react-dom', 'react-i18next', '@auth0/auth0-react'],
  },
  optimizeDeps: {
    include: ['@auth0/auth0-react', 'react', 'react-dom'],
  },
});

