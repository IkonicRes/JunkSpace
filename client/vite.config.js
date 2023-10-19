import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium'
import Graphql from '@rollup/plugin-graphql'
// import { injectManifest } from 'workbox-build';

export default defineConfig({
  optimizeDeps: {
    include: ['satellite.js', 'axios'], // Include satellite.js in the optimized dependencies
  },
  plugins: [
    cesium(),
    react(),
    Graphql(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        injectRegister: 'auto'
      }),
  ],
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/graphql': {
        // target: '/.netlify/functions/graphql', // Replace with your GraphQL server URL
        target: "/graphql",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});