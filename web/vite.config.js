// web/vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8788', // API burada dinliyor
        changeOrigin: true
      }
    }
  },
  preview: { port: 5173 }
});
