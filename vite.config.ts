import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    // The lazily-loaded three.js hero scene is one intentional ~830 kB chunk
    chunkSizeWarningLimit: 900,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
