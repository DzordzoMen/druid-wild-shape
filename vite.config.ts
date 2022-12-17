import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // TODO remove
      },
      manifest: {
        name: 'Druid Wild Shape',
        short_name: 'DWS',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait-primary',
        description: 'Dungeons and Dragons 5 - Druid Wild Shape',
        theme_color: '#18181b',
        background_color: '#121212',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
});
