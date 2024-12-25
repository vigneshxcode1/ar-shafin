import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://ar-shafin-server.onrender.com',
        changeOrigin: true,
        secure: false, // Set to true if your server uses HTTPS and you're debugging locally
      },
    },
  },
});
