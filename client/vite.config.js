import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium';
import { VitePWA } from 'vite-plugin-pwa';
// import { injectManifest } from 'workbox-build';

export default defineConfig({
  optimizeDeps: {
    include: ['cesium','satellite.js', 'axios'], // Include satellite.js in the optimized dependencies
  },
  plugins: [
      react(),
      cesium(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        injectRegister: 'auto'
      }),
      cesium()
  ],
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/graphql': {
        target: '/.netlify/functions/graphql', // Replace with your GraphQL server URL
        // target: "/graphql",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});