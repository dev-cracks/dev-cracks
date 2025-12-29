import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/signatures/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@common/auth': resolve(__dirname, '../common/auth'),
    },
    preserveSymlinks: false,
    dedupe: ['react', 'react-dom', '@auth0/auth0-react'],
  },
  optimizeDeps: {
    include: ['@auth0/auth0-react', 'react', 'react-dom'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5174,
    strictPort: false,
  },
});

