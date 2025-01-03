import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import https from "https";


// https://vite.dev/config/
export default defineConfig({
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/api' : {
          target: "https://10.252.50.91:8443",
          changeOrigin: true,
          secure: false,
          agent: new https.Agent(),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        },
      }
    }
});
