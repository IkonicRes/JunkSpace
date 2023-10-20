import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium'
// import { injectManifest } from 'workbox-build';

export default defineConfig({
  optimizeDeps: {
    include: ['cesium', 'satellite.js', 'axios'], // Include satellite.js in the optimized dependencies
  },
  plugins: [
    cesium(),
    react(),
    
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      injectRegister: 'auto'
    }),
  ],
  server: {
    port: 10000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://junkspace-zcpt.onrender.com',
        changeOrigin: false,
        secure: true,
      },
    },
  },
});